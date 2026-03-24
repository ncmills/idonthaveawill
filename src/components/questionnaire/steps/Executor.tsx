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

export default function Executor({ answers, updateAnswers, onNext, onPrev, isFirst, isLast, direction }: Props) {
  const { executor, alternateExecutor, waiveBond, executorCanSellProperty } = answers;

  const canProceed =
    executor.name.trim() !== "" && executor.relationship.trim() !== "";

  return (
    <QuestionCard
      stepKey="executor"
      direction={direction}
      onNext={onNext}
      onPrev={onPrev}
      isFirst={isFirst}
      isLast={isLast}
      nextDisabled={!canProceed}
      whyWeAsk="Your executor is the person who makes sure your wishes actually happen. They gather your assets, pay any debts, and give people what you left them. Pick someone you trust who is organized and responsible. It doesn't need to be a family member."
    >
      <h2 className="text-2xl font-bold text-[var(--color-brand)]">
        Who do you want in charge of carrying out your will?
      </h2>
      <p className="mt-2 text-gray-500">
        This person is called your &quot;executor.&quot; They&apos;ll pay your bills, distribute your stuff, and handle paperwork with the court.
      </p>

      <div className="mt-6 space-y-6">
        <div className="space-y-3">
          <h3 className="font-medium text-gray-700">Your Executor</h3>
          <input
            type="text"
            placeholder="Full name"
            value={executor.name}
            onChange={(e) => updateAnswers({ executor: { ...executor, name: e.target.value } })}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Relationship (e.g., brother)"
              value={executor.relationship}
              onChange={(e) => updateAnswers({ executor: { ...executor, relationship: e.target.value } })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
            />
            <input
              type="text"
              placeholder="City, State"
              value={executor.cityState}
              onChange={(e) => updateAnswers({ executor: { ...executor, cityState: e.target.value } })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium text-gray-700">
            Backup Executor <span className="text-gray-400 font-normal">(recommended)</span>
          </h3>
          <input
            type="text"
            placeholder="Full name"
            value={alternateExecutor.name}
            onChange={(e) => updateAnswers({ alternateExecutor: { ...alternateExecutor, name: e.target.value } })}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Relationship"
              value={alternateExecutor.relationship}
              onChange={(e) => updateAnswers({ alternateExecutor: { ...alternateExecutor, relationship: e.target.value } })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
            />
            <input
              type="text"
              placeholder="City, State"
              value={alternateExecutor.cityState}
              onChange={(e) => updateAnswers({ alternateExecutor: { ...alternateExecutor, cityState: e.target.value } })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={waiveBond}
              onChange={(e) => updateAnswers({ waiveBond: e.target.checked })}
              className="mt-1 w-4 h-4 rounded border-gray-300 text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
            />
            <div>
              <span className="text-gray-700 font-medium">
                Waive the bond requirement
              </span>
              <span className="block text-xs text-gray-400 mt-0.5">
                A bond is like insurance the court can require. Waiving it saves money and speeds things up. Most people waive it.
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={executorCanSellProperty}
              onChange={(e) => updateAnswers({ executorCanSellProperty: e.target.checked })}
              className="mt-1 w-4 h-4 rounded border-gray-300 text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
            />
            <div>
              <span className="text-gray-700 font-medium">
                Allow executor to sell property if needed
              </span>
              <span className="block text-xs text-gray-400 mt-0.5">
                Sometimes your executor needs to sell a house or car to pay debts or distribute the estate fairly. This avoids extra court hearings.
              </span>
            </div>
          </label>
        </div>
      </div>
    </QuestionCard>
  );
}
