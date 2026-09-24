export async function wordToPdf(file: File): Promise<Blob> {
  if (!file.name.toLowerCase().endsWith(".docx")) {
    throw new Error("Please choose a .docx Word file.");
  }

  const [mammoth, jsPdfModule] = await Promise.all([
    import("mammoth"),
    import("jspdf"),
  ]);
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  const text = result.value.replace(/\r/g, "");
  const { jsPDF } = jsPdfModule;
  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 48;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const usableWidth = pageWidth - margin * 2;
  const lines = pdf.splitTextToSize(text || "", usableWidth);
  let y = margin;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  for (const line of lines) {
    if (y > pageHeight - margin) {
      pdf.addPage();
      y = margin;
    }
    pdf.text(line, margin, y);
    y += 15;
  }

  return pdf.output("blob");
}
