"use client";

import type { WillAnswers } from "@/lib/types";
import { isCommunityPropertyState } from "@/lib/stateData";
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

const statuses = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" },
] as const;

export default function FamilyStatus({ answers, updateAnswers, onNext, onPrev, isFirst, isLast, direction }: Props) {
  const canProceed =
    answers.maritalStatus !== "" &&
    (answers.maritalStatus !== "married" || (answers.spouseName ?? "").trim() !== "");

  return (
    <QuestionCard
      stepKey="family"
      direction={direction}
      onNext={onNext}
      onPrev={onPrev}
      isFirst={isFirst}
      isLast={isLast}
      nextDisabled={!canProceed}
      whyWeAsk="Your marital status changes how your will works in important ways. In most states, your spouse has what's called an 'elective share' — a legal right to claim a portion of your estate (usually between one-third and one-half) even if you leave them nothing in your will. In the 9 community property states (like California and Texas), most property acquired during the marriage is automatically owned 50/50 — your will can only control your half. If you're divorced, we include language to make clear that any gifts to your ex-spouse from a prior will are cancelled. If you're widowed or single, your will is simpler since there's no spousal claim to account for."
    >
      <h2 className="text-2xl font-bold text-[var(--color-brand)]">
        What is your current marital status?
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {statuses.map((s) => (
          <button
            key={s.value}
            onClick={() =>
              updateAnswers({
                maritalStatus: s.value,
                ...(s.value !== "married" ? { spouseName: undefined } : {}),
                ...(s.value !== "divorced" ? { exSpouseName: undefined } : {}),
              })
            }
            className={`py-4 px-6 rounded-xl border-2 text-lg font-medium transition-all ${
              answers.maritalStatus === s.value
                ? "border-[var(--color-accent)] bg-green-50 text-[var(--color-accent)]"
                : "border-gray-200 hover:border-gray-300 text-gray-700"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {answers.maritalStatus === "married" && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What is your spouse&apos;s full legal name?
          </label>
          <input
            type="text"
            placeholder="Spouse's full legal name"
            value={answers.spouseName ?? ""}
            onChange={(e) => updateAnswers({ spouseName: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
          />

          {isCommunityPropertyState(answers.state) && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
              <strong>Community property state:</strong> Most property you and your spouse got during your marriage is owned equally by both of you. Your will can only give away YOUR half of community property. Keep this in mind as you answer the next questions.
            </div>
          )}
        </div>
      )}

      {answers.maritalStatus === "divorced" && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What is your ex-spouse&apos;s full legal name? <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="Ex-spouse's full legal name"
            value={answers.exSpouseName ?? ""}
            onChange={(e) => updateAnswers({ exSpouseName: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
          />
          <p className="mt-2 text-xs text-gray-400">
            In most states, divorce automatically cancels any gifts to your ex-spouse. We&apos;ll include a line making that crystal clear.
          </p>
        </div>
      )}
    </QuestionCard>
  );
}
