import { NextRequest, NextResponse } from "next/server";

const INDEXNOW_KEY = "f38d87e351594c1caabf0ef7452a4e74";
const SITE_HOST = "https://idonthaveawill.com";
const ADMIN_SECRET = process.env.ADMIN_SECRET;

/**
 * POST /api/indexnow — submit URLs to IndexNow (Bing, Yandex).
 * Body: { urls: string[] } or { all: true } to submit all sitemap URLs.
 * Requires ADMIN_SECRET header for auth.
 */
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  if (!ADMIN_SECRET || secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  let urls: string[] = body.urls || [];

  if (body.all) {
    urls = await fetchAllSitemapUrls();
  }

  if (!urls.length) {
    return NextResponse.json({ error: "No URLs provided" }, { status: 400 });
  }

  const ENDPOINTS = [
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
  ];

  const batches = [];
  for (let i = 0; i < urls.length; i += 500) {
    batches.push(urls.slice(i, i + 500));
  }

  const results = [];
  for (const endpoint of ENDPOINTS) {
    for (const batch of batches) {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          host: "idonthaveawill.com",
          key: INDEXNOW_KEY,
          keyLocation: `${SITE_HOST}/${INDEXNOW_KEY}.txt`,
          urlList: batch,
        }),
      });
      results.push({ endpoint, status: res.status, count: batch.length });
    }
  }

  return NextResponse.json({
    submitted: urls.length,
    batches: results,
  });
}

async function fetchAllSitemapUrls(): Promise<string[]> {
  try {
    const res = await fetch(`${SITE_HOST}/sitemap.xml`);
    const xml = await res.text();
    const matches = xml.matchAll(/<loc>([^<]+)<\/loc>/g);
    const urls: string[] = [];
    for (const m of matches) urls.push(m[1]);
    return urls;
  } catch {
    return [];
  }
}
