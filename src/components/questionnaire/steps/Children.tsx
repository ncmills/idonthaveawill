"use client";

import type { WillAnswers, Child } from "@/lib/types";
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

const emptyChild: Child = {
  name: "",
  dateOfBirth: "",
  relationship: "biological",
  hasSpecialNeeds: false,
};

export default function Children({ answers, updateAnswers, onNext, onPrev, isFirst, isLast, direction }: Props) {
  const { hasChildren, children } = answers;

  const canProceed =
    hasChildren === false ||
    (hasChildren === true &&
      children.length > 0 &&
      children.every((c) => c.name.trim() !== "" && c.dateOfBirth !== ""));

  function addChild() {
    updateAnswers({ children: [...children, { ...emptyChild }] });
  }

  function updateChild(index: number, partial: Partial<Child>) {
    const updated = children.map((c, i) =>
      i === index ? { ...c, ...partial } : c
    );
    updateAnswers({ children: updated });
  }

  function removeChild(index: number) {
    updateAnswers({ children: children.filter((_, i) => i !== index) });
  }

  return (
    <QuestionCard
      stepKey="children"
      direction={direction}
      onNext={onNext}
      onPrev={onPrev}
      isFirst={isFirst}
      isLast={isLast}
      nextDisabled={!canProceed}
      whyWeAsk="Children are one of the most important parts of a will. You may want to leave them something, name someone to take care of them if they're young, or — in some states — the law requires you to leave them a share."
    >
      <h2 className="text-2xl font-bold text-[var(--color-brand)]">
        Do you have any children?
      </h2>

      {hasChildren === null && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              updateAnswers({ hasChildren: true, children: [{ ...emptyChild }] });
            }}
            className="py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-lg font-medium text-gray-700 transition-all"
          >
            Yes
          </button>
          <button
            onClick={() => {
              updateAnswers({ hasChildren: false, children: [] });
            }}
            className="py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-lg font-medium text-gray-700 transition-all"
          >
            No
          </button>
        </div>
      )}

      {hasChildren === false && (
        <div className="mt-6">
          <p className="text-gray-500">No children — got it. We&apos;ll skip the guardian questions.</p>
          <button
            onClick={() => updateAnswers({ hasChildren: null })}
            className="mt-2 text-sm text-[var(--color-accent)] hover:underline"
          >
            Change answer
          </button>
        </div>
      )}

      {hasChildren === true && (
        <div className="mt-6 space-y-6">
          <p className="text-gray-600">Tell us about each child.</p>

          {children.map((child, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">
                  Child {i + 1}
                </span>
                {children.length > 1 && (
                  <button
                    onClick={() => removeChild(i)}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>

              <input
                type="text"
                placeholder="Full legal name"
                value={child.name}
                onChange={(e) => updateChild(i, { name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Date of birth</label>
                  <input
                    type="date"
                    value={child.dateOfBirth}
                    onChange={(e) => updateChild(i, { dateOfBirth: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Relationship</label>
                  <select
                    value={child.relationship}
                    onChange={(e) =>
                      updateChild(i, {
                        relationship: e.target.value as Child["relationship"],
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent bg-white"
                  >
                    <option value="biological">Biological</option>
                    <option value="adopted">Adopted</option>
                    <option value="stepchild">Stepchild</option>
                  </select>
                </div>
              </div>

              {child.relationship === "stepchild" && (
                <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded-lg">
                  Stepchildren don&apos;t automatically have inheritance rights unless specifically named in your will. We&apos;ll make sure they&apos;re included.
                </p>
              )}

              {child.dateOfBirth && getAge(child.dateOfBirth) < 18 && (
                <p className="text-xs text-blue-700 bg-blue-50 p-2 rounded-lg">
                  {child.name || "This child"} is a minor. We&apos;ll ask about guardians next.
                </p>
              )}

              {/* Special needs */}
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={child.hasSpecialNeeds}
                  onChange={(e) => updateChild(i, { hasSpecialNeeds: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                />
                This child has a disability or special needs
              </label>

              {child.hasSpecialNeeds && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                  <strong>Important:</strong> For {child.name || "this child"}, we strongly recommend consulting an estate planning attorney about a Special Needs Trust. Leaving money directly to someone with special needs could disqualify them from government benefits like Medicaid or SSI. A simple will isn&apos;t the right tool here.
                </div>
              )}

              {answers.state === "LA" && child.dateOfBirth && getAge(child.dateOfBirth) < 24 && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                  <strong>Louisiana law:</strong> {child.name || "This child"} is under 24 and is a &quot;forced heir.&quot; Louisiana requires you to leave them a share of your estate. We&apos;ll build this in automatically.
                </div>
              )}
            </div>
          ))}

          <button
            onClick={addChild}
            className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
          >
            + Add another child
          </button>

          <button
            onClick={() => updateAnswers({ hasChildren: null, children: [] })}
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            Actually, I don&apos;t have children
          </button>
        </div>
      )}
    </QuestionCard>
  );
}
