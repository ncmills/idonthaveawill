"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { useEffect, Suspense } from "react";
import { sanitizeEvent, sanitizeUrl } from "@/lib/pageview-url";
import { usePathname, useSearchParams } from "next/navigation";

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ph = usePostHog();

  useEffect(() => {
    if (pathname && ph) {
      let url = window.origin + pathname;
      const search = searchParams.toString();
      if (search) url += "?" + search;
      ph.capture("$pageview", { $current_url: sanitizeUrl(url) });
    }
  }, [pathname, searchParams, ph]);

  return null;
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim();

  useEffect(() => {
    if (key && typeof window !== "undefined") {
      posthog.init(key, {
        api_host: (process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com").trim(),
        capture_pageview: false,
        capture_pageleave: true,
        // First-party persistence (COOKIES-OPTION-2, NICK-ANSWERS-1121-1915): a PostHog cookie plus
        // localStorage keep one anonymous id, so returning visitors and multi-visit journeys
        // are measured. Still no autocapture, no session recording, no person profile unless
        // identified, and every URL/property redaction in before_send still applies.
        persistence: "localStorage+cookie",
        secure_cookie: true,
        autocapture: false,
        disable_session_recording: true,
        person_profiles: "identified_only",
        // The library stamps raw location.href / referrer on every event; send only
        // a route template (never the raw path) plus the acquisition allowlist (utm_*, ref, gclid, fbclid).
        before_send: (event) => {
          sanitizeEvent(event);
          return event;
        },
      });
    }
  }, [key]);

  if (!key) return <>{children}</>;

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}
