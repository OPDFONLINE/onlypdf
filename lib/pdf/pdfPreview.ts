/**
 * Browser-only helpers for on-screen PDF previews: a cached "cover" (first
 * page + page count) per file, and an open-document handle used by the
 * full-size page viewer. pdfjs-dist is imported lazily so it never runs
 * during server rendering.
 */
export type PdfRenderedPage = { dataUrl: string; width: number; height: number };

export type PdfPreviewHandle = {
  numPages: number;
  /** Render a 0-indexed page at the given CSS-pixel-independent target width. */
  renderPage: (pageIndex: number, targetWidth: number, quality?: number) => Promise<PdfRenderedPage>;
  destroy: () => Promise<void>;
};

async function loadPdfjs() {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
  return pdfjsLib;
}

export async function openPdfPreview(file: File): Promise<PdfPreviewHandle> {
  const pdfjsLib = await loadPdfjs();

  let bytes: ArrayBuffer;
  try {
    bytes = await file.arrayBuffer();
  } catch {
    throw new Error(`Couldn't read "${file.name}". Try selecting it again.`);
  }

  let doc;
  try {
    doc = await pdfjsLib.getDocument({ data: bytes }).promise;
  } catch {
    throw new Error(`"${file.name}" couldn't be opened. It may be corrupted or password-protected.`);
  }

  return {
    numPages: doc.numPages,
    async renderPage(pageIndex, targetWidth, quality = 0.9) {
      const page = await doc.getPage(pageIndex + 1);
      const base = page.getViewport({ scale: 1 });
      // Cap the canvas height so very tall pages stay within browser limits.
      const scale = Math.min(targetWidth / base.width, 3200 / base.height);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.ceil(viewport.width));
      canvas.height = Math.max(1, Math.ceil(viewport.height));
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Your browser couldn't render a preview for this PDF.");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: context, viewport }).promise;
      page.cleanup();
      return { dataUrl: canvas.toDataURL("image/jpeg", quality), width: viewport.width, height: viewport.height };
    },
    async destroy() {
      await doc.destroy();
    },
  };
}

export type PdfCover = { pageCount: number; dataUrl: string };

const coverCache = new WeakMap<File, Promise<PdfCover>>();

/** First-page preview plus page count, cached per File object. */
export function getPdfCover(file: File): Promise<PdfCover> {
  const cached = coverCache.get(file);
  if (cached) return cached;
  const promise = (async () => {
    const handle = await openPdfPreview(file);
    try {
      const page = await handle.renderPage(0, 360, 0.82);
      return { pageCount: handle.numPages, dataUrl: page.dataUrl };
    } finally {
      await handle.destroy();
    }
  })();
  // Don't cache failures, so re-adding the same file can retry.
  promise.catch(() => coverCache.delete(file));
  coverCache.set(file, promise);
  return promise;
}
