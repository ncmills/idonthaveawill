"use client";

import type { WillAnswers, SpecificBequest, Person } from "@/lib/types";
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

const emptyBequest: SpecificBequest = {
  item: "",
  recipient: { name: "", relationship: "" },
  isRealEstate: false,
  alternateDisposition: "residuary",
};

export default function SpecificBequests({ answers, updateAnswers, onNext, onPrev, isFirst, isLast, direction }: Props) {
  const { hasSpecificBequests, specificBequests } = answers;

  const canProceed =
    hasSpecificBequests === false ||
    (hasSpecificBequests === true &&
      specificBequests.length > 0 &&
      specificBequests.every(
        (b) => b.item.trim() !== "" && b.recipient.name.trim() !== ""
      ));

  function addBequest() {
    updateAnswers({ specificBequests: [...specificBequests, { ...emptyBequest }] });
  }

  function updateBequest(index: number, partial: Partial<SpecificBequest>) {
    const updated = specificBequests.map((b, i) =>
      i === index ? { ...b, ...partial } : b
    );
    updateAnswers({ specificBequests: updated });
  }

  function removeBequest(index: number) {
    updateAnswers({ specificBequests: specificBequests.filter((_, i) => i !== index) });
  }

  return (
    <QuestionCard
      stepKey="bequests"
      direction={direction}
      onNext={onNext}
      onPrev={onPrev}
      isFirst={isFirst}
      isLast={isLast}
      nextDisabled={!canProceed}
      whyWeAsk="Specific gifts (lawyers call them 'specific bequests') let you say exactly which items go to exactly which people. Without them, everything goes into one big pot and gets divided according to the percentages you set in the next step. Examples of specific gifts: 'My diamond engagement ring to my daughter Sarah,' '$10,000 to my brother Mike,' 'My 2022 Toyota Camry to my nephew James,' or 'My savings account at Chase Bank ending in 4521 to my sister.' You can give away physical items, dollar amounts, specific bank accounts, real estate, or anything else you own. For each gift, we also ask what happens if that person dies before you do — because if they're gone and you haven't said what to do, the gift may fall back into your general estate or get tied up in court. For real estate, we ask for the full address so the property is clearly identified in the will — vague descriptions can cause disputes."
    >
      <h2 className="text-2xl font-bold text-[var(--color-brand)]">
        Do you want to leave any specific items to specific people?
      </h2>
      <p className="mt-2 text-gray-500">
        For example: &quot;My wedding ring goes to my daughter Sarah&quot; or &quot;$10,000 to my brother Mike.&quot;
      </p>

      {hasSpecificBequests === null && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => updateAnswers({ hasSpecificBequests: true, specificBequests: [{ ...emptyBequest }] })}
            className="py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-lg font-medium text-gray-700 transition-all"
          >
            Yes, I have specific items
          </button>
          <button
            onClick={() => updateAnswers({ hasSpecificBequests: false, specificBequests: [] })}
            className="py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-lg font-medium text-gray-700 transition-all"
          >
            No, skip this
          </button>
        </div>
      )}

      {hasSpecificBequests === false && (
        <div className="mt-6">
          <p className="text-gray-500">No specific gifts — everything will go through your general estate.</p>
          <button
            onClick={() => updateAnswers({ hasSpecificBequests: null })}
            className="mt-2 text-sm text-[var(--color-accent)] hover:underline"
          >
            Change answer
          </button>
        </div>
      )}

      {hasSpecificBequests === true && (
        <div className="mt-6 space-y-6">
          {specificBequests.map((bequest, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Gift {i + 1}</span>
                {specificBequests.length > 1 && (
                  <button type="button" onClick={() => removeBequest(i)} className="text-sm text-red-500 hover:text-red-700">Remove</button>
                )}
              </div>

              <div>
                <label htmlFor={`bequest-item-${i}`} className="block text-xs text-gray-500 mb-1">What do you want to give?</label>
                <input
                  id={`bequest-item-${i}`}
                  type="text"
                  placeholder='e.g., "My diamond engagement ring" or "$10,000"'
                  value={bequest.item}
                  onChange={(e) => updateBequest(i, { item: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor={`bequest-recipient-${i}`} className="block text-xs text-gray-500 mb-1">Who gets it?</label>
                  <input
                    id={`bequest-recipient-${i}`}
                    type="text"
                    placeholder="Full name"
                    value={bequest.recipient.name}
                    onChange={(e) => updateBequest(i, { recipient: { ...bequest.recipient, name: e.target.value } })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor={`bequest-relationship-${i}`} className="block text-xs text-gray-500 mb-1">Relationship</label>
                  <input
                    id={`bequest-relationship-${i}`}
                    type="text"
                    placeholder="e.g., daughter"
                    value={bequest.recipient.relationship}
                    onChange={(e) => updateBequest(i, { recipient: { ...bequest.recipient, relationship: e.target.value } })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={`bequest-alternate-${i}`} className="block text-xs text-gray-500 mb-1">If that person passes away before you?</label>
                <select
                  id={`bequest-alternate-${i}`}
                  value={bequest.alternateDisposition}
                  onChange={(e) => updateBequest(i, { alternateDisposition: e.target.value as SpecificBequest["alternateDisposition"] })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent bg-white"
                >
                  <option value="residuary">Goes back into the rest of my estate</option>
                  <option value="their_children">Goes to their children</option>
                  <option value="specific_person">Goes to someone else</option>
                </select>
              </div>

              {bequest.alternateDisposition === "specific_person" && (
                <input
                  type="text"
                  placeholder="Alternate recipient's full name"
                  value={bequest.alternatePerson?.name ?? ""}
                  onChange={(e) => updateBequest(i, { alternatePerson: { name: e.target.value, relationship: bequest.alternatePerson?.relationship ?? "" } as Person })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                />
              )}

              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bequest.isRealEstate}
                  onChange={(e) => updateBequest(i, { isRealEstate: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                />
                This is real estate (house, land, condo)
              </label>

              {bequest.isRealEstate && (
                <input
                  type="text"
                  placeholder="Full property address"
                  value={bequest.propertyAddress ?? ""}
                  onChange={(e) => updateBequest(i, { propertyAddress: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                />
              )}
            </div>
          ))}

          <button
            onClick={addBequest}
            className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
          >
            + Add another specific gift
          </button>

          <button
            onClick={() => updateAnswers({ hasSpecificBequests: null, specificBequests: [] })}
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            Actually, I don&apos;t have specific gifts
          </button>
        </div>
      )}
    </QuestionCard>
  );
}
