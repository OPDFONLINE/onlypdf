import type { Batch1Article } from "@/lib/blog/batch1-articles";

// Batch 6: five pillar-length guides (1250+ words each). {{IMG:n}} placeholders
// are resolved by /api/admin/blog/illustrate?slug=... and saved as drafts.
export type Batch6Article = Batch1Article;

export const batch6Articles: Batch6Article[] = [
  {
    slug: "which-pdf-tool-do-i-need-cheat-sheet",
    title: "Which PDF Tool Do I Need? A Problem-to-Solution Cheat Sheet",
    excerpt: "Sideways page, file too big, wrong order, need it in Word? Match your problem to the right tool in seconds, with notes on what each one can and cannot do.",
    seo_title: "Which PDF Tool Do I Need? A Problem-to-Solution Cheat Sheet",
    seo_description: "Find the right PDF tool for your problem: merge, split, compress, rotate, rearrange, delete, extract, convert, and remove watermarks. A quick decision guide.",
    category: "PDF Basics",
    topic_cluster: "pdf-basics",
    author: "OnlyPDF Team",
    related_slugs: ["how-to-merge-reorder-organize-pdf-files", "check-pdf-before-sending-final-checklist", "pdf-vs-word-vs-jpg-choosing-the-right-file-format"],
    featuredImageQuery: "toolbox with tools organized",
    content: `# Which PDF Tool Do I Need? A Problem-to-Solution Cheat Sheet

Most people arrive at a PDF tool with a problem, not a tool name. The file is too big to email. One page is sideways. Two documents need to become one. Someone wants a Word version. The trouble is that similar-sounding tools do quite different things, and choosing the wrong one wastes time: splitting when you meant to extract, or compressing when you should have deleted pages.

This cheat sheet works backwards from the problem. Find the sentence that sounds like yours, use the tool named next to it, and read the short note about what the tool does and does not do. All fifteen tools on this site run in your browser, so your files are processed on your own device.

{{IMG:1}}

## If you have too many files

### "I need to join several PDFs into one file"

Use the [merge PDF tool](/tools/merge-pdf). Add two or more PDFs, drag them into the order you want, and download one combined file. The order you set is the order of the result, so arrange carefully before you merge.

### "I have photos and need a PDF"

Use the [JPG to PDF tool](/tools/jpg-to-pdf). It accepts JPG and JPEG images, turns each into a page, and lets you choose fit to image, A4, or US Letter. Choose A4 or US Letter for official documents.

### "My images are PNG files or screenshots"

Use the [PNG to PDF tool](/tools/png-to-pdf). It works like JPG to PDF but takes PNG images. If a batch mixes JPG and PNG, make one PDF with each tool and join them with the [merge PDF tool](/tools/merge-pdf).

### "I have a Word document and need a PDF"

Use the [Word to PDF tool](/tools/word-to-pdf). It converts a DOCX file into a simple PDF. It handles text and paragraph content well, but complex layouts, floating objects, and advanced tables may not match the original, so always check the result.

## If you have too many pages

:::highlight blue
Related guides: [how to extract pages from a PDF](/blog/extract-pages-from-pdf-complete-guide) and [how to remove blank pages from a scanned PDF](/blog/remove-blank-pages-from-scanned-pdf).
:::

### "I want to remove a few pages"

Use the [delete PDF pages tool](/tools/delete-pdf-pages). Tap the pages you do not want, and download the new file. At least one page must remain.

### "I want to keep only a few pages"

Use the [extract PDF pages tool](/tools/extract-pdf-pages). Tap the pages you want to keep. Extracted pages keep their original order, whatever order you tapped them in.

### "I want every page as its own file"

Use the [split PDF tool](/tools/split-pdf). It turns each page into a separate PDF and bundles them in a ZIP. Note that it splits into single pages; it does not cut a document into custom ranges. For a range, extract those pages instead.

A simple way to choose between the last three: count how many pages you are keeping and how many you are removing, and pick whichever needs fewer taps.

## If your pages are in the wrong shape

:::highlight blue
Related guides: [how to rearrange PDF pages online](/blog/rearrange-pdf-pages-online) and [how to fix a sideways scanned PDF](/blog/fix-sideways-scanned-pdf).
:::

### "A page is sideways or upside down"

Use the [rotate PDF tool](/tools/rotate-pdf). Select the pages, choose a direction, and download. Unlike the rotate button in most viewers, this saves the rotation into the file so every reader shows the page upright.

### "The pages are in the wrong order"

Use the [rearrange PDF tool](/tools/rearrange-pdf). Drag page thumbnails into position or use the arrow buttons. There is also a rotate button on each page, so you can fix orientation and order in one pass.

### "I need to add pages in the middle of a PDF"

Use the [insert PDF pages tool](/tools/insert-pdf-pages). Choose the page to insert after, then add pages from another PDF, JPG or PNG images, or blank pages. It handles one position per run, so repeat it for a second spot. The merge tool only joins whole files end to end.

## If your file is too big

### "The upload or email says the file is too large"

Use the [compress PDF tool](/tools/compress-pdf). Choose High, Medium, or Express, or use target file size and enter a limit such as 800 KB or 2 MB. Some files cannot reach very small targets without a visible loss of quality, especially multi-page scans, so check readability afterward.

The first thing to try, before any compression, is removing pages you do not need. It is often the biggest saving, and it costs no quality at all.

## If you need a different format

### "I need to edit the text in a PDF"

Use the [PDF to Word tool](/tools/pdf-to-word). It extracts the text and basic structure from a PDF with selectable text and builds a DOCX file. Expect a good first draft rather than a perfect copy. Scanned PDFs are pictures of pages, and getting text out of a picture needs OCR, which this tool does not do.

### "I need a page as an image"

Use the [PDF to JPG tool](/tools/pdf-to-jpg) for a JPG, or the [PDF to PNG tool](/tools/pdf-to-png) for a PNG with crisp text edges. Choose the pages and download. Several pages come as a ZIP. The result is a picture, so its text cannot be selected or searched.

## If there is something you want gone

### "There is a watermark I have the right to remove"

Use the [watermark remove tool](/tools/watermark-remove). Its Smart mode scans the PDF for watermark objects, such as semi-transparent text, logos and stamps, and deletes the ones you tick after a before-and-after preview. If the watermark is part of a scan or page image, Manual mode lets you draw a box and cover the area with a matching colour, which hides the content rather than erasing it. Only use it on documents you have the right to modify. See the full guide on [how to remove a watermark from a PDF](/blog/how-to-remove-watermark-from-pdf).

{{IMG:2}}

## A quick reference table

| Your problem | Tool |
| --- | --- |
| Join PDFs | Merge PDF |
| JPG photos to PDF | JPG to PDF |
| PNG images to PDF | PNG to PDF |
| Word to PDF | Word to PDF |
| Remove some pages | Delete PDF pages |
| Keep some pages | Extract PDF pages |
| Every page separate | Split PDF |
| Sideways page | Rotate PDF |
| Wrong page order | Rearrange PDF |
| Add pages inside a PDF | Insert PDF pages |
| File too large | Compress PDF |
| Edit text | PDF to Word |
| Page as JPG picture | PDF to JPG |
| Page as PNG picture | PDF to PNG |
| Remove watermark | Watermark remove |

## Common combinations

:::highlight blue
Working mostly from a phone? Read [how to use PDF tools on your phone](/blog/use-pdf-tools-on-phone-complete-guide).
:::

Real jobs rarely need only one tool. These sequences come up again and again.

- Scanned packet: JPG to PDF, then rotate, then rearrange, then compress. See our [phone scan workflow](/blog/phone-scan-to-pdf-workflow).
- Application bundle: convert each piece, merge them in order, delete extras, then compress last. See the [application checklist](/blog/prepare-documents-for-online-application-checklist).
- Sharing part of a document: extract the pages, check them, then compress if needed.
- Word draft to final: edit in Word, convert to PDF, check the layout, then send.

:::highlight blue
A good rule for order of operations: fix content first (delete, extract, rotate, rearrange), combine second (merge), and shrink last (compress). Compressing at the end keeps every earlier step at full quality.
:::

## Mistakes that come from choosing the wrong tool

- Splitting when you wanted only a few pages. Extract is quicker and gives you one file instead of many.
- Compressing repeatedly. Run it once on the original with a stronger setting rather than compressing a compressed file.
- Converting to images when you needed editable text. Images cannot be edited as text.
- Expecting a converter to reproduce a complex layout exactly. Simple documents convert well; complex ones need checking.
- Merging before fixing pages. Rotate and reorder first if pages are wrong.

## What none of these tools do

:::highlight blue
Related guide: [Password-protected PDF? What to do first](/blog/password-protected-pdf-what-to-do-first) covers locked files.
:::

It helps to know the limits. These tools do not read text out of scanned images, so there is no OCR. They do not fill in or sign forms. They do not password-protect files. If your task needs one of those, you will need different software. Being clear about this saves you from hunting for a feature that is not there.

## Privacy

All fifteen tools process files in your browser, so documents are handled on your own device rather than being uploaded to a server first. For how to verify that for yourself, read [are online PDF tools safe](/blog/are-online-pdf-tools-safe).

## Before you send anything

Whatever tool you used, open the final file and check it. Our [12-point final checklist](/blog/check-pdf-before-sending-final-checklist) takes about two minutes and catches the problems that the tools cannot.

## Frequently asked questions

### What is the difference between extract and split?

Extract keeps the pages you choose in one new file. Split turns every page into its own file.

### Which tool should I use first?

Use content-fixing tools first (delete, extract, rotate, rearrange), then merge, then compress last.

### Can one tool do everything?

Each tool does one job so it stays simple. Combining them in sequence handles almost every everyday task.

### Do the tools change my original file?

No. Each one produces a new file for you to download and leaves your original untouched.

### Which tool helps with a scanned document?

Rotate for sideways pages, rearrange for order, delete for blanks, and compress for size. Turning scanned text into editable text requires OCR, which is not offered here.

Bookmark this page, and the next time a PDF misbehaves, find your problem in the list, use the matching tool, and check the result. Most PDF frustrations turn out to be a two-minute fix once you know which tool does what.`,
    images: [
      { marker: 1, query: "papers and files spread on desk" },
      { marker: 2, query: "person solving problem at laptop" },
    ],
  },
  {
    slug: "scanned-pdf-vs-digital-pdf-how-to-tell",
    title: "Scanned PDF vs Digital PDF: How to Tell the Difference and Why It Matters",
    excerpt: "Two PDFs can look identical and behave completely differently. Learn the ten-second test, and what it means for converting, compressing, and editing.",
    seo_title: "Scanned PDF vs Digital PDF: How to Tell the Difference",
    seo_description: "Learn how to tell a scanned PDF from a digital one with a ten-second test, and how the difference affects converting to Word, file size, and editing.",
    category: "PDF Basics",
    topic_cluster: "pdf-basics",
    author: "OnlyPDF Team",
    related_slugs: ["why-pdf-to-word-loses-formatting", "convert-pdf-to-editable-word-document", "pdf-file-size-limits-and-how-to-meet-them"],
    featuredImageQuery: "comparing scanned paper and digital document",
    content: `# Scanned PDF vs Digital PDF: How to Tell the Difference and Why It Matters

Open two PDFs side by side and they can look the same: a page of text, a logo, a signature. Yet one might behave perfectly when you convert it to Word, and the other might return an empty document. One might be 80 KB and the other 12 MB. The difference is not visible on screen, and it explains many of the surprises people have with PDFs.

The difference is whether the PDF contains real text or only a picture of text. This guide shows how to tell them apart in about ten seconds, why it matters, and what to do in each case.

## Two kinds of PDF

### Digital PDFs

A digital PDF, sometimes called a native or text-based PDF, is created directly by a program: a word processor, a spreadsheet, a design tool, or a website's print function. The text inside is stored as text. You can select it, search it, and copy it. The file is usually small, and the page looks razor sharp at any zoom level.

### Scanned PDFs

A scanned PDF is made from pictures of paper pages, taken by a scanner or a phone camera. Each page is one image. To your eyes it looks like a document, but to the computer it is a photograph. There is no text to select or search, unless someone has run OCR (optical character recognition) software that adds a hidden text layer.

{{IMG:1}}

## The ten-second test

You do not need special software. Try these checks in any PDF viewer.

### Try to select a word

Click and drag across a line of text, or double-click a word. If the words highlight individually, the PDF has real text. If nothing highlights, or a whole block or the entire page turns blue at once, the page is an image.

### Try to search

Use your viewer's search function and look for a word you can see on the page. If the viewer finds it, the text is real. If it reports no results for a word that is clearly there, the page is probably an image.

### Zoom in a long way

Zoom to a high level and look at the edges of the letters. In a digital PDF, letters stay crisp at any size. In a scan, letters turn fuzzy or blocky as you zoom, and you may see paper texture, shadows, or slightly crooked lines.

### Look for scan clues

A scan often shows uneven margins, a faint grey background instead of pure white, a slightly tilted page, or dark edges where the paper met the scanner. Digital PDFs are perfectly aligned and cleanly white.

### Check the file size

A ten-page digital text document is often only a few hundred kilobytes. A ten-page scan is often several megabytes, because every page is a full image. Size alone does not prove anything, but a large file for a text-only document is a strong hint that it is a scan.

:::highlight blue
If your test gives mixed results, the PDF may be a scan with an OCR text layer. It looks like an image but searches like text. That is the best of both worlds, and quite common in archives and government documents.
:::

## Why the difference matters

### Converting to Word

The [PDF to Word tool](/tools/pdf-to-word) extracts text from a PDF and builds a DOCX file. On a digital PDF, it works well and gives you an editable first draft. On a scanned PDF, there is no text to extract, and reliable extraction from pictures requires OCR, which this tool does not perform. If your converted file is empty or contains only images, that is the reason. Read [why PDF to Word conversion loses formatting](/blog/why-pdf-to-word-loses-formatting) and [how to convert a PDF to an editable Word document](/blog/convert-pdf-to-editable-word-document) for more.

### File size and compression

Scans are heavy, and they respond well to compression, because the size comes from image data. The [compress PDF tool](/tools/compress-pdf) can reduce them noticeably, though very small targets may cost visible quality. Digital text PDFs are already small, so compression gains are modest. If a digital PDF is large, the cause is often embedded images or fonts rather than the text. See [PDF file size limits and how to meet them](/blog/pdf-file-size-limits-and-how-to-meet-them).

### Searching and accessibility

A digital PDF can be searched and read by screen readers. A pure scan cannot, which matters for people who rely on assistive technology and for anyone hoping to find a phrase in a long document.

### Copying text

If you need a quote or a figure, a digital PDF lets you copy it. With a scan, you would have to retype it or use OCR software.

### Print and display quality

Digital PDFs stay sharp at any size. Scans are only as sharp as the original scanning resolution, so enlarging or printing a scan at a big size can look soft.

{{IMG:2}}

## What to do with each kind

### If your PDF is digital

You have the most options. Convert it to Word for editing, extract or delete pages freely, and compress only if you have a size limit. When you can, create the PDF straight from the source document rather than printing and scanning it. That produces a sharper, smaller, searchable file.

### If your PDF is a scan

Accept that it is a set of pictures, and work with that.

- Fix orientation with the [rotate PDF tool](/tools/rotate-pdf).
- Fix order with the [rearrange PDF tool](/tools/rearrange-pdf).
- Remove blank or unwanted pages with the [delete PDF pages tool](/tools/delete-pdf-pages).
- Shrink it with the compress tool if there is a size limit.
- Convert pages to images with the [PDF to JPG tool](/tools/pdf-to-jpg) if you need pictures.

If you need the text itself, look for OCR software or a document scanning app that offers it. This site does not currently offer text recognition, so it is better to be clear about that than to expect a result the tool cannot deliver.

### If you are about to create a scan

Ask whether you really need one. If the original exists digitally, share that. If you must scan paper, do it well: even light, a flat page, and a straight-on angle. Our guide to [turning phone photos into a perfect PDF](/blog/phone-scan-to-pdf-workflow) covers the whole process.

## Watermarks and scans

Watermarks behave differently on the two kinds. In a digital PDF, a watermark is often a separate element, and the [watermark remove tool](/tools/watermark-remove) can find and delete it in Smart mode. In a scan or flattened page the watermark and the content are one picture, so Smart mode finds nothing and Manual mode covers a selected area with a matching colour instead of separating layers. Results on scans depend on how much lies under the watermark. See our guide on [removing a watermark by selecting the area](/blog/remove-watermark-from-pdf-selected-area).

## Common misunderstandings

- A PDF that looks like text must contain text. Not so. A scan looks exactly like text.
- A PDF is small, so it must be low quality. Digital PDFs are small and perfectly sharp.
- A large file is a bad file. It may simply contain scanned images.
- Converting to Word is unreliable. It is reliable for digital PDFs and not for scans.
- A scan with searchable text has real text. It has a text layer produced by OCR, which can contain errors.

## A short decision guide

- Text selectable? It is digital, so converting to Word will work.
- Not selectable, large file? It is a scan, so use fix-and-compress tools.
- Not selectable, but searchable? It is a scan with OCR, so it behaves like both.

## Privacy

Scans are frequently personal: identity papers, medical letters, statements. The tools mentioned here process files in your browser, so your documents are handled on your own device rather than being uploaded to a server first. See [are online PDF tools safe](/blog/are-online-pdf-tools-safe) for how to check this yourself.

## Frequently asked questions

### Can I turn a scanned PDF into a digital one?

You can turn it into a searchable one with OCR software, which reads the pictures and adds text. This site does not offer OCR.

### Why is my scanned PDF so large?

Each page is a full image, and images take far more space than text.

### Why did PDF to Word give me an empty document?

The PDF is most likely a scan, so there was no real text to extract.

### Is a digital PDF always better?

For editing, searching, and file size, yes. For preserving the exact look of a paper original, a good scan is fine.

### Can a PDF be part scan and part digital?

Yes. Documents built from mixed sources often contain both kinds of pages, so test a few pages, not only the first.

A ten-second test tells you which kind of PDF you have, and that one fact predicts how it will convert, how large it will be, and what you can do with it. Check before you convert or compress, and you will avoid most of the surprises.`,
    images: [
      { marker: 1, query: "printer scanner paper office" },
      { marker: 2, query: "zooming into text on computer screen" },
    ],
  },
  {
    slug: "pdf-workflow-for-students-assignments-and-thesis",
    title: "A PDF Workflow for Students: Assignments, Thesis Chapters, and Submissions",
    excerpt: "Merge chapters, fix page order, keep files under submission limits, and avoid last-minute upload panic with a simple repeatable routine.",
    seo_title: "PDF Workflow for Students: Assignments and Thesis Submissions",
    seo_description: "A practical PDF routine for students: convert to PDF, combine chapters, check order, meet upload limits, and keep clean versions for every deadline.",
    category: "Organize PDF",
    topic_cluster: "merge-organize",
    author: "OnlyPDF Team",
    related_slugs: ["combine-word-images-and-pdfs-into-one-document-package", "check-pdf-before-sending-final-checklist", "pdf-file-size-limits-and-how-to-meet-them"],
    featuredImageQuery: "student studying with laptop and notes",
    content: `# A PDF Workflow for Students: Assignments, Thesis Chapters, and Submissions

Deadlines have a way of exposing document problems. The upload page closes in ten minutes, and your assignment is in three files, one page is sideways, and the portal says the file is too big. Students handle more PDF tasks than almost anyone: lecture notes, scanned readings, group projects, cover sheets, appendices, and final submissions. A small, repeatable routine turns these into non-events.

This guide sets out a workflow you can use for a single assignment or a whole thesis. It relies on the [merge PDF](/tools/merge-pdf), [Word to PDF](/tools/word-to-pdf), [JPG to PDF](/tools/jpg-to-pdf), [rearrange PDF](/tools/rearrange-pdf), and [compress PDF](/tools/compress-pdf) tools, which all run in your browser. One rule overrides everything here: your institution's submission guidelines come first. If they specify format, size, page order, or file naming, follow them exactly.

{{IMG:1}}

## Principle one: always keep an editable source

Your Word or other source file is the master. The PDF is a copy you make for submission. Never work only from the PDF. If your supervisor asks for a change, or you spot a typo, you edit the source and produce a new PDF, which is far cleaner than trying to edit the PDF.

Name your files so the newest is obvious, for example thesis-chapter-3-v4.docx. Avoid final-final-really.docx. A version number tells you at a glance which file is current.

## Principle two: convert late, but not too late

Write and revise in your word processor. Convert to PDF only when the document is ready to check. Then check the PDF as a reader would.

For the conversion itself, note the trade-off. The [Word to PDF tool](/tools/word-to-pdf) takes a DOCX file and produces a simple PDF from its text and paragraph content. Complex layouts, floating objects, equations, and advanced tables may not match the original, so review the output carefully. If your document has heavy formatting, figures, or equations, exporting a PDF directly from your word processor's own save or export option is usually the more faithful route. Our article on [converting Word to PDF without losing formatting](/blog/convert-word-to-pdf-without-losing-formatting) discusses this in more depth.

## The assignment workflow

For a typical assignment, the routine is short.

- Finish and save the source document.
- Export or convert it to PDF.
- Open the PDF and check every page: headings, references, figures, and page breaks.
- If a cover sheet or declaration is a separate file, convert it too.
- Merge the pieces in the required order with the merge tool.
- Compress only if the portal has a size limit.
- Name the file as the guidelines require, and submit well before the deadline.
- Keep the exact file you submitted.

## The thesis workflow

A thesis is a long project, and it is usually written in chapters. Working in pieces has benefits, but it creates assembly work at the end. Plan for it.

### Keep chapters as separate files while writing

Separate files are easier to edit, share with a supervisor, and keep light. Give each a numbered name, such as 01-introduction, 02-literature-review, and so on. Numbered names sort in the right order in any folder.

### Convert each chapter to PDF for review

When a supervisor wants a read-through, make a PDF of each finished chapter. If they want everything at once, merge the chapters in order with the [merge PDF tool](/tools/merge-pdf). Drag files into sequence, merge, and scroll through to confirm.

### Assemble the final submission

Final assembly usually includes a title page, declarations, abstract, table of contents, chapters, references, and appendices. Some institutions want one single file, others separate files. Follow the guidelines. When merging, use your numbered filenames as a checklist so nothing is left out.

### Watch the page count and numbering

Merging combines documents; it does not renumber the printed page numbers inside them. If your chapters were numbered separately, the combined file may show repeated or out-of-sequence numbers. If continuous numbering is required, set it up in the source before converting, for example by assembling a single document in your word processor.

{{IMG:2}}

## Scanned material and appendices

Students often need to include scanned documents: signed forms, handwritten calculations, survey sheets, ethics approvals. Turn these into clean PDFs first.

- Photograph or scan pages with even light and a straight-on angle. Our guide on [phone scan to PDF](/blog/phone-scan-to-pdf-workflow) shows how.
- Use the [JPG to PDF tool](/tools/jpg-to-pdf) with A4 or US Letter as the page size for a uniform look.
- Fix sideways pages with the [rotate PDF tool](/tools/rotate-pdf).
- Put pages in order with the [rearrange PDF tool](/tools/rearrange-pdf).
- Merge them into the main document at the right place.

## Group projects

Group work multiplies the file problem. A few habits keep it under control.

- Agree on one person who assembles the final document.
- Agree on file names and the order of sections before anyone starts.
- Ask everyone to send a PDF of their section as well as the editable file.
- Have the assembler merge in order, then send the combined file round for a final read.
- Fix page order or rotation problems with the rearrange tool rather than asking for resubmission.

## Meeting upload limits

Learning platforms and submission portals often limit file size. Scanned appendices and images are the usual reason for a file being too large.

- First remove pages you do not need with the [delete PDF pages tool](/tools/delete-pdf-pages).
- Then use the [compress PDF tool](/tools/compress-pdf) with Medium, or target file size if you know the limit.
- Aim a little under the limit.
- Open the result and check that small text, equations, and figure labels are still readable.

Compress last, so all earlier steps happen at full quality. For a full plan, see [PDF file size limits and how to meet them](/blog/pdf-file-size-limits-and-how-to-meet-them).

## Reading and annotating with PDFs

Students also work with PDFs as inputs. A few tips help.

- If you need only a chapter of a large textbook PDF to print or share for study, [extract those pages](/tools/extract-pdf-pages) into a small file.
- If lecture slides come with a blank page between every slide, remove the blanks before printing to save paper.
- If you need a slide as a picture for your own presentation, the [PDF to JPG tool](/tools/pdf-to-jpg) turns chosen pages into images.
- Respect copyright and your institution's rules about sharing course materials.

## The pre-submission checklist

Run through this before every submission.

- The source file is saved and named clearly.
- The PDF matches the required format and page size.
- Every page is present, upright, and in order.
- References, figures, and tables display correctly.
- Text and figure labels are readable at normal zoom.
- The file is under the size limit.
- The file name follows the guidelines.
- You have a copy of exactly what you are submitting.

Our [12-point final checklist](/blog/check-pdf-before-sending-final-checklist) expands each item.

## Timing: the habit that saves you

Most submission disasters are timing disasters. Give yourself a buffer of at least a few hours, not minutes, between finishing and the deadline. Portals slow down, uploads fail, and files turn out to be sideways. Producing the PDF early leaves time to fix problems calmly.

## Common mistakes to avoid

- Editing only the PDF and losing the source.
- Converting too early, then changing the text and forgetting to reconvert.
- Assuming the converted layout is perfect, especially with figures and equations.
- Merging in the wrong order because file names do not sort.
- Compressing before fixing pages and then re-compressing after changes.
- Submitting at the last minute.

## Privacy

Student files may contain names, identification numbers, and personal data from surveys or interviews. The tools above process files in your browser, so your documents are handled on your own device rather than uploaded to a server first. If your work involves participant data, follow your ethics and data protection rules, which take priority over anything in this guide. See [are online PDF tools safe](/blog/are-online-pdf-tools-safe) for how to check a tool's behaviour.

## Frequently asked questions

### Should I submit one file or several?

Whatever the guidelines say. If they do not specify, one combined file is usually easiest for a reader.

### Will merging renumber my pages?

No. Merging combines files but does not change page numbers printed inside them.

### How do I keep the file under the size limit?

Delete unnecessary pages, then compress last, then check readability.

### Is the Word to PDF tool suitable for a thesis with equations?

Complex layouts may not match exactly. For heavy formatting, export a PDF from your word processor and use that.

### What if I find a mistake after submitting?

Check whether your institution allows resubmission. If so, fix the source file, produce a new PDF, and submit the corrected version with a clear name.

A good student workflow is boring by design: keep the source, convert when ready, check every page, merge in order, compress last, and keep a copy. Do it the same way each time, and deadlines stop being about documents and go back to being about ideas.`,
    images: [
      { marker: 1, query: "university student writing at desk" },
      { marker: 2, query: "library study notes and laptop" },
    ],
  },
  {
    slug: "pdf-workflow-for-freelancers-invoices-and-contracts",
    title: "A PDF Workflow for Freelancers: Invoices, Contracts, and Client Packets",
    excerpt: "Send professional, consistent documents every time: from invoice PDFs to signed contract bundles, with a clear naming system and clean client packets.",
    seo_title: "PDF Workflow for Freelancers: Invoices, Contracts, Packets",
    seo_description: "A practical PDF routine for freelancers: create clean invoice PDFs, assemble contract packets, fix pages, compress, name files, and keep tidy records.",
    category: "Organize PDF",
    topic_cluster: "merge-organize",
    author: "OnlyPDF Team",
    related_slugs: ["combine-word-images-and-pdfs-into-one-document-package", "digital-paperwork-organization-system", "check-pdf-before-sending-final-checklist"],
    featuredImageQuery: "freelancer working on laptop at home office",
    content: `# A PDF Workflow for Freelancers: Invoices, Contracts, and Client Packets

When you work for yourself, your documents are your first impression and your paper trail. A tidy invoice tells a client that you are organised. A contract bundle with pages in the right order and a clear file name saves both sides from confusion. A messy attachment, a sideways signature page, or a file too large for the client's mail server does the opposite, and it usually happens at exactly the wrong moment.

The following workflow keeps a freelancer's documents professional without becoming a second job. It uses the [Word to PDF](/tools/word-to-pdf), [JPG to PDF](/tools/jpg-to-pdf), [merge PDF](/tools/merge-pdf), [extract PDF pages](/tools/extract-pdf-pages), and [compress PDF](/tools/compress-pdf) tools, all of which run in your browser.

A note before we start: this is general document-handling advice, not legal, tax, or accounting advice. Requirements for invoices, contracts, and record-keeping vary by country and by the kind of work you do, so check the rules that apply to you or ask a qualified professional.

{{IMG:1}}

## Principle one: templates are the source, PDFs are the deliverable

Keep your invoice and proposal templates as editable files, such as Word documents. Fill in the details, save the editable version to your records, and send a PDF. Sending a PDF prevents accidental edits, keeps the layout identical on the client's screen, and looks more professional.

## Invoices

### Building a clean invoice PDF

Fill in your template, check every figure, and convert. The [Word to PDF tool](/tools/word-to-pdf) turns a DOCX file into a PDF, and it is designed for text and paragraph content. Because it produces a simple PDF, complex layouts, floating objects, and advanced tables may not match the original exactly, so open the result and check it before sending. If your invoice template uses a detailed design, exporting a PDF directly from your word processor's save or export option is usually the more faithful route.

### What to check before you send

- The client's name and details are correct.
- Dates, invoice number, and amounts are right.
- Payment details are accurate and complete.
- The layout is clean, with nothing cut off.
- The file name identifies it clearly.

### Naming invoices

Use a pattern you can sort and search. A dependable one is the date, then the client, then the invoice number, such as 2026-03-14 acme-invoice-0042.pdf. Writing the date as year, month, day makes files sort chronologically. Consistent names also make month-end and year-end bookkeeping far easier.

## Contracts and agreements

### Sending for review

If the client may suggest changes, send an editable version. When terms are agreed, produce a PDF of the final version for signature, so both sides work from identical text.

### Collecting signatures

However signatures are collected, you may end up with signed pages as photos or scans. Turn those into a clean PDF with the [JPG to PDF tool](/tools/jpg-to-pdf), using A4 or US Letter as the page size so pages look uniform. If a page is sideways, fix it with the [rotate PDF tool](/tools/rotate-pdf). Whether a particular signature method is legally sufficient depends on your jurisdiction and the type of agreement, so confirm that with a professional where it matters.

### Assembling the signed bundle

A signed contract often has several parts: the main agreement, a statement of work, terms, and signature pages. Put them together in the intended order with the [merge PDF tool](/tools/merge-pdf). If the order needs adjusting afterwards, use the [rearrange PDF tool](/tools/rearrange-pdf). Then scroll through and confirm that every page is present, upright, and in the right position. Our guide on [combining Word files, images, and PDFs into one package](/blog/combine-word-images-and-pdfs-into-one-document-package) walks through the steps.

## Client packets and proposals

Proposals, onboarding packs, and project deliverables often combine several pieces: a proposal, a scope document, a price list, and a portfolio sample.

- Convert each piece to PDF.
- Merge them in the order a client would want to read them: overview first, detail after.
- Remove any blank or unnecessary pages with the [delete PDF pages tool](/tools/delete-pdf-pages).
- Compress the result if it is heavy, especially if it contains images.
- Check the final file as the client will see it.

### Sharing only what the client needs

You may have one large internal document, such as a rate card or a portfolio, from which you only want to share a few pages. Use the [extract PDF pages tool](/tools/extract-pdf-pages) to create a new file with only the relevant pages, and leave the original untouched. That keeps internal notes and other clients' work private.

{{IMG:2}}

## Keeping files light for email

Portfolios and packets with photographs can be large, and client mail systems sometimes reject big attachments. Compress last, using the [compress PDF tool](/tools/compress-pdf) with Medium or a target size, and always check readability afterwards. If a file remains very large, consider sending it through a file-sharing link instead of an attachment. Our guide to [reducing PDF size for email](/blog/reduce-pdf-size-for-email) has more detail.

## Presenting a professional image

Small details add up.

- Use clear file names. Avoid scan001 or final-final.
- Send PDFs, not photos, wherever a document is expected.
- Keep page sizes uniform.
- Make sure pages are upright and in order.
- Keep file sizes sensible.

If you sometimes need to show a page as a picture, for example on a portfolio site, the [PDF to JPG tool](/tools/pdf-to-jpg) can turn selected pages into images.

## Record keeping

Your paper trail matters for taxes, disputes, and your own peace of mind.

- Save the editable source and the PDF you sent, side by side.
- Store signed contracts and paid invoices in folders organised by client or year.
- Back up your records in more than one place.
- Check how long you are required to keep documents in your country, as retention rules vary.

Our guide to [organizing digital paperwork](/blog/digital-paperwork-organization-system) sets out a simple folder and naming system that suits a freelance business.

## Handling client documents with care

Clients may share confidential material: internal reports, financial data, personal information. Treat it accordingly.

- Store it in a protected location.
- Share only what is necessary, and only with the people who need it.
- Prefer tools that process files on your device. The tools mentioned here run in your browser, so documents are handled on your own device rather than being uploaded to a server first. Read [are online PDF tools safe](/blog/are-online-pdf-tools-safe) to learn how to check a tool's behaviour.
- Check any confidentiality obligations in your contracts.

## A weekly routine

A short, regular routine beats a monthly scramble.

- Send invoices as PDFs with consistent names.
- File signed documents the day they arrive.
- Save editable sources with the PDFs.
- Back up once a week.
- Check outstanding invoices and follow up.

## The pre-send checklist

Before you send any document to a client, confirm the following.

- It is the correct version.
- Names, dates, and figures are right.
- All pages are present, upright, and in order.
- The file is readable at normal zoom.
- The size suits email or the client's upload system.
- The file name is clear.
- Nothing confidential or internal is included by mistake.

The [12-point final checklist](/blog/check-pdf-before-sending-final-checklist) expands on each of these points.

## Common mistakes

- Sending editable files when a final version is intended.
- Forgetting to check a converted layout.
- Using unclear file names that confuse both sides.
- Merging documents in the wrong order.
- Sharing a whole file when only a few pages were meant for the client.
- Keeping only the PDF and losing the editable source.
- Not backing up.

## Frequently asked questions

### Should I send invoices as PDF or Word?

PDF. It keeps the layout fixed and prevents accidental changes.

### Can I put several documents into one PDF for a client?

Yes. Convert each to PDF and merge them in the order the client should read them.

### How do I share just part of a document?

Extract the relevant pages into a new file and check it before sending.

### Is a scanned signature page acceptable?

That depends on the agreement and where you work. Check the requirements for your situation, and use a clear scan or photo converted to PDF.

### How long should I keep records?

It varies by country and document type. Check local rules or ask a qualified professional.

A freelancer's PDF habits do not need to be complicated. Keep editable sources, send clean PDFs, check pages before sending, use consistent names, share only what is needed, and back everything up. Those few habits make you look organised, and they make your own work easier too.`,
    images: [
      { marker: 1, query: "invoice and calculator on desk" },
      { marker: 2, query: "signing agreement with pen" },
    ],
  },
  {
    slug: "use-pdf-tools-on-phone-complete-guide",
    title: "How to Use PDF Tools on Your Phone: A Complete Mobile Guide",
    excerpt: "Merge, compress, rotate, and convert PDFs entirely from a phone browser. Practical tips for touch controls, finding your downloads, and avoiding common mobile pitfalls.",
    seo_title: "How to Use PDF Tools on Your Phone: A Complete Mobile Guide",
    seo_description: "Edit and convert PDFs from your phone browser: choosing files, ordering pages with touch, finding downloads, keeping files small, and staying private.",
    category: "PDF Basics",
    topic_cluster: "pdf-basics",
    author: "OnlyPDF Team",
    related_slugs: ["merge-pdf-files-in-order-on-phone", "phone-scan-to-pdf-workflow", "which-pdf-tool-do-i-need-cheat-sheet"],
    featuredImageQuery: "person using smartphone to manage documents",
    content: `# How to Use PDF Tools on Your Phone: A Complete Mobile Guide

For many people, the phone is the only computer they have at hand when a document problem strikes. The bank asks for a PDF while you are away from home. A landlord needs a signed page immediately. An application deadline arrives when the laptop is at the office. The good news is that browser-based PDF tools work well on a phone. The less good news is that touchscreens, small displays, and mobile file systems create small hurdles that are easy to avoid once you know them.

This guide covers how to do the common PDF jobs from a phone browser, with practical tips for each step. The tools on this site run in your browser, so there is nothing to install, and your files are processed on your own device.

{{IMG:1}}

## What you need

- A recent browser on your phone. Any mainstream mobile browser should work.
- A stable connection when you first load the page. After that, the processing happens on your device, but keep your connection on for downloads and page navigation.
- Enough free storage for the finished file and any temporary data.
- Battery. Processing large files can be demanding, so charge up first for big jobs.

## Step one: get your files where the browser can reach them

The most common mobile stumbling block is not the tool, it is finding the file. Files might live in your photo gallery, in a downloads folder, in a cloud storage app, or in an email attachment you have not saved yet.

- Save email attachments to your device before starting.
- If a file is in cloud storage, make sure it is available on the device or that your file picker can browse to it.
- For photos, remember that the picker may show a photo library rather than your file folders. Choose the option that matches where the file lives.
- Give files clear names before you start. On a small screen, names like IMG_4471 are hard to tell apart.

## Step two: choose files and use the picker well

Tap the choose-files button on the tool page. Your phone opens its file picker. Some tips make it smoother.

- For tools that accept several files, such as [merge PDF](/tools/merge-pdf) and [JPG to PDF](/tools/jpg-to-pdf), you can often select several files at once in the picker. If your picker allows only one at a time, add files in several rounds.
- If you add the wrong file, remove it from the tool's list rather than starting over.
- Check the file names shown in the list before continuing.

## Step three: ordering pages and files with touch

Dragging on a touchscreen can be imprecise, especially with a big list or a small screen. Where a tool offers arrow buttons, use them. The [merge PDF](/tools/merge-pdf), [JPG to PDF](/tools/jpg-to-pdf), and [rearrange PDF](/tools/rearrange-pdf) tools let you move items with arrows as well as by dragging.

- Drag to move an item a long way, then fine-tune with arrows.
- Use your phone in landscape orientation if you need more room for thumbnails.
- Zoom out on the page if the layout feels cramped.
- Scroll through the preview before you commit, because it is easy to drop a page one place off.

## Step four: common jobs, mobile edition

### Combine several files into one

Add the PDFs to the merge tool, arrange them, and merge. Name your files with a number at the front, such as 01-form and 02-id, so the order is easy to see on a small screen. Our guide to [merging PDFs in order on a phone](/blog/merge-pdf-files-in-order-on-phone) covers this in more detail.

### Turn photos into a PDF

Take clear photos, add them to the [JPG to PDF tool](/tools/jpg-to-pdf), choose A4 or US Letter for official documents, and convert. Read our guide on [phone scanning workflow](/blog/phone-scan-to-pdf-workflow) for taking better photos.

### Fix a sideways page

Use the [rotate PDF tool](/tools/rotate-pdf), select the page, choose a direction, and download.

### Remove or keep certain pages

Use the [delete PDF pages tool](/tools/delete-pdf-pages) to remove pages, or the [extract PDF pages tool](/tools/extract-pdf-pages) to keep only some. Tap page numbers to choose. If numbers look small, zoom in or use landscape orientation.

### Make a file smaller

Use the [compress PDF tool](/tools/compress-pdf). Choose an automatic level or a target size, then check readability afterwards by zooming into small text.

### Convert a page to an image

Use the [PDF to JPG tool](/tools/pdf-to-jpg), or the [PDF to PNG tool](/tools/pdf-to-png) if you need PNG, choose your pages, and download.

{{IMG:2}}

## Step five: finding your downloaded file

After processing, the browser downloads the result. On a phone, this is where many people get lost.

- Look at the browser's download notification or downloads list right after the download finishes.
- Note the file name before you leave the page.
- Most phones store downloads in a downloads folder that you can browse from your file manager app.
- If you cannot find the file, check the browser's own downloads screen, which lists recent files.
- Once found, you can share the file directly from there through email or messaging.

Rename downloads promptly. A file called document (3).pdf is hard to trust when you have five similar ones.

:::highlight blue
Tip: after every download, open the file once. It confirms that the download completed and lets you check pages and orientation before you send anything.
:::

## Keeping files small on mobile

Phone photos are large, and PDFs made from them grow quickly. Mobile data limits and email attachment caps make size matter more.

- Delete unneeded pages before compressing.
- Compress at the end, not the beginning.
- Aim a little under any limit.
- Avoid enormous photo resolutions unless you need them.
- Check the result at a comfortable zoom level.

Our article on [PDF file size limits](/blog/pdf-file-size-limits-and-how-to-meet-them) explains how to approach tight limits.

## Handling large jobs on a phone

Phones have less memory than computers. If a tool is slow or a page freezes on a very large file, try these fixes.

- Close other apps and browser tabs.
- Restart the browser and try again.
- Process smaller pieces, for example by extracting the pages you need first.
- Move the job to a computer if the file is very large.

If your file is truly huge, a laptop is simply the better tool. There is no shame in switching devices.

## Privacy on a phone

:::highlight blue
Related guide: [What "processed in your browser" really means](/blog/what-processed-in-your-browser-really-means).
:::

Phones carry a lot of personal documents, and they are shared more often than computers: with family, at work, in cafes. A few habits help.

- Because these tools process files in your browser, your documents are handled on your own device instead of being uploaded to a server first. Read [are online PDF tools safe](/blog/are-online-pdf-tools-safe) to learn how to check that.
- Use a private or personal device rather than a borrowed one.
- Avoid open public Wi-Fi when handling identity or financial documents.
- Delete finished files you no longer need from your downloads folder, especially sensitive ones.
- Keep your phone and browser updated.
- Use a screen lock, so a lost phone does not expose your documents.

## Mobile mistakes to avoid

- Not checking the result. Small screens hide problems, so zoom in and scroll through.
- Sending a file before confirming the download finished.
- Losing track of which file is which. Use clear names.
- Trusting drag and drop on a tiny screen without checking the order.
- Compressing too early, or too much, and then being unable to read the text.
- Leaving sensitive documents in a downloads folder.

## When to switch to a computer

A phone is fine for most jobs, but a computer is better when the file is very large, when you are assembling a long document with many pieces, or when you need to check fine details carefully. A good approach is to do quick fixes on the phone and save big assembly jobs for when you have a full keyboard and screen.

## A quick mobile checklist

- Files saved to the device and clearly named.
- The right tool chosen for the job. See our [problem-to-solution cheat sheet](/blog/which-pdf-tool-do-i-need-cheat-sheet).
- Items ordered using arrows where available.
- Result downloaded and opened.
- Pages checked for order, orientation, and readability.
- Size checked against any limit.
- Sensitive leftovers deleted.

## Frequently asked questions

### Do I need to install an app?

No. The tools run in your phone's browser.

### Are the tools slower on a phone?

They can be, especially with large files, because phones have less processing power and memory than computers.

### Where does my file go when I download it?

To your phone's downloads location, which you can open from the browser's downloads list or your file manager app.

### Can I merge more than two files on a phone?

Yes. Add as many as you need, and order them with the arrows or by dragging.

### Is my document uploaded anywhere?

The tools process files in your browser, so the documents are handled on your own device. Read the privacy policy for full details.

Using PDF tools on a phone is entirely practical once you handle the small friction points: file access, touch ordering, finding downloads, and checking results on a small screen. Follow the steps above, and your phone becomes a perfectly capable document workstation for the moments when you cannot reach a laptop.`,
    images: [
      { marker: 1, query: "smartphone showing document on screen" },
      { marker: 2, query: "using phone while travelling documents" },
    ],
  },
];
