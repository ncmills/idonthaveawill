"use client";

import { useEffect, useRef, useState } from "react";
import type { WillAnswers, GeneratedWill } from "@/lib/types";
import { generateWill } from "@/lib/willGenerator";
import DisclaimerBanner from "@/components/shared/DisclaimerBanner";
import WillPreview from "@/components/will/WillPreview";
import ExecutionChecklist from "@/components/will/ExecutionChecklist";
import DownloadButton from "@/components/will/DownloadButton";
import AttorneyReferral from "@/components/will/AttorneyReferral";
import EmailCapture from "@/components/will/EmailCapture";
import { sendAnonymizedStats } from "@/lib/analytics";
import { trackWillGenerated } from "@/lib/tracking";
import { getStateNameByAbbr } from "@/lib/stateDataClient";
import Link from "next/link";
import { Suspense } from "react";

function ReviewContent() {
  const [will, setWill] = useState<GeneratedWill | null>(null);
  const [answers, setAnswers] = useState<WillAnswers | null>(null);
  const [error, setError] = useState<string | null>(null);
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    try {
      const stored = sessionStorage.getItem("idonthaveawill_answers");
      if (!stored) {
        setError("No will data found. Please go back and complete the questionnaire.");
        return;
      }
      const parsedAnswers = JSON.parse(stored) as WillAnswers;
      setAnswers(parsedAnswers);
      setWill(generateWill(parsedAnswers));
      sendAnonymizedStats(parsedAnswers);
      trackWillGenerated(parsedAnswers.state);
    } catch (e) {
      setError("Something went wrong generating your will. Please try again.");
      console.error(e);
    }
  }, []);

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="iha-caps">An interruption</p>
        <p className="mt-4 font-[family-name:var(--font-display)] italic text-[18px] text-[var(--color-ink)]">
          {error}
        </p>
        <Link
          href="/create"
          className="inline-block mt-6 font-[family-name:var(--font-display)] italic text-[16px] text-[var(--color-ink)] underline decoration-[var(--color-sage)] decoration-[1.5px] underline-offset-[6px] hover:decoration-[var(--color-ink)] transition-colors"
        >
          Go back to questionnaire →
        </Link>
      </div>
    );
  }

  if (!will) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="iha-caps">Preparing</p>
        <p className="mt-4 font-[family-name:var(--font-display)] italic text-[18px] text-[var(--color-ink-soft)]">
          Typesetting your draft…
        </p>
      </div>
    );
  }

  return (
    <div>
      <DisclaimerBanner />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 no-print">
          <div>
            <p className="iha-caps">The draft</p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-[34px] md:text-[44px] font-medium text-[var(--color-ink)] leading-tight tracking-[-0.01em]">
              Your will is ready.
            </h1>
            <p className="mt-2 font-[family-name:var(--font-display)] italic text-[16px] text-[var(--color-ink-soft)]">
              Review it below, then follow the steps to make it official.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/create"
              className="inline-flex items-center justify-center gap-2 px-5 py-[0.95rem] border border-[var(--color-ink)] text-[var(--color-ink)] text-[0.92rem] font-medium tracking-[0.02em] uppercase hover:bg-[var(--color-cream-deep)] transition-colors"
            >
              Edit answers
            </Link>
            <DownloadButton will={will} stateAbbr={answers?.state} />
          </div>
        </div>

        {/* Will document */}
        <WillPreview will={will} />

        {/* Execution checklist */}
        <div className="mt-12 no-print">
          <ExecutionChecklist items={will.executionChecklist} />
        </div>

        {/* Attorney referral + Email capture */}
        {answers && (
          <div className="mt-12 space-y-6 no-print">
            <AttorneyReferral
              stateAbbr={answers.state}
              stateName={getStateNameByAbbr(answers.state)}
            />
            <EmailCapture stateAbbr={answers.state} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto px-4 py-16 text-center"><p className="text-gray-500">Loading...</p></div>}>
      <ReviewContent />
    </Suspense>
  );
}
