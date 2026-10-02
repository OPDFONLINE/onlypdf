import type { Batch1Article } from "@/lib/blog/batch1-articles";

// Batch 4: five pillar-length guides (1250+ words each). {{IMG:n}} placeholders
// are resolved by /api/admin/blog/illustrate?slug=... and saved as drafts.
export type Batch4Article = Batch1Article;

export const batch4Articles: Batch4Article[] = [
  {
    slug: "jpg-to-pdf-complete-guide",
    title: "JPG to PDF: The Complete Guide to Turning Images Into One Clean Document",
    excerpt: "Combine photos, scans, and screenshots into a single PDF with the right page size and order. Everything you need to know, step by step.",
    seo_title: "JPG to PDF: Complete Guide to Converting Images",
    seo_description: "Convert JPG and JPEG images into one PDF for free (PNG has its own tool). Learn page sizes, ordering, quality, and file size tips. No software, no account.",
    category: "Convert to PDF",
    topic_cluster: "convert-to-pdf",
    author: "OnlyPDF Team",
    related_slugs: ["convert-multiple-jpg-to-one-pdf", "convert-scanned-image-to-pdf-admission-form", "how-to-convert-word-jpg-images-to-pdf"],
    featuredImageQuery: "photos being arranged into a document",
    content: `# JPG to PDF: The Complete Guide to Turning Images Into One Clean Document

Photos of receipts, scans of certificates, screenshots of conversations, pictures of a whiteboard: sooner or later, most people need to turn a handful of images into a single document. A folder of loose pictures is awkward to send, easy to put in the wrong order, and rejected outright by many websites that only accept PDF. A single PDF fixes all three problems at once.

This guide walks through the whole process with the [JPG to PDF tool](/tools/jpg-to-pdf): how to prepare your images, how to choose a page size, how to keep the order right, and how to keep the final file a sensible size.

## Why convert images to PDF at all

There are four practical reasons people make the switch.

- One file instead of many. A single attachment is easier to email, upload, and archive than fifteen separate pictures.
- Predictable order. In a PDF, page one is page one for everyone. Image galleries and file browsers often sort in ways you did not intend.
- Universal acceptance. Application portals, government forms, and bank uploads frequently insist on PDF.
- Professional appearance. A tidy multi-page document looks more deliberate than a zip of camera photos.

{{IMG:1}}

## What the tool accepts

:::highlight blue
Related guide: [How to convert screenshots and PNG images to PDF](/blog/convert-screenshots-png-to-pdf) covers the PNG side, including page size choices for screenshots.
:::

The tool takes JPG and JPEG images. PNG images, which is what most screenshots are, have their own [PNG to PDF tool](/tools/png-to-pdf) that works the same way. Each run handles one format, so if you have both, make one PDF from each and join them with the [merge PDF tool](/tools/merge-pdf). You can add just one or as many as you need. Each image becomes one page of the PDF, in the sequence you choose. If your pictures are in another format, such as HEIC from a recent iPhone or WebP saved from a website, convert or re-save them as JPG or PNG first; most phones and photo apps can export in a compatible format.

## Step by step

- Add your images. Select them all at once from your device, or add them in batches.
- Put them in order. Drag the images into the sequence you want, or use the arrow buttons if dragging is fiddly on a touchscreen.
- Choose a page size. You can pick fit to each image, A4, or US Letter.
- Convert to PDF and download the file.
- Open the result and scroll through it once to confirm everything is present and upright.

The whole process takes a couple of minutes, and everything runs in your browser, so the images stay on your device while they are being processed.

## Choosing the right page size

The page size setting is the option people most often get wrong, so it deserves a proper explanation.

### Fit to image

Each page is exactly the size of its picture, with no margin and no white space. This is the best choice when the pictures are the content itself: a photo album, a set of drawings, a comic strip, or screenshots you want to preserve exactly. The downside is that pages can be different sizes if your images differ, which looks uneven when printed.

### A4

Each image is placed, centred, on a standard A4 page. This is the right choice for almost anything that will be printed or submitted in most of the world, including forms, certificates, and identity documents. Use it whenever a form asks for A4 or simply says standard size.

### US Letter

The same idea, on US Letter paper. Choose this if you are submitting to a US or Canadian organisation, or printing on Letter paper.

:::highlight blue
Rule of thumb: use fit to image when the picture is the product, and A4 or US Letter when the PDF is going to be printed or filed as an official document.
:::

## Getting the order right

Order mistakes are the most common problem with image-to-PDF conversions, and they are easy to prevent.

- Rename or sort first if you can. If your files have names like IMG_0451, sorting by name usually matches the order they were taken. Adding the images in that order reduces dragging.
- Check before converting, not after. The preview thumbnails show you the order. Two seconds here saves a re-do.
- Think about the reader. A multi-page form should run front to back; a set of receipts is often best in date order.

If you get it wrong anyway, you do not need to start over. Use the [rearrange PDF tool](/tools/rearrange-pdf) to drag the pages into the correct sequence, and rotate any that came out sideways.

## Quality: what really happens to your images

:::highlight blue
Related guide: [PNG or JPG to PDF: which image type should you use?](/blog/png-vs-jpg-to-pdf-which-to-use) compares sharpness and file size.
:::

A common worry is that converting to PDF will make pictures blurry. In this tool, the image data is placed into the PDF as it is; the conversion does not recompress or resize the picture itself. That means the PDF looks exactly as good as the original image did, and no better. If a photo was blurry or dark before conversion, it will still be blurry or dark afterward.

That makes source quality the thing to focus on:

- Take photos in even light, without shadows falling across the page.
- Hold the camera directly above the paper, not at an angle.
- Fill the frame with the page so text is large and readable.
- Avoid flash glare on glossy paper.

{{IMG:2}}

## Keeping the file size manageable

Because images keep their original data, a PDF made from ten high-resolution phone photos can easily be many megabytes. That is a problem when a form limits you to 2 MB or an email server rejects large attachments. There are three ways to shrink the result.

- Reduce the images before converting. Fewer pixels means a smaller PDF, but do this only if the images are larger than they need to be.
- Compress the finished PDF. The [compress PDF tool](/tools/compress-pdf) offers High, Medium, and Express levels, plus a target file size mode where you enter a size like 800 KB or 2 MB.
- Leave out pages that are not needed, which is often the easiest saving of all.

For detailed strategies, see [how to compress a PDF without losing quality](/blog/how-to-compress-pdf-without-losing-quality).

## Real-world examples

### Job or admission applications

Applicants often need to upload a photo of a certificate or ID as a PDF. Photograph each document clearly, convert with A4 as the page size, check that the text is readable at full size, and compress if the portal has a limit. A more detailed walk-through is in [our guide to converting a scanned image into an admission form PDF](/blog/convert-scanned-image-to-pdf-admission-form).

### Receipts and expenses

Snap each receipt, add them in date order, and convert with fit to image so no receipt is cropped or padded. One PDF per expense report is far easier for an accounts team to handle than a stack of pictures.

### Handwritten notes and whiteboards

Photograph each page or board section, use fit to image, and you have a shareable record of a meeting or class. If a page is sideways, fix it with the [rotate PDF tool](/tools/rotate-pdf).

### Combining images with existing PDFs

Sometimes you need a photographed page to sit inside a longer PDF. Convert the images into their own PDF first, then use the [merge PDF tool](/tools/merge-pdf) to combine the two documents in the order you want. Our guide to [merging PDFs on a phone](/blog/merge-pdf-files-in-order-on-phone) covers the mobile workflow. To place images at an exact spot inside a longer PDF, such as after page 7, the [Insert PDF Pages tool](/tools/insert-pdf-pages) accepts JPG and PNG images directly, with each image becoming one A4 page.

## Common mistakes to avoid

- Converting sideways images without checking. If a photo was taken in landscape but should be portrait, rotate the resulting page afterward.
- Using fit to image for a form. A form that expects A4 will look wrong, or be rejected, if pages are different sizes.
- Forgetting to check readability. Zoom in on small text in the finished PDF. If you cannot read it, the recipient will not be able to either.
- Uploading huge photos when a limit applies. Check the size requirement first, so you know whether compression will be needed.
- Sending the wrong version. Keep the original images, but give the final PDF a clear name so it is easy to identify.

## Can the PDF be turned back into images?

Yes. The [PDF to JPG tool](/tools/pdf-to-jpg) converts pages back into JPG images, and the [PDF to PNG tool](/tools/pdf-to-png) does the same for PNG images, so the process works in both directions. That is useful if you built a PDF and later need one of its pages as a picture for a presentation or website.

## Privacy

Personal documents are exactly what people convert most often: IDs, bank statements, medical letters. Because this conversion runs in your browser, the files are processed on your own device rather than being uploaded to a server first. For details on how the site handles data more generally, read the privacy policy.

## Frequently asked questions

### How many images can I put in one PDF?

You can add as many as you like. The practical limit is the memory of your device, so very large batches of high-resolution photos may take longer to process.

### Will the PDF have selectable text?

No. The pages are pictures, so the text in them cannot be selected or searched. If you need searchable text, you would need OCR software, which is a separate kind of tool.

### Can I mix portrait and landscape images?

Yes. With fit to image, each page matches its picture. With A4 or US Letter, each picture is placed on the standard page.

### Does converting reduce image quality?

No. The image data is placed into the PDF as it is, so the pictures look the same as they did before.

### What if the order is wrong after converting?

Open the PDF in the rearrange tool and drag the pages into the right sequence. Nothing needs to be re-photographed.

Turning images into a PDF is one of the quickest wins in everyday document handling. Prepare clear photos, choose a page size that matches where the file is going, check the order, and you will have a professional-looking document in a couple of minutes.`,
    images: [
      { marker: 1, query: "stack of photographs on table" },
      { marker: 2, query: "photographing paper document with smartphone" },
    ],
  },
  {
    slug: "extract-pages-from-pdf-complete-guide",
    title: "How to Extract Pages From a PDF: The Complete Guide",
    excerpt: "Pull the pages you need out of a long PDF into a new file. When to extract, when to delete, and how to avoid the common mistakes.",
    seo_title: "How to Extract Pages From a PDF: Complete Guide",
    seo_description: "Extract specific pages from a PDF into a new file for free. Learn when to extract or delete, page order rules, and tips for sharing safely.",
    category: "Organize PDF",
    topic_cluster: "split-pdf",
    author: "OnlyPDF Team",
    related_slugs: ["extract-one-page-from-pdf", "how-to-split-a-pdf-into-separate-files", "delete-pages-from-pdf-free"],
    featuredImageQuery: "picking pages from a stack of documents",
    content: `# How to Extract Pages From a PDF: The Complete Guide

You rarely need all of a long PDF. A hundred-page report might contain the three pages your manager wants to see. A scanned contract bundle may include one page you must send to the bank. A textbook chapter you want to print sits somewhere in the middle of a huge file. In each case, the sensible move is to pull those pages out into a new, smaller PDF and leave the rest behind.

This guide covers everything about doing that with the [extract PDF pages tool](/tools/extract-pdf-pages): the steps, the choices, how it relates to deleting and splitting, and the mistakes worth avoiding.

## What extracting means

Extracting creates a brand-new PDF that contains only the pages you select. Your original file is not changed. The new document is smaller, focused, and ready to share without dragging along pages that are irrelevant, private, or simply too large to send.

{{IMG:1}}

## When to extract

- Sending part of a document. Share only the relevant pages instead of a whole report.
- Meeting a size limit. Fewer pages means a smaller file for email or upload portals.
- Protecting privacy. Leave out pages containing details the recipient does not need.
- Printing. Print only the pages you actually need, saving paper and ink.
- Reusing content. Pull a chapter, a chart, or an appendix into its own file.

## Step by step

- Upload your PDF to the extract tool and wait for the page previews.
- Tap the page numbers you want to keep.
- Select Extract PDF Pages to build the new file.
- Download it and open it to confirm the right pages made it in.

The whole task is usually done in under a minute. Everything happens in your browser, so the file is processed on your own device rather than being uploaded first.

## An important detail about page order

Extracted pages keep the order they had in the original PDF, no matter what order you tapped them in. If you select page 9 and then page 2, the new file still shows page 2 first, then page 9. If you need a different order, extract first, then use the [rearrange PDF tool](/tools/rearrange-pdf) on the new file to drag the pages into the sequence you want. It is one extra step, and it keeps each tool simple.

:::highlight orange
Tapping order does not matter, but original order does. If page sequence matters for your result, plan a rearranging step after extracting.
:::

## Extract, delete, or split: choosing the right tool

Three tools solve related problems, and picking the right one saves effort.

| Situation | Best tool |
| --- | --- |
| You want only a few pages | Extract pages |
| You want most pages and only a few removed | Delete pages |
| You want every page as its own file | Split PDF |

A good rule is to choose whichever needs fewer taps. Keeping three pages out of two hundred is an extract job. Removing three pages from two hundred is a delete job. If you need each page separately, the [split PDF tool](/tools/split-pdf) turns every page into its own file and bundles them in a ZIP. Note that the split tool creates one file per page; it does not currently cut a PDF into custom ranges such as pages 1 to 5 together. To get a range, extract those pages in one go instead.

## Extracting a range of pages

Because you choose pages by tapping, extracting a consecutive range simply means tapping each page in the range. For long ranges, this is quick when the page grid is easy to scan. For a range like pages 40 to 60, tap each page in turn, then check that the count matches what you expect before you build the file. If you often need long ranges from very large documents, extracting in two stages can help: first pull out a wide section, then refine it in a second pass.

{{IMG:2}}

## Extracting non-consecutive pages

This is where extraction really shines. Say you need the cover, the summary on page 4, and the signature page at the end of a twenty-page contract. Tap those three pages and you get a clean three-page file. Doing this by hand in a viewer, by printing selected pages to a virtual printer, is slower and often produces lower-quality output.

## Sharing extracted pages safely

Extracting is a handy way to limit what you share, but a few habits keep it safe.

- Check the new file, not the original. Open the extracted PDF and read every page before sending.
- Watch for hidden context. A page you keep might refer to information on pages you removed. Make sure the excerpt still makes sense on its own.
- Keep the original private. It still contains everything. Do not attach the wrong file by accident; give the extracted version a clear name that includes the word excerpt.
- Think about what is on each page. Headers and footers sometimes reveal file names, case numbers, or client details.

## Combining extraction with other tools

:::highlight blue
Related guide: [How to insert pages from one PDF into another at a specific position](/blog/insert-pages-from-another-pdf-at-specific-position) shows how to place extracted pages inside a different document.
:::

Real tasks often use more than one tool.

- Extract, then merge. Pull pages from several PDFs and combine them into one file with the [merge PDF tool](/tools/merge-pdf). This is how you build a custom packet from multiple sources.
- Extract, then compress. If the extracted file is still large, the [compress PDF tool](/tools/compress-pdf) can reduce it further.
- Extract, then rotate. If a page came from a sideways scan, fix it with the [rotate PDF tool](/tools/rotate-pdf).
- Extract, then convert. Send the extracted pages through [PDF to Word](/tools/pdf-to-word) or [PDF to JPG](/tools/pdf-to-jpg) if you need an editable or image version of only those pages.

For a fuller look at the single-page case, see [how to extract one page from a PDF](/blog/extract-one-page-from-pdf), and for the every-page case, read [how to split a PDF into separate files](/blog/how-to-split-a-pdf-into-separate-files).

## Common mistakes to avoid

- Expecting the tap order to matter. Extraction preserves original order.
- Extracting the wrong pages because page numbers printed on the paper differ from the file's own page positions. A document may have a cover and front matter, so printed page 1 might be the fifth page in the file. Always trust the thumbnails, not the printed numbers.
- Forgetting the original still has everything. Extracting does not delete anything from your source.
- Skipping the final check. A five-second scroll through the result prevents embarrassing mistakes.
- Using extract when delete would be quicker. Count the pages on each side before choosing.

## Working on a phone

The page picker is built for taps, so it works well on a phone or tablet. If the page numbers look small, use the device in landscape orientation, and confirm your selection before you build the file. The download appears in your browser's usual download location.

## Privacy

Because extraction runs in your browser, documents such as contracts, statements, and medical records are not uploaded to a server as part of the process. That matters most in exactly the cases where people extract pages: when they want to share only part of a sensitive document.

## Frequently asked questions

### Does extracting change my original PDF?

No. It creates a new file and leaves the original exactly as it was.

### Can I choose the order of the extracted pages?

Not while extracting. Pages keep their original order. Use the rearrange tool afterward if you need a different sequence.

### Is there a limit on how many pages I can extract?

You can select as many as you like, as long as the document has them. Very large files depend on your device's memory.

### What is the difference between extract and delete?

Extract keeps the pages you select and discards the rest. Delete does the opposite: it removes the pages you select and keeps everything else.

### Will the extracted pages look the same as in the original?

Yes. Pages are copied as they are, so text, images, and layout are unchanged.

Extracting pages is one of the most useful small skills in document handling. It keeps files short, protects information you do not want to share, and saves you from sending a whole report when only a few pages matter.`,
    images: [
      { marker: 1, query: "person selecting pages from document stack" },
      { marker: 2, query: "reviewing contract pages at desk" },
    ],
  },
  {
    slug: "pdf-file-size-limits-and-how-to-meet-them",
    title: "PDF File Size Limits: Why Uploads Get Rejected and How to Fit Under Any Limit",
    excerpt: "Email caps, portal limits, and form restrictions all reject oversized PDFs. Here is how to find out what makes your file heavy and how to get it under the limit.",
    seo_title: "PDF File Size Limits: How to Get Under Any Upload Limit",
    seo_description: "Fit a PDF under an email or upload size limit. Learn what makes PDFs large and how to use automatic and target-size compression.",
    category: "Optimize PDF",
    topic_cluster: "compress-pdf",
    author: "OnlyPDF Team",
    related_slugs: ["how-to-compress-pdf-without-losing-quality", "compress-pdf-to-100kb", "reduce-pdf-size-for-email"],
    featuredImageQuery: "upload progress on computer screen",
    content: `# PDF File Size Limits: Why Uploads Get Rejected and How to Fit Under Any Limit

You fill in an online form, attach your PDF, and the page answers with an error: file too large. It happens with job portals, university applications, government forms, insurance claims, and email servers. Each has its own limit, and they are usually stated in a line of small print that is easy to miss until an upload fails.

This guide explains why limits exist, what makes a PDF large in the first place, and a practical order of steps for getting any file under a given size, using the [compress PDF tool](/tools/compress-pdf) and a few companion tools.

## Why size limits exist

Limits are not arbitrary. Servers pay for storage and bandwidth, and one oversized file multiplied by thousands of applicants adds up. Email systems reject large messages to avoid clogging inboxes and to reduce spam and malware risk. Older systems, especially in government and education, were built when limits of a megabyte or two were sensible, and they have not been updated.

The consequence is that limits vary widely. Common ones you may meet include a few hundred kilobytes for a strict form field, one to five megabytes for many portals, and around ten to twenty-five megabytes for email attachments, depending on the provider. Always check the actual limit shown by the site you are using, because it can change.

{{IMG:1}}

## What makes a PDF large

Understanding the cause tells you which fix will work best.

- Photos and scans. This is the number one reason. A PDF built from phone pictures or scanner output contains large image data, and each page may be a full-resolution photo.
- Many pages. Even light pages add up when there are hundreds of them.
- Embedded fonts. A document that includes several full fonts carries extra weight.
- Embedded extras. Attached files, high-resolution logos, and complex graphics can add megabytes.

A quick test: if your PDF was made from scanned or photographed pages, images are almost certainly the cause, and compression will help a lot. If it is a text-only document exported from a word processor and is still big, the page count or embedded content is the more likely culprit.

## A step-by-step plan for fitting under a limit

Work through these in order, and stop as soon as the file is small enough.

### Step 1: Remove pages you do not need

The cheapest saving is pages that should not be in the file. Use the [delete PDF pages tool](/tools/delete-pdf-pages) to drop blanks, cover sheets, and duplicates. If you only need a few pages from a large document, the [extract PDF pages tool](/tools/extract-pdf-pages) is faster.

### Step 2: Compress with an automatic level

The compress tool offers three automatic levels.

- High keeps more visual detail. Choose it when the document needs to look its best.
- Medium balances quality and file size. This is the sensible default.
- Express prioritises a smaller file and quicker processing.

Try Medium first. If the result is still over the limit, try Express.

### Step 3: Use target file size

If you know the exact limit, choose target file size and enter it, for example 800 KB or 2 MB. The tool tests several browser-safe compression levels and stops when it finds a result at or below your target. That saves you from guessing and repeating.

:::highlight green
A useful habit: aim a little under the limit, not exactly at it. If the limit is 2 MB, target about 1.8 MB, because some systems calculate size slightly differently.
:::

### Step 4: Accept the trade-offs when a limit is very small

Some limits are very strict. Getting a scanned multi-page document under a few hundred kilobytes means accepting some loss of detail. Some PDFs simply cannot reach very small targets without a larger drop in quality or a different compression method. When that happens, the best options are to reduce the page count, or to split the submission into more than one file if the form allows it.

## Seeing the difference between quality levels

It helps to know what you are giving up at each level.

- On a text-heavy document, the differences between levels are often small, because text takes little space.
- On photographs and scans, lower levels can soften fine detail and make small print harder to read.
- Chart lines and thin rules can look slightly rougher at the smallest sizes.

After compressing, always open the result and zoom in on the smallest text. If you can read it comfortably at a normal zoom level, the quality is good enough for most purposes.

{{IMG:2}}

## Splitting versus compressing

When a file is too big, people often think of splitting it. Splitting does reduce the size of each piece, but the tool separates every page into its own file, which is rarely what an upload form wants. If a portal allows several attachments, extracting sections into a few separate files can work. For a single-file requirement, compression and page removal are the right tools.

## Special cases worth knowing

### Email attachments

Some email providers apply their limit to the whole message, including attachment encoding overhead, which makes the effective allowed file size somewhat smaller than the stated limit. Keep a margin. For more on this, see our guide on [reducing PDF size for email](/blog/reduce-pdf-size-for-email).

### Job and admission applications

These portals often set low limits and expect several documents. Combine and compress carefully so each document stays readable. Our article on [compressing a PDF for a job application](/blog/compress-pdf-for-job-application) goes through it in detail.

### Very small targets

If you need to reach about a hundred kilobytes, expect to compromise on visual quality and to work with fewer pages. The dedicated guide on [compressing a PDF to 100 KB](/blog/compress-pdf-to-100kb) covers realistic expectations.

## Mistakes that waste time

- Compressing repeatedly. Running the same file through compression again and again gives diminishing returns and can degrade quality. Start again from the original with a stronger setting instead.
- Ignoring page count. Removing unneeded pages is often the biggest saving.
- Not checking the result. A file that meets the limit but is unreadable is not useful.
- Overwriting the original. Keep the uncompressed file as your master copy.
- Forgetting the format. Some forms accept only PDF, not images. If you have pictures, [convert them to PDF](/tools/jpg-to-pdf) first, then compress.

## Keeping a lean file from the start

Prevention beats cure. If you regularly produce PDFs for uploading, small habits keep sizes down.

- Scan at a sensible resolution rather than the maximum available.
- Scan in black and white for text-only pages when colour is not needed.
- Export documents from your word processor as PDF, rather than scanning printouts.
- Avoid embedding unnecessary high-resolution images.

## Privacy

Compression runs in your browser, so the PDF stays on your device while it is processed. That is reassuring when the file is a passport scan, a payslip, or a medical form, which are exactly the kinds of documents that hit size limits.

## Frequently asked questions

### What is the fastest way to make a PDF smaller?

Remove pages you do not need, then run automatic compression at Medium. If that is not enough, try Express or a target file size.

### Can every PDF be compressed to any size?

No. Some files cannot reach very small targets without a large quality loss, especially multi-page scans.

### Will compression change how my document looks?

It can, mainly for photographs and scans. Text-only documents usually look the same. Always check the result.

### Does the tool upload my file?

No. Compression runs in your browser, so the file stays on your device.

### What size should I aim for?

A little below the stated limit. That leaves a safety margin for systems that measure size differently.

File size limits are an annoyance, but they are a solvable one. Find out what is making your file heavy, remove what you do not need, compress in sensible steps, and check the result. In a few minutes you will have a file that both fits the limit and stays readable.`,
    images: [
      { marker: 1, query: "email attachment upload error laptop" },
      { marker: 2, query: "filling online application form on laptop" },
    ],
  },
  {
    slug: "are-online-pdf-tools-safe",
    title: "Are Online PDF Tools Safe? How to Protect Your Documents",
    excerpt: "PDFs often hold IDs, contracts, and financial details. Here is how to tell which tools keep files on your device and how to protect sensitive documents.",
    seo_title: "Are Online PDF Tools Safe? A Practical Privacy Guide",
    seo_description: "Learn how online PDF tools handle your files, how to check whether a file is uploaded, and simple habits to protect sensitive documents.",
    category: "Privacy & Security",
    topic_cluster: "privacy",
    author: "OnlyPDF Team",
    related_slugs: ["how-to-merge-reorder-organize-pdf-files", "combine-pdf-files-without-adobe-acrobat", "how-to-compress-pdf-without-losing-quality"],
    featuredImageQuery: "padlock on laptop security",
    content: `# Are Online PDF Tools Safe? How to Protect Your Documents

Think about what tends to be inside a PDF: a scanned passport, a signed lease, a bank statement, a medical report, a tax return. These are some of the most sensitive files most people own, and yet they are also the files people most often paste into a free website to merge, compress, or convert. It is entirely reasonable to ask whether that is safe.

The honest answer is that it depends on how the tool works. This guide explains the two main designs, how to tell them apart, and what habits protect you whichever tool you use.

## Two very different ways a PDF tool can work

### Server-based tools

With a server-based tool, you upload your file to the company's computers. The work happens there, and the result comes back to you as a download. This design is common, and it is not inherently unsafe, but it means a copy of your document travels across the internet and sits, at least briefly, on someone else's machine. How long it stays, who can access it, and whether it is used for anything else depends entirely on that company's policies and security.

### Browser-based tools

With a browser-based tool, the page loads the processing code into your browser, and the work happens on your own device. The file does not need to be sent anywhere for the operation to succeed. This is how the tools on this site handle merging, splitting, compressing, rotating, and the other tasks. It shrinks the privacy question dramatically, because there is no uploaded copy to protect.

{{IMG:1}}

## Why it matters which design you use

The risk with an uploaded file is not that anything will definitely go wrong; it is that you lose control once the file leaves your device. Several things can happen to a copy on a server:

- It might be stored for longer than you expect, or never deleted.
- It could be exposed if the company suffers a data breach.
- It might be accessible to employees or contractors.
- Its content could be used for purposes you did not agree to, depending on the terms.

None of these risks apply in the same way when the work is done locally. For a document containing an identity number or account details, that difference is meaningful.

## How to check whether a tool uploads your file

You do not have to take a website's word for it. There are practical checks anyone can run.

### Read the privacy policy

A trustworthy tool says plainly what happens to your files. Look for statements about whether files are uploaded, how long they are kept, and whether they are deleted. Vague language is a warning sign. You can read how this site describes its approach on the [privacy policy page](/privacy).

### Try the offline test

This one is simple and convincing. Load the tool's page fully, then turn off your device's internet connection, for example by switching on airplane mode. Now try to use the tool on a file. If it still works, the processing is happening on your device. If it fails or hangs, the file was needed on a server. Note that a tool may legitimately need the internet for other features, so treat this as a strong hint rather than a formal audit, and always read the policy as well.

### Watch the network activity

If you are comfortable with browser developer tools, the network panel shows whether large uploads are sent when you process a file. This is optional, but it is the most direct evidence available.

:::highlight blue
A practical rule: for anything sensitive, prefer a tool that processes files on your device, and confirm it with the offline test before you rely on it.
:::

## Signs of a tool you should be careful with

- No privacy policy, or one that is hard to find or read.
- Demands for an account or email address just to convert one file.
- Vague claims of security with no explanation of what actually happens to files.
- Aggressive pop-ups, forced downloads, or requests to install software for a simple task.
- A file that must be emailed to you later as a link. That means it is stored on a server.

## Habits that protect you with any tool

Even the best tool cannot protect a file you carelessly share, so a few personal habits make the biggest difference.

- Share only what is needed. Before sending a document, [extract just the relevant pages](/tools/extract-pdf-pages) or [delete the ones you do not want to share](/tools/delete-pdf-pages).
- Keep originals private. Give the version you send a clear name, and keep the full original stored safely.
- Check what you are sending. Open the final file and read every page, including headers and footers.
- Avoid public computers for sensitive work. If you must use a shared device, delete downloaded files afterward and clear the browser's downloads list.
- Keep your device and browser updated. Security fixes matter more than any single website.
- Use a trusted network. Avoid handling sensitive documents on open public Wi-Fi where you can.

{{IMG:2}}

## What a watermark or edit does not do

A frequent misunderstanding is that editing a PDF makes hidden information disappear. Covering an area with a white box hides it visually, but it does not always remove what is underneath in every situation. If you are removing sensitive details rather than a watermark, do not assume a cover-up is the same as deletion. The safest approach is to leave sensitive pages out of the shared file altogether.

## Sensitive documents and what to do with them

:::highlight blue
Related guides: [cover vs redact](/blog/cover-vs-redact-pdf-hide-sensitive-information) and [what to do with a password-protected PDF](/blog/password-protected-pdf-what-to-do-first).
:::

### Identity documents

Passports, driving licences, and national ID cards should be shared only when required, and only in the form requested. If a form asks for a PDF of your ID, prepare it from a clear photo with the [JPG to PDF tool](/tools/jpg-to-pdf), send only the pages needed, and avoid emailing it to personal accounts when a secure upload portal is offered.

### Financial and medical records

These are best processed locally and shared through official channels wherever possible. Trim them to the necessary pages before sending.

### Contracts

Contracts often involve several parties. Merge and reorder pages on your own device, check the final copy carefully, and confirm the recipient before sending. The [merge PDF tool](/tools/merge-pdf) can assemble signed pages into one document without sending them anywhere first.

## Is anything ever uploaded?

:::highlight blue
Related guide: [What "processed in your browser" really means](/blog/what-processed-in-your-browser-really-means) explains what stays on your device and what does not.
:::

It is worth being precise. Some operations, in some tools, genuinely need a server, for example certain complex conversions that cannot run inside a browser. A responsible service tells you when that is the case. Read the privacy policy and the notes on each tool page so you know how a specific feature behaves, rather than assuming that everything on any site works the same way.

## A short checklist before you use any PDF tool

- Does it clearly say whether files are uploaded?
- Does the offline test suggest it works locally?
- Do I really need to share the whole document?
- Have I checked the result before sending it?
- Am I keeping my original safe?

## Frequently asked questions

### Are all free online PDF tools unsafe?

No. Many are legitimate. The difference is in how they handle your files, so check the policy and how the tool works before using it for sensitive documents.

### Is a browser-based tool completely risk-free?

It removes the risk of an uploaded copy, but you still need good habits: share only what is needed, keep originals secure, and use a trusted device.

### How can I tell whether my file left my device?

Use the offline test, read the privacy policy, and, if you are technical, watch the network panel in your browser's developer tools.

### Should I ever use a public computer?

Avoid it for sensitive documents. If unavoidable, remove downloaded files afterward.

### Does compressing or merging a PDF remove personal information?

No. Those operations change the file's size or structure, not what the pages say. Review the content before sharing.

Trust in a PDF tool should rest on evidence, not promises. Choose tools that keep files on your device, verify that with a two-minute test, and combine that with careful sharing habits. Your documents will be far safer, and you will still get the convenience of working in a browser.`,
    images: [
      { marker: 1, query: "person working securely on laptop at desk" },
      { marker: 2, query: "shredding confidential documents office" },
    ],
  },
  {
    slug: "phone-scan-to-pdf-workflow",
    title: "From Phone Photo to Perfect PDF: A Step-by-Step Scanning Workflow",
    excerpt: "You do not need a scanner. Turn phone photos of paperwork into a clean, ordered, correctly sized PDF in six simple steps.",
    seo_title: "Scan Documents With Your Phone: Photo to Perfect PDF",
    seo_description: "A complete workflow for turning phone photos of documents into one tidy PDF: shoot, convert, rotate, reorder, compress, and check.",
    category: "Convert to PDF",
    topic_cluster: "convert-to-pdf",
    author: "OnlyPDF Team",
    related_slugs: ["convert-scanned-image-to-pdf-admission-form", "merge-pdf-files-in-order-on-phone", "compress-pdf-for-job-application"],
    featuredImageQuery: "scanning paper document using phone camera",
    content: `# From Phone Photo to Perfect PDF: A Step-by-Step Scanning Workflow

A dedicated scanner is a wonderful thing, but most people do not own one, and almost everyone owns a phone with a very good camera. With a sensible routine, phone photos can become clean, professional-looking PDFs that pass the checks of application portals, banks, and offices. The trick is not any single tool; it is doing the steps in the right order.

This guide lays out a six-step workflow: shoot, convert, rotate, reorder, compress, and check. It uses the [JPG to PDF](/tools/jpg-to-pdf), [rotate PDF](/tools/rotate-pdf), [rearrange PDF](/tools/rearrange-pdf), and [compress PDF](/tools/compress-pdf) tools, all of which run in your browser.

## Why a workflow beats improvising

Most poor results come from doing things in a muddled order: compressing before fixing rotation, merging before checking readability, or discovering the wrong page order after the file has been sent. A fixed sequence avoids rework. Each step fixes one kind of problem, and later steps assume the earlier ones are done.

{{IMG:1}}

## Step 1: Shoot clean photos

Everything downstream depends on the quality of your pictures, and it is much easier to take a good photo than to rescue a bad one.

- Use even light. Daylight from a window works well. Avoid a strong lamp that creates a hot spot.
- Prevent shadows. Do not let your phone or hand cast a shadow over the page.
- Hold the phone directly above the paper, parallel to the surface, so the page is not skewed.
- Put the page on a plain, contrasting surface, such as a dark table under white paper.
- Fill the frame with the page, but keep all four edges visible.
- Tap the screen to focus on the text and wait for it to sharpen before shooting.
- Turn off flash on glossy paper to avoid glare.

Take one photo per page, in reading order. Photographing in order is the single best way to avoid ordering problems later.

## Step 2: Check your photos before moving on

Open each picture at full size and zoom in on the smallest text. If any word is blurry or cut off, retake it now. It takes seconds at this point and is far more annoying to fix after you have built and sent a PDF. Delete duplicates and test shots so only the pages you need remain.

## Step 3: Convert the photos to a PDF

Open the [JPG to PDF tool](/tools/jpg-to-pdf), add your photos, and arrange them in order. The important choice is page size.

- Choose A4 or US Letter for forms, certificates, and official documents. The image is centred on a standard page, which is what most portals expect.
- Choose fit to image only when the pictures are the content, such as photos you want preserved exactly.

Convert and download. Because the tool places your image data into the PDF as it is, the PDF looks as good as the photos you took. For more detail on page sizes and image order, see our [complete guide to JPG to PDF](/blog/jpg-to-pdf-complete-guide).

## Step 4: Fix rotation

Phones sometimes save a photo with an orientation flag instead of physically turning it, and different programs treat that flag differently. The result is that some pages can end up sideways in the PDF even though they looked upright on your phone.

Scroll through the PDF. If any page is sideways or upside down, open the [rotate PDF tool](/tools/rotate-pdf), select those pages, and turn them. An upside-down page needs two 90-degree turns in the same direction. Download the corrected file. Rotation only changes orientation; it does not affect quality.

:::highlight green
Tip: check the first and last pages carefully. They are the ones most often skipped when scanning quickly, and the ones a reviewer looks at first.
:::

## Step 5: Fix page order

:::highlight blue
Related guide: if one photo turned out badly, [how to replace a page in a PDF](/blog/replace-a-page-in-a-pdf) swaps in a retake without rebuilding the whole file.
:::

If you photographed in order, this step may be unnecessary, but it is worth a quick look. Open the [rearrange PDF tool](/tools/rearrange-pdf) if any page is out of place. Drag thumbnails into position, or use the arrow buttons on each page, which are often more precise on a small touchscreen. There is also a rotate button on each thumbnail, so you can fix a sideways page and reposition it in one pass.

Need to bring in pages from other files? Combine them using the [merge PDF tool](/tools/merge-pdf), and read our guide on [merging PDFs in order on a phone](/blog/merge-pdf-files-in-order-on-phone) for a mobile-friendly approach.

{{IMG:2}}

## Step 6: Compress if needed, then check

Phone photos are large, and a PDF made from a dozen of them can easily be many megabytes. If the file is going somewhere with a size limit, compress it now, not earlier, so that rotation and ordering happen on the full-quality version.

Open the [compress PDF tool](/tools/compress-pdf) and choose an automatic level, or use target file size if you know the limit. Medium is a sensible starting point. Then open the result and zoom in on the smallest text. If it is still readable at normal zoom, you are done. If not, go back to the uncompressed file and choose a gentler level.

Our guide to [meeting PDF file size limits](/blog/pdf-file-size-limits-and-how-to-meet-them) explains how to approach very tight limits.

## The final check: a two-minute review

Before sending, do a last read-through.

- Page count. Does it match the number of pages you expect?
- Order. Do the pages read correctly from first to last?
- Orientation. Is every page upright?
- Readability. Can you read the smallest text at normal zoom?
- Completeness. Are all edges of each page visible and nothing cut off?
- File name. Does it clearly say what the document is?
- Size. Is it under any limit that applies?

## Special cases

:::highlight blue
Related guides: [how to remove blank pages from a scanned PDF](/blog/remove-blank-pages-from-scanned-pdf) and [how to use PDF tools on your phone](/blog/use-pdf-tools-on-phone-complete-guide).
:::

### Multi-page forms with signatures

Sign the paper first, photograph the signed pages in order, and convert. If a signature page is scanned separately, add it to the right position afterwards using the rearrange tool.

### Identity documents

Photograph both sides if required, in the order the recipient expects. Include only what is asked for. Keep the originals safe, and if a portal offers a secure upload, use it in preference to email.

### Receipts and small pieces of paper

Place them on a plain background, one per photo, or lay several out clearly if separate images are not needed. Choose fit to image so nothing is padded or cropped in a way that hides detail.

### Book pages and thick documents

Press the pages flat, avoid the curved spine shadow, and shoot straight down. If a page still looks curved, retake it from directly above.

## Mistakes worth avoiding

- Shooting at an angle, which skews text and makes the page look trapezoid.
- Compressing too early, which can lock in lower quality before you have finished editing.
- Skipping the zoom check on readability.
- Forgetting the order until after sending.
- Mixing portrait and landscape pages without checking the result.
- Sending the wrong file because several similar versions exist on your phone.

## A note on privacy

Paperwork tends to be personal: IDs, statements, medical letters. The tools above run in your browser, so your photos and the resulting PDF are processed on your own device rather than being sent to a server first. It is still wise to delete leftover copies from shared devices, and to send documents only through channels you trust. Our privacy overview, [are online PDF tools safe?](/blog/are-online-pdf-tools-safe), explains how to check this yourself.

## Frequently asked questions

### Do I need a scanning app?

Not necessarily. A good photo taken with your normal camera is enough for most purposes, and the workflow above turns it into a proper PDF. Scanning apps can help with edge detection, but they are optional.

### Will the text in my PDF be searchable?

No. The pages are pictures, so the text cannot be selected or searched. That requires OCR, which is a separate kind of software.

### What page size should I use?

Use A4 or US Letter for official documents, depending on where they are going. Use fit to image when the picture itself is the content.

### How can I keep the file small?

Photograph clearly but do not use unnecessarily huge resolution, remove unneeded pages, and compress at the end.

### What if a page is sideways?

Use the rotate tool, then check every page again before sending.

A phone, a window, and a few minutes are all you need. Shoot carefully, convert, fix rotation, fix order, compress only at the end, and check before you send. Follow that order every time and your phone-made PDFs will look as good as anything from a scanner.`,
    images: [
      { marker: 1, query: "smartphone photographing paper on desk near window" },
      { marker: 2, query: "organized documents and laptop on desk" },
    ],
  },
];
