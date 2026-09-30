"use client";

import type { PreviewSize } from "./usePreviewSize";

const OPTIONS: { value: PreviewSize; short: string; label: string }[] = [
  { value: "small", short: "S", label: "Small" },
  { value: "medium", short: "M", label: "Medium" },
  { value: "large", short: "L", label: "Large" },
];

export function PreviewSizeControl({
  value,
  onChange,
  activeClass,
}: {
  value: PreviewSize;
  onChange: (size: PreviewSize) => void;
  /** Solid background class for the active option, e.g. colors.solidBg. */
  activeClass: string;
}) {
  return (
    <div className="flex items-center gap-2" role="group" aria-label="Preview size">
      <span className="text-xs font-semibold text-ink-soft">Preview</span>
      <div className="flex rounded-pill border-2 border-border bg-surface p-0.5">
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={value === option.value}
            aria-label={`${option.label} previews`}
            title={`${option.label} previews`}
            className={`h-7 min-w-[2rem] rounded-pill px-2.5 text-xs font-bold transition-colors ${
              value === option.value ? `${activeClass} text-white` : "text-ink-muted hover:text-ink"
            }`}
          >
            {option.short}
          </button>
        ))}
      </div>
    </div>
  );
}
