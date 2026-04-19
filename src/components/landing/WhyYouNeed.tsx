"use client";

import { useState } from "react";

const reasons = [
  {
    number: "01",
    title: "Without a will, the state decides everything.",
    body: "If you die without a will, a judge you've never met decides who gets your house, your savings, and who raises your kids. Every state has a default formula — and it probably doesn't match what you'd want.",
  },
  {
    number: "02",
    title: "Sixty-seven percent of Americans don't have a will.",
    body: "Most people put it off because they think it's complicated or expensive. It doesn't have to be.",
  },
  {
    number: "03",
    title: "Your family deserves clarity, not a courtroom.",
    body: "Dying without a will can mean months of probate court, legal fees, and family arguments. A simple will prevents all of that.",
  },
  {
    number: "04",
    title: "It's not just for rich people.",
    body: "You don't need a mansion or a stock portfolio. If you have a bank account, a car, a phone, or a child — you need a will.",
  },
];

const checklistItems = [
  "Do you own anything?",
  "Do you have a bank account?",
  "Do you have kids?",
  "Do you rent or own a home?",
];

export default function WhyYouNeed() {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(checklistItems.length).fill(false)
  );

  const anyChecked = checked.some(Boolean);

  return (
    <section className="py-24 md:py-32 bg-[var(--color-cream)]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center">
          <p className="iha-caps">Chapter One</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[34px] md:text-[44px] font-medium text-[var(--color-ink)] leading-tight tracking-[-0.01em]">
            Why you need one.
          </h2>
          <p className="mt-4 font-[family-name:var(--font-display)] italic text-[18px] text-[var(--color-ink-soft)] max-w-xl mx-auto">
            It&apos;s not about dying. It&apos;s about making sure the people you love are taken care of.
          </p>
        </div>

        <ol className="mt-20 space-y-20 md:space-y-24">
          {reasons.map((r, i) => {
            const isRight = i % 2 === 1;
            return (
              <li
                key={r.number}
                className={`flex flex-col gap-4 ${
                  isRight ? "md:ml-auto md:text-right md:items-end" : "md:text-left md:items-start"
                } md:max-w-[80%]`}
              >
                <span
                  className="font-[family-name:var(--font-display)] italic text-[var(--color-sage)] text-[20px] tracking-wide"
                  aria-hidden="true"
                >
                  {r.number}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-[26px] sm:text-[30px] md:text-[32px] font-medium text-[var(--color-ink)] leading-[1.2] tracking-[-0.01em]">
                  {r.title}
                </h3>
                <p className="text-[16px] text-[var(--color-ink-soft)] leading-relaxed max-w-[52ch]">
                  {r.body}
                </p>
              </li>
            );
          })}
        </ol>

        {/* Editorial rule */}
        <div className="mt-24 flex items-center gap-4">
          <hr className="iha-rule flex-1" />
          <span className="iha-caps">A brief test</span>
          <hr className="iha-rule flex-1" />
        </div>

        {/* Interactive checklist — restyled as editorial form */}
        <div className="mt-12 max-w-lg mx-auto">
          <h3 className="font-[family-name:var(--font-display)] italic text-[20px] text-center text-[var(--color-ink)]">
            You probably need one more than you think.
          </h3>

          <div className="mt-8 bg-[var(--color-cream-deep)] p-7 md:p-8">
            <ul className="space-y-4">
              {checklistItems.map((item, i) => (
                <li key={item}>
                  <label className="flex items-center gap-4 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={checked[i]}
                      onChange={() => {
                        const next = [...checked];
                        next[i] = !next[i];
                        setChecked(next);
                      }}
                      className="sr-only peer"
                    />
                    <span
                      className={`w-5 h-5 border flex items-center justify-center transition-colors shrink-0 ${
                        checked[i]
                          ? "bg-[var(--color-ink)] border-[var(--color-ink)]"
                          : "bg-[var(--color-cream)] border-[var(--color-ink-soft)] group-hover:border-[var(--color-ink)]"
                      } peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-sage)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--color-cream-deep)]`}
                      aria-hidden="true"
                    >
                      {checked[i] && (
                        <svg
                          className="w-3 h-3 text-[var(--color-cream)]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span className="text-[15px] text-[var(--color-ink)]">{item}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {anyChecked && (
            <p
              className="mt-6 text-center font-[family-name:var(--font-display)] italic text-[18px] text-[var(--color-sage-deep)] animate-fade-in"
              role="status"
            >
              Then you need a will.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
