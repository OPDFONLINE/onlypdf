import { mergePdfFiles } from "@/lib/pdf/mergePdf";
import { splitPdfIntoPages } from "@/lib/pdf/splitPdf";
import { deletePdfPages } from "@/lib/pdf/deletePages";

export type ToolProcessorResult = { blob: Blob; filename: string };
export type ToolProcessor = (
  files: File[],
  /** 0-indexed page numbers selected in the page picker, for tools that use one. */
  selectedPages: number[]
) => Promise<ToolProcessorResult>;

function baseNameOf(file: File): string {
  return file.name.replace(/\.pdf$/i, "").trim() || "document";
}

export const toolProcessors: Partial<Record<string, ToolProcessor>> = {
  "merge-pdf": async (files) => {
    const blob = await mergePdfFiles(files);
    return { blob, filename: "merged.pdf" };
  },
  "split-pdf": async (files) => {
    const file = files[0];
    if (!file) throw new Error("Please add a PDF file first.");
    const blob = await splitPdfIntoPages(file);
    return { blob, filename: `${baseNameOf(file)}-split.zip` };
  },
  "delete-pdf-pages": async (files, selectedPages) => {
    const file = files[0];
    if (!file) throw new Error("Please add a PDF file first.");
    const blob = await deletePdfPages(file, selectedPages);
    return { blob, filename: `${baseNameOf(file)}-edited.pdf` };
  },
  // extract-pdf-pages, rearrange-pdf, and rotate-pdf are implemented one at
  // a time in later steps.
};
