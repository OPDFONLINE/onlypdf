import { notFound } from "next/navigation";
import { getAdminPost } from "@/lib/blog/posts";
import { renderBlogContent } from "@/lib/blog/render";
export default async function BlogPreview({params}:{params:{id:string}}){const post=await getAdminPost(params.id);if(!post)return notFound();return <article className="container-page max-w-3xl py-14 md:py-20"><p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Preview · {post.status}</p><h1 className="mt-3 text-3xl sm:text-5xl">{post.title}</h1>{post.excerpt&&<p className="mt-5 text-lg leading-8 text-ink-muted">{post.excerpt}</p>}<div className="mt-10 space-y-5">{renderBlogContent(post.content)}</div></article>}
