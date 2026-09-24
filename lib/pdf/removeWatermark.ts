import { PDFDocument, rgb } from "pdf-lib";

export type WatermarkRect = {
  /** Normalized coordinates relative to the rendered page: 0..1. */
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * Covers a selected watermark area with an opaque white rectangle.
 * This is intentionally described as area removal because many PDF
 * watermarks are baked into page content rather than stored as a separate
 * removable object.
 */
export async function removeWatermarkArea(
  file: File,
  rect: WatermarkRect,
  pageIndexes: number[]
): Promise<Blob> {
  if (pageIndexes.length === 0) {
    throw new Error("Select at least one page.");
  }
  if (rect.width <= 0 || rect.height <= 0) {
    throw new Error("Select the watermark area before removing it.");
  }

  const bytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(bytes);
  const pages = pdf.getPages();

  for (const index of pageIndexes) {
    const page = pages[index];
    if (!page) continue;

    const { width, height } = page.getSize();
    const x = Math.max(0, Math.min(1, rect.x)) * width;
    const yFromTop = Math.max(0, Math.min(1, rect.y)) * height;
    const boxWidth = Math.min(1 - Math.max(0, rect.x), rect.width) * width;
    const boxHeight = Math.min(1 - Math.max(0, rect.y), rect.height) * height;

    page.drawRectangle({
      x,
      y: height - yFromTop - boxHeight,
      width: boxWidth,
      height: boxHeight,
      color: rgb(1, 1, 1),
      opacity: 1,
      borderWidth: 0,
    });
  }

  // pdf-lib may return Uint8Array<ArrayBufferLike>; Blob expects an ArrayBuffer-backed view.
  // Copying into a fresh Uint8Array guarantees an ArrayBuffer-compatible backing buffer
  // under newer TypeScript DOM typings.
  const saved = await pdf.save();
  const blobBytes = new Uint8Array(saved.byteLength);
  blobBytes.set(saved);
  return new Blob([blobBytes.buffer], { type: "application/pdf" });
}
