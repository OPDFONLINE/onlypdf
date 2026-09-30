import type { LucideIcon } from "lucide-react";
import {
  Combine,
  Scissors,
  Trash2,
  FileOutput,
  ListOrdered,
  RotateCw,
  FileImage,
  Image as ImageIcon,
  FileArchive,
  Eraser,
  FileText,
  FilePlus2,
} from "lucide-react";

export type ToolColor = "accent" | "coral" | "amber" | "teal" | "pink" | "sky" | "lime" | "violet";

export type Tool = {
  slug: string;
  name: string;
  /** One sentence shown on tool cards and at the top of the tool page. */
  oneLiner: string;
  /** Slightly longer description, used for meta descriptions and card subtext. */
  description: string;
  icon: LucideIcon;
  /** Accent color used for this tool's icon badge and illustrations. */
  color: ToolColor;
  /** Minimum number of files required before the tool can run. Defaults to 1. */
  minFiles?: number;
  /** Maximum number of files this tool accepts. Unset means no limit. */
  maxFiles?: number;
  /** When set, the tool page shows a page-number picker after upload. */
  pageSelection?: "delete" | "extract";
  /**
   * How the generic tool page previews uploaded PDFs when there is no page
   * picker: "cover" shows each file's first page (Merge), "pages" shows every
   * page of the single file (Split).
   */
  pagePreview?: "cover" | "pages";
  /** Short line explaining what the tool needs from the user's file. */
  fileHint: string;
  instructions: string[];
  faq: { question: string; answer: string }[];
};

