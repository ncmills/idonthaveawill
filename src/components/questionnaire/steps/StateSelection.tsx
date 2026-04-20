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
      whyWeAsk="Each of the 50 states (and DC) has its own set of laws about what makes a will valid. For example, most states require two witnesses to watch you sign, but Pennsylvania doesn't require any at the time of signing. Louisiana requires a notary to be present. Some states accept handwritten wills; others don't. By knowing your state, we can format your draft to match your state's specific requirements and give you the right instructions for signing. If you move to a different state later, you may want to update your will — but a properly executed will from one state is generally respected in another."
    >
      <h2>What state do you live in?</h2>

      <div className="mt-6">
        <select
          value={answers.state}
          onChange={(e) => updateAnswers({ state: e.target.value })}
          className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-rule)] text-[16px] text-[var(--color-ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-sage)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cream-deep)] focus:border-[var(--color-ink)]"
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
        <div className="iha-callout">
          <strong>Heads up:</strong> Louisiana has different rules than every other state. Your will needs to be signed in front of a notary and two witnesses. We&apos;ll walk you through it.
        </div>
      )}

      {answers.state === "PA" && (
        <div className="iha-callout">
          <strong>Good news:</strong> Pennsylvania has some of the simplest will rules in the country. You don&apos;t even need witnesses when you sign (though we recommend them).
        </div>
      )}

      {answers.state === "GA" && (
        <div className="iha-callout">
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
