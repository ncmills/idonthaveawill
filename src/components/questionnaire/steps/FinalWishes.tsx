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

export default function FinalWishes({ answers, updateAnswers, onNext, onPrev, isFirst, isLast, direction }: Props) {
  const wishes = answers.funeralWishes ?? {
    preferBurial: false,
    preferCremation: false,
  };

  function setWishes(partial: Partial<NonNullable<WillAnswers["funeralWishes"]>>) {
    updateAnswers({ funeralWishes: { ...wishes, ...partial } });
  }

  return (
    <QuestionCard
      stepKey="funeral"
      direction={direction}
      onNext={onNext}
      onPrev={onPrev}
      isFirst={isFirst}
      isLast={isLast}
      whyWeAsk="This section is entirely optional, but it can be a real gift to your family. When someone passes away, their loved ones are grieving and often unsure what the person would have wanted. By writing down your preferences — burial vs. cremation, a specific cemetery, a religious service, or even 'keep it simple' — you remove that guesswork and potential family disagreements. Important: funeral wishes in a will are generally not legally binding (because the will often isn't read until after the funeral), but they clearly document your intent. Many people also share these wishes separately with their executor or family. If you have strong preferences, writing them here and telling someone close to you is the best approach."
    >
      <h2 className="text-2xl font-bold text-[var(--color-brand)]">
        Do you have any preferences for your funeral or burial?
      </h2>

      {answers.hasFuneralWishes === null && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button onClick={() => updateAnswers({ hasFuneralWishes: true })} className="py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-lg font-medium text-gray-700 transition-all">Yes</button>
          <button onClick={() => updateAnswers({ hasFuneralWishes: false, funeralWishes: undefined })} className="py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-lg font-medium text-gray-700 transition-all">No, skip this</button>
        </div>
      )}

      {answers.hasFuneralWishes === false && (
        <div className="mt-6">
          <p className="text-gray-500">No funeral preferences — skipping.</p>
          <button onClick={() => updateAnswers({ hasFuneralWishes: null })} className="mt-2 text-sm text-[var(--color-accent)] hover:underline">Change answer</button>
        </div>
      )}

      {answers.hasFuneralWishes === true && (
        <div className="mt-6 space-y-4">
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={wishes.preferBurial} onChange={(e) => setWishes({ preferBurial: e.target.checked, preferCremation: e.target.checked ? false : wishes.preferCremation })} className="w-5 h-5 rounded border-gray-300 text-[var(--color-accent)] focus:ring-[var(--color-accent)]" />
              <span className="text-gray-700">I prefer to be buried</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={wishes.preferCremation} onChange={(e) => setWishes({ preferCremation: e.target.checked, preferBurial: e.target.checked ? false : wishes.preferBurial })} className="w-5 h-5 rounded border-gray-300 text-[var(--color-accent)] focus:ring-[var(--color-accent)]" />
              <span className="text-gray-700">I prefer to be cremated</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specific cemetery or location? <span className="text-gray-400">(optional)</span></label>
            <input type="text" placeholder="e.g., Green Hills Cemetery, Springfield" value={wishes.specificLocation ?? ""} onChange={(e) => setWishes({ specificLocation: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Religious service preferences? <span className="text-gray-400">(optional)</span></label>
            <input type="text" placeholder="e.g., Catholic mass at St. Mary's" value={wishes.religiousService ?? ""} onChange={(e) => setWishes({ religiousService: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Other instructions? <span className="text-gray-400">(optional)</span></label>
            <textarea placeholder='e.g., "Keep it simple — no flowers" or "Play my favorite song"' value={wishes.otherInstructions ?? ""} onChange={(e) => setWishes({ otherInstructions: e.target.value })} rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent resize-none" />
          </div>

          <button onClick={() => updateAnswers({ hasFuneralWishes: null, funeralWishes: undefined })} className="text-sm text-gray-400 hover:text-gray-600">Actually, skip this</button>
        </div>
      )}
    </QuestionCard>
  );
}
