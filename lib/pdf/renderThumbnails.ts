/**
 * Renders every page of a PDF to a small preview image, entirely in the
 * browser. Used by tools that show page thumbnails (Rearrange, Rotate).
 *
 * pdfjs-dist is only ever imported inside this function (never at module
 * scope), so it's never pulled into the server bundle and never runs during
 * server rendering \u2014 it only loads when a user actually opens one of these
 * tools in their browser.
 */
export type PageThumbnail = {
  /** 0-indexed position of this page in the source PDF. */
  pageIndex: number;
  /** Rendered preview image, as a data URL. */
  dataUrl: string;
  /** Natural width/height of the rendered thumbnail, in pixels. */
  width: number;
  height: number;
};

const THUMBNAIL_WIDTH = 260;

export async function renderPdfThumbnails(file: File): Promise<PageThumbnail[]> {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

  let bytes: ArrayBuffer;
  try {
    bytes = await file.arrayBuffer();
  } catch {
    throw new Error(`Couldn't read "${file.name}". Try selecting it again.`);
  }

  let pdfDoc;
  try {
    pdfDoc = await pdfjsLib.getDocument({ data: bytes }).promise;
  } catch {
    throw new Error(
      `"${file.name}" couldn't be opened. It may be corrupted or password-protected.`
    );
  }

  try {
    const thumbnails: PageThumbnail[] = [];

    for (let pageNumber = 1; pageNumber <= pdfDoc.numPages; pageNumber++) {
      const page = await pdfDoc.getPage(pageNumber);
      // getViewport() already accounts for the page's own embedded rotation,
      // so the thumbnail always shows the page the way it currently reads.
      const baseViewport = page.getViewport({ scale: 1 });
      const scale = THUMBNAIL_WIDTH / baseViewport.width;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.ceil(viewport.width));
      canvas.height = Math.max(1, Math.ceil(viewport.height));
      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Your browser couldn't render a preview for this PDF.");
      }

      await page.render({ canvasContext: context, viewport }).promise;

      thumbnails.push({
        pageIndex: pageNumber - 1,
        dataUrl: canvas.toDataURL("image/jpeg", 0.82),
        width: viewport.width,
        height: viewport.height,
      });

      page.cleanup();
    }

    return thumbnails;
  } finally {
    await pdfDoc.destroy();
  }
}
