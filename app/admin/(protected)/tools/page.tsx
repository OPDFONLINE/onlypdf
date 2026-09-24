import type { Metadata } from "next";
import { getEffectiveTools } from "@/lib/supabase/tools";
import { ToolsManager } from "@/components/admin/ToolsManager";

export const metadata: Metadata = { title: "Tools" };

export default async function AdminToolsPage() {
  const tools = await getEffectiveTools();

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Tools</h1>
      <p className="mt-1 max-w-2xl text-sm text-ink-muted">
        Enable or disable tools, rename them, edit their SEO title/description, and control
        homepage visibility, featured status, and ordering. Changes take effect on the public site
        within about a minute.
      </p>
      <ToolsManager initialTools={tools} />
    </div>
  );
}
