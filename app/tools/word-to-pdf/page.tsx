import type { Metadata } from "next";
import { getEffectiveTool } from "@/lib/supabase/tools";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { WordToPdfTool } from "@/components/tools/WordToPdfTool";

const slug = "word-to-pdf";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getEffectiveTool(slug);
  return { title: tool?.seoTitle || tool?.name || "PDF Tool", description: tool?.seoDescription || tool?.description || "", alternates: { canonical: "/tools/word-to-pdf" } };
}

export default function WordToPdfPage() {
  return <ToolPageFrame slug={slug}><WordToPdfTool /></ToolPageFrame>;
}
