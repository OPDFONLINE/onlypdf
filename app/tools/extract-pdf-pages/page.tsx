import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/tools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

const tool = getToolBySlug("extract-pdf-pages")!;

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
};

export default function ExtractPdfPagesPage() {
  return <ToolPageShell tool={tool} />;
}
