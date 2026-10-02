import type { Batch1Article } from "@/lib/blog/batch1-articles";

// Batch 5: five pillar-length guides (1250+ words each). {{IMG:n}} placeholders
// are resolved by /api/admin/blog/illustrate?slug=... and saved as drafts.
export type Batch5Article = Batch1Article;

export const batch5Articles: Batch5Article[] = [
  {
    slug: "pdf-vs-word-vs-jpg-choosing-the-right-file-format",
    title: "PDF vs Word vs JPG: Which File Format Should You Send?",
    excerpt: "Every format has a job. Learn when to send a PDF, when a Word file is better, and when an image is the right choice, so your documents always arrive looking right.",
    seo_title: "PDF vs Word vs JPG: Which File Format Should You Send?",
    seo_description: "Compare PDF, Word (DOCX), and JPG for sharing documents. Learn which format suits editing, printing, forms, and quick sharing, and how to convert between them.",
    category: "PDF Basics",
    topic_cluster: "pdf-basics",
    author: "OnlyPDF Team",
    related_slugs: ["how-to-convert-pdf-to-word-or-images", "pdf-to-png-or-jpg-which-format", "convert-pdf-to-editable-word-document"],
    featuredImageQuery: "choosing between documents on a desk",
    content: `# PDF vs Word vs JPG: Which File Format Should You Send?

Sending a document sounds simple until the recipient replies that the page looks broken, the text has moved, or they cannot open the file at all. Most of these problems come from choosing the wrong format for the job. A résumé that looked perfect on your laptop arrives with shifted headings. A photo of a form is rejected because the portal wants a PDF. A contract you sent as an editable file comes back with changes nobody agreed to.

This guide explains what PDF, Word, and JPG each do best, how to choose in a few seconds, and how to move between formats using the [PDF to Word](/tools/pdf-to-word), [Word to PDF](/tools/word-to-pdf), [JPG to PDF](/tools/jpg-to-pdf), and [PDF to JPG](/tools/pdf-to-jpg) tools.

## The core idea: three formats, three jobs

The simplest way to think about it is this. A PDF is for reading and sharing. A Word file is for writing and editing. A JPG is for looking at a picture. Each one is excellent at its own job and awkward at the others.

{{IMG:1}}

## PDF: the format for sharing and filing

A PDF stores a page exactly as it should look: the same fonts, the same layout, the same page breaks, on any device. That is why it is the standard for anything that must look identical for everybody.

Choose PDF when:

- You are sending a finished document that should not be changed, such as an invoice, a contract, a report, or a certificate.
- The recipient will print it. Page breaks and margins stay where you put them.
- A form, portal, or email policy asks for PDF. Many application systems accept nothing else.
- You want a single file that combines many pages, images, and sections.
- You are archiving. A PDF is far more likely to look the same in ten years than an editable file that depends on installed fonts and software versions.

The weakness of PDF is editing. Changing a sentence in a PDF is awkward compared with a word processor. If the other person needs to work on the text, PDF is the wrong choice.

## Word (DOCX): the format for writing and collaborating

A Word document stores flowing content: paragraphs, headings, and styles that rearrange themselves to fit whatever page size, font, or device is used. This makes it ideal for writing and revising, and less ideal for guaranteeing a fixed appearance.

Choose Word when:

- Somebody else needs to edit the text, add comments, or track changes.
- The document is a draft that will change several times.
- You are writing something long and want headings, styles, and a table of contents to update automatically.
- You want to reuse the content, for example by copying paragraphs into another document.

The weakness of Word is consistency. Open the same file on a computer without your fonts, or in a different word processor, and line breaks and page numbers can shift. For a document that must look right, convert it to PDF before sending.

## JPG: the format for pictures

:::highlight blue
Related guide: [PNG or JPG to PDF: which image type should you use?](/blog/png-vs-jpg-to-pdf-which-to-use) helps when you can choose the image format.
:::

A JPG is a picture. It shows how something looks, but it has no text you can select, no pages, and no structure. It is compact and opens everywhere, which makes it ideal for photos and quick previews.

Choose JPG when:

- The content is a photograph, screenshot, or graphic.
- You need to place a page inside a presentation, website, or social post.
- You are sharing a quick preview in a chat app where a PDF would need an extra tap.

The weakness of JPG is that it is a poor container for documents. Text in an image cannot be searched, copied, or read by a screen reader, and multi-page material becomes a pile of separate files.

## A quick comparison

| Need | Best format |
| --- | --- |
| Send a finished document that must look the same everywhere | PDF |
| Let someone edit the text | Word (DOCX) |
| Share a photo or screenshot | JPG |
| Submit an official form or application | PDF |
| Keep a long-term record | PDF |
| Post one page on a website or in a slide | JPG |
| Draft something collaboratively | Word (DOCX) |
| Combine several pages and pictures into one file | PDF |

## How to decide in ten seconds

Ask yourself two questions.

- Will the recipient need to change the content? If yes, send Word. If no, send PDF.
- Is the content a picture rather than a document? If yes, JPG may be enough, but if it needs several pages or must be accepted by a form, wrap it in a PDF.

If both answers are no, the choice is PDF. It is the safest default for anything that is finished.

## Moving between formats

:::highlight blue
Related guide: [Which PDF tool do I need?](/blog/which-pdf-tool-do-i-need-cheat-sheet) matches common problems to the right tool.
:::

Real work rarely stays in one format. Here is how each conversion works and what to expect.

### Word to PDF

Use the [Word to PDF tool](/tools/word-to-pdf) to turn a DOCX file into a PDF. It is designed for text and paragraph content, and it produces a simple PDF, so complex layouts, floating objects, and advanced tables may not match the original exactly. Always open the result and check the layout before you share it. If your document depends on precise formatting, exporting a PDF directly from your word processor's own save or export menu is usually the more faithful route. Our article on [converting Word to PDF without losing formatting](/blog/convert-word-to-pdf-without-losing-formatting) goes into detail.

### PDF to Word

The [PDF to Word tool](/tools/pdf-to-word) extracts text and basic structure from a PDF that contains real, selectable text and builds a DOCX file from it. It is a good first draft for editing, but expect to tidy layouts, tables, and columns. Scanned PDFs are pictures of pages, and turning pictures into text needs OCR, which is a different kind of software. Read [why PDF to Word conversion loses formatting](/blog/why-pdf-to-word-loses-formatting) to know what to expect.

### JPG to PDF

The [JPG to PDF tool](/tools/jpg-to-pdf) puts JPG or JPEG images into a single PDF, with page sizes of fit to image, A4, or US Letter. PNG images, such as screenshots, use the [PNG to PDF tool](/tools/png-to-pdf). This is the tool to use when a portal wants a PDF and all you have is photos. See our [complete guide to JPG to PDF](/blog/jpg-to-pdf-complete-guide) for tips on order and quality.

### PDF to JPG

The [PDF to JPG tool](/tools/pdf-to-jpg) turns chosen pages into JPG images, bundled in a ZIP if there are several, and the [PDF to PNG tool](/tools/pdf-to-png) does the same for PNG. Use it when you need a page as a picture. For help choosing between the two image formats, see [PDF to PNG or JPG: which format should you choose](/blog/pdf-to-png-or-jpg-which-format).

{{IMG:2}}

## Common scenarios and the right answer

### Sending a résumé

Send a PDF. It keeps your layout intact, opens on every device, and cannot be accidentally altered. Only send Word if the employer or recruiter explicitly asks to edit it.

### Sending a contract for review

Send a Word file if the other side will suggest changes, then send a PDF of the agreed final version for signature and filing.

### Uploading a certificate to a portal

Most portals want a PDF. If you only have a photo, convert it with the JPG to PDF tool, choose A4, and compress the result if there is a size limit.

### Sharing a page in a presentation

Use a JPG or PNG of the page. Convert it from the PDF with the [PDF to JPG](/tools/pdf-to-jpg) or [PDF to PNG](/tools/pdf-to-png) tool, and keep the original PDF in case you need the text later.

### Sharing a scanned document

Scans are pictures, so a PDF built from those pictures is the standard answer. It keeps pages together and in order.

## Mistakes that cause trouble

- Sending an editable file when you meant it to be final. Convert to PDF first.
- Sending a photo of a document when a real document exists. A PDF exported from the source looks better and is smaller.
- Assuming a converted file looks identical. Always check the result, especially tables, columns, and images.
- Converting back and forth repeatedly. Every round trip can lose a little fidelity. Keep the original source file and make new versions from it.
- Forgetting file size. Photos and scans make big PDFs. If there is a limit, use the [compress PDF tool](/tools/compress-pdf) at the end of your workflow.

## Keep your source files

The most valuable habit is to keep the original. Your Word file is the master for a document you may edit again. Your PDF is the distributable copy. Your original photos are the source for any image-based PDF. Converting always goes more smoothly in the direction of source to output, so treat the source as the thing worth protecting and the output as something you can re-create.

## Privacy

Personal documents often move between these formats: ID scans, statements, forms. The tools mentioned here run in your browser, so files are processed on your own device rather than uploaded to a server first. For how to check that yourself, read [are online PDF tools safe](/blog/are-online-pdf-tools-safe).

## Frequently asked questions

### Is PDF always better than Word?

No. PDF is better for finished documents. Word is better while a document is still being written or reviewed.

### Can I edit a PDF directly?

Editing text inside a PDF is awkward compared with a word processor. The usual approach is to edit the source file and export a new PDF, or to convert the PDF to Word for a rough edit.

### Why does my Word file look different on another computer?

Word documents adapt to the fonts and software on each device. A PDF avoids this because it stores the fixed layout.

### Should I send a JPG of a document?

Only for a quick preview. For anything official, send a PDF, since text in a JPG cannot be searched or copied.

### Which format is smallest?

It depends on the content. Text-only PDFs and Word files are usually small. Photos and scans are large in any format.

Choosing the right format is a small decision that prevents many small headaches. Use PDF for finished and official documents, Word for work in progress, and JPG for pictures, and convert between them with care, checking the result each time.`,
    images: [
      { marker: 1, query: "documents and laptop on office desk" },
      { marker: 2, query: "person sending email attachment laptop" },
    ],
  },
  {
    slug: "prepare-documents-for-online-application-checklist",
    title: "How to Prepare Documents for an Online Application: A PDF Checklist",
    excerpt: "Visa, university, job, or grant: most online applications reject the same handful of problems. Use this checklist to get your PDFs right the first time.",
    seo_title: "Online Application Documents: A PDF Preparation Checklist",
    seo_description: "Prepare PDFs for a visa, university, job, or grant application. A step-by-step checklist covering page order, size limits, readability, and file names.",
    category: "Organize PDF",
    topic_cluster: "merge-organize",
    author: "OnlyPDF Team",
    related_slugs: ["compress-pdf-for-job-application", "convert-scanned-image-to-pdf-admission-form", "phone-scan-to-pdf-workflow", "pdf-file-size-limits-and-how-to-meet-them"],
    featuredImageQuery: "filling in online application on laptop",
    content: `# How to Prepare Documents for an Online Application: A PDF Checklist

Online applications have a way of failing at the last step. You fill in every field, gather your documents, click upload, and the site answers that the file is too large, the format is wrong, or the document is unreadable. Or worse, the upload succeeds and a reviewer later reports that a page is missing, sideways, or impossible to read. Most of these problems are avoidable, because they come from the same small set of mistakes.

This guide gives you a practical checklist you can follow for any application, whether it is for a visa, a university place, a job, a scholarship, or a grant. It uses the [merge PDF](/tools/merge-pdf), [rotate PDF](/tools/rotate-pdf), [rearrange PDF](/tools/rearrange-pdf), and [compress PDF](/tools/compress-pdf) tools, all of which run in your browser.

One important note first: every organisation sets its own rules about file types, sizes, page counts, and document order. This guide helps you prepare files well, but the requirements on the application page always come first. Read them before you start and again before you submit.

## Step 1: Read the requirements and write them down

Before touching a single file, collect the rules. Look for:

- Accepted file formats. PDF is common, but some accept images, and some want one particular kind.
- Maximum file size, per file and sometimes in total.
- Whether you must upload one combined file or separate files for each document.
- Required page size or orientation, such as A4.
- Whether documents must be in colour or black and white.
- Required file naming, which some portals specify.
- Order of documents, if one is stated.

Write these into a short list. It becomes your checklist, and it stops you from guessing halfway through.

{{IMG:1}}

## Step 2: Gather the right documents

:::highlight blue
Related guide: applying as a student? [A PDF workflow for students](/blog/pdf-workflow-for-students-assignments-and-thesis) covers assignments, thesis chapters, and submissions.
:::

Make a list of every document requested, then find each one before you start converting. Missing a document late in the process forces you to redo ordering and merging. Typical items include identification, transcripts or certificates, a CV or résumé, reference letters, proof of address, and a statement or cover letter.

For each document, note whether you have a digital original or only paper. A digital original, such as a PDF exported from a word processor, is almost always better than a photo of a printed copy, because it is sharper and smaller.

## Step 3: Turn paper and photos into clean PDFs

If a document exists only on paper, photograph or scan it clearly. Even light, a flat page, and a straight-on angle matter more than expensive equipment. Our [phone scan to PDF workflow](/blog/phone-scan-to-pdf-workflow) walks through the whole process.

Then convert the images with the [JPG to PDF tool](/tools/jpg-to-pdf). Use A4 or US Letter as the page size for official documents, and use fit to image only when the picture itself is what matters. If you already have a Word document, the [Word to PDF tool](/tools/word-to-pdf) can turn a DOCX file into a simple PDF, but check the layout afterward, because complex formatting may not match exactly. Exporting a PDF from your word processor's own menu is usually the most faithful option for detailed layouts.

## Step 4: Fix rotation and page order

Open each PDF and scroll through it. Look for pages that are sideways or upside down and correct them with the [rotate PDF tool](/tools/rotate-pdf). Confirm that pages are in the correct sequence, and fix any that are not with the [rearrange PDF tool](/tools/rearrange-pdf).

Do this before compressing or merging. Fixing problems earlier is easier than finding them in a large combined file.

:::highlight orange
Look hardest at the first and last pages of every document. Those are the pages reviewers see first, and the pages most often flipped or skipped during scanning.
:::

## Step 5: Combine only when the application asks for one file

Some applications want one file per document. Others want a single combined file. Follow the instruction exactly.

When you need a combined file, use the [merge PDF tool](/tools/merge-pdf), add the PDFs, and drag them into the order the application requires. If no order is stated, choose one that a reviewer would find natural: application form first, then identification, then qualifications, then supporting material. Our guides on [merging PDFs on a phone](/blog/merge-pdf-files-in-order-on-phone) and [combining PDFs without expensive software](/blog/combine-pdf-files-without-adobe-acrobat) may help.

## Step 6: Trim what should not be there

Remove pages that are blank, duplicated, or not requested. The [delete PDF pages tool](/tools/delete-pdf-pages) handles this, and the [extract PDF pages tool](/tools/extract-pdf-pages) is better when you need only a few pages from a long document. Less is often more: a reviewer with fifty applications appreciates a tidy file and is less likely to miss what matters.

Be careful about privacy. Include only what is requested, and check headers and footers for information you would rather not share.

## Step 7: Meet the size limit

Now, and only now, compress. Compressing last means your rotation, order, and merging happen on the full-quality version.

Open the [compress PDF tool](/tools/compress-pdf) and choose an automatic level, or use target file size if you know the limit, for example 1 MB or 2 MB. Aim a little under the limit, because systems sometimes measure size slightly differently. If the file is still too big after compression, remove unneeded pages or accept a stronger compression level, then check readability. The article on [PDF file size limits](/blog/pdf-file-size-limits-and-how-to-meet-them) covers this in detail, and [compressing a PDF for a job application](/blog/compress-pdf-for-job-application) is a good companion.

{{IMG:2}}

## Step 8: Check readability, page by page

A file that meets the size limit but cannot be read is useless. Open the final PDF and zoom in on the smallest text, such as dates, numbers, and signatures. If you can read them at normal zoom, a reviewer will be able to as well. Check that nothing is cut off at the edges and that photographs and stamps are visible.

## Step 9: Name your files clearly

Even when the portal does not require a specific format, a clear name helps you and the reviewer. A good pattern is your surname, then the document type, for example smith-passport.pdf or smith-transcript.pdf. Avoid names like scan001 or final-final-2. Avoid special characters and very long names, which some upload systems handle badly.

## Step 10: The final review

Before you submit, run through this list one last time.

- Every requested document is present.
- The file format matches the requirement.
- Each file is under the size limit.
- Pages are upright and in the right order.
- Text is readable at normal zoom.
- No blank or duplicate pages remain.
- Sensitive details that were not requested are not included.
- File names are clear.
- You have kept copies of the originals and the final files.

## Common mistakes worth avoiding

- Compressing too early. Do it last.
- Uploading photos when a PDF is required. Convert them first.
- Merging documents that should stay separate. Follow the portal's instruction.
- Trusting page numbers printed on paper. Check the actual sequence in the file.
- Leaving the upload to the last minute. Portals fail under deadline pressure, and you need time to fix problems.
- Not saving a copy of what you submitted. Keep the exact files you uploaded.

## A note on privacy

Application documents are among the most personal files you have: identity papers, records, and financial statements. The tools above run in your browser, so your files are processed on your own device rather than being uploaded to a server first. Whatever tool you use, share only what is required and use the official upload channel. For more, read [are online PDF tools safe](/blog/are-online-pdf-tools-safe).

## Frequently asked questions

### Should I merge everything into one PDF?

Only if the application asks for it. If it asks for separate files, keep them separate and name each clearly.

### What page size should I use?

Follow the application's instruction. If none is given, A4 is common in most of the world, and US Letter is common in the United States and Canada.

### How small should I make the file?

Under the stated limit, with a little margin. Do not compress more than necessary, because readability matters.

### Can I submit photos instead of PDFs?

Only if the application accepts them. If a PDF is required, convert your photos first.

### What if my file is still too large?

Remove unneeded pages, then compress with a stronger level, and check that the text is still readable.

Preparing application documents is mostly about order and care. Gather what is required, make clean PDFs, fix rotation and sequence, combine only if asked, compress last, and check everything before you click submit. Follow the same routine each time, and your applications will stop failing at the final step.`,
    images: [
      { marker: 1, query: "checklist notebook and pen desk" },
      { marker: 2, query: "student preparing application documents at desk" },
    ],
  },
  {
    slug: "digital-paperwork-organization-system",
    title: "How to Organize Your Digital Paperwork: A Simple Folder and Naming System",
    excerpt: "Stop hunting for that one PDF. Build a folder and file-naming system in an afternoon, and keep it tidy with a few minutes of upkeep a month.",
    seo_title: "How to Organize Digital Paperwork: Folders and File Naming",
    seo_description: "Set up a simple system for organizing PDFs and scans: folder structure, file naming, yearly archiving, and tips for merging, trimming, and compressing documents.",
    category: "PDF Basics",
    topic_cluster: "pdf-basics",
    author: "OnlyPDF Team",
    related_slugs: ["how-to-merge-reorder-organize-pdf-files", "phone-scan-to-pdf-workflow", "are-online-pdf-tools-safe"],
    featuredImageQuery: "organized folders and files on desk",
    content: `# How to Organize Your Digital Paperwork: A Simple Folder and Naming System

Most people do not have a paperwork problem. They have a finding problem. The document exists somewhere: in Downloads, in an email attachment from two years ago, on a phone gallery under a name like IMG_4471, or in a folder called New Folder (3). When a bank, a landlord, or a tax office asks for it, the search begins, and it always seems to happen when you are in a hurry.

The good news is that a workable system is small and simple. You can set one up in an afternoon and maintain it in a few minutes a month. This guide covers a folder structure, a file-naming pattern, a routine for handling new documents, and how the PDF tools on this site fit in.

## What a good system needs to do

A useful paperwork system passes three tests.

- Findable. You can locate any document in under a minute without remembering when you saved it.
- Consistent. The rules are simple enough that you follow them without thinking, including on a tired day.
- Safe. Sensitive documents are stored somewhere protected, and you have a copy in more than one place.

Everything else is decoration. If a system passes those three tests, it works, however plain it looks.

{{IMG:1}}

## Step 1: Choose one home for everything

Scattered documents are the root of most problems. Pick one main location, such as a folder on your computer that syncs to cloud storage, and decide that all paperwork lives there. New documents can arrive anywhere, but they get moved into the home folder as part of your routine.

Avoid keeping the only copy of anything on a phone or in an email inbox. Email is a delivery system, not a filing system.

## Step 2: Build a simple folder structure

Resist the urge to create dozens of categories. A short list of top-level folders, based on how you actually think about your documents, is enough. A structure that works for many households looks like this.

- Identity: passports, national ID, driving licence, birth and marriage certificates.
- Money: bank statements, tax documents, payslips, loan and investment papers.
- Home: lease or mortgage, utility bills, insurance, repair receipts.
- Work: contracts, certificates, references, your CV.
- Education: transcripts, diplomas, course certificates.
- Health: medical records, prescriptions, insurance cards.
- Purchases: receipts and warranties for things that matter.
- Archive: everything older than the current year and the previous one.

Inside these, use one level of subfolders at most, such as a folder for each year inside Money. Deep nesting makes files harder to find, not easier.

## Step 3: Use a file-naming pattern

Names do most of the finding work, especially when you search. Pick a pattern and use it every time. A dependable one is:

date, then what it is, then who or what it relates to

For example, 2026-03-14 electricity-bill march.pdf, or 2026-01-09 lease-agreement main-street.pdf. Write the date as year, month, day. That way, files sort in true chronological order in any folder, which is very useful for statements and receipts.

A few rules keep names clean.

- Use lowercase letters and hyphens, and avoid special characters, which some systems handle badly.
- Be specific enough that the name makes sense out of context.
- Keep names reasonably short.
- Never use words like final, new, or scan as the main name.

## Step 4: Process new documents the same way, every time

A routine matters more than the structure. When a new document arrives, do the same handful of steps.

- Get a clean digital version. If it is paper, photograph or scan it well. Our [phone scan to PDF workflow](/blog/phone-scan-to-pdf-workflow) explains how.
- Convert photos into one PDF with the [JPG to PDF tool](/tools/jpg-to-pdf). Use A4 or US Letter as the page size for official papers.
- Fix any sideways pages with the [rotate PDF tool](/tools/rotate-pdf).
- Remove blank or unwanted pages with the [delete PDF pages tool](/tools/delete-pdf-pages).
- Rename it using your pattern and move it into the right folder.

Do this on the day the document arrives, or in a short weekly session. Letting things pile up is what turns tidy filing into a weekend chore.

:::highlight blue
A weekly ten-minute session beats a yearly weekend. Set a recurring reminder, empty your Downloads folder and phone gallery of documents, and file everything in one go.
:::

## Step 5: Combine related pages into single files

A mortgage agreement made of eleven separate images is hard to manage. Combine related pages into one PDF, in order, with the [merge PDF tool](/tools/merge-pdf). Drag files into the right sequence, then confirm the result by scrolling through it. If you need to correct the order afterward, the [rearrange PDF tool](/tools/rearrange-pdf) lets you drag pages into place. Our guide on [merging, reordering, and organizing PDF files](/blog/how-to-merge-reorder-organize-pdf-files) goes deeper.

{{IMG:2}}

## Step 6: Keep files light

Large scans clog storage and are difficult to email. Compress documents that you will share regularly with the [compress PDF tool](/tools/compress-pdf), and keep the compressed version as the everyday copy. Keep the high-quality original in the archive if you might need it, for example for a passport scan that must remain sharp. Check readability after compressing, especially small print.

## Step 7: Protect sensitive documents

Identity papers, tax records, and medical files need more care than a utility bill.

- Store them in an encrypted or access-controlled location, and use a strong password and two-step verification on any cloud account.
- Keep an offline backup, such as an external drive stored somewhere safe.
- When you share a document, send only the pages required. The [extract PDF pages tool](/tools/extract-pdf-pages) creates a new file with only the pages you choose, leaving your original untouched.
- Avoid handling sensitive files on public computers or open Wi-Fi.

For more on staying safe with online tools, read [are online PDF tools safe](/blog/are-online-pdf-tools-safe).

## Step 8: Back up in more than one place

A system is only safe if losing one device does not lose everything. A sensible pattern is the 3-2-1 idea: keep at least three copies of anything important, on two different kinds of storage, with one copy stored away from your home. In practice, that might mean your computer, a cloud folder, and an external drive kept elsewhere.

Check your backups occasionally by opening a random file from the backup and confirming that it is intact.

## Step 9: Do a yearly archive

Once a year, move last year's documents from active folders into the archive. Leave the current year and the year before in place, since those are the ones you are most likely to need for tax, insurance, and loan paperwork. Archived files can be kept in their original quality.

Decide how long you need to keep each kind of document. Retention rules vary by country and by document type, so check what applies to you, especially for tax and legal papers, rather than assuming.

## Step 10: Make a short index for the essentials

Keep one short document, stored safely, that lists where your most important papers are and what accounts they relate to. If someone else ever needs to find your paperwork, that single page is worth more than a perfect folder tree. Do not store passwords in plain text inside it.

## Common mistakes to avoid

- Creating too many folders. Fewer, broader folders are easier to keep up.
- Inconsistent names. One habit, applied every time, matters more than a clever pattern.
- Keeping duplicates in several places. Choose one master location.
- Trusting the phone gallery as storage. Move documents out and back them up.
- Storing only originals of huge size. Keep a light everyday copy alongside the original.
- Skipping the backup. A tidy system with one copy is still fragile.

## A ten-minute starter plan

:::highlight blue
Related guides: [a PDF workflow for students](/blog/pdf-workflow-for-students-assignments-and-thesis) and [a PDF workflow for freelancers](/blog/pdf-workflow-for-freelancers-invoices-and-contracts) apply this system to two common situations.
:::

If you want to begin today without overhauling everything, do this.

- Create the top-level folders listed above.
- Move the five documents you most often need into them.
- Rename those five files using the date pattern.
- Set a weekly ten-minute reminder to file new documents.

That small start makes a real difference, and you can extend it gradually.

## Frequently asked questions

### Should I keep paper copies?

For some documents, yes. Original certificates and legal papers are often best kept on paper as well as digitally. Check what applies to the documents you hold.

### How many folders should I have?

As few as work for you. Eight or so top-level folders with at most one level of subfolders is plenty for most households.

### What if I already have thousands of files?

Do not try to sort everything at once. Start with new documents, then tackle old ones a folder at a time.

### Is cloud storage safe for sensitive documents?

It can be, if you use a strong password and two-step verification, and trust the provider. For the most sensitive items, consider adding an offline backup.

### Do I need special software?

No. A folder structure, a naming habit, and a few browser-based PDF tools are enough.

Organizing paperwork is not about perfection. It is about a few simple rules you can follow without effort: one home for everything, a short folder list, a consistent naming pattern, a routine for new documents, and reliable backups. Start small this week, and the next time someone asks for a document, you will find it in seconds.`,
    images: [
      { marker: 1, query: "filing cabinet documents home office" },
      { marker: 2, query: "laptop with folders and files on screen" },
    ],
  },
  {
    slug: "check-pdf-before-sending-final-checklist",
    title: "The Final Check: 12 Things to Verify Before You Send Any PDF",
    excerpt: "A two-minute review catches the sideways page, the missing signature, and the oversized file before your recipient does. Here is the checklist.",
    seo_title: "Check a PDF Before Sending: A 12-Point Final Checklist",
    seo_description: "Avoid embarrassing PDF mistakes with a 12-point checklist covering page order, rotation, readability, size, sensitive information, and file naming.",
    category: "PDF Basics",
    topic_cluster: "pdf-basics",
    author: "OnlyPDF Team",
    related_slugs: ["rotate-pdf-pages-permanently", "delete-pages-from-pdf-free", "pdf-file-size-limits-and-how-to-meet-them", "are-online-pdf-tools-safe"],
    featuredImageQuery: "person reviewing document before sending",
    content: `# The Final Check: 12 Things to Verify Before You Send Any PDF

Most PDF mistakes are small, and almost all of them are noticed by the recipient rather than by the sender. A page is sideways. A signature page is missing. The file is far larger than the email server allows. A draft comment is still visible on page four. None of these is a disaster, but each one makes you look careless, and some cost real time when an application is rejected or a contract has to be re-sent.

The cure is a short routine you run before every send. It takes about two minutes, and it becomes automatic after a few uses. This checklist has twelve items, grouped by the kind of problem they catch. Where a check reveals a problem, the relevant tool on this site is named so you can fix it straight away.

{{IMG:1}}

## Why a checklist works

People are good at creating documents and bad at reviewing their own work, because we see what we expect to see. A checklist forces you to look at specific things in a specific order, so your eyes stop skimming. Pilots and surgeons use checklists for the same reason: not because they are careless, but because routine tasks invite lapses.

The trick is to review the final file, not the source. Open the exact PDF you are about to send, in a viewer, as the recipient will see it.

## Part one: structure

### 1. Page count

Check that the number of pages matches what you expect. A missing page usually means something went wrong during scanning or merging, and an extra page is often a blank or duplicate. If you spot extra pages, remove them with the [delete PDF pages tool](/tools/delete-pdf-pages). If you need only some pages from a longer file, the [extract PDF pages tool](/tools/extract-pdf-pages) builds a new file with just those.

### 2. Page order

Scroll from first page to last and confirm the sequence makes sense. Watch for signature pages that landed at the front, appendices in the middle, and cover pages at the end. Do not trust the numbers printed on the pages; trust the actual position in the file. If pages are out of order, use the [rearrange PDF tool](/tools/rearrange-pdf) to drag them into place.

### 3. Orientation

Every page should be upright. Pages that are sideways or upside down are common after scanning, and a viewer sometimes hides the problem by auto-rotating on screen. The way to be sure is to check the thumbnails. Fix any wrong pages with the [rotate PDF tool](/tools/rotate-pdf), and remember that the rotation is then saved in the file rather than just displayed. Our article on [rotating PDF pages permanently](/blog/rotate-pdf-pages-permanently) explains the difference.

### 4. Completeness

Confirm that every document you meant to include is there, and that pages are not cut off at the edges. Scanned pages sometimes lose a margin or a corner, and that can hide a date or a signature. If you are combining several documents, the [merge PDF tool](/tools/merge-pdf) lets you rebuild the file with the missing piece in the right position.

## Part two: quality

### 5. Readability

Zoom in on the smallest text: dates, figures, addresses, and signatures. If you cannot read it comfortably at normal zoom, neither can the recipient. Blurry text usually comes from a poor photo or from over-compression. The remedy is a better source image or a gentler compression setting, so go back to the original file rather than trying to fix a weak result.

### 6. Consistent page sizes

Mixed page sizes look untidy and sometimes cause printing trouble. A PDF built from photos with the fit to image setting can end up with pages of different sizes. If the file is going to a form or a printer, choosing A4 or US Letter in the [JPG to PDF tool](/tools/jpg-to-pdf) gives uniform pages.

### 7. Images and graphics

Look at photos, logos, and charts. Confirm they are present, sharp enough, and not distorted. If a converted file has lost images, go back to the source and try again, or export a PDF directly from the application that created it.

## Part three: size and format

### 8. File size

Check the size against any limit, whether it is an email attachment cap, a portal restriction, or a form requirement. If the file is too large, remove unneeded pages first, then use the [compress PDF tool](/tools/compress-pdf) with an automatic level or a target size. Aim a little under the limit, because systems do not always calculate size the same way. Read [PDF file size limits and how to meet them](/blog/pdf-file-size-limits-and-how-to-meet-them) for a full plan.

### 9. Format

Make sure you are sending what was asked for. If the request says PDF, do not send a photo. If someone wants to edit the document, a Word file may serve them better. Our guide on [choosing between PDF, Word, and JPG](/blog/pdf-vs-word-vs-jpg-choosing-the-right-file-format) can help you decide.

{{IMG:2}}

## Part four: content and privacy

### 10. Sensitive information

Ask yourself what is in this file that the recipient does not need. Look at every page, including headers, footers, and margins. Identity numbers, account details, home addresses, and internal notes sometimes hide in places you have stopped noticing. If a page should not be shared, leave it out by extracting only the pages you need.

Be careful with the idea of covering something up. Placing a white box over text hides it visually, but you should not assume it is the same as removing it. When in doubt, leave the sensitive page out of the shared file entirely.

### 11. Leftovers from drafting

Check for comments, tracked changes, highlighted notes, and placeholder text such as insert name here. These are easy to miss in a long document and embarrassing when found. If the document came from a word processor, review it there and re-export, rather than trying to fix it inside the PDF.

### 12. The file name

A good name helps the recipient find and identify your file months later. Use something clear, such as your surname followed by the document type, for example smith-application-form.pdf. Avoid names like scan001, final-final, or new document. Very long names and unusual characters are sometimes rejected by upload systems.

## The two-minute routine

Here is how to run all twelve checks without it feeling like a chore.

- Open the final PDF in a viewer and switch to the thumbnail or page grid view.
- Scan the thumbnails for page count, order, orientation, and completeness. This takes about thirty seconds.
- Open two or three pages at full size and zoom in on the smallest text.
- Look at the file size in your file browser.
- Skim for sensitive details and leftover notes.
- Check the file name, then send.

:::highlight green
If you always check the first page, the last page, and one page from the middle, you will catch most problems. Errors tend to cluster at the edges of a document.
:::

## Situations that deserve extra care

:::highlight blue
Related guide: [A PDF workflow for freelancers](/blog/pdf-workflow-for-freelancers-invoices-and-contracts) covers invoices, contracts, and client packets in detail.
:::

### Contracts and legal documents

Confirm that every page is present, every signature and initial is in place, and the version is the correct one. Sending the wrong draft can cause real trouble, so check the date and any version marker.

### Job and admission applications

Check readability, order, and size against the portal's rules, and keep a copy of exactly what you uploaded. See our [checklist for preparing application documents](/blog/prepare-documents-for-online-application-checklist).

### Financial and medical paperwork

Share only the pages required, use official upload channels where offered, and avoid sending sensitive files through casual messaging apps. If you use online tools, choose ones that process files on your device, and read [are online PDF tools safe](/blog/are-online-pdf-tools-safe).

### Documents made from photos

Photos are the most common source of orientation, order, and size problems. Run the whole checklist. If the source was a phone, [our phone scan workflow](/blog/phone-scan-to-pdf-workflow) can prevent the problems in the first place.

## Mistakes people make even with a checklist

- Checking the source file instead of the final PDF. Problems often appear during conversion.
- Checking only the first page. Errors are frequently deeper in the file.
- Sending straight after compressing without looking at the result.
- Overwriting the original with the compressed version and losing the high-quality copy.
- Skipping the check when in a hurry, which is exactly when errors occur.

## Make it a habit

:::highlight blue
Related guide: [A simple system for organizing digital paperwork](/blog/digital-paperwork-organization-system) helps the checklist stick.
:::

The easiest way to keep the routine is to attach it to something you already do. Run it every time you are about to click attach or upload, the same way you glance at the recipient's address before pressing send. After a few weeks, the checks take less than a minute, and you will stop being the person whose file arrives sideways.

## Frequently asked questions

### How long should the final check take?

For most files, about two minutes. Longer documents take a bit more, but the thumbnail view keeps it quick.

### What is the single most important check?

Opening the final file and looking at every page thumbnail. That one step catches order, rotation, and completeness problems.

### Do I need to check again after compressing?

Yes. Compression can affect readability, especially of small text and photographs.

### Can I fix a problem without redoing everything?

Usually. Rotate, rearrange, delete, or extract on the existing file rather than starting again. Your original is never changed by these tools.

### What if I find a mistake after I have already sent the file?

Fix it, send the corrected file with a short note, and name it clearly so nobody uses the earlier version.

A checklist will not make you a perfectionist. It simply moves the moment of finding mistakes from after you send to before you send. Two minutes of review is a small price for documents that arrive upright, complete, readable, and exactly as you meant them.`,
    images: [
      { marker: 1, query: "checklist on clipboard with pen" },
      { marker: 2, query: "reading printed documents carefully" },
    ],
  },
  {
    slug: "combine-word-images-and-pdfs-into-one-document-package",
    title: "How to Combine Word Files, Images, and PDFs Into One Document Package",
    excerpt: "Convert each piece to PDF, put them in order, and deliver one tidy file. A practical workflow for applications, reports, and client packets.",
    seo_title: "Combine Word, Images, and PDFs Into One Document Package",
    seo_description: "Build one PDF from Word documents, photos, and existing PDFs. Step-by-step workflow with the right order, page sizes, and size checks.",
    category: "Convert to PDF",
    topic_cluster: "convert-to-pdf",
    author: "OnlyPDF Team",
    related_slugs: ["how-to-convert-word-jpg-images-to-pdf", "convert-word-to-pdf-without-losing-formatting", "how-to-merge-reorder-organize-pdf-files", "jpg-to-pdf-complete-guide"],
    featuredImageQuery: "assembling document package on desk",
    content: `# How to Combine Word Files, Images, and PDFs Into One Document Package

Sooner or later, most people have to deliver a bundle. A job application might include a cover letter written in Word, a photographed certificate, and a PDF transcript. A client packet might combine a proposal, a signed agreement, and a few pictures of a site. An insurance claim might need a statement, receipts, and photographs, all in a single upload.

The pieces come in different formats, and the recipient wants one clean file. The good news is that the solution is a simple two-stage process: turn every piece into a PDF, then merge the PDFs in the right order. This guide walks through it with the [Word to PDF](/tools/word-to-pdf), [JPG to PDF](/tools/jpg-to-pdf), and [merge PDF](/tools/merge-pdf) tools, and points out where each step can go wrong.

## The plan in one paragraph

Convert Word documents to PDF, convert images to PDF, leave existing PDFs as they are, then merge everything in the order the reader expects. Fix rotation and order, trim what you do not need, compress if there is a size limit, and check the result. The whole process typically takes ten to fifteen minutes for a small package.

{{IMG:1}}

## Step 1: Plan the package before you convert anything

Ten minutes of planning saves a lot of reworking. Decide:

- What documents must be included, and in what order.
- Whether the recipient wants one combined file or several.
- Any size limit for the final file.
- Whether pages should be a uniform size, such as A4 or US Letter.

Write the intended order as a short list. Something like cover letter, CV, certificate, transcript, reference is enough. When you merge, you will follow the list instead of deciding on the fly.

## Step 2: Convert Word documents to PDF

The [Word to PDF tool](/tools/word-to-pdf) takes one DOCX file at a time and creates a PDF in your browser. It is designed for text and paragraph content and produces a simple PDF. That means it works well for letters, statements, and straightforward documents, while complex layouts, floating objects, and advanced tables may not match the original exactly.

- Upload the DOCX file, one document at a time.
- Convert it.
- Download the PDF and open it before going further.

Check the layout carefully: headings, line breaks, tables, and any images. If your document relies on precise formatting, the most faithful approach is usually to export a PDF from your word processor's own save or export option, then use that PDF in the package. For more on getting good results, see [converting Word to PDF without losing formatting](/blog/convert-word-to-pdf-without-losing-formatting).

Note that the tool accepts DOCX files. If your document is in an older or different format, open it in your word processor and save it as DOCX or export it as a PDF directly.

## Step 3: Convert images to PDF

For photographs and scans, use the [JPG to PDF tool](/tools/jpg-to-pdf). It accepts JPG and JPEG images, and each image becomes one page. For PNG images, use the [PNG to PDF tool](/tools/png-to-pdf). The key choice is page size.

- Choose A4 or US Letter for anything that will be filed or printed as an official document. The image is centred on a standard page.
- Choose fit to image when the picture is the content and you want it shown exactly, such as photographs of a site.

Add related images together, arrange them in the right order with drag or the arrow buttons, and convert. If you have images for several different documents, convert each group separately so that each becomes its own PDF. Our [complete guide to JPG to PDF](/blog/jpg-to-pdf-complete-guide) covers page size and quality in more detail.

If the photos are of paper documents, take them carefully first. Even light, a flat page, and a straight-on angle make the biggest difference. The article on [turning phone photos into a perfect PDF](/blog/phone-scan-to-pdf-workflow) explains how.

## Step 4: Gather any existing PDFs

If you already have PDFs, such as a transcript or a signed form, you can use them as they are. Open each one to confirm that it is the right version, that pages are upright, and that nothing is missing. If only part of a long PDF belongs in the package, use the [extract PDF pages tool](/tools/extract-pdf-pages) to build a new file with only those pages.

## Step 5: Name your pieces so ordering is easy

Before merging, give each PDF a name that starts with a number showing its position, for example 01-cover-letter.pdf, 02-cv.pdf, 03-certificate.pdf, 04-transcript.pdf. That way, even a file browser sorts them correctly, and you are less likely to add them to the merge tool in the wrong order.

{{IMG:2}}

## Step 6: Merge everything in order

Open the [merge PDF tool](/tools/merge-pdf), which needs at least two files, and add all your PDFs. Drag the files into your planned order, then merge and download the result.

Everything runs in your browser, so the documents are processed on your own device. Our guides on [merging, reordering, and organizing PDF files](/blog/how-to-merge-reorder-organize-pdf-files) and [merging two PDF files](/blog/merge-two-pdf-files-free) cover the basics if you want more.

## Step 7: Fix rotation and page order in the combined file

Scroll through the merged PDF and check every page. If any page is sideways or upside down, use the [rotate PDF tool](/tools/rotate-pdf). If any page is in the wrong position, use the [rearrange PDF tool](/tools/rearrange-pdf), which shows page thumbnails you can drag into place and rotate.

If you find you need to change the order of whole documents rather than individual pages, it is usually quicker to go back to the merge step and redo it with the files in the right order.

## Step 8: Remove what does not belong

Delete blank pages, duplicates, or pages that were included by mistake, using the [delete PDF pages tool](/tools/delete-pdf-pages). Reviewing the package as a reader would is a good test: if a page does not help the reader, ask whether it should be there.

:::highlight blue
Think about privacy at this stage. Combined packages often contain more than the recipient needs. Remove or leave out anything that was not requested.
:::

## Step 9: Meet any size limit

Photographs make packages heavy, and a combined file can easily exceed an email or portal limit. Compress last, after everything else is finished, so that earlier steps work on full-quality files.

Use the [compress PDF tool](/tools/compress-pdf) with an automatic level (High, Medium, or Express), or choose target file size if you know the limit. Aim a little under the limit, then open the result and check that the smallest text is still readable. If the file is still too large, remove unneeded pages or accept a stronger level. See [PDF file size limits and how to meet them](/blog/pdf-file-size-limits-and-how-to-meet-them) for a full approach.

## Step 10: Final check

Before sending, review the package.

- Page count is what you expect.
- Documents appear in the planned order.
- Every page is upright and complete.
- Text is readable at normal zoom.
- Page sizes look consistent.
- File size is within the limit.
- The file name is clear, such as surname and package type.
- You have kept copies of your source files.

Our [12-point final checklist](/blog/check-pdf-before-sending-final-checklist) covers this in more depth.

## A worked example

Suppose you are applying for a scholarship. You have a personal statement in Word, a transcript as a PDF, and phone photos of two certificates.

- Convert the personal statement to PDF and confirm the layout.
- Add the two certificate photos to the JPG to PDF tool, choose A4, and convert.
- Name the files 01-statement.pdf, 02-transcript.pdf, and 03-certificates.pdf.
- Merge the three in that order.
- Scroll through, rotate the second certificate page, and delete a stray blank page.
- Compress to Medium, check readability, and confirm the size is under the portal limit.
- Name the final file with your surname and the word application, then upload it.

That is about a dozen minutes of work and six tools, each doing one small job.

## Common mistakes

- Merging before converting. The merge tool works on PDFs, so convert first.
- Converting every Word document with a tool when a direct export from your word processor would keep the layout better.
- Forgetting to check converted pages. A layout problem discovered after sending is much harder to fix.
- Compressing too early. Do it last.
- Mixing page sizes without meaning to. Choose A4 or US Letter for images when uniformity matters.
- Not keeping the source files. If something needs changing, you will need them.

## Working on a phone

All of these tools run in a mobile browser. Dragging is sometimes fiddly on a touchscreen, so use the arrow buttons for ordering where they are offered, and work through one step at a time. Downloads land in your browser's usual download location, so name files carefully to find them later.

## Privacy

Packages often include personal documents. Because the tools above process files in your browser, your documents are handled on your own device rather than being uploaded to a server first. Even so, share only what is required, and use the recipient's official channel. To check how a tool behaves, read [are online PDF tools safe](/blog/are-online-pdf-tools-safe).

## Frequently asked questions

### Can I merge a Word file directly with a PDF?

Not directly. Convert the Word file to PDF first, then merge the PDFs together.

### Does the Word to PDF tool keep my formatting perfectly?

It handles text and paragraph content, but complex layouts, floating objects, and advanced tables may not match exactly. Check the result, or export a PDF from your word processor for exact formatting.

### What order should the documents be in?

Follow the recipient's instructions. If there are none, use an order a reader would find natural, such as cover letter first, then main documents, then supporting material.

### Can I include an Excel spreadsheet?

This site has no spreadsheet converter. Export or print the spreadsheet to PDF from the program you use, then include that PDF in the package.

### What if the combined file is too big?

Remove unneeded pages, then compress. If it is still too large, use a stronger compression level or split the submission into more than one file if the recipient allows it.

Combining different file types into one package is straightforward once you separate the job into stages: convert, order, merge, fix, compress, and check. Do the stages in that sequence, and your recipient gets a single tidy file that looks as though it was planned from the start.`,
    images: [
      { marker: 1, query: "stack of organized documents and folder" },
      { marker: 2, query: "laptop and paperwork on desk" },
    ],
  },
];
