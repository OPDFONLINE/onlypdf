import { notFound } from "next/navigation";
import { getEffectiveTool } from "@/lib/supabase/tools";
import { ToolPageShellClient } from "@/components/tools/ToolPageShellClient";

export async function ToolPageShell({ slug }: { slug: string }) {
  const tool = await getEffectiveTool(slug);
  if (!tool || !tool.enabled) notFound();

  return (
    <ToolPageShellClient
      slug={slug}
      content={{
        name: tool.name,
        oneLiner: tool.oneLiner,
        instructions: tool.instructions,
        faq: tool.faq,
      }}
    />
  );
}
