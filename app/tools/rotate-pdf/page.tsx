import type { Metadata } from "next";
import { getEffectiveTool } from "@/lib/supabase/tools";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { RotatePdfTool } from "@/components/tools/RotatePdfTool";

const slug = "rotate-pdf";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getEffectiveTool(slug);
  return buildPageMetadata({
    title: tool?.seoTitle || tool?.name || "PDF Tool",
    description: tool?.seoDescription || tool?.description || "",
    path: `/tools/${slug}`,
  });
}

export default function RotatePdfPage() {
  return (
    <ToolPageFrame slug={slug}>
      <RotatePdfTool />
    </ToolPageFrame>
  );
}
