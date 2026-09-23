/**
 * Applies a rotation to selected pages of a PDF, keeping page order and
 * content untouched. Runs entirely in the browser.
 */
export async function rotatePdfPages(
  file: File,
  /** Map of 0-indexed page number -> total rotation in degrees clockwise (0, 90, 180, 270) to apply on top of the page's current rotation. */
  rotations: Map<number, number>
): Promise<Blob> {
  const { PDFDocument, degrees } = await import("pdf-lib");

  let bytes: ArrayBuffer;
  try {
    bytes = await file.arrayBuffer();
  } catch {
    throw new Error(`Couldn't read "${file.name}". Try selecting it again.`);
  }

  let pdfDoc;
  try {
    pdfDoc = await PDFDocument.load(bytes);
  } catch {
    throw new Error(
      `"${file.name}" couldn't be opened. It may be corrupted or password-protected.`
    );
  }

  const totalPages = pdfDoc.getPageCount();
  const pagesToRotate = Array.from(rotations.entries()).filter(([, delta]) => delta % 360 !== 0);

  if (pagesToRotate.length === 0) {
    throw new Error("Rotate at least one page before applying changes.");
  }

  for (const [pageIndex, delta] of pagesToRotate) {
    if (pageIndex < 0 || pageIndex >= totalPages) continue;
    const page = pdfDoc.getPage(pageIndex);
    const current = page.getRotation().angle;
    page.setRotation(degrees((current + delta + 360) % 360));
  }

  const outBytes = await pdfDoc.save();
  return new Blob([outBytes as BlobPart], { type: "application/pdf" });
}
