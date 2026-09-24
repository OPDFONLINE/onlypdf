import { unstable_cache } from "next/cache";
import { tools as staticTools, type Tool } from "@/lib/tools";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export type ToolOverrideRow = {
  slug: string;
  enabled: boolean;
  name: string | null;
  description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  sort_order: number | null;
  featured: boolean;
  homepage_visible: boolean;
};

/**
 * A tool merged with its admin override, if any. Structurally still a
 * `Tool`, so it can be passed anywhere a Tool is expected (ToolCard, etc.)
 * without changes.
 */
export type EffectiveTool = Tool & {
  enabled: boolean;
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
  homepageVisible: boolean;
  sortOrder: number;
};

function mergeTool(base: Tool, index: number, override: ToolOverrideRow | undefined): EffectiveTool {
  const name = override?.name?.trim() || base.name;
  const description = override?.description?.trim() || base.description;
  return {
    ...base,
    name,
    description,
    enabled: override?.enabled ?? true,
    seoTitle: override?.seo_title?.trim() || name,
    seoDescription: override?.seo_description?.trim() || description,
    featured: override?.featured ?? false,
    homepageVisible: override?.homepage_visible ?? true,
    sortOrder: override?.sort_order ?? index,
  };
}

/**
 * Cached, cookie-free read of every row in the `tools` table. Tagged "tools"
 * so app/api/admin/tools/route.ts can invalidate it immediately after a
 * save, with a short time-based revalidation as a safety net.
 */
const getCachedOverrideRows = unstable_cache(
  async (): Promise<ToolOverrideRow[]> => {
    if (!isSupabaseConfigured) return [];
    const supabase = createSupabasePublicClient();
    if (!supabase) return [];
    const { data, error } = await supabase.from("tools").select("*");
    if (error || !data) return [];
    return data as ToolOverrideRow[];
  },
  ["tool-overrides"],
  { tags: ["tools"], revalidate: 60 }
);

/**
 * Every tool, merged with its admin override and sorted by admin-defined
 * order. Falls back to the static defaults (all enabled, homepage-visible,
 * in file order) when Supabase isn't connected yet, so the public site works
 * unchanged before the admin panel has been set up.
 */
export async function getEffectiveTools(): Promise<EffectiveTool[]> {
  const rows = await getCachedOverrideRows();
  const overrideBySlug = new Map(rows.map((row) => [row.slug, row]));
  return staticTools
    .map((tool, index) => mergeTool(tool, index, overrideBySlug.get(tool.slug)))
    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
}

export async function getEffectiveTool(slug: string): Promise<EffectiveTool | undefined> {
  const tools = await getEffectiveTools();
  return tools.find((tool) => tool.slug === slug);
}
