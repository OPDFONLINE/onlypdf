"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

type Placement = { id: string; placement_key: string; provider: string; enabled: boolean; slot_id: string | null; notes: string | null };
const PROVIDERS = ["none", "adsense", "journey", "ezoic", "direct"];

export function MonetizationManager({ initialPlacements }: { initialPlacements: Placement[] }) {
  const [rows, setRows] = useState(initialPlacements);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function save(row: Placement) {
    setSaving(row.id);
    setMessage("");
    try {
      const response = await fetch("/api/admin/ads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(row),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "Could not save placement.");
      setMessage("Placement saved.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save placement.");
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="mt-6 space-y-3">
      {rows.map((row) => (
        <section key={row.id} className="rounded-card border-2 border-border bg-surface p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-ink">{row.placement_key}</p>
              <p className="mt-1 text-xs text-ink-soft">{row.notes || "No placement notes."}</p>
            </div>
            <label className="flex items-center gap-2 text-xs font-semibold text-ink-muted">
              <input type="checkbox" checked={row.enabled} onChange={(e) => setRows((prev) => prev.map((item) => item.id === row.id ? { ...item, enabled: e.target.checked } : item))} />
              Enabled
            </label>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="text-xs font-semibold text-ink-muted">Provider
              <select value={row.provider} onChange={(e) => setRows((prev) => prev.map((item) => item.id === row.id ? { ...item, provider: e.target.value } : item))} className="mt-1 w-full rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink">
                {PROVIDERS.map((provider) => <option key={provider} value={provider}>{provider}</option>)}
              </select>
            </label>
            <label className="text-xs font-semibold text-ink-muted">Slot ID / placement code
              <input value={row.slot_id ?? ""} onChange={(e) => setRows((prev) => prev.map((item) => item.id === row.id ? { ...item, slot_id: e.target.value } : item))} className="mt-1 w-full rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink" />
            </label>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button type="button" onClick={() => save(row)} disabled={saving === row.id} className="flex items-center gap-2 rounded-pill bg-accent px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
              {saving === row.id ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
              Save placement
            </button>
            {message && saving === null && <span className="text-xs text-ink-muted">{message}</span>}
          </div>
        </section>
      ))}
    </div>
  );
}
