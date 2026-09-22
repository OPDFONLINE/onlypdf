/**
 * Removes the given 0-indexed pages from a PDF, keeping the rest in order.
 * Runs entirely in the browser.
 */
export async function deletePdfPages(file: File, pagesToDelete: number[]): Promise<Blob> {
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
  const deleteSet = new Set(pagesToDelete);

  if (deleteSet.size === 0) {
    throw new Error("Select at least one page to delete.");
  }
  if (deleteSet.size >= totalPages) {
    throw new Error("You can't delete every page \u2014 at least one page has to remain.");
  }

  const keepIndices: number[] = [];
  for (let i = 0; i < totalPages; i++) {
    if (!deleteSet.has(i)) keepIndices.push(i);
  }

  const newDoc = await PDFDocument.create();
  const copiedPages = await newDoc.copyPages(sourcePdf, keepIndices);
  copiedPages.forEach((page) => newDoc.addPage(page));

  const outBytes = await newDoc.save();
  return new Blob([outBytes as BlobPart], { type: "application/pdf" });
}
