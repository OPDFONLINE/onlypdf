import type { Metadata } from "next";
import { tools } from "@/lib/tools";
import { ToolCard } from "@/components/tools/ToolCard";

export const metadata: Metadata = {
  title: "PDF Tools",
  description:
    "Free PDF tools that run in your browser: merge, split, compress, delete pages, extract pages, rearrange, rotate, and convert PDF files to and from JPG/PNG images.",
};

export default function ToolsPage() {
  return (
    <div className="container-page py-16 md:py-20">
      <h1 className="max-w-xl text-3xl sm:text-4xl">PDF tools</h1>
      <p className="mt-3 max-w-lg text-ink-muted">
        All nine tools run in your browser. No sign-up and no server upload are required for these tools.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
