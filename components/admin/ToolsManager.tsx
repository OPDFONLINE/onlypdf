"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Loader2, Plus, Trash2 } from "lucide-react";

type FaqItem = { question: string; answer: string };

type AdminTool = {
  slug: string;
  enabled: boolean;
  name: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
  homepageVisible: boolean;
  sortOrder: number;
  oneLiner: string;
  instructions: string[];
  faq: FaqItem[];
};

type EditableTool = AdminTool;

function toEditable(tool: AdminTool): EditableTool {
  return {
    ...tool,
    instructions: [...tool.instructions],
    faq: tool.faq.map((item) => ({ ...item })),
  };
}

export function ToolsManager({ initialTools }: { initialTools: AdminTool[] }) {
  const [rows, setRows] = useState<EditableTool[]>(initialTools.map(toEditable));
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [savedSlug, setSavedSlug] = useState<string | null>(null);
  const [errorBySlug, setErrorBySlug] = useState<Record<string, string>>({});

  function updateRow(slug: string, patch: Partial<EditableTool>) {
    setRows((prev) => prev.map((row) => (row.slug === slug ? { ...row, ...patch } : row)));
    setSavedSlug(null);
  }

  function updateInstruction(slug: string, index: number, value: string) {
    const row = rows.find((item) => item.slug === slug);
    if (!row) return;
    const instructions = [...row.instructions];
    instructions[index] = value;
    updateRow(slug, { instructions });
  }

  function moveInstruction(slug: string, index: number, direction: -1 | 1) {
    const row = rows.find((item) => item.slug === slug);
    if (!row) return;
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= row.instructions.length) return;
    const instructions = [...row.instructions];
    const current = instructions[index];
    const next = instructions[nextIndex];
    if (current === undefined || next === undefined) return;
    instructions[index] = next;
    instructions[nextIndex] = current;
    updateRow(slug, { instructions });
  }

  function addInstruction(slug: string) {
    const row = rows.find((item) => item.slug === slug);
    if (!row) return;
    updateRow(slug, { instructions: [...row.instructions, ""] });
  }

  function removeInstruction(slug: string, index: number) {
    const row = rows.find((item) => item.slug === slug);
    if (!row) return;
    updateRow(slug, { instructions: row.instructions.filter((_, itemIndex) => itemIndex !== index) });
  }

  function updateFaq(slug: string, index: number, patch: Partial<FaqItem>) {
    const row = rows.find((item) => item.slug === slug);
    if (!row) return;
    const faq = row.faq.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item));
    updateRow(slug, { faq });
  }

  function moveFaq(slug: string, index: number, direction: -1 | 1) {
    const row = rows.find((item) => item.slug === slug);
    if (!row) return;
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= row.faq.length) return;
    const faq = [...row.faq];
    const current = faq[index];
    const next = faq[nextIndex];
    if (current === undefined || next === undefined) return;
    faq[index] = next;
    faq[nextIndex] = current;
    updateRow(slug, { faq });
  }

  function addFaq(slug: string) {
    const row = rows.find((item) => item.slug === slug);
    if (!row) return;
    updateRow(slug, { faq: [...row.faq, { question: "", answer: "" }] });
  }

  function removeFaq(slug: string, index: number) {
    const row = rows.find((item) => item.slug === slug);
    if (!row) return;
    updateRow(slug, { faq: row.faq.filter((_, itemIndex) => itemIndex !== index) });
  }

  async function save(slug: string) {
    const row = rows.find((r) => r.slug === slug);
    if (!row) return;

    const instructions = row.instructions.map((item) => item.trim()).filter(Boolean);
    const faq = row.faq
      .map((item) => ({ question: item.question.trim(), answer: item.answer.trim() }))
      .filter((item) => item.question && item.answer);

    if (faq.length !== row.faq.length) {
      setErrorBySlug((prev) => ({ ...prev, [slug]: "Complete or remove every FAQ item before saving." }));
      return;
    }

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
          one_liner: row.oneLiner,
          description: row.description,
          seo_title: row.seoTitle,
          seo_description: row.seoDescription,
          instructions,
          faq,
          sort_order: row.sortOrder,
          featured: row.featured,
          homepage_visible: row.homepageVisible,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(typeof body.error === "string" ? body.error : "Couldn't save this tool.");
      }
      setRows((prev) => prev.map((item) => (item.slug === slug ? { ...item, instructions, faq } : item)));
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
                <input type="checkbox" checked={row.featured} onChange={(e) => updateRow(row.slug, { featured: e.target.checked })} />
                Featured
              </label>
              <label className="flex items-center gap-1.5">
                <input type="checkbox" checked={row.homepageVisible} onChange={(e) => updateRow(row.slug, { homepageVisible: e.target.checked })} />
                On homepage
              </label>
              <label className="flex items-center gap-1.5">
                Order
                <input type="number" value={row.sortOrder} onChange={(e) => updateRow(row.slug, { sortOrder: Number(e.target.value) || 0 })} className="w-16 rounded-lg border border-border px-2 py-1" />
              </label>
              <button type="button" onClick={() => setOpenSlug(openSlug === row.slug ? null : row.slug)} className="flex items-center gap-1 font-semibold text-accent-dark">
                Edit content
                {openSlug === row.slug ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>
          </div>

          {openSlug === row.slug && (
            <div className="mt-4 space-y-6 border-t border-border pt-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-xs font-semibold text-ink-muted">
                  Display name
                  <input value={row.name} onChange={(e) => updateRow(row.slug, { name: e.target.value })} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm text-ink" />
                </label>
                <label className="text-xs font-semibold text-ink-muted">
                  One-line page intro
                  <input value={row.oneLiner} onChange={(e) => updateRow(row.slug, { oneLiner: e.target.value })} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm text-ink" />
                </label>
                <label className="text-xs font-semibold text-ink-muted sm:col-span-2">
                  Description
                  <textarea value={row.description} onChange={(e) => updateRow(row.slug, { description: e.target.value })} rows={2} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm text-ink" />
                </label>
                <label className="text-xs font-semibold text-ink-muted sm:col-span-2">
                  SEO title
                  <input value={row.seoTitle} onChange={(e) => updateRow(row.slug, { seoTitle: e.target.value })} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm text-ink" />
                </label>
                <label className="text-xs font-semibold text-ink-muted sm:col-span-2">
                  SEO description
                  <textarea value={row.seoDescription} onChange={(e) => updateRow(row.slug, { seoDescription: e.target.value })} rows={2} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm text-ink" />
                </label>
              </div>

              <section>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-bold text-ink">How it works</h2>
                    <p className="mt-1 text-xs text-ink-soft">These steps are shown on the public tool page.</p>
                  </div>
                  <button type="button" onClick={() => addInstruction(row.slug)} className="flex items-center gap-1 rounded-pill border border-border px-3 py-1.5 text-xs font-semibold text-ink-muted hover:text-ink">
                    <Plus size={13} /> Add step
                  </button>
                </div>
                <div className="mt-3 space-y-2">
                  {row.instructions.map((instruction, index) => (
                    <div key={`${row.slug}-instruction-${index}`} className="flex items-start gap-2">
                      <span className="mt-2 w-6 shrink-0 text-center text-xs font-semibold text-ink-soft">{index + 1}</span>
                      <textarea value={instruction} onChange={(e) => updateInstruction(row.slug, index, e.target.value)} rows={2} className="min-w-0 flex-1 rounded-lg border border-border px-3 py-2 text-sm text-ink" />
                      <div className="flex shrink-0 flex-col gap-1">
                        <button type="button" aria-label={`Move step ${index + 1} up`} disabled={index === 0} onClick={() => moveInstruction(row.slug, index, -1)} className="rounded border border-border p-1 text-ink-soft disabled:opacity-30"><ChevronUp size={13} /></button>
                        <button type="button" aria-label={`Move step ${index + 1} down`} disabled={index === row.instructions.length - 1} onClick={() => moveInstruction(row.slug, index, 1)} className="rounded border border-border p-1 text-ink-soft disabled:opacity-30"><ChevronDown size={13} /></button>
                      </div>
                      <button type="button" aria-label={`Delete step ${index + 1}`} onClick={() => removeInstruction(row.slug, index)} className="mt-1 rounded p-1 text-ink-soft hover:text-coral"><Trash2 size={15} /></button>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-bold text-ink">FAQ</h2>
                    <p className="mt-1 text-xs text-ink-soft">Questions and answers are stored as plain text.</p>
                  </div>
                  <button type="button" onClick={() => addFaq(row.slug)} className="flex items-center gap-1 rounded-pill border border-border px-3 py-1.5 text-xs font-semibold text-ink-muted hover:text-ink">
                    <Plus size={13} /> Add FAQ
                  </button>
                </div>
                <div className="mt-3 space-y-4">
                  {row.faq.map((item, index) => (
                    <div key={`${row.slug}-faq-${index}`} className="rounded-xl border border-border p-3">
                      <div className="flex gap-2">
                        <div className="min-w-0 flex-1 space-y-2">
                          <input value={item.question} onChange={(e) => updateFaq(row.slug, index, { question: e.target.value })} placeholder="Question" className="w-full rounded-lg border border-border px-3 py-2 text-sm font-medium text-ink" />
                          <textarea value={item.answer} onChange={(e) => updateFaq(row.slug, index, { answer: e.target.value })} placeholder="Answer" rows={3} className="w-full rounded-lg border border-border px-3 py-2 text-sm text-ink" />
                        </div>
                        <div className="flex shrink-0 flex-col gap-1">
                          <button type="button" aria-label={`Move FAQ ${index + 1} up`} disabled={index === 0} onClick={() => moveFaq(row.slug, index, -1)} className="rounded border border-border p-1 text-ink-soft disabled:opacity-30"><ChevronUp size={13} /></button>
                          <button type="button" aria-label={`Move FAQ ${index + 1} down`} disabled={index === row.faq.length - 1} onClick={() => moveFaq(row.slug, index, 1)} className="rounded border border-border p-1 text-ink-soft disabled:opacity-30"><ChevronDown size={13} /></button>
                          <button type="button" aria-label={`Delete FAQ ${index + 1}`} onClick={() => removeFaq(row.slug, index)} className="rounded p-1 text-ink-soft hover:text-coral"><Trash2 size={15} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          <div className="mt-3 flex items-center gap-3">
            <button type="button" onClick={() => save(row.slug)} disabled={savingSlug === row.slug} className="flex items-center gap-1.5 rounded-pill bg-accent px-4 py-1.5 text-xs font-semibold text-white hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-50">
              {savingSlug === row.slug ? <Loader2 size={13} className="animate-spin" aria-hidden="true" /> : <Check size={13} aria-hidden="true" />}
              {savingSlug === row.slug ? "Saving…" : "Save"}
            </button>
            {savedSlug === row.slug && <span className="text-xs font-medium text-teal">Saved.</span>}
            {errorBySlug[row.slug] && <span className="text-xs font-medium text-coral">{errorBySlug[row.slug]}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
