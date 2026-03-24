"use client";

import type { WillAnswers } from "@/lib/types";
import { getStateByAbbreviation } from "@/lib/stateData";
import { getAge } from "@/lib/questionFlow";
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

export default function PersonalInfo({ answers, updateAnswers, onNext, onPrev, isFirst, isLast, direction }: Props) {
  const { fullName, city, county, dateOfBirth } = answers;
  const stateReqs = getStateByAbbreviation(answers.state);
  const minAge = stateReqs?.minimum_age.standard ?? 18;

  const ageValid =
    !dateOfBirth || getAge(dateOfBirth) >= minAge;

  const canProceed =
    fullName.first.trim() !== "" &&
    fullName.last.trim() !== "" &&
    city.trim() !== "" &&
    county.trim() !== "" &&
    dateOfBirth !== "" &&
    ageValid;

  return (
    <QuestionCard
      stepKey="personal"
      direction={direction}
      onNext={onNext}
      onPrev={onPrev}
      isFirst={isFirst}
      isLast={isLast}
      nextDisabled={!canProceed}
      whyWeAsk="Your will needs your full legal name exactly as it appears on your ID — this makes sure there's no confusion about whose will it is. Your city, county, and state go at the top of the will. Your date of birth confirms you're old enough to make a will in your state."
    >
      <h2 className="text-2xl font-bold text-[var(--color-brand)]">
        Tell us about yourself
      </h2>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full legal name
          </label>
          <div className="grid grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="First"
              value={fullName.first}
              onChange={(e) =>
                updateAnswers({
                  fullName: { ...fullName, first: e.target.value },
                })
              }
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Middle (optional)"
              value={fullName.middle}
              onChange={(e) =>
                updateAnswers({
                  fullName: { ...fullName, middle: e.target.value },
                })
              }
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Last"
              value={fullName.last}
              onChange={(e) =>
                updateAnswers({
                  fullName: { ...fullName, last: e.target.value },
                })
              }
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
            />
          </div>
          <p className="mt-1 text-xs text-gray-400">
            Use your name exactly as it appears on your ID
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => updateAnswers({ city: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              County
            </label>
            <input
              type="text"
              placeholder="County"
              value={county}
              onChange={(e) => updateAnswers({ county: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of birth
          </label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => updateAnswers({ dateOfBirth: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
          />
        </div>

        {dateOfBirth && !ageValid && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-800">
            In {stateReqs?.state ?? "your state"}, you must be at least {minAge}{" "}
            to make a will. If you&apos;re emancipated or married, you may still
            qualify — check with an attorney.
          </div>
        )}
      </div>
    </QuestionCard>
  );
}
