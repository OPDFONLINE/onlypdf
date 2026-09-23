import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/tools";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { JpgToPdfTool } from "@/components/tools/JpgToPdfTool";

const tool = getToolBySlug("jpg-to-pdf")!;

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
};

export default function JpgToPdfPage() {
  return (
    <ToolPageFrame slug={tool.slug}>
      <JpgToPdfTool />
    </ToolPageFrame>
  );
}
