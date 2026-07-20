import type { MetadataRoute } from "next";
import { getAllStates } from "@/lib/stateData";
import { stateToSlug } from "@/lib/stateSlugs";
import { BLOG_POSTS } from "@/lib/blog-posts";

// Re-render hourly at request time so lastmod stays fresh. Hardcoded
// "2026-04-08" previously froze the entire sitemap for 19 days, suppressing
// Google's recrawl signal and stalling indexing at 11 / 108 (10%).
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://idonthaveawill.com";
  const now = new Date();

  const statePages = getAllStates().map((s) => ({
    url: `${baseUrl}/will-requirements/${stateToSlug(s.state)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const estatePlanningPages = getAllStates().map((s) => ({
    url: `${baseUrl}/estate-planning/${stateToSlug(s.state)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages = BLOG_POSTS.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: p.category === "State Law" ? 0.7 : 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/create`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/will-requirements`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...statePages,
    {
      url: `${baseUrl}/data`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/data/2026-state-will-laws-report`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/estate-planning`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...estatePlanningPages,
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPages,
    // NOTE: /terms and /privacy are intentionally OMITTED from the sitemap.
    // Both pages set `robots: { index: false }` (see src/app/terms/page.tsx and
    // src/app/privacy/page.tsx). Listing a noindexed URL in the sitemap is a
    // self-contradiction that Google reports as "Excluded by 'noindex' tag …
    // in a sitemap." If you ever flip either page back to indexable, re-add its
    // entry here so the two stay in sync.
  ];
}
