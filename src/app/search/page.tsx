import { BrandMarketingShell } from "@/components/marketing/brand-marketing-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { fetchSiteFeed } from "@/lib/site-connector";
import { buildPostUrl, getPostTaskKey } from "@/lib/task-data";
import { getMockPostsForTask } from "@/lib/mock-posts";
import { SITE_CONFIG } from "@/lib/site-config";
import { CATEGORY_OPTIONS } from "@/lib/categories";
import { TaskPostCard } from "@/components/shared/task-post-card";

export const revalidate = 3;

const matchText = (value: string, query: string) => value.toLowerCase().includes(query);

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ");

const compactText = (value: unknown) => {
  if (typeof value !== "string") return "";
  return stripHtml(value).replace(/\s+/g, " ").trim().toLowerCase();
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string; loc?: string }>;
}) {
  const resolved = (await searchParams) || {};
  const query = (resolved.q || "").trim();
  const normalized = query.toLowerCase();
  const category = (resolved.category || "").trim().toLowerCase();
  const task = (resolved.task || "").trim().toLowerCase();
  const locQuery = (resolved.loc || "").trim().toLowerCase();
  const useMaster = resolved.master !== "0";
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster
      ? { fresh: true, category: category || undefined, task: task || undefined }
      : undefined
  );
  const posts = feed?.posts?.length
    ? feed.posts
    : useMaster
      ? []
      : SITE_CONFIG.tasks.flatMap((t) => getMockPostsForTask(t.key));

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === "object" ? post.content : {};
    const typeText = compactText((content as any).type);
    if (typeText === "comment") return false;
    const description = compactText((content as any).description);
    const body = compactText((content as any).body);
    const excerpt = compactText((content as any).excerpt);
    const categoryText = compactText((content as any).category);
    const tags = Array.isArray(post.tags) ? post.tags.join(" ") : "";
    const tagsText = compactText(tags);
    const derivedCategory = categoryText || tagsText;
    if (category && !derivedCategory.includes(category)) return false;
    if (locQuery.length) {
      const locationText = compactText((content as any).location);
      const addressText = compactText((content as any).address);
      const cityText = compactText((content as any).city);
      const combined = [locationText, addressText, cityText].filter(Boolean).join(" ");
      if (!combined.includes(locQuery)) return false;
    }
    if (task && typeText && typeText !== task) return false;
    if (!normalized.length) return true;
    return (
      matchText(compactText(post.title || ""), normalized) ||
      matchText(compactText(post.summary || ""), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    );
  });

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24);

  const searchForm = (
    <form
      action="/search"
      className="flex w-full flex-col gap-3 rounded-2xl border border-[#e8ddd4] bg-white/90 p-4 shadow-[0_14px_40px_rgba(183,110,121,0.06)] sm:flex-row sm:flex-wrap sm:items-end"
    >
      <input type="hidden" name="master" value="1" />
      {task ? <input type="hidden" name="task" value={task} /> : null}
      <div className="relative w-full sm:min-w-[200px] sm:flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b76e79]" />
        <Input
          name="q"
          defaultValue={query}
          placeholder="Keywords, style, or studio name…"
          className="h-11 border-[#e0cfc9] bg-[#fffdfb] pl-9 text-[#1a1614] placeholder:text-[#a89890]"
        />
      </div>
      <div className="w-full sm:w-40">
        <Input
          name="loc"
          defaultValue={(resolved.loc || "").trim()}
          placeholder="City or area"
          className="h-11 border-[#e0cfc9] bg-[#fffdfb] text-[#1a1614] placeholder:text-[#a89890]"
        />
      </div>
      <div className="w-full sm:w-44">
        <select
          name="category"
          defaultValue={category || ""}
          aria-label="Category"
          className="flex h-11 w-full rounded-md border border-[#e0cfc9] bg-[#fffdfb] px-3 text-sm text-[#1a1614] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b76e79]/25"
        >
          <option value="">All categories</option>
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt.slug} value={opt.slug}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
      <Button type="submit" className="h-11 w-full bg-[#b76e79] text-white hover:bg-[#9e5e6a] sm:w-auto">
        Search
      </Button>
    </form>
  );

  return (
    <BrandMarketingShell
      eyebrow="Directory search"
      title={query ? `Results for “${query}”` : "Find your next lash experience"}
      subtitle={
        query
          ? "Refine by area and category to surface the best match for your appointment."
          : "Search across listings and services—combine keywords with city filters to narrow the field."
      }
      headerAside={searchForm}
    >
      {results.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((post) => {
            const postTask = getPostTaskKey(post);
            const href = postTask ? buildPostUrl(postTask, post.slug) : `/posts/${post.slug}`;
            return <TaskPostCard key={post.id} post={post} href={href} />;
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#e0cfc9] bg-[#fffdfb] px-8 py-16 text-center">
          <p className="text-base font-medium text-[#1a1614]">No matches yet</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#6b534c]">
            Try a broader keyword, remove a filter, or browse the full directory to explore featured
            studios.
          </p>
        </div>
      )}
    </BrandMarketingShell>
  );
}
