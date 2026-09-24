"use client";

import { useRef, useState } from "react";
import { CloudUpload, Lock, CircleAlert, Check } from "lucide-react";
import { getToolBySlug } from "@/lib/tools";
import { toolColorClasses } from "@/lib/toolColors";
import { renderPdfThumbnails, type PageThumbnail } from "@/lib/pdf/renderThumbnails";
import { renderPdfPagesToImages, type ImageFormat } from "@/lib/pdf/renderPageImages";
import { createZip, type ZipEntry } from "@/lib/pdf/zip";
import { PdfPageThumb } from "@/components/tools/PdfPageThumb";

const tool = getToolBySlug("pdf-to-jpg")!;
const colors = toolColorClasses[tool.color];

function baseNameOf(file: File): string {
  return file.name.replace(/\.pdf$/i, "").trim() || "document";
}

const FORMAT_OPTIONS: { value: ImageFormat; label: string }[] = [
  { value: "jpg", label: "JPG" },
  { value: "png", label: "PNG" },
];

export function PdfToImageTool() {
  const [file, setFile] = useState<File | null>(null);
  const [thumbnails, setThumbnails] = useState<PageThumbnail[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [format, setFormat] = useState<ImageFormat>("jpg");
  const [isDragging, setIsDragging] = useState(false);
  const [isLoadingPages, setIsLoadingPages] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justDownloaded, setJustDownloaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(selectedFile: File) {
    setError(null);
    setJustDownloaded(false);
    setFile(selectedFile);
    setThumbnails([]);
    setSelected(new Set());
    setIsLoadingPages(true);
    try {
      const pages = await renderPdfThumbnails(selectedFile);
      setThumbnails(pages);
      // Default to every page selected — most people converting a PDF to
      // images want the whole document, and can deselect pages they don't.
      setSelected(new Set(pages.map((p) => p.pageIndex)));
    } catch (err) {
      setFile(null);
      setError(
        err instanceof Error ? err.message : "We couldn't read this PDF. Please try another file."
      );
      if (inputRef.current) inputRef.current.value = "";
    } finally {
      setIsLoadingPages(false);
    }
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    const picked = Array.from(list).find(
      (f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")
    );
    if (picked) void handleFile(picked);
  }

  function toggleSelect(index: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  function selectAll() {
    setSelected(new Set(thumbnails.map((p) => p.pageIndex)));
  }

  function clearSelection() {
    setSelected(new Set());
  }

  function reset() {
    setFile(null);
    setThumbnails([]);
    setSelected(new Set());
    setError(null);
    setJustDownloaded(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleApply() {
    if (!file || selected.size === 0) return;
    setError(null);
    setJustDownloaded(false);
    setIsProcessing(true);
    try {
      const pageIndexes: number[] = Array.from(selected).sort((a: number, b: number) => a - b);
      const images = await renderPdfPagesToImages(file, pageIndexes, format);
      const baseName = baseNameOf(file);
      const extension = format === "jpg" ? "jpg" : "png";

      let blob: Blob;
      let filename: string;

      if (images.length === 1) {
        const only = images[0];
        if (!only) throw new Error("Nothing to convert.");
        blob = only.blob;
        filename = `${baseName}-page-${only.pageIndex + 1}.${extension}`;
      } else {
        const digits = String(thumbnails.length).length;
        const entries: ZipEntry[] = [];
        for (const image of images) {
          const bytes = new Uint8Array(await image.blob.arrayBuffer());
          const pageNumber = String(image.pageIndex + 1).padStart(digits, "0");
          entries.push({ name: `${baseName}-page-${pageNumber}.${extension}`, data: bytes });
        }
        const zipBytes = createZip(entries);
        blob = new Blob([zipBytes as BlobPart], { type: "application/zip" });
        filename = `${baseName}-images.zip`;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setJustDownloaded(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while converting your file. Please try again."
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

      {file && thumbnails.length > 0 && (
        <div className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-ink">Choose which pages to convert</p>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <button type="button" onClick={selectAll} className={colors.text}>
                Select all
              </button>
              <button type="button" onClick={clearSelection} className="text-ink-soft hover:text-ink">
                Clear selection
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-ink">Save as:</span>
            <div className="flex gap-2">
              {FORMAT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormat(option.value)}
                  aria-pressed={format === option.value}
                  className={`rounded-pill border-2 px-4 py-2 text-sm font-semibold transition-colors ${
                    format === option.value
                      ? `${colors.solidBg} border-transparent text-white`
                      : "border-border bg-surface text-ink-muted hover:border-ink-soft"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <span className="text-xs text-ink-soft">
              {selected.size} of {thumbnails.length} selected
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {thumbnails.map((page, index) => (
              <PdfPageThumb
                key={page.pageIndex}
                dataUrl={page.dataUrl}
                label={`Page ${page.pageIndex + 1}`}
                ariaLabel={`Select page ${page.pageIndex + 1} to convert`}
                selected={selected.has(index)}
                accentClass={colors.border}
                onClick={() => toggleSelect(index)}
                cornerBadge={
                  selected.has(index) ? (
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-white ${colors.solidBg}`}
                    >
                      <Check size={12} strokeWidth={3} aria-hidden="true" />
                    </span>
                  ) : undefined
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
          disabled={!file || selected.size === 0 || isProcessing || isLoadingPages}
          className={`rounded-pill px-5 py-2.5 text-sm font-semibold text-white transition-colors ${
            file && selected.size > 0 && !isProcessing && !isLoadingPages
              ? `${colors.solidBg} ${colors.solidHoverBg}`
              : "cursor-not-allowed bg-ink/30"
          }`}
        >
          {isProcessing ? "Working\u2026" : "Convert"}
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

      {file && thumbnails.length > 0 && selected.size === 0 && (
        <p className="mt-3 text-sm text-ink-muted">Select at least one page to enable Convert.</p>
      )}

      {justDownloaded && (
        <p className={`mt-3 text-sm font-medium ${colors.text}`}>
          Done! Your image{selected.size === 1 ? "" : "s"} started downloading.
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
