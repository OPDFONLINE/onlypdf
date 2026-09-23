"use client";

import { useRef, useState } from "react";
import { Check, CloudUpload, FileDown, Gauge, Target, Zap } from "lucide-react";
import { compressPdfToTarget, compressPdfWithPreset, type CompressionPreset } from "@/lib/pdf/compressPdf";
import { getToolBySlug } from "@/lib/tools";
import { toolColorClasses } from "@/lib/toolColors";
import { renderPdfThumbnails, type PageThumbnail } from "@/lib/pdf/renderThumbnails";
import { PdfPageThumb } from "@/components/tools/PdfPageThumb";

const tool = getToolBySlug("compress-pdf")!;
const colors = toolColorClasses[tool.color];

type Mode = "auto" | "target";

const PRESETS: { value: CompressionPreset; label: string; description: string; icon: typeof Gauge }[] = [
  { value: "high", label: "High", description: "Better visual quality", icon: Gauge },
  { value: "medium", label: "Medium", description: "Balanced size and quality", icon: Target },
  { value: "express", label: "Express", description: "Smallest file, fastest result", icon: Zap },
];

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function parseTargetSize(value: string): number | null {
  const normalized = value.trim().toLowerCase().replace(/,/g, "");
  const match = normalized.match(/^(\d+(?:\.\d+)?)\s*(kb|kib|mb|mib|gb|gib)?$/);
  if (!match) return null;
  const amount = Number(match[1]);
  const unit = match[2] ?? "mb";
  const multiplier = unit === "kb" || unit === "kib" ? 1024 : unit === "gb" || unit === "gib" ? 1024 ** 3 : 1024 ** 2;
  return amount * multiplier;
}

