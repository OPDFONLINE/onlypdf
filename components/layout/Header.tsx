"use client";

import { NavigationLink } from "@/components/layout/NavigationLink";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { tools } from "@/lib/tools";

const convertTools = ["jpg-to-pdf", "pdf-to-jpg", "pdf-to-word", "word-to-pdf"];
const topTools = ["merge-pdf", "split-pdf", "compress-pdf"];

function NavDropdown({ label, tools: items, panelClassName }: { label: string; tools: typeof tools; panelClassName: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);

  // Close on click outside the trigger + panel.
  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  // Close as soon as navigation to a submenu link completes, instead of
  // relying on :focus-within, which stayed true because the clicked link
  // kept DOM focus even after the route changed underneath it.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div ref={rootRef} className="relative h-16 py-0">
      <button
        type="button"
        className="flex h-16 items-center gap-1 text-[15px] font-medium text-ink-muted hover:text-ink"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {label} <ChevronDown size={15} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`absolute top-[58px] rounded-2xl border border-border bg-paper p-2 shadow-lift transition-all duration-150 ${panelClassName} ${
          open ? "visible translate-y-0 opacity-100 pointer-events-auto" : "invisible translate-y-1 opacity-0 pointer-events-none"
        }`}
      >
        {items.map((tool) => (
          <NavigationLink
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-muted hover:bg-surface hover:text-ink"
            activeClassName="bg-surface text-ink"
            onClick={() => setOpen(false)}
          >
            <tool.icon size={16} className="shrink-0 text-ink-soft" aria-hidden="true" />
            {tool.name}
          </NavigationLink>
        ))}
      </div>
    </div>
  );
}

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
          <NavDropdown label="Convert Tools" tools={convert} panelClassName="left-1/2 w-56 -translate-x-1/2" />
          <NavigationLink href="/blog" className="text-[15px] font-medium text-ink-muted hover:text-ink" activeClassName="text-ink">Blog</NavigationLink>
          <NavDropdown label="All Tools" tools={allTools} panelClassName="right-0 grid w-[430px] grid-cols-2 gap-1" />
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
