/**
 * Funnel tracking — fires PostHog events and saves anonymized funnel data to Supabase.
 * All calls are fire-and-forget and never block UX.
 */

import posthog from "posthog-js";
import type { FormErrorForm, FormErrorKind } from "./tracking-events";

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

// ── PostHog-only gap events (fixed props only; no free text, no form values) ──

function trackPostHogOnly(event: string, props?: Record<string, unknown>) {
  if (typeof window !== "undefined" && posthog.__loaded) {
    posthog.capture(event, props);
  }
}

export function trackFormError(form: FormErrorForm, kind: FormErrorKind) {
  trackPostHogOnly("form_error", { form, kind });
}

/** fetch() rejects with TypeError on network failure; anything else thrown is an API/response error. */
export function classifyFormError(err: unknown): FormErrorKind {
  return err instanceof TypeError ? "network" : "api";
}

export function trackCtaClicked(target: string) {
  trackPostHogOnly("cta_clicked", { target });
}

export function trackResultShown(state: string) {
  trackPostHogOnly("result_shown", { state });
}
