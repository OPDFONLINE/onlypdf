import type { Batch1Article } from "@/lib/blog/batch1-articles";

// Batch 7: twelve articles for the newest tools (Insert PDF Pages, PNG to PDF,
// PDF to PNG) plus watermark-rights and privacy topics. {{IMG:n}} placeholders
// are resolved by /api/admin/blog/illustrate?slug=... and saved as drafts.
export type Batch7Article = Batch1Article;

export const batch7Articles: Batch7Article[] = [
  {
    slug: "insert-pages-into-pdf-complete-guide",
    title: "How to Insert Pages Into a PDF: The Complete Guide",
    excerpt: "Add pages from another PDF, images, or blank pages after any page of your document, right in your browser. No software, no upload.",
    seo_title: "How to Insert Pages Into a PDF (Free, No Software)",
    seo_description: "Insert pages from another PDF, images, or blank pages after any page number of your PDF, free in your browser. No upload, no account.",
    category: "Organize PDF",
    topic_cluster: "insert-pages",
    author: "OnlyPDF Team",
    related_slugs: ["add-blank-page-to-pdf", "insert-pages-from-another-pdf-at-specific-position", "insert-vs-merge-pdf-which-tool", "replace-a-page-in-a-pdf"],
    featuredImageQuery: "adding a page into a stack of documents",
    content: `# How to Insert Pages Into a PDF: The Complete Guide

You have a 30-page PDF and need one more page in the middle of it: a signed page, a cover sheet, an updated chart, or a blank divider. Joining two whole files end to end will not do that, because a normal merge puts everything in a row. What you need is a way to place new pages exactly where they belong.

This guide covers the whole job with the [Insert PDF Pages tool](/tools/insert-pdf-pages): what you can insert, how to choose the position, how to avoid page-number surprises, and when a different tool is the better choice.

## What inserting pages means

Inserting means adding new pages after a page you choose. Everything that comes after that page moves down to make room. If you insert two pages after page 7, the old page 8 becomes page 10. Nothing is overwritten, and no existing page is removed.

That is different from merging, which joins complete files, and different from rearranging, which only moves pages that are already in the document. If you are unsure which one you need, read [insert vs merge: which PDF tool to use](/blog/insert-vs-merge-pdf-which-tool).

## What you can insert

The tool accepts three kinds of new content:

- **Pages from another PDF.** Add the whole file, or tick only the pages you want.
- **Images.** JPG or PNG files, where each image becomes one page.
- **Blank pages.** Choose how many, and match the size of the neighbouring page, A4, or US Letter.

{{IMG:1}}

## Step by step

- Upload the PDF you want to add pages to.
- Choose where the new pages go. Use Insert after on a page, or pick a position from the menu, including before page 1 and at the end.
- Choose what to insert: pages from another PDF, one or more images, or blank pages.
- Check the result summary, select Insert pages, and download the new PDF.

The summary is worth reading before you download. It tells you what will be added and where, which catches a wrong position before it costs you a second run.

{{IMG:2}}

## Choosing the position

The position menu offers three kinds of spots: before the first page, after any page, and at the very end. A few examples show how page numbers change.

- Insert one page after page 7 of a 30-page file. The result has 31 pages, the new page is page 8, and the old page 8 is now page 9.
- Insert before page 1. Use this for a cover page or a title sheet.
- Insert at the end. Use this for appendices, signature pages, or a scanned receipt that belongs at the back.

:::highlight blue
Your original file is never changed. The tool builds a new PDF in your browser, so you can always go back to the original if the position was wrong.
:::

## Common situations

**Adding a signed page.** Photograph or scan the signed page, then insert the image after the page it belongs behind. Our guide to [turning a phone photo into a PDF](/blog/phone-scan-to-pdf-workflow) helps you get a clean image first.

**Adding a cover page.** Create the cover as its own PDF, then insert it before page 1.

**Separating sections.** Insert a blank page between chapters. The dedicated guide to [adding a blank page to a PDF](/blog/add-blank-page-to-pdf) covers sizes and common mistakes.

**Replacing a page.** Insert the new version after the old page, then delete the old one. The steps are in [how to replace a page in a PDF](/blog/replace-a-page-in-a-pdf).

**Adding pages from a second document.** Pick the pages you need instead of the whole file. The guide on [inserting pages from another PDF at a specific position](/blog/insert-pages-from-another-pdf-at-specific-position) walks through it.

## Real-world examples

**A rental application.** The landlord's PDF has 12 pages, and the signed income letter arrived later as a photo. Insert the photo as an image after page 9, where the supporting documents begin. The application stays one file, and the numbering of the pages before it does not change.

**A school report.** A 20-page report needs a cover page and an updated chart. Insert the cover before page 1, then insert the chart page after the page it belongs to. Two quick runs, and the original file is never touched.

**A contract with an annex.** The base agreement is 14 pages and the annex is a separate three-page PDF. Insert all three annex pages after page 14, or after the last clause page if the signature page should stay at the very end.

## Inserting in more than one place

The tool handles one position per run. If you need to add pages in two or three places, download the result and run the tool again with the new file.

A simple trick keeps page numbers easy to track: work from the back of the document to the front. If you need to add pages after page 20 and after page 7, do page 20 first. The insertion at page 20 does not shift page 7, so the numbers you planned with are still correct for the second run.

## Check the result

Open the finished file and scroll through the area around each new page. Check that the order is right, that nothing is sideways, and that an inserted image is readable. If a page is sideways, the [rotate PDF tool](/tools/rotate-pdf) fixes it permanently. If something is out of order, the [rearrange PDF tool](/tools/rearrange-pdf) lets you drag it into place.

## What the tool does not do

It does not edit the content of a page, it does not read text from images, and it does not open password-protected files. If a file is protected, remove the password in the program that created it first. It also handles one insertion position at a time, so plan multi-spot jobs as separate runs.

## Insert, merge, or extract?

- To add pages in the middle, use Insert PDF Pages.
- To join whole files end to end, use the [merge PDF tool](/tools/merge-pdf).
- To pull a few pages out of a longer file before inserting them somewhere else, use the [extract PDF pages tool](/tools/extract-pdf-pages). The [complete guide to extracting pages](/blog/extract-pages-from-pdf-complete-guide) explains how.

## Privacy

Everything runs in your browser, so the document and the pages you add stay on your own device. For how to check that for yourself, read [are online PDF tools safe](/blog/are-online-pdf-tools-safe).

## Frequently asked questions

### Can I add a page after a specific page number?

Yes. In a 30-page PDF you can insert after page 7, after page 9, at the very beginning, or at the very end.

### Can I insert images instead of PDF pages?

Yes. JPG and PNG images are accepted, and each image becomes one page.

### Can I insert in several places at once?

Not in one run. Run the tool again with the new file for each additional position, and start from the back of the document to keep page numbers stable.

### Does it change my original file?

No. A new PDF is created in your browser, and your original stays as it was.

### Does it work with password-protected PDFs?

No. Remove the password in the original program first, then upload the file here.

Pick the position, choose what goes in, check the summary, and the new pages land exactly where you wanted them.`,
    images: [
      { marker: 1, query: "documents with a new page being added" },
      { marker: 2, query: "person organizing pages in a binder" },
    ],
  },
  {
    slug: "add-blank-page-to-pdf",
    title: "How to Add a Blank Page to a PDF (Anywhere You Need One)",
    excerpt: "Add one or many blank pages before, after, or between pages of a PDF, matched to the page size you already have.",
    seo_title: "How to Add a Blank Page to a PDF for Free",
    seo_description: "Add blank pages anywhere in a PDF, matched to the neighbouring page size, A4, or US Letter. Free, in your browser, with no upload.",
    category: "Organize PDF",
    topic_cluster: "insert-pages",
    author: "OnlyPDF Team",
    related_slugs: ["insert-pages-into-pdf-complete-guide", "how-to-merge-reorder-organize-pdf-files", "check-pdf-before-sending-final-checklist"],
    featuredImageQuery: "blank white paper page",
    content: `# How to Add a Blank Page to a PDF (Anywhere You Need One)

A blank page sounds trivial until you need one. Maybe a printed booklet needs an empty back for the cover, a chapter should start on a right-hand page, or you want a space to write notes after a diagram. Most PDF viewers cannot add pages at all, so people end up exporting from a word processor just to get an empty sheet.

The [Insert PDF Pages tool](/tools/insert-pdf-pages) adds blank pages directly, in the place you choose. This guide shows how, and how to avoid the mistakes that make a blank page look wrong.

## The steps

- Upload your PDF to the [Insert PDF Pages tool](/tools/insert-pdf-pages).
- Choose the position: before page 1, after a particular page, or at the end.
- Choose blank pages as the thing to insert.
- Set how many pages you want, and pick a size.
- Check the summary, select Insert pages, and download the new PDF.

The tool can add many blank pages in one go, up to 200, so a long run of notes pages is a single job.

{{IMG:1}}

## Choosing the page size

You have three choices for the size of the new page:

- **Match the neighbouring page.** The blank page copies the size of the page next to it. This is usually the right choice, because the document stays uniform when you scroll or print.
- **A4.** Use this when the document is meant for A4 paper, or when the neighbouring page is unusual and you want a standard sheet.
- **US Letter.** Use this for documents that will be printed in the United States or Canada.

If the PDF mixes sizes, matching the neighbour keeps each blank page in proportion with the page next to it, which is usually what you want.

## Common reasons to add a blank page

- **Notes pages.** Insert a few blank pages after a diagram or a form so people have room to write.
- **Section dividers.** A blank sheet between chapters makes a printed document easier to flip through.
- **Duplex printing.** When a section should start on a right-hand page, a blank page before it pushes the section onto the correct side. Check the page count afterwards, because an odd number of pages in front shifts everything.
- **Space for a stamp or signature.** An empty page at the end gives a reviewer somewhere to sign without covering your content.

:::highlight green
Adding a blank page does not change any existing page. Everything after the position simply moves down one page number for each blank page you insert.
:::

## Mistakes to avoid

- **Counting the wrong page.** Page numbers in a viewer can differ from numbers printed on the page. Use the position shown in the tool, which counts physical pages from the start of the file.
- **Forgetting that later pages shift.** If you add a blank page after page 3, the old page 4 is now page 5. Plan any second insertion with that in mind, or work from the back of the file first.
- **Using a blank page where a page break was meant.** If a document is still editable in Word, a page break there is cleaner than a blank PDF page.
- **Leaving unintended blank pages in a final file.** An accidental empty page looks careless. If you later need to take one out, the [delete PDF pages tool](/tools/delete-pdf-pages) removes it, and our guide to [removing blank pages from a scanned PDF](/blog/remove-blank-pages-from-scanned-pdf) covers the cleanup in depth.

## Adding blank pages and other content together

One run handles one kind of new content at one position. If you want a blank divider and also a new cover page, run the tool twice. The [complete guide to inserting pages](/blog/insert-pages-into-pdf-complete-guide) explains how to plan multi-step jobs so page numbers stay predictable.

## Check before you send

Open the finished PDF and scroll through the new pages. Confirm that the size looks right next to its neighbours and that the page count is what you expected. Our [final checklist](/blog/check-pdf-before-sending-final-checklist) takes two minutes and catches the small things.

## Privacy

The new PDF is built in your browser. Your document is not uploaded to a server, and your original file is not changed.

## Frequently asked questions

### How many blank pages can I add at once?

You can add up to 200 blank pages in a single run.

### Can the blank page match my document's size?

Yes. Choose the option that matches the neighbouring page, or pick A4 or US Letter.

### Can I add a blank page at the very beginning or end?

Yes. The position menu includes before page 1 and at the end.

### Will it change my original PDF?

No. A new file is created, and your original stays untouched.

A blank page is a small thing, but putting it in the right spot, at the right size, makes a document feel finished.`,
    images: [
      { marker: 1, query: "stack of blank paper on desk" },
    ],
  },
  {
    slug: "insert-pages-from-another-pdf-at-specific-position",
    title: "How to Insert Pages From One PDF Into Another at a Specific Position",
    excerpt: "Take pages from a second PDF and drop them into the middle of your main document, after exactly the page you choose.",
    seo_title: "Insert Pages From One PDF Into Another (Exact Position)",
    seo_description: "Add all or selected pages from a second PDF into your main PDF after any page number. Free, in your browser, with no upload.",
    category: "Organize PDF",
    topic_cluster: "insert-pages",
    author: "OnlyPDF Team",
    related_slugs: ["insert-pages-into-pdf-complete-guide", "extract-pages-from-pdf-complete-guide", "merge-two-pdf-files-free", "insert-vs-merge-pdf-which-tool"],
    featuredImageQuery: "two documents being combined at a desk",
    content: `# How to Insert Pages From One PDF Into Another at a Specific Position

Imagine a 40-page report and a separate three-page appendix. The appendix belongs after page 38, before the final references. A normal merge cannot do that, because it would put the whole appendix at the very end. You need to insert the appendix at a chosen spot.

The [Insert PDF Pages tool](/tools/insert-pdf-pages) does exactly this. You upload your main file, choose a position, and add pages from a second PDF, all of them or only the ones you tick.

## The steps

- Upload your main PDF, the one that will receive the new pages.
- Choose the position, such as after page 38.
- Choose pages from another PDF as the source, and select the second file.
- Tick the pages you want, or keep them all.
- Check the summary, select Insert pages, and download the new file.

{{IMG:1}}

## All pages or only some?

If you add the second PDF whole, every page goes in, in its original order. If you only need part of it, tick just those pages. This saves you from creating a trimmed copy first.

For heavier trimming, such as keeping a scattered handful of pages from a very long document, you can also use the [extract PDF pages tool](/tools/extract-pdf-pages) first and then insert the smaller file. The [complete guide to extracting pages](/blog/extract-pages-from-pdf-complete-guide) explains the options.

## Page order inside the inserted block

The inserted pages keep the order they have in the second PDF. If they need a different order, use the [rearrange PDF tool](/tools/rearrange-pdf) on the second file before inserting, or on the finished file afterwards. Fixing the source first is usually quicker, because the finished file has more pages to scroll through.

## Example: contract with a schedule

A 12-page contract needs a four-page pricing schedule after page 9.

- Upload the contract.
- Set the position to after page 9.
- Choose the schedule PDF and keep all four pages.
- Insert and download.

The result has 16 pages. Pages 1 to 9 are the original, pages 10 to 13 are the schedule, and the old pages 10 to 12 are now pages 14 to 16. Check the page numbers on the signature page afterwards, because its position has changed.

:::highlight purple
Printed page numbers inside the documents do not change. If your contract says "Page 10 of 12" on its signature page, it will still say that, even though the page is now number 14 in the combined file.
:::

## Page sizes

Inserted pages keep their own size. If the second PDF uses a different paper size from the first, the combined document will have mixed sizes. That is fine on screen, but it can look uneven when printed. If this matters, check the finished file before you send it.

## Inserting from more than one source

One run handles one source and one position. To bring pages in from two different PDFs, or to place pages in two spots, run the tool twice. Work from the back of the document first so that the page numbers you planned with stay valid.

## When a merge is enough

If the extra pages simply belong at the end, the [merge two PDF files tool](/blog/merge-two-pdf-files-free) is quicker, because there is no position to choose. Our comparison of [insert vs merge](/blog/insert-vs-merge-pdf-which-tool) helps you decide in seconds.

## Privacy

Both PDFs are processed in your browser, so neither file is uploaded. Close the tab and nothing remains.

## Frequently asked questions

### Can I insert only some pages from the second PDF?

Yes. Tick just the pages you want, or insert them all.

### Does the order of the inserted pages stay the same?

Yes. They keep the order they have in the second PDF.

### Will my main PDF be changed?

No. A new PDF is created and your original stays untouched.

### What if the second PDF is password-protected?

Remove the password in the program that created it first, then use the file here.

Choose the spot, pick the pages, and your document keeps its structure while gaining exactly the content you need.`,
    images: [
      { marker: 1, query: "combining two printed reports" },
    ],
  },
  {
    slug: "insert-vs-merge-pdf-which-tool",
    title: "Insert vs Merge PDF: Which Tool Should You Use?",
    excerpt: "Merge joins whole files end to end. Insert places pages exactly where you want them. Here is how to pick in ten seconds.",
    seo_title: "Insert vs Merge PDF: Which Tool Do You Need?",
    seo_description: "Merge joins files end to end, while Insert adds pages after a chosen page. Learn which PDF tool fits your job, with clear examples.",
    category: "Organize PDF",
    topic_cluster: "insert-pages",
    author: "OnlyPDF Team",
    related_slugs: ["insert-pages-into-pdf-complete-guide", "merge-two-pdf-files-free", "which-pdf-tool-do-i-need-cheat-sheet"],
    featuredImageQuery: "two paths diverging choice",
    content: `# Insert vs Merge PDF: Which Tool Should You Use?

Both tools put more pages into a PDF, so it is easy to grab the wrong one. The difference is small but it decides how much cleanup you do afterwards. Merge joins complete files in a row. Insert places pages at a position you choose inside one document.

## The short answer

- Use the [merge PDF tool](/tools/merge-pdf) when the extra content belongs at the end, or when you are joining several whole files into one.
- Use the [Insert PDF Pages tool](/tools/insert-pdf-pages) when the extra content belongs in the middle, at the very start, or as blank pages.

{{IMG:1}}

## How they differ

| Question | Merge | Insert |
| --- | --- | --- |
| What does it join? | Whole files | Pages from one source |
| Where do new pages go? | In the order you arrange the files | After the page you choose |
| How many files at once? | Two or more | One main file plus one source |
| Can it add blank pages? | No | Yes, up to 200 |
| Can it add images directly? | No, convert them to PDF first | Yes, JPG or PNG |

## When to choose merge

Merge is the right tool when order is the only question. Typical cases:

- Joining a cover letter and a resume. See [how to merge two PDF files](/blog/merge-two-pdf-files-free).
- Combining ten scanned receipts into one document.
- Building an application bundle from several separate PDFs.

You drag the files into the sequence you want and download one combined PDF. The [complete guide to merging, reordering, and organizing](/blog/how-to-merge-reorder-organize-pdf-files) covers the workflow.

## When to choose insert

Insert is the right tool when position matters:

- An appendix that belongs after page 38 of a 40-page report.
- A new cover page that must come before page 1.
- A signed page that replaces a placeholder in the middle of a contract.
- A blank divider between two sections.

You choose the position and what goes in. The [complete guide to inserting pages](/blog/insert-pages-into-pdf-complete-guide) explains each step.

## Can merge do an insert?

Technically yes, but it takes more work. You would have to split the main file at the right point, merge three pieces in order, and keep track of which piece is which. Insert does the same job in one run, with no intermediate files to name and manage.

## Can insert do a merge?

Only in a limited way. Inserting at the end behaves like adding one more file, but Insert handles one source per run. To join five files, merge is far quicker.

:::highlight blue
A simple test: if you can describe the job as "put this file after that file", use merge. If you describe it as "put these pages after page 7", use insert.
:::

## What about moving pages that are already there?

If every page is already in the document and only the order is wrong, neither tool is right. The [rearrange PDF tool](/tools/rearrange-pdf) is built for that.

## What if I only need a few pages of the second file?

Both routes work. Insert lets you tick the pages you want from the source file. With merge, extract those pages first with the [extract PDF pages tool](/tools/extract-pdf-pages), then merge the smaller file.

## A combined example

A job application needs a resume, a cover letter, and a certificate that must sit between them.

- Merge the cover letter and resume into one file.
- Insert the certificate after the cover letter, which is page 1 or 2 of the combined file.

Or, if the certificate simply goes last, one merge covers the whole thing. The best tool depends on where the pages land, not on how many files you have.

## Privacy

Both tools work in your browser, so your files are processed on your own device. For a broader overview of the tools and what each one does, see [which PDF tool do I need](/blog/which-pdf-tool-do-i-need-cheat-sheet).

## Frequently asked questions

### Is insert slower than merge?

No. Both run in seconds on ordinary documents. Insert has one extra choice, the position.

### Can I add an image with merge?

Not directly. Convert the image to a PDF first with [JPG to PDF](/tools/jpg-to-pdf) or [PNG to PDF](/tools/png-to-pdf), then merge. Insert accepts JPG and PNG images directly.

### Do either of them change my original files?

No. Both create a new PDF and leave your originals as they were.

Match the tool to the shape of the job, and you will rarely have to redo it.`,
    images: [
      { marker: 1, query: "choosing between two options laptop" },
    ],
  },
  {
    slug: "replace-a-page-in-a-pdf",
    title: "How to Replace a Page in a PDF (Without Editing Software)",
    excerpt: "Swap an outdated page for a new one by inserting the replacement and deleting the old page. Two tools, five minutes, nothing to install.",
    seo_title: "How to Replace a Page in a PDF for Free",
    seo_description: "Replace one page of a PDF with a new page or image: insert the new page, then delete the old one. Free, in your browser, no upload.",
    category: "Organize PDF",
    topic_cluster: "insert-pages",
    author: "OnlyPDF Team",
    related_slugs: ["insert-pages-into-pdf-complete-guide", "delete-pages-from-pdf-free", "check-pdf-before-sending-final-checklist"],
    featuredImageQuery: "swapping a sheet of paper in a binder",
    content: `# How to Replace a Page in a PDF (Without Editing Software)

A figure changed, a price was wrong, or a signed page arrived after the document was assembled. Rebuilding a whole PDF to fix one page is wasteful, and most free viewers cannot swap pages at all.

There is a reliable two-step method: insert the new page right after the old one, then delete the old one. It uses the [Insert PDF Pages tool](/tools/insert-pdf-pages) and the [delete PDF pages tool](/tools/delete-pdf-pages), and everything runs in your browser.

## The method at a glance

- Insert the replacement after the page you want to replace.
- Download the new file and note the page numbers.
- Delete the old page.
- Check the result.

{{IMG:1}}

## Step 1: Insert the new page

Upload the PDF to the [Insert PDF Pages tool](/tools/insert-pdf-pages). Choose the position after the page you want to replace. For page 12, that means after page 12.

Then choose your replacement: a page from another PDF, or an image of the new page (JPG or PNG). Insert and download the result.

## Step 2: Find the old page

After inserting, the old page keeps its number and the new page sits directly behind it. If you replaced page 12 in a 30-page file, the result has 31 pages. Page 12 is still the old version, and page 13 is the new one.

## Step 3: Delete the old page

Open the new file in the [delete PDF pages tool](/tools/delete-pdf-pages) and select page 12. Download the result. It now has 30 pages again, and the new page is in position 12. Our guide to [deleting pages from a PDF](/blog/delete-pages-from-pdf-free) covers the tool in more detail.

:::highlight green
Delete the old page last, not first. If something goes wrong with the new page, you still have the old one to fall back on.
:::

## Replacing several pages

For more than one page, repeat the process, and work from the back of the document to the front. If you replace page 20 before page 7, the numbers for page 7 are not disturbed by the first change. Each pass is two quick runs, so three pages is six runs in total.

If the replacements are consecutive, such as pages 5 to 8, you can insert the whole block after page 8 and then delete pages 5 to 8 in one go.

## Make the new page fit

- **Size.** If the replacement comes from a PDF with a different page size, the new page will look different from its neighbours. Check it before you send.
- **Orientation.** A sideways page can be fixed with the [rotate PDF tool](/tools/rotate-pdf).
- **Images.** An image you insert becomes a page, so check that it is readable at full size and cropped sensibly.
- **Page numbers.** Numbers printed inside the pages do not change, so confirm that the sequence still reads correctly.

## When replacing is the wrong approach

If a document needs many changes, edit the source file and export a fresh PDF. Replacing pages is best for a small number of late fixes. If the content of the page itself needs editing and you only have the PDF, the [PDF to Word tool](/tools/pdf-to-word) can sometimes give you an editable copy, though complex layouts may need cleanup.

## Check the final file

Scroll through the area around the replaced page and confirm that the old content is gone. Then run through our [final checklist](/blog/check-pdf-before-sending-final-checklist), which takes about two minutes.

## Privacy

Both steps run in your browser. Your document is not uploaded, and your original file stays untouched, so you can always start again.

## Frequently asked questions

### Can I replace a page with an image?

Yes. Insert the image, which becomes a page, and then delete the old page.

### Why not delete first and insert afterwards?

You can, but then the numbering shifts and a mistake is harder to undo. Inserting first keeps the old page available until you are sure.

### Will the order of other pages change?

No. Only the page you delete is removed. Every other page keeps its relative position.

Insert, check, delete, and one page changes while the rest of the document stays exactly as it was.`,
    images: [
      { marker: 1, query: "replacing a page in a document folder" },
    ],
  },
  {
    slug: "convert-screenshots-png-to-pdf",
    title: "How to Convert Screenshots and PNG Images to PDF",
    excerpt: "Turn screenshots, scans, and other PNG images into one tidy PDF, in the order you want and at the page size you choose.",
    seo_title: "How to Convert Screenshots and PNG Images to PDF",
    seo_description: "Combine screenshots and PNG images into one PDF with the page size and order you choose. Free, in your browser, with no upload.",
    category: "Convert to PDF",
    topic_cluster: "convert-to-pdf",
    author: "OnlyPDF Team",
    related_slugs: ["png-vs-jpg-to-pdf-which-to-use", "jpg-to-pdf-complete-guide", "convert-multiple-jpg-to-one-pdf"],
    featuredImageQuery: "screenshots on a phone screen",
    content: `# How to Convert Screenshots and PNG Images to PDF

Screenshots pile up fast: a chat as evidence, a confirmation page, an error message, a set of settings for a support ticket. Phones and computers save most of them as PNG files. Sending ten loose images is awkward, easy to put in the wrong order, and rejected by many forms that only accept PDF.

The [PNG to PDF tool](/tools/png-to-pdf) puts them into one document, one image per page, right in your browser.

## The steps

- Add the PNG images you want to convert.
- Drag them into the order you want, or use the arrow buttons.
- Choose a page size: fit to each image, A4, or US Letter.
- Select Convert to PDF and download the file.

{{IMG:1}}

## Choosing the page size

The page size changes how the finished document looks and prints.

- **Fit to image.** Each page matches its picture exactly, with no margin. This keeps screenshots at their native proportions. A phone screenshot becomes a tall, narrow page, which is perfect for reading on a screen and awkward to print.
- **A4 or US Letter.** The image is centred on a standard sheet with a margin, and scaled down if it is too large to fit. Small images are not stretched. Choose this for anything that will be printed, uploaded to an official portal, or reviewed by a person who expects ordinary pages.

If a form asks for A4 and you send a tall phone page, the reviewer may complain. When in doubt, choose A4 or US Letter.

## Getting the order right

The PDF follows the order of the list exactly. Sort screenshots by time before you convert, because a conversation read out of order is confusing. Name the files with numbers in advance if you can, or arrange them in the tool and check the thumbnails.

:::highlight blue
Quick check: scan the thumbnails from top to bottom before converting. It takes ten seconds and saves a second run.
:::

## Transparent PNG images

Some PNG files, such as logos or cut-out graphics, have transparent areas. In the PDF those areas stay transparent, so they show the page colour, which is normally white in most viewers. If you need a specific background, add it in an image editor before converting.

## Mixing PNG and JPG

The PNG tool takes PNG files only. If your batch includes JPG or JPEG photos, make one PDF from each group, then join the two with the [merge PDF tool](/tools/merge-pdf). Alternatively, the [Insert PDF Pages tool](/tools/insert-pdf-pages) accepts both image types, so you can place a photo exactly where it belongs inside an existing PDF. The [JPG to PDF guide](/blog/jpg-to-pdf-complete-guide) covers the other half of the job.

## Making the PDF a sensible size

Screenshots from high-resolution screens are large. If the finished PDF is too big to email or upload, compress it afterwards with the [compress PDF tool](/tools/compress-pdf). Try removing unnecessary screenshots first, because fewer pages is the biggest saving of all.

## Readability

Text in a screenshot becomes part of the picture, so it cannot be selected or searched in the PDF. For anything that must be read closely, check that the text is sharp at normal zoom. Retake a blurry screenshot rather than hoping the PDF improves it.

## Sensitive information

Screenshots often capture more than you intend: notifications, names, account numbers, email addresses. Look at every image before you convert. Crop or retake any that show private information. Remember that covering text with a coloured box in a viewer does not always remove what is underneath, which is explained in [cover vs redact](/blog/cover-vs-redact-pdf-hide-sensitive-information).

## Privacy

The conversion runs in your browser, so your images stay on your own device and are not uploaded to a server.

## Frequently asked questions

### How many screenshots can I put in one PDF?

As many as you like. The practical limit is your device's memory for very large batches.

### Will the image quality drop?

No new quality is lost by the conversion itself. The PDF contains your PNG image, so the result is as sharp as the original screenshot.

### Can I convert one image only?

Yes. A single image gives a one-page PDF.

### Why does my phone screenshot make a very tall page?

You probably chose fit to image. Choose A4 or US Letter for an ordinary page shape.

Order them, choose a size, and a folder of loose screenshots becomes one clean document.`,
    images: [
      { marker: 1, query: "collection of screenshots on computer screen" },
    ],
  },
  {
    slug: "png-vs-jpg-to-pdf-which-to-use",
    title: "PNG or JPG to PDF: Which Image Type Should You Use?",
    excerpt: "Screenshots and graphics usually suit PNG, photos usually suit JPG. Here is how the choice affects sharpness, file size, and which tool to open.",
    seo_title: "PNG vs JPG to PDF: Which Is Better?",
    seo_description: "Compare PNG and JPG when converting images to PDF: sharpness, file size, transparency, and which tool to use. Pick the right one fast.",
    category: "Convert to PDF",
    topic_cluster: "convert-to-pdf",
    author: "OnlyPDF Team",
    related_slugs: ["convert-screenshots-png-to-pdf", "jpg-to-pdf-complete-guide", "pdf-to-png-or-jpg-which-format"],
    featuredImageQuery: "comparing two image files on screen",
    content: `# PNG or JPG to PDF: Which Image Type Should You Use?

Most of the time you do not choose the image format. A phone camera saves a JPG, a screenshot saves a PNG, and the file you have is the file you convert. But sometimes you do have a choice, such as when you export a graphic, scan a page, or save a chart. In those cases the format affects how sharp the PDF looks and how big it gets.

Because the formats are handled by separate tools, it also tells you where to go: the [JPG to PDF tool](/tools/jpg-to-pdf) for JPG and JPEG files, and the [PNG to PDF tool](/tools/png-to-pdf) for PNG files.

## The short answer

- Choose JPG for photographs and scans of photos, where small files matter.
- Choose PNG for screenshots, charts, diagrams, logos, and pages with fine text.
- If you already have the files, use whichever tool matches their type.

{{IMG:1}}

## How they differ

| Feature | JPG | PNG |
| --- | --- | --- |
| Best for | Photos | Screenshots, text, graphics |
| File size | Smaller | Larger |
| Sharp edges | Can show faint fuzz | Stay crisp |
| Transparency | No | Yes |
| Tool on this site | JPG to PDF | PNG to PDF |

JPG shrinks a picture by discarding detail the eye barely notices. That works beautifully for photos, but it can leave a faint haze around thin lines and small text. PNG keeps every pixel exactly, which is why it suits screenshots, interface captures, and charts, at the cost of a bigger file.

## What happens inside the PDF

The PDF is only a container. A sharp PNG stays sharp in the PDF, and a soft JPG stays soft. Converting does not improve the picture, so start with the best image you can get. The finished file size also follows the image: a PDF made of PNG screenshots is usually larger than one made of JPG photos of the same page count.

## Choosing by situation

**Phone photos of paper documents.** These are almost always JPG. Use JPG to PDF. For better results, read our [phone scan workflow](/blog/phone-scan-to-pdf-workflow).

**Screenshots of chats, settings, or web pages.** These are usually PNG. Use PNG to PDF. The [screenshots guide](/blog/convert-screenshots-png-to-pdf) has the details.

**Charts and diagrams exported from software.** Export as PNG if you can, because thin lines stay clean. Use PNG to PDF.

**Scans from a scanner.** Many scanners offer both. Choose JPG for photos and mixed pages, and PNG for black-and-white text pages if file size is not a concern.

**Logos and graphics with transparent areas.** Only PNG supports transparency. In the PDF those areas show the page colour, which is normally white.

:::highlight green
If file size is your main worry, JPG is usually the safer choice. If sharp text is your main worry, PNG is. When both matter, test one page each way and compare.
:::

## Mixed batches

A single run handles one image type. If you have both JPG and PNG files, there are two good routes:

- Make one PDF from each group and join them with the [merge PDF tool](/tools/merge-pdf), after putting the files in the order you want.
- Use the [Insert PDF Pages tool](/tools/insert-pdf-pages), which accepts both types and lets you place images at a chosen position inside an existing PDF.

## Changing formats

The site does not convert one image format into another. If you have a PNG that is huge and you want a JPG, re-save it in an image editor or your phone's photo app first. If you have a JPG that you want to keep sharp, make sure you keep the original rather than saving it again and again, since each save can lose a little more detail.

## Page size

Both tools offer the same page options: fit to image, A4, or US Letter. Choose A4 or US Letter for anything that will be printed or uploaded to an official portal. Our [complete guide to JPG to PDF](/blog/jpg-to-pdf-complete-guide) explains each option in detail.

## Going the other way

If you later need a page from a PDF as a picture, [PDF to JPG](/tools/pdf-to-jpg) and [PDF to PNG](/tools/pdf-to-png) cover both formats. The comparison in [PDF to PNG or JPG](/blog/pdf-to-png-or-jpg-which-format) applies in the same way.

## Privacy

Both converters run in your browser, so your images stay on your own device.

## Frequently asked questions

### Which gives a smaller PDF?

JPG usually does, especially for photographs.

### Which looks sharper?

PNG for text, screenshots, and line art. For photos the difference is hard to see.

### Can I mix both in one run?

No. Convert each type with its own tool and merge the PDFs, or use Insert PDF Pages, which accepts both.

### Does converting reduce quality?

The conversion itself does not. The PDF contains your image as it is.

Match the format to the content, open the matching tool, and the PDF will look as good as the images you started with.`,
    images: [
      { marker: 1, query: "photo and screenshot side by side" },
    ],
  },
  {
    slug: "pdf-to-png-for-slides-docs-and-sharp-text",
    title: "How to Convert PDF to PNG for Slides, Docs, and Sharp Text",
    excerpt: "Export PDF pages as crisp PNG images for presentations, documents, and support tickets. Choose pages, download one image or a ZIP.",
    seo_title: "How to Convert PDF to PNG for Free",
    seo_description: "Turn PDF pages into sharp PNG images for slides, documents, and chat. Choose the pages, download one image or a ZIP. Free, no upload.",
    category: "Convert from PDF",
    topic_cluster: "convert-from-pdf",
    author: "OnlyPDF Team",
    related_slugs: ["pdf-to-png-or-jpg-which-format", "convert-pdf-to-jpg-pages", "how-to-convert-pdf-to-word-or-images"],
    featuredImageQuery: "presentation slide on a screen",
    content: `# How to Convert PDF to PNG for Slides, Docs, and Sharp Text

A PDF is built for reading and printing, not for dropping into a slide deck or a support ticket. When you need a page as a picture, PNG is the format that keeps small text, thin lines, and flat colours clean. The [PDF to PNG tool](/tools/pdf-to-png) turns any page into a PNG image, right in your browser.

## The steps

- Upload your PDF.
- Choose which pages to convert, or select all of them. Use the plus button on a page to see it larger.
- Select Convert to PNG.
- Download your image, or a ZIP if you chose more than one page.

Every page is selected by default. Tap a thumbnail to leave it out, or use Select all and Clear selection.

{{IMG:1}}

## Why choose PNG

PNG stores every pixel exactly, so there is no compression fuzz around letters. That matters for:

- Pages that are mostly text, such as a letter or a report.
- Charts, tables, and diagrams with thin lines.
- Slides and interface screenshots saved as PDF.
- Anything you plan to zoom into.

The price is file size. PNG pages are larger than JPG pages, so for photo-heavy documents or tight upload limits, [PDF to JPG](/tools/pdf-to-jpg) is the better fit. Our [PNG or JPG comparison](/blog/pdf-to-png-or-jpg-which-format) explains how to decide.

## How big are the images?

Pages are drawn at twice their normal PDF size. A US Letter page comes out at about 1224 by 1584 pixels, and an A4 page at about 1191 by 1684 pixels. That is sharp on screens, in slides, and in documents. It is a good fit for sharing and presenting, but it is not meant for large-format printing.

:::highlight blue
If you need the image for a poster or a big print, start from the original design file instead of a PDF page, because a page image is only as detailed as it was drawn at.
:::

## Transparent backgrounds

PNG supports transparency, and the tool does not add a white background. If a PDF page does not paint a background, those areas stay transparent. Most viewers show them as white, but some, especially in dark mode, can show them as dark or checked. If you need a solid white page, use the [PDF to JPG tool](/tools/pdf-to-jpg), which fills the background with white, or place the PNG on a white layer in your presentation or editor.

## Where PNG pages are useful

- **Presentations.** Drop a page into a slide as a picture without losing sharpness.
- **Documents.** Insert a chart or table from a PDF into a Word file or a report.
- **Support tickets and chats.** Show a screenshot-quality view of a page without attaching a whole PDF.
- **Notes and wikis.** Embed a page where PDFs do not display well.

## Convert only what you need

For a long document, converting every page just to use one is wasteful. Clear the selection, tap the page you need, and convert. You get one image instead of a ZIP full of files you will never open. If you need several pages, the ZIP keeps them together, numbered in page order.

If the pages are in the wrong order for your slides, use the [rearrange PDF tool](/tools/rearrange-pdf) first, because the images follow page order and renaming them afterwards is tedious.

## Limits to know about

- The image is a picture of the page. Text in it can no longer be selected or searched, so keep the original PDF if you might need the text.
- If you need editable text, the [PDF to Word tool](/tools/pdf-to-word) is the right route for PDFs that contain real text. Our guide on [how to tell scanned PDFs from digital ones](/blog/scanned-pdf-vs-digital-pdf-how-to-tell) shows how to check.
- A password-protected PDF has to be unlocked in its original program before you can convert it.

## Going back to a PDF

If you annotate or crop PNG pages and later want a PDF again, the [PNG to PDF tool](/tools/png-to-pdf) combines them into a single document, with one image per page.

## Privacy

The conversion runs in your browser, so your document is processed on your own device and is not uploaded to a server first.

## Frequently asked questions

### Can I convert just some pages?

Yes. Tap thumbnails to include or leave out pages, or use Select all and Clear selection.

### What do I get if I convert several pages?

A single ZIP file with one image per page.

### Is PNG better than JPG for PDFs?

For text, charts, and line art, usually yes. For photos, JPG gives a much smaller file with little visible difference.

### Why do some PNG pages look dark on a dark background?

The PDF page had no painted background, so the PNG is transparent. Use PDF to JPG for a white backdrop, or place the PNG on white.

Choose the pages, convert, and you get sharp images that drop cleanly into slides and documents.`,
    images: [
      { marker: 1, query: "slides and charts on a presentation screen" },
    ],
  },
  {
    slug: "is-it-ok-to-remove-a-pdf-watermark",
    title: "Is It OK to Remove a Watermark From a PDF? Rights, Permission, and Alternatives",
    excerpt: "Removing a watermark is easy to do and easy to get wrong. Learn when it is reasonable, when you need permission, and what to do instead.",
    seo_title: "Is It OK to Remove a PDF Watermark? What to Know",
    seo_description: "When removing a PDF watermark is reasonable, when you need permission, and what to do instead. General guidance, not legal advice.",
    category: "Edit PDF",
    topic_cluster: "watermark-cleanup",
    author: "OnlyPDF Team",
    related_slugs: ["how-to-remove-watermark-from-pdf", "remove-watermark-from-pdf-selected-area", "cover-vs-redact-pdf-hide-sensitive-information"],
    featuredImageQuery: "person reading a document with a stamp",
    content: `# Is It OK to Remove a Watermark From a PDF? Rights, Permission, and Alternatives

A tool can remove a watermark in seconds. Whether you should is a separate question, and the answer depends on whose document it is and why the watermark was added. This article gives a practical way to think about it. It is general information, not legal advice, and rules differ between countries, so check your own situation if the stakes are high.

## Why watermarks exist

A watermark is a message from whoever made or controls the document. Common reasons:

- **Draft marking.** A word like DRAFT tells readers a document is not final.
- **Confidentiality.** Labels such as CONFIDENTIAL warn people to handle a document carefully.
- **Ownership.** A logo or name shows who created or owns the content.
- **Preview or sample.** Stock content and paid material often carry a watermark until it is bought.
- **Trial output.** Some software stamps documents made with an unlicensed or trial version.

The watermark is doing a job, and removing it changes what the document says to the next reader.

{{IMG:1}}

## Usually reasonable

- **Your own documents.** You added a DRAFT stamp and the document is now final.
- **Documents you have permission to edit.** The owner has told you, ideally in writing, that you can clean it up.
- **Internal templates.** Your organisation says it is fine to remove a placeholder mark from its own template.
- **Content with an open licence that permits changes.** Check the licence text rather than assuming.

## Check first

- **Employer or client documents.** Look at their policy, or ask.
- **School and university material.** Lecture notes and exam papers may be marked to stop redistribution.
- **Output from trial software.** A licence usually removes the watermark properly. Removing it yourself may break the terms you agreed to.
- **Documents someone else made for you.** Ask them for a clean copy, which is often a one-line request.

## Do not remove

- Watermarks on paid or preview content that you have not bought.
- Ownership marks on someone else's work that you intend to share or reuse.
- Confidentiality labels in order to circulate a document that is not meant to be shared. Removing the label does not change who is allowed to read it.

:::highlight red
A watermark that is easy to remove is not the same as a watermark you have permission to remove. The tool cannot check your rights. That part is your responsibility.
:::

## Better alternatives

- **Ask for a clean copy.** The owner can usually send one in seconds.
- **Buy or license the content.** A proper licence removes the watermark legitimately.
- **Use the original source file.** If you made the document, re-export it without the mark.
- **Look for an official download.** Some publishers provide a clean version after sign-up or purchase.

## If you do have the right

The [PDF Watermark Remove tool](/tools/watermark-remove) works in two modes. Smart mode finds watermark objects added on top of the page, such as tagged watermarks, semi-transparent text, logos, and stamps, and deletes them. Manual mode covers an area you select with a matching colour. Our guides to [removing a watermark from a PDF](/blog/how-to-remove-watermark-from-pdf) and [removing one by selecting the area](/blog/remove-watermark-from-pdf-selected-area) walk through both.

## What removal does not do

It does not change who owns the content, and it does not make a confidential document public. A Manual cover hides the area but does not erase what is underneath, so it is not a way to remove sensitive information. That distinction is covered in [cover vs redact](/blog/cover-vs-redact-pdf-hide-sensitive-information).

## A simple test

Before you remove a watermark, ask yourself three questions:

- Is the document mine, or do I have clear permission?
- Would the owner be comfortable if they saw the clean version in the hands of the next reader?
- Is there an easier legitimate route, such as asking for a clean copy?

If the answer to the first two is yes, you are almost certainly fine. If you hesitate, the third question usually has a simple answer.

## Privacy

The tool runs in your browser, so the document is processed on your own device and is not uploaded.

## Frequently asked questions

### Is removing a watermark illegal?

It depends on the document, the licence, and where you live. Removing a mark from your own file is usually fine. Removing a mark to avoid paying for, or to redistribute, someone else's work can break copyright or contract terms. This is not legal advice.

### Can I remove a DRAFT stamp I added myself?

Yes, and re-exporting from your source file is usually the cleanest way.

### What if the watermark is part of a scan?

Smart mode will find nothing because there is no separate object to delete. Manual mode can cover it, but only do that on documents you have the right to edit.

### Does removing a watermark hide who owns a document?

No. Ownership is a matter of rights, not marks.

Think about rights first and tools second, and watermark cleanup stays a routine job instead of a problem.`,
    images: [
      { marker: 1, query: "reviewing paper documents with stamps" },
    ],
  },
  {
    slug: "cover-vs-redact-pdf-hide-sensitive-information",
    title: "Cover vs Redact: Why a Black Box on a PDF Does Not Hide Anything",
    excerpt: "Drawing over text in a PDF often leaves the text underneath. Learn how to test for that, and how to remove sensitive information properly.",
    seo_title: "Cover vs Redact a PDF: Hide Information Safely",
    seo_description: "A box drawn over text does not always remove it. Learn how to test a PDF and how to remove sensitive information properly before sharing.",
    category: "Privacy & Security",
    topic_cluster: "privacy",
    author: "OnlyPDF Team",
    related_slugs: ["are-online-pdf-tools-safe", "delete-pages-from-pdf-free", "check-pdf-before-sending-final-checklist", "is-it-ok-to-remove-a-pdf-watermark"],
    featuredImageQuery: "blacked out lines on a printed document",
    content: `# Cover vs Redact: Why a Black Box on a PDF Does Not Hide Anything

People share a PDF after drawing a black rectangle over an account number, an address, or a salary figure. It looks hidden. But in many files the number is still there, underneath the box, and anyone can select it, copy it, or search for it. Several well-known leaks have happened exactly this way.

Covering and redacting sound similar, and they are not. This article explains the difference, shows you how to test your own file, and describes ways to remove information properly using tools you may already have.

## Covering versus redacting

**Covering** puts something visible on top of the content. The text or image underneath is still in the file.

**Redacting** removes the content itself, so there is nothing underneath to recover.

A coloured rectangle drawn in a viewer, a highlight set to black, or a shape added in an editor is usually a cover. The same goes for the Manual mode in a watermark remover, which paints over an area and, as its own help says, hides the content rather than deleting it.

{{IMG:1}}

## A two-minute test

Before you send a file that you have covered, try these checks on the final PDF:

- **Select and copy.** Drag across the covered area in a viewer. If the text highlights, it is still there. Paste it into a note to confirm.
- **Search.** Use the viewer's search for a word you tried to hide. A hit means the text is still in the file.
- **Select all.** Press select all and paste into a plain text editor. Hidden words often appear.

If any check finds the hidden text, treat the file as not safe to share.

:::highlight red
A cover can also be removed. In many viewers a rectangle is an annotation that the next reader can delete, which reveals everything under it.
:::

## Ways to remove information properly

### Remove the whole page

If the sensitive content fills a page, take the page out. The [delete PDF pages tool](/tools/delete-pdf-pages) builds a new PDF without it, and the [extract PDF pages tool](/tools/extract-pdf-pages) keeps only the pages you choose. Both are covered in our guides to [deleting pages](/blog/delete-pages-from-pdf-free) and [extracting pages](/blog/extract-pages-from-pdf-complete-guide).

### Recreate it from the source

If you have the original Word or spreadsheet file, delete the sensitive content there, then export a fresh PDF. Nothing hidden can survive because the content no longer exists.

### Flatten the page into a picture

When only part of a page is sensitive and you do not have the source, you can turn the page into an image, cover the area in an image editor, and rebuild the PDF. Once a page is a flat picture and the covered pixels are overwritten, the text underneath is gone.

- Convert the page with [PDF to PNG](/tools/pdf-to-png) or [PDF to JPG](/tools/pdf-to-jpg).
- Open the image in an editor and fill the sensitive area with a solid colour. Make sure the fill is opaque and the image is saved as a new flat file, with no layers.
- Rebuild a PDF with [PNG to PDF](/tools/png-to-pdf) or [JPG to PDF](/tools/jpg-to-pdf).
- Zoom in on the result and try the select and search tests. Nothing should be selectable, because the pages are now pictures.

The trade-off is that the text in the new PDF can no longer be searched or selected. That is the point here, but keep your original for your own records and do not share it.

## Other places sensitive details hide

- **Other pages.** The same number may appear in a header, a footer, or an attachment.
- **File name.** A name like "passport-john-smith.pdf" gives away more than you intended.
- **Document properties.** Author names and titles can sit in the file details.
- **Comments and annotations.** Notes added by reviewers can contain details you thought were gone.

Go through each one before you send. Our [final checklist](/blog/check-pdf-before-sending-final-checklist) includes a section on content and privacy.

## Keep the original safe

Whatever method you use, the original file still contains everything. Keep it somewhere private and share only the cleaned copy. It is easy to attach the wrong one, so give the safe copy a clear name.

## Privacy

The tools above run in your browser, so the document is processed on your own device and not uploaded. For the bigger picture, read [are online PDF tools safe](/blog/are-online-pdf-tools-safe).

## Frequently asked questions

### Does a black rectangle remove text from a PDF?

Not necessarily. It usually just sits on top. Test the file by selecting, copying, and searching.

### Is deleting the page enough?

Yes, if the sensitive information is only on that page. The new file will not contain the removed page.

### Why does the flatten method work?

Because the page becomes a picture, and covering pixels in a picture replaces them. No text layer remains.

### Can the watermark remover hide private data?

No. Its Manual mode only paints over an area, and the content may still be in the file.

Test before you trust a cover, and remove what must disappear instead of hiding it.`,
    images: [
      { marker: 1, query: "confidential document with black bars" },
    ],
  },
  {
    slug: "what-processed-in-your-browser-really-means",
    title: "What \"Processed in Your Browser\" Really Means for Your PDFs",
    excerpt: "Browser-based PDF tools do the work on your device. Here is what that means in practice, what still touches a server, and how to check the claim.",
    seo_title: "Browser-Based PDF Tools: What \"Processed Locally\" Means",
    seo_description: "How browser-based PDF tools work, what still touches a server, what the limits are, and how to check that your file stays on your device.",
    category: "Privacy & Security",
    topic_cluster: "privacy",
    author: "OnlyPDF Team",
    related_slugs: ["are-online-pdf-tools-safe", "cover-vs-redact-pdf-hide-sensitive-information", "password-protected-pdf-what-to-do-first"],
    featuredImageQuery: "laptop with a lock symbol privacy",
    content: `# What "Processed in Your Browser" Really Means for Your PDFs

Many PDF sites say your files never leave your device. That is a strong claim, and a fair one to question. This article explains in plain terms how browser-based tools work, what still travels over the internet, where the real limits are, and how you can check any tool yourself.

## The short version

When a PDF tool runs in your browser, the page contains the code that does the work. You pick a file, the browser reads it from your device into memory, the code changes it there, and the finished file is saved back to your device as a download. At no point does the document have to be sent anywhere for the job to be done.

{{IMG:1}}

## What happens step by step

- **You choose a file.** The browser gives the page access only to the file you picked, and nothing else on your device.
- **The code reads it.** JavaScript on the page loads the file into memory. Libraries do the PDF work, such as joining pages or drawing a page onto a canvas.
- **A new file is built.** The result is created in memory as a downloadable file.
- **You download it.** The browser saves it to your device. When you close the tab, the memory is released.

That is why a browser-based tool can also work with a slow or unstable connection once the page has loaded. There is no upload or download of your document to wait for.

## What still touches a server

Browser-based does not mean no network at all. Some things normally do load:

- **The page itself and its code.** Your browser has to download the tool before it can run it.
- **Fonts and images used by the site.**
- **Analytics.** A site may count visits and tool use. Our privacy policy says what we record, such as page views and tool starts, and the information does not include the contents of your documents.
- **Advertising.** If a site shows ads, the ad provider's scripts load too.
- **Forms.** If you send a message through a contact form, that message goes to the site.

The key question is not whether any request happens. It is whether any request carries your document.

## Where the limits are

Local processing is a good design, but it is not magic.

- **A dishonest site could still upload.** The code is in your browser, and code can send data. That is why checking matters, and why trust in the site matters.
- **Your device is part of the picture.** Malware, a shared computer, or a risky browser extension can see your files no matter which site you use.
- **Memory limits.** Very large PDFs can be slow or fail on small devices, because everything happens in memory.
- **Downloaded files stay on your device.** Delete sensitive outputs when you are done, especially on a shared computer.

:::highlight blue
Browser-based processing removes the biggest risk, which is a copy of your file sitting on someone else's server. It does not remove the need to choose sites you trust and to look after your own device.
:::

## How to check the claim

Our guide to [whether online PDF tools are safe](/blog/are-online-pdf-tools-safe) walks through the details. In short:

- **Read the privacy policy.** It should say plainly whether files are uploaded. You can read ours on the [privacy page](/privacy).
- **Watch the network tab.** Open your browser's developer tools, switch to the Network tab, and run a tool on a small test file. Look for large requests sent out around the time you press the button.
- **Try the offline test.** Load the tool page, run it once, then disconnect from the internet and run it again. If it still works, the processing is local.

## Good habits

- Use a private window on shared computers, and close it afterwards.
- Avoid public computers for sensitive documents.
- Remove information you do not need to share before processing, using the methods in [cover vs redact](/blog/cover-vs-redact-pdf-hide-sensitive-information).
- Keep the original document somewhere safe and share only the processed copy.
- If a document is password-protected, read [what to do first](/blog/password-protected-pdf-what-to-do-first).

## Tools that might need a server

Some jobs, such as optical character recognition or heavy conversions, may require server-side processing. A trustworthy site tells you clearly before you use such a tool and explains what is stored and for how long. If a tool does not say, ask before you upload anything sensitive.

## Frequently asked questions

### Does browser-based mean offline?

Not exactly. You need a connection to load the page, but the work on your file happens on your device.

### Can the website see my document?

Not if the tool processes it locally, as described in its policy. You can check by watching the Network tab.

### Is a browser-based tool safer than desktop software?

It can be as safe, because both run on your device. The difference is that you trust the website's code each time you load it, instead of installing software once.

### Why does a big PDF slow my browser down?

All the work happens in your device's memory. Very large files need more than a phone or older laptop can easily offer.

Know what stays local, what does not, and how to check, and you can use any PDF tool with clear eyes.`,
    images: [
      { marker: 1, query: "browser window with padlock icon" },
    ],
  },
  {
    slug: "password-protected-pdf-what-to-do-first",
    title: "Password-Protected PDF? What to Do Before You Use Any PDF Tool",
    excerpt: "Most PDF tools cannot open a locked file. Here is how to tell what kind of protection you have and how to proceed when the file is yours.",
    seo_title: "Password-Protected PDF: What to Do First",
    seo_description: "Why PDF tools cannot open a locked file, the two kinds of PDF password, and how to prepare your own file safely. No password cracking.",
    category: "Privacy & Security",
    topic_cluster: "privacy",
    author: "OnlyPDF Team",
    related_slugs: ["are-online-pdf-tools-safe", "what-processed-in-your-browser-really-means", "which-pdf-tool-do-i-need-cheat-sheet"],
    featuredImageQuery: "locked folder on computer desk",
    content: `# Password-Protected PDF? What to Do Before You Use Any PDF Tool

You upload a PDF to a tool and get an error saying the file could not be opened, or that it may be password-protected. It is a common problem, and it has a straightforward explanation. This article describes what a PDF password does, what the tools on this site can and cannot do with a locked file, and what to do when the document is yours.

## Two kinds of PDF protection

A PDF can be protected in two different ways:

- **An open password.** Anyone who wants to read the file has to enter a password first. Without it, the contents are scrambled.
- **A permissions password.** The file opens normally, but the author has restricted actions such as printing, copying, or editing.

You will often see both described simply as "password-protected", but they behave differently. A file with an open password cannot be processed at all until it is opened. A file with restrictions may open in a viewer but still be refused by a tool that needs to change the document.

{{IMG:1}}

## What the tools here can do

Merging, splitting, inserting, rotating, compressing, converting, and the rest need to read the content of the file, and often to build a new one. They do not accept password-protected PDFs, and they do not add or remove passwords. If you see an error that the file cannot be opened or may be protected, this is the likely reason. The same note appears in the help for several tools, for example the [Insert PDF Pages tool](/tools/insert-pdf-pages).

## If the file is yours

If you know the password and are allowed to change the file, the cleanest way forward is to make an unprotected copy in the program you normally use.

- Open the file in the program that created it, or in a PDF viewer, and enter the password.
- Look for an option to save or export a copy, or to print to PDF, and make sure the copy is created without a password.
- Use the unprotected copy in the tool you need.
- When you are finished, delete the unprotected copy if the content is sensitive, and add the password back using your original program if the file needs protection again.

If your file has restrictions on printing or editing and you created it, you can usually change that in the original program's security settings.

:::highlight orange
Treat the unprotected copy as sensitive. It has no lock, so anyone who finds it can read it. Store it carefully and remove it when you are done.
:::

## If the file is someone else's

If a colleague, a bank, or a school sent you a locked PDF, ask the sender for the password or an unprotected copy. They set the protection for a reason, and they are the right person to change it. Only work with files you have permission to use.

## If you have forgotten the password

Check where it might be stored: a password manager, the original email, a note, or the document's source. If it was set by an organisation, they can usually reissue the document. If it was your own file, the original unprotected version may still exist elsewhere. We do not recommend or support tools that try to bypass passwords, and they are a poor idea for sensitive files anyway.

## Sharing protected files safely

- Send the password through a different channel from the file, such as a phone call or a separate message.
- Use a password that is long and not reused elsewhere.
- Do not put the password in the file name.
- Check the final file before you send it. The [final checklist](/blog/check-pdf-before-sending-final-checklist) covers it.

## A note on privacy

A password protects a file in transit and at rest, but once you open it, the content is on your screen and in your device's memory. Browser-based tools process files locally, as explained in [what "processed in your browser" really means](/blog/what-processed-in-your-browser-really-means). Whatever you use, keep sensitive files off shared computers where you can.

## What these tools do not do

They do not add passwords, remove passwords, or fill in and sign forms. The overview in [which PDF tool do I need](/blog/which-pdf-tool-do-i-need-cheat-sheet) lists what each tool covers, so you know when you need other software.

## Frequently asked questions

### Why does a tool say my PDF cannot be opened?

It may be password-protected, corrupted, or in an unusual format. Try opening it in a viewer first. If it asks for a password, that is the cause.

### Can I merge a locked PDF with another?

Not directly. Make an unprotected copy of the locked one first, if it is yours to change.

### Does printing to PDF always work?

It works for most files, but some documents restrict printing, and then you will need the owner to change that.

### Will I need to protect the file again?

If it contains sensitive information, yes. Use your original program to add the password back after you finish.

Know which kind of lock you have, ask the right person, and the tool you need will work first time.`,
    images: [
      { marker: 1, query: "padlock on a document folder" },
    ],
  },
];
