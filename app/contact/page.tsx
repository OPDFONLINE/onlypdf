import type { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the OnlyPDF team.",
};

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
    </div>
  );
}
