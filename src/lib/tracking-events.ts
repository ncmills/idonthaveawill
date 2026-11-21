// Fixed event names and prop vocab. Pure module so tests can import it without posthog-js.
export const FUNNEL_EVENT_NAMES = [
  "step_viewed",
  "step_completed",
  "will_generated",
  "download",
  "email_captured",
] as const;

// PostHog-only events (not sent to /api/funnel, whose allowlist is unchanged).
export const POSTHOG_ONLY_EVENT_NAMES = [
  "form_error",
  "cta_clicked",
  "result_shown",
] as const;

export type FormErrorKind = "validation" | "api" | "network";
export type FormErrorForm = "homepage_email" | "review_email" | "download_email" | "download_word" | "download_pdf" | "generate";