export function PdfCompressTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<Mode>("auto");
  const [preset, setPreset] = useState<CompressionPreset>("medium");
  const [target, setTarget] = useState("10 MB");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ blob: Blob; original: number; output: number; reachedTarget: boolean } | null>(null);
  const [thumbnails, setThumbnails] = useState<PageThumbnail[]>([]);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  function chooseFile(next: File | undefined) {
    if (!next) return;
    if (next.type !== "application/pdf" && !next.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a PDF file.");
      return;
    }
    setFile(next);
    setResult(null);
    setError(null);
    setProgress("");
    setThumbnails([]);
    setIsLoadingPreview(true);
    renderPdfThumbnails(next)
      .then((pages) => setThumbnails(pages.slice(0, 60)))
      .catch((err) => setError(err instanceof Error ? err.message : "Couldn't build a PDF preview."))
      .finally(() => setIsLoadingPreview(false));
  }

  function reset() {
    setFile(null);
    setResult(null);
    setError(null);
    setThumbnails([]);
    setProgress("");
    if (inputRef.current) inputRef.current.value = "";
  }

  async function compress() {
    if (!file) return;
    setError(null);
    setResult(null);
    setIsProcessing(true);
    setProgress(mode === "target" ? "Preparing target-size compression…" : "Compressing your PDF…");

    try {
      const compressed =
        mode === "target"
          ? await compressPdfToTarget(file, parseTargetSize(target) ?? NaN, setProgress)
          : await compressPdfWithPreset(file, preset);

      setResult({
        blob: compressed.blob,
        original: compressed.originalBytes,
        output: compressed.outputBytes,
        reachedTarget: compressed.reachedTarget,
      });
      setProgress("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong while compressing the PDF.");
      setProgress("");
    } finally {
      setIsProcessing(false);
    }
  }

  function download() {
    if (!result || !file) return;
    const url = URL.createObjectURL(result.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${file.name.replace(/\.pdf$/i, "") || "document"}-compressed.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  const targetBytes = parseTargetSize(target);
  const reduction = result && result.original > 0 ? Math.max(0, Math.round((1 - result.output / result.original) * 100)) : 0;

  return (
    <>
      {!file && (
        <div
          className={`mt-8 rounded-card border-2 border-dashed p-10 text-center transition-colors ${
            isDragging ? `${colors.text} border-current ${colors.badgeBg}` : "border-border bg-surface"
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); chooseFile(e.dataTransfer.files.item(0) ?? undefined); }}
        >
          <CloudUpload size={28} className={`mx-auto ${colors.text}`} aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold text-ink">Drag and drop a PDF here, or</p>
          <button type="button" onClick={() => inputRef.current?.click()} className={`mt-3 rounded-pill px-5 py-2.5 text-sm font-semibold text-white ${colors.solidBg} ${colors.solidHoverBg}`}>
            Choose a file
          </button>
          <input ref={inputRef} type="file" accept="application/pdf,.pdf" className="sr-only" onChange={(e) => chooseFile(e.target.files?.[0])} />
          <p className="mt-3 text-xs text-ink-soft">{tool.fileHint}</p>
        </div>
      )}

      {file && (
        <div className="mt-8 rounded-card border border-border bg-surface p-5 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-ink">{file.name}</p>
              <p className="mt-1 text-xs text-ink-muted">Original size: {formatBytes(file.size)}</p>
            </div>
            <button type="button" onClick={reset} className="text-sm font-medium text-ink-muted hover:text-ink">Change file</button>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-ink">PDF preview</p>
                <p className="mt-1 text-xs text-ink-soft">Check the document before choosing how much to compress it.</p>
              </div>
              {thumbnails.length > 0 && <span className="text-xs text-ink-soft">{thumbnails.length}{thumbnails.length === 60 ? "+" : ""} pages shown</span>}
            </div>
            {isLoadingPreview ? (
              <p className="mt-3 text-sm text-ink-muted">Building page previews…</p>
            ) : thumbnails.length > 0 ? (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {thumbnails.map((page) => (
                  <PdfPageThumb
                    key={page.pageIndex}
                    dataUrl={page.dataUrl}
                    label={`Page ${page.pageIndex + 1}`}
                    ariaLabel={`Preview page ${page.pageIndex + 1}`}
                    accentClass={colors.border}
                  />
                ))}
              </div>
            ) : null}
          </div>

          <div className="mt-6 flex gap-2 rounded-pill bg-paper p-1">
            <button type="button" onClick={() => setMode("auto")} aria-pressed={mode === "auto"} className={`flex-1 rounded-pill px-4 py-2.5 text-sm font-semibold ${mode === "auto" ? `${colors.solidBg} text-white` : "text-ink-muted"}`}>
              Auto compression
            </button>
            <button type="button" onClick={() => setMode("target")} aria-pressed={mode === "target"} className={`flex-1 rounded-pill px-4 py-2.5 text-sm font-semibold ${mode === "target" ? `${colors.solidBg} text-white` : "text-ink-muted"}`}>
              Target file size
            </button>
          </div>

          {mode === "auto" ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {PRESETS.map((option) => {
                const Icon = option.icon;
                const active = preset === option.value;
                return (
                  <button key={option.value} type="button" onClick={() => setPreset(option.value)} aria-pressed={active} className={`rounded-card border-2 p-4 text-left transition-colors ${active ? `${colors.border} ${colors.badgeBg}` : "border-border hover:border-ink-soft"}`}>
                    <Icon size={20} className={active ? colors.text : "text-ink-soft"} aria-hidden="true" />
                    <p className="mt-2 text-sm font-bold text-ink">{option.label}</p>
                    <p className="mt-1 text-xs leading-5 text-ink-muted">{option.description}</p>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-5">
              <label htmlFor="pdf-target-size" className="text-sm font-semibold text-ink">Desired maximum size</label>
              <div className="mt-2 flex max-w-md items-center gap-3">
                <input id="pdf-target-size" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="10 MB" className="w-full rounded-pill border-2 border-border bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-accent" />
                <span className="shrink-0 text-xs text-ink-soft">e.g. 10 MB, 800 KB</span>
              </div>
              {target && targetBytes === null && <p className="mt-2 text-xs text-coral">Enter a size such as 10 MB or 800 KB.</p>}
            </div>
          )}

          <button type="button" onClick={compress} disabled={isProcessing || (mode === "target" && !targetBytes)} className={`mt-6 rounded-pill px-5 py-2.5 text-sm font-semibold text-white ${!isProcessing && (mode === "auto" || !!targetBytes) ? `${colors.solidBg} ${colors.solidHoverBg}` : "cursor-not-allowed bg-ink/30"}`}>
            {isProcessing ? "Compressing…" : "Compress PDF"}
          </button>

          {progress && <p className="mt-3 text-sm text-ink-muted">{progress}</p>}
          {error && <p className="mt-3 text-sm font-medium text-coral">{error}</p>}

          {result && (
            <div className="mt-6 rounded-card border border-border bg-paper p-5">
              <div className="flex items-start gap-3">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${colors.badgeBg} ${colors.text}`}><Check size={18} strokeWidth={3} aria-hidden="true" /></span>
                <div>
                  <p className="text-sm font-bold text-ink">Compression complete</p>
                  <p className="mt-1 text-sm text-ink-muted">{formatBytes(result.original)} → {formatBytes(result.output)} ({reduction}% smaller)</p>
                  {mode === "target" && !result.reachedTarget && <p className="mt-2 text-xs text-ink-muted">The PDF could not be reduced below your target with the available browser-safe compression levels. This is the smallest result found.</p>}
                  {mode === "target" && result.reachedTarget && <p className={`mt-2 text-xs font-medium ${colors.text}`}>Target size reached.</p>}
                </div>
              </div>
              <button type="button" onClick={download} className={`mt-4 inline-flex items-center gap-2 rounded-pill px-5 py-2.5 text-sm font-semibold text-white ${colors.solidBg} ${colors.solidHoverBg}`}>
                <FileDown size={17} aria-hidden="true" /> Download compressed PDF
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
