import type { ReactNode } from "react";
import Link from "next/link";
import { getRelatedTools, getToolBySlug } from "@/lib/tools";
import { toolColorClasses } from "@/lib/toolColors";
import { Faq } from "@/components/ui/Faq";

/**
 * Shared layout for tool pages whose upload/preview/action area is too
 * custom to fit the generic ToolPageShell (Rearrange PDF Pages, Rotate
 * PDF). Handles the title, instructions, FAQ, and related-tools sidebar;
 * the tool itself renders its own upload zone and controls as children.
 */
export function ToolPageFrame({ slug, children }: { slug: string; children: ReactNode }) {
  const tool = getToolBySlug(slug);
  if (!tool) return null;

  const Icon = tool.icon;
  const colors = toolColorClasses[tool.color];
  const related = getRelatedTools(tool.slug);

  return (
    <div className="container-page py-14 md:py-16">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colors.badgeBg} ${colors.badgeText}`}
          >
            <Icon size={22} aria-hidden="true" strokeWidth={2.25} />
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl">{tool.name}</h1>
          <p className="mt-3 max-w-md text-ink-muted">{tool.oneLiner}</p>

          {children}

          <div className="mt-14">
            <h2 className="text-xl">How it works</h2>
            <ol className="mt-4 space-y-3">
              {tool.instructions.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm text-ink-muted">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${colors.badgeBg} ${colors.badgeText}`}
                  >
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <aside className="lg:pt-1">
          <div className="rounded-card border-2 border-border bg-surface p-6 shadow-soft">
            <h2 className="text-sm font-bold text-ink">Related tools</h2>
            <ul className="mt-4 space-y-1">
              {related.map((t) => {
                const RelatedIcon = t.icon;
                const relatedColors = toolColorClasses[t.color];
                return (
                  <li key={t.slug}>
                    <Link
                      href={`/tools/${t.slug}`}
                      className="-mx-2 flex items-center gap-3 rounded-xl px-2 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-paper hover:text-ink"
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${relatedColors.badgeBg} ${relatedColors.badgeText}`}
                      >
                        <RelatedIcon size={15} aria-hidden="true" strokeWidth={2.25} />
                      </span>
                      {t.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>

      <div className="mt-16 max-w-2xl border-t border-border pt-14 md:mt-20">
        <Faq items={tool.faq} />
      </div>
    </div>
  );
}
