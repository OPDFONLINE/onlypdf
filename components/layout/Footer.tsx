import Link from "next/link";
import { tools } from "@/lib/tools";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-ink">
            <span
              aria-hidden="true"
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-pink text-xs font-extrabold text-white"
            >
              P
            </span>
            OnlyPDF
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
            Fast, private PDF tools that work in your browser. No sign-up and no
            server upload for these tools.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-ink">PDF Tools</h2>
          <ul className="mt-4 space-y-3">
            {tools.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold text-ink">Company</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <Link href="/about" className="text-sm text-ink-muted transition-colors hover:text-ink">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-ink-muted transition-colors hover:text-ink">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold text-ink">Legal</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <Link href="/privacy" className="text-sm text-ink-muted transition-colors hover:text-ink">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-sm text-ink-muted transition-colors hover:text-ink">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-6">
        <div className="container-page flex flex-col items-center justify-between gap-3 text-xs text-ink-soft sm:flex-row">
          <p>&copy; {year} OnlyPDF. All rights reserved.</p>
          <p>Built to be fast, simple, and private.</p>
        </div>
      </div>
    </footer>
  );
}
