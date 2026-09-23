import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/tools";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { RotatePdfTool } from "@/components/tools/RotatePdfTool";

const tool = getToolBySlug("rotate-pdf")!;

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
};

export default function RotatePdfPage() {
  return (
    <ToolPageFrame slug={tool.slug}>
      <RotatePdfTool />
    </ToolPageFrame>
  );
}
