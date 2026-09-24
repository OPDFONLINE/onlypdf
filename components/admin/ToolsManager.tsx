"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import type { EffectiveTool } from "@/lib/supabase/tools";

type EditableTool = {
  slug: string;
  enabled: boolean;
  name: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
  homepageVisible: boolean;
  sortOrder: number;
};

function toEditable(tool: EffectiveTool): EditableTool {
  return {
    slug: tool.slug,
    enabled: tool.enabled,
    name: tool.name,
    description: tool.description,
    seoTitle: tool.seoTitle,
    seoDescription: tool.seoDescription,
    featured: tool.featured,
    homepageVisible: tool.homepageVisible,
    sortOrder: tool.sortOrder,
  };
}

export function ToolsManager({ initialTools }: { initialTools: EffectiveTool[] }) {
  const [rows, setRows] = useState<EditableTool[]>(initialTools.map(toEditable));
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [savedSlug, setSavedSlug] = useState<string | null>(null);
  const [errorBySlug, setErrorBySlug] = useState<Record<string, string>>({});

  function updateRow(slug: string, patch: Partial<EditableTool>) {
    setRows((prev) => prev.map((row) => (row.slug === slug ? { ...row, ...patch } : row)));
    setSavedSlug(null);
  }

  async function save(slug: string) {
    const row = rows.find((r) => r.slug === slug);
    if (!row) return;
    setSavingSlug(slug);
    setErrorBySlug((prev) => ({ ...prev, [slug]: "" }));
    try {
      const res = await fetch("/api/admin/tools", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: row.slug,
          enabled: row.enabled,
          name: row.name,
          description: row.description,
          seo_title: row.seoTitle,
          seo_description: row.seoDescription,
          sort_order: row.sortOrder,
          featured: row.featured,
          homepage_visible: row.homepageVisible,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(typeof body.error === "string" ? body.error : "Couldn't save this tool.");
      }
      setSavedSlug(slug);
    } catch (err) {
      setErrorBySlug((prev) => ({
        ...prev,
        [slug]: err instanceof Error ? err.message : "Couldn't save this tool.",
      }));
    } finally {
      setSavingSlug(null);
    }
  }

  return (
    <div className="mt-6 space-y-3">
      {rows.map((row) => (
        <div key={row.slug} className="rounded-card border-2 border-border bg-surface p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => updateRow(row.slug, { enabled: !row.enabled })}
                aria-pressed={row.enabled}
                className={`rounded-pill px-3 py-1 text-xs font-bold transition-colors ${
                  row.enabled ? "bg-teal-soft text-teal" : "bg-coral-soft text-coral"
                }`}
              >
                {row.enabled ? "Enabled" : "Disabled"}
              </button>
              <div>
                <p className="text-sm font-bold text-ink">{row.name}</p>
                <p className="text-xs text-ink-soft">/tools/{row.slug}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <label className="flex items-center gap-1.5">
                <input
                  type="checkbox"
                  checked={row.featured}
                  onChange={(e) => updateRow(row.slug, { featured: e.target.checked })}
                />
                Featured
              </label>
              <label className="flex items-center gap-1.5">
                <input
                  type="checkbox"
                  checked={row.homepageVisible}
                  onChange={(e) => updateRow(row.slug, { homepageVisible: e.target.checked })}
                />
                On homepage
              </label>
              <label className="flex items-center gap-1.5">
                Order
                <input
                  type="number"
                  value={row.sortOrder}
                  onChange={(e) => updateRow(row.slug, { sortOrder: Number(e.target.value) || 0 })}
                  className="w-16 rounded-lg border border-border px-2 py-1"
                />
              </label>
              <button
                type="button"
                onClick={() => setOpenSlug(openSlug === row.slug ? null : row.slug)}
                className="flex items-center gap-1 font-semibold text-accent-dark"
              >
                Edit copy
                {openSlug === row.slug ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>
          </div>

          {openSlug === row.slug && (
            <div className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
              <label className="text-xs font-semibold text-ink-muted">
                Display name
                <input
                  value={row.name}
                  onChange={(e) => updateRow(row.slug, { name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm text-ink"
                />
              </label>
              <label className="text-xs font-semibold text-ink-muted">
                SEO title
                <input
                  value={row.seoTitle}
                  onChange={(e) => updateRow(row.slug, { seoTitle: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm text-ink"
                />
              </label>
              <label className="text-xs font-semibold text-ink-muted sm:col-span-2">
                Description
                <textarea
                  value={row.description}
                  onChange={(e) => updateRow(row.slug, { description: e.target.value })}
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm text-ink"
                />
              </label>
              <label className="text-xs font-semibold text-ink-muted sm:col-span-2">
                SEO description
                <textarea
                  value={row.seoDescription}
                  onChange={(e) => updateRow(row.slug, { seoDescription: e.target.value })}
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm text-ink"
                />
              </label>
            </div>
          )}

          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => save(row.slug)}
              disabled={savingSlug === row.slug}
              className="flex items-center gap-1.5 rounded-pill bg-accent px-4 py-1.5 text-xs font-semibold text-white hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              {savingSlug === row.slug ? (
                <Loader2 size={13} className="animate-spin" aria-hidden="true" />
              ) : (
                <Check size={13} aria-hidden="true" />
              )}
              {savingSlug === row.slug ? "Saving…" : "Save"}
            </button>
            {savedSlug === row.slug && <span className="text-xs font-medium text-teal">Saved.</span>}
            {errorBySlug[row.slug] && (
              <span className="text-xs font-medium text-coral">{errorBySlug[row.slug]}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
