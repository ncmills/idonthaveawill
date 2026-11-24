// SHARED ALLOWLIST-KEEP-DETAIL generator: builds src/generated/published-paths.json, the build-time list of
// PUBLISHED public content slugs per route template. pageview-url.ts sends the concrete path only when the
// slug is in this list; anything else stays the template. Runs as part of prebuild; the committed copy only
// needs to exist for tsc/tests (a stale copy reports a new page as its template, never leaks).
// Per-site part: the SOURCES block below, built from the same data the pages use in generateStaticParams.
// idhw: ONLY public content routes (blog, estate-planning, will-requirements). Nothing from a will is ever listed.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import allStates from "../data/states/all_states.json";

const ROOT = path.resolve(__dirname, "..");

/** Mirrors stateToSlug in src/lib/stateSlugs.ts (estate-planning and will-requirements generateStaticParams). */
const stateSlugs: string[] = (allStates as Array<{ state: string }>).map((s) => s.state.toLowerCase().replace(/\s+/g, "-"));

/**
 * Mirrors BLOG_POSTS in src/lib/blog-posts.ts (generateStaticParams of /blog/[slug]): hand-written posts
 * (slug literals), one generated how-to-write-a-will-in-<state> post per state, and non-draft content/blog/*.mdx.
 * Not imported from blog-posts.ts (it pulls in server-only), so mirrored with fs + gray-matter.
 */
function blogSlugs(): string[] {
  const src = fs.readFileSync(path.join(ROOT, "src", "lib", "blog-posts.ts"), "utf8");
  const handWritten = [...src.matchAll(/^ {4}slug: "([a-z0-9-]+)",$/gm)].map((m) => m[1]);
  const statePosts = stateSlugs.map((s) => `how-to-write-a-will-in-${s}`);
  const dir = path.join(ROOT, "content", "blog");
  const mdx = !fs.existsSync(dir)
    ? []
    : fs
        .readdirSync(dir)
        .filter((f) => /\.mdx?$/.test(f))
        .filter((f) => !(matter(fs.readFileSync(path.join(dir, f), "utf8")).data as { draft?: boolean }).draft)
        .map((f) => f.replace(/\.mdx?$/, ""));
  return [...handWritten, ...statePosts, ...mdx];
}

// Per-site: template -> slugs, each from the page's own generateStaticParams source.
const SOURCES: Record<string, string[]> = {
  "/blog/:slug": blogSlugs(),
  "/estate-planning/:slug": stateSlugs,
  "/will-requirements/:slug": stateSlugs,
};

// SHARED: slugs only, lowercase, [a-z0-9-]{1,120} per param (multi-param values joined by "/"), sorted, deduped.
const SLUG = /^[a-z0-9-]{1,120}(\/[a-z0-9-]{1,120})*$/;
const out: Record<string, string[]> = {};
for (const [tpl, raw] of Object.entries(SOURCES).sort(([a], [b]) => a.localeCompare(b))) {
  out[tpl] = [...new Set(raw.map((s) => String(s).toLowerCase()))].filter((s) => SLUG.test(s)).sort();
}
const file = path.join(ROOT, "src", "generated", "published-paths.json");
fs.mkdirSync(path.dirname(file), { recursive: true });
fs.writeFileSync(file, "{\n" + Object.entries(out).map(([k, v]) => `${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(",\n") + "\n}\n");
console.log(`gen-published-paths: ${Object.entries(out).map(([k, v]) => `${k}=${v.length}`).join(" ")}`);
