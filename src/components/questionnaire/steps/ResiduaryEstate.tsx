"use client";

import type { WillAnswers, ResiduaryBeneficiary } from "@/lib/types";
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

export default function ResiduaryEstate({ answers, updateAnswers, onNext, onPrev, isFirst, isLast, direction }: Props) {
  const { residuaryType, residuaryBeneficiaries, residuaryAlternate } = answers;

  const total = residuaryBeneficiaries.reduce((sum, b) => sum + (b.percentage || 0), 0);

  const canProceed =
    residuaryType === "single"
      ? residuaryBeneficiaries.length === 1 && residuaryBeneficiaries[0].name.trim() !== ""
      : residuaryType === "split"
      ? residuaryBeneficiaries.length >= 2 &&
        residuaryBeneficiaries.every((b) => b.name.trim() !== "" && b.percentage > 0) &&
        total === 100
      : false;

  function setSingle() {
    updateAnswers({
      residuaryType: "single",
      residuaryBeneficiaries: [{ name: "", relationship: "", percentage: 100 }],
    });
  }

  function setSplit() {
    updateAnswers({
      residuaryType: "split",
      residuaryBeneficiaries: [
        { name: "", relationship: "", percentage: 50 },
        { name: "", relationship: "", percentage: 50 },
      ],
    });
  }

  function updateBeneficiary(index: number, partial: Partial<ResiduaryBeneficiary>) {
    const updated = residuaryBeneficiaries.map((b, i) =>
      i === index ? { ...b, ...partial } : b
    );
    updateAnswers({ residuaryBeneficiaries: updated });
  }

  function addBeneficiary() {
    updateAnswers({
      residuaryBeneficiaries: [...residuaryBeneficiaries, { name: "", relationship: "", percentage: 0 }],
    });
  }

  function removeBeneficiary(index: number) {
    updateAnswers({
      residuaryBeneficiaries: residuaryBeneficiaries.filter((_, i) => i !== index),
    });
  }

  return (
    <QuestionCard
      stepKey="residuary"
      direction={direction}
      onNext={onNext}
      onPrev={onPrev}
      isFirst={isFirst}
      isLast={isLast}
      nextDisabled={!canProceed}
      whyWeAsk="After your specific gifts are distributed, everything left over is called your 'residuary estate.' This is usually the biggest part of a will because it catches everything you didn't specifically mention — your bank accounts, investments, retirement funds, furniture, clothing, electronics, and anything else you own. It also catches things you might acquire in the future that aren't covered by a specific gift. Most people leave their residuary estate to their spouse, split it among their children, or name one primary person with a backup. We ask for a backup because if your primary beneficiary dies before you and there's no backup named, the court has to figure out where it goes using your state's default rules — which may not be what you want. If you split it among multiple people, the percentages must add up to 100%."
    >
      <h2 className="text-2xl font-bold text-[var(--color-brand)]">
        After any specific gifts, who should get everything else you own?
      </h2>
      <p className="mt-2 text-gray-500">
        This covers anything not specifically mentioned — bank accounts, investments, furniture, clothes, and anything else.
      </p>

      {residuaryType === "" && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button onClick={setSingle} className="py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-base sm:text-lg font-medium text-gray-700 transition-all">
            One person gets everything
          </button>
          <button onClick={setSplit} className="py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-base sm:text-lg font-medium text-gray-700 transition-all">
            Split between multiple people
          </button>
        </div>
      )}

      {residuaryType === "single" && (
        <div className="mt-6 space-y-4">
          <div className="space-y-3">
            <h3 className="font-medium text-gray-700">Who gets everything else?</h3>
            <input
              type="text"
              placeholder="Full name"
              value={residuaryBeneficiaries[0]?.name ?? ""}
              onChange={(e) => updateBeneficiary(0, { name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Relationship (e.g., spouse, son)"
              value={residuaryBeneficiaries[0]?.relationship ?? ""}
              onChange={(e) => updateBeneficiary(0, { relationship: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
            />
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-gray-700">If that person passes away before you, who&apos;s the backup?</h3>
            <input
              type="text"
              placeholder="Full name"
              value={residuaryAlternate?.name ?? ""}
              onChange={(e) => updateAnswers({ residuaryAlternate: { name: e.target.value, relationship: residuaryAlternate?.relationship ?? "" } })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Relationship"
              value={residuaryAlternate?.relationship ?? ""}
              onChange={(e) => updateAnswers({ residuaryAlternate: { name: residuaryAlternate?.name ?? "", relationship: e.target.value } })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
            />
          </div>

          <button onClick={() => updateAnswers({ residuaryType: "" })} className="text-sm text-gray-400 hover:text-gray-600">Change answer</button>
        </div>
      )}

      {residuaryType === "split" && (
        <div className="mt-6 space-y-4">
          <div className={`text-sm font-medium ${total === 100 ? "text-green-600" : "text-amber-600"}`}>
            Total: {total}% {total !== 100 && "(must equal 100%)"}
          </div>

          {residuaryBeneficiaries.map((b, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Person {i + 1}</span>
                {residuaryBeneficiaries.length > 2 && (
                  <button onClick={() => removeBeneficiary(i)} className="text-sm text-red-500 hover:text-red-700">Remove</button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input type="text" placeholder="Full name" value={b.name} onChange={(e) => updateBeneficiary(i, { name: e.target.value })} className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent" />
                <input type="text" placeholder="Relationship" value={b.relationship} onChange={(e) => updateBeneficiary(i, { relationship: e.target.value })} className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent" />
                <div className="relative">
                  <input type="number" min="0" max="100" placeholder="%" value={b.percentage || ""} onChange={(e) => updateBeneficiary(i, { percentage: Number(e.target.value) })} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">%</span>
                </div>
              </div>
            </div>
          ))}

          <button onClick={addBeneficiary} className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors">+ Add another person</button>

          <div>
            <h3 className="font-medium text-gray-700">If one of these people passes away before you?</h3>
            <select
              value={answers.residuaryAlternateRule ?? "split_among_others"}
              onChange={(e) => updateAnswers({ residuaryAlternateRule: e.target.value as WillAnswers["residuaryAlternateRule"] })}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent bg-white"
            >
              <option value="split_among_others">Split their share among the others</option>
              <option value="their_children">Their share goes to their children</option>
              <option value="specific_person">Name someone specific</option>
            </select>
          </div>

          <button onClick={() => updateAnswers({ residuaryType: "" })} className="text-sm text-gray-400 hover:text-gray-600">Change answer</button>
        </div>
      )}
    </QuestionCard>
  );
}
