"use client";

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

export default function DebtsAndExpenses({ answers, updateAnswers, onNext, onPrev, isFirst, isLast, direction }: Props) {
  return (
    <QuestionCard
      stepKey="debts"
      direction={direction}
      onNext={onNext}
      onPrev={onPrev}
      isFirst={isFirst}
      isLast={isLast}
      nextDisabled={answers.debtHandling === ""}
      whyWeAsk="When someone passes away, their debts don't disappear — they become the responsibility of the estate (not your family members personally, in most cases). Before any beneficiary receives anything, your executor must use your estate's assets to pay off outstanding debts, final income taxes, medical bills from your last illness, and funeral costs. This is required by law in every state. Most people choose 'pay from my general estate,' which means the executor uses whatever assets are available. But if you have specific wishes — like 'pay off the mortgage using my life insurance policy' or 'use my savings account for funeral costs before anything else' — you can spell that out here. These instructions help your executor prioritize and can prevent disputes among beneficiaries about which assets get used to pay debts."
    >
      <h2 >
        How should your remaining debts and final expenses be paid?
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-3">
        <button
          onClick={() => updateAnswers({ debtHandling: "general", debtInstructions: undefined })}
          className={`py-4 px-6 rounded-xl border-2 text-left transition-all ${
            answers.debtHandling === "general"
              ? "border-[var(--color-ink)] bg-[var(--color-cream-deep)] text-[var(--color-ink)]"
              : "border-[var(--color-rule)] hover:border-[var(--color-ink)]"
          }`}
        >
          <span className="font-medium text-gray-700">Pay them from my general estate</span>
          <span className="block text-sm text-gray-500 mt-1">Most common — your executor uses your assets to pay off debts, taxes, and final expenses.</span>
        </button>
        <button
          onClick={() => updateAnswers({ debtHandling: "specific" })}
          className={`py-4 px-6 rounded-xl border-2 text-left transition-all ${
            answers.debtHandling === "specific"
              ? "border-[var(--color-ink)] bg-[var(--color-cream-deep)] text-[var(--color-ink)]"
              : "border-[var(--color-rule)] hover:border-[var(--color-ink)]"
          }`}
        >
          <span className="font-medium text-gray-700">I have specific instructions</span>
          <span className="block text-sm text-gray-500 mt-1">e.g., &quot;Pay the mortgage from my life insurance&quot;</span>
        </button>
      </div>

      {answers.debtHandling === "specific" && (
        <div className="mt-4">
          <textarea
            placeholder='e.g., "Pay off the mortgage on 123 Main St from my life insurance policy" or "Use my savings account to cover funeral costs first"'
            value={answers.debtInstructions ?? ""}
            onChange={(e) => updateAnswers({ debtInstructions: e.target.value })}
            rows={3}
            className="iha-input resize-none"
          />
        </div>
      )}
    </QuestionCard>
  );
}
