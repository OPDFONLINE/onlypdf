"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Check, CloudUpload, Eraser, FileText, RotateCcw } from "lucide-react";
import { renderPdfThumbnails, type PageThumbnail } from "@/lib/pdf/renderThumbnails";
import { removeWatermarkArea, type WatermarkRect } from "@/lib/pdf/removeWatermark";

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

export function PdfWatermarkRemoveTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageThumbnail[]>([]);
  const [rect, setRect] = useState<WatermarkRect | null>(null);
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [selectedPage, setSelectedPage] = useState(0);
  const [applyAll, setApplyAll] = useState(true);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) return;
    let cancelled = false;
    setError(null);
    setPages([]);
    renderPdfThumbnails(file)
      .then((items) => {
        if (!cancelled) setPages(items);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Couldn't preview this PDF.");
      });
    return () => {
      cancelled = true;
    };
  }, [file]);

  const currentPage = pages[selectedPage];

  function pointFromEvent(event: PointerEvent) {
    const box = previewRef.current?.getBoundingClientRect();
    if (!box) return null;
    return {
      x: clamp((event.clientX - box.left) / box.width),
      y: clamp((event.clientY - box.top) / box.height),
    };
  }

  function startSelection(event: PointerEvent) {
    if (!currentPage) return;
    const point = pointFromEvent(event);
    if (!point) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setStart(point);
    setRect({ x: point.x, y: point.y, width: 0, height: 0 });
    setDragging(true);
  }

  function moveSelection(event: PointerEvent) {
    if (!dragging || !start) return;
    const point = pointFromEvent(event);
    if (!point) return;
    setRect({
      x: Math.min(start.x, point.x),
      y: Math.min(start.y, point.y),
      width: Math.abs(point.x - start.x),
      height: Math.abs(point.y - start.y),
    });
  }

  function finishSelection(event: PointerEvent) {
    if (!dragging) return;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer capture may already have been released.
    }
    setDragging(false);
    setStart(null);
  }

  async function process() {
    if (!file || !rect || rect.width < 0.01 || rect.height < 0.01) return;
    setWorking(true);
    setError(null);
    try {
      const pageIndexes = applyAll ? pages.map((page) => page.pageIndex) : [selectedPage];
      const blob = await removeWatermarkArea(file, rect, pageIndexes);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name.replace(/\.pdf$/i, "") + "-watermark-removed.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't remove the selected area.");
    } finally {
      setWorking(false);
    }
  }

  return (
    <div className="mt-8">
      <div className="rounded-card border-2 border-dashed border-border bg-surface p-8 text-center">
        <CloudUpload size={28} className="mx-auto text-teal" aria-hidden="true" />
        <p className="mt-3 text-sm font-semibold text-ink">Upload a PDF to preview it</p>
        <button type="button" onClick={() => inputRef.current?.click()} className="mt-3 rounded-pill bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">
          Choose PDF
        </button>
        <input ref={inputRef} type="file" accept="application/pdf,.pdf" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        {file && <p className="mt-3 text-xs text-ink-soft">{file.name}</p>}
      </div>

      {pages.length > 0 && currentPage && (
        <>
          <div className="mt-6 rounded-card border border-border bg-surface p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-ink">Select the watermark area</p>
                <p className="mt-1 text-xs text-ink-muted">Drag a box over the watermark in the preview. The same area can be applied to every page.</p>
              </div>
              <button type="button" onClick={() => setRect(null)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink">
                <RotateCcw size={14} /> Clear selection
              </button>
            </div>

            <div className="mt-4 flex justify-center">
              <div
                ref={previewRef}
                className="relative max-h-[620px] w-full max-w-xl touch-none select-none overflow-hidden rounded-xl border border-border bg-white"
                onPointerDown={startSelection}
                onPointerMove={moveSelection}
                onPointerUp={finishSelection}
                onPointerCancel={finishSelection}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={currentPage.dataUrl} alt={`PDF page ${selectedPage + 1}`} className="block h-auto max-h-[620px] w-full object-contain" draggable={false} />
                {rect && rect.width > 0 && rect.height > 0 && (
                  <div className="pointer-events-none absolute border-2 border-dashed border-teal bg-teal/20" style={{ left: `${rect.x * 100}%`, top: `${rect.y * 100}%`, width: `${rect.width * 100}%`, height: `${rect.height * 100}%` }}>
                    <span className="absolute -top-6 left-0 rounded bg-teal px-1.5 py-1 text-[10px] font-bold text-white">Remove</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {pages.map((page) => (
                <button key={page.pageIndex} type="button" onClick={() => setSelectedPage(page.pageIndex)} className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${selectedPage === page.pageIndex ? "border-teal bg-teal text-white" : "border-border bg-paper text-ink-muted hover:text-ink"}`}>
                  Page {page.pageIndex + 1}
                </button>
              ))}
            </div>
          </div>

          <label className="mt-4 flex items-center gap-2 text-sm text-ink">
            <input type="checkbox" checked={applyAll} onChange={(e) => setApplyAll(e.target.checked)} />
            Apply this watermark area to all pages
          </label>

          <button type="button" disabled={!rect || working} onClick={process} className={`mt-5 inline-flex items-center gap-2 rounded-pill px-5 py-2.5 text-sm font-semibold text-white ${rect && !working ? "bg-teal hover:opacity-90" : "cursor-not-allowed bg-ink/30"}`}>
            <Eraser size={16} />
            {working ? "Removing…" : "Remove watermark"}
          </button>
        </>
      )}

      {error && <p className="mt-4 rounded-xl bg-coral-soft px-4 py-3 text-sm text-coral">{error}</p>}
      {file && pages.length === 0 && !error && <p className="mt-4 text-sm text-ink-muted">Preparing page previews…</p>}
      {!file && <div className="mt-6 flex items-start gap-3 rounded-2xl bg-teal-soft p-4 text-sm text-ink-muted"><FileText size={18} className="mt-0.5 shrink-0 text-teal" /><p>This tool covers a selected watermark area with white. If the watermark overlaps real content, that content will also be covered.</p></div>}
      {rect && <p className="mt-3 flex items-center gap-2 text-xs text-ink-soft"><Check size={14} className="text-teal" /> Area selected. Review the preview before processing.</p>}
    </div>
  );
}
