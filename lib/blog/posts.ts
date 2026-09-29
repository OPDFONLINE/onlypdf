import "server-only";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { createSupabaseServerClient } from "@/lib/supabase/server";
export type BlogPost={id:string;title:string;slug:string;status:"draft"|"published"|"scheduled";excerpt:string|null;content:string;seo_title:string|null;seo_description:string|null;featured_image_url:string|null;featured_image_title:string|null;image_provider:string|null;image_source_url:string|null;image_photographer:string|null;image_photographer_url:string|null;category:string|null;topic_cluster:string|null;related_slugs:string[];author:string|null;published_at:string|null;scheduled_at:string|null;created_at:string;updated_at:string};
const fields="id,title,slug,status,excerpt,content,seo_title,seo_description,featured_image_url,featured_image_title,image_provider,image_source_url,image_photographer,image_photographer_url,category,topic_cluster,related_slugs,author,published_at,scheduled_at,created_at,updated_at";
export async function getPublishedPosts(){const db=createSupabasePublicClient();if(!db)return [];const{data}=await db.from("blog_posts").select(fields).eq("status","published").not("published_at","is",null).lte("published_at",new Date().toISOString()).order("published_at",{ascending:false});return(data??[]) as BlogPost[];}
export async function getPublishedPost(slug:string){const db=createSupabasePublicClient();if(!db)return null;const{data}=await db.from("blog_posts").select(fields).eq("slug",slug).eq("status","published").not("published_at","is",null).lte("published_at",new Date().toISOString()).maybeSingle();return(data as BlogPost|null)??null;}
export async function getAdminPosts(){const db=await createSupabaseServerClient();if(!db)return [];const{data}=await db.from("blog_posts").select(fields).order("updated_at",{ascending:false});return(data??[]) as BlogPost[];}
export async function getAdminPost(id:string){const db=await createSupabaseServerClient();if(!db)return null;const{data}=await db.from("blog_posts").select(fields).eq("id",id).maybeSingle();return(data as BlogPost|null)??null;}

// ---------------------------------------------------------------------------
// Lightweight list queries (no article body) used by the blog index, the
// single-article sidebar and the admin post list.
// ---------------------------------------------------------------------------
const summaryFields="id,title,slug,status,excerpt,seo_title,featured_image_url,featured_image_title,category,topic_cluster,related_slugs,author,published_at,scheduled_at,created_at,updated_at";
export type PostSummary=Omit<BlogPost,"content"|"seo_description"|"image_provider"|"image_source_url"|"image_photographer"|"image_photographer_url">;

/** All published posts, newest first, without the article body. */
export async function getPublishedSummaries(){const db=createSupabasePublicClient();if(!db)return [] as PostSummary[];const{data}=await db.from("blog_posts").select(summaryFields).eq("status","published").not("published_at","is",null).lte("published_at",new Date().toISOString()).order("published_at",{ascending:false});return(data??[]) as unknown as PostSummary[];}

/**
 * 3-5 similar articles for the single-article sidebar. Ranking: explicitly
 * related slugs first, then the same topic cluster, then the same category.
 * Anything left over is filled with the most recent articles, so the sidebar
 * is never empty as long as other published articles exist.
 */
export async function getRelatedPosts(post:Pick<BlogPost,"id"|"slug"|"category"|"topic_cluster"|"related_slugs">,limit=5){
  const all=(await getPublishedSummaries()).filter((p)=>p.id!==post.id);
  const related=new Set(post.related_slugs||[]);
  const scored=all.map((p,index)=>({p,index,score:(related.has(p.slug)?100:0)+(post.topic_cluster&&p.topic_cluster===post.topic_cluster?50:0)+(post.category&&p.category===post.category?20:0)}));
  // Array order is already newest-first, so ties fall back to recency.
  scored.sort((a,b)=>b.score-a.score||a.index-b.index);
  return scored.slice(0,Math.min(Math.max(limit,3),5)).map((s)=>s.p);
}

export type AdminListParams={status?:string;q?:string;category?:string;page?:number;pageSize?:number};
export type AdminListResult={posts:PostSummary[];total:number;page:number;pageSize:number;totalPages:number;counts:{all:number;published:number;draft:number;scheduled:number};categories:string[]};

/** Server-side filtered + paginated post list for the admin blog manager. */
export async function getAdminPostsPage(params:AdminListParams):Promise<AdminListResult>{
  const pageSize=Math.min(Math.max(params.pageSize??10,1),50);
  const empty:AdminListResult={posts:[],total:0,page:1,pageSize,totalPages:1,counts:{all:0,published:0,draft:0,scheduled:0},categories:[]};
  const db=await createSupabaseServerClient();if(!db)return empty;

  // Counts + category list come from one light query over all posts.
  const{data:meta}=await db.from("blog_posts").select("status,category");
  const counts={all:0,published:0,draft:0,scheduled:0};const cats=new Set<string>();
  for(const row of(meta??[]) as{status:string;category:string|null}[]){counts.all+=1;if(row.status==="published")counts.published+=1;else if(row.status==="scheduled")counts.scheduled+=1;else counts.draft+=1;if(row.category)cats.add(row.category);}

  const q=(params.q||"").replace(/[%,()*\\]/g," ").trim();
  // Postgrest builders are mutable, so build a fresh one per request.
  const build=()=>{
    let query=db.from("blog_posts").select(summaryFields,{count:"exact"});
    if(params.status==="published"||params.status==="draft"||params.status==="scheduled")query=query.eq("status",params.status);
    if(params.category)query=query.eq("category",params.category);
    if(q)query=query.or(`title.ilike.%${q}%,slug.ilike.%${q}%`);
    return query.order("updated_at",{ascending:false});
  };

  const requested=Math.max(Math.floor(params.page||1),1);
  // First query only to learn the total; then clamp the page and fetch the range.
  const{count}=await build().range(0,0);
  const total=count??0;const totalPages=Math.max(Math.ceil(total/pageSize),1);const page=Math.min(requested,totalPages);
  const from=(page-1)*pageSize;
  const{data}=await build().range(from,from+pageSize-1);
  return{posts:(data??[]) as unknown as PostSummary[],total,page,pageSize,totalPages,counts,categories:[...cats].sort()};
}
