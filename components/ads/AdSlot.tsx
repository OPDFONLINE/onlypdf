"use client";

import { useEffect, useRef } from "react";
import { isValidAdsensePublisherId, isValidAdsenseSlotId } from "@/lib/ads/validate";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({
  publisherId,
  slotId,
  className = "",
}: {
  publisherId: string | null | undefined;
  slotId: string | null | undefined;
  className?: string;
}) {
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const valid = isValidAdsensePublisherId(publisherId) && isValidAdsenseSlotId(slotId);

  useEffect(() => {
    if (!valid || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense script not ready yet or blocked by an ad blocker; safe to ignore.
    }
  }, [valid]);

  if (!valid) return null;

  return (
    <div className={className}>
      <p className="mb-1.5 text-center text-[10px] uppercase tracking-wide text-ink-soft">Advertisement</p>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={publisherId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
