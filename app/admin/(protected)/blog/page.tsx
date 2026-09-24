import type { Metadata } from "next";
import { getAdminPosts } from "@/lib/blog/posts";
import { BlogManager } from "@/components/admin/BlogManager";
export const metadata:Metadata={title:"Blog"};
export default async function AdminBlogPage(){const posts=await getAdminPosts();return <div><h1 className="text-2xl font-bold text-ink">Blog CMS</h1><p className="mt-1 max-w-2xl text-sm text-ink-muted">Create, edit, draft, publish, schedule, and manage SEO metadata for articles. Content uses lightweight Markdown.</p><BlogManager initialPosts={posts}/></div>}
