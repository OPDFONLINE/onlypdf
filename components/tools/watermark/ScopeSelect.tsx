"use client";

import type { PageScope, ScopeMode } from "@/lib/pdf/pageScope";

const LABELS: Record<ScopeMode, string> = {
  all: "All pages",
  current: "This page only",
  odd: "Odd pages (1, 3, 5…)",
  even: "Even pages (2, 4, 6…)",
  range: "Custom range",
};

export function ScopeSelect({
  value,
  onChange,
  pageCount,
  id,
}: {
  value: PageScope;
  onChange: (next: PageScope) => void;
  pageCount: number;
  id: string;
}) {
  const modes: ScopeMode[] = pageCount > 1 ? ["all", "current", "odd", "even", "range"] : ["all"];
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        id={id}
        aria-label="Pages to apply to"
        value={value.mode}
        onChange={(e) => onChange({ ...value, mode: e.target.value as ScopeMode })}
        className="rounded-lg border border-border bg-surface px-2.5 py-1.5 text-sm text-ink"
      >
        {modes.map((mode) => (
          <option key={mode} value={mode}>{LABELS[mode]}</option>
        ))}
      </select>
      {value.mode === "range" && (
        <input
          value={value.range}
          onChange={(e) => onChange({ ...value, range: e.target.value })}
          placeholder={`e.g. 1-3, 5, 8-${Math.max(pageCount, 8)}`}
          aria-label="Page range"
          className="w-44 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-sm text-ink"
        />
      )}
    </div>
  );
}
