import type { Metadata } from "next";
import { getEffectiveTool } from "@/lib/supabase/tools";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { RearrangePdfTool } from "@/components/tools/RearrangePdfTool";

const slug = "rearrange-pdf";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getEffectiveTool(slug);
  return { title: tool?.seoTitle || tool?.name || "PDF Tool", description: tool?.seoDescription || tool?.description || "", alternates: { canonical: "/tools/rearrange-pdf" } };
}

export default function RearrangePdfPage() {
  return (
    <ToolPageFrame slug={slug}>
      <RearrangePdfTool />
    </ToolPageFrame>
  );
}
