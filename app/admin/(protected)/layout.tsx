import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, Wrench } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/admin/SignOutButton";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/tools", label: "Tools", icon: Wrench },
];

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  // middleware.ts already redirects signed-out visitors away from every
  // /admin route except /admin/login (which lives outside this route
  // group), and it also shows its own message when Supabase isn't
  // configured. If we get this far without a client, something changed
  // env vars between requests — safest is to send them back to sign in.
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin/login");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("email, role")
    .eq("id", user.id)
    .maybeSingle();

  if (!adminRow) {
    return (
      <div className="container-page max-w-lg py-20 text-center">
        <h1 className="text-2xl font-bold text-ink">Access denied</h1>
        <p className="mt-3 text-ink-muted">
          {user.email} is signed in but isn&apos;t listed as an OnlyPDF admin. Add this account to
          the <code className="rounded bg-paper px-1.5 py-0.5">admin_users</code> table to grant
          access.
        </p>
        <SignOutButton className="mt-6 inline-block text-sm font-semibold text-accent-dark underline" />
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row">
      <aside className="w-full shrink-0 border-b border-border bg-surface p-5 md:w-60 md:border-b-0 md:border-r">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">OnlyPDF Admin</p>
        <nav className="mt-5 flex gap-1 overflow-x-auto md:flex-col md:overflow-visible">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-ink-muted hover:bg-paper hover:text-ink"
            >
              <item.icon size={16} aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-6 border-t border-border pt-4 md:mt-8">
          <p className="truncate text-xs text-ink-soft">{adminRow.email}</p>
          <SignOutButton className="mt-2 text-sm font-medium text-coral" />
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-8">{children}</main>
    </div>
  );
}
