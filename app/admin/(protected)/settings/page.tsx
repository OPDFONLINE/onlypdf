import type { Metadata } from "next";
import { getAdminContext } from "@/lib/supabase/admin";
import { SettingsManager } from "@/components/admin/SettingsManager";

type SettingRow = { key: string; value: string | null };

export const metadata: Metadata = { title: "Site settings" };

const DEFAULT_KEYS = ["site_name", "site_tagline", "homepage_title", "homepage_description", "contact_email", "default_author"];

export default async function AdminSettingsPage() {
  const context = await getAdminContext();
  const { data } = context
    ? await context.supabase.from("site_settings").select("key, value").in("key", DEFAULT_KEYS)
    : { data: [] };
  const settings = Object.fromEntries(((data ?? []) as SettingRow[]).map((row) => [row.key, row.value ?? ""]));

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Site settings</h1>
      <p className="mt-1 max-w-2xl text-sm text-ink-muted">Routine site identity and editorial defaults that should not require a code change.</p>
      <SettingsManager initialSettings={settings} />
    </div>
  );
}
