import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  totalPages: number;
  /** Path without query string, e.g. "/blog". */
  basePath: string;
  /** Extra query params to preserve on every link (empty values are dropped). */
  params?: Record<string, string | undefined>;
  className?: string;
};

function href(basePath: string, params: Record<string, string | undefined>, page: number) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) if (value) search.set(key, value);
  if (page > 1) search.set("page", String(page));
  const qs = search.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

/** 1 … 4 5 [6] 7 8 … 20 style window. */
function windowed(page: number, total: number): (number | "gap")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | "gap")[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(total - 1, page + 1);
  if (start > 2) out.push("gap");
  for (let i = start; i <= end; i += 1) out.push(i);
  if (end < total - 1) out.push("gap");
  out.push(total);
  return out;
}

export function Pagination({ page, totalPages, basePath, params = {}, className = "" }: Props) {
  if (totalPages <= 1) return null;
  const base = "inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-semibold transition-colors";
  const idle = "border-border bg-surface text-ink-muted hover:border-accent hover:text-accent-dark";
  const disabled = "pointer-events-none border-border bg-paper text-ink-soft opacity-60";

  return (
    <nav aria-label="Pagination" className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      <Link
        href={href(basePath, params, Math.max(page - 1, 1))}
        aria-label="Previous page"
        aria-disabled={page <= 1}
        tabIndex={page <= 1 ? -1 : undefined}
        rel={page > 1 ? "prev" : undefined}
        className={`${base} gap-1 ${page <= 1 ? disabled : idle}`}
      >
        <ChevronLeft size={16} aria-hidden="true" /> <span className="hidden sm:inline">Prev</span>
      </Link>
      {windowed(page, totalPages).map((item, i) =>
        item === "gap" ? (
          <span key={`gap-${i}`} className="px-1 text-ink-soft" aria-hidden="true">…</span>
        ) : (
          <Link
            key={item}
            href={href(basePath, params, item)}
            aria-label={`Page ${item}`}
            aria-current={item === page ? "page" : undefined}
            className={`${base} ${item === page ? "border-accent bg-accent text-white" : idle}`}
          >
            {item}
          </Link>
        )
      )}
      <Link
        href={href(basePath, params, Math.min(page + 1, totalPages))}
        aria-label="Next page"
        aria-disabled={page >= totalPages}
        tabIndex={page >= totalPages ? -1 : undefined}
        rel={page < totalPages ? "next" : undefined}
        className={`${base} gap-1 ${page >= totalPages ? disabled : idle}`}
      >
        <span className="hidden sm:inline">Next</span> <ChevronRight size={16} aria-hidden="true" />
      </Link>
    </nav>
  );
}
