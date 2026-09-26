import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

export type AnalyticsEvent = {
  event_name: string;
  tool_slug: string | null;
  path: string;
  source: string | null;
  device_category: string | null;
  country_code: string | null;
  created_at: string;
};

export type AnalyticsSummary = {
  allTimeEvents: number;
  last30: { pageViews: number; starts: number; completes: number };
  last7: { pageViews: number; starts: number; completes: number };
  topTools: { slug: string; starts: number; completes: number }[];
  sources: { name: string; count: number }[];
  devices: { name: string; count: number }[];
  countries: { name: string; count: number }[];
  searchLandingPages: { path: string; count: number }[];
};

async function countEvents(
  supabase: SupabaseClient,
  eventName: string,
  since?: string
): Promise<{ count: number; error: { message: string } | null }> {
  let query = supabase
    .from("analytics_events")
    .select("id", { count: "exact", head: true })
    .eq("event_name", eventName);
  if (since) query = query.gte("created_at", since);
  const { count, error } = await query;
  return { count: count ?? 0, error };
}

function topValues(values: string[], limit: number): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

export async function getAnalyticsSummary(supabase: SupabaseClient): Promise<AnalyticsSummary> {
  const now = Date.now();
  const since30 = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString();
  const since7 = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [allTimeResult, last30, last7, recentResult] = await Promise.all([
    supabase.from("analytics_events").select("id", { count: "exact", head: true }),
    Promise.all([
      countEvents(supabase, "page_view", since30),
      countEvents(supabase, "tool_start", since30),
      countEvents(supabase, "tool_complete", since30),
    ]),
    Promise.all([
      countEvents(supabase, "page_view", since7),
      countEvents(supabase, "tool_start", since7),
      countEvents(supabase, "tool_complete", since7),
    ]),
    supabase
      .from("analytics_events")
      .select("event_name, tool_slug, path, source, device_category, country_code, created_at")
      .gte("created_at", since30)
      .order("created_at", { ascending: false })
      .limit(10000),
  ]);

  const errors = [
    allTimeResult.error,
    recentResult.error,
    ...last30.map((result) => result.error),
    ...last7.map((result) => result.error),
  ].filter(Boolean);

  if (errors.length > 0) {
    throw new Error(`Analytics database query failed: ${errors[0]?.message ?? "unknown database error"}`);
  }

  const recent = (recentResult.data ?? []) as AnalyticsEvent[];
  const startsByTool = new Map<string, number>();
  const completesByTool = new Map<string, number>();

  for (const event of recent) {
    if (!event.tool_slug) continue;
    if (event.event_name === "tool_start") {
      startsByTool.set(event.tool_slug, (startsByTool.get(event.tool_slug) ?? 0) + 1);
    }
    if (event.event_name === "tool_complete") {
      completesByTool.set(event.tool_slug, (completesByTool.get(event.tool_slug) ?? 0) + 1);
    }
  }

  const topTools = [...new Set([...startsByTool.keys(), ...completesByTool.keys()])]
    .map((slug) => ({
      slug,
      starts: startsByTool.get(slug) ?? 0,
      completes: completesByTool.get(slug) ?? 0,
    }))
    .sort((a, b) => b.starts - a.starts || b.completes - a.completes || a.slug.localeCompare(b.slug))
    .slice(0, 10);

  return {
    allTimeEvents: allTimeResult.count ?? 0,
    last30: { pageViews: last30[0].count, starts: last30[1].count, completes: last30[2].count },
    last7: { pageViews: last7[0].count, starts: last7[1].count, completes: last7[2].count },
    topTools,
    sources: topValues(recent.map((event) => event.source).filter((value): value is string => Boolean(value)), 6),
    devices: topValues(recent.map((event) => event.device_category).filter((value): value is string => Boolean(value)), 5),
    countries: topValues(recent.map((event) => event.country_code).filter((value): value is string => Boolean(value)), 10),
    searchLandingPages: topValues(
      recent
        .filter((event) => event.event_name === "page_view" && event.source === "organic_search")
        .map((event) => event.path),
      10
    ).map(({ name, count }) => ({ path: name, count })),
  };
}
