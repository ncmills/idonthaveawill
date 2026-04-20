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
      whyWeAsk="Your will must identify you clearly so there's no confusion about who wrote it. We use your full legal name — the one on your driver's license or passport — because that's what a court will look at. Your city and county go at the top of the will to establish where you live (this determines which court handles the will later). Your date of birth confirms you meet the minimum age to make a will in your state — that's 18 in most states, 16 in Louisiana, and 14 in Georgia."
    >
      <h2 >
        Tell us about yourself
      </h2>

      <div className="mt-6 space-y-4">
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700 mb-1">
            Full legal name
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor="name-first" className="sr-only">First name</label>
              <input
                id="name-first"
                type="text"
                placeholder="First"
                value={fullName.first}
                onChange={(e) =>
                  updateAnswers({
                    fullName: { ...fullName, first: e.target.value },
                  })
                }
                className="iha-input"
              />
            </div>
            <div>
              <label htmlFor="name-middle" className="sr-only">Middle name (optional)</label>
              <input
                id="name-middle"
                type="text"
                placeholder="Middle (optional)"
                value={fullName.middle}
                onChange={(e) =>
                  updateAnswers({
                    fullName: { ...fullName, middle: e.target.value },
                  })
                }
                className="iha-input"
              />
            </div>
            <div>
              <label htmlFor="name-last" className="sr-only">Last name</label>
              <input
                id="name-last"
                type="text"
                placeholder="Last"
                value={fullName.last}
                onChange={(e) =>
                  updateAnswers({
                    fullName: { ...fullName, last: e.target.value },
                  })
                }
                className="iha-input"
              />
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-400">
            Use your name exactly as it appears on your ID
          </p>
        </fieldset>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="personal-city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              id="personal-city"
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => updateAnswers({ city: e.target.value })}
              className="iha-input"
            />
          </div>
          <div>
            <label htmlFor="personal-county" className="block text-sm font-medium text-gray-700 mb-1">
              County
            </label>
            <input
              id="personal-county"
              type="text"
              placeholder="County"
              value={county}
              onChange={(e) => updateAnswers({ county: e.target.value })}
              className="iha-input"
            />
          </div>
        </div>

        <div>
          <label htmlFor="personal-dob" className="block text-sm font-medium text-gray-700 mb-1">
            Date of birth
          </label>
          <input
            id="personal-dob"
            type="date"
            value={dateOfBirth}
            onChange={(e) => updateAnswers({ dateOfBirth: e.target.value })}
            className="iha-input"
          />
        </div>

        {dateOfBirth && !ageValid && (
          <div role="alert" className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-800">
            In {stateReqs?.state ?? "your state"}, you must be at least {minAge}{" "}
            to make a will. If you&apos;re emancipated or married, you may still
            qualify — check with an attorney.
          </div>
        )}
      </div>
    </QuestionCard>
  );
}
