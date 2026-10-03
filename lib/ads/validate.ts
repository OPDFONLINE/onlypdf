// Validation helpers for ad settings. The publisher ID and slot IDs end up in
// a <script src>, HTML attributes and ads.txt, so only accept the exact shapes
// Google uses instead of trusting whatever was typed into Admin > Settings.

/** AdSense publisher ID as shown in the account: ca-pub- followed by 16 digits. */
const PUBLISHER_ID = /^ca-pub-\d{16}$/;
/** AdSense ad unit (slot) IDs are plain digits, usually 10 of them. */
const SLOT_ID = /^\d{6,20}$/;

export function isValidAdsensePublisherId(value: string | null | undefined): value is string {
  return typeof value === "string" && PUBLISHER_ID.test(value);
}

export function isValidAdsenseSlotId(value: string | null | undefined): value is string {
  return typeof value === "string" && SLOT_ID.test(value);
}

/**
 * Body of /ads.txt for an AdSense publisher, or null when no valid ID is set.
 * Google's TAG ID f08c47fec0942fa0 is the same for every AdSense account.
 */
export function buildAdsTxt(publisherId: string | null | undefined): string | null {
  if (!isValidAdsensePublisherId(publisherId)) return null;
  return `google.com, ${publisherId.replace(/^ca-/, "")}, DIRECT, f08c47fec0942fa0\n`;
}
