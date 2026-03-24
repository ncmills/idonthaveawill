"use client";

import { useState } from "react";
import type { WillAnswers } from "@/lib/types";
import QuestionCard from "../QuestionCard";

interface Props {
  answers: WillAnswers;
  updateAnswers: (partial: Partial<WillAnswers>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  direction: 1 | -1;
}

export default function NoContest({ answers, updateAnswers, onNext, onPrev, isFirst, isLast, direction }: Props) {
  const [showMore, setShowMore] = useState(false);

  return (
    <QuestionCard stepKey="nocontest" direction={direction} onNext={onNext} onPrev={onPrev} isFirst={isFirst} isLast={isLast} whyWeAsk="A no-contest clause discourages people from fighting over your will. It's like saying 'take what I gave you and be happy, or risk getting nothing.' These clauses are enforceable in most states, but not all — we'll check your state's rules.">
      <h2 className="text-2xl font-bold text-[var(--color-brand)]">
        Do you want to include a &quot;no-contest clause&quot;?
      </h2>
      <p className="mt-2 text-gray-500">
        This means: if someone challenges your will in court and loses, they get NOTHING — even if you left them something.
      </p>

      <div className="mt-6 space-y-3">
        <button
          onClick={() => { updateAnswers({ includeNoContest: true }); setShowMore(false); }}
          className={`w-full py-4 px-6 rounded-xl border-2 text-left transition-all ${answers.includeNoContest === true ? "border-[var(--color-accent)] bg-green-50" : "border-gray-200 hover:border-gray-300"}`}
        >
          <span className="font-medium text-gray-700">Yes, include it</span>
        </button>
        <button
          onClick={() => { updateAnswers({ includeNoContest: false }); setShowMore(false); }}
          className={`w-full py-4 px-6 rounded-xl border-2 text-left transition-all ${answers.includeNoContest === false ? "border-[var(--color-accent)] bg-green-50" : "border-gray-200 hover:border-gray-300"}`}
        >
          <span className="font-medium text-gray-700">No, skip it</span>
        </button>
        <button
          onClick={() => setShowMore(!showMore)}
          className="w-full py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-left transition-all"
        >
          <span className="font-medium text-gray-700">Not sure — tell me more</span>
        </button>
      </div>

      {showMore && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800 space-y-2">
          <p>If you think there&apos;s any chance someone might challenge your will, this is usually a good idea.</p>
          <p>It&apos;s a common provision and costs nothing to include. It basically says: &quot;If you try to fight this will and lose, you forfeit everything I left you.&quot;</p>
          <p>This is enforceable in most states, though a few states (like Florida and Indiana) limit their enforcement.</p>
        </div>
      )}
    </QuestionCard>
  );
}
