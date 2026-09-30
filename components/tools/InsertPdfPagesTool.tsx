"use client";

import { useEffect, useRef, useState } from "react";
import { useToolAnalytics } from "@/lib/analytics";
import { CloudUpload, Lock, CircleAlert, Check, FilePlus2, FileText, ArrowDownToLine } from "lucide-react";
import { getToolBySlug } from "@/lib/tools";
import { toolColorClasses } from "@/lib/toolColors";
import { renderPdfThumbnails, type PageThumbnail } from "@/lib/pdf/renderThumbnails";
import { insertPdfPages, type BlankPageSize, type InsertSource } from "@/lib/pdf/insertPages";
import { imagesToPdf } from "@/lib/pdf/imagesToPdf";
import { PdfPageThumb } from "@/components/tools/PdfPageThumb";
import { PagePreviewModal } from "@/components/tools/preview/PagePreviewModal";
import { PreviewSizeControl } from "@/components/tools/preview/PreviewSizeControl";
import { PREVIEW_GRID_CLASSES, usePreviewSize } from "@/components/tools/preview/usePreviewSize";

const SLUG = "insert-pdf-pages";
const tool = getToolBySlug(SLUG)!;
const colors = toolColorClasses[tool.color];

type SourceMode = "file" | "blank";

const BLANK_SIZE_OPTIONS: { value: BlankPageSize; label: string }[] = [
  { value: "match", label: "Same as neighbouring page" },
  { value: "a4", label: "A4" },
  { value: "letter", label: "US Letter" },
];

function isPdf(file: File): boolean {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}
function isImage(file: File): boolean {
  return file.type === "image/jpeg" || file.type === "image/png" || /\.(jpe?g|png)$/i.test(file.name);
}
function summaryText(newPages: number, position: string, baseCount: number, afterPage: number): string {
  const noun = newPages === 1 ? "page" : "pages";
  const range = newPages === 1 ? `page ${afterPage + 1}` : `pages ${afterPage + 1}\u2013${afterPage + newPages}`;
  return `${newPages} new ${noun} will go ${position}. Your PDF grows from ${baseCount} to ${baseCount + newPages} pages, and the new ${noun} will be ${range}.`;
}

function baseNameOf(file: File): string {
  return file.name.replace(/\.pdf$/i, "").trim() || "document";
}

