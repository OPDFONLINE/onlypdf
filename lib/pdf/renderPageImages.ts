/**
 * Renders selected PDF pages to full-resolution image files (JPG or PNG),
 * entirely in the browser. Unlike renderThumbnails.ts (small previews for
 * on-screen page pickers), this renders at a size suitable for actually
 * downloading and using the image.
 */
export type ImageFormat = "jpg" | "png";

export type ExportedPageImage = {
  /** 0-indexed page number in the source PDF. */
  pageIndex: number;
  blob: Blob;
};

// scale 2 on a standard 72-DPI PDF page works out to ~144 DPI, a good
// balance of image quality and file size for on-screen and light-print use.
const EXPORT_SCALE = 2;
const JPG_QUALITY = 0.9;

export async function renderPdfPagesToImages(
  file: File,
  pageIndexes: number[],
  format: ImageFormat
): Promise<ExportedPageImage[]> {
  if (pageIndexes.length === 0) {
    throw new Error("Select at least one page to convert.");
  }

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

  const mimeType = format === "png" ? "image/png" : "image/jpeg";

  try {
    const results: ExportedPageImage[] = [];

    for (const pageIndex of pageIndexes) {
      if (pageIndex < 0 || pageIndex >= pdfDoc.numPages) continue;

      const page = await pdfDoc.getPage(pageIndex + 1);
      const viewport = page.getViewport({ scale: EXPORT_SCALE });

      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.ceil(viewport.width));
      canvas.height = Math.max(1, Math.ceil(viewport.height));
      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Your browser couldn't render this PDF page.");
      }

      // JPG has no transparency channel, so give it a white backdrop instead
      // of letting transparent areas render as black.
      if (format === "jpg") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      await page.render({ canvasContext: context, viewport }).promise;

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, mimeType, format === "jpg" ? JPG_QUALITY : undefined)
      );
      if (!blob) {
        throw new Error("Your browser couldn't export this page as an image.");
      }

      results.push({ pageIndex, blob });
      page.cleanup();
    }

    return results;
  } finally {
    await pdfDoc.destroy();
  }
}
