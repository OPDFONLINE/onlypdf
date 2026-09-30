import type { Metadata } from "next";
import { getEffectiveTool } from "@/lib/supabase/tools";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { PdfToImageTool } from "@/components/tools/PdfToImageTool";

const slug = "pdf-to-png";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getEffectiveTool(slug);
  return { title: tool?.seoTitle || tool?.name || "PDF Tool", description: tool?.seoDescription || tool?.description || "", alternates: { canonical: "/tools/pdf-to-png" } };
}

export default function PdfToPngPage() {
  return (
    <ToolPageFrame slug={slug}>
      <PdfToImageTool slug={slug} format="png" />
    </ToolPageFrame>
  );
}
