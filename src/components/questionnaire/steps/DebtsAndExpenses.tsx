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
      whyWeAsk="When someone passes away, their debts don't just disappear. Your estate is used to pay them off before anything gets distributed. Most people let the executor handle this from the general estate."
    >
      <h2 className="text-2xl font-bold text-[var(--color-brand)]">
        How should your remaining debts and final expenses be paid?
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-3">
        <button
          onClick={() => updateAnswers({ debtHandling: "general", debtInstructions: undefined })}
          className={`py-4 px-6 rounded-xl border-2 text-left transition-all ${
            answers.debtHandling === "general"
              ? "border-[var(--color-accent)] bg-green-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <span className="font-medium text-gray-700">Pay them from my general estate</span>
          <span className="block text-sm text-gray-500 mt-1">Most common — your executor uses your assets to pay off debts, taxes, and final expenses.</span>
        </button>
        <button
          onClick={() => updateAnswers({ debtHandling: "specific" })}
          className={`py-4 px-6 rounded-xl border-2 text-left transition-all ${
            answers.debtHandling === "specific"
              ? "border-[var(--color-accent)] bg-green-50"
              : "border-gray-200 hover:border-gray-300"
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
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent resize-none"
          />
        </div>
      )}
    </QuestionCard>
  );
}
