import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using OnlyPDF.",
};

export default function TermsPage() {
  return (
    <div className="container-page max-w-prose py-16 md:py-20">
      <h1 className="text-3xl sm:text-4xl">Terms of Service</h1>
      <p className="mt-3 text-sm text-ink-soft">
        Last updated: this page is a working draft and should be reviewed by
        a legal professional before launch.
      </p>

      <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-ink-muted">
        <section>
          <h2 className="text-lg font-medium text-ink">Using OnlyPDF</h2>
          <p className="mt-2">
            OnlyPDF provides free PDF tools that run in your browser. You may
            use them for personal or business purposes, without creating an
            account.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">Your responsibility</h2>
          <p className="mt-2">
            You&apos;re responsible for the files you process and for having
            the right to work with them. Don&apos;t use OnlyPDF to process
            content you don&apos;t have permission to use.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">No warranty</h2>
          <p className="mt-2">
            OnlyPDF is provided as-is. We work hard to make sure each tool
            behaves correctly, but we can&apos;t guarantee it will be free of
            errors for every possible PDF file.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">Changes</h2>
          <p className="mt-2">
            We may update these terms as OnlyPDF grows. Meaningful changes
            will be reflected on this page.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">Contact</h2>
          <p className="mt-2">
            Questions about these terms can be sent through the{" "}
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
