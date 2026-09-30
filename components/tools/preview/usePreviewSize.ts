"use client";

import { useCallback, useEffect, useState } from "react";

export type PreviewSize = "small" | "medium" | "large";

const STORAGE_KEY = "onlypdf_preview_size";

/** Literal class strings so Tailwind's scanner includes them in the build. */
export const PREVIEW_GRID_CLASSES: Record<PreviewSize, string> = {
  small: "grid-cols-3 sm:grid-cols-4 md:grid-cols-6",
  medium: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
  large: "grid-cols-1 sm:grid-cols-2",
};

/** Remembers the chosen preview size across tools and visits (best effort). */
export function usePreviewSize(): [PreviewSize, (size: PreviewSize) => void] {
  const [size, setSizeState] = useState<PreviewSize>("medium");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "small" || saved === "medium" || saved === "large") setSizeState(saved);
    } catch {
      // Storage can be blocked; the default is fine.
    }
  }, []);

  const setSize = useCallback((next: PreviewSize) => {
    setSizeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore.
    }
  }, []);

  return [size, setSize];
}
