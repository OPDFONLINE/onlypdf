import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/tools";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { PdfToWordTool } from "@/components/tools/PdfToWordTool";

const tool = getToolBySlug("pdf-to-word")!;
export const metadata: Metadata = { title: tool.name, description: tool.description };

export default function PdfToWordPage() {
  return <ToolPageFrame slug={tool.slug}><PdfToWordTool /></ToolPageFrame>;
}
