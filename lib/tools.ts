import type { LucideIcon } from "lucide-react";
import {
  Combine,
  Scissors,
  Trash2,
  FileOutput,
  ListOrdered,
  RotateCw,
} from "lucide-react";

export type Tool = {
  slug: string;
  name: string;
  /** One sentence shown on tool cards and at the top of the tool page. */
  oneLiner: string;
  /** Slightly longer description, used for meta descriptions and card subtext. */
  description: string;
  icon: LucideIcon;
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
    oneLiner: "Split one PDF into separate PDF files.",
    description: "Break a PDF into separate files or individual pages.",
    icon: Scissors,
    fileHint: "Select one PDF file to split.",
    instructions: [
      "Upload the PDF you want to split.",
      "Choose which pages should go in each output file.",
      "Select Split to generate the new files.",
      "Download the results, individually or as a ZIP.",
    ],
    faq: [
      {
        question: "Can I split a PDF into individual pages?",
        answer:
          "Yes. Choose the option to split every page into its own file, then download them together as a ZIP.",
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
    fileHint: "Select one PDF file to edit.",
    instructions: [
      "Upload your PDF.",
      "Review the page thumbnails and select the ones to remove.",
      "Select Delete pages to apply the change.",
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
        answer: "No. You can remove as many pages as you like, up to the full page count.",
      },
    ],
  },
  {
    slug: "extract-pdf-pages",
    name: "Extract PDF Pages",
    oneLiner: "Create a new PDF from selected pages.",
    description: "Pull specific pages out into a brand-new PDF.",
    icon: FileOutput,
    fileHint: "Select one PDF file to extract pages from.",
    instructions: [
      "Upload your PDF.",
      "Select the pages you want to keep.",
      "Reorder them if needed.",
      "Select Extract to create the new PDF, then download it.",
    ],
    faq: [
      {
        question: "What's the difference between Extract and Delete Pages?",
        answer:
          "Extract keeps only the pages you select and discards the rest. Delete Pages does the opposite: it removes the pages you select and keeps everything else.",
      },
      {
        question: "Can I change the page order while extracting?",
        answer: "Yes. Reorder the selected pages before creating the new PDF.",
      },
    ],
  },
  {
    slug: "rearrange-pdf",
    name: "Rearrange PDF Pages",
    oneLiner: "Change the order of pages in a PDF.",
    description: "Drag pages into the order that makes sense.",
    icon: ListOrdered,
    fileHint: "Select one PDF file to reorder.",
    instructions: [
      "Upload your PDF.",
      "Drag page thumbnails into the order you want.",
      "Select Apply to save the new order.",
      "Download the reordered PDF.",
    ],
    faq: [
      {
        question: "Can I rotate pages while rearranging them?",
        answer:
          "Basic rotation may be available alongside reordering. For dedicated rotation controls, use the Rotate PDF tool.",
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
