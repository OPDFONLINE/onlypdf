import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { isSupabaseServiceConfigured } from "@/lib/supabase/env";

const EVENT_NAMES = new Set(["page_view", "tool_start", "tool_complete"]);
const TOOL_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PATH = /^\/[A-Za-z0-9_./-]*$/;

function normalizeReferrer(request: Request): string | null {
  const raw = request.headers.get("referer");
  if (!raw) return null;
  try {
    return new URL(raw).hostname.toLowerCase().slice(0, 255) || null;
  } catch {
    return null;
  }
}

function getSource(referrer: string | null, host: string | null): string {
  if (!referrer) return "direct";
  if (host && referrer === host) return "internal";

  const searchHosts = ["google.", "bing.com", "search.yahoo.com", "duckduckgo.com", "yandex.", "baidu.com"];
  if (searchHosts.some((item) => referrer === item || referrer.endsWith(`.${item}`) || referrer.includes(item))) {
    return "organic_search";
  }

  const socialHosts = ["facebook.com", "instagram.com", "linkedin.com", "twitter.com", "x.com", "tiktok.com", "youtube.com", "reddit.com"];
  if (socialHosts.some((item) => referrer === item || referrer.endsWith(`.${item}`) || referrer.includes(item))) {
    return "social";
  }

  return "referral";
}

function getDeviceCategory(userAgent: string | null): string {
  const ua = (userAgent || "").toLowerCase();
  if (/ipad|tablet|playbook|silk/.test(ua) || (/android/.test(ua) && !/mobile/.test(ua))) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|iemobile|opera mini/.test(ua)) return "mobile";
  return "desktop";
}

function validSessionId(value: unknown): string | null {
  if (typeof value !== "string" || value.length > 80) return null;
  return /^[0-9a-f-]{20,80}$/i.test(value) ? value : null;
}

export async function POST(request: Request) {
  if (!isSupabaseServiceConfigured) {
    return new NextResponse(null, { status: 204 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return new NextResponse(null, { status: 204 });

  const eventName = (body as { event_name?: unknown }).event_name;
  if (typeof eventName !== "string" || !EVENT_NAMES.has(eventName)) {
    return new NextResponse(null, { status: 204 });
  }

  const rawSlug = (body as { tool_slug?: unknown }).tool_slug;
  const toolSlug = typeof rawSlug === "string" && TOOL_SLUG.test(rawSlug) ? rawSlug.slice(0, 100) : null;
  const rawPath = (body as { path?: unknown }).path;
  const path = typeof rawPath === "string" && PATH.test(rawPath) ? rawPath.slice(0, 500) : "/";
  const sessionId = validSessionId((body as { session_id?: unknown }).session_id);
  const referrer = normalizeReferrer(request);
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase() || null;
  const country = request.headers.get("x-vercel-ip-country")?.toUpperCase().slice(0, 2) || null;
  const userAgent = request.headers.get("user-agent");
  const source = getSource(referrer, host);
  const deviceCategory = getDeviceCategory(userAgent);

  const supabase = createSupabaseServiceClient();
  if (!supabase) return new NextResponse(null, { status: 204 });

  const { error } = await supabase.from("analytics_events").insert({
    event_name: eventName,
    tool_slug: toolSlug,
    path,
    referrer,
    source,
    device_category: deviceCategory,
    country_code: country,
    session_id: sessionId,
  });

  if (error) {
    console.error("Analytics event write failed", error.message);
  }

  return new NextResponse(null, { status: 204 });
}
