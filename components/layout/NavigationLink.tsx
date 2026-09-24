"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

type Props = LinkProps & { children: ReactNode; className?: string; activeClassName?: string; showSpinner?: boolean; onClick?: () => void };

export function NavigationLink({ children, className = "", activeClassName = "", showSpinner = true, onClick, href, ...props }: Props) {
  const pathname = usePathname();
  const [pending, setPending] = useState(false);
  const active = typeof href === "string" && (href === "/" ? pathname === "/" : pathname.startsWith(href));
  return <Link href={href} {...props} aria-current={active ? "page" : undefined} aria-busy={pending || undefined} onClick={() => { setPending(true); onClick?.(); }} className={`${className} ${active ? activeClassName : ""} ${pending ? "opacity-70" : ""}`}>
    {pending && showSpinner ? <Loader2 size={14} className="mr-1.5 inline-block animate-spin align-[-2px]" aria-hidden="true" /> : null}{children}
  </Link>;
}