export function InsertPdfPagesTool() {
  const { trackStart, trackComplete } = useToolAnalytics(SLUG);

  // Base document
  const [baseFile, setBaseFile] = useState<File | null>(null);
  const [baseThumbs, setBaseThumbs] = useState<PageThumbnail[]>([]);
  const [isLoadingBase, setIsLoadingBase] = useState(false);
  /** Number of base pages kept in front of the new pages (0 = at the start). */
  const [afterPage, setAfterPage] = useState<number | null>(null);

  // What to insert
  const [mode, setMode] = useState<SourceMode>("file");
  const [insertFile, setInsertFile] = useState<File | null>(null);
  const [insertLabel, setInsertLabel] = useState("");
  const [insertThumbs, setInsertThumbs] = useState<PageThumbnail[]>([]);
  const [insertSelected, setInsertSelected] = useState<Set<number>>(new Set());
  const [isLoadingInsert, setIsLoadingInsert] = useState(false);
  const [blankCount, setBlankCount] = useState(1);
  const [blankSize, setBlankSize] = useState<BlankPageSize>("match");

  const [isDraggingBase, setIsDraggingBase] = useState(false);
  const [isDraggingInsert, setIsDraggingInsert] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justDownloaded, setJustDownloaded] = useState(false);
  const [previewSize, setPreviewSize] = usePreviewSize();
  const [zoom, setZoom] = useState<{ file: File; page: number; title: string } | null>(null);

  const baseInputRef = useRef<HTMLInputElement>(null);
  const insertInputRef = useRef<HTMLInputElement>(null);
  // Guards against a slow render finishing after the person picked another file.
  const baseToken = useRef(0);
  const insertToken = useRef(0);

  const baseCount = baseThumbs.length;
  const newPageCount = mode === "blank" ? blankCount : insertSelected.size;

  // ---- base file -------------------------------------------------------
  async function loadBase(file: File) {
    const token = ++baseToken.current;
    setError(null);
    setJustDownloaded(false);
    setBaseFile(file);
    setBaseThumbs([]);
    setAfterPage(null);
    setIsLoadingBase(true);
    try {
      const thumbs = await renderPdfThumbnails(file);
      if (token !== baseToken.current) return;
      setBaseThumbs(thumbs);
    } catch (err) {
      if (token !== baseToken.current) return;
      setBaseFile(null);
      setError(err instanceof Error ? err.message : "We couldn't read this PDF. Please try another file.");
      if (baseInputRef.current) baseInputRef.current.value = "";
    } finally {
      if (token === baseToken.current) setIsLoadingBase(false);
    }
  }

  function addBase(list: FileList | null) {
    if (!list) return;
    const picked = Array.from(list).find(isPdf);
    if (picked) void loadBase(picked);
    else setError("Please select a PDF file.");
  }

  function resetBase() {
    baseToken.current++;
    setBaseFile(null);
    setBaseThumbs([]);
    setAfterPage(null);
    setError(null);
    setJustDownloaded(false);
    if (baseInputRef.current) baseInputRef.current.value = "";
  }

  // ---- inserted file (PDF or images) ---------------------------------
  async function loadInsert(list: FileList | null) {
    if (!list) return;
    const all = Array.from(list);
    const pdf = all.find(isPdf);
    const images = all.filter(isImage);
    if (!pdf && images.length === 0) {
      setError("Choose a PDF, or one or more JPG or PNG images, to insert.");
      return;
    }
    const token = ++insertToken.current;
    setError(null);
    setJustDownloaded(false);
    setIsLoadingInsert(true);
    setInsertThumbs([]);
    setInsertSelected(new Set());
    try {
      let file: File;
      let label: string;
      if (pdf) {
        file = pdf;
        label = pdf.name;
      } else {
        // Each image becomes one A4 page, then is treated like any other PDF.
        const blob = await imagesToPdf(images, "a4");
        file = new File([blob], "images.pdf", { type: "application/pdf" });
        label = images.length === 1 ? (images[0]?.name ?? "1 image") : `${images.length} images`;
      }
      const thumbs = await renderPdfThumbnails(file);
      if (token !== insertToken.current) return;
      setInsertFile(file);
      setInsertLabel(label);
      setInsertThumbs(thumbs);
      setInsertSelected(new Set(thumbs.map((t) => t.pageIndex)));
    } catch (err) {
      if (token !== insertToken.current) return;
      setInsertFile(null);
      setError(err instanceof Error ? err.message : "We couldn't read that file. Please try another one.");
    } finally {
      if (token === insertToken.current) setIsLoadingInsert(false);
      if (insertInputRef.current) insertInputRef.current.value = "";
    }
  }

  function clearInsert() {
    insertToken.current++;
    setInsertFile(null);
    setInsertLabel("");
    setInsertThumbs([]);
    setInsertSelected(new Set());
    if (insertInputRef.current) insertInputRef.current.value = "";
  }

  function toggleInsertPage(index: number) {
    setInsertSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  // Keep the blank page count sane if the person types something odd.
  useEffect(() => {
    if (!Number.isFinite(blankCount) || blankCount < 1) setBlankCount(1);
    else if (blankCount > 200) setBlankCount(200);
  }, [blankCount]);

  const sourceReady = mode === "blank" ? blankCount >= 1 : insertFile !== null && insertSelected.size > 0;
  const canRun = baseFile !== null && afterPage !== null && sourceReady && !isProcessing && !isLoadingBase && !isLoadingInsert;

  async function handleApply() {
    if (!baseFile || afterPage === null || !canRun) return;
    setError(null);
    setJustDownloaded(false);
    setIsProcessing(true);
    trackStart();
    try {
      const source: InsertSource =
        mode === "blank"
          ? { kind: "blank", count: blankCount, size: blankSize }
          : { kind: "pdf", file: insertFile as File, pageIndexes: Array.from(insertSelected) };
      const blob = await insertPdfPages(baseFile, afterPage, source);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${baseNameOf(baseFile)}-with-new-pages.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setJustDownloaded(true);
      trackComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong while adding pages. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }

  const positionText =
    afterPage === null
      ? null
      : afterPage === 0
        ? "before page 1"
        : afterPage === baseCount
          ? `after the last page (page ${baseCount})`
          : `after page ${afterPage}`;

  return (
    <>
      {/* Step 1: base PDF */}
      {!baseFile && (
        <div
          className={`mt-8 rounded-card border-2 border-dashed p-10 text-center transition-colors ${
            isDraggingBase ? `${colors.text} border-current ${colors.badgeBg}` : "border-border bg-surface"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDraggingBase(true);
          }}
          onDragLeave={() => setIsDraggingBase(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDraggingBase(false);
            addBase(e.dataTransfer.files);
          }}
        >
          <CloudUpload size={28} className={`mx-auto ${colors.text}`} aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold text-ink">Drag and drop your PDF here, or</p>
          <button
            type="button"
            onClick={() => baseInputRef.current?.click()}
            className={`mt-3 rounded-pill px-5 py-2.5 text-sm font-semibold text-white transition-colors ${colors.solidBg} ${colors.solidHoverBg}`}
          >
            Choose a file
          </button>
          <input
            ref={baseInputRef}
            type="file"
            accept="application/pdf,.pdf"
            className="sr-only"
            onChange={(e) => addBase(e.target.files)}
          />
          <p className="mt-3 text-xs text-ink-soft">{tool.fileHint}</p>
        </div>
      )}

      {isLoadingBase && <p className="mt-8 text-sm text-ink-muted">Reading your PDF and building previews…</p>}

      {baseFile && baseCount > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-sm">
            <span className="flex min-w-0 items-center gap-2 text-ink">
              <FileText size={16} className={`shrink-0 ${colors.text}`} aria-hidden="true" />
              <span className="truncate">{baseFile.name}</span>
              <span className="shrink-0 text-xs text-ink-soft">
                {baseCount} {baseCount === 1 ? "page" : "pages"}
              </span>
            </span>
            <button type="button" onClick={resetBase} className="shrink-0 text-xs font-semibold text-ink-muted hover:text-ink">
              Change
            </button>
          </div>

          {/* Step 2: position */}
          <div className="mt-6">
            <h2 className="text-sm font-bold text-ink">1. Where should the new pages go?</h2>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-ink-muted">
                <span className="font-semibold text-ink">Insert</span>
                <select
                  value={afterPage === null ? "" : String(afterPage)}
                  onChange={(e) => setAfterPage(e.target.value === "" ? null : Number(e.target.value))}
                  aria-label="Insertion position"
                  className="rounded-xl border-2 border-border bg-surface px-3 py-2 text-sm font-medium text-ink"
                >
                  <option value="">Choose a position…</option>
                  <option value="0">Before page 1 (at the start)</option>
                  {baseThumbs.map((page) => (
                    <option key={page.pageIndex} value={page.pageIndex + 1}>
                      {page.pageIndex + 1 === baseCount ? `After page ${page.pageIndex + 1} (at the end)` : `After page ${page.pageIndex + 1}`}
                    </option>
                  ))}
                </select>
              </label>
              <PreviewSizeControl value={previewSize} onChange={setPreviewSize} activeClass={colors.solidBg} />
            </div>
            <p className="mt-2 text-xs text-ink-soft">
              Or press <span className="font-semibold">Insert after</span> under any page below.
            </p>

            <div className={`mt-3 grid gap-3 ${PREVIEW_GRID_CLASSES[previewSize]}`}>
              {baseThumbs.map((page) => {
                const isTarget = afterPage === page.pageIndex + 1;
                return (
                  <PdfPageThumb
                    key={page.pageIndex}
                    dataUrl={page.dataUrl}
                    label={`Page ${page.pageIndex + 1}`}
                    ariaLabel={`Insert new pages after page ${page.pageIndex + 1}`}
                    selected={isTarget}
                    accentClass={colors.border}
                    onClick={() => setAfterPage(isTarget ? null : page.pageIndex + 1)}
                    onZoom={() => setZoom({ file: baseFile, page: page.pageIndex, title: baseFile.name })}
                    cornerBadge={
                      isTarget ? (
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full text-white ${colors.solidBg}`}>
                          <ArrowDownToLine size={13} aria-hidden="true" />
                        </span>
                      ) : undefined
                    }
                    footer={
                      <button
                        type="button"
                        onClick={() => setAfterPage(isTarget ? null : page.pageIndex + 1)}
                        aria-pressed={isTarget}
                        className={`rounded-pill px-3 py-1 text-xs font-semibold transition-colors ${
                          isTarget ? `${colors.solidBg} text-white` : "bg-paper text-ink-muted hover:text-ink"
                        }`}
                      >
                        {isTarget ? "New pages go here" : "Insert after"}
                      </button>
                    }
                  />
                );
              })}
            </div>
          </div>

          {/* Step 3: what to insert */}
          <div className="mt-8">
            <h2 className="text-sm font-bold text-ink">2. What do you want to insert?</h2>
            <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Type of new pages">
              {(
                [
                  { value: "file", label: "Pages from a PDF or images" },
                  { value: "blank", label: "Blank pages" },
                ] as { value: SourceMode; label: string }[]
              ).map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setMode(option.value)}
                  aria-pressed={mode === option.value}
                  className={`rounded-pill border-2 px-4 py-2 text-sm font-semibold transition-colors ${
                    mode === option.value
                      ? `${colors.solidBg} border-transparent text-white`
                      : "border-border bg-surface text-ink-muted hover:border-ink-soft"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {mode === "blank" && (
              <div className="mt-4 flex flex-wrap items-end gap-4">
                <label className="text-sm text-ink-muted">
                  <span className="block font-semibold text-ink">Number of blank pages</span>
                  <input
                    type="number"
                    min={1}
                    max={200}
                    value={blankCount}
                    onChange={(e) => setBlankCount(Math.floor(Number(e.target.value)) || 1)}
                    className="mt-1 w-28 rounded-xl border-2 border-border bg-surface px-3 py-2 text-sm font-medium text-ink"
                  />
                </label>
                <label className="text-sm text-ink-muted">
                  <span className="block font-semibold text-ink">Page size</span>
                  <select
                    value={blankSize}
                    onChange={(e) => setBlankSize(e.target.value as BlankPageSize)}
                    className="mt-1 rounded-xl border-2 border-border bg-surface px-3 py-2 text-sm font-medium text-ink"
                  >
                    {BLANK_SIZE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}

            {mode === "file" && (
              <div className="mt-4">
                {!insertFile && (
                  <div
                    className={`rounded-card border-2 border-dashed p-6 text-center transition-colors ${
                      isDraggingInsert ? `${colors.text} border-current ${colors.badgeBg}` : "border-border bg-surface"
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingInsert(true);
                    }}
                    onDragLeave={() => setIsDraggingInsert(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDraggingInsert(false);
                      void loadInsert(e.dataTransfer.files);
                    }}
                  >
                    <FilePlus2 size={24} className={`mx-auto ${colors.text}`} aria-hidden="true" />
                    <p className="mt-2 text-sm font-semibold text-ink">Drop a PDF or images to insert, or</p>
                    <button
                      type="button"
                      onClick={() => insertInputRef.current?.click()}
                      className={`mt-3 rounded-pill px-5 py-2 text-sm font-semibold text-white transition-colors ${colors.solidBg} ${colors.solidHoverBg}`}
                    >
                      Choose file
                    </button>
                    <input
                      ref={insertInputRef}
                      type="file"
                      accept="application/pdf,.pdf,image/jpeg,image/png,.jpg,.jpeg,.png"
                      multiple
                      className="sr-only"
                      onChange={(e) => void loadInsert(e.target.files)}
                    />
                    <p className="mt-2 text-xs text-ink-soft">
                      One PDF, or one or more JPG/PNG images (each image becomes an A4 page).
                    </p>
                  </div>
                )}

                {isLoadingInsert && <p className="mt-3 text-sm text-ink-muted">Building previews…</p>}

                {insertFile && insertThumbs.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-sm">
                      <span className="flex min-w-0 items-center gap-2 text-ink">
                        <FileText size={16} className={`shrink-0 ${colors.text}`} aria-hidden="true" />
                        <span className="truncate">{insertLabel}</span>
                      </span>
                      <button type="button" onClick={clearInsert} className="shrink-0 text-xs font-semibold text-ink-muted hover:text-ink">
                        Change
                      </button>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-ink">Tick the pages to insert</p>
                      <div className="flex items-center gap-3 text-xs font-semibold">
                        <button
                          type="button"
                          onClick={() => setInsertSelected(new Set(insertThumbs.map((t) => t.pageIndex)))}
                          className={colors.text}
                        >
                          Select all
                        </button>
                        <button type="button" onClick={() => setInsertSelected(new Set())} className="text-ink-soft hover:text-ink">
                          Clear selection
                        </button>
                        <span className="font-normal text-ink-soft">
                          {insertSelected.size} of {insertThumbs.length} selected
                        </span>
                      </div>
                    </div>
                    <div className={`mt-3 grid gap-3 ${PREVIEW_GRID_CLASSES[previewSize]}`}>
                      {insertThumbs.map((page) => {
                        const isSelected = insertSelected.has(page.pageIndex);
                        return (
                          <PdfPageThumb
                            key={page.pageIndex}
                            dataUrl={page.dataUrl}
                            label={`Page ${page.pageIndex + 1}`}
                            ariaLabel={`Insert page ${page.pageIndex + 1} of ${insertLabel}`}
                            selected={isSelected}
                            accentClass={colors.border}
                            onClick={() => toggleInsertPage(page.pageIndex)}
                            onZoom={() => setZoom({ file: insertFile, page: page.pageIndex, title: insertLabel })}
                            cornerBadge={
                              isSelected ? (
                                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-white ${colors.solidBg}`}>
                                  <Check size={12} strokeWidth={3} aria-hidden="true" />
                                </span>
                              ) : undefined
                            }
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Summary */}
          {positionText && sourceReady && afterPage !== null && (
            <p className={`mt-6 rounded-2xl ${colors.badgeBg} px-4 py-3 text-sm font-medium ${colors.badgeText}`}>
              {summaryText(newPageCount, positionText, baseCount, afterPage)}
            </p>
          )}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleApply}
          disabled={!canRun}
          className={`rounded-pill px-5 py-2.5 text-sm font-semibold text-white transition-colors ${
            canRun ? `${colors.solidBg} ${colors.solidHoverBg}` : "cursor-not-allowed bg-ink/30"
          }`}
        >
          {isProcessing ? "Working\u2026" : "Insert pages"}
        </button>
      </div>

      {baseFile && baseCount > 0 && !canRun && !isProcessing && (
        <p className="mt-3 text-sm text-ink-muted">
          {afterPage === null
            ? "Choose where the new pages should go to continue."
            : mode === "file" && !insertFile
              ? "Add the PDF or images you want to insert."
              : mode === "file" && insertSelected.size === 0
                ? "Tick at least one page to insert."
                : ""}
        </p>
      )}

      {justDownloaded && <p className={`mt-3 text-sm font-medium ${colors.text}`}>Done! Your PDF has started downloading.</p>}

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

      {zoom && <PagePreviewModal file={zoom.file} initialPage={zoom.page} title={zoom.title} onClose={() => setZoom(null)} />}
    </>
  );
}
