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

export default function Guardians({ answers, updateAnswers, onNext, onPrev, isFirst, isLast, direction }: Props) {
  const guardian = answers.guardian ?? { name: "", relationship: "", cityState: "" };
  const altGuardian = answers.alternateGuardian ?? { name: "", relationship: "", cityState: "" };

  const canProceed = guardian.name.trim() !== "" && guardian.relationship.trim() !== "";

  return (
    <QuestionCard
      stepKey="guardians"
      direction={direction}
      onNext={onNext}
      onPrev={onPrev}
      isFirst={isFirst}
      isLast={isLast}
      nextDisabled={!canProceed}
      whyWeAsk="If both parents pass away, the court decides who raises your children — unless your will names a guardian. This is one of the most important reasons to have a will. Without it, a judge who doesn't know your family makes the call."
    >
      <h2 className="text-2xl font-bold text-[var(--color-brand)]">
        If something happened to you, who would raise your kids?
      </h2>
      <p className="mt-2 text-gray-500">
        Pick the person you trust most to take care of your children day-to-day.
      </p>

      {answers.maritalStatus === "married" && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
          If you pass away and your spouse is still alive, your spouse will raise the children. The guardian you name here only steps in if BOTH of you pass away.
        </div>
      )}

      <div className="mt-6 space-y-6">
        <div className="space-y-3">
          <h3 className="font-medium text-gray-700">Primary Guardian</h3>
          <input
            type="text"
            placeholder="Full name"
            value={guardian.name}
            onChange={(e) => updateAnswers({ guardian: { ...guardian, name: e.target.value } })}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Relationship (e.g., sister)"
              value={guardian.relationship}
              onChange={(e) => updateAnswers({ guardian: { ...guardian, relationship: e.target.value } })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
            />
            <input
              type="text"
              placeholder="City, State"
              value={guardian.cityState}
              onChange={(e) => updateAnswers({ guardian: { ...guardian, cityState: e.target.value } })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium text-gray-700">
            Backup Guardian <span className="text-gray-400 font-normal">(recommended)</span>
          </h3>
          <input
            type="text"
            placeholder="Full name"
            value={altGuardian.name}
            onChange={(e) => updateAnswers({ alternateGuardian: { ...altGuardian, name: e.target.value } })}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Relationship"
              value={altGuardian.relationship}
              onChange={(e) => updateAnswers({ alternateGuardian: { ...altGuardian, relationship: e.target.value } })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
            />
            <input
              type="text"
              placeholder="City, State"
              value={altGuardian.cityState}
              onChange={(e) => updateAnswers({ alternateGuardian: { ...altGuardian, cityState: e.target.value } })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-700">
            At what age should your children receive their inheritance?
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Until this age, the money is managed on their behalf for care and education.
          </p>
          <select
            value={answers.inheritanceAge ?? 18}
            onChange={(e) => updateAnswers({ inheritanceAge: Number(e.target.value) })}
            className="mt-2 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent bg-white"
          >
            <option value={18}>18 (legal adult)</option>
            <option value={21}>21</option>
            <option value={25}>25 (most common choice)</option>
            <option value={30}>30</option>
          </select>
        </div>
      </div>
    </QuestionCard>
  );
}
