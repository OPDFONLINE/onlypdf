import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getAdminContext } from "@/lib/supabase/admin";
import { SignOutButton } from "@/components/admin/SignOutButton";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const context = await getAdminContext();
  if (!context) redirect("/admin/login");

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row">
      <aside className="w-full shrink-0 border-b border-border bg-surface p-5 md:w-64 md:border-b-0 md:border-r">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">OnlyPDF Admin</p>
        <AdminNav />
        <div className="mt-6 border-t border-border pt-4 md:mt-8">
          <p className="truncate text-xs text-ink-soft">{context.admin.email || context.user.email}</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-ink-soft">{context.admin.role}</p>
          <SignOutButton className="mt-2 text-sm font-medium text-coral" />
        </div>
      </aside>
      <main className="min-w-0 flex-1 p-6 md:p-8">{children}</main>
    </div>
  );
}
