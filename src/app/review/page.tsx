"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { WillAnswers, GeneratedWill } from "@/lib/types";
import { generateWill } from "@/lib/willGenerator";
import DisclaimerBanner from "@/components/shared/DisclaimerBanner";
import WillPreview from "@/components/will/WillPreview";
import ExecutionChecklist from "@/components/will/ExecutionChecklist";
import DownloadButton from "@/components/will/DownloadButton";
import Link from "next/link";
import { Suspense } from "react";

function ReviewContent() {
  const searchParams = useSearchParams();
  const [will, setWill] = useState<GeneratedWill | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const data = searchParams.get("data");
      if (!data) {
        // Try sessionStorage
        const stored = sessionStorage.getItem("idonthaveawill_answers");
        if (stored) {
          const answers: WillAnswers = JSON.parse(stored);
          setWill(generateWill(answers));
          return;
        }
        setError("No will data found. Please go back and complete the questionnaire.");
        return;
      }
      const answers: WillAnswers = JSON.parse(atob(data));
      setWill(generateWill(answers));
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
            <DownloadButton />
          </div>
        </div>

        {/* Will document */}
        <WillPreview will={will} />

        {/* Execution checklist */}
        <div className="mt-12 no-print">
          <ExecutionChecklist items={will.executionChecklist} />
        </div>
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
