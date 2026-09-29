import Link from "next/link";
import { Fragment, type ReactNode } from "react";

const LINK_PATTERN = /\[([^\]]+)\]\((\/[^\s)]+|https?:\/\/[^\s)]+)\)/g;
const IMAGE_BLOCK_PATTERN = /^!\[([^\]]*)\]\((\S+)\)$/;
const TABLE_SEPARATOR_ROW = /^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?$/;

const HIGHLIGHT_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  blue: { bg: "bg-sky-soft", border: "border-sky", text: "text-ink" },
  green: { bg: "bg-teal-soft", border: "border-teal", text: "text-ink" },
  purple: { bg: "bg-violet-soft", border: "border-violet", text: "text-ink" },
  orange: { bg: "bg-amber-soft", border: "border-amber", text: "text-ink" },
  pink: { bg: "bg-pink-soft", border: "border-pink", text: "text-ink" },
  red: { bg: "bg-coral-soft", border: "border-coral", text: "text-ink" },
  lime: { bg: "bg-lime-soft", border: "border-lime", text: "text-ink" },
};

const CHART_BAR_COLORS = ["bg-accent", "bg-teal", "bg-amber", "bg-pink", "bg-sky", "bg-violet", "bg-coral", "bg-lime"];

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Pulls every H2 ("## ...") heading out of the raw markdown, in order, for a table of contents. */
export function extractTableOfContents(markdown: string): { id: string; text: string }[] {
  const headings: { id: string; text: string }[] = [];
  for (const block of markdown.split(/\n{2,}/)) {
    const text = block.trim();
    if (text.startsWith("## ")) {
      const heading = text.slice(3).trim();
      if (heading) headings.push({ id: slugifyHeading(heading), text: heading });
    }
  }
  return headings;
}

