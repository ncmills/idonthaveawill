import type { MetadataRoute } from "next";
import { getAllStates } from "@/lib/stateData";
import { stateToSlug } from "@/lib/stateSlugs";

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
