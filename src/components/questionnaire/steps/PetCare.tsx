"use client";

import type { WillAnswers, Pet } from "@/lib/types";
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

const emptyPet: Pet = { description: "", caretaker: { name: "", relationship: "" }, careFund: false };

export default function PetCare({ answers, updateAnswers, onNext, onPrev, isFirst, isLast, direction }: Props) {
  const { hasPets, pets } = answers;

  function addPet() { updateAnswers({ pets: [...pets, { ...emptyPet }] }); }
  function updatePet(i: number, partial: Partial<Pet>) { updateAnswers({ pets: pets.map((p, j) => j === i ? { ...p, ...partial } : p) }); }
  function removePet(i: number) { updateAnswers({ pets: pets.filter((_, j) => j !== i) }); }

  return (
    <QuestionCard stepKey="pets" direction={direction} onNext={onNext} onPrev={onPrev} isFirst={isFirst} isLast={isLast} whyWeAsk="Under the law, pets are considered property — they can't inherit money or be named as beneficiaries. But you can do two important things: (1) name a specific person to take care of your pet, so they don't end up at a shelter, and (2) set aside a dollar amount from your estate to cover the pet's food, vet bills, and other expenses. Without this, your pet's fate is up to whoever ends up handling your estate, and they may not be an animal person. Some states also allow formal 'pet trusts' for ongoing care, but naming a caretaker and setting aside funds in your will is the simplest approach and works in every state.">
      <h2 >Do you have any pets you want to make plans for?</h2>

      {hasPets === null && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button onClick={() => updateAnswers({ hasPets: true, pets: [{ ...emptyPet }] })} className="py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-lg font-medium text-gray-700 transition-all">Yes</button>
          <button onClick={() => updateAnswers({ hasPets: false, pets: [] })} className="py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-lg font-medium text-gray-700 transition-all">No</button>
        </div>
      )}

      {hasPets === false && (
        <div className="mt-6"><p className="text-gray-500">No pets — skipping.</p><button onClick={() => updateAnswers({ hasPets: null })} className="mt-2 text-sm text-[var(--color-accent)] hover:underline">Change answer</button></div>
      )}

      {hasPets === true && (
        <div className="mt-6 space-y-4">
          {pets.map((pet, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-xl space-y-3">
              <div className="flex justify-between"><span className="text-sm font-medium text-gray-500">Pet {i + 1}</span>{pets.length > 1 && <button onClick={() => removePet(i)} className="text-sm text-red-500">Remove</button>}</div>
              <input type="text" placeholder='e.g., "My golden retriever, Max"' value={pet.description} onChange={(e) => updatePet(i, { description: e.target.value })} className="iha-input" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="text" placeholder="Caretaker's name" value={pet.caretaker.name} onChange={(e) => updatePet(i, { caretaker: { ...pet.caretaker, name: e.target.value } })} className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent" />
                <input type="text" placeholder="Relationship" value={pet.caretaker.relationship} onChange={(e) => updatePet(i, { caretaker: { ...pet.caretaker, relationship: e.target.value } })} className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent" />
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={pet.careFund} onChange={(e) => updatePet(i, { careFund: e.target.checked })} className="w-5 h-5 rounded border-gray-300 text-[var(--color-accent)]" />
                Set aside money for their care
              </label>
              {pet.careFund && (
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  <input type="number" placeholder="Amount" value={pet.careFundAmount ?? ""} onChange={(e) => updatePet(i, { careFundAmount: Number(e.target.value) })} className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent" />
                </div>
              )}
            </div>
          ))}
          <button onClick={addPet} className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors">+ Add another pet</button>
          <button onClick={() => updateAnswers({ hasPets: null, pets: [] })} className="text-sm text-gray-400 hover:text-gray-600">Actually, no pets</button>
        </div>
      )}
    </QuestionCard>
  );
}
