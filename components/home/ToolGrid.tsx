import { tools } from "@/lib/tools";
import { ToolCard } from "@/components/tools/ToolCard";

export function ToolGrid() {
  return (
    <section id="tools" className="container-page pb-20 md:pb-28">
      <h2 className="text-2xl sm:text-3xl">PDF tools</h2>
      <p className="mt-2 max-w-lg text-ink-muted">
        Nine focused tools for merging, splitting, compressing, editing, and converting PDFs — all in one place.
      </p>

      <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}
