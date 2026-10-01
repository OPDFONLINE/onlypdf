-- Blog refresh: PNG/JPG tool wording, new-tool coverage, and internal links.
-- Idempotent: each statement runs only if its new text is not already present,
-- so running this file twice changes nothing the second time.
-- It edits only the exact sentences listed; images and any manual edits elsewhere are kept.

begin;

-- how-to-convert-word-jpg-images-to-pdf
update public.blog_posts set content = replace(content, $o$- Add every JPG, JPEG, or PNG image that should be included.$o$, $n$- Add every JPG or JPEG image that should be included. PNG images, such as screenshots, use the [PNG to PDF tool](/tools/png-to-pdf) instead.$n$), updated_at = now()
  where slug = 'how-to-convert-word-jpg-images-to-pdf' and position($n$- Add every JPG or JPEG image that should be included. PNG images, such as screenshots, use the [PNG to PDF tool](/tools/png-to-pdf) instead.$n$ in content) = 0 and position($o$- Add every JPG, JPEG, or PNG image that should be included.$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$An important detail worth knowing: converting images into a PDF does not recompress$o$, $n$If one batch mixes JPG and PNG files, make one PDF from each format and join them with the [merge PDF tool](/tools/merge-pdf).

An important detail worth knowing: converting images into a PDF does not recompress$n$), updated_at = now()
  where slug = 'how-to-convert-word-jpg-images-to-pdf' and position($n$If one batch mixes JPG and PNG files, make one PDF from each format and join them with the [merge PDF tool](/tools/merge-pdf).

An important detail worth knowing: converting images into a PDF does not recompress$n$ in content) = 0 and position($o$An important detail worth knowing: converting images into a PDF does not recompress$o$ in content) > 0;
-- how-to-convert-pdf-to-word-or-images
update public.blog_posts set content = replace(content, $o$A [PDF to image tool](/tools/pdf-to-jpg) handles this directly:$o$, $n$The [PDF to JPG tool](/tools/pdf-to-jpg) and the [PDF to PNG tool](/tools/pdf-to-png) handle this directly, one image format per tool. For a full walkthrough of the JPG route, see our guide to [converting PDF pages to JPG images](/blog/convert-pdf-to-jpg-pages):$n$), updated_at = now()
  where slug = 'how-to-convert-pdf-to-word-or-images' and position($n$The [PDF to JPG tool](/tools/pdf-to-jpg) and the [PDF to PNG tool](/tools/pdf-to-png) handle this directly, one image format per tool. For a full walkthrough of the JPG route, see our guide to [converting PDF pages to JPG images](/blog/convert-pdf-to-jpg-pages):$n$ in content) = 0 and position($o$A [PDF to image tool](/tools/pdf-to-jpg) handles this directly:$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$- Pick JPG for a smaller file that works well for most ordinary documents, or PNG when a page contains fine text, line art, or transparency that benefits from being preserved exactly.$o$, $n$- Use PDF to JPG for a smaller file that works well for most ordinary documents, or PDF to PNG when a page contains fine text, line art, or sharp edges that benefit from lossless output.$n$), updated_at = now()
  where slug = 'how-to-convert-pdf-to-word-or-images' and position($n$- Use PDF to JPG for a smaller file that works well for most ordinary documents, or PDF to PNG when a page contains fine text, line art, or sharp edges that benefit from lossless output.$n$ in content) = 0 and position($o$- Pick JPG for a smaller file that works well for most ordinary documents, or PNG when a page contains fine text, line art, or transparency that benefits from being preserved exactly.$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$situations where JPG's compression approach can introduce visible artifacts around sharp boundaries.$o$, $n$situations where JPG's compression approach can introduce visible artifacts around sharp boundaries. Because each format has its own tool, choose [PDF to JPG](/tools/pdf-to-jpg) or [PDF to PNG](/tools/pdf-to-png) before you upload.$n$), updated_at = now()
  where slug = 'how-to-convert-pdf-to-word-or-images' and position($n$situations where JPG's compression approach can introduce visible artifacts around sharp boundaries. Because each format has its own tool, choose [PDF to JPG](/tools/pdf-to-jpg) or [PDF to PNG](/tools/pdf-to-png) before you upload.$n$ in content) = 0 and position($o$situations where JPG's compression approach can introduce visible artifacts around sharp boundaries.$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$PNG when a page has fine text, line drawings, or transparency that needs to stay exact.$o$, $n$PNG when a page has fine text, line drawings, or transparency that needs to stay exact. The two formats have separate tools, [PDF to JPG](/tools/pdf-to-jpg) and [PDF to PNG](/tools/pdf-to-png).$n$), updated_at = now()
  where slug = 'how-to-convert-pdf-to-word-or-images' and position($n$PNG when a page has fine text, line drawings, or transparency that needs to stay exact. The two formats have separate tools, [PDF to JPG](/tools/pdf-to-jpg) and [PDF to PNG](/tools/pdf-to-png).$n$ in content) = 0 and position($o$PNG when a page has fine text, line drawings, or transparency that needs to stay exact.$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$would be needed to extract usable text.$o$, $n$would be needed to extract usable text. Our guide to [telling a scanned PDF from a digital one](/blog/scanned-pdf-vs-digital-pdf-how-to-tell) shows how to check in seconds.$n$), updated_at = now()
  where slug = 'how-to-convert-pdf-to-word-or-images' and position($n$would be needed to extract usable text. Our guide to [telling a scanned PDF from a digital one](/blog/scanned-pdf-vs-digital-pdf-how-to-tell) shows how to check in seconds.$n$ in content) = 0 and position($o$would be needed to extract usable text.$o$ in content) > 0;
-- convert-pdf-to-jpg-pages
update public.blog_posts set excerpt = replace(excerpt, $o$Turn any page of a PDF into a JPG or PNG you can post, embed, or send.$o$, $n$Turn any page of a PDF into a JPG you can post, embed, or send.$n$), updated_at = now()
  where slug = 'convert-pdf-to-jpg-pages' and position($n$Turn any page of a PDF into a JPG you can post, embed, or send.$n$ in excerpt) = 0 and position($o$Turn any page of a PDF into a JPG or PNG you can post, embed, or send.$o$ in excerpt) > 0;
update public.blog_posts set seo_description = replace(seo_description, $o$into JPG or PNG images in your browser.$o$, $n$into JPG images in your browser.$n$), updated_at = now()
  where slug = 'convert-pdf-to-jpg-pages' and position($n$into JPG images in your browser.$n$ in seo_description) = 0 and position($o$into JPG or PNG images in your browser.$o$ in seo_description) > 0;
