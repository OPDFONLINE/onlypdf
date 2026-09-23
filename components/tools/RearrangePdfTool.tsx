"use client";

import { useRef, useState } from "react";
import {
  CloudUpload,
  Lock,
  CircleAlert,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  GripVertical,
} from "lucide-react";
import { getToolBySlug } from "@/lib/tools";
import { toolColorClasses } from "@/lib/toolColors";
import { renderPdfThumbnails, type PageThumbnail } from "@/lib/pdf/renderThumbnails";
import { reorderPdfPages, type ReorderedPage } from "@/lib/pdf/reorderPages";
import { PdfPageThumb } from "@/components/tools/PdfPageThumb";

const tool = getToolBySlug("rearrange-pdf")!;
const colors = toolColorClasses[tool.color];

type OrderedPage = ReorderedPage & { thumbnail: PageThumbnail };

function baseNameOf(file: File): string {
  return file.name.replace(/\.pdf$/i, "").trim() || "document";
}

export function RearrangePdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<OrderedPage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [isLoadingPages, setIsLoadingPages] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justDownloaded, setJustDownloaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const originalOrder =
    file !== null &&
    pages.every((p, i) => p.originalIndex === i && p.rotationDelta === 0);

  async function handleFile(selected: File) {
    setError(null);
    setJustDownloaded(false);
    setFile(selected);
    setPages([]);
    setIsLoadingPages(true);
    try {
      const thumbnails = await renderPdfThumbnails(selected);
      setPages(
        thumbnails.map((thumbnail) => ({
          originalIndex: thumbnail.pageIndex,
          rotationDelta: 0,
          thumbnail,
        }))
      );
    } catch (err) {
      setFile(null);
      setError(
        err instanceof Error ? err.message : "We couldn't read this PDF. Please try another file."
      );
    } finally {
      setIsLoadingPages(false);
    }
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    const selected = Array.from(list).find(
      (f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")
    );
    if (selected) void handleFile(selected);
  }

  function movePage(from: number, to: number) {
    if (to < 0 || to >= pages.length || from === to) return;
    setPages((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      if (!moved) return prev;
      updated.splice(to, 0, moved);
      return updated;
    });
    setJustDownloaded(false);
  }

  function rotatePage(index: number) {
    setPages((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, rotationDelta: (p.rotationDelta + 90) % 360 } : p
      )
    );
    setJustDownloaded(false);
  }

  function reset() {
    setFile(null);
    setPages([]);
    setError(null);
    setJustDownloaded(false);
  }

  async function handleApply() {
    if (!file || pages.length === 0) return;
    setError(null);
    setJustDownloaded(false);
    setIsProcessing(true);
    try {
      const blob = await reorderPdfPages(
        file,
        pages.map(({ originalIndex, rotationDelta }) => ({ originalIndex, rotationDelta }))
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${baseNameOf(file)}-reordered.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setJustDownloaded(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while processing your file. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <>
      {!file && (
        <div
          className={`mt-8 rounded-card border-2 border-dashed p-10 text-center transition-colors ${
            isDragging ? `${colors.text} border-current ${colors.badgeBg}` : "border-border bg-surface"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            addFiles(e.dataTransfer.files);
          }}
        >
          <CloudUpload size={28} className={`mx-auto ${colors.text}`} aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold text-ink">Drag and drop a PDF here, or</p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={`mt-3 rounded-pill px-5 py-2.5 text-sm font-semibold text-white transition-colors ${colors.solidBg} ${colors.solidHoverBg}`}
          >
            Choose a file
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,.pdf"
            className="sr-only"
            onChange={(e) => addFiles(e.target.files)}
          />
          <p className="mt-3 text-xs text-ink-soft">{tool.fileHint}</p>
        </div>
      )}

      {isLoadingPages && (
        <p className="mt-8 text-sm text-ink-muted">Reading your PDF and building previews…</p>
      )}

      {file && pages.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">
              Drag pages into the order you want
            </p>
            <p className="text-xs text-ink-soft">{pages.length} pages</p>
          </div>
          <p className="mt-1 text-xs text-ink-soft">
            No mouse? Use the arrow buttons on each page to move it left or right.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {pages.map((page, index) => (
              <PdfPageThumb
                key={`${page.originalIndex}-${page.thumbnail.dataUrl.slice(-8)}`}
                dataUrl={page.thumbnail.dataUrl}
                rotation={page.rotationDelta}
                label={`Position ${index + 1} \u00b7 was page ${page.originalIndex + 1}`}
                ariaLabel={`Page currently at position ${index + 1}, originally page ${page.originalIndex + 1}`}
                accentClass={colors.border}
                draggable={pages.length > 1}
                isDragging={dragIndex === index}
                onDragStart={() => setDragIndex(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (dragIndex !== null && dragIndex !== index) movePage(dragIndex, index);
                  setDragIndex(null);
                }}
                onDragEnd={() => setDragIndex(null)}
                cornerBadge={
                  pages.length > 1 ? (
                    <GripVertical size={14} className="text-ink-soft" aria-hidden="true" />
                  ) : undefined
                }
                footer={
                  <>
                    <button
                      type="button"
                      onClick={() => movePage(index, index - 1)}
                      disabled={index === 0}
                      aria-label={`Move page at position ${index + 1} left`}
                      className="rounded-lg p-1.5 text-ink-soft transition-colors hover:bg-paper hover:text-ink disabled:opacity-30"
                    >
                      <ArrowLeft size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => rotatePage(index)}
                      aria-label={`Rotate page at position ${index + 1} 90 degrees`}
                      className="rounded-lg p-1.5 text-ink-soft transition-colors hover:bg-paper hover:text-ink"
                    >
                      <RotateCw size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => movePage(index, index + 1)}
                      disabled={index === pages.length - 1}
                      aria-label={`Move page at position ${index + 1} right`}
                      className="rounded-lg p-1.5 text-ink-soft transition-colors hover:bg-paper hover:text-ink disabled:opacity-30"
                    >
                      <ArrowRight size={14} />
                    </button>
                  </>
                }
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleApply}
          disabled={!file || pages.length === 0 || isProcessing || isLoadingPages || originalOrder}
          className={`rounded-pill px-5 py-2.5 text-sm font-semibold text-white transition-colors ${
            file && pages.length > 0 && !isProcessing && !isLoadingPages && !originalOrder
              ? `${colors.solidBg} ${colors.solidHoverBg}`
              : "cursor-not-allowed bg-ink/30"
          }`}
        >
          {isProcessing ? "Working\u2026" : "Apply new order"}
        </button>
        {file && (
          <button
            type="button"
            onClick={reset}
            className="text-sm font-medium text-ink-muted hover:text-ink"
          >
            Clear file
          </button>
        )}
      </div>

      {originalOrder && pages.length > 0 && (
        <p className="mt-3 text-sm text-ink-muted">
          Move at least one page to enable Apply.
        </p>
      )}

      {justDownloaded && (
        <p className={`mt-3 text-sm font-medium ${colors.text}`}>
          Done! Your reordered PDF has started downloading.
        </p>
      )}

      {error && (
        <p className="mt-3 flex items-start gap-2 text-sm font-medium text-coral">
          <CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      <p className="mt-4 flex items-center gap-2 text-xs text-ink-soft">
        <Lock size={14} className={colors.text} aria-hidden="true" />
        Files you add here stay in your browser and are not uploaded to a server.
      </p>
    </>
  );
}
