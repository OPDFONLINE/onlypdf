"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, LayoutDashboard, Loader2, Wrench } from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/tools", label: "Tools", icon: Wrench },
  { href: "/admin/blog", label: "Blog", icon: FileText },
];

export function AdminNav() {
  const pathname = usePathname();
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  return (
    <nav className="mt-5 flex gap-1 overflow-x-auto md:flex-col md:overflow-visible" aria-label="Admin navigation">
      {NAV_ITEMS.map((item) => {
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
    </nav>
  );
}
