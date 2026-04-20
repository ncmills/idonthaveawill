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
    <QuestionCard stepKey="simultaneous" direction={direction} onNext={onNext} onPrev={onPrev} isFirst={isFirst} isLast={isLast} whyWeAsk="This sounds grim, but it matters more than most people realize. If you and your spouse (or primary beneficiary) die in the same event — a car accident, a plane crash, a natural disaster — and there's no way to tell who died first, a legal mess can result. Without this clause, your state's 'simultaneous death' law kicks in (most states use the Uniform Simultaneous Death Act), which can lead to property bouncing between two estates, double probate, and unintended recipients. By naming someone here, you create a clean fallback: if you both die at the same time, your estate goes directly to the person you name, skipping the legal tangle entirely.">
      <h2 >
        If you and your {answers.maritalStatus === "married" ? "spouse" : "main beneficiary"} passed away at the same time, who should get everything?
      </h2>
      <p className="mt-2 text-gray-500">For example, in a car accident or other disaster where it&apos;s impossible to tell who passed first.</p>

      <div className="mt-6 space-y-3">
        <input type="text" placeholder="Full name" value={beneficiary.name} onChange={(e) => updateAnswers({ simultaneousDeathBeneficiary: { ...beneficiary, name: e.target.value } })} className="iha-input" />
        <input type="text" placeholder="Relationship (e.g., brother, best friend)" value={beneficiary.relationship} onChange={(e) => updateAnswers({ simultaneousDeathBeneficiary: { ...beneficiary, relationship: e.target.value } })} className="iha-input" />
      </div>
    </QuestionCard>
  );
}
