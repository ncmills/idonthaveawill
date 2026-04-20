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
    <QuestionCard stepKey="nocontest" direction={direction} onNext={onNext} onPrev={onPrev} isFirst={isFirst} isLast={isLast} whyWeAsk="A no-contest clause (also called an 'in terrorem' clause) says: if any beneficiary challenges the will in court and loses, they forfeit whatever you left them — they get nothing. It's a powerful deterrent against will contests. These clauses are enforceable in most states, but there are exceptions: Florida generally won't enforce them, and some states only enforce them if the challenge was made without 'probable cause.' If you're worried someone might fight over your will — an unhappy family member, a disinherited relative — this gives them a strong reason not to. It costs nothing to include and is very common in estate planning.">
      <h2 >
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
        <div className="iha-callout space-y-2">
          <p>If you think there&apos;s any chance someone might challenge your will, this is usually a good idea.</p>
          <p>It&apos;s a common provision and costs nothing to include. It basically says: &quot;If you try to fight this will and lose, you forfeit everything I left you.&quot;</p>
          <p>This is enforceable in most states, though a few states (like Florida and Indiana) limit their enforcement.</p>
        </div>
      )}
    </QuestionCard>
  );
}
