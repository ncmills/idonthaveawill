import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface RateLimitEntry {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up stale entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  const cutoff = now - 60_000;
  for (const [key, entry] of rateLimitMap) {
    entry.timestamps = entry.timestamps.filter((t) => t > cutoff);
    if (entry.timestamps.length === 0) {
      rateLimitMap.delete(key);
    }
  }
}

function isRateLimited(ip: string, path: string): boolean {
  cleanup();

  const now = Date.now();
  const windowMs = 60_000; // 1 minute
  const cutoff = now - windowMs;

  // Determine limit based on path
  let limit: number;
  if (path.startsWith("/api/subscribe")) {
    limit = 10;
  } else if (path.startsWith("/api/funnel") || path.startsWith("/api/stats")) {
    limit = 30;
  } else {
    return false;
  }

  const key = `${ip}:${path.split("/").slice(0, 3).join("/")}`;
  const entry = rateLimitMap.get(key) || { timestamps: [] };

  // Remove timestamps outside the window
  entry.timestamps = entry.timestamps.filter((t) => t > cutoff);

  if (entry.timestamps.length >= limit) {
    rateLimitMap.set(key, entry);
    return true;
  }

  entry.timestamps.push(now);
  rateLimitMap.set(key, entry);
  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only rate-limit API routes
  if (!pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Prefer Vercel's trusted header (spoof-resistant) over generic x-forwarded-for.
  const ip =
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip, pathname)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
