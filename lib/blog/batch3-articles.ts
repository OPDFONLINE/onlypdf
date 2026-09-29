import type { Batch1Article } from "@/lib/blog/batch1-articles";

// Batch 3: supporting articles for the tools batches 1-2 did not cover yet
// (rotate, rearrange, delete pages, PDF to JPG/PNG, PDF to Word, watermark).
// {{IMG:n}} placeholders are resolved by /api/admin/blog/illustrate?slug=...
export type Batch3Article = Batch1Article;

export const batch3Articles: Batch3Article[] = [
  {
    slug: "rotate-pdf-pages-permanently",
    title: "How to Rotate PDF Pages Permanently (Not Just in Your Viewer)",
    excerpt: "Turning a page in your PDF reader only changes what you see. Here is how to rotate pages and save the corrected file so it opens right for everyone.",
    seo_title: "How to Rotate PDF Pages Permanently and Save the File",
    seo_description: "Rotate one page or a whole PDF and save the change for good. Free, in your browser, no software install and no account.",
    category: "Organize PDF",
    topic_cluster: "merge-organize",
    author: "OnlyPDF Team",
    related_slugs: ["fix-sideways-scanned-pdf", "how-to-merge-reorder-organize-pdf-files"],
    featuredImageQuery: "rotating document page",
    content: `# How to Rotate PDF Pages Permanently (Not Just in Your Viewer)

Almost every PDF reader has a rotate button, and almost every time it disappoints in the same way: you turn the page, read it comfortably, close the file, and the next person who opens it sees the page sideways again. That is because the viewer only changes how the page is displayed to you. The file itself never changed. To fix the problem for everyone, the rotation has to be saved into the PDF.

A [rotate PDF tool](/tools/rotate-pdf) does exactly that: it applies the rotation to the pages you choose and gives you a new, corrected file to download.

## View rotation versus saved rotation

The difference is easy to miss, so it helps to spell it out:

- View rotation lives in your reader's memory for that session. Send the file to a colleague and it arrives exactly as it was.
- Saved rotation is written into the PDF's page settings. Every reader, on every device, shows the page the right way up.

If a document is going to be emailed, uploaded to an application portal, or printed, saved rotation is the only kind that counts.

{{IMG:1}}

## Rotating pages step by step

- Upload your PDF to the rotate tool and wait for the page previews to appear.
- Select the pages that need turning, or choose all pages if the whole document is sideways.
- Pick 90 degrees clockwise or counterclockwise.
- Apply the change and download the corrected PDF.

The tool works on the pages you select, so a single flipped page in the middle of a long document does not force you to rotate everything else.

:::highlight blue
Not sure which direction to choose? Look at the top of the text. If it points left, rotate clockwise. If it points right, rotate counterclockwise. Two taps at most gets any page upright.
:::

## Does rotating hurt quality?

No. Rotation only changes the orientation of a page. Text stays as sharp as it was, images keep their resolution, and the file is not re-compressed. There is nothing to lose because nothing about the content is being redrawn.

## Mixed orientations inside one document

Real documents often mix portrait and landscape pages on purpose: a wide spreadsheet printout inside an otherwise upright report, for example. Rotating everything would break the pages that were already correct. Selecting only the pages that need it keeps the intentional landscape pages untouched.

{{IMG:2}}

## When rotation is not the right fix

If pages are out of order rather than sideways, use a [page rearranging tool](/tools/rearrange-pdf) instead. If a scan contains extra pages you do not want, [delete them](/tools/delete-pdf-pages) first, then rotate what is left. Handling problems one at a time, with the tool built for each, is faster than looking for a single editor that does everything.

## Privacy note

Rotation runs in your browser, so the document is processed on your own device rather than being sent to a server. That matters for scanned IDs, contracts, and medical paperwork.

## A few real-world situations

Job applications. Portals often reject or mangle files with sideways pages, and a reviewer will not tilt their head to read your certificate. Rotate first, upload second.

Printing. A page that looks fine on screen because your viewer auto-rotated it will still print sideways, since the printer reads the saved orientation. Saving the rotation avoids wasted paper.

Sharing with a team. If five people each rotate the same page in their own viewer, that is five small chores. One saved fix removes all of them.

## A short pre-send routine

- Rotate what is wrong and download the new file.
- Open the new file in a different viewer or on your phone, which confirms the rotation was saved rather than just displayed.
- Rename the file so the corrected version is easy to tell apart from the original, for example by adding "-fixed" to the name.

## Frequently asked questions

### Can I rotate only one page?

Yes. Select just that page in the preview, choose a direction, and apply. Every other page stays exactly as it was.

### Will the rotated PDF open correctly on my phone?

Yes. Because the rotation is saved in the file, phones, tablets, and desktop readers all show the corrected orientation.

### Can I undo a rotation?

Your original file is never changed. If you rotated the wrong way, run the tool again on the original file or rotate the new file back in the opposite direction.

Saving the rotation takes under a minute, and it means the next person to open the file never has to tilt their head.`,
    images: [
      { marker: 1, query: "person reading paper document at desk" },
      { marker: 2, query: "landscape and portrait documents" },
    ],
  },
  {
    slug: "fix-sideways-scanned-pdf",
    title: "How to Fix a Sideways or Upside-Down Scanned PDF",
    excerpt: "A scan that comes out rotated is one of the most common document annoyances. Fix it in seconds without scanning anything again.",
    seo_title: "How to Fix a Sideways or Upside-Down Scanned PDF",
    seo_description: "Straighten a sideways or upside-down scanned PDF without rescanning. Rotate single pages or the whole file for free in your browser.",
    category: "Organize PDF",
    topic_cluster: "merge-organize",
    author: "OnlyPDF Team",
    related_slugs: ["rotate-pdf-pages-permanently", "how-to-merge-reorder-organize-pdf-files"],
    featuredImageQuery: "scanning documents on office scanner",
    content: `# How to Fix a Sideways or Upside-Down Scanned PDF

You scan a stack of paper, open the result, and half the pages are lying on their side. Or the whole file is upside down. Before you dig out the paperwork and start again, know that this is one of the quickest problems in document handling to fix, and it does not need a re-scan.

## Why scans come out rotated

Three habits cause almost every case:

- Feeder direction. Automatic document feeders pull paper in a fixed direction. Landscape pages fed as portrait, or the reverse, come out turned.
- Phone scanning apps. These guess the page orientation from the photo. If the phone was held sideways, the guess is wrong.
- Mixed stacks. A pile containing both portrait letters and landscape forms almost always has a few pages that end up the wrong way round.

None of this is damage. The content of each page is intact; only its orientation is off.

{{IMG:1}}

## The fast fix

- Open the [rotate PDF tool](/tools/rotate-pdf) and upload the scanned file.
- Look through the previews and select the pages that are sideways or upside down.
- Rotate them 90 degrees clockwise or counterclockwise. For an upside-down page, apply the rotation twice.
- Download the corrected file.

If every page has the same problem, choose all pages and rotate once. If only a few pages are wrong, select just those.

## Upside-down pages

A page that is upside down needs a half turn, which is two 90-degree rotations in the same direction. It does not matter whether you go clockwise or counterclockwise, since the result is the same.

## Fixing rotation and order at the same time

Scans that are rotated are often also in the wrong order, particularly when pages were fed in several batches. The [rearrange PDF tool](/tools/rearrange-pdf) has a rotate button on every page thumbnail, so you can turn a page and move it into place in one pass.

{{IMG:2}}

## Check before you send

Scroll through the corrected file once before sharing it. It takes a few seconds and catches the one page you missed. Pay attention to the first and last pages, since those are the ones most often skipped when checking quickly.

## Prevent it next time

- Feed paper the same direction every time, and keep landscape pages in a separate batch.
- When scanning with a phone, hold it above the page in the same orientation as the paper.
- Scan a page at a time if you are combining documents of different sizes, then [merge the files](/tools/merge-pdf) afterward.

## Phone scans in particular

Scanning apps often save each photo with an orientation flag instead of physically turning the image. Some readers respect that flag and others ignore it, which is why a scan can look correct on your phone and sideways on a computer. Rotating and saving the PDF settles the question, because the page orientation is then written into the file itself.

## A worked example

Imagine a twelve-page application packet in which pages 3, 4 and 9 are sideways and page 12 is upside down. The efficient sequence is to rotate pages 3, 4 and 9 clockwise together, then rotate page 12 twice, then download once. That is two operations for four problem pages, rather than four separate fixes. Grouping pages that need the same rotation is the main time saver.

## Signs a page needs rotating

- The text runs vertically down the page instead of across it.
- Page numbers or letterheads appear on a side edge.
- The preview thumbnail is wider than it is tall while its neighbours are not, and it should not be.

Checking thumbnails for those three signs takes about ten seconds even for a long file.

## Quick answers to common worries

If you are afraid of making things worse, remember that every operation produces a new file and leaves your original alone. You can experiment freely: rotate, download, look, and if the result is wrong, go back and try again from the untouched scan.

## Frequently asked questions

### Will the text still be searchable after rotating?

Rotation does not add or remove text. If the scan was a plain image before, it stays an image; if it already had a text layer, that layer is kept and turns with the page.

### Do I have to rotate the whole document?

No. Select only the pages that are wrong and leave the rest as they are.

### Is the scanned file uploaded anywhere?

The tool runs in your browser, so the file stays on your device while it is being processed.

Fixing a rotated scan is a two-minute job, and it is always faster than re-scanning the stack.`,
    images: [
      { marker: 1, query: "stack of papers next to scanner" },
      { marker: 2, query: "organizing paperwork folders desk" },
    ],
  },
  {
    slug: "rearrange-pdf-pages-online",
    title: "How to Rearrange PDF Pages Online Without Installing Software",
    excerpt: "Drag pages into the right order, fix a sideways page along the way, and download the reordered file. No account, no install.",
    seo_title: "How to Rearrange PDF Pages Online for Free",
    seo_description: "Reorder pages in a PDF by dragging thumbnails. Free, private, works in your browser on desktop and phone.",
    category: "Organize PDF",
    topic_cluster: "merge-organize",
    author: "OnlyPDF Team",
    related_slugs: ["how-to-merge-reorder-organize-pdf-files", "rotate-pdf-pages-permanently"],
    featuredImageQuery: "arranging pages in order on table",
    content: `# How to Rearrange PDF Pages Online Without Installing Software

A PDF with its pages in the wrong order is more common than it sounds. A contract gets signed in two sessions and the signature page lands at the front. A scanned booklet comes out with the cover at the end. A report needs one section moved before another. The fix is simple, and it does not require a full PDF editor.

## What a page rearranging tool does

It shows every page of the document as a thumbnail and lets you change their sequence. Only the order changes. Text, images, fonts, and formatting inside each page stay exactly as they were.

## Step by step

- Upload the PDF to the [rearrange PDF tool](/tools/rearrange-pdf).
- Wait for the page thumbnails to load.
- Drag a thumbnail to its new position, or use the arrow buttons on each page to move it one place at a time.
- If a page is sideways or upside down, use the rotate button on that page.
- Select Apply new order and download the result.

{{IMG:1}}

## Dragging versus arrow buttons

Dragging is quickest on a computer, especially for moving a page a long way. On a phone or tablet, the arrow buttons are usually more precise, because a finger can easily drop a thumbnail one slot off. Both do the same job, so use whichever is comfortable.

## Plan the order before you start

For longer documents, a quick plan saves fiddling:

- Note which pages need to move and where they should go.
- Move the furthest-travelling pages first.
- Scroll through the whole preview once at the end before applying.

:::highlight green
Page numbers printed on the pages themselves do not change when you reorder. Only the position in the file changes, so a page labelled 7 will still say 7 wherever it ends up.
:::

## Rearranging versus other tools

Different problems need different tools:

- Pages in the wrong order: rearrange.
- Unwanted pages: [delete them](/tools/delete-pdf-pages).
- Only some pages needed in a new file: [extract them](/tools/extract-pdf-pages).
- Several files that must become one: [merge them](/tools/merge-pdf).

{{IMG:2}}

## Common scenarios

Signed contracts. Move the signature page to the end where it belongs.

Scanned booklets. Cover first, back page last, everything in between in reading order.

Application packets. Many portals expect documents in a specific sequence. Arrange them first, then upload one tidy file.

## Working through a long document

For a document with dozens of pages, dragging every thumbnail is tedious. A calmer approach is to treat the job in passes. First move the pages that are furthest from where they belong, since those are the ones that cause the most confusion. Then work through smaller adjustments from the front of the file to the back, so that once the beginning is correct you can stop thinking about it.

## Common mistakes

- Applying too early. It is easy to press apply before scrolling through the preview. A quick final pass catches a page dropped one slot off.
- Expecting page numbers to update. Numbers printed on pages stay as they are, so a reordered document may show numbers out of sequence. That is normal, and it is worth telling recipients if it matters.
- Reordering when merging would do. If your pages come from separate files, [merge them](/tools/merge-pdf) in the right order rather than combining first and rearranging afterward.

## A simple example

Suppose a six-page contract arrives with the signature page first, the terms in the middle, and the cover page last. Three moves fix it: cover to the front, signature page to the end, terms into the middle in reading order. Since pages are only being repositioned, the whole job takes about a minute, and the finished document reads the way the author intended.

## Sharing the result

Once the pages are in order, consider giving the file a clear name that includes the word final, so nobody accidentally circulates the earlier, jumbled version. If the file is also large, run it through the [compress PDF tool](/tools/compress-pdf) before sending it by email.

## Frequently asked questions

### Can I move several pages at once?

Move them one at a time. For large restructures, it is often faster to extract the pages you want into a new file and merge the pieces in the right order.

### Does rearranging change the file size?

Not meaningfully. The same pages are stored in a different sequence, so the size stays about the same.

### Will bookmarks or links still work?

Simple documents are unaffected. If your PDF relies on complex internal navigation, open the result and check that it still behaves the way you expect.

Reordering takes a couple of minutes, and the result reads the way the document was always meant to.`,
    images: [
      { marker: 1, query: "sorting printed pages into order" },
      { marker: 2, query: "signing contract documents desk" },
    ],
  },
  {
    slug: "delete-pages-from-pdf-free",
    title: "How to Delete Pages From a PDF for Free",
    excerpt: "Remove cover pages, blanks, or anything you do not want to share, and keep the rest of the document untouched.",
    seo_title: "How to Delete Pages From a PDF for Free (No Software)",
    seo_description: "Delete unwanted pages from a PDF in your browser. Tap the pages, remove them, download the clean file. Free and private.",
    category: "Edit PDF",
    topic_cluster: "split-pdf",
    author: "OnlyPDF Team",
    related_slugs: ["extract-one-page-from-pdf", "split-pdf-into-individual-pages"],
    featuredImageQuery: "removing pages from document",
    content: `# How to Delete Pages From a PDF for Free

Sooner or later most PDFs have a page you do not want in them: a fax cover sheet, a blank back page, an internal note, or a page containing details you would rather not share. Deleting it should not need a paid editor. In a browser it takes a few taps.

## The quick method

- Upload the PDF to the [delete PDF pages tool](/tools/delete-pdf-pages).
- Tap the page numbers you want to remove.
- Select Delete PDF Pages.
- Download the cleaned-up file.

You can remove as many pages as you like, as long as at least one page stays in the document.

{{IMG:1}}

## Your original is safe

Deleting pages creates a new file. The PDF you uploaded is not changed, so if you pick the wrong page you can simply start again from the original.

## When to delete pages

- Before sending a document externally. Remove internal cover notes, draft pages, or anything not meant for the recipient.
- After scanning. Blank versos and stray pages from the feeder are easy to spot in the thumbnails.
- To shrink a document. Fewer pages means a smaller file, which helps when there is an upload or email size limit. For more reduction, [compress the PDF](/tools/compress-pdf) afterward.

## Delete or extract?

The two tools are mirror images:

| Situation | Best tool |
| --- | --- |
| Most pages are wanted, a few are not | Delete pages |
| Only a few pages are wanted | Extract pages |
| Every page needs to become its own file | Split PDF |

Pick whichever needs fewer taps. Removing two pages from a hundred-page file is a delete job; keeping two pages from a hundred is an extract job.

{{IMG:2}}

## A note on sensitive information

Deleting a page removes it from the new file you download, which is what you want when sharing a copy. Keep in mind that the original file still contains that page, so do not send the original by mistake. Check the pages of the new file before sharing anything confidential.

## Working on a phone

The page picker is designed for taps, so it works well on a phone. Zoom out in the preview if the page numbers are small, and confirm your selection before applying.

## A quick checklist before you share

Deleting is easy, so it is worth building a small habit around it:

- Open the new file and check the page count matches what you expected.
- Read the first and last pages, since those are the ones most likely to hold something you meant to remove.
- Search the file for names, numbers, or phrases you wanted gone, if your viewer has a search function.
- Name the new file clearly, so the cleaned copy is never confused with the original.

## Typical examples

A landlord sends a lease with a template instruction page at the front; you remove it before sending the signed copy back. A student exports lecture slides with a blank page between every slide; the blanks go before printing. A freelancer's invoice bundle includes a draft page that should never reach the client. In each case the fix takes less time than writing the email that explains the problem.

## Deleting pages from long documents

With a long document, resist the urge to tap pages from memory. Scroll through the thumbnails from beginning to end, tap what should go, and then review your selection once more before applying. A slow, deliberate pass is faster than repairing a mistake, because a wrong deletion means starting the whole job again from the original. If you are removing pages in several places, write down the page numbers first so you can check them against the tool.

## After deleting

When the new file is ready, open it and confirm the page count looks right, then read the pages on either side of each removed section to be sure the document still flows. If you used deletion to trim a file for an upload limit and it is still too big, [compress it](/tools/compress-pdf) as a final step.

## Frequently asked questions

### Can I delete every page?

No. At least one page must remain, since a PDF cannot be empty.

### Will deleting pages change the remaining pages?

No. The pages you keep are unchanged, and they keep their original order.

### Is there a page limit?

The tool works in your browser, so very large files depend on your device's memory. If a file is very large and your browser struggles, close other tabs and try again, or work on a device with more memory.

Removing the pages you do not need is one of the fastest ways to make a document tidier and safer to share.`,
    images: [
      { marker: 1, query: "sorting through paper pages" },
      { marker: 2, query: "reviewing confidential documents" },
    ],
  },
  {
    slug: "remove-blank-pages-from-scanned-pdf",
    title: "How to Remove Blank and Unwanted Pages From a Scanned PDF",
    excerpt: "Double-sided scanning leaves blank pages behind. Here is how to spot them and clear them out in a couple of minutes.",
    seo_title: "How to Remove Blank Pages From a Scanned PDF",
    seo_description: "Spot and remove blank or stray pages from a scanned PDF using page previews. Free, in your browser, nothing to install.",
    category: "Edit PDF",
    topic_cluster: "split-pdf",
    author: "OnlyPDF Team",
    related_slugs: ["delete-pages-from-pdf-free", "how-to-merge-reorder-organize-pdf-files"],
    featuredImageQuery: "scanned pages stack office",
    content: `# How to Remove Blank and Unwanted Pages From a Scanned PDF

Scan a stack of double-sided paper on a scanner set to duplex, and you will usually get a blank page after every sheet that was printed on one side only. Add a stray page from the feeder, a cover sheet, or a page scanned twice, and a tidy ten-page document turns into twenty. Cleaning that up takes only a few minutes.

## How blank pages get in

- Duplex scanning. The scanner captures both sides of every sheet, including the empty ones.
- Double feeds and rescans. A page that jammed and was scanned again shows up twice.
- Separator sheets. Cover pages or dividers used to organise the paper stack come along for the ride.

{{IMG:1}}

## Finding the pages

This is manual work, but the previews make it fast. Open the [delete PDF pages tool](/tools/delete-pdf-pages), upload the file, and scan the thumbnails. Blank pages stand out as white rectangles. Note that a page that looks empty may contain a faint scanner shadow or a small footer, so check anything you are unsure about before removing it.

## The cleanup

- Tap every blank or unwanted page in the preview.
- Take a second look through your selection to make sure no real content is included.
- Apply the deletion and download the new file.

The tool does not guess which pages are empty for you. You decide, which is safer for documents where a nearly blank page, such as one that says "This page intentionally left blank", might matter.

:::highlight orange
If a page has only a page number or a light watermark, it may look blank at thumbnail size. Zoom in or check the neighbouring pages before deleting it.
:::

## Tidy the rest while you are there

Once the extra pages are gone, a couple of follow-up fixes are usually worth doing:

- [Rotate](/tools/rotate-pdf) any pages that came out sideways.
- [Rearrange](/tools/rearrange-pdf) pages that were fed out of order.
- [Compress](/tools/compress-pdf) the file if it is still too large to email.

{{IMG:2}}

## Scan more cleanly next time

- Turn off duplex scanning for one-sided originals.
- Keep the stack squared and free of staples and clips so the feeder does not double-feed.
- Remove separator sheets before scanning.

## How many pages to expect

A stack of sheets scanned duplex produces exactly twice as many pages as sheets. If half of the originals were printed on one side only, roughly a quarter of the resulting pages will be blank. Knowing this helps you sanity-check the result: if a fifty-sheet stack gave you one hundred pages, and the previews show a blank on every second sheet, the count adds up.

## Cleaning a large scan efficiently

- Scroll through the thumbnails in order rather than jumping around.
- Move down the list in order, tapping each blank as you see it.
- Do not deselect and reselect repeatedly; make one deliberate pass, then one review pass.

For a very large scan, work in short stretches and take a break between passes, since spotting blanks gets harder the longer you look. Note that the [split PDF tool](/tools/split-pdf) turns every page into its own file, so it is not the right way to cut a document into sections.

## Why blank pages are worth removing

Blank pages are more than a cosmetic nuisance. They waste paper when the document is printed, they make a file larger than it needs to be, and they make readers wonder whether something is missing. In application portals with page limits, a few blanks can push a document over the allowed count. Spending two minutes removing them makes the file smaller, cheaper to print, and easier to read.

## Keep a clean master

After cleaning, save the tidy version as your master copy and archive the raw scan separately if you need to keep it. Working from one clean file means the next person to print, share, or convert the document never has to repeat the cleanup, and there is no risk of the blank-filled version being sent by mistake. A clear file name makes the difference obvious at a glance.

## Frequently asked questions

### Can the tool remove blank pages automatically?

No. You choose which pages to remove from the previews, so nothing is deleted without your say-so.

### Will removing pages affect the text in the others?

No. The remaining pages are unchanged.

### What if I delete the wrong page?

Your original file is untouched. Go back to it and run the tool again with the right selection.

A minute of checking thumbnails is all it takes to turn an untidy scan into a clean document.`,
    images: [
      { marker: 1, query: "blank white paper sheets" },
      { marker: 2, query: "organized clean desk documents" },
    ],
  },
  {
    slug: "convert-pdf-to-jpg-pages",
    title: "How to Convert PDF Pages to JPG Images (One Page or All of Them)",
    excerpt: "Turn any page of a PDF into a JPG or PNG you can post, embed, or send. Convert a single page or the whole document.",
    seo_title: "How to Convert PDF Pages to JPG Images for Free",
    seo_description: "Convert one page or every page of a PDF into JPG or PNG images in your browser. Multiple pages download as a single ZIP file.",
    category: "Convert from PDF",
    topic_cluster: "convert-from-pdf",
    author: "OnlyPDF Team",
    related_slugs: ["pdf-to-png-or-jpg-which-format", "how-to-convert-pdf-to-word-or-images"],
    featuredImageQuery: "photo gallery images on screen",
    content: `# How to Convert PDF Pages to JPG Images (One Page or All of Them)

A PDF is great for sharing a document, but sometimes you need a picture instead: a single page for a presentation slide, a flyer for social media, a certificate for a website, or a screenshot-quality image of a chart. Converting PDF pages to JPG turns each page into a standard image that works almost everywhere.

## The steps

- Upload your PDF to the [PDF to JPG tool](/tools/pdf-to-jpg).
- Choose the pages to convert. Every page is selected by default; tap a thumbnail to leave a page out, or use Select all and Clear selection.
- Choose JPG or PNG as the output format.
- Select Convert and download the result.

One page gives you a single image. Several pages are bundled into one ZIP file, so you do not have to download images one by one.

{{IMG:1}}

## Converting only what you need

For a long document, converting every page just to use one is wasteful. Clear the selection, tap the one page you want, and convert. You get a single clean image instead of a ZIP full of files you will never open.

## Where page images are useful

- Presentations. Drop a page into a slide as a picture.
- Websites and social posts. Images display everywhere; PDFs often do not.
- Messaging apps. A JPG opens instantly in a chat, while a PDF needs an extra tap.
- Design mockups. Use a page as a reference image.

:::highlight purple
The image is a picture of the page. Text in it is no longer selectable or searchable, so keep the original PDF if you might need the text later.
:::

## Getting a sharp result

A few habits keep the images crisp:

- Start from the original PDF, not a screenshot of it.
- Use PNG for pages with fine text or line art, since it keeps edges clean.
- Use JPG for photo-heavy pages, since the files are smaller.

## Going the other way

If you later need to turn images back into a document, the [JPG to PDF tool](/tools/jpg-to-pdf) combines them into one PDF, and you can choose fit-to-image, A4, or US Letter page sizes.

{{IMG:2}}

## Privacy

The conversion runs in your browser, so your document is processed on your own device rather than being sent to a server first.

## Choosing the right pages first

Before converting, decide what the images are for. A single page for a presentation needs just that page. A set of pages for a slideshow needs them in order. If pages are in the wrong sequence, [rearrange the PDF](/tools/rearrange-pdf) first, because the images are numbered in page order and reordering afterward means renaming files by hand.

## Sizes and sharing

Images made from full pages can be large, especially as PNG. If you plan to post them online or send them in a chat, JPG keeps the files small enough to load quickly. If the receiving service has a strict limit, convert to JPG and check the size before uploading. When you are handling many pages, the ZIP download saves you from opening each file individually and keeps them together in one folder.

## Naming and organising the images

When you convert several pages, the images come in page order inside the ZIP. Extract the ZIP into a new folder straight away and give the folder a descriptive name, such as the document title with the word pages added. Keeping images together with the source PDF in one place makes it far easier to find them again months later, and it prevents you from confusing pages of one document with another.

## When an image is the wrong choice

Images are ideal for showing a page, but they are a poor choice when readers need to search, copy, or edit text, or when accessibility matters. A screen reader cannot read text that has become part of a picture. If your goal is to share a document that people will actually read closely, keep it as a PDF and reserve images for previews, slides, and social posts, where the look of the page matters more than its text.

## Frequently asked questions

### Can I convert a password-protected PDF?

Open a copy that you are allowed to access without the password first. If a document is protected, you will need to remove the protection using the password before converting.

### How many pages can I convert at once?

You can select as many as you like; the practical limit is your device's memory for very large files.

### Do the images keep the page layout?

Yes. Each image shows the page as it looks in the PDF, including fonts, images, and layout.

Converting a page to an image takes seconds, and it makes any document easy to drop into places PDFs do not fit.`,
    images: [
      { marker: 1, query: "presentation slides on laptop" },
      { marker: 2, query: "social media graphics on phone" },
    ],
  },
  {
    slug: "pdf-to-png-or-jpg-which-format",
    title: "PDF to PNG or JPG: Which Image Format Should You Choose?",
    excerpt: "Both formats turn a PDF page into an image, but they suit different pages. Here is how to choose in ten seconds.",
    seo_title: "PDF to PNG or JPG: Which Format Is Better?",
    seo_description: "Should you convert a PDF to PNG or JPG? Compare quality, file size, and best uses so you pick the right image format every time.",
    category: "Convert from PDF",
    topic_cluster: "convert-from-pdf",
    author: "OnlyPDF Team",
    related_slugs: ["convert-pdf-to-jpg-pages", "how-to-convert-pdf-to-word-or-images"],
    featuredImageQuery: "comparing two images side by side",
    content: `# PDF to PNG or JPG: Which Image Format Should You Choose?

When you convert a PDF page to an image, one of the first choices is the format. JPG and PNG both work, and both are supported everywhere, but they are good at different things. Choosing well means a sharper image or a smaller file, sometimes both.

## The short answer

- Choose JPG for pages with photos, or when file size matters most.
- Choose PNG for pages with fine text, charts, line art, or anything with transparency.

If you are unsure, convert one page both ways and compare. The [PDF to JPG tool](/tools/pdf-to-jpg) offers both formats.

{{IMG:1}}

## How they differ

| Feature | JPG | PNG |
| --- | --- | --- |
| Best for | Photos and colour-rich pages | Text, diagrams, line art |
| File size | Smaller | Larger |
| Edge sharpness | Can soften thin lines | Stays crisp |
| Transparency | No | Yes |

The reason is how each format stores the picture. JPG discards a little detail to make files small, which is barely visible in a photograph but can leave faint fuzz around small text. PNG keeps every pixel exactly, so text edges stay clean, at the cost of a bigger file.

## Choosing by type of page

Text documents and reports. PNG keeps small type readable. If size is a concern, JPG is usually fine for normal-sized text.

Charts and diagrams. PNG, because thin lines and flat colours are where JPG shows its fuzz.

Photo pages and brochures. JPG, because photographs compress beautifully and the file stays small.

Pages you plan to overlay on other graphics. PNG, if the page has transparency you want to preserve.

:::highlight green
Sending images by email or uploading to a form with a size limit? Start with JPG. Only switch to PNG if the result looks soft.
:::

## What happens with many pages

Converting several pages produces a ZIP with one image per page. Since PNG files are larger, a PNG ZIP of a long document can get big quickly. If you need many pages in a small package, JPG is the better choice.

{{IMG:2}}

## Keeping quality high

- Convert from the original PDF, not from a photo or screenshot of one.
- Do not re-save a JPG repeatedly. Each save can lose a little more detail.
- Keep the PDF as your master copy and treat images as disposable exports.

## A ten-second test

If you are still undecided, use this quick test. Zoom into the page on screen until a lowercase letter fills a fingertip-sized area. If the edges look razor sharp and the page is mostly text, choose PNG. If the page is dominated by photographs or gradients, choose JPG. For pages that mix both, convert one page each way and compare the file sizes; if the JPG looks fine and is much smaller, that is your answer.

## Mistakes to avoid

- Choosing PNG for a large photo album and then wondering why the ZIP is huge.
- Choosing JPG for a page of thin-line diagrams and noticing faint smudging around the lines.
- Converting a page that is already a photograph of a document. The quality ceiling is set by that photograph, not by the format.

## Final recommendation

For everyday use, start with JPG. It produces smaller files that upload and load quickly, and for most pages the difference from PNG is invisible. Switch to PNG only when you see fuzzy text or ragged lines, or when you specifically need transparency. Because you can always re-convert from the original PDF, there is no cost to trying the other format if the first result disappoints you.

## What about very large pages?

Pages with large dimensions, such as posters or architectural drawings, produce large images in either format, and PNG files in particular can become heavy. If the image is only for viewing on screen, JPG is usually the sensible choice. If the image will be printed at a large size, consider the trade-off carefully and test one page before converting the whole document, so you are not surprised by the size of the finished files.

## Frequently asked questions

### Which is better for printing?

PNG holds up better for text-heavy pages. For photographic pages, a JPG at good quality is generally fine for most everyday printing.

### Can I convert back to a PDF?

Yes. The [JPG to PDF tool](/tools/jpg-to-pdf) accepts JPG, JPEG, and PNG images and puts them into a single PDF.

### Does PNG always look better?

Not always. For photos the difference is hard to see, and the file is much larger.

Pick the format by the kind of page, and you will rarely need to think about it twice.`,
    images: [
      { marker: 1, query: "photography and graphic design comparison" },
      { marker: 2, query: "computer files folder on screen" },
    ],
  },
  {
    slug: "convert-pdf-to-editable-word-document",
    title: "How to Convert a PDF to an Editable Word Document",
    excerpt: "Need to change text in a PDF? Convert it to Word, edit it, and save it again. Here is how, and what to expect.",
    seo_title: "How to Convert a PDF to an Editable Word Document",
    seo_description: "Convert a PDF with selectable text into a DOCX Word file you can edit. Free, in your browser, with honest notes on what converts well.",
    category: "Convert from PDF",
    topic_cluster: "convert-from-pdf",
    author: "OnlyPDF Team",
    related_slugs: ["why-pdf-to-word-loses-formatting", "how-to-convert-pdf-to-word-or-images"],
    featuredImageQuery: "editing text document on laptop",
    content: `# How to Convert a PDF to an Editable Word Document

PDFs are built to look the same everywhere, which is exactly why they are awkward to edit. When you need to fix a typo, update a date, or reuse paragraphs from an old report, converting the PDF to a Word document gives you text you can actually work with.

## The steps

- Upload the file to the [PDF to Word tool](/tools/pdf-to-word).
- Convert it to a DOCX document.
- Open the download in Word and adjust anything that needs it.

The tool extracts the text and basic paragraph structure, then builds a Word file from it.

{{IMG:1}}

## First, check that your PDF has real text

Conversion works on text that is stored as text. To check, open the PDF and try to select a sentence with your cursor. If it highlights, you are in good shape. If the whole page selects as one block, or nothing highlights, the PDF is a scan: a picture of a page. Extracting text from pictures needs OCR (optical character recognition), which this browser tool does not perform. For a scan, you will need an OCR-capable program first.

## What converts well

- Letters, reports, articles, and other mostly-text documents.
- Documents with clear headings and paragraphs.
- Content you plan to reword, reuse, or reformat anyway.

## What needs a little cleanup

- Multi-column layouts, which may flow differently in Word.
- Complex tables and forms.
- Floating images, text boxes, and heavy design elements.
- Exact fonts if they are not installed on your computer.

:::highlight orange
Set expectations before you start: the goal is editable text, not a pixel-perfect copy. Plan a few minutes to tidy the layout after converting.
:::

## A practical editing workflow

- Convert the PDF to DOCX.
- Make your edits in Word, using the original PDF beside it as a reference for layout.
- Save the result, then [convert the Word file back to PDF](/tools/word-to-pdf) to share it.

{{IMG:2}}

## Editing without converting

For a tiny change, converting may be overkill. If you only need to remove pages, [delete them](/tools/delete-pdf-pages); to combine documents, [merge the PDFs](/tools/merge-pdf). Conversion is for when you truly need to change the words.

## Privacy

Conversion happens in your browser, so the document is processed on your own device instead of being uploaded first.

## Tips for a smoother edit

Convert only what you need. If you want to reuse two pages from a sixty-page report, [extract those pages](/tools/extract-pdf-pages) first, so Word opens a short document instead of a long one full of layout to tidy.

Once the file is open in Word, turn on the display of paragraph marks. Stray line breaks are the most common oddity after conversion, and they are easy to spot and delete when they are visible. Then apply Word's built-in heading styles to your headings, which restores structure and makes the document easy to navigate.

## Before you send the edited version

Read it through once from top to bottom as though you have never seen it, because conversion can quietly change punctuation or split words at line ends. Then save a copy, and if you are sending it to someone who only needs to read it, convert it back to a fixed-layout PDF so it looks the same on every screen.

## A realistic time estimate

For a simple two-page letter, expect the conversion itself to take seconds and the cleanup a couple of minutes. For a long report with tables and columns, plan on more, since each complicated layout element may need attention. Deciding how much editing you really need before you start helps you choose between converting the whole file and extracting only the pages you want to change.

## Keeping your original safe

Always keep the source PDF untouched while you work on the Word copy. The PDF is your reference for how the document was meant to look, and it is your fallback if an edit goes wrong. Give the Word file a name that shows it is an editable working copy, and save your progress as you go. When the edits are finished, exporting a new PDF gives you a clean final version to share with everyone else.

## Frequently asked questions

### Will it look exactly like the PDF?

Not always. Text and basic structure carry over well, while complex layouts may need manual adjustment.

### Can it convert a scanned PDF?

Scanned pages are images, and reliable text extraction from images requires OCR, which this tool does not claim to do.

### Do I need Microsoft Word?

The result is a standard DOCX file, which opens in Word and in most other word processors.

Converting to Word turns a locked page into a working draft, which is often all you need.`,
    images: [
      { marker: 1, query: "typing on laptop keyboard document" },
      { marker: 2, query: "proofreading document with pen" },
    ],
  },
  {
    slug: "why-pdf-to-word-loses-formatting",
    title: "Why PDF to Word Conversion Loses Formatting (and How to Deal With It)",
    excerpt: "Fonts shift, columns break, and tables wander. Here is why it happens and how to get a clean result anyway.",
    seo_title: "Why PDF to Word Loses Formatting and How to Fix It",
    seo_description: "Understand why converting PDF to Word changes layout, and use practical steps to get a clean editable document.",
    category: "Convert from PDF",
    topic_cluster: "convert-from-pdf",
    author: "OnlyPDF Team",
    related_slugs: ["convert-pdf-to-editable-word-document", "convert-word-to-pdf-without-losing-formatting"],
    featuredImageQuery: "messy document layout on desk",
    content: `# Why PDF to Word Conversion Loses Formatting (and How to Deal With It)

You convert a neat PDF to Word and open it to find a shifted heading, a table that has lost its borders, and text that wraps in odd places. It feels like the converter failed. In most cases it did what it could, because the two formats work in fundamentally different ways.

## Two formats, two philosophies

A PDF describes where every piece of content sits on a page: this word at these coordinates, this image here. It is a fixed picture of a layout, and that is its strength.

A Word document describes flowing content: paragraphs, styles, and tables that reflow to fit the page. Change a font or margin and everything moves.

Converting from PDF to Word means reconstructing paragraphs and structure from positions. Sometimes that reconstruction is obvious; sometimes it is a guess.

{{IMG:1}}

## The usual culprits

- Columns. In a PDF, columns are just text placed side by side. Word has to work out that they are columns.
- Tables. A table in a PDF may be lines and loose text with no table structure at all.
- Fonts. If the PDF uses a font your computer does not have, Word substitutes another, changing line lengths and page breaks.
- Floating elements. Text boxes, callouts, and images anchored to exact spots do not always keep their positions.
- Scanned pages. These are pictures, not text, so there is nothing to convert without OCR.

## How to get a cleaner result

- Start with the best source. A PDF exported from Word or another application converts far better than a scan or a print-to-PDF file.
- Simplify before converting. If you only need a few pages, [extract them](/tools/extract-pdf-pages) first so you are not cleaning up pages you do not need.
- Convert, then reformat with styles. Apply Word's heading and paragraph styles instead of fixing every line by hand.
- Keep the PDF open beside you. Use it as the visual reference while you tidy the layout.

:::highlight blue
Treat the conversion as a strong first draft. The text is what matters most, and text is what converts most reliably.
:::

## When formatting is critical

If layout has to stay exactly as it is, editing text in Word may not be the right approach. For exact reproduction, keep the PDF as the deliverable and change the source document it came from, if you still have it. Then [convert the source to PDF](/tools/word-to-pdf) again.

{{IMG:2}}

## A quick checklist after converting

- Read headings and page breaks first.
- Check every table.
- Look for missing or shifted images.
- Search for odd characters, especially in documents with special symbols.

## Reading the damage

Different problems point to different causes, which tells you where to spend your effort:

- Text in odd places but otherwise correct. Usually a column or text-box issue; fix by removing the extra breaks.
- Headings look like body text. The converter saw font size, not structure; apply heading styles.
- Missing or garbled symbols. Usually a font substitution; retype the affected characters or install the font.
- Everything is an image. The source was a scan and there was no text to convert at all.

## Setting a realistic goal

Perfect fidelity is the wrong target for PDF-to-Word conversion. A better target is a document where all the words are present and correct, and where the structure is easy to repair. Measured that way, most conversions succeed, and the ten minutes of cleanup is still faster than retyping the document from scratch.

## A note on expectations with scanned files

Scans deserve a special mention because they cause the most disappointment. A scan is a photograph of paper, so a converter that only extracts text has nothing to work with. If your converted file is empty or contains only images, that is the reason, and the remedy is OCR software rather than a different PDF-to-Word tool. It is worth checking whether text can be selected in the PDF before you convert, since that one test predicts the outcome better than anything else.

## Frequently asked questions

### Is losing formatting a sign the tool is broken?

Usually not. It reflects the gap between a fixed-layout format and a flowing one.

### Would a different tool fix it?

Some handle certain layouts better than others, but no converter reproduces every PDF perfectly, especially complex ones.

### What is the best way to avoid the problem?

Keep the original Word file. Editing the source and exporting a new PDF is always cleaner than converting back.

Once you know why formatting shifts, the cleanup becomes routine rather than frustrating.`,
    images: [
      { marker: 1, query: "two different document layouts comparison" },
      { marker: 2, query: "checking document on laptop screen" },
    ],
  },
  {
    slug: "remove-watermark-from-pdf-selected-area",
    title: "How to Remove a Watermark From a PDF by Selecting the Area",
    excerpt: "Preview your PDF, draw a box over the watermark, and clean the page. Here is when this works well and when it does not.",
    seo_title: "How to Remove a Watermark From a PDF by Selecting the Area",
    seo_description: "Remove a watermark from a PDF by drawing over it in a preview. Free and private, with honest limits on what area-based removal can do.",
    category: "Edit PDF",
    topic_cluster: "watermark-cleanup",
    author: "OnlyPDF Team",
    related_slugs: ["how-to-remove-watermark-from-pdf", "delete-pages-from-pdf-free"],
    featuredImageQuery: "document stamp on paper",
    content: `# How to Remove a Watermark From a PDF by Selecting the Area

Watermarks come in many forms: a faint "DRAFT" across the page, a company logo in a corner, a "Confidential" stamp at the top. If you own the document, or have permission to edit it, you may want a clean copy. The area-selection method is a simple approach, and it works well in the right situations.

Only remove watermarks from documents you have the right to modify. A watermark can carry copyright or ownership information, and stripping it from someone else's work may not be permitted.

## How the tool works

The [PDF watermark remove tool](/tools/watermark-remove) shows a preview of your page. You drag a box over the watermark, and the tool covers that area with white in the copy you download. It does not reconstruct what lies underneath; it covers it.

That is a simple, honest mechanism, and it explains both its strengths and its limits.

{{IMG:1}}

## Step by step

- Upload your PDF and wait for the previews.
- Drag over the watermark area on the page.
- Choose whether to apply the same area to every page or only the current one.
- Remove the selected area and download the cleaned PDF.

## When it works well

- The watermark sits in a predictable spot, such as a corner logo or a footer stamp.
- The background behind it is plain white.
- The area you cover contains no text you need.

## When it will not work well

- Diagonal watermarks across the middle of the page. Covering them would also cover the text and images beneath.
- Watermarks over photos or coloured backgrounds. A white box on a coloured page is visible as a white patch.
- Watermarks baked into the page image. In scanned or flattened pages, the watermark and the content are one picture.

:::highlight red
Always review the result. Because the tool covers an area rather than separating layers, check that no needed content has been hidden along with the watermark.
:::

## Getting the best result

- Draw the box as tightly as possible around the watermark.
- Use the same-area-on-every-page option only when the watermark is truly in the same spot each time.
- For a watermark that appears on some pages only, work page by page.

{{IMG:2}}

## Alternatives worth considering

- Ask for a clean copy. The document's author or sender can often supply one without the watermark.
- Use the source file. If you have the original Word or design file, export a fresh PDF without the watermark.
- Remove whole pages. If a watermarked page is not needed, [delete it](/tools/delete-pdf-pages) instead.

## Privacy

The tool runs in your browser, so the file stays on your device while it is processed.

## Practical examples

A footer stamp reading "Draft" appears in the same bottom margin on each of forty pages. Drawing one box over it and applying it to every page fixes the whole document in one step.

A company logo sits in the top corner of only the first page. Draw the box on that page and apply it to the current page only, so the other pages are untouched.

A large diagonal "Sample" runs across the middle of every page. Here, a box would cover the text as well, so this is a case where asking for a clean copy from the source is the better route.

## Reviewing the result

Open the cleaned file and check three things: that the watermark is gone, that no white patch is visible against a coloured background, and that no text next to the watermark was hidden. If something looks wrong, go back to your original and draw a tighter box.

## Being realistic about what a box can do

Area removal is a covering technique, not an editing miracle. It works when the surroundings are plain and the watermark is contained. It struggles when the watermark overlaps content you need. Deciding this in advance, by looking at the page and asking whether anything important lies under the watermark, saves you from a result you will not be happy with and points you toward asking for a clean copy instead.

## Frequently asked questions

### Does this remove every type of watermark?

No. It covers a selected area with white, which suits watermarks in predictable places but cannot cleanly separate a watermark from content beneath it.

### Can I preview what will be removed?

Yes. You draw the area directly on the page preview before anything is processed.

### Is my original file changed?

No. You download a cleaned copy and your original stays as it was.

Used with realistic expectations, area selection is a quick way to tidy documents where the watermark sits in the margins.`,
    images: [
      { marker: 1, query: "reviewing document on computer screen" },
      { marker: 2, query: "clean white paper document" },
    ],
  },
];
