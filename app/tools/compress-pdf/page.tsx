import type { Metadata } from "next";
import { getEffectiveTool } from "@/lib/supabase/tools";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { PdfCompressTool } from "@/components/tools/PdfCompressTool";

const slug = "compress-pdf";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getEffectiveTool(slug);
  return { title: tool?.seoTitle || tool?.name || "PDF Tool", description: tool?.seoDescription || tool?.description || "" };
}

export default function CompressPdfPage() {
  return (
    <ToolPageFrame slug={slug}>
      <PdfCompressTool />
    </ToolPageFrame>
  );
}
