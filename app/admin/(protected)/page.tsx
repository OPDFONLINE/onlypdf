import type { Metadata } from "next";
import Link from "next/link";
import { tools as staticTools } from "@/lib/tools";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Dashboard" };

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();

  let disabledCount = 0;
  let eventCount: number | null = null;

  if (supabase) {
    const { data: toolRows } = await supabase.from("tools").select("enabled");
    disabledCount = toolRows?.filter((row) => row.enabled === false).length ?? 0;

    const { count } = await supabase
      .from("analytics_events")
      .select("id", { count: "exact", head: true });
    eventCount = count ?? 0;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-muted">
        A quick overview of the site. Traffic, tool-usage, and top-article charts arrive once the
        analytics pipeline is built (spec section 25).
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Tools defined" value={String(staticTools.length)} hint="In lib/tools.ts" />
        <StatCard label="Disabled tools" value={String(disabledCount)} hint="Hidden from the public site" />
        <StatCard
          label="Recorded events"
          value={eventCount === null ? "—" : String(eventCount)}
          hint="analytics_events rows (tracking not wired up yet)"
        />
      </div>

      <div className="mt-8 rounded-card border-2 border-border bg-surface p-5">
        <h2 className="text-sm font-bold text-ink">What&apos;s next</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-ink-muted">
          <li>Wire up analytics_events writes (page views, tool starts/completions) and build this dashboard out.</li>
          <li>Blog CMS: create, edit, publish, and schedule articles, with the Pexels/Pixabay image workflow.</li>
          <li>Admin-controlled ad placement configuration (site_settings table is already in place for this).</li>
          <li>
            Extend <Link href="/admin/tools" className="font-semibold text-accent-dark underline">Tool management</Link> to
            cover per-tool page body content and FAQ editing.
          </li>
        </ul>
      </div>
    </div>
  );
}

function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-card border-2 border-border bg-surface p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{label}</p>
      <p className="mt-2 text-3xl font-bold text-ink">{value}</p>
      <p className="mt-1 text-xs text-ink-soft">{hint}</p>
    </div>
  );
}
