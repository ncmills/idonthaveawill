"use client";

import type { WillAnswers } from "@/lib/types";
import { getStateByAbbreviation } from "@/lib/stateData";
import QuestionCard from "../QuestionCard";

interface Props {
  answers: WillAnswers;
  updateAnswers: (partial: Partial<WillAnswers>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  direction: 1 | -1;
  goToStep: (index: number) => void;
}

function Section({ title, children, stepIndex, goToStep }: { title: string; children: React.ReactNode; stepIndex: number; goToStep: (i: number) => void }) {
  return (
    <div className="py-4 border-b border-gray-100 last:border-0">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-700">{title}</h3>
        <button onClick={() => goToStep(stepIndex)} className="text-sm text-[var(--color-accent)] hover:underline">Edit</button>
      </div>
      <div className="mt-1 text-sm text-gray-500">{children}</div>
    </div>
  );
}

export default function ReviewAnswers({ answers, onNext, onPrev, isFirst, isLast, direction, goToStep }: Props) {
  const state = getStateByAbbreviation(answers.state);
  const fullName = [answers.fullName.first, answers.fullName.middle, answers.fullName.last].filter(Boolean).join(" ");

  return (
    <QuestionCard stepKey="review" direction={direction} onNext={onNext} onPrev={onPrev} isFirst={isFirst} isLast={isLast} nextLabel="Generate My Will" whyWeAsk="This is your chance to double-check every detail before we generate your draft. Names must be spelled exactly right — a misspelled name can cause real problems in probate court. Percentages must add up to 100%. Make sure the people you've named as executor and guardian are people you've actually talked to (or plan to). Click 'Edit' on any section to go back. Once you generate the draft, we strongly recommend having it reviewed by a licensed attorney in your state before you sign it.">
      <h2 className="text-2xl font-bold text-[var(--color-brand)]">
        Review everything before we generate your will
      </h2>
      <p className="mt-2 text-gray-500">Make sure everything looks right. You can edit any section.</p>

      <div className="mt-6 bg-gray-50 rounded-xl p-4 divide-y divide-gray-100">
        <Section title="Your Information" stepIndex={0} goToStep={goToStep}>
          <p><strong>{fullName}</strong></p>
          <p>{answers.city}, {answers.county} County, {state?.state ?? answers.state}</p>
          <p>DOB: {answers.dateOfBirth}</p>
        </Section>

        <Section title="Marital Status" stepIndex={2} goToStep={goToStep}>
          <p className="capitalize">{answers.maritalStatus || "Not set"}</p>
          {answers.spouseName && <p>Spouse: {answers.spouseName}</p>}
        </Section>

        <Section title="Children" stepIndex={3} goToStep={goToStep}>
          {answers.hasChildren === false && <p>No children</p>}
          {answers.children.map((c, i) => (
            <p key={i}>{c.name} — {c.relationship}{c.hasSpecialNeeds ? " (special needs)" : ""}</p>
          ))}
        </Section>

        {answers.guardian && (
          <Section title="Guardians" stepIndex={4} goToStep={goToStep}>
            <p>Primary: {answers.guardian.name} ({answers.guardian.relationship})</p>
            {answers.alternateGuardian?.name && <p>Backup: {answers.alternateGuardian.name}</p>}
            {answers.inheritanceAge && <p>Inheritance age: {answers.inheritanceAge}</p>}
          </Section>
        )}

        <Section title="Executor" stepIndex={5} goToStep={goToStep}>
          <p>{answers.executor.name} ({answers.executor.relationship})</p>
          {answers.alternateExecutor.name && <p>Backup: {answers.alternateExecutor.name}</p>}
          <p>{answers.waiveBond ? "Bond waived" : "Bond required"} &middot; {answers.executorCanSellProperty ? "Can sell property" : "Cannot sell property"}</p>
        </Section>

        <Section title="Specific Gifts" stepIndex={6} goToStep={goToStep}>
          {answers.hasSpecificBequests === false && <p>None</p>}
          {answers.specificBequests.map((b, i) => (
            <p key={i}>{b.item} &rarr; {b.recipient.name}</p>
          ))}
        </Section>

        <Section title="Everything Else (Residuary)" stepIndex={7} goToStep={goToStep}>
          {answers.residuaryBeneficiaries.map((b, i) => (
            <p key={i}>{b.name} ({b.relationship}) — {b.percentage}%</p>
          ))}
        </Section>

        <Section title="Digital Assets" stepIndex={8} goToStep={goToStep}>
          {answers.includeDigitalAssets === false ? <p>Skipped</p> : (
            <>
              {answers.digitalExecutor?.name && <p>Digital executor: {answers.digitalExecutor.name}</p>}
              {answers.digitalInstructions && <p>{answers.digitalInstructions}</p>}
            </>
          )}
        </Section>

        <Section title="Debts & Expenses" stepIndex={9} goToStep={goToStep}>
          <p>{answers.debtHandling === "general" ? "Pay from general estate" : answers.debtInstructions || "Not set"}</p>
        </Section>

        <Section title="Final Wishes" stepIndex={10} goToStep={goToStep}>
          {answers.hasFuneralWishes === false ? <p>Skipped</p> : (
            <>
              {answers.funeralWishes?.preferBurial && <p>Prefers burial</p>}
              {answers.funeralWishes?.preferCremation && <p>Prefers cremation</p>}
              {answers.funeralWishes?.specificLocation && <p>Location: {answers.funeralWishes.specificLocation}</p>}
            </>
          )}
        </Section>

        {answers.pets.length > 0 && (
          <Section title="Pets" stepIndex={11} goToStep={goToStep}>
            {answers.pets.map((p, i) => (
              <p key={i}>{p.description} &rarr; {p.caretaker.name}{p.careFund ? ` ($${p.careFundAmount})` : ""}</p>
            ))}
          </Section>
        )}

        {answers.disinheritances.length > 0 && (
          <Section title="Exclusions" stepIndex={12} goToStep={goToStep}>
            {answers.disinheritances.map((d, i) => <p key={i}>{d.name} ({d.relationship})</p>)}
          </Section>
        )}

        {answers.simultaneousDeathBeneficiary?.name && (
          <Section title="Simultaneous Death" stepIndex={13} goToStep={goToStep}>
            <p>{answers.simultaneousDeathBeneficiary.name} ({answers.simultaneousDeathBeneficiary.relationship})</p>
          </Section>
        )}

        <Section title="No-Contest Clause" stepIndex={14} goToStep={goToStep}>
          <p>{answers.includeNoContest === true ? "Included" : answers.includeNoContest === false ? "Not included" : "Not set"}</p>
        </Section>
      </div>

      <p className="mt-4 text-xs text-gray-400 text-center">
        By clicking &quot;Generate My Will,&quot; you confirm that the information above is accurate. This tool creates a legal document — not legal advice. For complex situations, consult an attorney.
      </p>
    </QuestionCard>
  );
}
