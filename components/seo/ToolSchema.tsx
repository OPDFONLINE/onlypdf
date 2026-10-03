import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, toolCrumbs, toolSchema } from "@/lib/seo/schema";

type ToolForSchema = { slug: string; name: string; description: string; seoDescription?: string };

/** WebApplication + BreadcrumbList structured data for one tool page. */
export function ToolSchema({ tool }: { tool: ToolForSchema }) {
  return (
    <>
      <JsonLd data={toolSchema(tool)} />
      <JsonLd data={breadcrumbSchema(toolCrumbs(tool))} />
    </>
  );
}
