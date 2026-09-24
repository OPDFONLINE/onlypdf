import Link from "next/link";
import type { AnalyticsSummary } from "@/lib/supabase/analytics";

export function AnalyticsDashboard({ summary }: { summary: AnalyticsSummary | null }) {
  function percent(completes: number, starts: number): string {
    if (starts <= 0) return "—";
    return `${Math.round((completes / starts) * 100)}%`;
  }

  if (!summary) {
    return <div className="mt-8 rounded-card border-2 border-border bg-surface p-5 text-sm text-ink-muted">Analytics are not configured yet. Run the analytics migration and confirm the Supabase service-role key is available to the server.</div>;
  }

  return <>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <StatCard label="Page views" value={String(summary.last30.pageViews)} hint="Last 30 days" />
      <StatCard label="Tool starts" value={String(summary.last30.starts)} hint="Last 30 days" />
      <StatCard label="Completions" value={String(summary.last30.completes)} hint="Last 30 days" />
      <StatCard label="Completion rate" value={percent(summary.last30.completes, summary.last30.starts)} hint="Completions ÷ starts" />
      <StatCard label="Recorded events" value={String(summary.allTimeEvents)} hint="All time" />
    </div>
    <div className="mt-4 grid gap-4 sm:grid-cols-2"><StatCard label="7-day starts" value={String(summary.last7.starts)} hint="Recent tool usage" /><StatCard label="7-day completions" value={String(summary.last7.completes)} hint="Successful processing" /></div>
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <Section title="Top tools — last 30 days">{summary.topTools.length === 0 ? <Empty /> : <table className="w-full text-left text-sm"><thead><tr className="border-b border-border text-xs text-ink-soft"><th className="py-2">Tool</th><th className="py-2 text-right">Starts</th><th className="py-2 text-right">Completions</th></tr></thead><tbody>{summary.topTools.map((tool) => <tr key={tool.slug} className="border-b border-border last:border-0"><td className="py-2.5 font-medium text-ink">{tool.slug}</td><td className="py-2.5 text-right text-ink-muted">{tool.starts}</td><td className="py-2.5 text-right text-ink-muted">{tool.completes}</td></tr>)}</tbody></table>}</Section>
      <Section title="Traffic sources — last 30 days"><Breakdown items={summary.sources} /></Section>
      <Section title="Device breakdown — last 30 days"><Breakdown items={summary.devices} /></Section>
      <Section title="Countries — last 30 days"><Breakdown items={summary.countries} /></Section>
      <Section title="Search landing pages — last 30 days">{summary.searchLandingPages.length === 0 ? <Empty /> : <Breakdown items={summary.searchLandingPages.map((item) => ({ name: item.path, count: item.count }))} />}</Section>
      <Section title="Privacy"><p className="text-sm leading-6 text-ink-muted">Analytics records event type, page/tool path, coarse source/device/country information and a random session identifier. PDF contents, bytes, and filenames are not recorded.</p><Link href="/privacy" className="mt-3 inline-block text-sm font-semibold text-accent-dark underline">View privacy policy</Link></Section>
    </div>
  </>;
}
function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) { return <div className="rounded-card border-2 border-border bg-surface p-5"><p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{label}</p><p className="mt-2 text-3xl font-bold text-ink">{value}</p><p className="mt-1 text-xs text-ink-soft">{hint}</p></div>; }
function Section({ title, children }: { title: string; children: React.ReactNode }) { return <section className="rounded-card border-2 border-border bg-surface p-5"><h2 className="text-sm font-bold text-ink">{title}</h2><div className="mt-4 overflow-x-auto">{children}</div></section>; }
function Breakdown({ items }: { items: { name: string; count: number }[] }) { if (!items.length) return <Empty />; const max = Math.max(...items.map((i) => i.count), 1); return <div className="space-y-3">{items.map((item) => <div key={item.name}><div className="flex justify-between gap-4 text-xs"><span className="truncate text-ink-muted">{item.name}</span><span className="font-semibold text-ink">{item.count}</span></div><div className="mt-1 h-2 overflow-hidden rounded-full bg-paper"><div className="h-full rounded-full bg-accent" style={{ width: `${Math.max(4, item.count / max * 100)}%` }} /></div></div>)}</div>; }
function Empty() { return <p className="text-sm text-ink-soft">No recorded data in this window yet.</p>; }
