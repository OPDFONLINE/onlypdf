/**
 * Merges multiple PDF files into one, in the given order.
 * Runs entirely in the browser — no file is ever uploaded anywhere.
 */
export async function mergePdfFiles(files: File[]): Promise<Blob> {
  const { PDFDocument } = await import("pdf-lib");
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
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

    const copiedPages = await mergedPdf.copyPages(sourcePdf, sourcePdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedBytes = await mergedPdf.save();
  return new Blob([mergedBytes as BlobPart], { type: "application/pdf" });
}
