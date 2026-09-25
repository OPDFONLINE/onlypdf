"use client";

import { useState } from "react";
import { Check, Image as ImageIcon, Loader2, Plus, Search, Trash2, X } from "lucide-react";

type Post = {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published" | "scheduled";
  excerpt: string | null;
  content: string;
  seo_title: string | null;
  seo_description: string | null;
  featured_image_url: string | null;
  category: string | null;
  topic_cluster: string | null;
  related_slugs: string[];
  author: string | null;
  published_at: string | null;
  scheduled_at: string | null;
  created_at: string;
  updated_at: string;
};

type ImageSource = {
  provider: "pexels" | "pixabay";
  providerImageId: string;
  sourceUrl: string;
  photographer: string | null;
  photographerUrl: string | null;
};

type Draft = Omit<Post, "id" | "created_at" | "updated_at"> & {
  id?: string;
  image_source?: ImageSource | null;
};

const empty: Draft = {
  title: "",
  slug: "",
  status: "draft",
  excerpt: "",
  content: "",
  seo_title: "",
  seo_description: "",
  featured_image_url: "",
  category: "",
  topic_cluster: "",
  related_slugs: [],
  author: "",
  published_at: null,
  scheduled_at: null,
  image_source: null,
};

type SearchResult = ImageSource & { imageUrl: string; alt: string };

