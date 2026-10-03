import type { Metadata } from "next";
import { getEffectiveTool } from "@/lib/supabase/tools";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { JpgToPdfTool } from "@/components/tools/JpgToPdfTool";

const slug = "jpg-to-pdf";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getEffectiveTool(slug);
  return buildPageMetadata({
    title: tool?.seoTitle || tool?.name || "PDF Tool",
    description: tool?.seoDescription || tool?.description || "",
    path: `/tools/${slug}`,
  });
}

export default function JpgToPdfPage() {
  return (
    <ToolPageFrame slug={slug}>
      <JpgToPdfTool slug={slug} kind="jpg" />
    </ToolPageFrame>
  );
}