/** Turns "[label](/path)" segments inside a line of text into real links, internal ones using next/link. */
function renderInline(text: string, keyPrefix: string) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let index = 0;
  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const label = match[1];
    const href = match[2];
    if (!label || !href) continue;
    const isInternal = href.startsWith("/");
    nodes.push(
      isInternal ? (
        <Link key={`${keyPrefix}-${index}`} href={href} className="font-semibold text-accent-dark underline underline-offset-2 hover:text-accent">
          {label}
        </Link>
      ) : (
        <a key={`${keyPrefix}-${index}`} href={href} target="_blank" rel="noreferrer" className="font-semibold text-accent-dark underline underline-offset-2 hover:text-accent">
          {label}
        </a>
      )
    );
    lastIndex = match.index + match[0].length;
    index += 1;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function renderTable(lines: string[], key: number) {
  const rows = lines.map((line) => line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim()));
  const header = rows[0];
  const body = rows.slice(2); // row 0 = header, row 1 = --- separator
  if (!header) return null;
  return (
    <div key={key} className="my-6 overflow-x-auto rounded-card border border-border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-accent-soft">
            {header.map((cell, i) => (
              <th key={i} className="border-b border-border px-4 py-2.5 text-left font-bold text-ink">
                {renderInline(cell, `th-${key}-${i}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, r) => (
            <tr key={r} className={r % 2 === 1 ? "bg-paper" : undefined}>
              {row.map((cell, c) => (
                <td key={c} className="border-b border-border px-4 py-2.5 text-ink-muted">
                  {renderInline(cell, `td-${key}-${r}-${c}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderChart(dataLines: string[], key: number) {
  const points = dataLines
    .map((line) => {
      const parts = line.split("|");
      const label = parts[0]?.trim();
      const value = Number(parts[1]?.trim());
      if (!label || Number.isNaN(value)) return null;
      return { label, value };
    })
    .filter((p): p is { label: string; value: number } => p !== null);
  if (points.length === 0) return null;
  const max = Math.max(...points.map((p) => p.value), 1);
  return (
    <div key={key} className="my-6 space-y-3 rounded-card border border-border bg-surface p-5">
      {points.map((point, i) => (
        <div key={i}>
          <div className="mb-1 flex justify-between text-xs font-semibold text-ink-muted">
            <span>{point.label}</span>
            <span>{point.value}</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-pill bg-paper">
            <div
              className={`h-full rounded-pill ${CHART_BAR_COLORS[i % CHART_BAR_COLORS.length]}`}
              style={{ width: `${Math.max((point.value / max) * 100, 4)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Pulls every inline "![alt|title](url)" image out of the raw markdown, in order. */
export function extractContentImages(markdown: string): { url: string; alt: string }[] {
  const images: { url: string; alt: string }[] = [];
  for (const block of markdown.split(/\n{2,}/)) {
    const text = block.trim();
    const match = text.match(IMAGE_BLOCK_PATTERN);
    if (match && match[2]) {
      const alt = (match[1] ?? "").split("|")[0]?.trim() || "";
      images.push({ url: match[2], alt });
    }
  }
  return images;
}

/**
 * Renders the article body. If `beforeFirstH2` is given (e.g. the table of
 * contents), it is inserted right before the first "## " heading, so it sits
 * after the intro and ahead of the article's second headline.
 */
export function renderBlogContent(markdown: string, beforeFirstH2?: ReactNode) {
  let inserted = false;
  let checkedFirstBlock = false;
  return markdown.split(/\n{2,}/).map((block, i) => {
    const text = block.trim();
    if (!text) return null;

    // The page already shows the article title as its <h1>, so a leading
    // "# Title" line inside the content would repeat it. Skip it.
    if (!checkedFirstBlock) {
      checkedFirstBlock = true;
      if (text.startsWith("# ") && !text.includes("\n")) return null;
    }
    const lines = text.split("\n");

    if (beforeFirstH2 && !inserted && text.startsWith("## ")) {
      inserted = true;
      const heading = renderBlogContent(text)[0];
      return (
        <Fragment key={`toc-${i}`}>
          {beforeFirstH2}
          {heading}
        </Fragment>
      );
    }

    // ::: highlight <color> ... ::: (single block, no blank lines inside)
    const firstLine = lines[0]?.trim() ?? "";
    if (firstLine.startsWith(":::highlight") && lines[lines.length - 1]?.trim() === ":::") {
      const colorKey = firstLine.replace(":::highlight", "").trim().toLowerCase();
      const colors = HIGHLIGHT_COLORS[colorKey] || HIGHLIGHT_COLORS.blue!;
      const body = lines.slice(1, -1).join("\n");
      return (
        <div key={i} className={`my-6 rounded-card border-l-4 ${colors.border} ${colors.bg} p-4`}>
          <p className={`leading-7 font-medium ${colors.text}`}>{renderInline(body, `hl-${i}`)}</p>
        </div>
      );
    }

    // ::: chart bar ... ::: (single block, "Label | value" per line, no blank lines inside)
    if (firstLine.startsWith(":::chart") && lines[lines.length - 1]?.trim() === ":::") {
      return renderChart(lines.slice(1, -1), i);
    }

    // Pipe tables: header row, separator row, one or more data rows.
    if (lines.length >= 2 && lines[0]?.includes("|") && lines[1] && TABLE_SEPARATOR_ROW.test(lines[1].trim())) {
      const table = renderTable(lines, i);
      if (table) return table;
    }

    const imageMatch = text.match(IMAGE_BLOCK_PATTERN);
    if (imageMatch && imageMatch[2]) {
      const altAndTitle = imageMatch[1] ?? "";
      const url = imageMatch[2];
      const [alt, title] = altAndTitle.split("|").map((part) => part.trim());
      return (
        <figure key={i} className="my-8">
          <img src={url} alt={alt || ""} title={title || alt || undefined} loading="lazy" className="w-full rounded-card border border-border object-cover" />
        </figure>
      );
    }

    if (text.startsWith("### ")) return <h3 key={i} className="mt-8 text-xl font-bold text-ink">{renderInline(text.slice(4), `h3-${i}`)}</h3>;
    if (text.startsWith("## ")) {
      const headingText = text.slice(3);
      return (
        <h2 key={i} id={slugifyHeading(headingText)} className="mt-10 scroll-mt-24 text-2xl font-bold text-ink">
          {renderInline(headingText, `h2-${i}`)}
        </h2>
      );
    }
    if (text.startsWith("# ")) return <h1 key={i} className="mt-10 text-3xl font-bold text-ink">{renderInline(text.slice(2), `h1-${i}`)}</h1>;

    if (lines.every((l) => l.trim().startsWith("- "))) {
      return (
        <ul key={i} className="list-disc space-y-2 pl-6 text-ink-muted">
          {lines.map((l, j) => (
            <li key={j}>{renderInline(l.trim().slice(2), `li-${i}-${j}`)}</li>
          ))}
        </ul>
      );
    }

    return (
      <p key={i} className="leading-8 text-ink-muted">
        {lines.map((l, j) => (
          <span key={j}>
            {renderInline(l, `p-${i}-${j}`)}
            {j < lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </p>
    );
  });
}

export function TableOfContents({ items }: { items: { id: string; text: string }[] }) {
  if (items.length < 2) return null;
  return (
    <nav className="my-8 rounded-card border-2 border-border bg-surface p-5" aria-label="Table of contents">
      <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">On this page</p>
      <ul className="mt-3 space-y-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="text-sm text-accent-dark hover:underline">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function RelatedLinks({ slugs }: { slugs: string[] }) {
  return slugs.length ? (
    <div className="mt-12 border-t border-border pt-8">
      <h2 className="text-lg font-bold text-ink">Related articles</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {slugs.map((slug) => (
          <Link key={slug} href={`/blog/${slug}`} className="rounded-pill border border-border px-3 py-1.5 text-sm text-ink-muted hover:bg-surface">
            {slug.replaceAll("-", " ")}
          </Link>
        ))}
      </div>
    </div>
  ) : null;
}
