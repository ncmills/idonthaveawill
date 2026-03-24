"use client";

import { getReferralForState } from "@/lib/referralConfig";

interface AttorneyReferralProps {
  stateAbbr: string;
  stateName: string;
}

export default function AttorneyReferral({ stateAbbr, stateName }: AttorneyReferralProps) {
  const referral = getReferralForState(stateAbbr, stateName);

  return (
    <div className="bg-[var(--color-brand)] rounded-2xl p-6 md:p-8 text-white">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl">
          ⚖
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            Want an attorney to review your draft?
          </h3>
          <p className="mt-2 text-gray-300 text-sm leading-relaxed">
            A licensed estate planning attorney can review your will for{" "}
            <span className="text-white font-medium">{referral.costEstimate}</span> (typical flat fee).
            They&apos;ll catch anything specific to your situation that a general tool can&apos;t.
          </p>
          <p className="mt-3 text-gray-400 text-xs">
            {referral.description}
          </p>
          <a
            href={referral.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-2.5 bg-white text-[var(--color-brand)] font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm"
          >
            Find an Attorney in {stateName}
          </a>
        </div>
      </div>
    </div>
  );
}
