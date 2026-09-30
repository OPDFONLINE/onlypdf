"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, LoaderCircle } from "lucide-react";
import { openPdfPreview, type PdfPreviewHandle } from "@/lib/pdf/pdfPreview";

const ZOOM_LEVELS = [1, 1.5, 2, 3];

/**
 * Full-size page viewer. Opens the PDF once, renders the current page at a
 * high resolution and lets the person flip through pages, zoom and close
 * with Esc. Rendered as a fixed overlay, so it works anywhere in the tree.
 */
export function PagePreviewModal({
  file,
  initialPage,
  title,
  onClose,
}: {
  file: File;
  /** 0-indexed page to open on. */
  initialPage: number;
  title?: string;
  onClose: () => void;
}) {
  const [handle, setHandle] = useState<PdfPreviewHandle | null>(null);
  const [pageIndex, setPageIndex] = useState(initialPage);
  const [image, setImage] = useState<{ dataUrl: string; width: number; height: number } | null>(null);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const handleRef = useRef<PdfPreviewHandle | null>(null);

  // Open the document once per modal.
  useEffect(() => {
    let cancelled = false;
    openPdfPreview(file)
      .then((opened) => {
        if (cancelled) {
          void opened.destroy();
          return;
        }
        handleRef.current = opened;
        setHandle(opened);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Couldn't open this PDF.");
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
      const opened = handleRef.current;
      handleRef.current = null;
      if (opened) void opened.destroy();
    };
  }, [file]);

  // Render the current page whenever the page changes.
  useEffect(() => {
    if (!handle) return;
    let cancelled = false;
    setLoading(true);
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const targetWidth = Math.min(2400, Math.max(1000, Math.round(window.innerWidth * dpr * 1.4)));
    handle
      .renderPage(pageIndex, targetWidth, 0.92)
      .then((rendered) => {
        if (cancelled) return;
        setImage(rendered);
        setError(null);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Couldn't render this page.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [handle, pageIndex]);

  const total = handle?.numPages ?? null;

  const go = useCallback(
    (delta: number) => {
      if (total === null) return;
      setPageIndex((current) => Math.min(total - 1, Math.max(0, current + delta)));
    },
    [total]
  );

  // Keyboard: Esc closes, arrows flip pages. Also lock page scroll while open.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight") go(1);
      else if (event.key === "ArrowLeft") go(-1);
    }
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [go, onClose]);

  const zoom = ZOOM_LEVELS[zoomIndex] ?? 1;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-ink/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Page preview${title ? `: ${title}` : ""}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-white">
        <div className="min-w-0">
          {title && <p className="truncate text-sm font-semibold">{title}</p>}
          <p className="text-xs text-white/70">
            Page {pageIndex + 1}
            {total !== null ? ` of ${total}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setZoomIndex((i) => Math.max(0, i - 1))}
            disabled={zoomIndex === 0}
            aria-label="Zoom out"
            className="rounded-xl p-2 hover:bg-white/10 disabled:opacity-30"
          >
            <ZoomOut size={18} />
          </button>
          <span className="w-10 text-center text-xs font-semibold tabular-nums">{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            onClick={() => setZoomIndex((i) => Math.min(ZOOM_LEVELS.length - 1, i + 1))}
            disabled={zoomIndex === ZOOM_LEVELS.length - 1}
            aria-label="Zoom in"
            className="rounded-xl p-2 hover:bg-white/10 disabled:opacity-30"
          >
            <ZoomIn size={18} />
          </button>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="ml-2 rounded-xl p-2 hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div
        className="relative min-h-0 flex-1 overflow-auto px-3 pb-3"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        {error && <p className="mx-auto mt-10 max-w-sm text-center text-sm font-medium text-white">{error}</p>}
        {image && !error && (
          <div className="mx-auto" style={{ width: `${zoom * 100}%`, maxWidth: zoom === 1 ? "min(100%, 900px)" : undefined }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.dataUrl}
              alt={`Page ${pageIndex + 1}`}
              className={`mx-auto h-auto w-full rounded-lg bg-white shadow-lift transition-opacity ${loading ? "opacity-60" : "opacity-100"}`}
              draggable={false}
            />
          </div>
        )}
        {loading && !error && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white">
            <LoaderCircle size={28} className="animate-spin" aria-label="Loading page" />
          </div>
        )}

        {total !== null && total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={pageIndex === 0}
              aria-label="Previous page"
              className="fixed left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-ink shadow-lift hover:bg-white disabled:opacity-30 sm:left-4"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={pageIndex === total - 1}
              aria-label="Next page"
              className="fixed right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-ink shadow-lift hover:bg-white disabled:opacity-30 sm:right-4"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
