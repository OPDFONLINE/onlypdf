"use client";

import type { DragEvent, ReactNode } from "react";

export function PdfPageThumb({
  dataUrl,
  label,
  rotation = 0,
  selected = false,
  accentClass = "border-accent",
  onClick,
  ariaLabel,
  draggable = false,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  isDragging = false,
  cornerBadge,
  footer,
}: {
  dataUrl: string;
  label: string;
  /** Extra visual rotation to preview, in degrees clockwise. */
  rotation?: number;
  selected?: boolean;
  accentClass?: string;
  onClick?: () => void;
  ariaLabel: string;
  draggable?: boolean;
  onDragStart?: () => void;
  onDragOver?: (e: DragEvent) => void;
  onDrop?: (e: DragEvent) => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
  /** Small element rendered in the top-right corner, e.g. a checkmark. */
  cornerBadge?: ReactNode;
  /** Row of controls rendered under the thumbnail, e.g. rotate/move buttons. */
  footer?: ReactNode;
}) {
  return (
    <div
      className={`group relative rounded-2xl border-2 bg-surface p-2.5 transition-all ${
        selected ? `${accentClass} shadow-soft` : "border-border"
      } ${isDragging ? "opacity-40" : ""}`}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        aria-pressed={onClick ? selected : undefined}
        className="block w-full overflow-hidden rounded-xl bg-paper"
      >
        <div className="flex aspect-[3/4] items-center justify-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dataUrl}
            alt=""
            className="max-h-full max-w-full object-contain transition-transform duration-200"
            style={{ transform: `rotate(${rotation}deg)` }}
            draggable={false}
          />
        </div>
      </button>

      {cornerBadge && <div className="absolute right-3.5 top-3.5">{cornerBadge}</div>}

      <p className="mt-2 text-center text-xs font-semibold text-ink-muted">{label}</p>

      {footer && <div className="mt-1.5 flex items-center justify-center gap-1">{footer}</div>}
    </div>
  );
}
