import type { WillAnswers } from "./types";
import { extractAnonymizedStats } from "./statsSchema";

/**
 * Send anonymized stats to the server. Fire-and-forget — never blocks UX.
 */
export function sendAnonymizedStats(answers: WillAnswers): void {
  try {
    const stats = extractAnonymizedStats(answers);

    // Fire and forget — don't await, don't block
    fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stats),
    }).catch(() => {
      // Silently fail — stats should never affect user experience
    });
  } catch {
    // Extraction failed — silently ignore
  }
}
