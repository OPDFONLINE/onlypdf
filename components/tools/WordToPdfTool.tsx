"use client";

import { useRef, useState } from "react";
import { useToolAnalytics } from "@/lib/analytics";
import { CloudUpload, FileText } from "lucide-react";
import { wordToPdf } from "@/lib/pdf/wordToPdf";

export function WordToPdfTool() {
  const { trackStart, trackComplete } = useToolAnalytics("word-to-pdf");

  const [file, setFile] = useState<File | null>(null);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function convert() {
    if (!file) return;
    setWorking(true);
    setError(null);
    try {
      const blob = await wordToPdf(file);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name.replace(/\.docx$/i, "") + ".pdf";
      link.click();
      URL.revokeObjectURL(url);
      trackComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't convert this Word file.");
    } finally {
      setWorking(false);
    }
  }

  return (
    <div className="mt-8">
      <div className="rounded-card border-2 border-dashed border-border bg-surface p-10 text-center">
        <CloudUpload size={28} className="mx-auto text-amber" />
        <p className="mt-3 text-sm font-semibold text-ink">Choose a Word document</p>
        <button type="button" onClick={() => inputRef.current?.click()} className="mt-3 rounded-pill bg-amber px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">Choose DOCX</button>
        <input ref={inputRef} type="file" accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        {file && <p className="mt-3 flex items-center justify-center gap-2 text-xs text-ink-soft"><FileText size={14} /> {file.name}</p>}
      </div>
      <button type="button" disabled={!file || working} onClick={convert} className={`mt-5 rounded-pill px-5 py-2.5 text-sm font-semibold text-white ${file && !working ? "bg-amber hover:opacity-90" : "cursor-not-allowed bg-ink/30"}`}>
        {working ? "Converting…" : "Convert to PDF"}
      </button>
      <p className="mt-3 text-xs text-ink-soft">DOCX text and paragraph content are converted in your browser. Complex Word layouts, floating objects, and advanced tables may not match perfectly.</p>
      {error && <p className="mt-4 rounded-xl bg-coral-soft px-4 py-3 text-sm text-coral">{error}</p>}
    </div>
  );
}