update public.blog_posts set content = replace(content, $o$- Choose JPG or PNG as the output format.
- Select Convert and download the result.$o$, $n$- Select Convert to JPG and download the result. Need PNG instead? Use the [PDF to PNG tool](/tools/pdf-to-png).$n$), updated_at = now()
  where slug = 'convert-pdf-to-jpg-pages' and position($n$- Select Convert to JPG and download the result. Need PNG instead? Use the [PDF to PNG tool](/tools/pdf-to-png).$n$ in content) = 0 and position($o$- Choose JPG or PNG as the output format.
- Select Convert and download the result.$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$- Use PNG for pages with fine text or line art, since it keeps edges clean.$o$, $n$- Use the [PDF to PNG tool](/tools/pdf-to-png) for pages with fine text or line art, since PNG keeps edges clean.$n$), updated_at = now()
  where slug = 'convert-pdf-to-jpg-pages' and position($n$- Use the [PDF to PNG tool](/tools/pdf-to-png) for pages with fine text or line art, since PNG keeps edges clean.$n$ in content) = 0 and position($o$- Use PNG for pages with fine text or line art, since it keeps edges clean.$o$ in content) > 0;
-- pdf-to-png-or-jpg-which-format
update public.blog_posts set content = replace(content, $o$If you are unsure, convert one page both ways and compare. The [PDF to JPG tool](/tools/pdf-to-jpg) offers both formats.$o$, $n$If you are unsure, convert one page both ways and compare. Each format has its own tool: [PDF to JPG](/tools/pdf-to-jpg) and [PDF to PNG](/tools/pdf-to-png).$n$), updated_at = now()
  where slug = 'pdf-to-png-or-jpg-which-format' and position($n$If you are unsure, convert one page both ways and compare. Each format has its own tool: [PDF to JPG](/tools/pdf-to-jpg) and [PDF to PNG](/tools/pdf-to-png).$n$ in content) = 0 and position($o$If you are unsure, convert one page both ways and compare. The [PDF to JPG tool](/tools/pdf-to-jpg) offers both formats.$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$Pages you plan to overlay on other graphics. PNG, if the page has transparency you want to preserve.$o$, $n$Pages you plan to overlay on other graphics. PNG, if the page has transparency you want to preserve. PDF to PNG leaves any area the page does not paint transparent, while PDF to JPG fills the background with white, so choose PNG only if you want that transparency.$n$), updated_at = now()
  where slug = 'pdf-to-png-or-jpg-which-format' and position($n$Pages you plan to overlay on other graphics. PNG, if the page has transparency you want to preserve. PDF to PNG leaves any area the page does not paint transparent, while PDF to JPG fills the background with white, so choose PNG only if you want that transparency.$n$ in content) = 0 and position($o$Pages you plan to overlay on other graphics. PNG, if the page has transparency you want to preserve.$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$The [JPG to PDF tool](/tools/jpg-to-pdf) accepts JPG, JPEG, and PNG images and puts them into a single PDF.$o$, $n$Use the [JPG to PDF tool](/tools/jpg-to-pdf) for JPG and JPEG images, or the [PNG to PDF tool](/tools/png-to-pdf) for PNG images. Each puts your images into a single PDF.$n$), updated_at = now()
  where slug = 'pdf-to-png-or-jpg-which-format' and position($n$Use the [JPG to PDF tool](/tools/jpg-to-pdf) for JPG and JPEG images, or the [PNG to PDF tool](/tools/png-to-pdf) for PNG images. Each puts your images into a single PDF.$n$ in content) = 0 and position($o$The [JPG to PDF tool](/tools/jpg-to-pdf) accepts JPG, JPEG, and PNG images and puts them into a single PDF.$o$ in content) > 0;
-- jpg-to-pdf-complete-guide
update public.blog_posts set seo_description = replace(seo_description, $o$Convert JPG, JPEG, and PNG images into one PDF for free.$o$, $n$Convert JPG and JPEG images into one PDF for free (PNG has its own tool).$n$), updated_at = now()
  where slug = 'jpg-to-pdf-complete-guide' and position($n$Convert JPG and JPEG images into one PDF for free (PNG has its own tool).$n$ in seo_description) = 0 and position($o$Convert JPG, JPEG, and PNG images into one PDF for free.$o$ in seo_description) > 0;
update public.blog_posts set content = replace(content, $o$The tool takes JPG, JPEG, and PNG images.$o$, $n$The tool takes JPG and JPEG images. PNG images, which is what most screenshots are, have their own [PNG to PDF tool](/tools/png-to-pdf) that works the same way. Each run handles one format, so if you have both, make one PDF from each and join them with the [merge PDF tool](/tools/merge-pdf).$n$), updated_at = now()
  where slug = 'jpg-to-pdf-complete-guide' and position($n$The tool takes JPG and JPEG images. PNG images, which is what most screenshots are, have their own [PNG to PDF tool](/tools/png-to-pdf) that works the same way. Each run handles one format, so if you have both, make one PDF from each and join them with the [merge PDF tool](/tools/merge-pdf).$n$ in content) = 0 and position($o$The tool takes JPG, JPEG, and PNG images.$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$converts pages back into JPG or PNG images, so$o$, $n$converts pages back into JPG images, and the [PDF to PNG tool](/tools/pdf-to-png) does the same for PNG images, so$n$), updated_at = now()
  where slug = 'jpg-to-pdf-complete-guide' and position($n$converts pages back into JPG images, and the [PDF to PNG tool](/tools/pdf-to-png) does the same for PNG images, so$n$ in content) = 0 and position($o$converts pages back into JPG or PNG images, so$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$Our guide to [merging PDFs on a phone](/blog/merge-pdf-files-in-order-on-phone) covers the mobile workflow.$o$, $n$Our guide to [merging PDFs on a phone](/blog/merge-pdf-files-in-order-on-phone) covers the mobile workflow. To place images at an exact spot inside a longer PDF, such as after page 7, the [Insert PDF Pages tool](/tools/insert-pdf-pages) accepts JPG and PNG images directly, with each image becoming one A4 page.$n$), updated_at = now()
  where slug = 'jpg-to-pdf-complete-guide' and position($n$Our guide to [merging PDFs on a phone](/blog/merge-pdf-files-in-order-on-phone) covers the mobile workflow. To place images at an exact spot inside a longer PDF, such as after page 7, the [Insert PDF Pages tool](/tools/insert-pdf-pages) accepts JPG and PNG images directly, with each image becoming one A4 page.$n$ in content) = 0 and position($o$Our guide to [merging PDFs on a phone](/blog/merge-pdf-files-in-order-on-phone) covers the mobile workflow.$o$ in content) > 0;
