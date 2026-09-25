"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

const CATEGORIES = ["Bug report", "Tool request", "Privacy or terms", "Business or partnership", "General"];

export function ContactForm() {
  const [category, setCategory] = useState<string>(CATEGORIES[0] ?? "General");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, email, message, website }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Could not send your message.");
      setStatus("sent");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send your message.");
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 rounded-card border-2 border-border bg-surface p-6">
      <h2 className="text-xl font-bold text-ink">Send a message</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-ink">
          Reason
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full rounded-xl border-2 border-border bg-white px-3 py-2.5 text-sm text-ink">
            {CATEGORIES.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold text-ink">
          Your email
          <input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-xl border-2 border-border bg-white px-3 py-2.5 text-sm text-ink" />
        </label>
        <label className="sm:col-span-2 text-sm font-semibold text-ink">
          Message
          <textarea required maxLength={5000} rows={7} value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 w-full rounded-xl border-2 border-border bg-white px-3 py-2.5 text-sm text-ink" />
        </label>
        <input value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={status === "sending"} className="inline-flex items-center gap-2 rounded-pill bg-ink px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50">
          {status === "sending" ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />} Send message
        </button>
        {status === "sent" && <p className="text-sm font-medium text-teal">Thanks — your message was sent.</p>}
        {status === "error" && <p className="text-sm font-medium text-coral">{error}</p>}
      </div>
    </form>
  );
}
