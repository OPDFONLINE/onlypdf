"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

const FIELDS = [
  ["site_name", "Site name"],
  ["site_tagline", "Tagline"],
  ["homepage_title", "Homepage title"],
  ["homepage_description", "Homepage description"],
  ["contact_email", "Contact email"],
  ["default_author", "Default article author"],
] as const;

export function SettingsManager({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [values, setValues] = useState(initialSettings);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "Could not save settings.");
      setMessage("Settings saved.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save settings.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="mt-6 max-w-3xl rounded-card border-2 border-border bg-surface p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map(([key, label]) => (
          <label key={key} className={`text-xs font-semibold text-ink-muted ${key === "homepage_description" ? "sm:col-span-2" : ""}`}>
            {label}
            <div className="mt-1">
              {key === "homepage_description" ? (
                <textarea rows={4} value={values[key] ?? ""} onChange={(e) => setValues((prev) => ({ ...prev, [key]: e.target.value }))} className="w-full rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink" />
              ) : (
                <input value={values[key] ?? ""} onChange={(e) => setValues((prev) => ({ ...prev, [key]: e.target.value }))} className="w-full rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink" />
              )}
            </div>
          </label>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-3">
        <button type="button" onClick={save} disabled={saving} className="flex items-center gap-2 rounded-pill bg-accent px-5 py-2 text-sm font-semibold text-white disabled:opacity-50">
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
          {saving ? "Saving…" : "Save settings"}
        </button>
        {message && <span className="text-sm text-ink-muted">{message}</span>}
      </div>
    </section>
  );
}