export const tools: Tool[] = [
  {
    slug: "watermark-remove",
    name: "PDF Watermark Remove",
    oneLiner: "Find and delete a PDF watermark, or cover any area you select.",
    description: "Smart mode scans the PDF for watermark objects such as semi-transparent text, logos and stamps and deletes them for real. Manual mode lets you cover any area, on any pages, with a matching colour.",
    icon: Eraser,
    color: "teal",
    maxFiles: 1,
    fileHint: "Select one PDF file with a watermark to remove. Only use documents you have the right to edit.",
    instructions: [
      "Upload your PDF. The tool scans it for watermark objects and opens the Smart tab if it finds any.",
      "In Smart, tick the watermarks to remove, compare the Before and After preview, and choose which pages to clean.",
      "If nothing is found, or the watermark is part of a scan or image, use the Manual tab: drag over the watermark, resize or move the box, and choose the pages it applies to.",
      "Download the cleaned PDF. Undo and redo are available in Manual mode until you download.",
    ],
    faq: [
      { question: "What is the difference between Smart and Manual?", answer: "Smart mode finds watermark objects that were added on top of the page, such as tagged watermarks, semi-transparent text, logos and stamps, and deletes them, so the text underneath is untouched and the watermark text disappears from the file's text layer. Manual mode paints a cover over an area you choose. The covered content is hidden, not deleted." },
      { question: "Does it remove every type of watermark?", answer: "No. If the watermark was flattened into a scanned page or baked into the page image, there is no separate object to delete and Smart mode will find nothing. Use Manual mode, which works best on plain or evenly coloured backgrounds. Light watermarks drawn without transparency may also need Manual mode." },
      { question: "Can I preview the result before downloading?", answer: "Yes. Smart mode shows a Before and After preview of each page, and Manual mode can preview the cover on the page. Detection is a best guess, so check the preview and untick anything that is not a watermark." },
      { question: "Can I use it to hide sensitive information?", answer: "No. Manual covers only hide what is underneath, and the original text or image may still be in the file. Do not use it to redact confidential data. Only remove watermarks from documents you own or have permission to edit." },
      { question: "Does it work on password-protected PDFs?", answer: "No. Remove the password in the program that created the file first, then upload it here." },
    ],
  },
  {
    slug: "pdf-to-word",
    name: "PDF to Word",
    oneLiner: "Convert selectable PDF text into an editable Word document.",
    description: "Convert PDF text and basic paragraph structure into a DOCX file in your browser.",
    icon: FileText,
    color: "sky",
    maxFiles: 1,
    fileHint: "Select one PDF file to convert to Word.",
    instructions: [
      "Upload a PDF with selectable text.",
      "Convert it to a DOCX document.",
      "Open the Word file and make any layout adjustments you need.",
    ],
    faq: [
      { question: "Will the Word file look exactly like the PDF?", answer: "Not always. Text and basic paragraph structure are extracted, while complex layouts, forms, floating objects, and scanned-image text may need manual cleanup or OCR." },
      { question: "Does it work with scanned PDFs?", answer: "Scanned pages usually contain images rather than selectable text, so OCR is needed for reliable text extraction. This browser tool does not claim to perform full OCR." },
    ],
  },
  {
    slug: "word-to-pdf",
    name: "Word to PDF",
    oneLiner: "Convert a DOCX Word document into a PDF.",
    description: "Turn a DOCX file into a simple PDF directly in your browser.",
    icon: FileText,
    color: "amber",
    maxFiles: 1,
    fileHint: "Select one .docx Word document.",
    instructions: [
      "Upload a DOCX Word document.",
      "Convert the document into a PDF.",
      "Download the resulting PDF and check the layout before sharing it.",
    ],
    faq: [
      { question: "Will complex Word formatting be preserved?", answer: "The browser conversion focuses on document text and paragraphs. Advanced Word layout, floating objects, and complex tables may not match the original exactly." },
      { question: "Are my Word files uploaded?", answer: "No. Conversion runs in your browser and the source file stays on your device." },
    ],
  },

  {
    slug: "compress-pdf",
    name: "Compress PDF",
    oneLiner: "Reduce PDF file size while keeping the document readable.",
    description: "Compress a PDF automatically or target a specific maximum file size.",
    icon: FileArchive,
    color: "coral",
    maxFiles: 1,
    fileHint: "Select one PDF file to compress.",
    instructions: [
      "Upload the PDF you want to make smaller.",
      "Choose Auto compression for High, Medium, or Express, or choose Target file size.",
      "For a target, enter a size such as 10 MB or 800 KB.",
      "Compress the PDF and download the smaller file.",
    ],
    faq: [
      {
        question: "Can I make a PDF fit under a specific size?",
        answer: "Yes. Target file size mode tests several browser-safe compression levels and stops when it finds a result at or below your requested size. Some PDFs cannot reach very small targets without a larger quality loss or a different compression method.",
      },
      {
        question: "What do High, Medium, and Express mean?",
        answer: "High keeps more visual detail, Medium balances quality and file size, and Express prioritizes a smaller file and quicker processing.",
      },
      {
        question: "Are my PDFs uploaded to a server?",
        answer: "No. Compression runs in your browser, so the PDF stays on your device.",
      },
    ],
  },

  {
    slug: "merge-pdf",
    name: "Merge PDF",
    oneLiner: "Combine multiple PDF files into a single PDF.",
    description: "Combine PDFs into one file, in exactly the order you choose.",
    icon: Combine,
    color: "accent",
    minFiles: 2,
    pagePreview: "cover",
    fileHint: "Select two or more PDF files to combine.",
    instructions: [
      "Add the PDF files you want to combine.",
      "Drag files to put them in the order you want.",
      "Select Merge to build the combined PDF.",
      "Download the result.",
    ],
    faq: [
      {
        question: "Is there a limit to how many files I can merge?",
        answer:
          "You can merge as many PDFs as your browser can comfortably handle. Very large batches may take a moment to process since everything runs on your device.",
      },
      {
        question: "Are my files uploaded to a server?",
        answer:
          "No. Merging happens entirely in your browser. Your files never leave your device.",
      },
    ],
  },
  {
    slug: "split-pdf",
    name: "Split PDF",
    oneLiner: "Split one PDF into a separate file for every page.",
    description: "Break a PDF into one file per page, downloaded as a ZIP.",
    icon: Scissors,
    color: "coral",
    maxFiles: 1,
    pagePreview: "pages",
    fileHint: "Select one PDF file to split.",
    instructions: [
      "Upload the PDF you want to split.",
      "We'll split it into one PDF per page automatically.",
      "Select Split PDF to build the files.",
      "Download them all together as a ZIP.",
    ],
    faq: [
      {
        question: "Can I split a PDF into individual pages?",
        answer:
          "Yes \u2014 that's exactly what this tool does. Every page becomes its own PDF, bundled together in a ZIP you can download.",
      },
      {
        question: "Can I split a PDF into custom page ranges instead?",
        answer:
          "Not yet. Right now this tool splits every page into its own file. Custom ranges (like pages 1\u20135 in one file) may be added later.",
      },
      {
        question: "Does splitting reduce PDF quality?",
        answer:
          "No. Splitting only separates existing pages, so nothing in the pages themselves is changed.",
      },
    ],
  },
  {
    slug: "delete-pdf-pages",
    name: "Delete PDF Pages",
    oneLiner: "Remove selected pages from a PDF.",
    description: "Remove the pages you don't need and keep the rest.",
    icon: Trash2,
    color: "teal",
    maxFiles: 1,
    pageSelection: "delete",
    fileHint: "Select one PDF file to edit.",
    instructions: [
      "Upload your PDF.",
      "Tap the page numbers you want to remove.",
      "Select Delete PDF Pages to apply the change.",
      "Download the cleaned-up PDF.",
    ],
    faq: [
      {
        question: "Can I undo a page deletion?",
        answer:
          "Deleting pages doesn't change your original file. If you want a different result, start over with the same source PDF.",
      },
      {
        question: "Is there a limit on how many pages I can remove?",
        answer:
          "You can remove as many pages as you like, as long as at least one page remains in the file.",
      },
    ],
  },
  {
    slug: "extract-pdf-pages",
    name: "Extract PDF Pages",
    oneLiner: "Create a new PDF from selected pages.",
    description: "Pull specific pages out into a brand-new PDF.",
    icon: FileOutput,
    color: "amber",
    maxFiles: 1,
    pageSelection: "extract",
    fileHint: "Select one PDF file to extract pages from.",
    instructions: [
      "Upload your PDF.",
      "Tap the page numbers you want to keep.",
      "Select Extract PDF Pages to build the new file.",
      "Download it.",
    ],
    faq: [
      {
        question: "What's the difference between Extract and Delete Pages?",
        answer:
          "Extract keeps only the pages you select and discards the rest. Delete Pages does the opposite: it removes the pages you select and keeps everything else.",
      },
      {
        question: "Can I change the page order while extracting?",
        answer:
          "Not yet. Extracted pages keep their original order from the source PDF, no matter what order you tap them in.",
      },
    ],
  },
  {
    slug: "rearrange-pdf",
    name: "Rearrange PDF Pages",
    oneLiner: "Change the order of pages in a PDF.",
    description: "Drag pages into the order that makes sense.",
    icon: ListOrdered,
    color: "pink",
    maxFiles: 1,
    fileHint: "Select one PDF file to reorder.",
    instructions: [
      "Upload your PDF.",
      "Drag page thumbnails into the order you want, or use the arrow buttons on each page.",
      "Rotate any sideways or upside-down pages with the rotate button on that page.",
      "Select Apply new order, then download the reordered PDF.",
    ],
    faq: [
      {
        question: "Can I rotate pages while rearranging them?",
        answer:
          "Yes. Each page thumbnail has its own rotate button, so you can fix a sideways page at the same time you move it. For rotating many pages at once, the dedicated Rotate PDF tool is faster.",
      },
      {
        question: "Will rearranging affect page content?",
        answer: "No. Only the page order changes; nothing on the pages themselves is altered.",
      },
    ],
  },
  {
    slug: "insert-pdf-pages",
    name: "Insert PDF Pages",
    oneLiner: "Add new pages after any page of your PDF.",
    description: "Insert pages from another PDF, images or blank pages after the page number you choose, such as after page 7 of a 30-page file.",
    icon: FilePlus2,
    color: "accent",
    maxFiles: 1,
    fileHint: "Select the PDF you want to add pages to.",
    instructions: [
      "Upload the PDF you want to add pages to.",
      "Choose where the new pages go: pick \u201cInsert after\u201d on a page, or use the position menu (including before page 1 and at the end).",
      "Choose what to insert: pages from another PDF, one or more images, or blank pages.",
      "Check the result summary, then select Insert pages and download the new PDF.",
    ],
    faq: [
      {
        question: "Can I add a page after a specific page number?",
        answer:
          "Yes. If your PDF has 30 pages, you can insert after page 7, after page 9, at the very beginning or at the very end. The new pages are placed right after the page you choose and every later page moves down.",
      },
      {
        question: "What can I insert?",
        answer:
          "Pages from another PDF (all of them or just the ones you tick), JPG or PNG images (each becomes a page), or blank pages. Blank pages can match the neighbouring page size, A4 or US Letter.",
      },
      {
        question: "Can I insert in several places at once?",
        answer:
          "One position per run. To add pages in more than one place, download the result and run the tool again with the new file.",
      },
      {
        question: "Does it change my original file?",
        answer: "No. The tool builds a new PDF in your browser, and your original stays untouched.",
      },
      {
        question: "Does it work with password-protected PDFs?",
        answer: "No. Remove the password in the program that created the file first, then upload it here.",
      },
    ],
  },
  {
    slug: "rotate-pdf",
    name: "Rotate PDF",
    oneLiner: "Rotate one or more PDF pages.",
    description: "Fix sideways or upside-down pages in seconds.",
    icon: RotateCw,
    color: "sky",
    maxFiles: 1,
    fileHint: "Select one PDF file to rotate.",
    instructions: [
      "Upload your PDF.",
      "Select the pages you want to rotate, or choose all pages.",
      "Rotate 90° clockwise or counterclockwise.",
      "Select Apply, then download the corrected PDF.",
    ],
    faq: [
      {
        question: "Can I rotate just one page instead of the whole document?",
        answer: "Yes. Select individual pages, or apply the same rotation to every page at once.",
      },
      {
        question: "Does rotating a page affect its content quality?",
        answer: "No. Rotation only changes page orientation; the page content is unchanged.",
      },
    ],
  },
  {
    slug: "jpg-to-pdf",
    name: "JPG to PDF",
    oneLiner: "Convert JPG or JPEG images into a PDF.",
    description: "Combine one or more JPG images into a single PDF file.",
    icon: FileImage,
    color: "lime",
    fileHint: "Select one or more JPG or JPEG images. For PNG files, use PNG to PDF.",
    instructions: [
      "Add the JPG or JPEG images you want to convert.",
      "Drag images into the order you want, or use the arrow buttons.",
      "Choose a page size: fit to each image, A4, or US Letter.",
      "Select Convert to PDF, then download the file.",
    ],
    faq: [
      {
        question: "Can I combine multiple images into one PDF?",
        answer:
          "Yes. Add as many JPG images as you like, put them in the order you want, and they'll be combined into a single PDF with one image per page.",
      },
      {
        question: "Can I convert PNG images here?",
        answer:
          "PNG files have their own tool. Use PNG to PDF for PNG images so transparency and sharp graphics are handled correctly.",
      },
      {
        question: "What does \u201cFit to image\u201d do?",
        answer:
          "It makes each PDF page exactly the size of its image, with no white space or margin. A4 and US Letter instead place the image centered on a standard page size.",
      },
      {
        question: "Does converting reduce image quality?",
        answer:
          "No. Your image data is placed into the PDF as-is; converting to PDF doesn't recompress or resize the image itself.",
      },
    ],
  },
  {
    slug: "png-to-pdf",
    name: "PNG to PDF",
    oneLiner: "Convert PNG images into a PDF.",
    description: "Combine one or more PNG images into a single PDF file, right in your browser.",
    icon: FileImage,
    color: "teal",
    fileHint: "Select one or more PNG images. For JPG or JPEG files, use JPG to PDF.",
    instructions: [
      "Add the PNG images you want to convert.",
      "Drag images into the order you want, or use the arrow buttons.",
      "Choose a page size: fit to each image, A4, or US Letter.",
      "Select Convert to PDF, then download the file.",
    ],
    faq: [
      {
        question: "Can I combine multiple PNG images into one PDF?",
        answer:
          "Yes. Add as many PNG images as you like, put them in the order you want, and they'll be combined into a single PDF with one image per page.",
      },
      {
        question: "What about transparent PNG images?",
        answer:
          "Transparent areas stay transparent inside the PDF, so they show the page colour, which is normally white, in most PDF viewers.",
      },
      {
        question: "Can I convert JPG images here?",
        answer: "JPG and JPEG files have their own tool. Use JPG to PDF for those.",
      },
      {
        question: "Are my images uploaded to a server?",
        answer: "No. The conversion runs in your browser and your images stay on your device.",
      },
    ],
  },
  {
    slug: "pdf-to-jpg",
    name: "PDF to JPG",
    oneLiner: "Convert PDF pages into JPG images.",
    description: "Turn any PDF page into a JPG image you can use anywhere.",
    icon: ImageIcon,
    color: "violet",
    maxFiles: 1,
    fileHint: "Select one PDF file to convert. For PNG output, use PDF to PNG.",
    instructions: [
      "Upload your PDF.",
      "Choose which pages to convert, or select all of them. Use the + button on a page to see it larger.",
      "Select Convert to JPG.",
      "Download your image (or a ZIP, for multiple pages).",
    ],
    faq: [
      {
        question: "Can I convert just some pages instead of the whole PDF?",
        answer:
          "Yes. Every page is selected by default; tap a page's thumbnail to leave it out, or use Select all / Clear selection.",
      },
      {
        question: "Should I choose JPG or PNG?",
        answer:
          "JPG is smaller and works well for most documents and photos. If a page has fine text or line art you want to keep razor sharp, use the PDF to PNG tool instead.",
      },
      {
        question: "How do I get more than one page at once?",
        answer:
          "If you convert more than one page, all the resulting images are bundled together into a single ZIP file you can download.",
      },
    ],
  },
  {
    slug: "pdf-to-png",
    name: "PDF to PNG",
    oneLiner: "Convert PDF pages into PNG images.",
    description: "Turn any PDF page into a sharp PNG image, ideal for text, line art and screenshots.",
    icon: ImageIcon,
    color: "amber",
    maxFiles: 1,
    fileHint: "Select one PDF file to convert. For JPG output, use PDF to JPG.",
    instructions: [
      "Upload your PDF.",
      "Choose which pages to convert, or select all of them. Use the + button on a page to see it larger.",
      "Select Convert to PNG.",
      "Download your image (or a ZIP, for multiple pages).",
    ],
    faq: [
      {
        question: "Why choose PNG instead of JPG?",
        answer:
          "PNG keeps fine text, thin lines and flat colours crisp, with no compression artefacts. The files are larger than JPG, so use PDF to JPG when size matters more.",
      },
      {
        question: "Can I convert just some pages instead of the whole PDF?",
        answer:
          "Yes. Every page is selected by default; tap a page's thumbnail to leave it out, or use Select all / Clear selection.",
      },
      {
        question: "How do I get more than one page at once?",
        answer:
          "If you convert more than one page, all the resulting images are bundled together into a single ZIP file you can download.",
      },
    ],
  },
];

/** Tools that convert between PDF and another format; everything else is a plain PDF-editing tool. */
export const convertToolSlugs = ["pdf-to-word", "word-to-pdf", "jpg-to-pdf", "png-to-pdf", "pdf-to-jpg", "pdf-to-png"] as const;

export function isConvertTool(slug: string): boolean {
  return (convertToolSlugs as readonly string[]).includes(slug);
}

/** Tools grouped for the footer: PDF editing tools and Convert tools. */
export function getToolGroups(): { pdfTools: Tool[]; convertTools: Tool[] } {
  return {
    pdfTools: tools.filter((tool) => !isConvertTool(tool.slug)),
    convertTools: convertToolSlugs.map((slug) => tools.find((tool) => tool.slug === slug)).filter((tool): tool is Tool => Boolean(tool)),
  };
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

/** Return a small set of tools to show in the Related tools section. */
export function getRelatedTools(slug: string, limit = 3): Tool[] {
  return tools.filter((tool) => tool.slug !== slug).slice(0, limit);
}
