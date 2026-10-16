#!/usr/bin/env node
// Fails (exit 1) when an internal link in src/ or content/ points at a route this app does not
// serve. Offline and deterministic so it can gate CI (build-gate.yml).
//
// Outbound links are deliberately NOT checked here: gov and bar sites 403 bots and blip, so a
// network check in CI would go red for reasons unrelated to the diff. The blog lane checks a
// post's outbound links before it opens a PR; the 2026-10-16 sweep fixed 28 dead state-bar
// referral URLs in src/lib/referralConfig.ts by hand.
//
// Usage: node scripts/check-internal-links.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const rel = (p) => path.relative(ROOT, p);

function walk(dir, exts, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== "node_modules" && !e.name.startsWith(".")) walk(p, exts, out);
    } else if (exts.some((x) => e.name.endsWith(x))) out.push(p);
  }
  return out;
}

// --- the routes the app serves -------------------------------------------------------------
const stateSlugs = JSON.parse(fs.readFileSync(path.join(ROOT, "data/states/all_states.json"), "utf8"))
  .map((s) => s.state.toLowerCase().replace(/\s+/g, "-"));
const blogSlugs = new Set([
  ...fs.readdirSync(path.join(ROOT, "content/blog")).filter((f) => f.endsWith(".mdx")).map((f) => f.slice(0, -4)),
  ...[...fs.readFileSync(path.join(ROOT, "src/lib/blog-posts.ts"), "utf8").matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map((m) => m[1]),
  ...stateSlugs.map((s) => `how-to-write-a-will-in-${s}`), // blog-posts.ts statePostSlug()
]);
// Values each dynamic segment may take, keyed by the route it belongs to.
const DYNAMIC = {
  "/blog/[slug]": blogSlugs,
  "/will-requirements/[slug]": new Set(stateSlugs),
  "/estate-planning/[slug]": new Set(stateSlugs),
};

const APP = path.join(ROOT, "src/app");
const routes = walk(APP, ["page.tsx", "page.ts", "page.mdx", "route.ts"]).map((f) => {
  const segs = path.relative(APP, path.dirname(f)).split(path.sep).filter((s) => s && !/^\(.*\)$/.test(s));
  return "/" + segs.join("/");
});
// Files Next serves at the root from src/app metadata conventions and public/.
const files = new Set([
  ...walk(path.join(ROOT, "public"), [""]).map((f) => "/" + path.relative(path.join(ROOT, "public"), f)),
  "/sitemap.xml", "/robots.txt", "/manifest.webmanifest", "/opengraph-image", "/icon", "/favicon.ico",
]);

for (const r of Object.keys(DYNAMIC)) {
  if (!routes.includes(r)) throw new Error(`check-internal-links: ${r} is no longer a route; update DYNAMIC`);
}
const unknownDynamic = routes.filter((r) => r.includes("[") && !DYNAMIC[r]);
if (unknownDynamic.length) {
  throw new Error(`check-internal-links: new dynamic route(s) with no slug source: ${unknownDynamic.join(", ")}`);
}

function served(p) {
  const clean = p.replace(/[?#].*$/, "").replace(/\/+$/, "") || "/";
  if (files.has(clean)) return true;
  const segs = clean.split("/").filter(Boolean);
  return routes.some((r) => {
    const rs = r.split("/").filter(Boolean);
    if (rs.length !== segs.length) return false;
    return rs.every((s, i) => (s.startsWith("[") ? DYNAMIC[r].has(segs[i]) : s === segs[i]));
  });
}

// --- the links ------------------------------------------------------------------------------
// Literal internal paths only: href="/x", href={"/x"}, href: "/x", Link/redirect/push("/x"),
// and markdown ](/x). Template literals with ${...} are built from the slug sources above.
const PATTERNS = [
  /href=\{?["'`](\/[^"'`\s${}]*)["'`]/g,
  /href:\s*["'`](\/[^"'`\s${}]*)["'`]/g,
  /\b(?:push|replace|redirect|permanentRedirect)\(\s*["'`](\/[^"'`\s${}]*)["'`]/g,
  /\]\((\/[^)\s]*)\)/g,
];
const SITE = /https?:\/\/(?:www\.)?idonthaveawill\.com(\/[^"'`)\s]*)/g;

const bad = [];
for (const f of [...walk(path.join(ROOT, "src"), [".ts", ".tsx", ".mdx"]), ...walk(path.join(ROOT, "content"), [".mdx", ".md"])]) {
  const lines = fs.readFileSync(f, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const re of [...PATTERNS, SITE]) {
      for (const m of line.matchAll(re)) {
        const target = m[1];
        if (target.startsWith("//") || target.startsWith("/api/") || target.includes("${")) continue;
        if (!served(target)) bad.push(`${rel(f)}:${i + 1}  ${target}`);
      }
    }
  });
}

if (bad.length) {
  console.error(`check-internal-links: ${bad.length} internal link(s) to a route that does not exist:`);
  for (const b of bad) console.error("  " + b);
  process.exit(1);
}
console.log(`check-internal-links: ok (${routes.length} routes, ${blogSlugs.size} blog slugs, ${stateSlugs.length} states)`);
