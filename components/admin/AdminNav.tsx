"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { BarChart3, CalendarClock, CheckCircle2, FilePen, FilePlus2, FileText, LayoutDashboard, Library, Loader2, Settings, Wrench, Megaphone } from "lucide-react";
import { useState } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: typeof FileText;
  /** Sub-menu shown only while the parent section is open. */
  children?: { href: string; label: string; icon: typeof FileText; match: (params: URLSearchParams) => boolean }[];
};

const BLOG_CHILDREN: NonNullable<NavItem["children"]> = [
  { href: "/admin/blog", label: "All posts", icon: Library, match: (p) => !p.get("status") && !p.get("new") },
  { href: "/admin/blog?status=published", label: "Published", icon: CheckCircle2, match: (p) => p.get("status") === "published" },
  { href: "/admin/blog?status=draft", label: "Drafts", icon: FilePen, match: (p) => p.get("status") === "draft" },
  { href: "/admin/blog?status=scheduled", label: "Scheduled", icon: CalendarClock, match: (p) => p.get("status") === "scheduled" },
  { href: "/admin/blog?new=1", label: "New article", icon: FilePlus2, match: (p) => p.get("new") === "1" },
];

const GROUPS: { label: string; items: NavItem[] }[] = [
  {
    label: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Insights",
    items: [{ href: "/admin/analytics", label: "Analytics", icon: BarChart3 }],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/tools", label: "Tools", icon: Wrench },
      { href: "/admin/blog", label: "Blog", icon: FileText, children: BLOG_CHILDREN },
    ],
  },
  {
    label: "Growth",
    items: [
      { href: "/admin/monetization", label: "Monetization", icon: Megaphone },
      { href: "/admin/settings", label: "Site settings", icon: Settings },
    ],
  },
];

export function AdminNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  return (
    <nav className="mt-5 space-y-5" aria-label="Admin navigation">
      {GROUPS.map((group) => (
        <div key={group.label}>
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-soft">{group.label}</p>
          <div className="mt-1 flex gap-1 overflow-x-auto md:flex-col md:overflow-visible">
            {group.items.map((item) => {
              const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
              const pending = pendingHref === item.href && !active;
              const Icon = item.icon;
              const open = Boolean(item.children) && active;
              return (
                <div key={item.href} className="shrink-0 md:shrink">
                  <Link
                    href={item.href}
                    aria-current={active && !open ? "page" : undefined}
                    aria-busy={pending || undefined}
                    onClick={() => setPendingHref(item.href)}
                    className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                      active ? "bg-paper text-ink" : "text-ink-muted hover:bg-paper hover:text-ink"
                    }`}
                  >
                    {pending ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <Icon size={16} aria-hidden="true" />}
                    {item.label}
                    {pending && <span className="sr-only">Loading</span>}
                  </Link>
                  {open && item.children && (
                    <div className="mt-1 hidden space-y-0.5 border-l-2 border-border pl-2 md:ml-5 md:block">
                      {item.children.map((child) => {
                        const childActive = child.match(searchParams);
                        const ChildIcon = child.icon;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            aria-current={childActive ? "page" : undefined}
                            className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13px] transition-colors ${
                              childActive ? "bg-accent-soft font-semibold text-accent-dark" : "text-ink-muted hover:bg-paper hover:text-ink"
                            }`}
                          >
                            <ChildIcon size={14} aria-hidden="true" />
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
