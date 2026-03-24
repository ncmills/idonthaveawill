"use client";

import type { WillAnswers } from "@/lib/types";
import { getStateList, getStateByAbbreviation, isCommunityPropertyState } from "@/lib/stateData";
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

export default function StateSelection({ answers, updateAnswers, onNext, onPrev, isFirst, isLast, direction }: Props) {
  const states = getStateList();
  const selected = getStateByAbbreviation(answers.state);

  return (
    <QuestionCard
      stepKey="state"
      direction={direction}
      onNext={onNext}
      onPrev={onPrev}
      isFirst={isFirst}
      isLast={isLast}
      nextDisabled={!answers.state}
      whyWeAsk="Every state has its own rules for what makes a will legal — how many witnesses you need, whether it needs to be notarized, and more. We use your state to make sure your will follows the right rules."
    >
      <h2 className="text-2xl font-bold text-[var(--color-brand)]">
        What state do you live in?
      </h2>

      <div className="mt-6">
        <select
          value={answers.state}
          onChange={(e) => updateAnswers({ state: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent bg-white"
        >
          <option value="">Select your state...</option>
          {states.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* State-specific callouts */}
      {answers.state === "LA" && (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
          <strong>Heads up:</strong> Louisiana has different rules than every other state. Your will needs to be signed in front of a notary and two witnesses. We&apos;ll walk you through it.
        </div>
      )}

      {answers.state === "PA" && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
          <strong>Good news:</strong> Pennsylvania has some of the simplest will rules in the country. You don&apos;t even need witnesses when you sign (though we recommend them).
        </div>
      )}

      {answers.state === "GA" && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
          In Georgia, you can make a will at age 14 — younger than any other state.
        </div>
      )}

      {selected && (
        <div className="mt-4 text-sm text-gray-500">
          <strong>{selected.state}</strong> requires{" "}
          {selected.witness_requirements.count} witness{selected.witness_requirements.count !== 1 ? "es" : ""}.
          {selected.notarization.required
            ? " Notarization is required."
            : " Notarization is recommended but not required."}
          {isCommunityPropertyState(answers.state) &&
            " This is a community property state."}
        </div>
      )}
    </QuestionCard>
  );
}
