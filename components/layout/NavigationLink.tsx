"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

type Props = LinkProps & { children: ReactNode; className?: string; activeClassName?: string; showSpinner?: boolean; onClick?: () => void };

export function NavigationLink({ children, className = "", activeClassName = "", showSpinner = true, onClick, href, ...props }: Props) {
  const pathname = usePathname();
  const [pending, setPending] = useState(false);
  const active = typeof href === "string" && (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Header/nav components stay mounted across client-side navigations, so
  // once "pending" is set true on click it never went back to false on its
  // own — the spinner just kept spinning forever after the new page loaded.
  // Reset it whenever the route actually finishes changing.
  useEffect(() => {
    setPending(false);
  }, [pathname]);
  return <Link href={href} {...props} aria-current={active ? "page" : undefined} aria-busy={pending || undefined} onClick={() => { setPending(true); onClick?.(); }} className={`relative ${className} ${active ? activeClassName : ""} ${pending ? "opacity-70" : ""}`}>
    {children}
    {showSpinner && pending ? (
      // Overlaid on the link instead of sitting inline, so it never adds width
      // (no wrapped menu items) and never shifts the surrounding text.
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <Loader2 size={14} className="animate-spin text-accent" />
      </span>
    ) : null}
  </Link>;
}
