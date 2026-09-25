import type { Metadata } from "next";
import { getEffectiveTool } from "@/lib/supabase/tools";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { RotatePdfTool } from "@/components/tools/RotatePdfTool";

const slug = "rotate-pdf";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getEffectiveTool(slug);
  return { title: tool?.seoTitle || tool?.name || "PDF Tool", description: tool?.seoDescription || tool?.description || "", alternates: { canonical: "/tools/rotate-pdf" } };
}

export default function RotatePdfPage() {
  return (
    <ToolPageFrame slug={slug}>
      <RotatePdfTool />
    </ToolPageFrame>
  );
}
