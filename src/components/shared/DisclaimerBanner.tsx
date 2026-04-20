"use client";

import { useState } from "react";

export default function DisclaimerBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-[var(--color-cream-deep)] border-b border-[var(--color-rule)]">
      <div className="max-w-4xl mx-auto px-6 py-3 flex items-start gap-4">
        <div className="pl-3 border-l-2 border-[var(--color-ink)] flex-1">
          <p className="text-[13.5px] text-[var(--color-ink)] leading-relaxed">
            <span className="font-[family-name:var(--font-display)] italic font-medium">
              A reminder.
            </span>{" "}
            This tool creates a legal document, not legal advice. We are not
            attorneys. For complex estates, blended families, business interests,
            or trusts, please consult an estate planning attorney.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors shrink-0"
          aria-label="Dismiss"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
