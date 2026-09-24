"use client";

import { useCallback, useRef } from "react";

export type AnalyticsEventName = "page_view" | "tool_start" | "tool_complete";

const SESSION_STORAGE_KEY = "onlypdf_analytics_session";

function getSessionId(): string | null {
  try {
    const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, id);
    return id;
  } catch {
    return null;
  }
}

export function trackAnalyticsEvent(
  eventName: AnalyticsEventName,
  payload: { toolSlug?: string; path?: string } = {}
): void {
  if (typeof window === "undefined") return;

  const body = {
    event_name: eventName,
    tool_slug: payload.toolSlug || null,
    path: payload.path || window.location.pathname,
    session_id: getSessionId(),
  };

  void fetch("/api/analytics", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {
    // Analytics must never interfere with the PDF workflow.
  });
}

export function useToolAnalytics(slug: string) {
  const startedRef = useRef(false);

  const trackStart = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackAnalyticsEvent("tool_start", { toolSlug: slug });
  }, [slug]);

  const trackComplete = useCallback(() => {
    trackAnalyticsEvent("tool_complete", { toolSlug: slug });
  }, [slug]);

  return { trackStart, trackComplete };
}
