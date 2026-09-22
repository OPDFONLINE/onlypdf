import { mergePdfFiles } from "@/lib/pdf/mergePdf";
import { splitPdfIntoPages } from "@/lib/pdf/splitPdf";

export type ToolProcessorResult = { blob: Blob; filename: string };
export type ToolProcessor = (files: File[]) => Promise<ToolProcessorResult>;

export const toolProcessors: Partial<Record<string, ToolProcessor>> = {
  "merge-pdf": async (files) => {
    const blob = await mergePdfFiles(files);
    return { blob, filename: "merged.pdf" };
  },
  "split-pdf": async (files) => {
    const file = files[0];
    if (!file) throw new Error("Please add a PDF file first.");
    const blob = await splitPdfIntoPages(file);
    const baseName = file.name.replace(/\.pdf$/i, "").trim() || "document";
    return { blob, filename: `${baseName}-split.zip` };
  },
  // delete-pdf-pages, extract-pdf-pages, rearrange-pdf, and rotate-pdf are
  // implemented one at a time in later steps.
};
