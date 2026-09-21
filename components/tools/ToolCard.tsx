import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Tool } from "@/lib/tools";

export function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col justify-between rounded-card border border-border bg-surface p-6 transition-colors hover:border-accent"
    >
      <div>
        <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-accent-soft text-accent">
          <Icon size={20} aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-lg font-medium text-ink">{tool.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
          {tool.description}
        </p>
      </div>

      <span className="mt-6 flex items-center gap-1.5 text-sm font-medium text-accent">
        Open tool
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
