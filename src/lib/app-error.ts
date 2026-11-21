// app_error split (CAPTURE-GAPS-1121): the vendor (PostHog) gets the error name and
// digest only, never error.message; the full message lands first-party in Supabase
// funnel_events via /api/funnel (MAX-DATA-NO-COOKIES: keep full detail in our own store).
// Pure module so tests can import it without posthog-js.
export const APP_ERROR_MESSAGE_MAX = 200;

type AppError = { name?: string; message?: string; digest?: string };

export function appErrorVendorProps(error: AppError) {
  return { name: error.name ?? "Error", digest: error.digest };
}

export function appErrorFirstPartyBody(error: AppError) {
  return {
    event: "app_error",
    error_name: error.name ?? "Error",
    digest: error.digest,
    message: (error.message ?? "").slice(0, APP_ERROR_MESSAGE_MAX),
  };
}
