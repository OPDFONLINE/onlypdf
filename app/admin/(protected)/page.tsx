import type { Metadata } from "next";
import Link from "next/link";
import { getEffectiveTools } from "@/lib/supabase/tools";
import { getAdminContext } from "@/lib/supabase/admin";
import { getAnalyticsSummary } from "@/lib/supabase/analytics";

export const metadata: Metadata = { title: "Dashboard" };

function percent(completes: number, starts: number): string {
  if (starts <= 0) return "—";
  return `${Math.round((completes / starts) * 100)}%`;
}

export default async function AdminDashboardPage() {
  const context = await getAdminContext();
  const tools = await getEffectiveTools();
  const summary = context ? await getAnalyticsSummary(context.supabase) : null;
  const [blogResult, adsResult, settingsResult] = context
    ? await Promise.all([
        context.supabase.from("blog_posts").select("id, status", { count: "exact", head: true }),
        context.supabase.from("ad_placements").select("id, enabled", { count: "exact", head: true }),
        context.supabase.from("site_settings").select("key", { count: "exact", head: true }),
      ])
    : [null, null, null];

  const disabledTools = tools.filter((tool) => !tool.enabled).length;
  const configuredAds = adsResult?.count ?? 0;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-dark">Control center</p>
          <h1 className="mt-1 text-2xl font-bold text-ink">Dashboard</h1>
          <p className="mt-1 max-w-2xl text-sm text-ink-muted">A single operational view of tools, content, analytics, and growth configuration.</p>
        </div>
        <Link href="/" target="_blank" rel="noreferrer" className="text-sm font-semibold text-accent-dark underline">Open live site</Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Live tools" value={String(tools.filter((tool) => tool.enabled).length)} hint={`${disabledTools} disabled`} href="/admin/tools" />
        <StatCard label="Blog posts" value={String(blogResult?.count ?? 0)} hint="All editorial records" href="/admin/blog" />
        <StatCard label="Page views" value={summary ? String(summary.last30.pageViews) : "—"} hint="Last 30 days" href="/admin/analytics" />
        <StatCard label="Completion rate" value={summary ? percent(summary.last30.completes, summary.last30.starts) : "—"} hint="Last 30 days" href="/admin/analytics" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Section title="Tool usage — last 30 days" href="/admin/analytics">
          {summary?.topTools.length ? (
            <div className="space-y-3">{summary.topTools.slice(0, 6).map((tool) => <div key={tool.slug} className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"><span className="truncate text-sm font-medium text-ink">{tool.slug}</span><span className="text-xs text-ink-muted">{tool.starts} starts · {tool.completes} complete</span></div>)}</div>
          ) : <Empty text="No tool events recorded in this window yet." />}
        </Section>

        <Section title="Admin modules" >
          <div className="grid gap-3 sm:grid-cols-2">
            <QuickLink href="/admin/tools" title="Tools" text="Names, SEO, FAQ, ordering and homepage visibility." />
            <QuickLink href="/admin/blog" title="Blog" text="Draft, publish, schedule, preview and SEO metadata." />
            <QuickLink href="/admin/analytics" title="Analytics" text="Traffic, tool events, sources, devices and countries." />
            <QuickLink href="/admin/monetization" title="Monetization" text="Provider and placement configuration." />
            <QuickLink href="/admin/settings" title="Site settings" text="Routine site identity and editorial defaults." />
          </div>
        </Section>

        <Section title="Configuration status">
          <div className="space-y-3 text-sm">
            <StatusRow label="Supabase" ok={Boolean(context)} text={context ? "Connected" : "Not configured"} />
            <StatusRow label="Site settings" ok={(settingsResult?.count ?? 0) > 0} text={`${settingsResult?.count ?? 0} saved keys`} />
            <StatusRow label="Ad placements" ok={(adsResult?.count ?? 0) > 0} text={`${configuredAds} configured placements`} />
            <StatusRow label="Analytics" ok={Boolean(summary)} text={summary ? "Recording/reporting" : "Not available"} />
          </div>
        </Section>

        <Section title="Operating rules">
          <ul className="list-disc space-y-2 pl-5 text-sm text-ink-muted">
            <li>Keep PDF processing browser-first and avoid storing user files.</li>
            <li>Keep ad placements away from upload, processing, and download controls.</li>
            <li>Do not index drafts or schedule unpublished articles.</li>
            <li>Use real analytics events only; never invent traffic or usage data.</li>
          </ul>
        </Section>
      </div>
    </div>
  );
}

function StatCard({ label, value, hint, href }: { label: string; value: string; hint: string; href: string }) {
  return <Link href={href} className="rounded-card border-2 border-border bg-surface p-5 transition hover:border-accent"><p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{label}</p><p className="mt-2 text-3xl font-bold text-ink">{value}</p><p className="mt-1 text-xs text-ink-soft">{hint}</p></Link>;
}
function Section({ title, href, children }: { title: string; href?: string; children: React.ReactNode }) {
  return <section className="rounded-card border-2 border-border bg-surface p-5"><div className="flex items-center justify-between gap-3"><h2 className="text-sm font-bold text-ink">{title}</h2>{href && <Link href={href} className="text-xs font-semibold text-accent-dark underline">View all</Link>}</div><div className="mt-4">{children}</div></section>;
}
function QuickLink({ href, title, text }: { href: string; title: string; text: string }) { return <Link href={href} className="rounded-xl border border-border p-3 hover:border-accent"><p className="text-sm font-bold text-ink">{title}</p><p className="mt-1 text-xs leading-5 text-ink-muted">{text}</p></Link>; }
function StatusRow({ label, ok, text }: { label: string; ok: boolean; text: string }) { return <div className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"><span className="font-medium text-ink">{label}</span><span className={ok ? "text-teal" : "text-coral"}>{text}</span></div>; }
function Empty({ text }: { text: string }) { return <p className="text-sm text-ink-soft">{text}</p>; }
