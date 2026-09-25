"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, LayoutDashboard, Loader2, Settings, Wrench, Megaphone } from "lucide-react";
import { useState } from "react";

const GROUPS = [
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
      { href: "/admin/blog", label: "Blog", icon: FileText },
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
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  aria-busy={pending || undefined}
                  onClick={() => setPendingHref(item.href)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                    active ? "bg-paper text-ink" : "text-ink-muted hover:bg-paper hover:text-ink"
                  }`}
                >
                  {pending ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <Icon size={16} aria-hidden="true" />}
                  {item.label}
                  {pending && <span className="sr-only">Loading</span>}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
