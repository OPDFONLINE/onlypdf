-- Blog links to the 12 new batch-7 articles (run AFTER those articles are published).
-- Idempotent: each statement runs only if its new text is not already present.

begin;

-- convert-pdf-to-jpg-pages
update public.blog_posts set content = replace(content, $o$
## Getting a sharp result

$o$, $n$
## Getting a sharp result

:::highlight blue
Related guide: [How to convert PDF to PNG for slides, docs, and sharp text](/blog/pdf-to-png-for-slides-docs-and-sharp-text) covers when PNG is the better choice and what size the images come out.
:::

$n$), updated_at = now()
  where slug = 'convert-pdf-to-jpg-pages' and position($n$
## Getting a sharp result

:::highlight blue
Related guide: [How to convert PDF to PNG for slides, docs, and sharp text](/blog/pdf-to-png-for-slides-docs-and-sharp-text) covers when PNG is the better choice and what size the images come out.
:::

$n$ in content) = 0 and position($o$
## Getting a sharp result

$o$ in content) > 0;
-- pdf-to-png-or-jpg-which-format
update public.blog_posts set content = replace(content, $o$
## Final recommendation

$o$, $n$
## Final recommendation

:::highlight blue
Related guide: [How to convert PDF to PNG for slides, docs, and sharp text](/blog/pdf-to-png-for-slides-docs-and-sharp-text) walks through the PNG route step by step.
:::

$n$), updated_at = now()
  where slug = 'pdf-to-png-or-jpg-which-format' and position($n$
## Final recommendation

:::highlight blue
Related guide: [How to convert PDF to PNG for slides, docs, and sharp text](/blog/pdf-to-png-for-slides-docs-and-sharp-text) walks through the PNG route step by step.
:::

$n$ in content) = 0 and position($o$
## Final recommendation

$o$ in content) > 0;
-- how-to-convert-pdf-to-word-or-images
update public.blog_posts set content = replace(content, $o$
## Exporting PDF pages as JPG or PNG images

$o$, $n$
## Exporting PDF pages as JPG or PNG images

:::highlight blue
Related guide: [How to convert PDF to PNG for slides, docs, and sharp text](/blog/pdf-to-png-for-slides-docs-and-sharp-text).
:::

$n$), updated_at = now()
  where slug = 'how-to-convert-pdf-to-word-or-images' and position($n$
## Exporting PDF pages as JPG or PNG images

:::highlight blue
Related guide: [How to convert PDF to PNG for slides, docs, and sharp text](/blog/pdf-to-png-for-slides-docs-and-sharp-text).
:::

$n$ in content) = 0 and position($o$
## Exporting PDF pages as JPG or PNG images

$o$ in content) > 0;
-- remove-blank-pages-from-scanned-pdf
update public.blog_posts set content = replace(content, $o$
## Keep a clean master

$o$, $n$
## Keep a clean master

:::highlight blue
Related guide: need the opposite? [How to add a blank page to a PDF](/blog/add-blank-page-to-pdf) shows how to insert one exactly where you want it.
:::

$n$), updated_at = now()
  where slug = 'remove-blank-pages-from-scanned-pdf' and position($n$
## Keep a clean master

:::highlight blue
Related guide: need the opposite? [How to add a blank page to a PDF](/blog/add-blank-page-to-pdf) shows how to insert one exactly where you want it.
:::

$n$ in content) = 0 and position($o$
## Keep a clean master

$o$ in content) > 0;
-- rearrange-pdf-pages-online
update public.blog_posts set content = replace(content, $o$
## Rearranging versus other tools

$o$, $n$
## Rearranging versus other tools

:::highlight blue
Related guides: to add new pages rather than move existing ones, read [how to insert pages into a PDF](/blog/insert-pages-into-pdf-complete-guide) and [how to add a blank page to a PDF](/blog/add-blank-page-to-pdf).
:::

$n$), updated_at = now()
  where slug = 'rearrange-pdf-pages-online' and position($n$
## Rearranging versus other tools

:::highlight blue
Related guides: to add new pages rather than move existing ones, read [how to insert pages into a PDF](/blog/insert-pages-into-pdf-complete-guide) and [how to add a blank page to a PDF](/blog/add-blank-page-to-pdf).
:::

$n$ in content) = 0 and position($o$
## Rearranging versus other tools

$o$ in content) > 0;
-- merge-two-pdf-files-free
update public.blog_posts set content = replace(content, $o$
## When two files should stay separate instead

$o$, $n$
## When two files should stay separate instead

:::highlight blue
Related guides: [how to insert pages from one PDF into another at a specific position](/blog/insert-pages-from-another-pdf-at-specific-position) and [insert vs merge: which tool to use](/blog/insert-vs-merge-pdf-which-tool).
:::

$n$), updated_at = now()
  where slug = 'merge-two-pdf-files-free' and position($n$
## When two files should stay separate instead

:::highlight blue
Related guides: [how to insert pages from one PDF into another at a specific position](/blog/insert-pages-from-another-pdf-at-specific-position) and [insert vs merge: which tool to use](/blog/insert-vs-merge-pdf-which-tool).
:::

$n$ in content) = 0 and position($o$
## When two files should stay separate instead

$o$ in content) > 0;
-- extract-pages-from-pdf-complete-guide
update public.blog_posts set content = replace(content, $o$
## Combining extraction with other tools

$o$, $n$
## Combining extraction with other tools

:::highlight blue
Related guide: [How to insert pages from one PDF into another at a specific position](/blog/insert-pages-from-another-pdf-at-specific-position) shows how to place extracted pages inside a different document.
:::

$n$), updated_at = now()
  where slug = 'extract-pages-from-pdf-complete-guide' and position($n$
## Combining extraction with other tools

:::highlight blue
Related guide: [How to insert pages from one PDF into another at a specific position](/blog/insert-pages-from-another-pdf-at-specific-position) shows how to place extracted pages inside a different document.
:::

$n$ in content) = 0 and position($o$
## Combining extraction with other tools

$o$ in content) > 0;
-- delete-pages-from-pdf-free
update public.blog_posts set content = replace(content, $o$
## Delete or extract?

$o$, $n$
## Delete or extract?

:::highlight blue
Related guide: swapping an outdated page for a new one? [How to replace a page in a PDF](/blog/replace-a-page-in-a-pdf) combines insert and delete.
:::

$n$), updated_at = now()
  where slug = 'delete-pages-from-pdf-free' and position($n$
## Delete or extract?

:::highlight blue
Related guide: swapping an outdated page for a new one? [How to replace a page in a PDF](/blog/replace-a-page-in-a-pdf) combines insert and delete.
:::

$n$ in content) = 0 and position($o$
## Delete or extract?

$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$
## A note on sensitive information

$o$, $n$
## A note on sensitive information

:::highlight blue
Related guide: [Cover vs redact](/blog/cover-vs-redact-pdf-hide-sensitive-information) explains why a box drawn over text does not remove it, and how to remove information properly.
:::

$n$), updated_at = now()
  where slug = 'delete-pages-from-pdf-free' and position($n$
## A note on sensitive information

:::highlight blue
Related guide: [Cover vs redact](/blog/cover-vs-redact-pdf-hide-sensitive-information) explains why a box drawn over text does not remove it, and how to remove information properly.
:::

$n$ in content) = 0 and position($o$
## A note on sensitive information

$o$ in content) > 0;
-- phone-scan-to-pdf-workflow
update public.blog_posts set content = replace(content, $o$
## Step 5: Fix page order

$o$, $n$
## Step 5: Fix page order

:::highlight blue
Related guide: if one photo turned out badly, [how to replace a page in a PDF](/blog/replace-a-page-in-a-pdf) swaps in a retake without rebuilding the whole file.
:::

$n$), updated_at = now()
  where slug = 'phone-scan-to-pdf-workflow' and position($n$
## Step 5: Fix page order

:::highlight blue
Related guide: if one photo turned out badly, [how to replace a page in a PDF](/blog/replace-a-page-in-a-pdf) swaps in a retake without rebuilding the whole file.
:::

$n$ in content) = 0 and position($o$
## Step 5: Fix page order

$o$ in content) > 0;
-- jpg-to-pdf-complete-guide
update public.blog_posts set content = replace(content, $o$
## What the tool accepts

$o$, $n$
## What the tool accepts

:::highlight blue
Related guide: [How to convert screenshots and PNG images to PDF](/blog/convert-screenshots-png-to-pdf) covers the PNG side, including page size choices for screenshots.
:::

$n$), updated_at = now()
  where slug = 'jpg-to-pdf-complete-guide' and position($n$
## What the tool accepts

:::highlight blue
Related guide: [How to convert screenshots and PNG images to PDF](/blog/convert-screenshots-png-to-pdf) covers the PNG side, including page size choices for screenshots.
:::

$n$ in content) = 0 and position($o$
## What the tool accepts

$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$
## Quality: what really happens to your images

$o$, $n$
## Quality: what really happens to your images

:::highlight blue
Related guide: [PNG or JPG to PDF: which image type should you use?](/blog/png-vs-jpg-to-pdf-which-to-use) compares sharpness and file size.
:::

$n$), updated_at = now()
  where slug = 'jpg-to-pdf-complete-guide' and position($n$
## Quality: what really happens to your images

:::highlight blue
Related guide: [PNG or JPG to PDF: which image type should you use?](/blog/png-vs-jpg-to-pdf-which-to-use) compares sharpness and file size.
:::

$n$ in content) = 0 and position($o$
## Quality: what really happens to your images

$o$ in content) > 0;
-- convert-multiple-jpg-to-one-pdf
update public.blog_posts set content = replace(content, $o$
## Handling images of different sizes and orientations

$o$, $n$
## Handling images of different sizes and orientations

:::highlight blue
Related guide: for screenshots and other PNG files, see [how to convert screenshots and PNG images to PDF](/blog/convert-screenshots-png-to-pdf).
:::

$n$), updated_at = now()
  where slug = 'convert-multiple-jpg-to-one-pdf' and position($n$
## Handling images of different sizes and orientations

:::highlight blue
Related guide: for screenshots and other PNG files, see [how to convert screenshots and PNG images to PDF](/blog/convert-screenshots-png-to-pdf).
:::

$n$ in content) = 0 and position($o$
## Handling images of different sizes and orientations

$o$ in content) > 0;
-- pdf-vs-word-vs-jpg-choosing-the-right-file-format
update public.blog_posts set content = replace(content, $o$
## JPG: the format for pictures

$o$, $n$
## JPG: the format for pictures

:::highlight blue
Related guide: [PNG or JPG to PDF: which image type should you use?](/blog/png-vs-jpg-to-pdf-which-to-use) helps when you can choose the image format.
:::

$n$), updated_at = now()
  where slug = 'pdf-vs-word-vs-jpg-choosing-the-right-file-format' and position($n$
## JPG: the format for pictures

:::highlight blue
Related guide: [PNG or JPG to PDF: which image type should you use?](/blog/png-vs-jpg-to-pdf-which-to-use) helps when you can choose the image format.
:::

$n$ in content) = 0 and position($o$
## JPG: the format for pictures

$o$ in content) > 0;
-- remove-watermark-from-pdf-selected-area
update public.blog_posts set content = replace(content, $o$
## Alternatives worth considering

$o$, $n$
## Alternatives worth considering

:::highlight blue
Related guide: [Is it OK to remove a watermark from a PDF?](/blog/is-it-ok-to-remove-a-pdf-watermark) covers permission, rights, and cleaner alternatives.
:::

$n$), updated_at = now()
  where slug = 'remove-watermark-from-pdf-selected-area' and position($n$
## Alternatives worth considering

:::highlight blue
Related guide: [Is it OK to remove a watermark from a PDF?](/blog/is-it-ok-to-remove-a-pdf-watermark) covers permission, rights, and cleaner alternatives.
:::

$n$ in content) = 0 and position($o$
## Alternatives worth considering

$o$ in content) > 0;
-- how-to-remove-watermark-from-pdf
update public.blog_posts set content = replace(content, $o$
## Common mistakes worth avoiding

$o$, $n$
## Common mistakes worth avoiding

:::highlight blue
Related guide: [Is it OK to remove a watermark from a PDF?](/blog/is-it-ok-to-remove-a-pdf-watermark) explains when you need permission first.
:::

$n$), updated_at = now()
  where slug = 'how-to-remove-watermark-from-pdf' and position($n$
## Common mistakes worth avoiding

:::highlight blue
Related guide: [Is it OK to remove a watermark from a PDF?](/blog/is-it-ok-to-remove-a-pdf-watermark) explains when you need permission first.
:::

$n$ in content) = 0 and position($o$
## Common mistakes worth avoiding

$o$ in content) > 0;
-- are-online-pdf-tools-safe
update public.blog_posts set content = replace(content, $o$
## Is anything ever uploaded?

$o$, $n$
## Is anything ever uploaded?

:::highlight blue
Related guide: [What "processed in your browser" really means](/blog/what-processed-in-your-browser-really-means) explains what stays on your device and what does not.
:::

$n$), updated_at = now()
  where slug = 'are-online-pdf-tools-safe' and position($n$
## Is anything ever uploaded?

:::highlight blue
Related guide: [What "processed in your browser" really means](/blog/what-processed-in-your-browser-really-means) explains what stays on your device and what does not.
:::

$n$ in content) = 0 and position($o$
## Is anything ever uploaded?

$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$
## Sensitive documents and what to do with them

$o$, $n$
## Sensitive documents and what to do with them

:::highlight blue
Related guides: [cover vs redact](/blog/cover-vs-redact-pdf-hide-sensitive-information) and [what to do with a password-protected PDF](/blog/password-protected-pdf-what-to-do-first).
:::

$n$), updated_at = now()
  where slug = 'are-online-pdf-tools-safe' and position($n$
## Sensitive documents and what to do with them

:::highlight blue
Related guides: [cover vs redact](/blog/cover-vs-redact-pdf-hide-sensitive-information) and [what to do with a password-protected PDF](/blog/password-protected-pdf-what-to-do-first).
:::

$n$ in content) = 0 and position($o$
## Sensitive documents and what to do with them

$o$ in content) > 0;
-- use-pdf-tools-on-phone-complete-guide
update public.blog_posts set content = replace(content, $o$
## Privacy on a phone

$o$, $n$
## Privacy on a phone

:::highlight blue
Related guide: [What "processed in your browser" really means](/blog/what-processed-in-your-browser-really-means).
:::

$n$), updated_at = now()
  where slug = 'use-pdf-tools-on-phone-complete-guide' and position($n$
## Privacy on a phone

:::highlight blue
Related guide: [What "processed in your browser" really means](/blog/what-processed-in-your-browser-really-means).
:::

$n$ in content) = 0 and position($o$
## Privacy on a phone

$o$ in content) > 0;
-- which-pdf-tool-do-i-need-cheat-sheet
update public.blog_posts set content = replace(content, $o$
## What none of these tools do

$o$, $n$
## What none of these tools do

:::highlight blue
Related guide: [Password-protected PDF? What to do first](/blog/password-protected-pdf-what-to-do-first) covers locked files.
:::

$n$), updated_at = now()
  where slug = 'which-pdf-tool-do-i-need-cheat-sheet' and position($n$
## What none of these tools do

:::highlight blue
Related guide: [Password-protected PDF? What to do first](/blog/password-protected-pdf-what-to-do-first) covers locked files.
:::

$n$ in content) = 0 and position($o$
## What none of these tools do

$o$ in content) > 0;

