import type { Metadata } from "next";
import { getEffectiveTool } from "@/lib/supabase/tools";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { PdfWatermarkRemoveTool } from "@/components/tools/PdfWatermarkRemoveTool";

const slug = "watermark-remove";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getEffectiveTool(slug);
  return { title: tool?.seoTitle || tool?.name || "PDF Tool", description: tool?.seoDescription || tool?.description || "", alternates: { canonical: "/tools/watermark-remove" } };
}

export default function WatermarkRemovePage() {
  return <ToolPageFrame slug={slug}><PdfWatermarkRemoveTool /></ToolPageFrame>;
}
