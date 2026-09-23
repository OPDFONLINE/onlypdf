import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/tools";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { PdfCompressTool } from "@/components/tools/PdfCompressTool";

const tool = getToolBySlug("compress-pdf")!;

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
};

export default function CompressPdfPage() {
  return (
    <ToolPageFrame slug={tool.slug}>
      <PdfCompressTool />
    </ToolPageFrame>
  );
}
