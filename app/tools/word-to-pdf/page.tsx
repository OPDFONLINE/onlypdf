import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/tools";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { WordToPdfTool } from "@/components/tools/WordToPdfTool";

const tool = getToolBySlug("word-to-pdf")!;
export const metadata: Metadata = { title: tool.name, description: tool.description };

export default function WordToPdfPage() {
  return <ToolPageFrame slug={tool.slug}><WordToPdfTool /></ToolPageFrame>;
}
