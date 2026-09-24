import { Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";

export async function pdfToWord(file: File): Promise<Blob> {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
  const bytes = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
  const paragraphs: Paragraph[] = [];

  try {
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      const lines: string[] = [];
      let current = "";
      let lastY: number | null = null;

      for (const item of content.items) {
        if (!("str" in item)) continue;
        const text = item.str.trim();
        if (!text) continue;
        const y = item.transform?.[5] ?? null;
        if (lastY !== null && y !== null && Math.abs(y - lastY) > 5 && current.trim()) {
          lines.push(current.trim());
          current = "";
        }
        current += (current ? " " : "") + text;
        lastY = y;
      }
      if (current.trim()) lines.push(current.trim());

      if (pageNumber > 1) paragraphs.push(new Paragraph({ pageBreakBefore: true, children: [] }));
      paragraphs.push(new Paragraph({ text: `Page ${pageNumber}`, heading: HeadingLevel.HEADING_2 }));
      for (const line of lines) paragraphs.push(new Paragraph({ children: [new TextRun(line)] }));
      if (lines.length === 0) paragraphs.push(new Paragraph({ text: "[No selectable text found on this page.]" }));
      page.cleanup();
    }
  } finally {
    await pdf.destroy();
  }

  const document = new Document({ sections: [{ properties: {}, children: paragraphs }] });
  return Packer.toBlob(document);
}
