/** Which pages an operation applies to. Pages are 1-based for people, 0-based in code. */
export type ScopeMode = "all" | "current" | "odd" | "even" | "range";

export type PageScope = { mode: ScopeMode; range: string };

export const DEFAULT_SCOPE: PageScope = { mode: "all", range: "" };

/** Returns sorted, unique 0-based page indexes. Throws a friendly error for a bad range. */
export function resolveScope(scope: PageScope, currentIndex: number, pageCount: number): number[] {
  const all = Array.from({ length: pageCount }, (_, i) => i);
  switch (scope.mode) {
    case "all":
      return all;
    case "current":
      return currentIndex >= 0 && currentIndex < pageCount ? [currentIndex] : [];
    case "odd":
      return all.filter((i) => i % 2 === 0);
    case "even":
      return all.filter((i) => i % 2 === 1);
    case "range": {
      const parts = scope.range.split(/[,\s]+/).filter(Boolean);
      if (parts.length === 0) throw new Error("Enter a page range, for example 1-3, 5, 8-10.");
      const picked = new Set<number>();
      for (const part of parts) {
        const match = /^(\d+)(?:-(\d+))?$/.exec(part);
        if (!match) throw new Error(`"${part}" isn't a valid page range. Use something like 1-3, 5, 8-10.`);
        const from = parseInt(match[1] ?? "0", 10);
        const to = match[2] ? parseInt(match[2], 10) : from;
        if (from < 1 || to < from || to > pageCount) {
          throw new Error(`Page range "${part}" is outside 1-${pageCount}.`);
        }
        for (let p = from; p <= to; p += 1) picked.add(p - 1);
      }
      return [...picked].sort((a, b) => a - b);
    }
  }
}

/** Same as resolveScope but returns [] instead of throwing (for live UI). */
export function safeResolveScope(scope: PageScope, currentIndex: number, pageCount: number): number[] {
  try {
    return resolveScope(scope, currentIndex, pageCount);
  } catch {
    return [];
  }
}
