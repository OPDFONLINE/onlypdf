import type { Metadata } from "next";
import { getEffectiveTool } from "@/lib/supabase/tools";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { PdfToWordTool } from "@/components/tools/PdfToWordTool";

const slug = "pdf-to-word";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getEffectiveTool(slug);
  return { title: tool?.seoTitle || tool?.name || "PDF Tool", description: tool?.seoDescription || tool?.description || "" };
}

export default function PdfToWordPage() {
  return <ToolPageFrame slug={slug}><PdfToWordTool /></ToolPageFrame>;
}
