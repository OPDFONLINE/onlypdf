export type WatermarkRect = {
  /** Normalized coordinates relative to the page as displayed: 0..1, origin top-left. */
  x: number;
  y: number;
  width: number;
  height: number;
};

export type RgbColor = { r: number; g: number; b: number };

export type AreaJob = {
  pageIndex: number;
  rect: WatermarkRect;
  /** Fill colour, 0..255 per channel. */
  color: RgbColor;
};

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/**
 * Covers the given areas with opaque rectangles.
 *
 * This is a cover-up, not a deletion: whatever is under the rectangle is still
 * inside the PDF and can be found by text extraction. It is meant for
 * watermarks baked into the page. For watermarks that are separate objects,
 * use removeDetectedWatermarks() from watermarkDetect.ts, which really removes them.
 *
 * Handles pages with a /Rotate entry and non-zero crop-box origins by mapping
 * the displayed (top-left based) rectangle back into the page's own coordinates.
 */
export async function removeWatermarkAreas(file: File, jobs: AreaJob[]): Promise<Blob> {
  if (jobs.length === 0) throw new Error("Select at least one area to remove.");

  const { PDFDocument, rgb } = await import("pdf-lib");
  let doc;
  try {
    doc = await PDFDocument.load(await file.arrayBuffer());
  } catch {
    throw new Error("This PDF couldn't be opened. It may be password-protected or damaged.");
  }
  const pages = doc.getPages();

  for (const job of jobs) {
    const page = pages[job.pageIndex];
    if (!page) continue;
    const { rect } = job;
    if (rect.width <= 0 || rect.height <= 0) continue;

    const box = page.getCropBox();
    const rotation = (((page.getRotation().angle % 360) + 360) % 360) as 0 | 90 | 180 | 270;

    // Map a displayed point (u right, v down, both 0..1) into user space.
    const toUser = (u: number, v: number) => {
      switch (rotation) {
        case 90:
          return { x: box.x + v * box.width, y: box.y + u * box.height };
        case 180:
          return { x: box.x + (1 - u) * box.width, y: box.y + v * box.height };
        case 270:
          return { x: box.x + (1 - v) * box.width, y: box.y + (1 - u) * box.height };
        default:
          return { x: box.x + u * box.width, y: box.y + (1 - v) * box.height };
      }
    };

    const x0 = clamp01(rect.x);
    const y0 = clamp01(rect.y);
    const x1 = clamp01(rect.x + rect.width);
    const y1 = clamp01(rect.y + rect.height);
    const a = toUser(x0, y0);
    const b = toUser(x1, y1);

    page.drawRectangle({
      x: Math.min(a.x, b.x),
      y: Math.min(a.y, b.y),
      width: Math.abs(b.x - a.x),
      height: Math.abs(b.y - a.y),
      color: rgb(job.color.r / 255, job.color.g / 255, job.color.b / 255),
      opacity: 1,
      borderWidth: 0,
    });
  }

  // pdf-lib may return Uint8Array<ArrayBufferLike>; copy into an ArrayBuffer-backed view for Blob.
  const saved = await doc.save();
  const bytes = new Uint8Array(saved.byteLength);
  bytes.set(saved);
  return new Blob([bytes.buffer], { type: "application/pdf" });
}
