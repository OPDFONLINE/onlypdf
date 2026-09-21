import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How OnlyPDF handles your files and data.",
};

export default function PrivacyPage() {
  return (
    <div className="container-page max-w-prose py-16 md:py-20">
      <h1 className="text-3xl sm:text-4xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-ink-soft">
        Last updated: this page is a working draft and should be reviewed by
        a legal professional before launch.
      </p>

      <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-ink-muted">
        <section>
          <h2 className="text-lg font-medium text-ink">Your PDF files</h2>
          <p className="mt-2">
            Merge PDF, Split PDF, Delete PDF Pages, Extract PDF Pages,
            Rearrange PDF Pages, and Rotate PDF all run in your browser. The
            PDF file you work with is not uploaded to our servers and is not
            stored by us. If you close the tab, the file and any changes you
            made are gone.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">
            Tools we add in the future
          </h2>
          <p className="mt-2">
            Some future tools may require server-side processing to work at
            all. If that happens, we&apos;ll clearly say so on that tool&apos;s
            page before you use it, and this policy will be updated to
            describe exactly what is processed and for how long.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">Accounts</h2>
          <p className="mt-2">
            OnlyPDF doesn&apos;t require an account to use the PDF tools, so
            we don&apos;t collect a name, email, or password for that
            purpose.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">
            Analytics and cookies
          </h2>
          <p className="mt-2">
            We intend to use lightweight, privacy-conscious analytics to
            understand which tools and articles are useful, without invasive
            tracking. Details will be added here once analytics are
            implemented.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">Contact</h2>
          <p className="mt-2">
            Questions about this policy can be sent through the{" "}
            <a href="/contact" className="text-accent underline underline-offset-2">
              contact page
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
