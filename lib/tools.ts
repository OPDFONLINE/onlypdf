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
  /** Short line explaining what the tool needs from the user's file. */
  fileHint: string;
  instructions: string[];
  faq: { question: string; answer: string }[];
};

export const tools: Tool[] = [
  {
    slug: "watermark-remove",
    name: "PDF Watermark Remove",
    oneLiner: "Remove a selected watermark area from PDF pages.",
    description: "Preview a PDF, select a watermark area, and cover it before downloading a cleaned copy.",
    icon: Eraser,
    color: "teal",
    maxFiles: 1,
    fileHint: "Select one PDF file with a watermark to remove.",
    instructions: [
      "Upload your PDF and wait for the page previews.",
      "Drag over the watermark area in the preview.",
      "Choose whether to apply the same area to every page or only the current page.",
      "Remove the selected area and download the cleaned PDF.",
    ],
    faq: [
      { question: "Does this remove every type of watermark?", answer: "It covers the selected area with white. This works when the watermark is in a predictable area, but a watermark baked into page content cannot always be cleanly separated from text or images." },
      { question: "Can I preview what will be removed?", answer: "Yes. The tool shows the PDF page before processing and lets you draw the removal area directly over the watermark." },
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
    oneLiner: "Convert JPG, JPEG, or PNG images into a PDF.",
    description: "Combine one or more images into a single PDF file.",
    icon: FileImage,
    color: "lime",
    fileHint: "Select one or more JPG, JPEG, or PNG images.",
    instructions: [
      "Add the JPG, JPEG, or PNG images you want to convert.",
      "Drag images into the order you want, or use the arrow buttons.",
      "Choose a page size: fit to each image, A4, or US Letter.",
      "Select Convert to PDF, then download the file.",
    ],
    faq: [
      {
        question: "Can I combine multiple images into one PDF?",
        answer:
          "Yes. Add as many JPG, JPEG, or PNG images as you like, put them in the order you want, and they'll be combined into a single PDF with one image per page.",
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
    slug: "pdf-to-jpg",
    name: "PDF to JPG",
    oneLiner: "Convert PDF pages into JPG or PNG images.",
    description: "Turn any PDF page into a JPG or PNG image you can use anywhere.",
    icon: ImageIcon,
    color: "violet",
    maxFiles: 1,
    fileHint: "Select one PDF file to convert.",
    instructions: [
      "Upload your PDF.",
      "Choose which pages to convert, or select all of them.",
      "Choose JPG or PNG as the output format.",
      "Select Convert, then download your image (or a ZIP, for multiple pages).",
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
          "JPG is smaller and works well for most documents. PNG is a better choice if a page has fine text, line art, or transparency you want to preserve exactly.",
      },
      {
        question: "How do I get more than one page at once?",
        answer:
          "If you convert more than one page, all the resulting images are bundled together into a single ZIP file you can download.",
      },
    ],
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}
