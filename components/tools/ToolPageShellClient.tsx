"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CloudUpload, FileText, X, Lock, GripVertical, CircleAlert, ArrowLeft, ArrowRight } from "lucide-react";
import { tools, getToolBySlug } from "@/lib/tools";
import { toolColorClasses } from "@/lib/toolColors";
import { toolProcessors } from "@/lib/toolProcessors";
import { getPdfPageCount } from "@/lib/pdf/getPageCount";
import { Faq } from "@/components/ui/Faq";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PdfPageThumb } from "@/components/tools/PdfPageThumb";
import { renderPdfThumbnails, type PageThumbnail } from "@/lib/pdf/renderThumbnails";
import { getPdfCover, type PdfCover } from "@/lib/pdf/pdfPreview";
import { PagePreviewModal } from "@/components/tools/preview/PagePreviewModal";
import { PreviewSizeControl } from "@/components/tools/preview/PreviewSizeControl";
import { PREVIEW_GRID_CLASSES, usePreviewSize } from "@/components/tools/preview/usePreviewSize";
import { useToolAnalytics } from "@/lib/analytics";

/** 1x1 transparent GIF, shown while a cover preview is still rendering. */
const BLANK_IMAGE = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export type ToolPageContent = {
  name: string;
  oneLiner: string;
  instructions: string[];
  faq: { question: string; answer: string }[];
};

