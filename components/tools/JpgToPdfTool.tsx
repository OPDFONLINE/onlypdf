"use client";

import { useRef, useState } from "react";
import { CloudUpload, Lock, CircleAlert, ArrowLeft, ArrowRight, X, GripVertical } from "lucide-react";
import { getToolBySlug } from "@/lib/tools";
import { toolColorClasses } from "@/lib/toolColors";
import { imagesToPdf, type PageSizeOption } from "@/lib/pdf/imagesToPdf";
import { PdfPageThumb } from "@/components/tools/PdfPageThumb";

const tool = getToolBySlug("jpg-to-pdf")!;
const colors = toolColorClasses[tool.color];

type ImageItem = { id: string; file: File; url: string };

function makeId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const PAGE_SIZE_OPTIONS: { value: PageSizeOption; label: string }[] = [
  { value: "fit", label: "Fit to image" },
  { value: "a4", label: "A4" },
  { value: "letter", label: "US Letter" },
];

export function JpgToPdfTool() {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<PageSizeOption>("fit");
  const [isDragging, setIsDragging] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justDownloaded, setJustDownloaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const picked = Array.from(list).filter(
      (f) => f.type === "image/jpeg" || f.type === "image/png" || /\.(jpe?g|png)$/i.test(f.name)
    );
    if (picked.length === 0) {
      setError("Please select a JPG, JPEG, or PNG image.");
      return;
    }
    const newItems = picked.map((file) => ({ id: makeId(), file, url: URL.createObjectURL(file) }));
    setItems((prev) => [...prev, ...newItems]);
    setError(null);
    setJustDownloaded(false);
  }

  function removeItem(index: number) {
    setItems((prev) => {
      const target = prev[index];
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((_, i) => i !== index);
    });
    setJustDownloaded(false);
  }

  function moveItem(from: number, to: number) {
    if (to < 0 || to >= items.length || from === to) return;
    setItems((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      if (!moved) return prev;
      updated.splice(to, 0, moved);
      return updated;
    });
    setJustDownloaded(false);
  }

  function reset() {
    items.forEach((item) => URL.revokeObjectURL(item.url));
    setItems([]);
    setError(null);
    setJustDownloaded(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleApply() {
    if (items.length === 0) return;
    setError(null);
    setJustDownloaded(false);
    setIsProcessing(true);
    try {
      const blob = await imagesToPdf(
        items.map((item) => item.file),
        pageSize
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const firstName = items[0]?.file.name.replace(/\.(jpe?g|png)$/i, "") || "images";
      link.download =
        items.length === 1 ? `${firstName}.pdf` : `${firstName}-and-${items.length - 1}-more.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setJustDownloaded(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while creating your PDF. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <>
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
        <p className="mt-3 text-sm font-semibold text-ink">Drag and drop images here, or</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`mt-3 rounded-pill px-5 py-2.5 text-sm font-semibold text-white transition-colors ${colors.solidBg} ${colors.solidHoverBg}`}
        >
          Choose images
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,.jpg,.jpeg,.png"
          multiple
          className="sr-only"
          onChange={(e) => addFiles(e.target.files)}
        />
        <p className="mt-3 text-xs text-ink-soft">{tool.fileHint}</p>
      </div>

      {items.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">Drag images into the order you want</p>
            <p className="text-xs text-ink-soft">
              {items.length} image{items.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {items.map((item, index) => (
              <PdfPageThumb
                key={item.id}
                dataUrl={item.url}
                label={`Page ${index + 1}`}
                ariaLabel={`Image at position ${index + 1}: ${item.file.name}`}
                accentClass={colors.border}
                draggable={items.length > 1}
                isDragging={dragIndex === index}
                onDragStart={() => setDragIndex(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (dragIndex !== null && dragIndex !== index) moveItem(dragIndex, index);
                  setDragIndex(null);
                }}
                onDragEnd={() => setDragIndex(null)}
                cornerBadge={
                  items.length > 1 ? (
                    <GripVertical size={14} className="text-ink-soft" aria-hidden="true" />
                  ) : undefined
                }
                footer={
                  <>
                    <button
                      type="button"
                      onClick={() => moveItem(index, index - 1)}
                      disabled={index === 0}
                      aria-label={`Move image at position ${index + 1} left`}
                      className="rounded-lg p-1.5 text-ink-soft transition-colors hover:bg-paper hover:text-ink disabled:opacity-30"
                    >
                      <ArrowLeft size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      aria-label={`Remove ${item.file.name}`}
                      className="rounded-lg p-1.5 text-ink-soft transition-colors hover:bg-paper hover:text-coral"
                    >
                      <X size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveItem(index, index + 1)}
                      disabled={index === items.length - 1}
                      aria-label={`Move image at position ${index + 1} right`}
                      className="rounded-lg p-1.5 text-ink-soft transition-colors hover:bg-paper hover:text-ink disabled:opacity-30"
                    >
                      <ArrowRight size={14} />
                    </button>
                  </>
                }
              />
            ))}
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-ink">Page size</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {PAGE_SIZE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPageSize(option.value)}
                  aria-pressed={pageSize === option.value}
                  className={`rounded-pill border-2 px-4 py-2 text-sm font-semibold transition-colors ${
                    pageSize === option.value
                      ? `${colors.solidBg} border-transparent text-white`
                      : "border-border bg-surface text-ink-muted hover:border-ink-soft"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleApply}
          disabled={items.length === 0 || isProcessing}
          className={`rounded-pill px-5 py-2.5 text-sm font-semibold text-white transition-colors ${
            items.length > 0 && !isProcessing
              ? `${colors.solidBg} ${colors.solidHoverBg}`
              : "cursor-not-allowed bg-ink/30"
          }`}
        >
          {isProcessing ? "Working\u2026" : "Convert to PDF"}
        </button>
        {items.length > 0 && (
          <button
            type="button"
            onClick={reset}
            className="text-sm font-medium text-ink-muted hover:text-ink"
          >
            Clear images
          </button>
        )}
      </div>

      {justDownloaded && (
        <p className={`mt-3 text-sm font-medium ${colors.text}`}>
          Done! Your PDF has started downloading.
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
        Images you add here stay in your browser and are not uploaded to a server.
      </p>
    </>
  );
}