-- pdf-vs-word-vs-jpg-choosing-the-right-file-format
update public.blog_posts set content = replace(content, $o$puts JPG, JPEG, or PNG images into a single PDF, with page sizes of fit to image, A4, or US Letter.$o$, $n$puts JPG or JPEG images into a single PDF, with page sizes of fit to image, A4, or US Letter. PNG images, such as screenshots, use the [PNG to PDF tool](/tools/png-to-pdf).$n$), updated_at = now()
  where slug = 'pdf-vs-word-vs-jpg-choosing-the-right-file-format' and position($n$puts JPG or JPEG images into a single PDF, with page sizes of fit to image, A4, or US Letter. PNG images, such as screenshots, use the [PNG to PDF tool](/tools/png-to-pdf).$n$ in content) = 0 and position($o$puts JPG, JPEG, or PNG images into a single PDF, with page sizes of fit to image, A4, or US Letter.$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$turns chosen pages into JPG or PNG images, bundled in a ZIP if there are several.$o$, $n$turns chosen pages into JPG images, bundled in a ZIP if there are several, and the [PDF to PNG tool](/tools/pdf-to-png) does the same for PNG.$n$), updated_at = now()
  where slug = 'pdf-vs-word-vs-jpg-choosing-the-right-file-format' and position($n$turns chosen pages into JPG images, bundled in a ZIP if there are several, and the [PDF to PNG tool](/tools/pdf-to-png) does the same for PNG.$n$ in content) = 0 and position($o$turns chosen pages into JPG or PNG images, bundled in a ZIP if there are several.$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$Convert it from the PDF, and keep the original PDF in case you need the text later.$o$, $n$Convert it from the PDF with the [PDF to JPG](/tools/pdf-to-jpg) or [PDF to PNG](/tools/pdf-to-png) tool, and keep the original PDF in case you need the text later.$n$), updated_at = now()
  where slug = 'pdf-vs-word-vs-jpg-choosing-the-right-file-format' and position($n$Convert it from the PDF with the [PDF to JPG](/tools/pdf-to-jpg) or [PDF to PNG](/tools/pdf-to-png) tool, and keep the original PDF in case you need the text later.$n$ in content) = 0 and position($o$Convert it from the PDF, and keep the original PDF in case you need the text later.$o$ in content) > 0;
-- combine-word-images-and-pdfs-into-one-document-package
update public.blog_posts set content = replace(content, $o$It accepts JPG, JPEG, and PNG images, and each image becomes one page.$o$, $n$It accepts JPG and JPEG images, and each image becomes one page. For PNG images, use the [PNG to PDF tool](/tools/png-to-pdf).$n$), updated_at = now()
  where slug = 'combine-word-images-and-pdfs-into-one-document-package' and position($n$It accepts JPG and JPEG images, and each image becomes one page. For PNG images, use the [PNG to PDF tool](/tools/png-to-pdf).$n$ in content) = 0 and position($o$It accepts JPG, JPEG, and PNG images, and each image becomes one page.$o$ in content) > 0;
-- use-pdf-tools-on-phone-complete-guide
update public.blog_posts set content = replace(content, $o$Use the [PDF to JPG tool](/tools/pdf-to-jpg), choose your pages, pick JPG or PNG, and download.$o$, $n$Use the [PDF to JPG tool](/tools/pdf-to-jpg), or the [PDF to PNG tool](/tools/pdf-to-png) if you need PNG, choose your pages, and download.$n$), updated_at = now()
  where slug = 'use-pdf-tools-on-phone-complete-guide' and position($n$Use the [PDF to JPG tool](/tools/pdf-to-jpg), or the [PDF to PNG tool](/tools/pdf-to-png) if you need PNG, choose your pages, and download.$n$ in content) = 0 and position($o$Use the [PDF to JPG tool](/tools/pdf-to-jpg), choose your pages, pick JPG or PNG, and download.$o$ in content) > 0;
