import type { Metadata } from "next";

/**
 * Shared Open Graph builder.
 *
 * Why this exists: in the Next.js App Router a page-level `openGraph` object
 * REPLACES the root layout's `openGraph` — it does not merge with it. Every
 * page that declared its own `openGraph` block was therefore silently dropping
 * `og:site_name`, `og:url` and `og:type`, and (see below) `og:image` too.
 *
 * The `images` rule is asymmetric. Next only merges the file-convention image
 * into a declared `openGraph` block when the file is colocated in THAT route's
 * own segment, and only when the block does not already own an `images` key
 * (`resolve-metadata.js`: `if (openGraph && !source.openGraph.hasOwnProperty('images'))`).
 *
 *   - segment HAS a colocated `opengraph-image.*`  -> pass `hasRouteImage: true`
 *     so we emit NO `images` key at all and the per-route dynamic image merges in.
 *     Emitting `images: undefined` would NOT work: `hasOwnProperty` would be true.
 *   - segment has NO colocated file -> we must name the image explicitly, or the
 *     route ships with no card whatsoever.
 *
 * In this repo the only colocated file is the root `src/app/opengraph-image.tsx`,
 * so every nested route needs the explicit image.
 */

export const SITE_URL = "https://idonthaveawill.com";
export const SITE_NAME = "idonthaveawill.com";

/** The root `src/app/opengraph-image.tsx` route (1200x630). */
export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "idonthaveawill.com — free will maker for all 50 states",
};

type OpenGraphOptions = {
  title: string;
  description: string;
  /** Route path, e.g. "/blog". Ignored when `url` is given. */
  path?: string;
  /** Absolute canonical URL for this route. */
  url?: string;
  type?: "website" | "article";
  /**
   * True only when this route's own segment contains an `opengraph-image.*`
   * file. Suppresses the `images` key so the colocated file wins.
   */
  hasRouteImage?: boolean;
  publishedTime?: string;
  authors?: string[];
};

export function buildOpenGraph(opts: OpenGraphOptions): Metadata["openGraph"] {
  const url = opts.url ?? `${SITE_URL}${opts.path ?? ""}`;

  const base = {
    title: opts.title,
    description: opts.description,
    url,
    siteName: SITE_NAME,
    locale: "en_US",
    ...(opts.hasRouteImage ? {} : { images: [DEFAULT_OG_IMAGE] }),
  };

  if (opts.type === "article") {
    return {
      ...base,
      type: "article" as const,
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
      ...(opts.authors ? { authors: opts.authors } : {}),
    };
  }

  return { ...base, type: "website" as const };
}
