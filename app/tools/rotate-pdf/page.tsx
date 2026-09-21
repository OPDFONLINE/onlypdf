import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/tools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

const tool = getToolBySlug("rotate-pdf")!;

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
};

export default function RotatePdfPage() {
  return <ToolPageShell slug={tool.slug} />;
}
