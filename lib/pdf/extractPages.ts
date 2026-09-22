/**
 * Creates a new PDF containing only the given 0-indexed pages, kept in
 * their original document order. Runs entirely in the browser.
 */
export async function extractPdfPages(file: File, pagesToKeep: number[]): Promise<Blob> {
  const { PDFDocument } = await import("pdf-lib");

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
  const keepSet = new Set(pagesToKeep.filter((i) => i >= 0 && i < totalPages));

  if (keepSet.size === 0) {
    throw new Error("Select at least one page to extract.");
  }

  // Keep the original document order, regardless of the order pages were clicked in.
  const keepIndices: number[] = [];
  for (let i = 0; i < totalPages; i++) {
    if (keepSet.has(i)) keepIndices.push(i);
  }

  const newDoc = await PDFDocument.create();
  const copiedPages = await newDoc.copyPages(sourcePdf, keepIndices);
  copiedPages.forEach((page) => newDoc.addPage(page));

  const outBytes = await newDoc.save();
  return new Blob([outBytes as BlobPart], { type: "application/pdf" });
}
