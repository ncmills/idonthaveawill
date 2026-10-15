import type { MetadataRoute } from "next";
import { getAllStates } from "@/lib/stateData";
import { stateToSlug } from "@/lib/stateSlugs";
import { BLOG_POSTS } from "@/lib/blog-posts";

// Re-render hourly at request time so lastmod stays fresh. Hardcoded
// "2026-04-08" previously froze the entire sitemap for 19 days, suppressing
// Google's recrawl signal and stalling indexing at 11 / 108 (10%).
export const revalidate = 3600;

// SITES-GROWTH unit 5 (2026-10-15). Measured: GSC 90d showed 2,532
// impressions total, only 38/166 sitemap URLs with any impression, and the
// /estate-planning family (1 index + 51 state pages = 52 URLs) at ~zero.
// Checked why: /estate-planning/[slug] renders near-identical boilerplate
// copy for every state (same section headings, same paragraphs) and only
// swaps in 5 shared toggle fields — minimum_age.standard,
// witness_requirements.count, notarization.required,
// holographic_wills.recognized, and the computed community-property flag.
// It never reads the state's own narrative/citation fields
// (testamentary_capacity, special_provisions, revocation.methods,
// statute_citations, self_proving_affidavit.requirements) even though
// /will-requirements/[slug] — the page it links out to for "full
// requirements" — already renders all of those per state. So every
// estate-planning page is a thinner, near-duplicate twin of an
// already-sitemapped page with no state-specific substance of its own: the
// "equally templated, no state-specific data" case. Routes stay live and
// internally linked (no noindex) — just not submitted in the sitemap until
// the page gains real per-state legal content.
const INCLUDE_ESTATE_PLANNING_IN_SITEMAP = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://idonthaveawill.com";
  const now = new Date();

  const statePages = getAllStates().map((s) => ({
    url: `${baseUrl}/will-requirements/${stateToSlug(s.state)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const estatePlanningPages = INCLUDE_ESTATE_PLANNING_IN_SITEMAP
    ? getAllStates().map((s) => ({
        url: `${baseUrl}/estate-planning/${stateToSlug(s.state)}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    : [];

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
    // The same state research keyed by rule instead of by state. No child
    // routes: every rule is a section on the one page.
    {
      url: `${baseUrl}/will-rules`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
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
    ...(INCLUDE_ESTATE_PLANNING_IN_SITEMAP
      ? [
          {
            url: `${baseUrl}/estate-planning`,
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.8,
          },
        ]
      : []),
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
