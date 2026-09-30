/**
 * Inserts pages into a PDF after a chosen page. Runs entirely in the browser.
 *
 * `afterPage` is the number of base pages that stay in front of the new
 * pages: 0 inserts before page 1, 7 inserts right after page 7, and the
 * page count inserts at the very end.
 */
export type BlankPageSize = "match" | "a4" | "letter";

export type InsertSource =
  | { kind: "pdf"; file: File; /** 0-indexed pages of `file`, inserted in ascending order. */ pageIndexes: number[] }
  | { kind: "blank"; count: number; size: BlankPageSize };

const BLANK_SIZES: Record<Exclude<BlankPageSize, "match">, [number, number]> = {
  a4: [595.28, 841.89],
  letter: [612, 792],
};

async function readBytes(file: File): Promise<ArrayBuffer> {
  try {
    return await file.arrayBuffer();
  } catch {
    throw new Error(`Couldn't read "${file.name}". Try selecting it again.`);
  }
}

export async function insertPdfPages(base: File, afterPage: number, source: InsertSource): Promise<Blob> {
  const { PDFDocument } = await import("pdf-lib");

  let baseDoc;
  try {
    baseDoc = await PDFDocument.load(await readBytes(base));
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("Couldn't read")) throw err;
    throw new Error(`"${base.name}" couldn't be opened. It may be corrupted or password-protected.`);
  }

  const total = baseDoc.getPageCount();
  if (!Number.isInteger(afterPage) || afterPage < 0 || afterPage > total) {
    throw new Error("Choose a valid position for the new pages.");
  }

  if (source.kind === "blank") {
    const count = Math.floor(source.count);
    if (count < 1 || count > 200) throw new Error("Choose between 1 and 200 blank pages.");
    // Blank pages copy the size and rotation of the page just before the
    // insertion point (or the first page, when inserting at the start).
    const reference = baseDoc.getPage(Math.max(0, Math.min(total - 1, afterPage - 1)));
    for (let i = 0; i < count; i++) {
      const size = source.size === "match" ? reference.getSize() : { width: BLANK_SIZES[source.size][0], height: BLANK_SIZES[source.size][1] };
      const blank = baseDoc.insertPage(afterPage + i, [size.width, size.height]);
      if (source.size === "match") blank.setRotation(reference.getRotation());
    }
  } else {
    let insertDoc;
    try {
      insertDoc = await PDFDocument.load(await readBytes(source.file));
    } catch (err) {
      if (err instanceof Error && err.message.startsWith("Couldn't read")) throw err;
      throw new Error(`"${source.file.name}" couldn't be opened. It may be corrupted or password-protected.`);
    }
    const available = insertDoc.getPageCount();
    const indexes = Array.from(new Set(source.pageIndexes.filter((i) => i >= 0 && i < available))).sort((a, b) => a - b);
    if (indexes.length === 0) throw new Error("Select at least one page to insert.");
    const copied = await baseDoc.copyPages(insertDoc, indexes);
    copied.forEach((page, i) => baseDoc.insertPage(afterPage + i, page));
  }

  const outBytes = await baseDoc.save();
  return new Blob([outBytes as BlobPart], { type: "application/pdf" });
}
