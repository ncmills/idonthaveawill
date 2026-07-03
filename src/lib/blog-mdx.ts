// MDX blog layer — reads posts from /content/blog/*.mdx at build time and maps
// each to the same BlogPost shape the hand-written posts use. This is what makes
// the autonomous engine's output (and the orphaned ca-wills.mdx) render at
// /blog/[slug] with the schema the template already emits.
//
// Mirrors the loader pattern used by the sibling sites (handicap-hq/src/lib/blog.ts,
// plan-my-party) — gray-matter frontmatter, newest-first, drafts excluded in prod.
import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogPost, BlogCategory } from "./blog-posts";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

const VALID_CATEGORIES: BlogCategory[] = [
  "Basics",
  "Process",
  "Mistakes",
  "State Law",
  "Estate Planning",
];

/** Raw frontmatter shape written by the autonomous engine / ca-wills.mdx. */
interface MdxFrontmatter {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  category?: string;
  author?: string;
  readingMinutes?: number;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  citations?: { label: string; url: string }[];
  faqs?: { q: string; a: string }[];
  related?: string[];
  /** Slug of a complementary /will-requirements/<state> page to cross-link. */
  relatedState?: string;
  draft?: boolean;
}

function estimateReadTime(body: string): string {
  const words = body.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}

function titleCaseSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function coerceCategory(raw: string | undefined): BlogCategory {
  if (raw && (VALID_CATEGORIES as string[]).includes(raw)) {
    return raw as BlogCategory;
  }
  return "State Law";
}

function readMdxPost(fileName: string): BlogPost {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  const fm = data as MdxFrontmatter;

  return {
    slug,
    title: fm.title,
    description: fm.description,
    date: fm.datePublished, // datePublished → the field the template renders
    author: fm.author ?? "I Don't Have a Will",
    readTime: fm.readingMinutes
      ? `${fm.readingMinutes} min read`
      : estimateReadTime(content),
    category: coerceCategory(fm.category),
    content: "", // unused for MDX; body renders from rawMdx via compileMDX
    faqs: fm.faqs,
    isMdx: true,
    rawMdx: content,
    relatedState: fm.relatedState,
    relatedStateLabel: fm.relatedState
      ? titleCaseSlug(fm.relatedState)
      : undefined,
  };
}

let _cache: BlogPost[] | null = null;

/** All MDX-authored posts, newest first. Drafts excluded in production. */
export function getMdxPosts(): BlogPost[] {
  if (_cache) return _cache;
  if (!fs.existsSync(BLOG_DIR)) {
    _cache = [];
    return _cache;
  }
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f));
  const posts = files
    .map(readMdxPost)
    .filter(
      (p) =>
        process.env.NODE_ENV === "development" ||
        !((p as unknown as { draft?: boolean }).draft)
    )
    .sort((a, b) => b.date.localeCompare(a.date));
  _cache = posts;
  return posts;
}
