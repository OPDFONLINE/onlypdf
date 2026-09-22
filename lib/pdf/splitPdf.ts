import { createZip } from "@/lib/pdf/zip";

/**
 * Splits a single PDF into one PDF per page, and bundles the results into
 * a ZIP. Runs entirely in the browser.
 */
export async function splitPdfIntoPages(file: File): Promise<Blob> {
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

  const pageCount = sourcePdf.getPageCount();
  if (pageCount < 2) {
    throw new Error("This PDF only has one page, so there's nothing to split.");
  }

  const baseName = file.name.replace(/\.pdf$/i, "").trim() || "document";
  const digits = String(pageCount).length;
  const entries: { name: string; data: Uint8Array }[] = [];

  for (let i = 0; i < pageCount; i++) {
    const newDoc = await PDFDocument.create();
    const [copiedPage] = await newDoc.copyPages(sourcePdf, [i]);
    if (!copiedPage) continue;
    newDoc.addPage(copiedPage);
    const pageBytes = await newDoc.save();
    const pageNumber = String(i + 1).padStart(digits, "0");
    entries.push({ name: `${baseName}-page-${pageNumber}.pdf`, data: pageBytes });
  }

  const zipBytes = createZip(entries);
  return new Blob([zipBytes as BlobPart], { type: "application/zip" });
}