export function BlogManager({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [form, setForm] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function edit(post: Post) {
    setMessage("");
    setForm({ ...post, image_source: null });
  }

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setForm((current) => current ? { ...current, [key]: value } : current);
  }

  async function save() {
    if (!form) return;
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/blog", {
        method: form.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          related_slugs: form.related_slugs.filter(Boolean),
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Could not save article.");
      window.location.reload();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save article.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this article?")) return;
    const response = await fetch("/api/admin/blog", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (response.ok) setPosts((current) => current.filter((post) => post.id !== id));
    else setMessage("Could not delete article.");
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
      <section className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className={`rounded-card border-2 p-4 ${form?.id === post.id ? "border-accent bg-surface" : "border-border bg-surface"}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-ink">{post.title || "Untitled"}</p>
                <p className="mt-1 text-xs text-ink-soft">{post.status} · /blog/{post.slug}</p>
              </div>
              <div className="flex items-center gap-3">
                <a href={`/admin/blog/preview/${post.id}`} target="_blank" rel="noreferrer" className="text-xs font-semibold text-accent-dark">Preview</a>
                <button type="button" onClick={() => remove(post.id)} className="text-coral" aria-label="Delete article"><Trash2 size={16} /></button>
              </div>
            </div>
            <button type="button" onClick={() => edit(post)} className="mt-3 text-sm font-semibold text-accent-dark">Edit</button>
          </div>
        ))}
        {posts.length === 0 && <p className="rounded-card border-2 border-border bg-surface p-5 text-sm text-ink-muted">No articles yet.</p>}
      </section>

      {form ? (
        <Editor form={form} update={update} save={save} saving={saving} message={message} close={() => setForm(null)} />
      ) : (
        <button type="button" onClick={() => setForm({ ...empty })} className="flex min-h-48 items-center justify-center rounded-card border-2 border-dashed border-border bg-surface text-sm font-semibold text-accent-dark">
          <Plus size={16} className="mr-2" />Create article
        </button>
      )}
    </div>
  );
}

function Editor({
  form,
  update,
  save,
  saving,
  message,
  close,
}: {
  form: Draft;
  update: <K extends keyof Draft>(key: K, value: Draft[K]) => void;
  save: () => void;
  saving: boolean;
  message: string;
  close: () => void;
}) {
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
      setImageMessage("Image saved to OnlyPDF storage. Its source and creator metadata will be recorded with the article.");
    } catch (error) {
      setImageMessage(error instanceof Error ? error.message : "Could not save image.");
    } finally {
      setSelecting(null);
    }
  }

  return (
    <section className="rounded-card border-2 border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-ink">{form.id ? "Edit article" : "New article"}</h2>
        <button type="button" onClick={close} className="text-sm text-ink-muted">Close</button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Field label="Title"><input value={form.title} onChange={(e) => update("title", e.target.value)} /></Field>
        <Field label="Slug"><input value={form.slug} onChange={(e) => update("slug", e.target.value)} /></Field>
        <Field label="Category"><input value={form.category || ""} onChange={(e) => update("category", e.target.value)} /></Field>
        <Field label="Topic cluster"><input value={form.topic_cluster || ""} onChange={(e) => update("topic_cluster", e.target.value)} /></Field>
        <Field label="Author"><input value={form.author || ""} onChange={(e) => update("author", e.target.value)} /></Field>
        <Field label="Status">
          <select value={form.status} onChange={(e) => update("status", e.target.value as Draft["status"])}>
            <option value="draft">Draft</option><option value="published">Published</option><option value="scheduled">Scheduled</option>
          </select>
        </Field>
        <Field label="Scheduled at">
          <input type="datetime-local" value={form.scheduled_at ? form.scheduled_at.slice(0, 16) : ""} onChange={(e) => update("scheduled_at", e.target.value ? new Date(e.target.value).toISOString() : null)} />
        </Field>
        <Field label="Featured image URL">
          <input value={form.featured_image_url || ""} onChange={(e) => { update("featured_image_url", e.target.value); update("image_source", null); }} />
        </Field>

        <div className="sm:col-span-2 rounded-xl border border-border bg-paper p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-ink">Image search</p>
              <p className="mt-1 text-xs text-ink-muted">Search provider libraries, save the selected image to OnlyPDF storage, and retain source/creator metadata.</p>
            </div>
            <ImageIcon size={18} className="text-accent" aria-hidden="true" />
          </div>
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
          {form.featured_image_url && (
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-border bg-white p-2">
              <img src={form.featured_image_url} alt="" className="h-16 w-28 rounded object-cover" />
              <div className="min-w-0 text-xs text-ink-muted">
                <p className="font-semibold text-ink">Selected image</p>
                {form.image_source?.photographer && <p className="mt-1">Photo by {form.image_source.photographer} on {form.image_source.provider}.</p>}
              </div>
              <button type="button" onClick={() => { update("featured_image_url", ""); update("image_source", null); }} className="ml-auto rounded p-1 text-ink-soft hover:text-coral" aria-label="Remove featured image"><X size={15} /></button>
            </div>
          )}
        </div>

        <Field label="Excerpt" full><textarea rows={3} value={form.excerpt || ""} onChange={(e) => update("excerpt", e.target.value)} /></Field>
        <Field label="SEO title"><input value={form.seo_title || ""} onChange={(e) => update("seo_title", e.target.value)} /></Field>
        <Field label="SEO description"><input value={form.seo_description || ""} onChange={(e) => update("seo_description", e.target.value)} /></Field>
        <Field label="Related article slugs (one per line)" full><textarea rows={3} value={(form.related_slugs || []).join("\n")} onChange={(e) => update("related_slugs", e.target.value.split(/\n+/).map((value) => value.trim()).filter(Boolean))} /></Field>
        <Field label="Content (lightweight Markdown)" full><textarea rows={18} value={form.content} onChange={(e) => update("content", e.target.value)} placeholder="# Heading\n\nWrite the article here..." /></Field>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button type="button" onClick={save} disabled={saving} className="flex items-center gap-2 rounded-pill bg-accent px-5 py-2 text-sm font-semibold text-white disabled:opacity-50">
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />} {saving ? "Saving…" : "Save article"}
        </button>
        {message && <span className="text-sm text-coral">{message}</span>}
      </div>
    </section>
  );
}

function Field({ label, children, full = false }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`text-xs font-semibold text-ink-muted ${full ? "sm:col-span-2" : ""}`}>
      {label}
      <div className="mt-1 [&_input]:w-full [&_input]:rounded-lg [&_input]:border [&_input]:border-border [&_input]:bg-paper [&_input]:px-3 [&_input]:py-2 [&_input]:text-sm [&_input]:text-ink [&_select]:w-full [&_select]:rounded-lg [&_select]:border [&_select]:border-border [&_select]:bg-paper [&_select]:px-3 [&_select]:py-2 [&_select]:text-sm [&_select]:text-ink [&_textarea]:w-full [&_textarea]:rounded-lg [&_textarea]:border [&_textarea]:border-border [&_textarea]:bg-paper [&_textarea]:px-3 [&_textarea]:py-2 [&_textarea]:text-sm [&_textarea]:text-ink">
        {children}
      </div>
    </label>
  );
}
