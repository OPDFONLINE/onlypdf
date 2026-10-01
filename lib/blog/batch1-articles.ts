// Batch 1 pillar article content: rewritten to 1250+ words each, with
// interlinking (silo structure) and {{IMG:n}} placeholders resolved
// automatically by /api/admin/blog/illustrate. Safe to edit before running.
export type Batch1Article = {
  slug: string;
  title: string;
  excerpt: string;
  seo_title: string;
  seo_description: string;
  category: string;
  topic_cluster: string;
  author: string;
  related_slugs: string[];
  featuredImageQuery: string;
  content: string;
  images: { marker: number; query: string }[];
};

export const batch1Articles: Batch1Article[] = [
  {
    slug: "how-to-merge-reorder-organize-pdf-files",
    title: "How to Merge, Reorder, and Organize PDF Files (Complete Guide)",
    excerpt: "Combine PDFs, fix page order, and straighten sideways pages, all in your browser, with no software install and no file upload to a server.",
    seo_title: "How to Merge, Reorder, and Organize PDF Files",
    seo_description: "Combine PDFs, reorder pages, and fix sideways scans for free in your browser. No Adobe Acrobat, no software install, no uploads.",
    category: "Organize PDF",
    topic_cluster: "merge-organize",
    author: "OnlyPDF Team",
    related_slugs: ["how-to-split-a-pdf-into-separate-files", "how-to-remove-watermark-from-pdf"],
    featuredImageQuery: "stack of paper documents on office desk",
    content: `# How to Merge, Reorder, and Organize PDF Files

Anyone who has tried to send a scanner-produced document knows the frustration: pages land out of sequence, several unrelated files get bundled into one, or a page comes through sideways. None of that requires Adobe Acrobat or a paid subscription to fix. A browser-based [merge PDF tool](/tools/merge-pdf) can combine, reorder, and rotate pages directly on your own device in under a minute, and the files never have to leave your computer to get the job done.

## Why PDF organization problems keep happening

Most messy document sets trace back to the same handful of causes. A multi-function printer scans a stack of paper and saves every sheet as one long file, with no regard for which pages belong together. A form gets filled out, signed, and photographed separately from the ID copy it should accompany. A page gets fed into the scanner the wrong way round and comes out rotated ninety degrees. Each of these is a small, specific problem, and each one has a small, specific fix rather than needing a full editing suite.

Understanding which tool solves which problem saves time. Combining separate files into one belongs to a merging tool. Fixing the order of pages that are already inside a single file belongs to a page-rearranging tool. Straightening a flipped page belongs to a rotation tool. Treating these as three distinct, simple jobs, instead of one complicated one, is what makes browser-based PDF work fast.

{{IMG:1}}

## Combining multiple files into a single PDF

:::highlight blue
Need to add pages in the middle of a PDF rather than at the end? The [Insert PDF Pages tool](/tools/insert-pdf-pages) places pages from another PDF, images, or blank pages after any page you choose.
:::

When the goal is turning several separate PDFs into one document, the process usually looks like this:

- Add every file you want included, in any order to start.
- Drag the files into the sequence you actually want the final document to read in.
- Combine them into a single PDF.
- Download the result and open it once to confirm the order looks right.

Because a good browser tool only stitches existing pages together, nothing about the original quality, formatting, or embedded fonts changes during the process. A [merge PDF tool](/tools/merge-pdf) that runs entirely client-side also means sensitive paperwork, like signed contracts or ID scans, is never transmitted to an outside server just to be joined together.

One habit worth building: always double-check the file order in the tool's preview before combining. It is far easier to fix an ordering mistake before merging than after the recipient has already opened a document with the pages in the wrong sequence.

## Reordering pages that already live inside one document

:::highlight blue
Related guide: [How to rearrange PDF pages online](/blog/rearrange-pdf-pages-online) walks through reordering step by step, including how to check the final order.
:::

Sometimes the problem is not across separate files but within a single one, where the pages themselves are out of sequence. This is where a page-rearranging tool is the better choice, since it lets you drag individual page thumbnails into whatever order makes sense, without touching anything else about the file.

Typical steps look like this:

- Upload the single PDF whose pages are out of order.
- Drag thumbnails into place, or use small arrow controls next to each page if dragging on a touchscreen is awkward.
- Apply the new order.
- Download the corrected file.

This kind of tool is especially useful for scanned booklets, contracts assembled from several signing sessions, or reports where a section got inserted in the wrong place. Because only the sequence of pages changes, nothing inside any individual page, including text, images, and formatting, is altered.

{{IMG:2}}

## Fixing a sideways or upside-down page

A page that comes out of a scanner rotated the wrong way is one of the most common small annoyances in document handling, and one of the easiest to fix without re-scanning anything. A rotation tool lets you turn a single page, a selected group of pages, or an entire document, in either direction, and save the corrected version.

It is worth knowing that rotation changes only the page's orientation, not its underlying content. Text stays exactly as sharp as it was, images stay exactly as detailed, and nothing about the file's quality is reduced in the process, since rotation is a purely geometric change rather than a re-compression.

## Choosing the right combination of tools for a real task

Real documents often need more than one of these fixes at once. A common example: a job applicant scans several separate certificates, one of which comes out sideways, and wants a single, correctly ordered PDF to attach to an online application. The practical sequence is to first straighten the rotated page, then combine all the certificates into one file, then check the page order and rearrange anything that landed in the wrong spot before the final combined document is ready to send.

Approaching it this way, one small tool at a time, tends to be faster and less error-prone than hunting for a single all-in-one editor that tries to do everything through one complicated interface.

{{IMG:3}}

## Working with organized PDFs on a phone or tablet

None of this work requires a desktop computer. Combining, reordering, and rotating pages through a browser tool works the same way on a phone or tablet, since the processing happens locally in the browser regardless of screen size. This matters in practice more than it might seem: a huge share of scanning today happens through phone camera apps rather than dedicated scanners, which means the very next step, cleaning up and organizing those pages, often needs to happen on the same device, right after the photos are taken, rather than waiting until a computer is available.

A few small adjustments make mobile organizing smoother. Dragging thumbnails into a new order works fine with a finger on a touchscreen, though the arrow-button alternative that most rearranging tools offer tends to be more precise on a small screen than a drag gesture, since there is less room for an accidental drop in the wrong position. Rotating a page is typically a single tap regardless of device, since it does not require fine positioning the way reordering can. For merging several files together on a phone, the main practical difference from a desktop workflow is simply how the files were originally created, whether through a scanning app, saved email attachments, or downloaded documents, rather than any change to the merging process itself.

## Common mistakes worth avoiding

- Combining files without previewing the order first, then noticing the mistake only after sharing the document with someone else.
- Assuming that rotating a page will make it blurrier or lower quality. It will not, since orientation and image quality are unrelated properties of a page.
- Re-scanning an entire multi-page document just to correct one flipped page, when a rotation tool fixes that single page in seconds.
- Forgetting that reordering pages does not renumber any page numbers printed as part of the page content itself; only the physical sequence in the file changes.

## Frequently asked questions

### Can a PDF and a Word document be combined directly?

Not in one step. Convert the Word document into a PDF first, then combine it with your other PDF files. Doing the conversion first keeps formatting consistent across every page of the final combined document.

### Does merging or rotating reduce a document's quality?

No, in both cases. Merging only joins existing pages together without touching their content, and rotation only changes orientation, not the resolution or clarity of what is on the page.

### Is it safe to organize confidential documents using an online tool?

Look specifically for a tool that processes files inside your own browser rather than uploading them to a remote server for processing. OnlyPDF's [merge](/tools/merge-pdf), [rearrange](/tools/rearrange-pdf), and [rotate](/tools/rotate-pdf) tools all work this way, which means signed contracts, ID copies, and other sensitive paperwork stay on your own device throughout.

### What if the pages I need to combine are already split into single-page files?

That is exactly what a merge tool is built for. Add every single-page file in the order you want, combine them, and the result is one properly ordered document. If instead you are starting from one long file and want it broken back apart, a [split PDF tool](/blog/how-to-split-a-pdf-into-separate-files) does the reverse of this process.

Merging, reordering, and rotating are three separate jobs, each solved fastest by a small, purpose-built tool rather than one complicated editor, and every one of them can run privately in a browser without a single file ever leaving your device.`,
    images: [
      { marker: 1, query: "hands sorting paper files office" },
      { marker: 2, query: "laptop screen document editing workspace" },
      { marker: 3, query: "organized file folders desk" },
    ],
  },

  {
    slug: "how-to-split-a-pdf-into-separate-files",
    title: "How to Split a PDF Into Separate Files or Pages",
    excerpt: "Break a large PDF into one file per page, or pull out just the pages you need, without installing any software.",
    seo_title: "How to Split a PDF Into Separate Pages or Files",
    seo_description: "Split a large PDF into individual pages or smaller files for free, right in your browser. Download every page separately or as one ZIP.",
    category: "Organize PDF",
    topic_cluster: "split-pdf",
    author: "OnlyPDF Team",
    related_slugs: ["how-to-merge-reorder-organize-pdf-files", "how-to-compress-pdf-without-losing-quality"],
    featuredImageQuery: "scissors cutting paper document concept",
    content: `# How to Split a PDF Into Separate Files or Pages

Splitting a PDF means turning one document into several smaller ones, most often one file per page, though sometimes a specific range instead. It comes up more often than people expect: a scanner bundles unrelated documents into a single file, a report is too long to share in full, or a signed contract needs its individual pages separated for filing. None of these situations require desktop software, since a browser-based [split PDF tool](/tools/split-pdf) handles the whole job locally.

## Recognizing when splitting is the right move

A few situations call for splitting rather than any other PDF operation:

- A scanned batch of separate documents landed inside one long PDF, and each one needs to exist as its own file again.
- Only a handful of pages from a lengthy report need to be shared, not the entire thing.
- A multi-signature contract needs each signed page separated for individual filing or archiving.
- The overall file is too large for an email attachment, and breaking it into smaller pieces makes it practical to send.

If instead the pages inside a single document are simply in the wrong order, that calls for a different fix entirely: a [page-rearranging tool](/blog/how-to-merge-reorder-organize-pdf-files) rather than splitting. Knowing which of these two problems you actually have, wrong order within one file versus several documents stuck together, saves a wasted step before reaching for the right tool.

{{IMG:1}}

## How the splitting process actually works

The mechanics are straightforward regardless of which browser tool is used:

- Upload the PDF that needs to be broken apart.
- The tool automatically separates it into one file per page.
- Download each page individually, or download every page bundled together as a single ZIP archive.

Since splitting only separates pages that already exist, nothing about their content, resolution, or formatting changes in the process. A ten-page document split into ten files still adds up to roughly the same total size as the original, aside from a small amount of per-file overhead.

## Splitting versus extracting: two related but different jobs

:::highlight blue
Related guide: [How to extract pages from a PDF: the complete guide](/blog/extract-pages-from-pdf-complete-guide) goes deeper on choosing between extract, delete, and split.
:::

It helps to be clear about the difference between splitting and extracting pages, since they solve slightly different problems. Splitting turns every single page into its own separate file, which is the right choice when the end goal really is one-page-per-file. Extracting, by contrast, lets you choose a specific subset of pages, like pages 3 through 7 of a longer report, and pulls just those into one new combined file. If the actual need is "give me only these particular pages together," an extraction tool is the more direct route than splitting the whole document and then re-merging a subset.

{{IMG:2}}

## A realistic example: separating a scanned batch

Picture a scenario familiar to almost anyone who has dealt with paperwork: several unrelated forms get run through an office scanner in one pass, producing a single fifteen-page PDF that actually contains three separate five-page documents. Splitting it into fifteen individual one-page files, then combining the correct five pages back together for each of the three original documents using a merge tool, restores the original structure without anyone needing to re-scan a single sheet.

This two-step approach, split first and then selectively recombine, is often faster than trying to find one tool that understands exactly how the original documents should be separated automatically.

## What happens when split files get uploaded somewhere else

A question that comes up often: once a document has been split into individual pages, do those pages behave normally when uploaded to another system, like a government portal or a document management platform? In almost every case, yes, since each resulting file is a completely standard, standalone PDF, indistinguishable from one that was created as a single page from the start. There is nothing structurally different about a page that came from a split operation compared to any other one-page PDF.

This becomes particularly useful for systems that only accept one document per upload field. A signed agreement that arrives as one combined file with a signature page buried in the middle can be split apart, and just the relevant signature page uploaded on its own, without needing to recreate the page from scratch or manually screenshot it out of a viewer.

## Handling large files by splitting them down

:::highlight blue
Related guide: [How to split a large PDF into smaller files under 5MB](/blog/split-large-pdf-under-5mb) gives the full steps for meeting an upload limit.
:::

Splitting is also a practical answer to file-size limits. Rather than trying to shrink an entire document through compression alone, breaking a large PDF into several smaller parts can make each individual piece small enough to email or upload, particularly when the size limit is strict and every page inside is already close to its practical minimum size. In cases where the pages themselves are unusually large due to high-resolution scans, [compressing the PDF first](/blog/how-to-compress-pdf-without-losing-quality) and then splitting it, or the reverse order, both work depending on which limit you are trying to satisfy.

{{IMG:3}}

## Common mistakes to avoid

- Expecting splitting to reduce total file size meaningfully. It divides content across more files; it does not compress anything inside them.
- Assuming a general splitter can pull out an arbitrary custom range of pages. Most simple splitters produce one file per page; a dedicated extraction tool is needed for custom ranges.
- Losing track of which split file corresponds to which original page, especially with long documents. Downloading the ZIP archive, which usually numbers files in order, avoids this problem.

## Frequently asked questions

### Why did my pages come out in an unexpected order after splitting?

Splitting preserves whatever order the pages were already in inside the source PDF. If the result looks wrong, the original file likely already had that ordering issue; fixing the order first with a rearranging tool, then splitting afterward, solves it.

### Why is my split PDF's total size not smaller than the original?

That is expected. Splitting divides the same content across more files rather than removing or re-encoding anything, so the combined size of every resulting page stays close to the original, with a small amount of extra overhead per file.

### Can specific pages be pulled out instead of splitting every page?

Yes, but that calls for an extraction tool rather than a general splitter. An extraction tool lets you choose exactly which pages, like a specific range, to keep together in one new file, while everything else in the source document is left out.

### Is splitting a good way to get under an email attachment limit?

It can be, particularly for documents where the size is spread fairly evenly across many pages. For documents where a handful of image-heavy pages account for most of the size, compressing first is often more effective than splitting alone.

### Do split files keep the original page numbers printed on them?

Yes, if page numbers were printed as part of each page's actual content, like a footer showing "Page 4 of 10," that text stays exactly as it was on that page after splitting, since splitting only changes how pages are grouped into files, not what is printed on any individual page. This can look slightly unusual out of context, since a file named for page one might still visually display "Page 4," but it accurately reflects the page's original position in the source document.

Splitting turns one unwieldy PDF into several manageable pieces in seconds, and because it runs directly in the browser, nothing about the original document ever needs to be uploaded anywhere to get the job done.`,
    images: [
      { marker: 1, query: "person scanning documents office printer" },
      { marker: 2, query: "paper stack separated into piles" },
      { marker: 3, query: "email attachment file size laptop" },
    ],
  },

  {
    slug: "how-to-compress-pdf-without-losing-quality",
    title: "How to Compress a PDF Without Losing Quality",
    excerpt: "Shrink a PDF for email or upload limits while keeping it readable, using either automatic compression or a specific target file size.",
    seo_title: "How to Compress a PDF Without Losing Quality",
    seo_description: "Compress a PDF for email or upload limits for free. Choose automatic High, Medium, or Express compression, or target an exact file size.",
    category: "Optimize PDF",
    topic_cluster: "compress-pdf",
    author: "OnlyPDF Team",
    related_slugs: ["how-to-split-a-pdf-into-separate-files", "how-to-convert-word-jpg-images-to-pdf"],
    featuredImageQuery: "file size reduction concept computer",
    content: `# How to Compress a PDF Without Losing Quality

A document usually balloons in size for one of a few predictable reasons: high-resolution scanned pages, embedded fonts that were never optimized, or photos placed at their original camera resolution instead of a size appropriate for a document. A [compression tool](/tools/compress-pdf) re-encodes those heavy elements more efficiently, shrinking the overall file while keeping the text sharp and the layout intact.

## Situations where shrinking a PDF actually matters

- An email service rejects the attachment because it exceeds a limit, commonly somewhere around 20 to 25 MB.
- A job portal, university admission form, or government upload field only accepts files under a strict cap, sometimes as small as 500 KB or 1 MB.
- A large batch of documents needs to be archived, and reducing each file's footprint saves meaningful storage space across the whole collection.
- A document needs to load quickly when opened on a slow mobile connection.
- A collaborative platform or content management system enforces its own upload cap, independent of any limit set by email or a specific form.

## Automatic levels versus a specific target size

Most compression tools, including OnlyPDF's, offer a choice between automatic quality presets and a specific numeric target.

The automatic presets usually break down like this:

- A "High" setting keeps the most visual detail and produces the largest of the three results, best suited when image fidelity matters more than absolute file size.
- A "Medium" setting balances quality against size and is a sensible default for most everyday documents.
- An "Express" setting prioritizes the smallest possible result and the fastest processing time, appropriate when getting under a size limit matters more than preserving every visual detail.

{{IMG:1}}

When the requirement is an exact number, like a form that rejects anything over 200 KB, a target-size mode tends to be more reliable than guessing which automatic preset will land close enough. A good target-size tool tests several compression levels internally and stops at the first result that meets the requested size, rather than forcing a single fixed setting on every document regardless of its content.

## Why some files compress far more than others

Two documents of similar page count can respond very differently to the same compression settings. A document made mostly of typed, selectable text compresses easily because text itself takes up very little space; the size is dominated by whatever images or fonts are embedded alongside it. A document made of scanned pages, where every page is essentially one large photograph, has much less room to shrink without a visible drop in sharpness, since there is no separate text layer to leave untouched.

This explains a common source of confusion: someone compresses a ten-page scanned contract and sees only a modest size reduction, while a ten-page typed report shrinks dramatically under the same setting. The difference comes from what is actually inside each file, not from the compression tool behaving inconsistently.

## Why smaller files load faster on mobile connections

File size does not just matter for meeting an upload limit; it also affects how a document feels to open. A large, image-heavy PDF can take several noticeable seconds to fully load on a slower mobile data connection, particularly in areas with inconsistent signal strength, while a well-compressed version of the same document opens close to instantly. This matters for anything meant to be viewed on the go, like a boarding pass, an event ticket, or a portfolio shared with a client who might open it while out of the office rather than at a desk with reliable broadband.

For documents that will primarily be viewed on a phone screen rather than printed, a more aggressive compression setting is usually a safe choice, since a phone display shows far less fine detail than a printed page would, meaning the quality difference from stronger compression is far less noticeable on screen than it might be on paper.

{{IMG:2}}

## Practical steps to shrink a file responsibly

- Start with a Medium-equivalent setting before jumping straight to the most aggressive option, since the most aggressive setting is a noticeably bigger quality trade-off.
- If a strict target size cannot be reached without visible quality loss, check whether the source document contains unusually high-resolution scans; resizing those images before conversion to PDF often helps more than compressing after the fact.
- Always compress a duplicate of an important document rather than your only copy, until the result has been checked and confirmed to look correct.
- If the compressed file will be used for something official, like a government form or a legal submission, open it and zoom in on any small print, signatures, or stamps before submitting, to confirm nothing important became illegible.
- Keep a short note of which setting worked for a particular type of document, so the next similar file does not require the same trial and error.

## When compressing alone is not the best answer

Compression is not always the right tool for a size problem. If a document is genuinely long, rather than heavy per page, [splitting it into smaller parts](/blog/how-to-split-a-pdf-into-separate-files) may solve an email attachment limit more effectively than squeezing every page's quality down. And if the size problem originates from an oversized image before it was ever converted to PDF, [converting from image or Word to PDF](/blog/how-to-convert-word-jpg-images-to-pdf) with a more reasonable source resolution avoids the need for aggressive compression afterward entirely.

{{IMG:3}}

## Common mistakes worth avoiding

- Repeatedly compressing an already-compressed file, hoping for further gains. Each additional pass tends to degrade quality with diminishing size benefits.
- Choosing the most aggressive setting by default "just to be safe," when a moderate setting would have met the requirement while keeping the document sharper.
- Submitting a compressed document to an official form without opening it first to confirm the required details are still clearly legible.

## Frequently asked questions

### Is a compressed PDF acceptable for official or legal submissions?

Generally, yes, as long as all required text, signatures, and stamps remain clearly legible after the process. It is worth opening and reviewing the compressed file before submitting it anywhere that matters.

### Why is a scanned document so much larger than a typed one of the same length?

Scanned pages are stored as images rather than as text, and images take up far more space than the equivalent typed characters. A typed document of the same page count is typically a fraction of the size of its scanned counterpart.

### Are files uploaded to a remote server during online compression?

Not necessarily, and it is worth checking. OnlyPDF's compression tool processes the file inside your own browser, meaning the document never has to leave your device during the process.

### What is the fastest way to hit an exact size limit, like under 1 MB?

A target-size mode, where you type the exact limit and the tool finds a compression level that meets it, is generally faster and more reliable than manually trying each automatic preset one at a time and checking the result.

### Does compressing a PDF affect its text searchability?

No, as long as the document already contained real, selectable text before compression. Compression targets images, fonts, and other heavy elements; it does not convert existing text into an image or otherwise remove the ability to search and copy it afterward.

Whether the goal is squeezing under an email limit or meeting a strict upload requirement for an official form, choosing between an automatic preset and an exact target size covers nearly every real-world compression scenario.`,
    images: [
      { marker: 1, query: "computer settings slider quality adjustment" },
      { marker: 2, query: "scanned paper document close up text" },
      { marker: 3, query: "uploading file progress bar screen" },
    ],
  },

  {
    slug: "how-to-convert-word-jpg-images-to-pdf",
    title: "How to Convert Word, JPG, and Images to PDF",
    excerpt: "Turn a Word document or a batch of photos into a single, properly formatted PDF, without installing any software.",
    seo_title: "How to Convert Word, JPG, and Images to PDF",
    seo_description: "Convert a Word document or a batch of photos into one properly formatted PDF for free, right in your browser.",
    category: "Convert to PDF",
    topic_cluster: "convert-to-pdf",
    author: "OnlyPDF Team",
    related_slugs: ["how-to-convert-pdf-to-word-or-images", "how-to-compress-pdf-without-losing-quality"],
    featuredImageQuery: "document conversion digital files concept",
    content: `# How to Convert Word, JPG, and Images to PDF

Saving a file as a PDF locks its layout in place, so it looks identical no matter which device, operating system, or software opens it. That matters most when sending a document to someone else, since a Word file can shift its fonts, spacing, or even its entire layout depending on what is installed on the receiving computer, while a properly converted PDF will not.

## Converting a Word document into a PDF

The process for turning a DOCX file into a PDF is short:

- Upload the Word document that needs converting.
- Convert it into a PDF using a [Word to PDF tool](/tools/word-to-pdf).
- Download the result and check that headings, spacing, and any tables look right before sending it anywhere important.

Because this kind of conversion focuses on extracting the document's text and paragraph structure, most everyday documents, letters, resumes, simple reports, come through cleanly. Documents relying heavily on floating text boxes, unusual custom fonts, or intricate multi-column tables sometimes need a quick visual check afterward, since those elements are the hardest to translate perfectly between formats.

{{IMG:1}}

## Turning a batch of photos into one combined PDF

Combining several images into a single PDF comes up constantly: admission forms that require a photo ID and a signature as one attachment, receipts that need to be filed together, or a set of whiteboard photos from a meeting.

- Add every JPG or JPEG image that should be included. PNG images, such as screenshots, use the [PNG to PDF tool](/tools/png-to-pdf) instead.
- Arrange them into the order they should appear as pages, since the final document follows that exact sequence.
- Choose a page size, either fitting each page exactly to its image with no extra margin, or placing the image centered on a standard size like A4 or US Letter.
- Convert and download the combined file using an [image to PDF tool](/tools/jpg-to-pdf).

If one batch mixes JPG and PNG files, make one PDF from each format and join them with the [merge PDF tool](/tools/merge-pdf).

An important detail worth knowing: converting images into a PDF does not recompress or resize the underlying image data. Whatever resolution and quality the photos had going in is exactly what carries over into the resulting PDF pages.

## Making a usable PDF from phone camera photos

The same image-to-PDF process works just as well starting from photos taken directly on a phone rather than files from a scanner. A few habits make a noticeable difference in the result:

- Photograph each page as flatly and directly as possible, holding the phone parallel to the page rather than at an angle.
- Avoid shadows falling across the page, which can make text near the edges harder to read once converted.
- Make sure the entire page is visible inside the frame before taking the photo, since cropping afterward is more work than getting the shot right the first time.
- Use the phone's native resolution rather than a heavily zoomed-in shot, since zooming digitally reduces sharpness compared to stepping physically closer to the page.

Once the photos look clear individually, combining them in the correct order using an image-to-PDF tool produces a document that reads just like a scanned one, without needing access to an actual scanner.

{{IMG:2}}

## Choosing between fitting the image and a standard page size

The choice between "fit to image" and a standard page size like A4 depends on what the resulting PDF will be used for. Fitting each page exactly to its image works well when the document is meant to be viewed on screen, since there is no wasted white space around the content. A standard page size makes more sense when the PDF might eventually be printed, since printers and printing services generally expect a consistent, predictable page size like A4 or US Letter rather than a variable one that changes from page to page.

## Converting small items like receipts and business cards

Not every image-to-PDF conversion involves a full-size page. Receipts, business cards, and small printed labels are common candidates for this same process, and they come with their own small quirks. A receipt printed on thin thermal paper is prone to glare under direct light, so photographing it in even, indirect lighting produces a far more legible result than a photo taken near a bright window or under a harsh overhead lamp. A business card, being small and often glossy, benefits from filling as much of the camera frame as reasonably possible, since a tiny card photographed from far away leaves very little actual detail once it becomes part of a page-sized PDF.

For anyone collecting several of these small items over time, like expense receipts from a business trip, converting each one as it is captured, rather than waiting to batch them all at the end, tends to prevent the pile of paper from being lost or damaged before it gets digitized.

## What happens after conversion: checking file size

A PDF built from several full-resolution photos can end up noticeably larger than a typed document of similar length, since each embedded photo carries far more data than typed text does. If the resulting file needs to fit under an email or upload limit afterward, [compressing it](/blog/how-to-compress-pdf-without-losing-quality) is usually the next step, rather than trying to solve the size problem during the conversion itself.

{{IMG:3}}

## Common mistakes to avoid

- Assuming Word-to-PDF conversion will perfectly preserve every visual element of a heavily designed document. Simpler, mostly-text documents convert far more reliably than ones packed with floating graphics.
- Forgetting to check image order before converting a batch of photos, resulting in a document with pages in the wrong sequence.
- Photographing pages at an angle or in poor lighting, then being surprised that the resulting PDF is harder to read than expected.

## Frequently asked questions

### Why does my Word to PDF conversion look different from the original?

This is most common with documents that rely on precise floating text boxes, unusual fonts not widely available, or complex nested tables. A simpler, primarily text-based document tends to convert far more reliably and predictably.

### Can several images become one PDF instead of one PDF per image?

Yes. Adding multiple images to an image-to-PDF tool and converting them together produces a single PDF with each image placed on its own page, in whatever order they were arranged before conversion.

### Is a scanner required to create a document-quality PDF from paper?

No. A clear, well-lit phone photo, taken directly above the page rather than at an angle, works well for most everyday purposes, without needing a dedicated scanner.

### Will converting a photo to PDF make it blurrier?

No. The conversion places the existing image data into the PDF as-is; it does not resize, recompress, or otherwise degrade the photo during the process.

### Can a PDF made from photos be edited afterward like a normal document?

Not directly. A PDF built from images is still fundamentally a set of pictures, one per page, rather than editable text, so changing the actual words shown in the photos is not possible without retaking or editing the original images first. If editable text is the real goal rather than just a shareable file, starting from a typed document and converting that to PDF, rather than photographing a printed page, is the more direct route.

Whether starting from a Word document that needs a stable, universal format, or a stack of photos that need to become one shareable file, both processes run entirely in the browser with OnlyPDF's tools, so nothing has to be uploaded to a server to get a properly formatted PDF out the other end.`,
    images: [
      { marker: 1, query: "word document on laptop screen writing" },
      { marker: 2, query: "phone camera photographing paper document" },
      { marker: 3, query: "printed pages A4 standard size" },
    ],
  },

  {
    slug: "how-to-convert-pdf-to-word-or-images",
    title: "How to Convert PDF to Word or Image Files",
    excerpt: "Turn a PDF back into an editable Word document, or export its pages as JPG or PNG images, without installing any software.",
    seo_title: "How to Convert PDF to Word or Image Files",
    seo_description: "Convert a PDF back to an editable Word document, or export its pages as JPG or PNG images, for free in your browser.",
    category: "Convert from PDF",
    topic_cluster: "convert-from-pdf",
    author: "OnlyPDF Team",
    related_slugs: ["how-to-convert-word-jpg-images-to-pdf", "how-to-compress-pdf-without-losing-quality"],
    featuredImageQuery: "editable document text file computer",
    content: `# How to Convert PDF to Word or Image Files

Once a document has been saved as a PDF, editing it directly can be awkward at best. Converting it back into an editable format restores the ability to make changes normally, while converting it into images instead is useful for a different reason entirely: sharing a single page as a picture, or pulling a photo or diagram out from inside a longer document.

## Turning a PDF back into an editable Word document

The process, using a [PDF to Word tool](/tools/pdf-to-word), generally follows these steps:

- Upload a PDF that contains selectable text, meaning you can highlight and copy individual words when viewing it normally, rather than one made entirely of scanned images.
- Convert it into a DOCX file.
- Open the result in Word and make whatever edits are needed.

Text and basic paragraph structure carry over reliably in most cases. More complex elements, like multi-column layouts, fillable form fields, or text that lives inside a scanned image rather than as real selectable characters, usually need some manual cleanup afterward, since a scanned page has no actual text for the converter to extract in the first place.

{{IMG:1}}

## Exporting PDF pages as JPG or PNG images

Sometimes the goal is not editing at all, just getting a picture of a page to drop into a presentation, a chat message, or a social post. The [PDF to JPG tool](/tools/pdf-to-jpg) and the [PDF to PNG tool](/tools/pdf-to-png) handle this directly, one image format per tool. For a full walkthrough of the JPG route, see our guide to [converting PDF pages to JPG images](/blog/convert-pdf-to-jpg-pages):

- Upload the PDF.
- Choose which specific pages to convert, or select every page at once.
- Use PDF to JPG for a smaller file that works well for most ordinary documents, or PDF to PNG when a page contains fine text, line art, or sharp edges that benefit from lossless output.
- Convert and download either a single image, or a ZIP archive if more than one page was selected.

## Pulling an embedded picture out of a PDF

There is an important distinction between converting a page into an image and extracting an image that already exists inside a page. If a PDF contains an embedded photo or diagram and the goal is to reuse just that graphic, an image-extraction approach pulls out the original embedded picture at its native resolution, rather than producing a screenshot-style rendering of the entire page around it. This matters when the surrounding page contains other content that should not appear in the extracted picture.

{{IMG:2}}

## Setting realistic expectations for layout after conversion

A frequent point of frustration is expecting a converted Word document to look absolutely identical, pixel for pixel, to the original PDF. For most everyday documents, letters, resumes, simple multi-paragraph reports, that expectation is realistic, since the conversion faithfully carries over text, basic formatting like bold and italics, and paragraph structure. Where expectations should be adjusted is with more visually complex source documents: multi-column newsletters, forms with precisely positioned fields, or pages combining text wrapped tightly around images in specific spots. These layouts depend on exact positioning that word processors and PDF viewers do not always represent the same way internally, so some manual adjustment after conversion should be expected as a normal part of the process rather than treated as a conversion failure.

Knowing this ahead of time changes how the tool gets used in practice: for a simple document, converting and using the result immediately is reasonable. For a visually complex one, converting and then doing a five-minute formatting check before relying on the file saves more time than being surprised by a shifted layout later.

## Why some PDFs will not convert to Word cleanly

The single most common reason a PDF to Word conversion looks wrong traces back to how the original PDF was created. A document generated directly from a word processor, presentation tool, or similar software contains real, selectable text, and converts back into Word smoothly because the underlying text data was never lost in the first place. A document created by scanning a physical page, on the other hand, is really just one large image per page as far as the computer is concerned; there is no actual text layer sitting underneath it to convert. A quick way to check which situation applies is to try highlighting a word directly in a PDF viewer. If it highlights individual characters, the document has real text and will convert reliably. If nothing highlights, or the whole page selects as one block, it is an image-based scan, and a text conversion will not have anything reliable to work with.

## Choosing JPG or PNG for a given page

JPG works well for the overwhelming majority of ordinary document pages, since it produces a noticeably smaller file with barely perceptible quality loss for typical text and photo content. PNG becomes the better choice specifically when a page contains fine linework, sharp edges, or areas that need transparency preserved exactly, situations where JPG's compression approach can introduce visible artifacts around sharp boundaries. Because each format has its own tool, choose [PDF to JPG](/tools/pdf-to-jpg) or [PDF to PNG](/tools/pdf-to-png) before you upload.

{{IMG:3}}

## What to do with the result afterward

A DOCX file produced from a PDF conversion is ready to edit immediately in any standard word processor. Images exported from PDF pages are ready to drop directly into a presentation, message, or document. If those exported images later need to be [combined back into a single PDF](/blog/how-to-convert-word-jpg-images-to-pdf), for instance after annotating or cropping them elsewhere, that direction of conversion is simply the reverse process using an image-to-PDF tool.

## Common mistakes worth avoiding

- Trying to convert a scanned PDF to Word and expecting fully editable text, when the source page never contained real text to begin with.
- Defaulting to PNG for every page "to be safe," resulting in unnecessarily large files for pages that would have looked identical as JPG.
- Converting an entire lengthy PDF to images when only one or two specific pages were actually needed.

## Frequently asked questions

### Why does my converted Word document look wrong or missing text?

This almost always means the source PDF was a scanned image rather than a document with real selectable text. Try highlighting a word in a PDF viewer first; if nothing highlights, the page is an image, and optical character recognition, not a standard converter, would be needed to extract usable text. Our guide to [telling a scanned PDF from a digital one](/blog/scanned-pdf-vs-digital-pdf-how-to-tell) shows how to check in seconds.

### JPG or PNG: which is the better default for PDF pages?

JPG for most ordinary documents, since it produces a meaningfully smaller file with minimal visible quality difference. PNG when a page has fine text, line drawings, or transparency that needs to stay exact. The two formats have separate tools, [PDF to JPG](/tools/pdf-to-jpg) and [PDF to PNG](/tools/pdf-to-png).

### Is it possible to convert only a few pages instead of an entire document?

Yes. A page-by-page converter lets individual pages be selected or left out before conversion begins, so converting the whole document is never required just to get a couple of specific pages.

### Can an image already embedded inside a PDF be pulled out directly?

Yes, using an image-extraction approach rather than a page-to-image converter. This retrieves the original embedded graphic at its native resolution, separate from the rest of the page's content.

### How can I tell if a PDF has real text before trying to convert it?

Open the file in any standard PDF viewer and try clicking and dragging across a line of text as if to select it. If individual words highlight the way they would on a normal webpage, the document has real, selectable text and should convert to Word reliably. If nothing highlights, or the entire page selects as one solid block, the page is effectively a picture, and a standard converter will not find any text to extract from it.

Whether the goal is getting back to an editable document or pulling individual pages out as images, both directions run in the browser using OnlyPDF's tools, keeping the original PDF on your own device throughout the process.`,
    images: [
      { marker: 1, query: "highlighting text document screen close up" },
      { marker: 2, query: "extracted photo image gallery digital" },
      { marker: 3, query: "presentation slides laptop meeting" },
    ],
  },

  {
    slug: "how-to-remove-watermark-from-pdf",
    title: "How to Remove a Watermark from a PDF",
    excerpt: "Find and delete a PDF watermark, or cover one that is part of a scan, right in your browser. Learn when each method works.",
    seo_title: "How to Remove a Watermark from a PDF",
    seo_description: "Remove a watermark from a PDF for free. Smart mode finds and deletes watermark objects, and Manual mode covers scanned ones. Preview before you download.",
    category: "Edit PDF",
    topic_cluster: "watermark-cleanup",
    author: "OnlyPDF Team",
    related_slugs: ["how-to-merge-reorder-organize-pdf-files", "how-to-compress-pdf-without-losing-quality"],
    featuredImageQuery: "clean blank document paper minimal",
    content: `# How to Remove a Watermark from a PDF

A watermark on a PDF can be one of two very different things, and knowing which one you have decides how easy the job is. Some watermarks are separate objects that a program placed on top of the page, such as a semi-transparent "DRAFT" or a logo layer. Others are baked into the page picture itself, as in a scan or a flattened export. The first kind can be found and deleted. The second kind can only be covered. OnlyPDF's [watermark remove tool](/tools/watermark-remove) handles both, with a Smart mode for the first kind and a Manual mode for the second.

:::highlight orange
Only remove watermarks from documents you own or have permission to edit. A watermark can carry ownership, copyright or confidentiality information, and stripping it from someone else's work may not be allowed where you live or work.
:::

## Smart mode: find the watermark and delete it

When you upload a PDF, the tool scans every page for watermark objects. It looks for:

- Content that the creating program tagged as a watermark, including watermark layers.
- Semi-transparent text, logos and shapes that sit in their own block on the page.
- Stamp layers that were added on top of a finished page by other PDF programs.
- Watermark and Stamp annotations.

If it finds anything, the Smart tab opens with a list. Each item shows what it is, such as "Semi-transparent text DRAFT", and how many pages it appears on. You tick the ones you want gone, compare the Before and After preview, choose the pages, and download.

{{IMG:1}}

Because the watermark is a separate object, removing it does not touch the text or images underneath. Nothing is painted over the page, so there is no white patch on tinted paper and no hidden gap where the mark used to be.

## Choosing which pages to clean

Both modes let you choose where a change applies: every page, only the current page, odd pages, even pages, or a range such as 1-3, 5, 8-10. That helps with documents where a cover page carries a logo you want to keep, or where a stamp only appears on the first few pages.

## Manual mode: cover any area

:::highlight blue
Related guide: [How to remove a watermark from a PDF by selecting the area](/blog/remove-watermark-from-pdf-selected-area) covers Manual mode in detail.
:::

If Smart mode finds nothing, the watermark is most likely part of the page image. A scanned page is one picture, so the mark and the content cannot be separated. For that case, the Manual tab lets you drag a box over the watermark and cover it.

- Draw as many boxes as you need on the same page.
- Move a box by dragging it, and resize it from the corners.
- Give each box its own page scope.
- Zoom in and use Pan mode for precise placement, including on a phone.
- Undo and redo with the buttons or Ctrl or Cmd plus Z.

The cover colour defaults to a match sampled from the area around the box, so on a cream or light blue page the patch blends in. You can also choose white, pick a custom colour, or click "Pick from page" to sample any spot. Turning on the cover preview shows the result on the page before you download.

{{IMG:2}}

## Which mode fits your file

| Situation | Best choice |
|---|---|
| Semi-transparent "DRAFT" or "CONFIDENTIAL" text added by software | Smart |
| Logo or stamp layer added on top of a finished PDF | Smart |
| Scanned pages with a mark printed on the paper | Manual |
| Watermark flattened into the page image | Manual |
| Solid or very light text with no transparency | Manual |
| Watermark over a photo | Manual, with realistic expectations |

## What to expect when it does not work perfectly

Smart detection is a best guess. It recognises common patterns, so it can occasionally list something that is not a watermark, for example a semi-transparent chart shape. That is why every item has a checkbox and a preview. If the After preview shows something missing that should be there, untick it.

Manual covers have limits too. A cover hides what is underneath rather than recovering it. If a watermark sits across important text or a photograph, the cover hides that content as well, and no tool can reconstruct it. In that case, asking the sender for a clean copy is usually the better route.

The tool also cannot open password-protected PDFs and does not perform OCR. If a file is protected, remove the password in the program that created it first.

:::highlight red
Manual covers are not redaction. The original content may still exist under the cover. Never use this tool to hide confidential information before sharing a file.
:::

## Check the result before sending it

Scroll through the finished PDF and look for three things: the watermark is gone on every page you selected, no patch is visible against a coloured background, and no needed text was hidden. This takes a minute and catches the rare page where the mark sat a little differently from the others.

{{IMG:3}}

## Common mistakes worth avoiding

- Skipping Smart mode and covering a watermark that could have been deleted cleanly.
- Ticking a detected item without looking at the After preview.
- Applying one box to every page when the watermark moves from page to page.
- Drawing the box so tightly that faint edges of the mark remain visible.
- Assuming a cover has erased what is beneath it.

## Frequently asked questions

### Is removing a watermark from a PDF legal?

It depends on who owns the document and why you are removing the mark. Removing a watermark from your own material, or from a file you have clear permission to edit, is a normal editing task. Removing it from someone else's protected or confidential work is a different matter, and rules vary by country and organisation, so check the ones that apply to you first.

### Does it work on scanned PDFs?

Smart mode will find nothing on a true scan, because there is no separate watermark object. Manual mode works, and it works best on plain or evenly coloured backgrounds.

### Can it remove text and image watermarks?

Yes, in Smart mode when they are separate semi-transparent objects or tagged watermark layers. In Manual mode, a cover treats text and images alike because it works on an area of the page.

### Will the cover look like a visible box?

Not usually. The default colour is sampled from the surroundings, so on plain or evenly tinted pages it blends in. On photos or gradients a cover will be noticeable, and Smart mode or a clean original copy is the better choice.

### Does my PDF get uploaded?

Watermark detection and removal run in your browser, so the PDF itself is not sent to a server for this tool. Some other conversions on the site may work differently, so read the [privacy policy](/privacy) for the details.

### What if I also need to reorder or merge pages?

Clean the watermark first, then [merge or reorder the pages](/blog/how-to-merge-reorder-organize-pdf-files). Each step is independent, so neither undoes the other.`,
    images: [
      { marker: 1, query: "diagonal stamp watermark paper document" },
      { marker: 2, query: "editing tool selecting area screen" },
      { marker: 3, query: "final clean document print ready" },
    ],
  },
];

