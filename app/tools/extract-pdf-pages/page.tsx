import type { Metadata } from "next";
import { getEffectiveTool } from "@/lib/supabase/tools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

const slug = "extract-pdf-pages";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getEffectiveTool(slug);
  return { title: tool?.seoTitle || tool?.name || "PDF Tool", description: tool?.seoDescription || tool?.description || "", alternates: { canonical: "/tools/extract-pdf-pages" } };
}

export default function ExtractPdfPagesPage() {
  return <ToolPageShell slug={slug} />;
}
