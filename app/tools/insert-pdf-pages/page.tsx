import type { Metadata } from "next";
import { getEffectiveTool } from "@/lib/supabase/tools";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { InsertPdfPagesTool } from "@/components/tools/InsertPdfPagesTool";

const slug = "insert-pdf-pages";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getEffectiveTool(slug);
  return buildPageMetadata({
    title: tool?.seoTitle || tool?.name || "PDF Tool",
    description: tool?.seoDescription || tool?.description || "",
    path: `/tools/${slug}`,
  });
}

export default function InsertPdfPagesPage() {
  return (
    <ToolPageFrame slug={slug}>
      <InsertPdfPagesTool />
    </ToolPageFrame>
  );
}
