"use client";

import { useRef, useState } from "react";
import { CloudUpload, FileText } from "lucide-react";
import { pdfToWord } from "@/lib/pdf/pdfToWord";

export function PdfToWordTool() {
  const [file, setFile] = useState<File | null>(null);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function pickFile(candidate: File | null | undefined) {
    if (!candidate) return;
    const isPdf = candidate.type === "application/pdf" || candidate.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      setError("Please select a PDF file.");
      return;
    }
    setFile(candidate);
    setError(null);
  }

  async function convert() {
    if (!file) return;
    setWorking(true);
    setError(null);
    try {
      const blob = await pdfToWord(file);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name.replace(/\.pdf$/i, "") + ".docx";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't convert this PDF.");
    } finally {
      setWorking(false);
    }
  }

  return (
    <div className="mt-8">
      <div
        className={`rounded-card border-2 border-dashed p-10 text-center transition-colors ${isDraggingFile ? "border-sky bg-sky-soft" : "border-border bg-surface"}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingFile(true);
        }}
        onDragLeave={() => setIsDraggingFile(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDraggingFile(false);
          pickFile(e.dataTransfer.files?.[0]);
        }}
      >
        <CloudUpload size={28} className="mx-auto text-sky" />
        <p className="mt-3 text-sm font-semibold text-ink">Drag and drop a PDF, or choose one</p>
        <button type="button" onClick={() => inputRef.current?.click()} className="mt-3 rounded-pill bg-sky px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">Choose PDF</button>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="sr-only"
          onChange={(e) => {
            pickFile(e.target.files?.[0]);
            if (inputRef.current) inputRef.current.value = "";
          }}
        />
        {file && <p className="mt-3 flex items-center justify-center gap-2 text-xs text-ink-soft"><FileText size={14} /> {file.name}</p>}
      </div>
      <button type="button" disabled={!file || working} onClick={convert} className={`mt-5 rounded-pill px-5 py-2.5 text-sm font-semibold text-white ${file && !working ? "bg-sky hover:opacity-90" : "cursor-not-allowed bg-ink/30"}`}>
        {working ? "Converting…" : "Convert to Word"}
      </button>
      <p className="mt-3 text-xs text-ink-soft">Text and basic paragraph structure are converted. Complex layouts, forms, and scanned-image text may need manual cleanup or OCR.</p>
      {error && <p className="mt-4 rounded-xl bg-coral-soft px-4 py-3 text-sm text-coral">{error}</p>}
    </div>
  );
}
