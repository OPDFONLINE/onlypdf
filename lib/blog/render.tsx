import Link from "next/link";
import type { ReactNode } from "react";

const LINK_PATTERN = /\[([^\]]+)\]\((\/[^\s)]+|https?:\/\/[^\s)]+)\)/g;
const IMAGE_BLOCK_PATTERN = /^!\[([^\]]*)\]\((\S+)\)$/;

/** Turns "[label](/path)" segments inside a line of text into real links, internal ones using next/link. */
function renderInline(text: string, keyPrefix: string) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let index = 0;
  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const [, label, href] = match;
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

export function renderBlogContent(markdown: string) {
  return markdown.split(/\n{2,}/).map((block, i) => {
    const text = block.trim();
    if (!text) return null;

    const imageMatch = text.match(IMAGE_BLOCK_PATTERN);
    if (imageMatch) {
      const [, altAndTitle, url] = imageMatch;
      const [alt, title] = altAndTitle.split("|").map((part) => part.trim());
      return (
        <figure key={i} className="my-8">
          <img
            src={url}
            alt={alt || ""}
            title={title || alt || undefined}
            loading="lazy"
            className="w-full rounded-card border border-border object-cover"
          />
        </figure>
      );
    }

    if (text.startsWith("### ")) return <h3 key={i} className="mt-8 text-xl font-bold text-ink">{renderInline(text.slice(4), `h3-${i}`)}</h3>;
    if (text.startsWith("## ")) return <h2 key={i} className="mt-10 text-2xl font-bold text-ink">{renderInline(text.slice(3), `h2-${i}`)}</h2>;
    if (text.startsWith("# ")) return <h1 key={i} className="mt-10 text-3xl font-bold text-ink">{renderInline(text.slice(2), `h1-${i}`)}</h1>;

    const lines = text.split("\n");
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