-- which-pdf-tool-do-i-need-cheat-sheet
update public.blog_posts set content = replace(content, $o$All twelve tools on this site run in your browser$o$, $n$All fifteen tools on this site run in your browser$n$), updated_at = now()
  where slug = 'which-pdf-tool-do-i-need-cheat-sheet' and position($n$All fifteen tools on this site run in your browser$n$ in content) = 0 and position($o$All twelve tools on this site run in your browser$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$All twelve tools process files in your browser$o$, $n$All fifteen tools process files in your browser$n$), updated_at = now()
  where slug = 'which-pdf-tool-do-i-need-cheat-sheet' and position($n$All fifteen tools process files in your browser$n$ in content) = 0 and position($o$All twelve tools process files in your browser$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$It accepts JPG, JPEG, and PNG images, turns each into a page,$o$, $n$It accepts JPG and JPEG images, turns each into a page,$n$), updated_at = now()
  where slug = 'which-pdf-tool-do-i-need-cheat-sheet' and position($n$It accepts JPG and JPEG images, turns each into a page,$n$ in content) = 0 and position($o$It accepts JPG, JPEG, and PNG images, turns each into a page,$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$
### "I have a Word document and need a PDF"
$o$, $n$
### "My images are PNG files or screenshots"

Use the [PNG to PDF tool](/tools/png-to-pdf). It works like JPG to PDF but takes PNG images. If a batch mixes JPG and PNG, make one PDF with each tool and join them with the [merge PDF tool](/tools/merge-pdf).

### "I have a Word document and need a PDF"
$n$), updated_at = now()
  where slug = 'which-pdf-tool-do-i-need-cheat-sheet' and position($n$
### "My images are PNG files or screenshots"

Use the [PNG to PDF tool](/tools/png-to-pdf). It works like JPG to PDF but takes PNG images. If a batch mixes JPG and PNG, make one PDF with each tool and join them with the [merge PDF tool](/tools/merge-pdf).

### "I have a Word document and need a PDF"
$n$ in content) = 0 and position($o$
### "I have a Word document and need a PDF"
$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$
## If your file is too big
$o$, $n$
### "I need to add pages in the middle of a PDF"

Use the [insert PDF pages tool](/tools/insert-pdf-pages). Choose the page to insert after, then add pages from another PDF, JPG or PNG images, or blank pages. It handles one position per run, so repeat it for a second spot. The merge tool only joins whole files end to end.

## If your file is too big
$n$), updated_at = now()
  where slug = 'which-pdf-tool-do-i-need-cheat-sheet' and position($n$
### "I need to add pages in the middle of a PDF"

Use the [insert PDF pages tool](/tools/insert-pdf-pages). Choose the page to insert after, then add pages from another PDF, JPG or PNG images, or blank pages. It handles one position per run, so repeat it for a second spot. The merge tool only joins whole files end to end.

## If your file is too big
$n$ in content) = 0 and position($o$
## If your file is too big
$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$Use the [PDF to JPG tool](/tools/pdf-to-jpg). Choose the pages, pick JPG or PNG, and download.$o$, $n$Use the [PDF to JPG tool](/tools/pdf-to-jpg) for a JPG, or the [PDF to PNG tool](/tools/pdf-to-png) for a PNG with crisp text edges. Choose the pages and download.$n$), updated_at = now()
  where slug = 'which-pdf-tool-do-i-need-cheat-sheet' and position($n$Use the [PDF to JPG tool](/tools/pdf-to-jpg) for a JPG, or the [PDF to PNG tool](/tools/pdf-to-png) for a PNG with crisp text edges. Choose the pages and download.$n$ in content) = 0 and position($o$Use the [PDF to JPG tool](/tools/pdf-to-jpg). Choose the pages, pick JPG or PNG, and download.$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$| Photos to PDF | JPG to PDF |$o$, $n$| JPG photos to PDF | JPG to PDF |
| PNG images to PDF | PNG to PDF |$n$), updated_at = now()
  where slug = 'which-pdf-tool-do-i-need-cheat-sheet' and position($n$| JPG photos to PDF | JPG to PDF |
| PNG images to PDF | PNG to PDF |$n$ in content) = 0 and position($o$| Photos to PDF | JPG to PDF |$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$| Wrong page order | Rearrange PDF |$o$, $n$| Wrong page order | Rearrange PDF |
| Add pages inside a PDF | Insert PDF pages |$n$), updated_at = now()
  where slug = 'which-pdf-tool-do-i-need-cheat-sheet' and position($n$| Wrong page order | Rearrange PDF |
| Add pages inside a PDF | Insert PDF pages |$n$ in content) = 0 and position($o$| Wrong page order | Rearrange PDF |$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$| Page as picture | PDF to JPG |$o$, $n$| Page as JPG picture | PDF to JPG |
| Page as PNG picture | PDF to PNG |$n$), updated_at = now()
  where slug = 'which-pdf-tool-do-i-need-cheat-sheet' and position($n$| Page as JPG picture | PDF to JPG |
| Page as PNG picture | PDF to PNG |$n$ in content) = 0 and position($o$| Page as picture | PDF to JPG |$o$ in content) > 0;
-- how-to-merge-reorder-organize-pdf-files
update public.blog_posts set content = replace(content, $o$
## Reordering pages that already live inside one document

$o$, $n$
## Reordering pages that already live inside one document

:::highlight blue
Related guide: [How to rearrange PDF pages online](/blog/rearrange-pdf-pages-online) walks through reordering step by step, including how to check the final order.
:::

$n$), updated_at = now()
  where slug = 'how-to-merge-reorder-organize-pdf-files' and position($n$
## Reordering pages that already live inside one document

:::highlight blue
Related guide: [How to rearrange PDF pages online](/blog/rearrange-pdf-pages-online) walks through reordering step by step, including how to check the final order.
:::

$n$ in content) = 0 and position($o$
## Reordering pages that already live inside one document

$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$
## Combining multiple files into a single PDF

$o$, $n$
## Combining multiple files into a single PDF

:::highlight blue
Need to add pages in the middle of a PDF rather than at the end? The [Insert PDF Pages tool](/tools/insert-pdf-pages) places pages from another PDF, images, or blank pages after any page you choose.
:::

$n$), updated_at = now()
  where slug = 'how-to-merge-reorder-organize-pdf-files' and position($n$
## Combining multiple files into a single PDF

:::highlight blue
Need to add pages in the middle of a PDF rather than at the end? The [Insert PDF Pages tool](/tools/insert-pdf-pages) places pages from another PDF, images, or blank pages after any page you choose.
:::

$n$ in content) = 0 and position($o$
## Combining multiple files into a single PDF

$o$ in content) > 0;
-- fix-sideways-scanned-pdf
update public.blog_posts set content = replace(content, $o$
## Fixing rotation and order at the same time

$o$, $n$
## Fixing rotation and order at the same time

:::highlight blue
Related guide: [How to rearrange PDF pages online](/blog/rearrange-pdf-pages-online) explains the page-order half of this fix in more detail.
:::

$n$), updated_at = now()
  where slug = 'fix-sideways-scanned-pdf' and position($n$
## Fixing rotation and order at the same time

:::highlight blue
Related guide: [How to rearrange PDF pages online](/blog/rearrange-pdf-pages-online) explains the page-order half of this fix in more detail.
:::

$n$ in content) = 0 and position($o$
## Fixing rotation and order at the same time

$o$ in content) > 0;
-- delete-pages-from-pdf-free
update public.blog_posts set content = replace(content, $o$
## When to delete pages

$o$, $n$
## When to delete pages

:::highlight blue
Related guide: if you scanned a double-sided stack, [how to remove blank pages from a scanned PDF](/blog/remove-blank-pages-from-scanned-pdf) shows how to find and delete the empty ones.
:::

$n$), updated_at = now()
  where slug = 'delete-pages-from-pdf-free' and position($n$
## When to delete pages

:::highlight blue
Related guide: if you scanned a double-sided stack, [how to remove blank pages from a scanned PDF](/blog/remove-blank-pages-from-scanned-pdf) shows how to find and delete the empty ones.
:::

$n$ in content) = 0 and position($o$
## When to delete pages

$o$ in content) > 0;
-- phone-scan-to-pdf-workflow
update public.blog_posts set content = replace(content, $o$
## Special cases

$o$, $n$
## Special cases

:::highlight blue
Related guides: [how to remove blank pages from a scanned PDF](/blog/remove-blank-pages-from-scanned-pdf) and [how to use PDF tools on your phone](/blog/use-pdf-tools-on-phone-complete-guide).
:::

$n$), updated_at = now()
  where slug = 'phone-scan-to-pdf-workflow' and position($n$
## Special cases

:::highlight blue
Related guides: [how to remove blank pages from a scanned PDF](/blog/remove-blank-pages-from-scanned-pdf) and [how to use PDF tools on your phone](/blog/use-pdf-tools-on-phone-complete-guide).
:::

$n$ in content) = 0 and position($o$
## Special cases

$o$ in content) > 0;
-- extract-one-page-from-pdf
update public.blog_posts set content = replace(content, $o$
## What if the page needs to go straight into a new document?

$o$, $n$
## What if the page needs to go straight into a new document?

:::highlight blue
Related guide: [How to extract pages from a PDF: the complete guide](/blog/extract-pages-from-pdf-complete-guide) covers keeping several pages, page ranges, and non-consecutive pages.
:::

$n$), updated_at = now()
  where slug = 'extract-one-page-from-pdf' and position($n$
## What if the page needs to go straight into a new document?

:::highlight blue
Related guide: [How to extract pages from a PDF: the complete guide](/blog/extract-pages-from-pdf-complete-guide) covers keeping several pages, page ranges, and non-consecutive pages.
:::

$n$ in content) = 0 and position($o$
## What if the page needs to go straight into a new document?

$o$ in content) > 0;
-- split-pdf-into-individual-pages
update public.blog_posts set content = replace(content, $o$
## A practical example: signature pages

$o$, $n$
## A practical example: signature pages

:::highlight blue
Related guide: if you only need some of the pages instead of all of them, read [how to extract pages from a PDF](/blog/extract-pages-from-pdf-complete-guide).
:::

$n$), updated_at = now()
  where slug = 'split-pdf-into-individual-pages' and position($n$
## A practical example: signature pages

:::highlight blue
Related guide: if you only need some of the pages instead of all of them, read [how to extract pages from a PDF](/blog/extract-pages-from-pdf-complete-guide).
:::

$n$ in content) = 0 and position($o$
## A practical example: signature pages

$o$ in content) > 0;
-- how-to-split-a-pdf-into-separate-files
update public.blog_posts set content = replace(content, $o$
## Splitting versus extracting: two related but different jobs

$o$, $n$
## Splitting versus extracting: two related but different jobs

:::highlight blue
Related guide: [How to extract pages from a PDF: the complete guide](/blog/extract-pages-from-pdf-complete-guide) goes deeper on choosing between extract, delete, and split.
:::

$n$), updated_at = now()
  where slug = 'how-to-split-a-pdf-into-separate-files' and position($n$
## Splitting versus extracting: two related but different jobs

:::highlight blue
Related guide: [How to extract pages from a PDF: the complete guide](/blog/extract-pages-from-pdf-complete-guide) goes deeper on choosing between extract, delete, and split.
:::

$n$ in content) = 0 and position($o$
## Splitting versus extracting: two related but different jobs

$o$ in content) > 0;
-- why-pdf-to-word-loses-formatting
update public.blog_posts set content = replace(content, $o$
## A note on expectations with scanned files

$o$, $n$
## A note on expectations with scanned files

:::highlight blue
Related guide: [Scanned PDF vs digital PDF](/blog/scanned-pdf-vs-digital-pdf-how-to-tell) shows a ten-second test for telling which kind of file you have.
:::

$n$), updated_at = now()
  where slug = 'why-pdf-to-word-loses-formatting' and position($n$
## A note on expectations with scanned files

:::highlight blue
Related guide: [Scanned PDF vs digital PDF](/blog/scanned-pdf-vs-digital-pdf-how-to-tell) shows a ten-second test for telling which kind of file you have.
:::

$n$ in content) = 0 and position($o$
## A note on expectations with scanned files

$o$ in content) > 0;
-- convert-pdf-to-editable-word-document
update public.blog_posts set content = replace(content, $o$
## First, check that your PDF has real text

$o$, $n$
## First, check that your PDF has real text

:::highlight blue
Related guide: [Scanned PDF vs digital PDF](/blog/scanned-pdf-vs-digital-pdf-how-to-tell) explains the ten-second test and what to do with each kind of file.
:::

$n$), updated_at = now()
  where slug = 'convert-pdf-to-editable-word-document' and position($n$
## First, check that your PDF has real text

:::highlight blue
Related guide: [Scanned PDF vs digital PDF](/blog/scanned-pdf-vs-digital-pdf-how-to-tell) explains the ten-second test and what to do with each kind of file.
:::

$n$ in content) = 0 and position($o$
## First, check that your PDF has real text

$o$ in content) > 0;
-- prepare-documents-for-online-application-checklist
update public.blog_posts set content = replace(content, $o$
## Step 2: Gather the right documents

$o$, $n$
## Step 2: Gather the right documents

:::highlight blue
Related guide: applying as a student? [A PDF workflow for students](/blog/pdf-workflow-for-students-assignments-and-thesis) covers assignments, thesis chapters, and submissions.
:::

$n$), updated_at = now()
  where slug = 'prepare-documents-for-online-application-checklist' and position($n$
## Step 2: Gather the right documents

:::highlight blue
Related guide: applying as a student? [A PDF workflow for students](/blog/pdf-workflow-for-students-assignments-and-thesis) covers assignments, thesis chapters, and submissions.
:::

$n$ in content) = 0 and position($o$
## Step 2: Gather the right documents

$o$ in content) > 0;
-- digital-paperwork-organization-system
update public.blog_posts set content = replace(content, $o$
## A ten-minute starter plan

$o$, $n$
## A ten-minute starter plan

:::highlight blue
Related guides: [a PDF workflow for students](/blog/pdf-workflow-for-students-assignments-and-thesis) and [a PDF workflow for freelancers](/blog/pdf-workflow-for-freelancers-invoices-and-contracts) apply this system to two common situations.
:::

$n$), updated_at = now()
  where slug = 'digital-paperwork-organization-system' and position($n$
## A ten-minute starter plan

:::highlight blue
Related guides: [a PDF workflow for students](/blog/pdf-workflow-for-students-assignments-and-thesis) and [a PDF workflow for freelancers](/blog/pdf-workflow-for-freelancers-invoices-and-contracts) apply this system to two common situations.
:::

$n$ in content) = 0 and position($o$
## A ten-minute starter plan

$o$ in content) > 0;
-- check-pdf-before-sending-final-checklist
update public.blog_posts set content = replace(content, $o$
## Situations that deserve extra care

$o$, $n$
## Situations that deserve extra care

:::highlight blue
Related guide: [A PDF workflow for freelancers](/blog/pdf-workflow-for-freelancers-invoices-and-contracts) covers invoices, contracts, and client packets in detail.
:::

$n$), updated_at = now()
  where slug = 'check-pdf-before-sending-final-checklist' and position($n$
## Situations that deserve extra care

:::highlight blue
Related guide: [A PDF workflow for freelancers](/blog/pdf-workflow-for-freelancers-invoices-and-contracts) covers invoices, contracts, and client packets in detail.
:::

$n$ in content) = 0 and position($o$
## Situations that deserve extra care

$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$
## Make it a habit

$o$, $n$
## Make it a habit

:::highlight blue
Related guide: [A simple system for organizing digital paperwork](/blog/digital-paperwork-organization-system) helps the checklist stick.
:::

$n$), updated_at = now()
  where slug = 'check-pdf-before-sending-final-checklist' and position($n$
## Make it a habit

:::highlight blue
Related guide: [A simple system for organizing digital paperwork](/blog/digital-paperwork-organization-system) helps the checklist stick.
:::

$n$ in content) = 0 and position($o$
## Make it a habit

$o$ in content) > 0;
-- merge-pdf-files-in-order-on-phone
update public.blog_posts set content = replace(content, $o$
## Where phone-based merging comes up most

$o$, $n$
## Where phone-based merging comes up most

:::highlight blue
Related guide: [How to use PDF tools on your phone](/blog/use-pdf-tools-on-phone-complete-guide) covers picking files, ordering with touch, and finding your downloads.
:::

$n$), updated_at = now()
  where slug = 'merge-pdf-files-in-order-on-phone' and position($n$
## Where phone-based merging comes up most

:::highlight blue
Related guide: [How to use PDF tools on your phone](/blog/use-pdf-tools-on-phone-complete-guide) covers picking files, ordering with touch, and finding your downloads.
:::

$n$ in content) = 0 and position($o$
## Where phone-based merging comes up most

$o$ in content) > 0;
-- reduce-pdf-size-for-email
update public.blog_posts set content = replace(content, $o$
## When splitting works better than compressing

$o$, $n$
## When splitting works better than compressing

:::highlight blue
Related guide: [How to split a large PDF into smaller files under 5MB](/blog/split-large-pdf-under-5mb) walks through splitting for a size limit.
:::

$n$), updated_at = now()
  where slug = 'reduce-pdf-size-for-email' and position($n$
## When splitting works better than compressing

:::highlight blue
Related guide: [How to split a large PDF into smaller files under 5MB](/blog/split-large-pdf-under-5mb) walks through splitting for a size limit.
:::

$n$ in content) = 0 and position($o$
## When splitting works better than compressing

$o$ in content) > 0;
-- how-to-remove-watermark-from-pdf
update public.blog_posts set content = replace(content, $o$
## Manual mode: cover any area

$o$, $n$
## Manual mode: cover any area

:::highlight blue
Related guide: [How to remove a watermark from a PDF by selecting the area](/blog/remove-watermark-from-pdf-selected-area) covers Manual mode in detail.
:::

$n$), updated_at = now()
  where slug = 'how-to-remove-watermark-from-pdf' and position($n$
## Manual mode: cover any area

:::highlight blue
Related guide: [How to remove a watermark from a PDF by selecting the area](/blog/remove-watermark-from-pdf-selected-area) covers Manual mode in detail.
:::

$n$ in content) = 0 and position($o$
## Manual mode: cover any area

$o$ in content) > 0;
-- pdf-vs-word-vs-jpg-choosing-the-right-file-format
update public.blog_posts set content = replace(content, $o$
## Moving between formats

$o$, $n$
## Moving between formats

:::highlight blue
Related guide: [Which PDF tool do I need?](/blog/which-pdf-tool-do-i-need-cheat-sheet) matches common problems to the right tool.
:::

$n$), updated_at = now()
  where slug = 'pdf-vs-word-vs-jpg-choosing-the-right-file-format' and position($n$
## Moving between formats

:::highlight blue
Related guide: [Which PDF tool do I need?](/blog/which-pdf-tool-do-i-need-cheat-sheet) matches common problems to the right tool.
:::

$n$ in content) = 0 and position($o$
## Moving between formats

$o$ in content) > 0;
-- which-pdf-tool-do-i-need-cheat-sheet
update public.blog_posts set content = replace(content, $o$
## If your pages are in the wrong shape

$o$, $n$
## If your pages are in the wrong shape

:::highlight blue
Related guides: [how to rearrange PDF pages online](/blog/rearrange-pdf-pages-online) and [how to fix a sideways scanned PDF](/blog/fix-sideways-scanned-pdf).
:::

$n$), updated_at = now()
  where slug = 'which-pdf-tool-do-i-need-cheat-sheet' and position($n$
## If your pages are in the wrong shape

:::highlight blue
Related guides: [how to rearrange PDF pages online](/blog/rearrange-pdf-pages-online) and [how to fix a sideways scanned PDF](/blog/fix-sideways-scanned-pdf).
:::

$n$ in content) = 0 and position($o$
## If your pages are in the wrong shape

$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$
## If you have too many pages

$o$, $n$
## If you have too many pages

:::highlight blue
Related guides: [how to extract pages from a PDF](/blog/extract-pages-from-pdf-complete-guide) and [how to remove blank pages from a scanned PDF](/blog/remove-blank-pages-from-scanned-pdf).
:::

$n$), updated_at = now()
  where slug = 'which-pdf-tool-do-i-need-cheat-sheet' and position($n$
## If you have too many pages

:::highlight blue
Related guides: [how to extract pages from a PDF](/blog/extract-pages-from-pdf-complete-guide) and [how to remove blank pages from a scanned PDF](/blog/remove-blank-pages-from-scanned-pdf).
:::

$n$ in content) = 0 and position($o$
## If you have too many pages

$o$ in content) > 0;
update public.blog_posts set content = replace(content, $o$
## Common combinations

$o$, $n$
## Common combinations

:::highlight blue
Working mostly from a phone? Read [how to use PDF tools on your phone](/blog/use-pdf-tools-on-phone-complete-guide).
:::

$n$), updated_at = now()
  where slug = 'which-pdf-tool-do-i-need-cheat-sheet' and position($n$
## Common combinations

:::highlight blue
Working mostly from a phone? Read [how to use PDF tools on your phone](/blog/use-pdf-tools-on-phone-complete-guide).
:::

$n$ in content) = 0 and position($o$
## Common combinations

$o$ in content) > 0;
-- how-to-split-a-pdf-into-separate-files
update public.blog_posts set content = replace(content, $o$
## Handling large files by splitting them down

$o$, $n$
## Handling large files by splitting them down

:::highlight blue
Related guide: [How to split a large PDF into smaller files under 5MB](/blog/split-large-pdf-under-5mb) gives the full steps for meeting an upload limit.
:::

$n$), updated_at = now()
  where slug = 'how-to-split-a-pdf-into-separate-files' and position($n$
## Handling large files by splitting them down

:::highlight blue
Related guide: [How to split a large PDF into smaller files under 5MB](/blog/split-large-pdf-under-5mb) gives the full steps for meeting an upload limit.
:::

$n$ in content) = 0 and position($o$
## Handling large files by splitting them down

$o$ in content) > 0;

