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

const VERIFICATION_FIELDS = [
  ["google_site_verification", "Google Search Console", "Paste only the content value from the meta tag Search Console gives you, e.g. abc123XYZ... (not the whole <meta> tag)."],
  ["google_adsense_publisher_id", "Google AdSense publisher ID", "Your ca-pub-XXXXXXXXXXXXXXXX ID. Adds both the verification meta tag and the AdSense script to every page."],
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
    <>
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

      <section className="mt-6 max-w-3xl rounded-card border-2 border-border bg-surface p-5">
        <h2 className="text-sm font-bold text-ink">Search engines, AdSense &amp; site verification</h2>
        <p className="mt-1 text-xs text-ink-muted">
          These add meta tags (and, for AdSense, a script) to every page so ownership-verification checks pass.
          Saving here takes effect on the next page load — no code change or redeploy needed.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {VERIFICATION_FIELDS.map(([key, label, hint]) => (
            <label key={key} className="text-xs font-semibold text-ink-muted">
              {label}
              <div className="mt-1">
                <input value={values[key] ?? ""} onChange={(e) => setValues((prev) => ({ ...prev, [key]: e.target.value }))} className="w-full rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink" />
              </div>
              <p className="mt-1 text-[11px] font-normal text-ink-soft">{hint}</p>
            </label>
          ))}
          <label className="text-xs font-semibold text-ink-muted sm:col-span-2">
            Other verification tags (Bing, Pinterest, Ezoic, or anything else)
            <div className="mt-1">
              <textarea
                rows={4}
                value={values.other_verification_meta ?? ""}
                onChange={(e) => setValues((prev) => ({ ...prev, other_verification_meta: e.target.value }))}
                placeholder={"msvalidate.01=YOUR_BING_CODE\np:domain_verify=YOUR_PINTEREST_CODE\nezoic-site-verification=YOUR_EZOIC_CODE"}
                className="w-full rounded-lg border border-border bg-paper px-3 py-2 font-mono text-sm text-ink"
              />
            </div>
            <p className="mt-1 text-[11px] font-normal text-ink-soft">
              One per line, as <code>meta-name=content</code>. Find the meta-name and content in the verification
              snippet each service gives you — e.g. <code>&lt;meta name=&quot;msvalidate.01&quot; content=&quot;ABC123&quot; /&gt;</code>{" "}
              becomes <code>msvalidate.01=ABC123</code>. Works for any provider that verifies via a meta tag.
            </p>
          </label>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <button type="button" onClick={save} disabled={saving} className="flex items-center gap-2 rounded-pill bg-accent px-5 py-2 text-sm font-semibold text-white disabled:opacity-50">
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
            {saving ? "Saving…" : "Save settings"}
          </button>
          {message && <span className="text-sm text-ink-muted">{message}</span>}
        </div>
      </section>
    </>
  );
}
