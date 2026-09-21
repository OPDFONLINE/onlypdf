import { mergePdfFiles } from "@/lib/pdf/mergePdf";

export type ToolProcessorResult = { blob: Blob; filename: string };
export type ToolProcessor = (files: File[]) => Promise<ToolProcessorResult>;

export const toolProcessors: Partial<Record<string, ToolProcessor>> = {
  "merge-pdf": async (files) => {
    const blob = await mergePdfFiles(files);
    return { blob, filename: "merged.pdf" };
  },
  // split-pdf, delete-pdf-pages, extract-pdf-pages, rearrange-pdf, and
  // rotate-pdf are implemented one at a time in later steps.
};
