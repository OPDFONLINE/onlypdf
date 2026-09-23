import Link from "next/link";

export function SeoContent() {
  return (
    <section className="border-t border-border bg-paper py-16 md:py-24">
      <div className="container-page max-w-3xl">
        <h2 className="text-2xl sm:text-3xl">PDF tools, explained</h2>
        <p className="mt-3 text-ink-muted">
          A quick rundown of what each OnlyPDF tool does, when to use it, and
          why running it in your browser is worth caring about. These are
          the same everyday PDF tasks people usually search for step-by-step
          instructions on — combining files, splitting them apart, cleaning
          up pages, and fixing orientation — laid out here so you can jump
          straight to the right tool instead of digging through settings in
          a desktop PDF editor.
        </p>

        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-ink-muted">
          <div>
            <h3 className="text-lg font-bold text-ink">
              How to compress a PDF to a smaller file size
            </h3>
            <p className="mt-2">
              PDF compression is useful when a document is too large to email,
              upload, or store. The{" "}
              <Link href="/tools/compress-pdf" className="text-accent underline underline-offset-2">
                Compress PDF tool
              </Link>{" "}
              offers High, Medium, and Express automatic compression modes,
              plus a target-size option for cases where you need a PDF to fit
              within a particular limit such as 10 MB or 800 KB. Compression
              runs in your browser, so the source PDF stays on your device.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-ink">
              How to merge PDF files online for free
            </h3>
            <p className="mt-2">
              Merging PDFs means combining two or more PDF files into a
              single document, in a specific order. It&apos;s the tool people
              reach for when they need to send one file instead of five —
              combining scanned receipts into one expense report, stitching
              together chapters of a document, or putting a cover page in
              front of a contract. The{" "}
              <Link href="/tools/merge-pdf" className="text-accent underline underline-offset-2">
                Merge PDF tool
              </Link>{" "}
              lets you add as many files as you need, drag them into the
              order you want, and download one combined PDF. Because merging
              happens in your browser, there&apos;s no waiting for an upload
              and no need for Adobe Acrobat or any other desktop software.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-ink">
              How to split a PDF into individual pages
            </h3>
            <p className="mt-2">
              Splitting works the other direction: it takes one PDF and
              breaks it into a separate file per page. This is useful when a
              scanner saves a whole stack of documents as one PDF and you
              actually need each page on its own, or when you only want to
              share a portion of a longer file. The{" "}
              <Link href="/tools/split-pdf" className="text-accent underline underline-offset-2">
                Split PDF tool
              </Link>{" "}
              splits every page into its own PDF automatically and packages
              the results into a single ZIP file, so you get one download
              instead of dozens.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-ink">
              How to delete pages from a PDF
            </h3>
            <p className="mt-2">
              Sometimes a PDF is almost right, except for a blank scanned
              page, a duplicate, or a section you don&apos;t want to include.
              The{" "}
              <Link href="/tools/delete-pdf-pages" className="text-accent underline underline-offset-2">
                Delete PDF Pages tool
              </Link>{" "}
              shows every page in the document so you can tap the ones you
              want gone, then rebuilds the file with everything else left
              intact and in its original order.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-ink">
              How to extract specific pages from a PDF
            </h3>
            <p className="mt-2">
              Extracting is the mirror image of deleting: instead of removing
              a few pages, you pick the ones you want to keep and build a
              brand-new PDF out of just those. It&apos;s a common step when
              pulling a single form, exhibit, or chapter out of a much longer
              document. The{" "}
              <Link href="/tools/extract-pdf-pages" className="text-accent underline underline-offset-2">
                Extract PDF Pages tool
              </Link>{" "}
              keeps the pages you select in their original order, so the
              result reads exactly like it did in the source file.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-ink">
              How to reorder or rearrange PDF pages
            </h3>
            <p className="mt-2">
              Reordering a PDF means changing which page comes first, second,
              and so on, without deleting or adding anything. It&apos;s handy
              after merging several documents, or when pages were scanned out
              of sequence. The{" "}
              <Link href="/tools/rearrange-pdf" className="text-accent underline underline-offset-2">
                Rearrange PDF Pages tool
              </Link>{" "}
              shows a thumbnail of every page that you can drag into the
              order you want, with arrow buttons as a keyboard-friendly
              alternative to dragging. Since a page is sometimes also
              sideways, each thumbnail has its own rotate button, so fixing
              order and orientation can happen in the same pass.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-ink">
              How to rotate PDF pages
            </h3>
            <p className="mt-2">
              A page scanned in landscape when it should be portrait (or
              upside down entirely) is one of the most common PDF annoyances.
              The{" "}
              <Link href="/tools/rotate-pdf" className="text-accent underline underline-offset-2">
                Rotate PDF tool
              </Link>{" "}
              shows a thumbnail of every page so you can select one page, a
              handful of pages, or the whole document, then rotate the
              selection 90 degrees clockwise or counterclockwise as many
              times as needed before applying the change and downloading the
              corrected file.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-ink">
              How to convert JPG, JPEG, or PNG images to PDF
            </h3>
            <p className="mt-2">
              Turning a photo, scan, or screenshot into a PDF makes it easier
              to send, print, or archive alongside other documents. The{" "}
              <Link href="/tools/jpg-to-pdf" className="text-accent underline underline-offset-2">
                JPG to PDF tool
              </Link>{" "}
              accepts JPG, JPEG, and PNG images, lets you drag them into the
              order you want, and combines them into a single PDF — one
              image per page. You can choose a page size that fits each
              image exactly, or a standard A4 or US Letter size if the PDF
              needs to look like a regular document.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-ink">
              How to convert a PDF to JPG or PNG images
            </h3>
            <p className="mt-2">
              Sometimes you need a picture instead of a document — to drop
              a page into a slide, post it somewhere images are expected, or
              just view it without a PDF reader. The{" "}
              <Link href="/tools/pdf-to-jpg" className="text-accent underline underline-offset-2">
                PDF to JPG tool
              </Link>{" "}
              converts any page (or every page) of a PDF into a JPG or PNG
              image. Convert a single page and it downloads directly; convert
              several and they&apos;re bundled into one ZIP file.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-ink">
              Are online PDF tools safe if they run in the browser?
            </h3>
            <p className="mt-2">
              The tools above process your PDF using your browser&apos;s own
              JavaScript engine, not a remote server. In practice, that means
              the file you open never gets uploaded anywhere: it&apos;s read,
              changed, and turned into a new download all on your own
              device. That&apos;s a meaningful difference from PDF tools that
              require a file upload before they can do anything, since there&apos;s
              no copy of your document sitting on someone else&apos;s server,
              even temporarily. It also tends to be faster, since there&apos;s
              no upload or download queue to wait through, and it works the
              same way whether you&apos;re on a fast office connection or a
              spotty mobile signal, because the heavy lifting happens on your
              own device rather than in transit. None of this requires
              installing anything: current versions of Chrome, Firefox,
              Safari, and Edge all support it, on both desktop and mobile.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-ink">
              All nine PDF tools in one place
            </h3>
            <p className="mt-2">
              OnlyPDF now brings nine everyday PDF tools together: merge,
              split, compress, delete pages, extract pages, rearrange pages,
              rotate pages, JPG to PDF, and PDF to JPG. They are designed to
              cover common document tasks without requiring an account or a
              desktop PDF editor, while keeping processing in the browser
              wherever that&apos;s technically practical.
            </p>
          </div>
        </div>

        <p className="mt-10 text-xs text-ink-soft">
          Looking for a specific tool?{" "}
          <Link href="/tools" className="text-accent underline underline-offset-2">
            See the full list of PDF tools
          </Link>
          . Every tool page includes step-by-step instructions and answers to
          common questions.
        </p>
      </div>
    </section>
  );
}
