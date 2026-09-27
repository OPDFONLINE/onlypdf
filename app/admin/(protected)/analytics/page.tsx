import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAnalyticsSummary } from "@/lib/supabase/analytics";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import { isSupabaseServiceConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = { title: "Analytics" };

// Without this, Next.js's fetch Data Cache can cache the Supabase client's
// internal fetch() calls indefinitely, even though this page reads
// cookies(). Calling cookies() only opts the page OUT OF STATIC GENERATION;
// it does not, by itself, disable per-fetch caching. force-dynamic makes
// every fetch on this page use cache: "no-store", so it always reflects the
// current row counts instead of freezing on whatever it first saw.
export const dynamic = "force-dynamic";
export const revalidate = 0;

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

  // The dashboard above only proves the READ path works (anon key + RLS).
  // New events are written by /api/analytics using the service-role key,
  // and that route intentionally no-ops (204, no error) whenever the
  // service-role key is missing, so PDF processing never breaks because of
  // analytics. That silent no-op is exactly what makes a misconfigured
  // deployment look like "everything is 0, no error" here. Surface it
  // explicitly instead of leaving the admin to guess.
  const writePathMissing = !errorMessage && !isSupabaseServiceConfigured;

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
        <>
          {writePathMissing && (
            <div className="mt-6 rounded-card border-2 border-amber-400/40 bg-surface p-5 text-sm text-ink">
              <p className="font-semibold">No new events can be recorded right now.</p>
              <p className="mt-2 text-ink-muted">
                Reading analytics works (this page loaded), but <code>SUPABASE_SERVICE_ROLE_KEY</code> is missing on the
                server, so <code>/api/analytics</code> silently discards every page-view / tool-start / tool-complete
                event instead of writing it &mdash; by design, so a broken analytics config can never break PDF
                processing. This is almost always why every number below reads 0 with no visible error.
              </p>
              <p className="mt-3 text-ink-muted">
                Fix: in Vercel &rarr; Project Settings &rarr; Environment Variables, add <code>SUPABASE_SERVICE_ROLE_KEY</code>
                (from Supabase &rarr; Project Settings &rarr; API &rarr; <code>service_role</code> secret) to the{" "}
                <strong>Production</strong> environment, then redeploy &mdash; adding an env var alone does not update a
                running deployment.
              </p>
            </div>
          )}
          <AnalyticsDashboard summary={summary} />
        </>
      )}
    </div>
  );
}
