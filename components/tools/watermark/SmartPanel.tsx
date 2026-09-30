"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Eraser, Loader2, ShieldCheck, AlertTriangle } from "lucide-react";
import { previewWatermarkRemoval, removeDetectedWatermarks, type WatermarkAnalysis } from "@/lib/pdf/watermarkDetect";
import { renderPdfPage, type RenderedPage } from "@/lib/pdf/renderPage";
import { DEFAULT_SCOPE, resolveScope, type PageScope } from "@/lib/pdf/pageScope";
import { PageNav } from "./PageNav";
import { ScopeSelect } from "./ScopeSelect";
import { downloadBlob } from "./download";

type Props = {
  file: File;
  analysis: WatermarkAnalysis;
  onStart: () => void;
  onDone: () => void;
};

export function SmartPanel({ file, analysis, onStart, onDone }: Props) {
  const { candidates, pageCount } = analysis;
  const [checked, setChecked] = useState<Set<string>>(() => new Set(candidates.map((c) => c.id)));
  const [scope, setScope] = useState<PageScope>(DEFAULT_SCOPE);
  const [pageIndex, setPageIndex] = useState(() => Math.max(0, candidates[0]?.pages[0] ?? 0));
  const [view, setView] = useState<"after" | "before">("after");
  const [before, setBefore] = useState<RenderedPage | null>(null);
  const [after, setAfter] = useState<RenderedPage | null>(null);
  const [loading, setLoading] = useState(false);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const runId = useRef(0);

  const checkedIds = useMemo(() => [...checked].sort(), [checked]);
  const checkedKey = checkedIds.join("\n");
  const selectedHere = candidates.some((c) => checked.has(c.id) && c.pages.includes(pageIndex));

  // Original page preview.
  useEffect(() => {
    let cancelled = false;
    setBefore(null);
    renderPdfPage(file, pageIndex)
      .then((img) => !cancelled && setBefore(img))
      .catch((err) => !cancelled && setError(err instanceof Error ? err.message : "Couldn't preview this page."));
    return () => {
      cancelled = true;
    };
  }, [file, pageIndex]);

  // "After" preview: debounced, single-page, guarded against stale results.
  useEffect(() => {
    const id = ++runId.current;
    if (checkedIds.length === 0 || !selectedHere) {
      setAfter(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const blob = await previewWatermarkRemoval(file, checkedIds, pageIndex);
        const img = await renderPdfPage(blob, 0);
        if (runId.current === id) {
          setAfter(img);
          setError(null);
        }
      } catch (err) {
        if (runId.current === id) setError(err instanceof Error ? err.message : "Couldn't build the preview.");
      } finally {
        if (runId.current === id) setLoading(false);
      }
    }, 250);
    return () => clearTimeout(timer);
    // checkedKey stands in for checkedIds
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, pageIndex, checkedKey, selectedHere]);

  function toggle(id: string) {
    setChecked((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function process() {
    setError(null);
    let pages: number[] | undefined;
    try {
      pages = scope.mode === "all" ? undefined : resolveScope(scope, pageIndex, pageCount);
      if (pages && pages.length === 0) throw new Error("No pages selected.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Check the page selection.");
      return;
    }
    onStart();
    setWorking(true);
    try {
      const blob = await removeDetectedWatermarks(file, checkedIds, pages);
      downloadBlob(blob, file.name.replace(/\.pdf$/i, "") + "-watermark-removed.pdf");
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't remove the watermark.");
    } finally {
      setWorking(false);
    }
  }

  const shown = view === "after" && after && selectedHere ? after : before;

  return (
    <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div>
        <div className="flex items-start gap-3 rounded-2xl bg-teal-soft p-4 text-sm text-ink-muted">
          <ShieldCheck size={18} className="mt-0.5 shrink-0 text-teal" aria-hidden="true" />
          <p>
            We found {candidates.length === 1 ? "one watermark-like object" : `${candidates.length} watermark-like objects`} in this PDF.
            These are separate objects, so they can be <strong className="font-semibold text-ink">deleted for real</strong> without touching the rest of the page.
          </p>
        </div>

        <ul className="mt-4 space-y-2">
          {candidates.map((c) => {
            const clean = c.kind !== "transparent";
            return (
              <li key={c.id}>
                <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${checked.has(c.id) ? "border-teal bg-teal-soft/50" : "border-border bg-surface"}`}>
                  <input type="checkbox" className="mt-1" checked={checked.has(c.id)} onChange={() => toggle(c.id)} />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-ink">{c.label}</span>
                      <span className={`rounded-pill px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${clean ? "bg-teal-soft text-teal" : "bg-amber-soft text-amber"}`}>
                        {clean ? "Clean removal" : "Check preview"}
                      </span>
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-ink-muted">{c.detail}</span>
                    <span className="mt-1 block text-[11px] text-ink-soft">
                      On {c.pages.length} of {pageCount} page{pageCount === 1 ? "" : "s"}
                      {c.instances > c.pages.length ? ` · ${c.instances} occurrences` : ""}
                    </span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 rounded-xl border border-border bg-surface p-4">
          <p className="text-xs font-semibold text-ink-muted">Remove from</p>
          <div className="mt-2">
            <ScopeSelect id="smart-scope" value={scope} onChange={setScope} pageCount={pageCount} />
          </div>
          {scope.mode === "current" && <p className="mt-2 text-xs text-ink-soft">“This page only” means page {pageIndex + 1}, the one shown in the preview.</p>}
        </div>

        <button
          type="button"
          disabled={checkedIds.length === 0 || working}
          onClick={process}
          className={`mt-5 inline-flex items-center gap-2 rounded-pill px-5 py-2.5 text-sm font-semibold text-white ${checkedIds.length > 0 && !working ? "bg-teal hover:opacity-90" : "cursor-not-allowed bg-ink-soft"}`}
        >
          {working ? <Loader2 size={16} className="animate-spin" /> : <Eraser size={16} />}
          {working ? "Removing…" : "Remove and download"}
        </button>

        {error && (
          <p role="alert" className="mt-4 flex items-start gap-2 rounded-xl bg-coral-soft px-4 py-3 text-sm text-coral">
            <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden="true" /> {error}
          </p>
        )}
      </div>

      <div className="rounded-card border border-border bg-surface p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <PageNav current={pageIndex} pageCount={pageCount} onChange={setPageIndex} />
          <div role="tablist" aria-label="Preview" className="inline-flex overflow-hidden rounded-lg border border-border text-xs font-semibold">
            {(["before", "after"] as const).map((v) => (
              <button
                key={v}
                role="tab"
                type="button"
                aria-selected={view === v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 capitalize ${view === v ? "bg-teal text-white" : "bg-surface text-ink-muted hover:text-ink"}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-4 flex min-h-[320px] items-center justify-center overflow-hidden rounded-xl border border-border bg-white">
          {shown ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={shown.dataUrl} alt={`Page ${pageIndex + 1} ${view === "after" && selectedHere ? "after removal" : "original"}`} className="block h-auto max-h-[680px] w-full object-contain" />
          ) : (
            <span className="flex items-center gap-2 text-sm text-ink-muted"><Loader2 size={16} className="animate-spin" /> Preparing preview…</span>
          )}
          {loading && shown && (
            <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-pill bg-ink/80 px-3 py-1 text-[11px] font-semibold text-white">
              <Loader2 size={12} className="animate-spin" /> Updating
            </span>
          )}
        </div>
        {!selectedHere && checkedIds.length > 0 && (
          <p className="mt-2 text-xs text-ink-soft">The selected watermark is not on this page, so nothing changes here.</p>
        )}
      </div>
    </div>
  );
}
