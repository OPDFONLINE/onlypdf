import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/tools";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { PdfWatermarkRemoveTool } from "@/components/tools/PdfWatermarkRemoveTool";

const tool = getToolBySlug("watermark-remove")!;
export const metadata: Metadata = { title: tool.name, description: tool.description };

export default function WatermarkRemovePage() {
  return <ToolPageFrame slug={tool.slug}><PdfWatermarkRemoveTool /></ToolPageFrame>;
}