export function ToolPageShellClient({ slug, content }: { slug: string; content?: ToolPageContent }) {
  const tool = getToolBySlug(slug);
  const pageSelectionMode = tool?.pageSelection;
  const pagePreviewMode = tool?.pagePreview;
  const needsThumbs = Boolean(pageSelectionMode) || pagePreviewMode === "pages";
  const { trackStart, trackComplete } = useToolAnalytics(slug);

  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justDownloaded, setJustDownloaded] = useState(false);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [isReadingPages, setIsReadingPages] = useState(false);
  const [pageThumbs, setPageThumbs] = useState<PageThumbnail[]>([]);
  const [covers, setCovers] = useState<Map<File, PdfCover | "error">>(new Map());
  const [previewSize, setPreviewSize] = usePreviewSize();
  const [zoomTarget, setZoomTarget] = useState<{ file: File; page: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Merge: render a first-page cover for every file that gets added.
  useEffect(() => {
    if (pagePreviewMode !== "cover") return;
    let cancelled = false;
    for (const file of files) {
      if (covers.has(file)) continue;
      getPdfCover(file)
        .then((cover) => {
          if (!cancelled) setCovers((prev) => new Map(prev).set(file, cover));
        })
        .catch(() => {
          if (!cancelled) setCovers((prev) => new Map(prev).set(file, "error"));
        });
    }
    return () => {
      cancelled = true;
    };
  }, [files, pagePreviewMode, covers]);

  // For page-selection and page-preview tools, read the page count and
  // render thumbnails as soon as a file is added.
  useEffect(() => {
    if (!needsThumbs) return;
    const file = files[0];
    if (!file) {
      setPageCount(null);
      setSelectedPages(new Set());
      setPageThumbs([]);
      return;
    }
    let cancelled = false;
    setIsReadingPages(true);
    setError(null);
    Promise.all([getPdfPageCount(file), renderPdfThumbnails(file)])
      .then(([count, thumbnails]) => {
        if (cancelled) return;
        setPageCount(count);
        setPageThumbs(thumbnails);
        setSelectedPages(new Set());
      })
      .catch((err) => {
        if (cancelled) return;
        setPageCount(null);
        setError(err instanceof Error ? err.message : "Couldn't read this PDF.");
      })
      .finally(() => {
        if (!cancelled) setIsReadingPages(false);
      });
    return () => {
      cancelled = true;
    };
  }, [files, needsThumbs]);

  if (!tool) return null;

  const Icon = tool.icon;
  const colors = toolColorClasses[tool.color];
  const pageName = content?.name || tool.name;
  const pageOneLiner = content?.oneLiner || tool.oneLiner;
  const pageInstructions = content?.instructions || tool.instructions;
  const pageFaq = content?.faq || tool.faq;
  const related = tools.filter((t) => t.slug !== tool.slug).slice(0, 3);
  const processor = toolProcessors[tool.slug];
  const minFiles = tool.minFiles ?? 1;
  const maxFiles = tool.maxFiles;
  const hasEnoughFiles = files.length >= minFiles;

  const pageSelectionReady =
    !pageSelectionMode ||
    (pageCount !== null &&
      selectedPages.size > 0 &&
      (pageSelectionMode !== "delete" || selectedPages.size < pageCount));

  const canRun = processor && hasEnoughFiles && pageSelectionReady && !isProcessing && !isReadingPages;

  function addFiles(list: FileList | null) {
    if (!list) return;
    const pdfs = Array.from(list).filter(
      (file) => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
    );
    if (pdfs.length > 0) {
      setFiles((prev) => (maxFiles ? pdfs.slice(0, maxFiles) : [...prev, ...pdfs]));
      setError(null);
      setJustDownloaded(false);
    } else {
      setError("Please select a PDF file.");
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

  function togglePage(index: number) {
    setSelectedPages((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  async function handleProcess() {
    if (!processor || !canRun) return;
    trackStart();
    setError(null);
    setJustDownloaded(false);
    setIsProcessing(true);
    try {
      const { blob, filename } = await processor(files, Array.from(selectedPages));
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setJustDownloaded(true);
      trackComplete();
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
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Tools", path: "/tools" },
              { name: pageName, path: `/tools/${slug}` },
            ]}
            className="mb-5"
          />
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colors.badgeBg} ${colors.badgeText}`}
          >
            <Icon size={22} aria-hidden="true" strokeWidth={2.25} />
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl">{pageName}</h1>
          <p className="mt-3 max-w-md text-ink-muted">{pageOneLiner}</p>

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

          {pagePreviewMode === "cover" && files.length > 0 && (
            <div className="mt-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-ink">
                  {files.length > 1 ? "Drag files into the order you want" : "Your file"}
                </p>
                <PreviewSizeControl value={previewSize} onChange={setPreviewSize} activeClass={colors.solidBg} />
              </div>
              <div className={`mt-3 grid gap-3 ${PREVIEW_GRID_CLASSES[previewSize]}`}>
                {files.map((file, index) => {
                  const cover = covers.get(file);
                  const ready = cover && cover !== "error" ? cover : null;
                  return (
                    <PdfPageThumb
                      key={`${file.name}-${index}`}
                      dataUrl={ready?.dataUrl ?? BLANK_IMAGE}
                      label={`${index + 1}. ${file.name}${ready ? ` · ${ready.pageCount} ${ready.pageCount === 1 ? "page" : "pages"}` : ""}`}
                      ariaLabel={`${file.name}, position ${index + 1}`}
                      accentClass={colors.border}
                      draggable={files.length > 1}
                      isDragging={dragIndex === index}
                      onDragStart={() => setDragIndex(index)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (dragIndex !== null && dragIndex !== index) reorderFiles(dragIndex, index);
                        setDragIndex(null);
                      }}
                      onDragEnd={() => setDragIndex(null)}
                      onZoom={cover === "error" ? undefined : () => setZoomTarget({ file, page: 0 })}
                      cornerBadge={
                        files.length > 1 ? <GripVertical size={14} className="text-ink-soft" aria-hidden="true" /> : undefined
                      }
                      footer={
                        <>
                          <button
                            type="button"
                            onClick={() => reorderFiles(index, index - 1)}
                            disabled={index === 0}
                            aria-label={`Move ${file.name} earlier`}
                            className="rounded-lg p-1.5 text-ink-soft transition-colors hover:bg-paper hover:text-ink disabled:opacity-30"
                          >
                            <ArrowLeft size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            aria-label={`Remove ${file.name}`}
                            className="rounded-lg p-1.5 text-ink-soft transition-colors hover:bg-paper hover:text-coral"
                          >
                            <X size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => reorderFiles(index, index + 1)}
                            disabled={index === files.length - 1}
                            aria-label={`Move ${file.name} later`}
                            className="rounded-lg p-1.5 text-ink-soft transition-colors hover:bg-paper hover:text-ink disabled:opacity-30"
                          >
                            <ArrowRight size={14} />
                          </button>
                        </>
                      }
                    />
                  );
                })}
              </div>
              {files.some((file) => covers.get(file) === "error") && (
                <p className="mt-2 text-xs text-coral">
                  A preview couldn&apos;t be created for one of the files. It may still merge fine, or it may be damaged or password-protected.
                </p>
              )}
            </div>
          )}

          {pagePreviewMode !== "cover" && files.length > 0 && (
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

          {/* Page picker, for tools that need one */}
          {pageSelectionMode && files.length > 0 && (
            <div className="mt-5">
              {isReadingPages && (
                <p className="text-sm text-ink-muted">Reading your PDF…</p>
              )}
              {!isReadingPages && pageCount !== null && (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-ink">
                      {pageSelectionMode === "delete"
                        ? "Tap the pages you want to remove"
                        : "Tap the pages you want to keep"}
                    </p>
                    <p className="text-xs text-ink-soft">
                      {selectedPages.size} of {pageCount} selected
                    </p>
                  </div>
                  <div className="mt-2">
                    <PreviewSizeControl value={previewSize} onChange={setPreviewSize} activeClass={colors.solidBg} />
                  </div>
                  <div className={`mt-3 grid gap-3 ${PREVIEW_GRID_CLASSES[previewSize]}`}>
                    {pageThumbs.map((page) => {
                      const isSelected = selectedPages.has(page.pageIndex);
                      return (
                        <PdfPageThumb
                          key={page.pageIndex}
                          dataUrl={page.dataUrl}
                          label={`Page ${page.pageIndex + 1}`}
                          selected={isSelected}
                          accentClass={colors.border}
                          onClick={() => togglePage(page.pageIndex)}
                          onZoom={() => files[0] && setZoomTarget({ file: files[0], page: page.pageIndex })}
                          ariaLabel={`${pageSelectionMode === "delete" ? "Delete" : "Extract"} page ${page.pageIndex + 1}`}
                          cornerBadge={isSelected ? <span className={`flex h-6 w-6 items-center justify-center rounded-full ${colors.solidBg} text-xs font-bold text-white`}>{pageSelectionMode === "delete" ? "−" : "✓"}</span> : null}
                        />
                      );
                    })}
                  </div>
                  {pageSelectionMode === "delete" && selectedPages.size === pageCount && (
                    <p className="mt-2 text-sm text-coral">
                      At least one page has to remain — unselect one to continue.
                    </p>
                  )}
                </>
              )}
            </div>
          )}

          {/* Read-only page preview, for tools without a page picker (Split) */}
          {pagePreviewMode === "pages" && files.length > 0 && (
            <div className="mt-5">
              {isReadingPages && <p className="text-sm text-ink-muted">Reading your PDF and building previews…</p>}
              {!isReadingPages && pageCount !== null && (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-ink">
                      Preview: {pageCount} {pageCount === 1 ? "page" : "pages"}, each becomes its own PDF
                    </p>
                    <PreviewSizeControl value={previewSize} onChange={setPreviewSize} activeClass={colors.solidBg} />
                  </div>
                  <div className={`mt-3 grid gap-3 ${PREVIEW_GRID_CLASSES[previewSize]}`}>
                    {pageThumbs.map((page) => (
                      <PdfPageThumb
                        key={page.pageIndex}
                        dataUrl={page.dataUrl}
                        label={`Page ${page.pageIndex + 1}`}
                        ariaLabel={`Page ${page.pageIndex + 1}`}
                        accentClass={colors.border}
                        onZoom={() => files[0] && setZoomTarget({ file: files[0], page: page.pageIndex })}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {processor ? (
              <button
                type="button"
                onClick={handleProcess}
                disabled={!canRun}
                className={`rounded-pill px-5 py-2.5 text-sm font-semibold text-white transition-colors ${
                  canRun ? `${colors.solidBg} ${colors.solidHoverBg}` : "cursor-not-allowed bg-ink/30"
                }`}
              >
                {isProcessing ? "Working\u2026" : pageName}
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
                  if (inputRef.current) inputRef.current.value = "";
                }}
                className="text-sm font-medium text-ink-muted hover:text-ink"
              >
                Clear files
              </button>
            )}
          </div>

          {processor && !pageSelectionMode && !hasEnoughFiles && files.length > 0 && (
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
              {pageInstructions.map((step, index) => (
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
        <Faq items={pageFaq} />
      </div>

      {zoomTarget && (
        <PagePreviewModal
          file={zoomTarget.file}
          initialPage={zoomTarget.page}
          title={zoomTarget.file.name}
          onClose={() => setZoomTarget(null)}
        />
      )}
    </div>
  );
}
