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

export default function DigitalAssets({ answers, updateAnswers, onNext, onPrev, isFirst, isLast, direction }: Props) {
  const { includeDigitalAssets, digitalExecutor, digitalInstructions, hasPasswordManager, passwordManagerLocation } = answers;

  return (
    <QuestionCard
      stepKey="digital"
      direction={direction}
      onNext={onNext}
      onPrev={onPrev}
      isFirst={isFirst}
      isLast={isLast}
      whyWeAsk="Most people have more digital property than they realize: email accounts, social media profiles, cloud photo storage, cryptocurrency wallets, domain names, online banking, streaming subscriptions, and more. Without instructions, your family may not know these accounts exist, may not be able to access them, and could lose irreplaceable photos or real money (especially crypto). A 'digital executor' is the person you authorize to access and manage these accounts. We don't put passwords in the will itself — because wills become public documents when filed with the court — but we can note where your executor should look to find login information (like a password manager or a sealed envelope in a safe). Many states have adopted the Revised Uniform Fiduciary Access to Digital Assets Act, which gives your executor legal authority to manage digital accounts if you grant it in your will."
    >
      <h2 className="text-2xl font-bold text-[var(--color-brand)]">
        Do you want to include instructions for your online accounts and digital stuff?
      </h2>
      <p className="mt-2 text-gray-500">
        Things like email, social media, photos in the cloud, cryptocurrency, websites you own.
      </p>

      {includeDigitalAssets === null && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button onClick={() => updateAnswers({ includeDigitalAssets: true })} className="py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-lg font-medium text-gray-700 transition-all">Yes</button>
          <button onClick={() => updateAnswers({ includeDigitalAssets: false })} className="py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-lg font-medium text-gray-700 transition-all">No, skip this</button>
        </div>
      )}

      {includeDigitalAssets === false && (
        <div className="mt-6">
          <p className="text-gray-500">Skipping digital assets.</p>
          <button onClick={() => updateAnswers({ includeDigitalAssets: null })} className="mt-2 text-sm text-[var(--color-accent)] hover:underline">Change answer</button>
        </div>
      )}

      {includeDigitalAssets === true && (
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Who should have access to your digital accounts?</label>
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Full name" value={digitalExecutor?.name ?? ""} onChange={(e) => updateAnswers({ digitalExecutor: { name: e.target.value, relationship: digitalExecutor?.relationship ?? "" } })} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent" />
              <input type="text" placeholder="Relationship" value={digitalExecutor?.relationship ?? ""} onChange={(e) => updateAnswers({ digitalExecutor: { name: digitalExecutor?.name ?? "", relationship: e.target.value } })} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Any specific instructions?</label>
            <textarea
              placeholder='e.g., "Delete my social media accounts" or "Keep my photos on Google Drive for the family"'
              value={digitalInstructions ?? ""}
              onChange={(e) => updateAnswers({ digitalInstructions: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Do you have a password manager or written list of passwords?</label>
            <div className="flex gap-3">
              <button onClick={() => updateAnswers({ hasPasswordManager: true })} className={`px-4 py-2 rounded-lg border ${hasPasswordManager === true ? "border-[var(--color-accent)] bg-green-50 text-[var(--color-accent)]" : "border-gray-200 text-gray-600"}`}>Yes</button>
              <button onClick={() => updateAnswers({ hasPasswordManager: false, passwordManagerLocation: undefined })} className={`px-4 py-2 rounded-lg border ${hasPasswordManager === false ? "border-[var(--color-accent)] bg-green-50 text-[var(--color-accent)]" : "border-gray-200 text-gray-600"}`}>No</button>
            </div>
          </div>

          {hasPasswordManager === true && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Where is it? <span className="text-gray-400 font-normal">(Don&apos;t type passwords — just the location)</span></label>
              <input type="text" placeholder='e.g., "In the fireproof safe" or "In 1Password, executor has the master password"' value={passwordManagerLocation ?? ""} onChange={(e) => updateAnswers({ passwordManagerLocation: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent" />
              <p className="mt-1 text-xs text-gray-400">We won&apos;t put passwords in the will — it becomes a public document. We just note where to look.</p>
            </div>
          )}

          <button onClick={() => updateAnswers({ includeDigitalAssets: null, digitalExecutor: undefined, digitalInstructions: undefined, hasPasswordManager: null, passwordManagerLocation: undefined })} className="text-sm text-gray-400 hover:text-gray-600">Actually, skip this</button>
        </div>
      )}
    </QuestionCard>
  );
}
