import type { Metadata } from "next";
import { getAdminPost, getAdminPostsPage } from "@/lib/blog/posts";
import { BlogManager } from "@/components/admin/BlogManager";

export const metadata: Metadata = { title: "Blog" };
export const dynamic = "force-dynamic";

type SearchParams = { status?: string; q?: string; category?: string; page?: string; edit?: string; new?: string };

export default async function AdminBlogPage({ searchParams }: { searchParams: SearchParams }) {
  const editing = searchParams.edit ? await getAdminPost(searchParams.edit) : null;
  const creating = searchParams.new === "1";
  const list = await getAdminPostsPage({
    status: searchParams.status,
    q: searchParams.q,
    category: searchParams.category,
    page: parseInt(searchParams.page || "1", 10) || 1,
    pageSize: 10,
  });

  return (
    <BlogManager
      list={list}
      filters={{
        status: ["published", "draft", "scheduled"].includes(searchParams.status || "") ? (searchParams.status as string) : "all",
        q: searchParams.q || "",
        category: searchParams.category || "",
      }}
      editing={editing}
      creating={creating}
    />
  );
}
