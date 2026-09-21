import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Why OnlyPDF exists and how it approaches PDF tools.",
};

export default function AboutPage() {
  return (
    <div className="container-page max-w-prose py-16 md:py-20">
      <h1 className="text-3xl sm:text-4xl">About OnlyPDF</h1>
      <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink-muted">
        <p>
          OnlyPDF started from a simple frustration: most free PDF tools ask
          you to create an account, upload your file to a server, and wait,
          just to merge a couple of documents or rotate a page.
        </p>
        <p>
          We built OnlyPDF to be the opposite of that. Where it&apos;s
          technically practical, your PDF is processed directly in your
          browser, so there&apos;s nothing to upload and nothing to sign up
          for. You open a tool, do the task, and download your result.
        </p>
        <p>
          The tool library is intentionally small right now. We&apos;d rather
          ship a handful of tools that work well than a huge list of tools
          that don&apos;t. More tools are on the way, and each one will be
          held to the same standard: fast, simple, and privacy-friendly.
        </p>
      </div>
    </div>
  );
}
