/**
 * Combines one or more JPG/PNG images into a single PDF, one image per
 * page. Runs entirely in the browser.
 */
export type PageSizeOption = "fit" | "a4" | "letter";

const PAGE_SIZES: Record<Exclude<PageSizeOption, "fit">, { width: number; height: number }> = {
  // Sizes in PDF points (72 per inch), portrait orientation.
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612, height: 792 },
};

const PAGE_MARGIN = 24;

function isPngFile(file: File): boolean {
  return file.type === "image/png" || file.name.toLowerCase().endsWith(".png");
}

export async function imagesToPdf(files: File[], pageSize: PageSizeOption): Promise<Blob> {
  const { PDFDocument } = await import("pdf-lib");

  if (files.length === 0) {
    throw new Error("Add at least one JPG or PNG image first.");
  }

  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    let bytes: ArrayBuffer;
    try {
      bytes = await file.arrayBuffer();
    } catch {
      throw new Error(`Couldn't read "${file.name}". Try selecting it again.`);
    }

    let image;
    try {
      image = isPngFile(file) ? await pdfDoc.embedPng(bytes) : await pdfDoc.embedJpg(bytes);
    } catch {
      throw new Error(
        `"${file.name}" couldn't be read as an image. Only JPG and PNG files are supported.`
      );
    }

    const { width: imgWidth, height: imgHeight } = image;

    if (pageSize === "fit") {
      // One PDF point per image pixel, so the page matches the image exactly.
      const page = pdfDoc.addPage([imgWidth, imgHeight]);
      page.drawImage(image, { x: 0, y: 0, width: imgWidth, height: imgHeight });
      continue;
    }

    const base = PAGE_SIZES[pageSize];
    const isImageWide = imgWidth > imgHeight;
    const pageWidth = isImageWide ? base.height : base.width;
    const pageHeight = isImageWide ? base.width : base.height;
    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    const maxWidth = pageWidth - PAGE_MARGIN * 2;
    const maxHeight = pageHeight - PAGE_MARGIN * 2;
    // Cap at 1 so small images aren't stretched larger than their real size.
    const scale = Math.min(maxWidth / imgWidth, maxHeight / imgHeight, 1);
    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;

    page.drawImage(image, {
      x: (pageWidth - drawWidth) / 2,
      y: (pageHeight - drawHeight) / 2,
      width: drawWidth,
      height: drawHeight,
    });
  }

  const outBytes = await pdfDoc.save();
  return new Blob([outBytes as BlobPart], { type: "application/pdf" });
}
