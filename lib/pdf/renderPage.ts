/**
 * Renders a single PDF page to an image at a chosen width, in the browser.
 * Used for the large, accurate previews in the watermark tool.
 * pdfjs-dist is imported lazily so it never runs during server rendering.
 */
export type RenderedPage = {
  dataUrl: string;
  width: number;
  height: number;
};

export async function renderPdfPage(source: Blob, pageIndex: number, targetWidth = 1000): Promise<RenderedPage> {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

  let data: ArrayBuffer;
  try {
    data = await source.arrayBuffer();
  } catch {
    throw new Error("Couldn't read the PDF. Try selecting it again.");
  }

  let doc;
  try {
    doc = await pdfjsLib.getDocument({ data }).promise;
  } catch {
    throw new Error("This PDF couldn't be opened. It may be corrupted or password-protected.");
  }

  try {
    const page = await doc.getPage(pageIndex + 1);
    const base = page.getViewport({ scale: 1 });
    // Keep very tall pages within a sane canvas size.
    const scale = Math.min(targetWidth / base.width, 2600 / base.height);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.ceil(viewport.width));
    canvas.height = Math.max(1, Math.ceil(viewport.height));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Your browser couldn't render a preview for this PDF.");
    await page.render({ canvasContext: context, viewport }).promise;
    page.cleanup();
    return { dataUrl: canvas.toDataURL("image/jpeg", 0.9), width: viewport.width, height: viewport.height };
  } finally {
    await doc.destroy();
  }
}
