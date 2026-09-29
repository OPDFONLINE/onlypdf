"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bold,
  CalendarClock,
  Check,
  ExternalLink,
  Eye,
  FilePen,
  FilePlus2,
  Heading2,
  Image as ImageIcon,
  Library,
  Link2,
  List,
  Loader2,
  Pencil,
  Search,
  Trash2,
  X,
  CheckCircle2,
} from "lucide-react";
import { Pagination } from "@/components/ui/Pagination";

type Status = "draft" | "published" | "scheduled";

type Summary = {
  id: string;
  title: string;
  slug: string;
  status: Status;
  excerpt: string | null;
  featured_image_url: string | null;
  category: string | null;
  author: string | null;
  published_at: string | null;
  scheduled_at: string | null;
  updated_at: string;
};

type FullPost = Summary & {
  content: string;
  seo_title: string | null;
  seo_description: string | null;
  featured_image_title: string | null;
  topic_cluster: string | null;
  related_slugs: string[];
};

type ListData = {
  posts: Summary[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  counts: { all: number; published: number; draft: number; scheduled: number };
  categories: string[];
};

type Filters = { status: string; q: string; category: string };

type ImageSource = {
  provider: "pexels" | "pixabay";
  providerImageId: string;
  sourceUrl: string;
  photographer: string | null;
  photographerUrl: string | null;
};

type Draft = Omit<FullPost, "id" | "updated_at"> & { id?: string; image_source?: ImageSource | null };
type SearchResult = ImageSource & { imageUrl: string; alt: string };

const EMPTY: Draft = {
  title: "",
  slug: "",
  status: "draft",
  excerpt: "",
  content: "",
  seo_title: "",
  seo_description: "",
  featured_image_url: "",
  featured_image_title: "",
  category: "",
  topic_cluster: "",
  related_slugs: [],
  author: "",
  published_at: null,
  scheduled_at: null,
  image_source: null,
};

const STATUS_STYLE: Record<Status, string> = {
  published: "bg-teal-soft text-teal",
  draft: "bg-amber-soft text-amber",
  scheduled: "bg-sky-soft text-sky",
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 120);
}

function formatDate(value: string | null) {
  return value ? new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "-";
}

function listUrl(filters: Partial<Filters> & { page?: number }) {
  const search = new URLSearchParams();
  if (filters.status && filters.status !== "all") search.set("status", filters.status);
  if (filters.q) search.set("q", filters.q);
  if (filters.category) search.set("category", filters.category);
  if (filters.page && filters.page > 1) search.set("page", String(filters.page));
  const qs = search.toString();
  return qs ? `/admin/blog?${qs}` : "/admin/blog";
}

export function BlogManager({
  list,
  filters,
  editing,
  creating,
}: {
  list: ListData;
  filters: Filters;
  editing: FullPost | null;
  creating: boolean;
}) {
  if (editing || creating) {
    return <EditorScreen key={editing?.id || "new"} initial={editing ? { ...editing, image_source: null } : { ...EMPTY }} />;
  }
  return <ListScreen list={list} filters={filters} />;
}

/* ------------------------------------------------------------------ list */

