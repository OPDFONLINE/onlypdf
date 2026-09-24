import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/admin/SignOutButton";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin/login");
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: adminRow } = await supabase.from("admin_users").select("email, role").eq("id", user.id).maybeSingle();
  if (!adminRow) return <div className="container-page max-w-lg py-20 text-center"><h1 className="text-2xl font-bold text-ink">Access denied</h1><p className="mt-3 text-ink-muted">{user.email} is signed in but isn&apos;t listed as an OnlyPDF admin.</p><SignOutButton className="mt-6 inline-block text-sm font-semibold text-accent-dark underline" /></div>;
  return <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row"><aside className="w-full shrink-0 border-b border-border bg-surface p-5 md:w-60 md:border-b-0 md:border-r"><p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">OnlyPDF Admin</p><AdminNav /><div className="mt-6 border-t border-border pt-4 md:mt-8"><p className="truncate text-xs text-ink-soft">{adminRow.email}</p><SignOutButton className="mt-2 text-sm font-medium text-coral" /></div></aside><main className="flex-1 p-6 md:p-8">{children}</main></div>;
}
