"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { tools } from "@/lib/tools";

const convertTools = [
  { href: "/tools/jpg-to-pdf", label: "JPG to PDF" },
  { href: "/tools/pdf-to-jpg", label: "PDF to JPG" },
];

const primaryTools = [
  { href: "/tools/merge-pdf", label: "Merge PDF" },
  { href: "/tools/split-pdf", label: "Split PDF" },
  { href: "/tools/compress-pdf", label: "Compress PDF" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobileConvertOpen, setMobileConvertOpen] = useState(false);
  const [mobileAllOpen, setMobileAllOpen] = useState(false);

  const closeMobile = () => {
    setOpen(false);
    setMobileConvertOpen(false);
    setMobileAllOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-ink"
          onClick={closeMobile}
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-pink text-sm font-extrabold text-white shadow-lift"
          >
            P
          </span>
          OnlyPDF
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {primaryTools.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}

          {/* Desktop dropdowns use hover/focus. The whole group contains the
              trigger and menu, so moving the pointer into the menu keeps it open. */}
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 py-5 text-[15px] font-medium text-ink-muted transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-haspopup="true"
            >
              Convert Tools
              <ChevronDown
                size={15}
                className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
              />
            </button>
            <div
              className="invisible absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
              role="menu"
            >
              <div className="mt-2 rounded-2xl border border-border bg-paper p-2 shadow-lift">
                {convertTools.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    role="menuitem"
                    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-surface hover:text-ink"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="group relative">
            <Link
              href="/tools"
              className="flex items-center gap-1 py-5 text-[15px] font-medium text-ink-muted transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              All Tools
              <ChevronDown
                size={15}
                className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
              />
            </Link>
            <div
              className="invisible absolute right-0 top-full z-50 w-64 translate-y-1 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
              role="menu"
            >
              <div className="mt-2 max-h-[70vh] overflow-y-auto rounded-2xl border border-border bg-paper p-2 shadow-lift">
                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    role="menuitem"
                    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-surface hover:text-ink"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <span className="text-xs font-medium text-ink-soft">No sign-up required</span>
          <Link
            href="/tools"
            className="rounded-pill bg-accent px-4 py-2 text-sm font-semibold text-white shadow-lift transition-colors hover:bg-accent-dark"
          >
            Open a tool
          </Link>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-border bg-paper px-5 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {primaryTools.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-xl px-2 py-3 text-[15px] font-medium text-ink hover:bg-surface"
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <li>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl px-2 py-3 text-left text-[15px] font-medium text-ink hover:bg-surface"
                aria-expanded={mobileConvertOpen}
                onClick={() => setMobileConvertOpen((v) => !v)}
              >
                Convert Tools
                <ChevronDown
                  size={17}
                  className={mobileConvertOpen ? "rotate-180 transition-transform" : "transition-transform"}
                />
              </button>
              {mobileConvertOpen && (
                <div className="ml-3 border-l border-border pl-3">
                  {convertTools.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block rounded-xl px-2 py-2.5 text-sm text-ink-muted hover:bg-surface hover:text-ink"
                      onClick={closeMobile}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl px-2 py-3 text-left text-[15px] font-medium text-ink hover:bg-surface"
                aria-expanded={mobileAllOpen}
                onClick={() => setMobileAllOpen((v) => !v)}
              >
                All Tools
                <ChevronDown
                  size={17}
                  className={mobileAllOpen ? "rotate-180 transition-transform" : "transition-transform"}
                />
              </button>
              {mobileAllOpen && (
                <div className="ml-3 max-h-72 overflow-y-auto border-l border-border pl-3">
                  {tools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="block rounded-xl px-2 py-2.5 text-sm text-ink-muted hover:bg-surface hover:text-ink"
                      onClick={closeMobile}
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