commit;

select v.slug, position(v.snippet in coalesce(p.content,'')) > 0 as applied
from (values
  ('convert-pdf-to-jpg-pages', $s$## Getting a sharp result

:::highlight blue
Related guide: [How to convert PDF to PNG for slides, docs, and sharp text](/blog/pdf-to-png-for-slides-docs-and-sh$s$),
  ('pdf-to-png-or-jpg-which-format', $s$## Final recommendation

:::highlight blue
Related guide: [How to convert PDF to PNG for slides, docs, and sharp text](/blog/pdf-to-png-for-slides-docs-and-shar$s$),
  ('how-to-convert-pdf-to-word-or-images', $s$## Exporting PDF pages as JPG or PNG images

:::highlight blue
Related guide: [How to convert PDF to PNG for slides, docs, and sharp text](/blog/pdf-to-png-for-$s$),
  ('remove-blank-pages-from-scanned-pdf', $s$## Keep a clean master

:::highlight blue
Related guide: need the opposite? [How to add a blank page to a PDF](/blog/add-blank-page-to-pdf) shows how to insert $s$),
  ('rearrange-pdf-pages-online', $s$## Rearranging versus other tools

:::highlight blue
Related guides: to add new pages rather than move existing ones, read [how to insert pages into a PDF](/blo$s$),
  ('merge-two-pdf-files-free', $s$## When two files should stay separate instead

:::highlight blue
Related guides: [how to insert pages from one PDF into another at a specific position](/blog/i$s$),
  ('extract-pages-from-pdf-complete-guide', $s$## Combining extraction with other tools

:::highlight blue
Related guide: [How to insert pages from one PDF into another at a specific position](/blog/insert-p$s$),
  ('delete-pages-from-pdf-free', $s$## Delete or extract?

:::highlight blue
Related guide: swapping an outdated page for a new one? [How to replace a page in a PDF](/blog/replace-a-page-in-a-pdf)$s$),
  ('delete-pages-from-pdf-free', $s$## A note on sensitive information

:::highlight blue
Related guide: [Cover vs redact](/blog/cover-vs-redact-pdf-hide-sensitive-information) explains why a box $s$),
  ('phone-scan-to-pdf-workflow', $s$## Step 5: Fix page order

:::highlight blue
Related guide: if one photo turned out badly, [how to replace a page in a PDF](/blog/replace-a-page-in-a-pdf) swaps$s$),
  ('jpg-to-pdf-complete-guide', $s$## What the tool accepts

:::highlight blue
Related guide: [How to convert screenshots and PNG images to PDF](/blog/convert-screenshots-png-to-pdf) covers the P$s$),
  ('jpg-to-pdf-complete-guide', $s$## Quality: what really happens to your images

:::highlight blue
Related guide: [PNG or JPG to PDF: which image type should you use?](/blog/png-vs-jpg-to-pdf-w$s$),
  ('convert-multiple-jpg-to-one-pdf', $s$## Handling images of different sizes and orientations

:::highlight blue
Related guide: for screenshots and other PNG files, see [how to convert screenshots an$s$),
  ('pdf-vs-word-vs-jpg-choosing-the-right-file-format', $s$## JPG: the format for pictures

:::highlight blue
Related guide: [PNG or JPG to PDF: which image type should you use?](/blog/png-vs-jpg-to-pdf-which-to-use) he$s$),
  ('remove-watermark-from-pdf-selected-area', $s$## Alternatives worth considering

:::highlight blue
Related guide: [Is it OK to remove a watermark from a PDF?](/blog/is-it-ok-to-remove-a-pdf-watermark) cover$s$),
  ('how-to-remove-watermark-from-pdf', $s$## Common mistakes worth avoiding

:::highlight blue
Related guide: [Is it OK to remove a watermark from a PDF?](/blog/is-it-ok-to-remove-a-pdf-watermark) expla$s$),
  ('are-online-pdf-tools-safe', $s$## Is anything ever uploaded?

:::highlight blue
Related guide: [What "processed in your browser" really means](/blog/what-processed-in-your-browser-really-mean$s$),
  ('are-online-pdf-tools-safe', $s$## Sensitive documents and what to do with them

:::highlight blue
Related guides: [cover vs redact](/blog/cover-vs-redact-pdf-hide-sensitive-information) and [$s$),
  ('use-pdf-tools-on-phone-complete-guide', $s$## Privacy on a phone

:::highlight blue
Related guide: [What "processed in your browser" really means](/blog/what-processed-in-your-browser-really-means).
:::$s$),
  ('which-pdf-tool-do-i-need-cheat-sheet', $s$## What none of these tools do

:::highlight blue
Related guide: [Password-protected PDF? What to do first](/blog/password-protected-pdf-what-to-do-first) cover$s$)
) as v(slug, snippet)
join public.blog_posts p on p.slug = v.slug
order by applied, v.slug;
