import type { MetadataRoute } from "next";
import { getAllStates } from "@/lib/stateData";
import { stateToSlug } from "@/lib/stateSlugs";
import { BLOG_POSTS } from "@/lib/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://idonthaveawill.com";

  const statePages = getAllStates().map((s) => ({
    url: `${baseUrl}/will-requirements/${stateToSlug(s.state)}`,
    lastModified: "2026-04-08",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const estatePlanningPages = getAllStates().map((s) => ({
    url: `${baseUrl}/estate-planning/${stateToSlug(s.state)}`,
    lastModified: "2026-04-08",
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages = BLOG_POSTS.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "monthly" as const,
    priority: p.category === "State Law" ? 0.7 : 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: "2026-04-08",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/create`,
      lastModified: "2026-04-08",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/will-requirements`,
      lastModified: "2026-04-08",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...statePages,
    {
      url: `${baseUrl}/estate-planning`,
      lastModified: "2026-04-08",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...estatePlanningPages,
    {
      url: `${baseUrl}/blog`,
      lastModified: "2026-04-10",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPages,
    {
      url: `${baseUrl}/terms`,
      lastModified: "2026-04-08",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: "2026-04-08",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
