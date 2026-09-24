"use client";

import { NavigationLink } from "@/components/layout/NavigationLink";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { tools } from "@/lib/tools";

const convertTools = ["jpg-to-pdf", "pdf-to-jpg", "pdf-to-word", "word-to-pdf"];
const topTools = ["merge-pdf", "split-pdf", "compress-pdf"];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const convert = tools.filter((tool) => convertTools.includes(tool.slug));
  const allTools = tools;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
      <div className="container-page flex h-16 items-center justify-between">
        <NavigationLink href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-ink" onClick={() => setMobileOpen(false)} showSpinner={false}>
          <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-pink text-sm font-extrabold text-white shadow-lift">P</span>
          OnlyPDF
        </NavigationLink>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {topTools.map((slug) => {
            const tool = tools.find((item) => item.slug === slug)!;
            return <NavigationLink key={slug} href={`/tools/${slug}`} className="text-[15px] font-medium text-ink-muted hover:text-ink" activeClassName="text-ink">{tool.name}</NavigationLink>;
          })}
          <div className="group relative h-16 py-0">
            <button type="button" className="flex h-16 items-center gap-1 text-[15px] font-medium text-ink-muted hover:text-ink" aria-haspopup="true">
              Convert Tools <ChevronDown size={15} />
            </button>
            <div className="invisible absolute left-1/2 top-[58px] w-56 -translate-x-1/2 translate-y-1 opacity-0 pointer-events-none rounded-2xl border border-border bg-paper p-2 shadow-lift transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-focus-within:pointer-events-auto">
              {convert.map((tool) => <NavigationLink key={tool.slug} href={`/tools/${tool.slug}`} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink-muted hover:bg-surface hover:text-ink" activeClassName="bg-surface text-ink">{tool.name}</NavigationLink>)}
            </div>
          </div>
          <NavigationLink href="/blog" className="text-[15px] font-medium text-ink-muted hover:text-ink" activeClassName="text-ink">Blog</NavigationLink>
          <div className="group relative h-16 py-0">
            <button type="button" className="flex h-16 items-center gap-1 text-[15px] font-medium text-ink-muted hover:text-ink" aria-haspopup="true">
              All Tools <ChevronDown size={15} />
            </button>
            <div className="invisible absolute right-0 top-[58px] grid w-[430px] grid-cols-2 translate-y-1 gap-1 rounded-2xl border border-border bg-paper p-2 opacity-0 pointer-events-none shadow-lift transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-focus-within:pointer-events-auto">
              {allTools.map((tool) => <NavigationLink key={tool.slug} href={`/tools/${tool.slug}`} className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink-muted hover:bg-surface hover:text-ink" activeClassName="bg-surface text-ink">{tool.name}</NavigationLink>)}
            </div>
          </div>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <span className="text-xs font-medium text-ink-soft">No sign-up required</span>
          <NavigationLink href="/tools" className="rounded-pill bg-accent px-4 py-2 text-sm font-semibold text-white shadow-lift hover:bg-accent-dark" activeClassName="bg-accent-dark">All Tools</NavigationLink>
        </div>

        <button type="button" className="flex h-9 w-9 items-center justify-center rounded-xl text-ink md:hidden" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((v) => !v)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border bg-paper px-5 py-4 md:hidden" aria-label="Mobile">
          <div className="grid grid-cols-2 gap-1">
            {allTools.map((tool) => <NavigationLink key={tool.slug} href={`/tools/${tool.slug}`} className="rounded-xl px-2 py-3 text-sm font-medium text-ink hover:bg-surface" activeClassName="bg-surface" onClick={() => setMobileOpen(false)}>{tool.name}</NavigationLink>)}
          </div>
          <div className="mt-3 border-t border-border pt-3">
            <NavigationLink href="/blog" className="block rounded-xl px-2 py-3 text-sm font-medium text-ink-muted" activeClassName="bg-surface text-ink" onClick={() => setMobileOpen(false)}>Blog</NavigationLink>
            <NavigationLink href="/about" className="block rounded-xl px-2 py-3 text-sm font-medium text-ink-muted" activeClassName="bg-surface text-ink" onClick={() => setMobileOpen(false)}>About</NavigationLink>
            <NavigationLink href="/contact" className="block rounded-xl px-2 py-3 text-sm font-medium text-ink-muted" activeClassName="bg-surface text-ink" onClick={() => setMobileOpen(false)}>Contact</NavigationLink>
          </div>
        </nav>
      )}
    </header>
  );
}