commit;

-- Check: every row should show applied = true. (A slug that is missing or unpublished in your DB just won't appear.)
select v.slug, position(v.snippet in coalesce(p.content,'')) > 0 as applied
from (values
  ('how-to-convert-word-jpg-images-to-pdf', $s$- Add every JPG or JPEG image that should be included. PNG images, such as screenshots, use the [PNG to PDF tool](/tools/png-to-pdf) instead.$s$),
  ('how-to-convert-word-jpg-images-to-pdf', $s$If one batch mixes JPG and PNG files, make one PDF from each format and join them with the [merge PDF tool](/tools/merge-pdf).

An important detail worth knowin$s$),
  ('how-to-convert-pdf-to-word-or-images', $s$The [PDF to JPG tool](/tools/pdf-to-jpg) and the [PDF to PNG tool](/tools/pdf-to-png) handle this directly, one image format per tool. For a full walkthrough of$s$),
  ('how-to-convert-pdf-to-word-or-images', $s$- Use PDF to JPG for a smaller file that works well for most ordinary documents, or PDF to PNG when a page contains fine text, line art, or sharp edges that ben$s$),
  ('how-to-convert-pdf-to-word-or-images', $s$situations where JPG's compression approach can introduce visible artifacts around sharp boundaries. Because each format has its own tool, choose [PDF to JPG](/$s$),
  ('how-to-convert-pdf-to-word-or-images', $s$PNG when a page has fine text, line drawings, or transparency that needs to stay exact. The two formats have separate tools, [PDF to JPG](/tools/pdf-to-jpg) and$s$),
  ('how-to-convert-pdf-to-word-or-images', $s$would be needed to extract usable text. Our guide to [telling a scanned PDF from a digital one](/blog/scanned-pdf-vs-digital-pdf-how-to-tell) shows how to check$s$),
  ('convert-pdf-to-jpg-pages', $s$- Select Convert to JPG and download the result. Need PNG instead? Use the [PDF to PNG tool](/tools/pdf-to-png).$s$),
  ('convert-pdf-to-jpg-pages', $s$- Use the [PDF to PNG tool](/tools/pdf-to-png) for pages with fine text or line art, since PNG keeps edges clean.$s$),
  ('pdf-to-png-or-jpg-which-format', $s$If you are unsure, convert one page both ways and compare. Each format has its own tool: [PDF to JPG](/tools/pdf-to-jpg) and [PDF to PNG](/tools/pdf-to-png).$s$),
  ('pdf-to-png-or-jpg-which-format', $s$Pages you plan to overlay on other graphics. PNG, if the page has transparency you want to preserve. PDF to PNG leaves any area the page does not paint transpar$s$),
  ('pdf-to-png-or-jpg-which-format', $s$Use the [JPG to PDF tool](/tools/jpg-to-pdf) for JPG and JPEG images, or the [PNG to PDF tool](/tools/png-to-pdf) for PNG images. Each puts your images into a s$s$),
  ('jpg-to-pdf-complete-guide', $s$The tool takes JPG and JPEG images. PNG images, which is what most screenshots are, have their own [PNG to PDF tool](/tools/png-to-pdf) that works the same way.$s$),
  ('jpg-to-pdf-complete-guide', $s$converts pages back into JPG images, and the [PDF to PNG tool](/tools/pdf-to-png) does the same for PNG images, so$s$),
  ('jpg-to-pdf-complete-guide', $s$Our guide to [merging PDFs on a phone](/blog/merge-pdf-files-in-order-on-phone) covers the mobile workflow. To place images at an exact spot inside a longer PDF$s$),
  ('pdf-vs-word-vs-jpg-choosing-the-right-file-format', $s$puts JPG or JPEG images into a single PDF, with page sizes of fit to image, A4, or US Letter. PNG images, such as screenshots, use the [PNG to PDF tool](/tools/$s$),
  ('pdf-vs-word-vs-jpg-choosing-the-right-file-format', $s$turns chosen pages into JPG images, bundled in a ZIP if there are several, and the [PDF to PNG tool](/tools/pdf-to-png) does the same for PNG.$s$),
  ('pdf-vs-word-vs-jpg-choosing-the-right-file-format', $s$Convert it from the PDF with the [PDF to JPG](/tools/pdf-to-jpg) or [PDF to PNG](/tools/pdf-to-png) tool, and keep the original PDF in case you need the text la$s$),
  ('combine-word-images-and-pdfs-into-one-document-package', $s$It accepts JPG and JPEG images, and each image becomes one page. For PNG images, use the [PNG to PDF tool](/tools/png-to-pdf).$s$),
  ('use-pdf-tools-on-phone-complete-guide', $s$Use the [PDF to JPG tool](/tools/pdf-to-jpg), or the [PDF to PNG tool](/tools/pdf-to-png) if you need PNG, choose your pages, and download.$s$),
  ('which-pdf-tool-do-i-need-cheat-sheet', $s$All fifteen tools on this site run in your browser$s$),
  ('which-pdf-tool-do-i-need-cheat-sheet', $s$All fifteen tools process files in your browser$s$),
  ('which-pdf-tool-do-i-need-cheat-sheet', $s$It accepts JPG and JPEG images, turns each into a page,$s$),
  ('which-pdf-tool-do-i-need-cheat-sheet', $s$### "My images are PNG files or screenshots"

Use the [PNG to PDF tool](/tools/png-to-pdf). It works like JPG to PDF but takes PNG images. If a batch mixes JPG$s$),
  ('which-pdf-tool-do-i-need-cheat-sheet', $s$### "I need to add pages in the middle of a PDF"

Use the [insert PDF pages tool](/tools/insert-pdf-pages). Choose the page to insert after, then add pages fro$s$),
  ('which-pdf-tool-do-i-need-cheat-sheet', $s$Use the [PDF to JPG tool](/tools/pdf-to-jpg) for a JPG, or the [PDF to PNG tool](/tools/pdf-to-png) for a PNG with crisp text edges. Choose the pages and downlo$s$),
  ('which-pdf-tool-do-i-need-cheat-sheet', $s$| JPG photos to PDF | JPG to PDF |
| PNG images to PDF | PNG to PDF |$s$),
  ('which-pdf-tool-do-i-need-cheat-sheet', $s$| Wrong page order | Rearrange PDF |
| Add pages inside a PDF | Insert PDF pages |$s$),
  ('which-pdf-tool-do-i-need-cheat-sheet', $s$| Page as JPG picture | PDF to JPG |
| Page as PNG picture | PDF to PNG |$s$),
  ('how-to-merge-reorder-organize-pdf-files', $s$## Reordering pages that already live inside one document

:::highlight blue
Related guide: [How to rearrange PDF pages online](/blog/rearrange-pdf-pages-onlin$s$),
  ('how-to-merge-reorder-organize-pdf-files', $s$## Combining multiple files into a single PDF

:::highlight blue
Need to add pages in the middle of a PDF rather than at the end? The [Insert PDF Pages tool](/$s$),
  ('fix-sideways-scanned-pdf', $s$## Fixing rotation and order at the same time

:::highlight blue
Related guide: [How to rearrange PDF pages online](/blog/rearrange-pdf-pages-online) explains$s$),
  ('delete-pages-from-pdf-free', $s$## When to delete pages

:::highlight blue
Related guide: if you scanned a double-sided stack, [how to remove blank pages from a scanned PDF](/blog/remove-blan$s$),
  ('phone-scan-to-pdf-workflow', $s$## Special cases

:::highlight blue
Related guides: [how to remove blank pages from a scanned PDF](/blog/remove-blank-pages-from-scanned-pdf) and [how to use P$s$),
  ('extract-one-page-from-pdf', $s$## What if the page needs to go straight into a new document?

:::highlight blue
Related guide: [How to extract pages from a PDF: the complete guide](/blog/ext$s$),
  ('split-pdf-into-individual-pages', $s$## A practical example: signature pages

:::highlight blue
Related guide: if you only need some of the pages instead of all of them, read [how to extract pages$s$),
  ('how-to-split-a-pdf-into-separate-files', $s$## Splitting versus extracting: two related but different jobs

:::highlight blue
Related guide: [How to extract pages from a PDF: the complete guide](/blog/ex$s$),
  ('why-pdf-to-word-loses-formatting', $s$## A note on expectations with scanned files

:::highlight blue
Related guide: [Scanned PDF vs digital PDF](/blog/scanned-pdf-vs-digital-pdf-how-to-tell) shows$s$),
  ('convert-pdf-to-editable-word-document', $s$## First, check that your PDF has real text

:::highlight blue
Related guide: [Scanned PDF vs digital PDF](/blog/scanned-pdf-vs-digital-pdf-how-to-tell) explai$s$),
  ('prepare-documents-for-online-application-checklist', $s$## Step 2: Gather the right documents

:::highlight blue
Related guide: applying as a student? [A PDF workflow for students](/blog/pdf-workflow-for-students-as$s$),
  ('digital-paperwork-organization-system', $s$## A ten-minute starter plan

:::highlight blue
Related guides: [a PDF workflow for students](/blog/pdf-workflow-for-students-assignments-and-thesis) and [a PD$s$),
  ('check-pdf-before-sending-final-checklist', $s$## Situations that deserve extra care

:::highlight blue
Related guide: [A PDF workflow for freelancers](/blog/pdf-workflow-for-freelancers-invoices-and-contra$s$),
  ('check-pdf-before-sending-final-checklist', $s$## Make it a habit

:::highlight blue
Related guide: [A simple system for organizing digital paperwork](/blog/digital-paperwork-organization-system) helps the$s$),
  ('merge-pdf-files-in-order-on-phone', $s$## Where phone-based merging comes up most

:::highlight blue
Related guide: [How to use PDF tools on your phone](/blog/use-pdf-tools-on-phone-complete-guide)$s$),
  ('reduce-pdf-size-for-email', $s$## When splitting works better than compressing

:::highlight blue
Related guide: [How to split a large PDF into smaller files under 5MB](/blog/split-large-pdf$s$),
  ('how-to-remove-watermark-from-pdf', $s$## Manual mode: cover any area

:::highlight blue
Related guide: [How to remove a watermark from a PDF by selecting the area](/blog/remove-watermark-from-pdf-s$s$),
  ('pdf-vs-word-vs-jpg-choosing-the-right-file-format', $s$## Moving between formats

:::highlight blue
Related guide: [Which PDF tool do I need?](/blog/which-pdf-tool-do-i-need-cheat-sheet) matches common problems to$s$),
  ('which-pdf-tool-do-i-need-cheat-sheet', $s$## If your pages are in the wrong shape

:::highlight blue
Related guides: [how to rearrange PDF pages online](/blog/rearrange-pdf-pages-online) and [how to fi$s$),
  ('which-pdf-tool-do-i-need-cheat-sheet', $s$## If you have too many pages

:::highlight blue
Related guides: [how to extract pages from a PDF](/blog/extract-pages-from-pdf-complete-guide) and [how to rem$s$),
  ('which-pdf-tool-do-i-need-cheat-sheet', $s$## Common combinations

:::highlight blue
Working mostly from a phone? Read [how to use PDF tools on your phone](/blog/use-pdf-tools-on-phone-complete-guide).$s$),
  ('how-to-split-a-pdf-into-separate-files', $s$## Handling large files by splitting them down

:::highlight blue
Related guide: [How to split a large PDF into smaller files under 5MB](/blog/split-large-pdf-$s$)
) as v(slug, snippet)
join public.blog_posts p on p.slug = v.slug
order by applied, v.slug;
