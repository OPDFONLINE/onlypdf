import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/tools";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { PdfToImageTool } from "@/components/tools/PdfToImageTool";

const tool = getToolBySlug("pdf-to-jpg")!;

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
};

export default function PdfToJpgPage() {
  return (
    <ToolPageFrame slug={tool.slug}>
      <PdfToImageTool />
    </ToolPageFrame>
  );
}
