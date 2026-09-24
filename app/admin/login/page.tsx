import type { Metadata } from "next";
import { Suspense } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  if (!isSupabaseConfigured) {
    return (
      <div className="container-page max-w-lg py-20">
        <h1 className="text-2xl font-bold text-ink">Admin isn&apos;t set up yet</h1>
        <p className="mt-3 text-sm text-ink-muted">
          Connect a Supabase project before signing in:
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-ink-muted">
          <li>
            Set <code className="rounded bg-paper px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
            <code className="rounded bg-paper px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, and{" "}
            <code className="rounded bg-paper px-1.5 py-0.5">SUPABASE_SERVICE_ROLE_KEY</code> in your
            environment.
          </li>
          <li>
            Run <code className="rounded bg-paper px-1.5 py-0.5">supabase/migrations/0001_admin_foundation.sql</code>{" "}
            against that project.
          </li>
          <li>Create your account in the Supabase dashboard under Authentication → Users.</li>
          <li>
            Insert a matching row into <code className="rounded bg-paper px-1.5 py-0.5">admin_users</code> with
            that user&apos;s id.
          </li>
        </ol>
      </div>
    );
  }

  return (
    <div className="container-page flex min-h-[70vh] max-w-sm flex-col justify-center py-20">
      <h1 className="text-2xl font-bold text-ink">Admin sign in</h1>
      <p className="mt-1 text-sm text-ink-muted">Sign in with your OnlyPDF admin account.</p>
      <Suspense fallback={null}>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
