import type { Metadata } from "next";
import Link from "next/link";
import { tools as staticTools } from "@/lib/tools";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAnalyticsSummary } from "@/lib/supabase/analytics";

export const metadata: Metadata = { title: "Dashboard" };

function percent(completes: number, starts: number): string {
  if (starts <= 0) return "—";
  return `${Math.round((completes / starts) * 100)}%`;
}

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();

  let disabledCount = 0;
  const summary = supabase ? await getAnalyticsSummary(supabase) : null;

  if (supabase) {
    const { data: toolRows } = await supabase.from("tools").select("enabled");
    disabledCount = toolRows?.filter((row) => row.enabled === false).length ?? 0;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Real site analytics from recorded page views, tool starts, and successful tool completions. The reporting window is the last 30 days.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Tools defined" value={String(staticTools.length)} hint="In lib/tools.ts" />
        <StatCard label="Disabled tools" value={String(disabledCount)} hint="Hidden from the public site" />
        <StatCard label="Page views" value={summary ? String(summary.last30.pageViews) : "—"} hint="Last 30 days" />
        <StatCard label="Tool starts" value={summary ? String(summary.last30.starts) : "—"} hint="Last 30 days" />
        <StatCard label="Completion rate" value={summary ? percent(summary.last30.completes, summary.last30.starts) : "—"} hint="Completions ÷ starts" />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <StatCard label="7-day starts" value={summary ? String(summary.last7.starts) : "—"} hint="Recent tool usage" />
        <StatCard label="7-day completions" value={summary ? String(summary.last7.completes) : "—"} hint="Successful processing" />
        <StatCard label="Recorded events" value={summary ? String(summary.allTimeEvents) : "—"} hint="All analytics_events rows" />
      </div>

      {!summary ? (
        <div className="mt-8 rounded-card border-2 border-border bg-surface p-5 text-sm text-ink-muted">
          Analytics are not configured yet. Set the Supabase service-role key in Vercel and run the analytics migration before expecting event data.
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Section title="Top tools — last 30 days">
            {summary.topTools.length === 0 ? <Empty /> : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead><tr className="border-b border-border text-xs text-ink-soft"><th className="py-2">Tool</th><th className="py-2 text-right">Starts</th><th className="py-2 text-right">Completions</th></tr></thead>
                  <tbody>{summary.topTools.map((tool) => <tr key={tool.slug} className="border-b border-border last:border-0"><td className="py-2.5 font-medium text-ink">{tool.slug}</td><td className="py-2.5 text-right text-ink-muted">{tool.starts}</td><td className="py-2.5 text-right text-ink-muted">{tool.completes}</td></tr>)}</tbody>
                </table>
              </div>
            )}
          </Section>

          <Section title="Traffic sources — last 30 days">
            <Breakdown items={summary.sources} />
          </Section>

          <Section title="Device breakdown — last 30 days">
            <Breakdown items={summary.devices} />
          </Section>

          <Section title="Countries — last 30 days">
            <Breakdown items={summary.countries} />
          </Section>

          <Section title="Search landing pages — last 30 days">
            {summary.searchLandingPages.length === 0 ? <Empty /> : <Breakdown items={summary.searchLandingPages.map((item) => ({ name: item.path, count: item.count }))} />}
          </Section>

          <Section title="Next steps">
            <ul className="list-disc space-y-2 pl-5 text-sm text-ink-muted">
              <li>Use these real events as the baseline before adding richer reporting.</li>
              <li>Blog analytics can be added when the Blog CMS exists.</li>
              <li>Keep analytics independent from PDF file contents; no uploaded file data is recorded.</li>
              <li><Link href="/admin/tools" className="font-semibold text-accent-dark underline">Manage tool content and FAQs</Link>.</li>
            </ul>
          </Section>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return <div className="rounded-card border-2 border-border bg-surface p-5"><p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{label}</p><p className="mt-2 text-3xl font-bold text-ink">{value}</p><p className="mt-1 text-xs text-ink-soft">{hint}</p></div>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="rounded-card border-2 border-border bg-surface p-5"><h2 className="text-sm font-bold text-ink">{title}</h2><div className="mt-4">{children}</div></section>;
}

function Breakdown({ items }: { items: { name: string; count: number }[] }) {
  if (items.length === 0) return <Empty />;
  const max = Math.max(...items.map((item) => item.count), 1);
  return <div className="space-y-3">{items.map((item) => <div key={item.name}><div className="flex items-center justify-between gap-4 text-xs"><span className="truncate text-ink-muted">{item.name}</span><span className="font-semibold text-ink">{item.count}</span></div><div className="mt-1 h-2 overflow-hidden rounded-full bg-paper"><div className="h-full rounded-full bg-accent" style={{ width: `${Math.max(4, (item.count / max) * 100)}%` }} /></div></div>)}</div>;
}

function Empty() {
  return <p className="text-sm text-ink-soft">No recorded data in this window yet.</p>;
}
