import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Tool } from "@/lib/tools";
import { toolColorClasses } from "@/lib/toolColors";

export function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  const colors = toolColorClasses[tool.color];

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={`group flex flex-col justify-between rounded-card border-2 border-border bg-surface p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift ${colors.ring}`}
    >
      <div>
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colors.badgeBg} ${colors.badgeText}`}
        >
          <Icon size={22} aria-hidden="true" strokeWidth={2.25} />
        </span>
        <h3 className="mt-4 text-lg font-bold text-ink">{tool.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
          {tool.description}
        </p>
      </div>

      <span className={`mt-6 flex items-center gap-1 text-sm font-semibold ${colors.text}`}>
        Open tool
        <ArrowUpRight
          size={16}
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
