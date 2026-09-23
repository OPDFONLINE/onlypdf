import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using OnlyPDF's PDF tools and website.",
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
            OnlyPDF provides free PDF tools that run in your browser, plus a
            blog with PDF-related guides. You may use them for personal or
            business purposes, without creating an account. By using the
            site, you agree to these terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">Your responsibility</h2>
          <p className="mt-2">
            You&apos;re responsible for the files you process and for having
            the right to work with them. Don&apos;t use OnlyPDF to process,
            merge, or otherwise handle content you don&apos;t have permission
            to use, or that infringes someone else&apos;s copyright, contains
            malware, or is otherwise unlawful.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">Acceptable use</h2>
          <p className="mt-2">You agree not to:</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>
              Attempt to disrupt, overload, or gain unauthorized access to
              OnlyPDF&apos;s systems.
            </li>
            <li>
              Use automated tools to scrape, mass-download, or abuse the site
              in a way that degrades it for other users.
            </li>
            <li>
              Reverse engineer, copy, or resell the site&apos;s underlying
              code or design as your own product.
            </li>
            <li>
              Use the tools to process files containing malicious code
              intended to exploit vulnerabilities in browsers or PDF
              readers.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">
            Intellectual property
          </h2>
          <p className="mt-2">
            The OnlyPDF name, logo, site design, and original blog content
            belong to OnlyPDF. You retain all rights to the PDF files you
            process — we don&apos;t claim any ownership over your
            documents, and since they&apos;re processed locally in your
            browser, we typically never even see them.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">
            Tool accuracy and no warranty
          </h2>
          <p className="mt-2">
            OnlyPDF is provided as-is and as-available, without warranties of
            any kind, express or implied. We work hard to make sure each
            tool behaves correctly across common PDF files, but we can&apos;t
            guarantee a tool will work perfectly with every possible file,
            especially unusual, corrupted, or heavily secured PDFs. Always
            keep a backup of your original file before making changes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">
            Limitation of liability
          </h2>
          <p className="mt-2">
            To the fullest extent permitted by law, OnlyPDF and its operators
            won&apos;t be liable for any indirect, incidental, or
            consequential damages arising from your use of the site or
            tools, including lost data, lost profits, or lost time —
            whether or not we&apos;ve been advised of the possibility of such
            damages.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">
            Advertising and third-party links
          </h2>
          <p className="mt-2">
            OnlyPDF may show advertising from third-party networks in the
            future, and blog articles may link to other websites for
            reference. We don&apos;t control and aren&apos;t responsible for
            the content, accuracy, or practices of third-party sites you
            reach through a link or ad on OnlyPDF.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">
            Availability and changes to the service
          </h2>
          <p className="mt-2">
            We may add, change, or remove tools and features at any time. We
            aim for high uptime but don&apos;t guarantee the site will be
            available without interruption, and we&apos;re not liable for
            downtime or maintenance windows.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">Termination of access</h2>
          <p className="mt-2">
            Since there&apos;s no account system for the public tools, there&apos;s
            nothing to &quot;terminate&quot; on our end for most users. That said, we
            reserve the right to block access from a given IP address or
            network if we detect abuse, such as attempts to disrupt the
            service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">Governing law</h2>
          <p className="mt-2">
            These terms will be governed by applicable law in the
            jurisdiction where OnlyPDF operates, without regard to conflict
            of law principles. This section should be finalized with a legal
            professional before launch.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">Severability</h2>
          <p className="mt-2">
            If any part of these terms is found unenforceable, the rest of
            the terms remain in full effect.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">Changes</h2>
          <p className="mt-2">
            We may update these terms as OnlyPDF grows. Meaningful changes
            will be reflected on this page, along with an updated date.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-ink">Contact</h2>
          <p className="mt-2">
            Questions about these terms can be sent through the{" "}
            <Link href="/contact" className="text-accent underline underline-offset-2">
              contact page
            </Link>
            . See also our{" "}
            <Link href="/privacy" className="text-accent underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
