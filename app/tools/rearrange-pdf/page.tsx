import type { Metadata } from "next";
import { getEffectiveTool } from "@/lib/supabase/tools";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { RearrangePdfTool } from "@/components/tools/RearrangePdfTool";

const slug = "rearrange-pdf";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getEffectiveTool(slug);
  return buildPageMetadata({
    title: tool?.seoTitle || tool?.name || "PDF Tool",
    description: tool?.seoDescription || tool?.description || "",
    path: `/tools/${slug}`,
  });
}

export default function RearrangePdfPage() {
  return (
    <ToolPageFrame slug={slug}>
      <RearrangePdfTool />
    </ToolPageFrame>
  );
}
