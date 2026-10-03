"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

type Mode = "all" | "new";

export function IndexNowPanel() {
  const [busy, setBusy] = useState<Mode | null>(null);
  const [message, setMessage] = useState("");

  async function submit(mode: Mode) {
    setBusy(mode);
    setMessage("");
    try {
      const response = await fetch("/api/admin/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || body.message || "Could not submit URLs.");
      setMessage(body.message || `Sent ${body.submitted} URLs to IndexNow. A 200 reply only means they were received, not indexed.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not submit URLs.");
    } finally {
      setBusy(null);
    }
  }

  const buttonClass = "flex items-center gap-2 rounded-pill bg-accent px-5 py-2 text-sm font-semibold text-white disabled:opacity-50";

  return (
    <section className="mt-6 max-w-3xl rounded-card border-2 border-border bg-surface p-5">
      <h2 className="text-sm font-bold text-ink">IndexNow (Bing, Yandex and other engines)</h2>
      <p className="mt-1 text-xs text-ink-muted">
        Articles and tools you save are sent to IndexNow automatically. Articles you schedule for a future date are not,
        because nothing runs when the time arrives: after a scheduled article goes live, press the first button. Use the
        second button once after launch, or after a big content change, to send every URL in the sitemap. Google does not
        use IndexNow; for Google, submit the sitemap in Search Console.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => submit("new")} disabled={busy !== null} className={buttonClass}>
          {busy === "new" ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
          {busy === "new" ? "Sending…" : "Submit newly live articles"}
        </button>
        <button type="button" onClick={() => submit("all")} disabled={busy !== null} className={buttonClass}>
          {busy === "all" ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
          {busy === "all" ? "Sending…" : "Submit all URLs now"}
        </button>
      </div>
      {message && <p className="mt-3 text-sm text-ink-muted">{message}</p>}
    </section>
  );
}
