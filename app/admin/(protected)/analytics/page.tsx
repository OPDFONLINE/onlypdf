import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAnalyticsSummary } from "@/lib/supabase/analytics";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";

export const metadata: Metadata = { title: "Analytics" };

export default async function AdminAnalyticsPage() {
  const supabase = await createSupabaseServerClient();
  const summary = supabase ? await getAnalyticsSummary(supabase) : null;
  return <div><h1 className="text-2xl font-bold text-ink">Analytics</h1><p className="mt-1 text-sm text-ink-muted">Real recorded site events, using a rolling 30-day reporting window.</p><AnalyticsDashboard summary={summary} /></div>;
}
