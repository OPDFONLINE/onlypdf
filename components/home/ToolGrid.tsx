import { tools } from "@/lib/tools";
import { ToolCard } from "@/components/tools/ToolCard";

export function ToolGrid() {
  return (
    <section id="tools" className="container-page pb-20 md:pb-28">
      <h2 className="text-2xl sm:text-3xl">Six tools to start with</h2>
      <p className="mt-2 max-w-lg text-ink-muted">
        A small, focused set of tools that cover the most common PDF tasks.
        More are on the way.
      </p>

      <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}
