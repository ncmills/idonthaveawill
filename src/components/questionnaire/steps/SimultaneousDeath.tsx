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

export default function SimultaneousDeath({ answers, updateAnswers, onNext, onPrev, isFirst, isLast, direction }: Props) {
  const beneficiary = answers.simultaneousDeathBeneficiary ?? { name: "", relationship: "" };

  return (
    <QuestionCard stepKey="simultaneous" direction={direction} onNext={onNext} onPrev={onPrev} isFirst={isFirst} isLast={isLast} whyWeAsk="This sounds grim, but it matters. If there's no plan for this scenario, your estate and your spouse's estate could get tangled up in court. Naming someone here keeps things simple.">
      <h2 className="text-2xl font-bold text-[var(--color-brand)]">
        If you and your {answers.maritalStatus === "married" ? "spouse" : "main beneficiary"} passed away at the same time, who should get everything?
      </h2>
      <p className="mt-2 text-gray-500">For example, in a car accident or other disaster where it&apos;s impossible to tell who passed first.</p>

      <div className="mt-6 space-y-3">
        <input type="text" placeholder="Full name" value={beneficiary.name} onChange={(e) => updateAnswers({ simultaneousDeathBeneficiary: { ...beneficiary, name: e.target.value } })} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent" />
        <input type="text" placeholder="Relationship (e.g., brother, best friend)" value={beneficiary.relationship} onChange={(e) => updateAnswers({ simultaneousDeathBeneficiary: { ...beneficiary, relationship: e.target.value } })} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent" />
      </div>
    </QuestionCard>
  );
}
