"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { WillAnswers, GeneratedWill } from "@/lib/types";
import { generateWill } from "@/lib/willGenerator";
import DisclaimerBanner from "@/components/shared/DisclaimerBanner";
import WillPreview from "@/components/will/WillPreview";
import ExecutionChecklist from "@/components/will/ExecutionChecklist";
import DownloadButton from "@/components/will/DownloadButton";
import AttorneyReferral from "@/components/will/AttorneyReferral";
import EmailCapture from "@/components/will/EmailCapture";
import { sendAnonymizedStats } from "@/lib/analytics";
import { getStateByAbbreviation } from "@/lib/stateData";
import Link from "next/link";
import { Suspense } from "react";

function ReviewContent() {
  const searchParams = useSearchParams();
  const [will, setWill] = useState<GeneratedWill | null>(null);
  const [answers, setAnswers] = useState<WillAnswers | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      let parsedAnswers: WillAnswers | null = null;
      const data = searchParams.get("data");
      if (!data) {
        // Try sessionStorage
        const stored = sessionStorage.getItem("idonthaveawill_answers");
        if (stored) {
          parsedAnswers = JSON.parse(stored);
        } else {
          setError("No will data found. Please go back and complete the questionnaire.");
          return;
        }
      } else {
        parsedAnswers = JSON.parse(atob(data));
      }
      if (parsedAnswers) {
        setAnswers(parsedAnswers);
        setWill(generateWill(parsedAnswers));
        sendAnonymizedStats(parsedAnswers);
      }
    } catch (e) {
      setError("Something went wrong generating your will. Please try again.");
      console.error(e);
    }
  }, [searchParams]);

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Link href="/create" className="text-[var(--color-accent)] hover:underline">
          Go back to questionnaire
        </Link>
      </div>
    );
  }

  if (!will) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">Generating your will...</p>
      </div>
    );
  }

  return (
    <div>
      <DisclaimerBanner />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 no-print">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-brand)]">
              Your Will is Ready
            </h1>
            <p className="text-gray-500 mt-1">
              Review it below, then follow the steps to make it official.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/create"
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Edit Answers
            </Link>
            <DownloadButton will={will} />
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
              stateName={getStateByAbbreviation(answers.state)?.state || answers.state}
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
