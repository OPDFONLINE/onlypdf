import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAnalyticsSummary } from "@/lib/supabase/analytics";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";

export const metadata: Metadata = { title: "Analytics" };

export default async function AdminAnalyticsPage() {
  const supabase = await createSupabaseServerClient();
  let summary = null;
  let errorMessage: string | null = null;

  if (!supabase) {
    errorMessage = "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.";
  } else {
    try {
      summary = await getAnalyticsSummary(supabase);
    } catch (error) {
      console.error("Admin analytics load failed", error);
      errorMessage = error instanceof Error ? error.message : "Analytics could not be loaded.";
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Analytics</h1>
      <p className="mt-1 text-sm text-ink-muted">Real recorded site events, using a rolling 30-day reporting window.</p>
      {errorMessage ? (
        <div className="mt-6 rounded-card border-2 border-coral/30 bg-surface p-5 text-sm text-ink">
          <p className="font-semibold">Analytics database is not ready.</p>
          <p className="mt-2 text-ink-muted">{errorMessage}</p>
          <p className="mt-3 text-ink-muted">
            Apply the latest Supabase migrations, including <code>0007_analytics_repair.sql</code>, and confirm the server has <code>SUPABASE_SERVICE_ROLE_KEY</code>.
          </p>
        </div>
      ) : (
        <AnalyticsDashboard summary={summary} />
      )}
    </div>
  );
}
