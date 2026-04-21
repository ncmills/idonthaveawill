"use client";

import type { WillAnswers, Person } from "@/lib/types";
import {
  isCommunityPropertyStateClient,
  getStateSlim,
} from "@/lib/stateDataClient";
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

export default function Disinheritance({ answers, updateAnswers, onNext, onPrev, isFirst, isLast, direction }: Props) {
  const { hasDisinheritances, disinheritances } = answers;
  const stateReqs = getStateSlim(answers.state);

  function addPerson() { updateAnswers({ disinheritances: [...disinheritances, { name: "", relationship: "" }] }); }
  function updatePerson(i: number, partial: Partial<Person>) { updateAnswers({ disinheritances: disinheritances.map((d, j) => j === i ? { ...d, ...partial } : d) }); }
  function removePerson(i: number) { updateAnswers({ disinheritances: disinheritances.filter((_, j) => j !== i) }); }

  return (
    <QuestionCard stepKey="disinherit" direction={direction} onNext={onNext} onPrev={onPrev} isFirst={isFirst} isLast={isLast} whyWeAsk="If you leave someone out of your will — especially a spouse or child — and don't say it was intentional, they can go to court and argue it was an accident or that you forgot about them. This is called a 'pretermitted heir' claim, and courts sometimes award them a share as if you'd died without a will. By explicitly stating the exclusion is intentional, you make it much harder for them to challenge successfully. That said, there are legal limits: in Louisiana, you cannot disinherit children under 24 (they're 'forced heirs'). In community property states, your spouse always owns their half regardless. And in most other states, a surviving spouse can claim an 'elective share' (typically one-third) even if you left them nothing. An attorney can advise on the specific limitations in your state.">
      <h2 >
        Is there anyone you want to specifically exclude?
      </h2>
      <p className="mt-2 text-gray-500">For example, an estranged child or a relative you don&apos;t want to receive anything.</p>

      {hasDisinheritances === null && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button onClick={() => updateAnswers({ hasDisinheritances: true, disinheritances: [{ name: "", relationship: "" }] })} className="py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-lg font-medium text-gray-700 transition-all">Yes</button>
          <button onClick={() => updateAnswers({ hasDisinheritances: false, disinheritances: [] })} className="py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-lg font-medium text-gray-700 transition-all">No, everyone is covered</button>
        </div>
      )}

      {hasDisinheritances === false && (
        <div className="mt-6"><p className="text-gray-500">No exclusions needed.</p><button onClick={() => updateAnswers({ hasDisinheritances: null })} className="mt-2 text-sm text-[var(--color-accent)] hover:underline">Change answer</button></div>
      )}

      {hasDisinheritances === true && (
        <div className="mt-6 space-y-4">
          {/* State-specific warnings */}
          {answers.state === "LA" && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
              <strong>Louisiana law:</strong> You cannot fully disinherit children under 24 or children with disabilities — they are &quot;forced heirs.&quot; We&apos;ll include the required share automatically.
            </div>
          )}
          {isCommunityPropertyStateClient(answers.state) && answers.state !== "LA" && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
              You can exclude your spouse from your will, but they still have a right to their half of community property. Your will can only control YOUR half.
            </div>
          )}
          {answers.state === "GA" && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
              Georgia is one of the only states where you CAN fully disinherit a spouse (there&apos;s no elective share). We&apos;ll include clear language.
            </div>
          )}
          {stateReqs && !isCommunityPropertyStateClient(answers.state) && answers.state !== "GA" && answers.state !== "LA" && answers.maritalStatus === "married" && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
              In {stateReqs.state}, your spouse has a legal right to claim a portion of your estate even if you leave them nothing. Your will can express your wish, but the law may override it.
            </div>
          )}

          {disinheritances.map((d, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex justify-between mb-2"><span className="text-sm font-medium text-gray-500">Person {i + 1}</span>{disinheritances.length > 1 && <button onClick={() => removePerson(i)} className="text-sm text-red-500">Remove</button>}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="text" placeholder="Full name" value={d.name} onChange={(e) => updatePerson(i, { name: e.target.value })} className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent" />
                <input type="text" placeholder="Relationship" value={d.relationship} onChange={(e) => updatePerson(i, { relationship: e.target.value })} className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent" />
              </div>
            </div>
          ))}
          <button onClick={addPerson} className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors">+ Add another person</button>
          <button onClick={() => updateAnswers({ hasDisinheritances: null, disinheritances: [] })} className="text-sm text-gray-400 hover:text-gray-600">Actually, no exclusions</button>
        </div>
      )}
    </QuestionCard>
  );
}
