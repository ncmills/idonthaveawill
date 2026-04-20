"use client";

import { getReferralForState } from "@/lib/referralConfig";

interface AttorneyReferralProps {
  stateAbbr: string;
  stateName: string;
}

export default function AttorneyReferral({ stateAbbr, stateName }: AttorneyReferralProps) {
  const referral = getReferralForState(stateAbbr, stateName);

  return (
    <div className="bg-[var(--color-ink)] text-[var(--color-cream)] p-7 md:p-9">
      <p className="iha-caps" style={{ color: "rgba(248, 243, 234, 0.6)" }}>
        A recommended next step
      </p>
      <h3 className="mt-3 font-[family-name:var(--font-display)] text-[24px] md:text-[28px] font-medium leading-tight">
        Want an attorney to review your draft?
      </h3>
      <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-cream)]/85">
        A licensed estate planning attorney can review your will for{" "}
        <span className="font-[family-name:var(--font-display)] italic text-[var(--color-cream)]">
          {referral.costEstimate}
        </span>{" "}
        (typical flat fee). They&apos;ll catch anything specific to your situation
        that a general tool can&apos;t.
      </p>
      <p className="mt-3 text-[13px] leading-relaxed text-[var(--color-cream)]/60">
        {referral.description}
      </p>
      <a
        href={referral.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 mt-6 px-6 py-[0.95rem] bg-[var(--color-cream)] text-[var(--color-ink)] text-[0.92rem] font-medium tracking-[0.02em] uppercase transition-colors hover:bg-[var(--color-cream-deep)]"
      >
        <span
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ background: "var(--color-sage)" }}
          aria-hidden="true"
        />
        Find an attorney in {stateName}
      </a>
    </div>
  );
}
