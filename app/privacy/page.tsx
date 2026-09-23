import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How OnlyPDF handles your files, your data, and your privacy.",
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
          <h2 className="text-lg font-medium text-ink">The short version</h2>
          <p className="mt-2">
            OnlyPDF&apos;s PDF tools run in your browser. For those tools,
            your file is never uploaded to our servers, we don&apos;t require
            an account, and we don&apos;t sell personal data. The rest of
            this page explains that in more detail, plus what happens with
            things like the blog and the contact form.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">Your PDF files</h2>
          <p className="mt-2">
            {tools.map((t) => t.name).join(", ")} all run in your browser.
            The PDF file you work with is processed on your own device and is
            not uploaded to our servers or stored by us. If you close the
            tab, the file and any changes you made are gone — we never
            had a copy to begin with.
          </p>
          <p className="mt-2">
            The only network activity these tools cause is loading the
            tool&apos;s own code (and, for tools with page previews, a small
            open-source rendering library) — never your document&apos;s
            content.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">
            Tools we add in the future
          </h2>
          <p className="mt-2">
            Some future tools — for example, advanced compression, OCR, or
            certain file conversions — may require server-side processing
            to work at all. If that happens, we&apos;ll clearly say so on
            that tool&apos;s page before you use it, and this policy will be
            updated to describe exactly what&apos;s processed, how long it&apos;s
            kept (if at all), and when it&apos;s deleted.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">Accounts</h2>
          <p className="mt-2">
            OnlyPDF doesn&apos;t require an account to use the PDF tools, so
            we don&apos;t collect a name, email, or password for that
            purpose. There is no user dashboard and no stored history of
            files you&apos;ve processed.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">
            Analytics and cookies
          </h2>
          <p className="mt-2">
            We intend to use lightweight, privacy-conscious analytics to
            understand which tools and articles are useful, without invasive
            cross-site tracking. This kind of analytics typically records
            things like which pages were viewed, which tool was opened, and
            general device/browser information — not the contents of any
            file you process. If and when we add advertising, ad partners
            may set their own cookies subject to their own privacy policies;
            we&apos;ll disclose which providers are in use once that
            happens. This section will be updated with specifics as each of
            these is implemented.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">
            The contact form and emails
          </h2>
          <p className="mt-2">
            If you email us or use a contact form, we&apos;ll use the
            information you provide (such as your email address and
            message) only to respond to you and to keep a record of
            support requests. We won&apos;t add you to a marketing list
            without your separate consent.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">The blog</h2>
          <p className="mt-2">
            Blog pages may use images sourced from providers like Pexels and
            Pixabay, with attribution where required by their license terms.
            Reading the blog doesn&apos;t require an account, and we don&apos;t
            track individual readers across sessions beyond standard,
            aggregate analytics.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">
            Children&apos;s privacy
          </h2>
          <p className="mt-2">
            OnlyPDF is not directed at children under 13, and we don&apos;t
            knowingly collect personal information from them. If you believe
            a child has provided us with personal information, please
            contact us and we&apos;ll remove it.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">
            Your rights over your data
          </h2>
          <p className="mt-2">
            Because the PDF tools don&apos;t collect or store your files or
            require an account, there&apos;s generally nothing tied to you
            to access, export, or delete from that side of the site.
            Depending on where you live, you may still have rights (such as
            access, correction, or deletion) over any information you&apos;ve
            shared with us directly, like a contact form submission. You can
            exercise those rights by reaching out through the{" "}
            <Link href="/contact" className="text-accent underline underline-offset-2">
              contact page
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">International use</h2>
          <p className="mt-2">
            OnlyPDF is available to visitors worldwide. Because the core
            tools process files locally in your browser, no file data
            crosses borders as part of using them. Any information you
            submit directly to us (like a support email) may be handled by
            infrastructure located in different countries than your own.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">
            Changes to this policy
          </h2>
          <p className="mt-2">
            As OnlyPDF adds tools, analytics, or advertising, this policy
            will be updated to reflect what&apos;s actually happening. We&apos;ll
            update the date at the top of this page when that occurs.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">Contact</h2>
          <p className="mt-2">
            Questions about this policy, or a request related to your data,
            can be sent through the{" "}
            <Link href="/contact" className="text-accent underline underline-offset-2">
              contact page
            </Link>
            . See also our{" "}
            <Link href="/terms" className="text-accent underline underline-offset-2">
              Terms of Service
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
