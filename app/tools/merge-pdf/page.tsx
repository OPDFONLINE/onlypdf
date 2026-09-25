import type { Metadata } from "next";
import { getEffectiveTool } from "@/lib/supabase/tools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

const slug = "merge-pdf";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getEffectiveTool(slug);
  return { title: tool?.seoTitle || tool?.name || "PDF Tool", description: tool?.seoDescription || tool?.description || "", alternates: { canonical: "/tools/merge-pdf" } };
}

export default function MergePdfPage() {
  return <ToolPageShell slug={slug} />;
}
