import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Zap, Gift, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Why OnlyPDF exists and how it approaches PDF tools.",
};

const principles = [
  {
    icon: ShieldCheck,
    title: "Privacy by default",
    body: "If a tool can run entirely in your browser, it does. Your file isn't uploaded to a server just so we can process it.",
  },
  {
    icon: Zap,
    title: "Fast, on purpose",
    body: "No accounts, no queues, minimal JavaScript. A tool page should load quickly and do its one job without friction.",
  },
  {
    icon: Gift,
    title: "Free, with no catch",
    body: "The core tools are free, with no artificial limits designed to push you toward a paid plan you didn't ask for.",
  },
  {
    icon: Wrench,
    title: "Small and well-tested, not huge",
    body: "We'd rather ship a handful of tools that work reliably on real-world files than a long list of half-finished ones.",
  },
];

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
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-ink">What we care about</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {principles.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-card border-2 border-border bg-surface p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent-dark">
                <Icon size={18} aria-hidden="true" strokeWidth={2.25} />
              </span>
              <h3 className="mt-3 text-[15px] font-bold text-ink">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-5 text-[15px] leading-relaxed text-ink-muted">
        <h2 className="text-xl font-bold text-ink">
          Not every tool can be browser-only
        </h2>
        <p>
          We&apos;re upfront that browser-based processing isn&apos;t always
          possible. Some future tools — heavy compression, OCR, or certain
          file conversions, for example — may need server-side processing
          to work well. When that&apos;s the case, we&apos;ll say so clearly on
          that tool&apos;s page before you use it, rather than quietly
          uploading your file without telling you.
        </p>

        <h2 className="text-xl font-bold text-ink">Where OnlyPDF is headed</h2>
        <p>
          The tool library is intentionally small right now, and it&apos;s
          growing one tool at a time. Image-to-PDF and PDF-to-image
          conversions are next on the list, followed by more of the common
          PDF tasks people search for. Alongside the tools, we&apos;re
          building out a library of clear, practical PDF guides on the blog
          — the kind of step-by-step answers we wished existed the first
          time we needed them.
        </p>
        <p>
          Have a tool you wish existed, or found something that doesn&apos;t
          work quite right? The{" "}
          <Link href="/contact" className="text-accent underline underline-offset-2">
            contact page
          </Link>{" "}
          is the fastest way to reach us, and requests like that directly
          shape what gets built next.
        </p>
      </div>
    </div>
  );
}
