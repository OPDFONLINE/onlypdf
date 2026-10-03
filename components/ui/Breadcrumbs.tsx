import Link from "next/link";
import type { Crumb } from "@/lib/seo/schema";

/**
 * Visible breadcrumb trail. The last item is the current page. Keep it in sync
 * with the BreadcrumbList JSON-LD built from the same crumbs (lib/seo/schema.ts).
 * No hooks or server-only imports, so it works in server and client components.
 */
export function Breadcrumbs({ crumbs, className = "" }: { crumbs: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-soft">
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex min-w-0 items-center gap-2">
              {last ? (
                <span aria-current="page" className="truncate font-semibold text-ink-muted">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} className="hover:text-ink hover:underline">
                  {crumb.name}
                </Link>
              )}
              {!last && <span aria-hidden="true">›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
