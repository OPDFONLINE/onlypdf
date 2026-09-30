"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export function PageNav({ current, pageCount, onChange }: { current: number; pageCount: number; onChange: (index: number) => void }) {
  if (pageCount <= 1) return <p className="text-xs font-semibold text-ink-muted">Page 1 of 1</p>;
  const btn = "flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-ink-muted transition-colors hover:border-teal hover:text-teal disabled:pointer-events-none disabled:opacity-40";
  return (
    <div className="flex items-center gap-2">
      <button type="button" className={btn} disabled={current <= 0} onClick={() => onChange(current - 1)} aria-label="Previous page">
        <ChevronLeft size={16} />
      </button>
      <label className="flex items-center gap-2 text-xs font-semibold text-ink-muted">
        Page
        <select value={current} onChange={(e) => onChange(Number(e.target.value))} className="rounded-lg border border-border bg-surface px-2 py-1.5 text-sm text-ink">
          {Array.from({ length: pageCount }, (_, i) => (
            <option key={i} value={i}>{i + 1}</option>
          ))}
        </select>
        of {pageCount}
      </label>
      <button type="button" className={btn} disabled={current >= pageCount - 1} onClick={() => onChange(current + 1)} aria-label="Next page">
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
