/**
 * Rebuilds a PDF with its pages in a new order, optionally applying an
 * extra rotation to individual pages at the same time. Runs entirely in
 * the browser.
 */
export type ReorderedPage = {
  /** 0-indexed page number in the original source PDF. */
  originalIndex: number;
  /** Additional rotation to apply, in degrees clockwise (0, 90, 180, 270). */
  rotationDelta: number;
};

export async function reorderPdfPages(
  file: File,
  newOrder: ReorderedPage[]
): Promise<Blob> {
  const { PDFDocument, degrees } = await import("pdf-lib");

  let bytes: ArrayBuffer;
  try {
    bytes = await file.arrayBuffer();
  } catch {
    throw new Error(`Couldn't read "${file.name}". Try selecting it again.`);
  }

  let sourcePdf;
  try {
    sourcePdf = await PDFDocument.load(bytes);
  } catch {
    throw new Error(
      `"${file.name}" couldn't be opened. It may be corrupted or password-protected.`
    );
  }

  const totalPages = sourcePdf.getPageCount();
  if (newOrder.length === 0) {
    throw new Error("There are no pages to reorder.");
  }
  if (newOrder.some((p) => p.originalIndex < 0 || p.originalIndex >= totalPages)) {
    throw new Error("Something went wrong matching up the pages. Please reload the file and try again.");
  }

  const newDoc = await PDFDocument.create();
  const copiedPages = await newDoc.copyPages(
    sourcePdf,
    newOrder.map((p) => p.originalIndex)
  );

  copiedPages.forEach((page, i) => {
    const delta = newOrder[i]?.rotationDelta ?? 0;
    if (delta % 360 !== 0) {
      const current = page.getRotation().angle;
      page.setRotation(degrees((current + delta + 360) % 360));
    }
    newDoc.addPage(page);
  });

  const outBytes = await newDoc.save();
  return new Blob([outBytes as BlobPart], { type: "application/pdf" });
}
