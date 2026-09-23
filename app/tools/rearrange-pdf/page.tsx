import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/tools";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { RearrangePdfTool } from "@/components/tools/RearrangePdfTool";

const tool = getToolBySlug("rearrange-pdf")!;

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
};

export default function RearrangePdfPage() {
  return (
    <ToolPageFrame slug={tool.slug}>
      <RearrangePdfTool />
    </ToolPageFrame>
  );
}
