"use client";

import { useEffect, useRef, useState } from "react";
import { CloudUpload, Loader2, ScanSearch, BoxSelect } from "lucide-react";
import { useToolAnalytics } from "@/lib/analytics";
import { renderPdfThumbnails, type PageThumbnail } from "@/lib/pdf/renderThumbnails";
import { analyzeWatermarks, type WatermarkAnalysis } from "@/lib/pdf/watermarkDetect";
import { SmartPanel } from "./watermark/SmartPanel";
import { AreaPanel } from "./watermark/AreaPanel";

type Tab = "smart" | "area";

export function PdfWatermarkRemoveTool() {
  const { trackStart, trackComplete } = useToolAnalytics("watermark-remove");

  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageThumbnail[]>([]);
  const [analysis, setAnalysis] = useState<WatermarkAnalysis | null>(null);
  const [tab, setTab] = useState<Tab>("area");
  const [error, setError] = useState<string | null>(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function pickFile(candidate: File | null | undefined) {
    if (!candidate) return;
    const isPdf = candidate.type === "application/pdf" || candidate.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      setError("Please select a PDF file.");
      return;
    }
    setError(null);
    setFile(candidate);
  }

  // Thumbnails (for colour sampling) and the watermark scan run side by side.
  useEffect(() => {
    if (!file) return;
    let cancelled = false;
    setPages([]);
    setAnalysis(null);
    setError(null);

    Promise.all([renderPdfThumbnails(file), analyzeWatermarks(file)])
      .then(([thumbs, result]) => {
        if (cancelled) return;
        setPages(thumbs);
        setAnalysis(result);
        setTab(result.candidates.length > 0 ? "smart" : "area");
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Couldn't open this PDF.");
      });
    return () => {
      cancelled = true;
    };
  }, [file]);

  const ready = file && analysis && pages.length > 0;
  const found = analysis?.candidates.length ?? 0;

  const tabClass = (active: boolean) =>
    `inline-flex items-center gap-2 rounded-pill border px-4 py-2 text-sm font-semibold transition-colors ${
      active ? "border-teal bg-teal text-white" : "border-border bg-surface text-ink-muted hover:border-teal hover:text-teal"
    }`;

  return (
    <div className="mt-8">
      <div
        className={`rounded-card border-2 border-dashed p-8 text-center transition-colors ${isDraggingFile ? "border-teal bg-teal-soft" : "border-border bg-surface"}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingFile(true);
        }}
        onDragLeave={() => setIsDraggingFile(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDraggingFile(false);
          pickFile(e.dataTransfer.files?.[0]);
        }}
      >
        <CloudUpload size={28} className="mx-auto text-teal" aria-hidden="true" />
        <p className="mt-3 text-sm font-semibold text-ink">Drag and drop a PDF, or choose one</p>
        <button type="button" onClick={() => inputRef.current?.click()} className="mt-3 rounded-pill bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">
          {file ? "Choose another PDF" : "Choose PDF"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="sr-only"
          onChange={(e) => {
            pickFile(e.target.files?.[0]);
            if (inputRef.current) inputRef.current.value = "";
          }}
        />
        {file && <p className="mt-3 text-xs text-ink-soft">{file.name}</p>}
      </div>

      {error && <p role="alert" className="mt-4 rounded-xl bg-coral-soft px-4 py-3 text-sm text-coral">{error}</p>}

      {file && !ready && !error && (
        <p className="mt-4 flex items-center gap-2 text-sm text-ink-muted"><Loader2 size={16} className="animate-spin" /> Scanning for watermarks and preparing previews…</p>
      )}

      {!file && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl bg-teal-soft p-4 text-sm text-ink-muted">
            <ScanSearch size={18} className="mt-0.5 shrink-0 text-teal" aria-hidden="true" />
            <p><strong className="font-semibold text-ink">Smart removal.</strong> Finds watermarks that are separate objects (tagged layers, semi-transparent text or logos, stamps) and deletes them cleanly.</p>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-teal-soft p-4 text-sm text-ink-muted">
            <BoxSelect size={18} className="mt-0.5 shrink-0 text-teal" aria-hidden="true" />
            <p><strong className="font-semibold text-ink">Manual area.</strong> For watermarks baked into the page or a scan: draw boxes and cover them, with colour matching and page ranges.</p>
          </div>
        </div>
      )}

      {ready && (
        <>
          <div role="tablist" aria-label="Removal method" className="mt-6 flex flex-wrap gap-2">
            <button role="tab" type="button" aria-selected={tab === "smart"} onClick={() => setTab("smart")} className={tabClass(tab === "smart")}>
              <ScanSearch size={16} aria-hidden="true" /> Smart removal
              <span className={`rounded-pill px-2 py-0.5 text-[11px] font-bold ${tab === "smart" ? "bg-white/25" : found ? "bg-teal-soft text-teal" : "bg-paper text-ink-soft"}`}>{found}</span>
            </button>
            <button role="tab" type="button" aria-selected={tab === "area"} onClick={() => setTab("area")} className={tabClass(tab === "area")}>
              <BoxSelect size={16} aria-hidden="true" /> Manual area
            </button>
          </div>

          {tab === "smart" &&
            (found > 0 ? (
              <SmartPanel key={file.name + file.size} file={file} analysis={analysis} onStart={trackStart} onDone={trackComplete} />
            ) : (
              <div className="mt-5 rounded-2xl border border-border bg-surface p-5 text-sm text-ink-muted">
                <p className="font-semibold text-ink">No removable watermark objects found.</p>
                <p className="mt-1">
                  This usually means the watermark is part of the page image (common with scans) or is drawn in a way that can&apos;t be told apart from normal content.
                  Try the manual area mode instead.
                </p>
                <button type="button" onClick={() => setTab("area")} className="mt-3 rounded-pill bg-teal px-4 py-2 text-sm font-semibold text-white hover:opacity-90">Use manual area</button>
              </div>
            ))}

          {tab === "area" && found === 0 && (
            <p className="mt-4 rounded-xl bg-paper px-4 py-3 text-xs leading-5 text-ink-muted">
              Smart removal found no separate watermark objects in this PDF (common with scans or watermarks built into the page), so manual mode is shown.
            </p>
          )}
          {tab === "area" && <AreaPanel key={file.name + file.size} file={file} pages={pages} onStart={trackStart} onDone={trackComplete} />}
        </>
      )}
    </div>
  );
}