function ListScreen({ list, filters }: { list: ListData; filters: Filters }) {
  const router = useRouter();
  const [query, setQuery] = useState(filters.q);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => setQuery(filters.q), [filters.q]);

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    router.push(listUrl({ ...filters, q: query.trim() }));
  }

  async function remove(post: Summary) {
    if (!window.confirm(`Delete "${post.title || "Untitled"}"? This cannot be undone.`)) return;
    setBusyId(post.id);
    setMessage("");
    const response = await fetch("/api/admin/blog", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: post.id }),
    });
    setBusyId(null);
    if (response.ok) router.refresh();
    else setMessage("Could not delete the article.");
  }

  const tabs: { key: string; label: string; count: number; icon: typeof Library }[] = [
    { key: "all", label: "All", count: list.counts.all, icon: Library },
    { key: "published", label: "Published", count: list.counts.published, icon: CheckCircle2 },
    { key: "draft", label: "Drafts", count: list.counts.draft, icon: FilePen },
    { key: "scheduled", label: "Scheduled", count: list.counts.scheduled, icon: CalendarClock },
  ];
  const hasFilters = Boolean(filters.q || filters.category || filters.status !== "all");
  const from = list.total === 0 ? 0 : (list.page - 1) * list.pageSize + 1;
  const to = Math.min(list.page * list.pageSize, list.total);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">Blog</h1>
          <p className="mt-1 max-w-2xl text-sm text-ink-muted">Create, edit, publish, and schedule articles. Content uses lightweight Markdown.</p>
        </div>
        <Link href="/admin/blog?new=1" className="inline-flex items-center gap-2 rounded-pill bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark">
          <FilePlus2 size={16} aria-hidden="true" /> New article
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {tabs.map((tab) => {
          const active = filters.status === tab.key;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.key}
              href={listUrl({ ...filters, status: tab.key })}
              aria-current={active ? "page" : undefined}
              className={`rounded-card border-2 p-4 transition-colors ${active ? "border-accent bg-accent-soft" : "border-border bg-surface hover:border-accent"}`}
            >
              <span className="flex items-center gap-2 text-xs font-semibold text-ink-muted">
                <Icon size={14} aria-hidden="true" /> {tab.label}
              </span>
              <span className="mt-1 block text-2xl font-extrabold text-ink">{tab.count}</span>
            </Link>
          );
        })}
      </div>

      <form onSubmit={submitSearch} className="mt-5 flex flex-wrap items-center gap-2">
        <div className="relative min-w-0 flex-1 basis-64">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or slug…"
            aria-label="Search articles"
            className="w-full rounded-xl border border-border bg-surface py-2.5 pl-9 pr-3 text-sm text-ink"
          />
        </div>
        <select
          value={filters.category}
          onChange={(e) => router.push(listUrl({ ...filters, category: e.target.value }))}
          aria-label="Filter by category"
          className="rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-ink"
        >
          <option value="">All categories</option>
          {list.categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button type="submit" className="rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white">Search</button>
        {hasFilters && (
          <Link href="/admin/blog" className="inline-flex items-center gap-1 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink-muted hover:text-ink">
            <X size={14} aria-hidden="true" /> Clear
          </Link>
        )}
      </form>

      {message && <p className="mt-3 text-sm text-coral" role="alert">{message}</p>}

      <div className="mt-4 overflow-hidden rounded-card border-2 border-border bg-surface">
        {list.posts.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm font-semibold text-ink">{hasFilters ? "No articles match these filters." : "No articles yet."}</p>
            <Link href={hasFilters ? "/admin/blog" : "/admin/blog?new=1"} className="mt-3 inline-block text-sm font-semibold text-accent-dark hover:underline">
              {hasFilters ? "Clear filters" : "Write your first article"}
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {list.posts.map((post) => (
              <li key={post.id} className="flex flex-wrap items-center gap-4 p-4 hover:bg-paper/60">
                {post.featured_image_url ? (
                  <img src={post.featured_image_url} alt="" loading="lazy" className="h-14 w-24 shrink-0 rounded-lg border border-border object-cover" />
                ) : (
                  <span className="flex h-14 w-24 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-ink-soft"><ImageIcon size={18} aria-hidden="true" /></span>
                )}
                <div className="min-w-0 flex-1 basis-56">
                  <Link href={`/admin/blog?edit=${post.id}`} className="block truncate text-sm font-bold text-ink hover:text-accent-dark">
                    {post.title || "Untitled"}
                  </Link>
                  <p className="mt-0.5 truncate text-xs text-ink-soft">/blog/{post.slug}</p>
                  <p className="mt-1 text-xs text-ink-muted">
                    {post.category || "No category"} · Updated {formatDate(post.updated_at)}
                    {post.status === "scheduled" && post.scheduled_at ? ` · Goes live ${formatDate(post.scheduled_at)}` : ""}
                  </p>
                </div>
                <span className={`rounded-pill px-3 py-1 text-xs font-bold capitalize ${STATUS_STYLE[post.status]}`}>{post.status}</span>
                <div className="flex items-center gap-1">
                  <IconLink href={`/admin/blog?edit=${post.id}`} label="Edit article"><Pencil size={16} /></IconLink>
                  <IconLink href={`/admin/blog/preview/${post.id}`} label="Preview article" external><Eye size={16} /></IconLink>
                  {post.status === "published" && <IconLink href={`/blog/${post.slug}`} label="View live article" external><ExternalLink size={16} /></IconLink>}
                  <button
                    type="button"
                    onClick={() => remove(post)}
                    disabled={busyId === post.id}
                    aria-label="Delete article"
                    className="rounded-lg p-2 text-ink-soft transition-colors hover:bg-coral-soft hover:text-coral disabled:opacity-50"
                  >
                    {busyId === post.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {list.total > 0 && (
        <div className="mt-5 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-ink-muted">Showing {from}-{to} of {list.total}</p>
          <Pagination
            page={list.page}
            totalPages={list.totalPages}
            basePath="/admin/blog"
            params={{ status: filters.status !== "all" ? filters.status : undefined, q: filters.q || undefined, category: filters.category || undefined }}
          />
        </div>
      )}
    </div>
  );
}

function IconLink({ href, label, external = false, children }: { href: string; label: string; external?: boolean; children: ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="rounded-lg p-2 text-ink-soft transition-colors hover:bg-accent-soft hover:text-accent-dark"
    >
      {children}
    </Link>
  );
}

/* ---------------------------------------------------------------- editor */

const TABS = ["Content", "SEO", "Media", "Settings"] as const;
type Tab = (typeof TABS)[number];

function EditorScreen({ initial }: { initial: Draft }) {
  const router = useRouter();
  const [form, setForm] = useState<Draft>(initial);
  const [tab, setTab] = useState<Tab>("Content");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.id));
  const contentRef = useRef<HTMLTextAreaElement>(null);

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function setTitle(value: string) {
    setForm((current) => ({ ...current, title: value, slug: slugTouched ? current.slug : slugify(value) }));
  }

  function insert(before: string, after = "", placeholder = "") {
    const el = contentRef.current;
    if (!el) return;
    const { selectionStart: start, selectionEnd: end, value } = el;
    const selected = value.slice(start, end) || placeholder;
    const next = value.slice(0, start) + before + selected + after + value.slice(end);
    update("content", next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  }

  async function save() {
    if (!form.title.trim()) {
      setMessage({ tone: "error", text: "Add a title first." });
      setTab("Content");
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/admin/blog", {
        method: form.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, related_slugs: form.related_slugs.filter(Boolean) }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Could not save the article.");
      if (!form.id && data.id) {
        router.replace(`/admin/blog?edit=${data.id}`);
      } else {
        setForm((current) => ({ ...current, image_source: null }));
        setMessage({ tone: "ok", text: "Saved." });
        router.refresh();
      }
    } catch (error) {
      setMessage({ tone: "error", text: error instanceof Error ? error.message : "Could not save the article." });
    } finally {
      setSaving(false);
    }
  }

  const words = form.content.trim() ? form.content.trim().split(/\s+/).length : 0;

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-6 -mt-6 flex flex-wrap items-center gap-3 border-b border-border bg-paper/95 px-6 py-3 backdrop-blur md:-mx-8 md:-mt-8 md:px-8">
        <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-muted hover:text-ink">
          <ArrowLeft size={16} aria-hidden="true" /> All posts
        </Link>
        <h1 className="min-w-0 flex-1 truncate text-base font-bold text-ink">{form.id ? form.title || "Untitled" : "New article"}</h1>
        {message && (
          <span role="status" className={`text-sm font-semibold ${message.tone === "ok" ? "text-teal" : "text-coral"}`}>{message.text}</span>
        )}
        <select
          value={form.status}
          onChange={(e) => update("status", e.target.value as Status)}
          aria-label="Status"
          className="rounded-xl border border-border bg-surface px-3 py-2 text-sm font-semibold text-ink"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="scheduled">Scheduled</option>
        </select>
        {form.id && (
          <a href={`/admin/blog/preview/${form.id}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-sm font-semibold text-ink-muted hover:text-ink">
            <Eye size={15} aria-hidden="true" /> Preview
          </a>
        )}
        <button type="button" onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-pill bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-50">
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />} {saving ? "Saving…" : "Save"}
        </button>
      </div>

      <div role="tablist" aria-label="Article sections" className="mt-6 flex gap-1 overflow-x-auto border-b border-border">
        {TABS.map((name) => (
          <button
            key={name}
            role="tab"
            type="button"
            aria-selected={tab === name}
            onClick={() => setTab(name)}
            className={`-mb-px shrink-0 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
              tab === name ? "border-accent text-accent-dark" : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="mt-6 max-w-4xl rounded-card border-2 border-border bg-surface p-5 sm:p-6">
        {tab === "Content" && (
          <div className="grid gap-4">
            <Field label="Title"><input value={form.title} onChange={(e) => setTitle(e.target.value)} placeholder="Article title" /></Field>
            <Field label="Slug (URL)">
              <input value={form.slug} onChange={(e) => { setSlugTouched(true); update("slug", e.target.value); }} placeholder="auto-generated-from-title" />
            </Field>
            <Field label="Excerpt">
              <textarea rows={3} value={form.excerpt || ""} onChange={(e) => update("excerpt", e.target.value)} placeholder="Short summary shown on the blog page and under the title." />
            </Field>
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold text-ink-muted">Content (lightweight Markdown)</span>
                <div className="flex items-center gap-1">
                  <ToolbarButton label="Heading" onClick={() => insert("## ", "", "Heading")}><Heading2 size={15} /></ToolbarButton>
                  <ToolbarButton label="Bold" onClick={() => insert("**", "**", "bold text")}><Bold size={15} /></ToolbarButton>
                  <ToolbarButton label="List" onClick={() => insert("- ", "", "List item")}><List size={15} /></ToolbarButton>
                  <ToolbarButton label="Link" onClick={() => insert("[", "](/tools/merge-pdf)", "link text")}><Link2 size={15} /></ToolbarButton>
                  <ToolbarButton label="Highlight box" onClick={() => insert(":::highlight blue\n", "\n:::", "Key point")}><span className="text-[11px] font-bold">Box</span></ToolbarButton>
                </div>
              </div>
              <textarea
                ref={contentRef}
                rows={22}
                value={form.content}
                onChange={(e) => update("content", e.target.value)}
                placeholder={"# Heading\n\nWrite the article here..."}
                className="mt-1 w-full rounded-lg border border-border bg-paper px-3 py-2 font-mono text-sm leading-6 text-ink"
              />
              <p className="mt-1 text-right text-xs text-ink-soft">{words.toLocaleString()} words</p>
            </div>
          </div>
        )}

        {tab === "SEO" && (
          <div className="grid gap-4">
            <Field label="SEO title" hint={`${(form.seo_title || "").length}/60`}>
              <input value={form.seo_title || ""} onChange={(e) => update("seo_title", e.target.value)} placeholder={form.title || "Defaults to the article title"} />
            </Field>
            <Field label="SEO description" hint={`${(form.seo_description || "").length}/160`}>
              <textarea rows={3} value={form.seo_description || ""} onChange={(e) => update("seo_description", e.target.value)} placeholder="Shown in search results." />
            </Field>
            <div className="rounded-xl border border-border bg-paper p-4">
              <p className="text-xs font-semibold text-ink-soft">Search preview</p>
              <p className="mt-2 truncate text-base font-semibold text-sky">{form.seo_title || form.title || "Article title"}</p>
              <p className="truncate text-xs text-teal">onlypdf.online/blog/{form.slug || "slug"}</p>
              <p className="mt-1 line-clamp-2 text-sm text-ink-muted">{form.seo_description || form.excerpt || "Description appears here."}</p>
            </div>
            <Field label="Related article slugs (one per line)">
              <textarea rows={4} value={(form.related_slugs || []).join("\n")} onChange={(e) => update("related_slugs", e.target.value.split(/\n+/).map((v) => v.trim()).filter(Boolean))} />
            </Field>
          </div>
        )}

        {tab === "Media" && <MediaTab form={form} update={update} />}

        {tab === "Settings" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Category"><input value={form.category || ""} onChange={(e) => update("category", e.target.value)} placeholder="e.g. Organize PDF" /></Field>
            <Field label="Topic cluster"><input value={form.topic_cluster || ""} onChange={(e) => update("topic_cluster", e.target.value)} placeholder="e.g. merge-organize" /></Field>
            <Field label="Author"><input value={form.author || ""} onChange={(e) => update("author", e.target.value)} placeholder="OnlyPDF Team" /></Field>
            <Field label="Scheduled at">
              <input type="datetime-local" value={form.scheduled_at ? form.scheduled_at.slice(0, 16) : ""} onChange={(e) => update("scheduled_at", e.target.value ? new Date(e.target.value).toISOString() : null)} />
            </Field>
            <p className="text-xs text-ink-soft sm:col-span-2">
              Articles in the same topic cluster (then the same category) are used to pick the “Similar articles” shown next to each post.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ToolbarButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} title={label} className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-border bg-paper px-2 text-ink-muted transition-colors hover:border-accent hover:text-accent-dark">
      {children}
    </button>
  );
}

function MediaTab({ form, update }: { form: Draft; update: <K extends keyof Draft>(key: K, value: Draft[K]) => void }) {
  const [imageQuery, setImageQuery] = useState("");
  const [provider, setProvider] = useState<"pexels" | "pixabay">("pexels");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [selecting, setSelecting] = useState<string | null>(null);
  const [imageMessage, setImageMessage] = useState("");

  async function searchImages() {
    const query = imageQuery.trim();
    if (!query) return;
    setSearching(true);
    setImageMessage("");
    try {
      const response = await fetch(`/api/admin/blog/images?provider=${provider}&q=${encodeURIComponent(query)}`);
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Image search failed.");
      setResults(data.results ?? []);
    } catch (error) {
      setResults([]);
      setImageMessage(error instanceof Error ? error.message : "Image search failed.");
    } finally {
      setSearching(false);
    }
  }

  async function selectImage(image: SearchResult) {
    setSelecting(`${image.provider}:${image.providerImageId}`);
    setImageMessage("");
    try {
      const response = await fetch("/api/admin/blog/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(image),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Could not save image.");
      update("featured_image_url", data.url);
      update("image_source", {
        provider: data.provider,
        providerImageId: data.providerImageId,
        sourceUrl: data.sourceUrl,
        photographer: data.photographer,
        photographerUrl: data.photographerUrl,
      });
      setImageMessage("Image saved to OnlyPDF storage. Save the article to record its source and creator.");
    } catch (error) {
      setImageMessage(error instanceof Error ? error.message : "Could not save image.");
    } finally {
      setSelecting(null);
    }
  }

  return (
    <div className="grid gap-4">
      {form.featured_image_url ? (
        <div className="flex items-start gap-3 rounded-xl border border-border bg-paper p-3">
          <img src={form.featured_image_url} alt="" className="h-24 w-40 rounded-lg object-cover" />
          <div className="min-w-0 text-xs text-ink-muted">
            <p className="text-sm font-semibold text-ink">Featured image</p>
            {form.image_source?.photographer && <p className="mt-1">Photo by {form.image_source.photographer} on {form.image_source.provider}.</p>}
          </div>
          <button type="button" onClick={() => { update("featured_image_url", ""); update("image_source", null); }} className="ml-auto rounded p-1 text-ink-soft hover:text-coral" aria-label="Remove featured image">
            <X size={16} />
          </button>
        </div>
      ) : (
        <p className="rounded-xl border-2 border-dashed border-border p-6 text-center text-sm text-ink-muted">No featured image yet. Search below or paste a URL.</p>
      )}

      <Field label="Featured image URL">
        <input value={form.featured_image_url || ""} onChange={(e) => { update("featured_image_url", e.target.value); update("image_source", null); }} />
      </Field>
      <Field label="Featured image hover title">
        <input value={form.featured_image_title || ""} onChange={(e) => update("featured_image_title", e.target.value)} placeholder="Text shown on mouse hover" />
      </Field>

      <div className="rounded-xl border border-border bg-paper p-4">
        <p className="text-sm font-bold text-ink">Image search</p>
        <p className="mt-1 text-xs text-ink-muted">Search provider libraries, save the selected image to OnlyPDF storage, and keep source/creator metadata.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <input
            value={imageQuery}
            onChange={(e) => setImageQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); void searchImages(); } }}
            placeholder="e.g. merge PDF documents"
            className="min-w-0 flex-1 rounded-lg border border-border bg-white px-3 py-2 text-sm text-ink"
          />
          <select value={provider} onChange={(e) => setProvider(e.target.value as "pexels" | "pixabay")} className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-ink">
            <option value="pexels">Pexels</option>
            <option value="pixabay">Pixabay</option>
          </select>
          <button type="button" onClick={() => void searchImages()} disabled={searching} className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
            {searching ? <Loader2 size={15} className="animate-spin" /> : <Search size={15} />} Search
          </button>
        </div>
        {results.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {results.map((image) => {
              const key = `${image.provider}:${image.providerImageId}`;
              return (
                <div key={key} className="overflow-hidden rounded-xl border border-border bg-white">
                  <img src={image.imageUrl} alt={image.alt} className="aspect-[16/9] w-full object-cover" loading="lazy" />
                  <div className="p-2">
                    <p className="truncate text-[11px] text-ink-muted">{image.photographer || "Creator not provided"}</p>
                    <button type="button" onClick={() => void selectImage(image)} disabled={selecting !== null} className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg bg-accent px-2 py-1.5 text-xs font-semibold text-white disabled:opacity-50">
                      {selecting === key ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />} Use image
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {imageMessage && <p className="mt-3 text-xs text-ink-muted">{imageMessage}</p>}
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block text-xs font-semibold text-ink-muted">
      <span className="flex items-center justify-between">
        {label}
        {hint && <span className="font-normal text-ink-soft">{hint}</span>}
      </span>
      <div className="mt-1 [&_input]:w-full [&_input]:rounded-lg [&_input]:border [&_input]:border-border [&_input]:bg-paper [&_input]:px-3 [&_input]:py-2 [&_input]:text-sm [&_input]:text-ink [&_select]:w-full [&_select]:rounded-lg [&_select]:border [&_select]:border-border [&_select]:bg-paper [&_select]:px-3 [&_select]:py-2 [&_select]:text-sm [&_select]:text-ink [&_textarea]:w-full [&_textarea]:rounded-lg [&_textarea]:border [&_textarea]:border-border [&_textarea]:bg-paper [&_textarea]:px-3 [&_textarea]:py-2 [&_textarea]:text-sm [&_textarea]:text-ink">
        {children}
      </div>
    </label>
  );
}
