import type { LucideIcon } from "lucide-react";
import {
  Combine,
  Scissors,
  Trash2,
  FileOutput,
  ListOrdered,
  RotateCw,
} from "lucide-react";

export type ToolColor = "accent" | "coral" | "amber" | "teal" | "pink" | "sky";

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
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}
