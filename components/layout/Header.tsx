"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { tools } from "@/lib/tools";

const primaryLinks = [
  { href: "/tools/merge-pdf", label: "Merge PDF" },
  { href: "/tools/split-pdf", label: "Split PDF" },
  { href: "/tools/compress-pdf", label: "Compress PDF" },
];

const convertTools = tools.filter((tool) => ["jpg-to-pdf", "pdf-to-jpg"].includes(tool.slug));

function ToolDropdown({
  label,
  items,
  mobile = false,
  onNavigate,
}: {
  label: string;
  items: typeof tools;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <details className={mobile ? "group" : "group relative"}>
      <summary
        className={
          mobile
            ? "flex cursor-pointer list-none items-center justify-between rounded-xl px-2 py-3 text-[15px] font-medium text-ink hover:bg-surface [&::-webkit-details-marker]:hidden"
            : "flex cursor-pointer list-none items-center gap-1 text-[15px] font-medium text-ink-muted transition-colors hover:text-ink [&::-webkit-details-marker]:hidden"
        }
      >
        {label}
        <ChevronDown
          size={15}
          aria-hidden="true"
          className="transition-transform group-open:rotate-180"
        />
      </summary>

      <div
        className={
          mobile
            ? "mt-1 space-y-1 border-l-2 border-border pl-3"
            : "absolute right-0 top-full z-50 mt-3 w-60 rounded-2xl border-2 border-border bg-paper p-2 shadow-soft"
        }
      >
        {items.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            onClick={onNavigate}
            className={
              mobile
                ? "block rounded-xl px-3 py-2.5 text-sm font-medium text-ink-muted hover:bg-surface hover:text-ink"
                : "block rounded-xl px-3 py-2.5 text-sm font-medium text-ink-muted hover:bg-surface hover:text-ink"
            }
          >
            {tool.name}
          </Link>
        ))}
      </div>
    </details>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-pink text-sm font-extrabold text-white shadow-lift"
          >
            P
          </span>
          OnlyPDF
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <ToolDropdown label="Convert Tools" items={convertTools} />
          <ToolDropdown label="All Tools" items={tools} />
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <span className="hidden text-xs font-medium text-ink-soft lg:inline">
            No sign-up required
          </span>
          <Link
            href="/tools"
            className="rounded-pill bg-accent px-4 py-2 text-sm font-semibold text-white shadow-lift transition-colors hover:bg-accent-dark"
          >
            All Tools
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
            {primaryLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-xl px-2 py-3 text-[15px] font-medium text-ink hover:bg-surface"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <ToolDropdown
                label="Convert Tools"
                items={convertTools}
                mobile
                onNavigate={() => setOpen(false)}
              />
            </li>
            <li>
              <ToolDropdown
                label="All Tools"
                items={tools}
                mobile
                onNavigate={() => setOpen(false)}
              />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
