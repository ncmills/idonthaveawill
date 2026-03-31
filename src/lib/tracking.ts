/**
 * Funnel tracking — fires PostHog events and saves anonymized funnel data to Supabase.
 * All calls are fire-and-forget and never block UX.
 */

function getPostHog(): { capture: (event: string, props?: Record<string, unknown>) => void } | null {
  if (typeof window === "undefined") return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ph = (window as any).posthog;
  if (!ph || typeof ph.capture !== "function") return null;
  return ph;
}

function track(event: string, props?: Record<string, unknown>) {
  getPostHog()?.capture(event, props);

  // Also log to Supabase funnel table
  fetch("/api/funnel", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, ...props }),
  }).catch(() => {});
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
