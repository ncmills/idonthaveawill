/**
 * Funnel tracking — fires PostHog events and saves anonymized funnel data to Supabase.
 * All calls are fire-and-forget and never block UX.
 */

import posthog from "posthog-js";

function track(event: string, props?: Record<string, unknown>) {
  if (typeof window !== "undefined" && posthog.__loaded) {
    posthog.capture(event, props);
  }

  // Also log to Supabase funnel table
  fetch("/api/funnel", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, ...props }),
  }).catch((err) => {
    if (typeof console !== "undefined") console.warn("[tracking] funnel post failed", err);
  });
}

// ── Questionnaire funnel ──

export function trackStepViewed(stepId: string, stepIndex: number) {
  track("step_viewed", { step_id: stepId, step_index: stepIndex });
}

export function trackStepCompleted(stepId: string, stepIndex: number, data?: Record<string, unknown>) {
  track("step_completed", { step_id: stepId, step_index: stepIndex, ...data });
}

// ── Will generation & download ──

export function trackWillGenerated(state: string) {
  track("will_generated", { state });
}

export function trackDownload(format: "word" | "pdf") {
  track("download", { format });
}

// ── Email capture ──

export function trackEmailCaptured(source: "homepage" | "review") {
  track("email_captured", { source });
}
