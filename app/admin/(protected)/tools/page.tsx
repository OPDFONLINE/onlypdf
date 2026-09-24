import type { Metadata } from "next";
import { getEffectiveTools } from "@/lib/supabase/tools";
import { ToolsManager } from "@/components/admin/ToolsManager";

export const metadata: Metadata = { title: "Tools" };

export default async function AdminToolsPage() {
  const tools = await getEffectiveTools();

  // Keep the Server -> Client boundary serializable. EffectiveTool extends
  // the public Tool type, which contains a React icon component/function.
  // The admin editor only needs these plain data fields.
  const initialTools = tools.map((tool) => ({
    slug: tool.slug,
    enabled: tool.enabled,
    name: tool.name,
    description: tool.description,
    seoTitle: tool.seoTitle,
    seoDescription: tool.seoDescription,
    featured: tool.featured,
    homepageVisible: tool.homepageVisible,
    sortOrder: tool.sortOrder,
    oneLiner: tool.oneLiner,
    instructions: tool.instructions,
    faq: tool.faq,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Tools</h1>
      <p className="mt-1 max-w-2xl text-sm text-ink-muted">
        Enable or disable tools, edit page copy and FAQ content, SEO metadata, homepage visibility,
        featured status, and ordering. Changes take effect on the public site
        within about a minute.
      </p>
      <ToolsManager initialTools={initialTools} />
    </div>
  );
}
