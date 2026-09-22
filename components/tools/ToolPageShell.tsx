"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { CloudUpload, FileText, X, Lock, GripVertical, CircleAlert } from "lucide-react";
import { tools, getToolBySlug } from "@/lib/tools";
import { toolColorClasses } from "@/lib/toolColors";
import { toolProcessors } from "@/lib/toolProcessors";
import { Faq } from "@/components/ui/Faq";

export function ToolPageShell({ slug }: { slug: string }) {
  const tool = getToolBySlug(slug);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justDownloaded, setJustDownloaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!tool) return null;

  const Icon = tool.icon;
  const colors = toolColorClasses[tool.color];
  const related = tools.filter((t) => t.slug !== tool.slug).slice(0, 3);
  const processor = toolProcessors[tool.slug];
  const minFiles = tool.minFiles ?? 1;
  const maxFiles = tool.maxFiles;
  const hasEnoughFiles = files.length >= minFiles;

  function addFiles(list: FileList | null) {
    if (!list) return;
    const pdfs = Array.from(list).filter(
      (file) => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
    );
    if (pdfs.length > 0) {
      setFiles((prev) => (maxFiles ? pdfs.slice(0, maxFiles) : [...prev, ...pdfs]));
      setError(null);
      setJustDownloaded(false);
    }
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setJustDownloaded(false);
  }

  function reorderFiles(from: number, to: number) {
    setFiles((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      if (!moved) return prev;
      updated.splice(to, 0, moved);
      return updated;
    });
  }

  async function handleProcess() {
    if (!processor || !hasEnoughFiles || isProcessing) return;
    setError(null);
    setJustDownloaded(false);
    setIsProcessing(true);
    try {
      const { blob, filename } = await processor(files);
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
          : "Something went wrong while processing your file. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="container-page py-14 md:py-16">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colors.badgeBg} ${colors.badgeText}`}
          >
            <Icon size={22} aria-hidden="true" strokeWidth={2.25} />
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl">{tool.name}</h1>
          <p className="mt-3 max-w-md text-ink-muted">{tool.oneLiner}</p>

          {/* Upload zone */}
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
            <p className="mt-3 text-sm font-semibold text-ink">
              Drag and drop a PDF here, or
            </p>
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
              multiple={maxFiles !== 1}
              className="sr-only"
              onChange={(e) => addFiles(e.target.files)}
            />
            <p className="mt-3 text-xs text-ink-soft">{tool.fileHint}</p>
          </div>

          {files.length > 0 && (
            <ul className="mt-4 space-y-2">
              {files.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  draggable={files.length > 1}
                  onDragStart={() => setDragIndex(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (dragIndex !== null && dragIndex !== index) {
                      reorderFiles(dragIndex, index);
                    }
                    setDragIndex(null);
                  }}
                  className={`flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-sm ${
                    files.length > 1 ? "cursor-grab active:cursor-grabbing" : ""
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2 text-ink">
                    {files.length > 1 && (
                      <GripVertical size={15} className="shrink-0 text-ink-soft" aria-hidden="true" />
                    )}
                    <FileText size={16} className={`shrink-0 ${colors.text}`} aria-hidden="true" />
                    <span className="truncate">{file.name}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    aria-label={`Remove ${file.name}`}
                    className="shrink-0 text-ink-soft hover:text-ink"
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {processor ? (
              <button
                type="button"
                onClick={handleProcess}
                disabled={!hasEnoughFiles || isProcessing}
                className={`rounded-pill px-5 py-2.5 text-sm font-semibold text-white transition-colors ${
                  hasEnoughFiles && !isProcessing
                    ? `${colors.solidBg} ${colors.solidHoverBg}`
                    : "cursor-not-allowed bg-ink/30"
                }`}
              >
                {isProcessing ? "Working\u2026" : tool.name}
              </button>
            ) : (
              <button
                type="button"
                disabled
                title="This tool's processing engine is being wired up in the next build step."
                className="cursor-not-allowed rounded-pill bg-ink/30 px-5 py-2.5 text-sm font-semibold text-white"
              >
                {tool.name} {"\u2014"} coming soon
              </button>
            )}
            {files.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setFiles([]);
                  setError(null);
                  setJustDownloaded(false);
                }}
                className="text-sm font-medium text-ink-muted hover:text-ink"
              >
                Clear files
              </button>
            )}
          </div>

          {processor && !hasEnoughFiles && files.length > 0 && (
            <p className="mt-3 text-sm text-ink-muted">
              Add at least {minFiles} PDF files to continue.
            </p>
          )}

          {justDownloaded && (
            <p className={`mt-3 text-sm font-medium ${colors.text}`}>
              Done! Your file has started downloading.
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
            Files you add here stay in your browser and are not uploaded to a
            server.
          </p>

          {/* Instructions */}
          <div className="mt-14">
            <h2 className="text-xl">How it works</h2>
            <ol className="mt-4 space-y-3">
              {tool.instructions.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm text-ink-muted">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${colors.badgeBg} ${colors.badgeText}`}
                  >
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Sidebar: related tools */}
        <aside className="lg:pt-1">
          <div className="rounded-card border-2 border-border bg-surface p-6 shadow-soft">
            <h2 className="text-sm font-bold text-ink">Related tools</h2>
            <ul className="mt-4 space-y-1">
              {related.map((t) => {
                const RelatedIcon = t.icon;
                const relatedColors = toolColorClasses[t.color];
                return (
                  <li key={t.slug}>
                    <Link
                      href={`/tools/${t.slug}`}
                      className="-mx-2 flex items-center gap-3 rounded-xl px-2 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-paper hover:text-ink"
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${relatedColors.badgeBg} ${relatedColors.badgeText}`}
                      >
                        <RelatedIcon size={15} aria-hidden="true" strokeWidth={2.25} />
                      </span>
                      {t.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>

      <div className="mt-16 max-w-2xl border-t border-border pt-14 md:mt-20">
        <Faq items={tool.faq} />
      </div>
    </div>
  );
}
