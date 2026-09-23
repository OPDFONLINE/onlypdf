import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Bug, Lightbulb, Building2, ShieldQuestion } from "lucide-react";
import { Faq } from "@/components/ui/Faq";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the OnlyPDF team about a bug, a tool request, or anything else.",
};

const reasons = [
  {
    icon: Bug,
    title: "Report a bug",
    body: "A tool didn't work the way it should, or a page didn't load. Let us know which tool, and what file or browser you were using if you can.",
  },
  {
    icon: Lightbulb,
    title: "Request a tool",
    body: "A PDF task you wish OnlyPDF covered. Tool requests directly shape what gets built next.",
  },
  {
    icon: ShieldQuestion,
    title: "Privacy or terms question",
    body: "Anything about how OnlyPDF handles files or data. See the Privacy Policy and Terms of Service first \u2014 your answer might already be there.",
  },
  {
    icon: Building2,
    title: "Business or partnership inquiry",
    body: "Advertising, integrations, or anything else on the business side.",
  },
];

const contactFaq = [
  {
    question: "How quickly will I get a response?",
    answer:
      "We read every message, though response times can vary since this is a small operation. Bug reports and time-sensitive issues get priority.",
  },
  {
    question: "Do you offer live chat or phone support?",
    answer:
      "Not at this time. Email is currently the only way to reach us.",
  },
  {
    question: "I found a security issue. How should I report it?",
    answer:
      "Please email us with as much detail as you can \u2014 steps to reproduce, affected tool or page, and potential impact \u2014 so we can look into it quickly.",
  },
];

export default function ContactPage() {
  return (
    <div className="container-page max-w-prose py-16 md:py-20">
      <h1 className="text-3xl sm:text-4xl">Contact</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
        Found a bug, have a tool request, or just want to say hello? Send us
        an email and we&apos;ll get back to you.
      </p>

      <a
        href="mailto:hello@onlypdf.online"
        className="mt-8 inline-flex items-center gap-2 rounded-card bg-ink px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
      >
        <Mail size={16} aria-hidden="true" />
        hello@onlypdf.online
      </a>

      <p className="mt-6 text-xs text-ink-soft">
        An in-page contact form will replace this once email delivery is
        connected.
      </p>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-ink">What to include</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          A quick note on what kind of message you&apos;re sending helps us
          route it faster:
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {reasons.map(({ icon: Icon, title, body }) => (
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

      <div className="mt-14 border-t border-border pt-12">
        <Faq items={contactFaq} title="Before you email us" />
      </div>

      <p className="mt-10 text-sm leading-relaxed text-ink-muted">
        Looking for something else? Check{" "}
        <Link href="/about" className="text-accent underline underline-offset-2">
          About OnlyPDF
        </Link>
        ,{" "}
        <Link href="/privacy" className="text-accent underline underline-offset-2">
          Privacy Policy
        </Link>
        , or{" "}
        <Link href="/terms" className="text-accent underline underline-offset-2">
          Terms of Service
        </Link>
        .
      </p>
    </div>
  );
}
