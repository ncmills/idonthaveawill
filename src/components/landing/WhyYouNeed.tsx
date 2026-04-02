"use client";

import { useState } from "react";

const reasons = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" role="img">
        <title>State decides your estate</title>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
      </svg>
    ),
    title: "Without a will, the state decides everything.",
    body: "If you die without a will, a judge you've never met decides who gets your house, your savings, and who raises your kids. Every state has a default formula — and it probably doesn't match what you'd want.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" role="img">
        <title>Most Americans lack a will</title>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "67% of Americans don't have a will.",
    body: "Most people put it off because they think it's complicated or expensive. It doesn't have to be.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" role="img">
        <title>Protect your family</title>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "Your family deserves clarity, not a courtroom.",
    body: "Dying without a will can mean months of probate court, legal fees, and family arguments. A simple will prevents all of that.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" role="img">
        <title>Not just for the wealthy</title>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
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
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl font-bold text-center text-[var(--color-brand)]">
          Why You Need a Will
        </h2>
        <p className="mt-4 text-center text-gray-500 max-w-2xl mx-auto">
          It&apos;s not about dying. It&apos;s about making sure the people you love are taken care of.
        </p>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="flex gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="text-[var(--color-brand)] shrink-0 mt-1">
                {r.icon}
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-brand)] text-lg">
                  {r.title}
                </h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  {r.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive checklist */}
        <div className="mt-16 max-w-md mx-auto">
          <h3 className="font-semibold text-center text-[var(--color-brand)] text-lg mb-6">
            You probably need one more than you think.
          </h3>
          <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
            {checklistItems.map((item, i) => (
              <label
                key={i}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div
                  className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                    checked[i]
                      ? "bg-[var(--color-accent)] border-[var(--color-accent)]"
                      : "border-gray-300 group-hover:border-gray-400"
                  }`}
                  onClick={() => {
                    const next = [...checked];
                    next[i] = !next[i];
                    setChecked(next);
                  }}
                >
                  {checked[i] && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-gray-700">{item}</span>
              </label>
            ))}
          </div>
          {anyChecked && (
            <p className="mt-4 text-center font-semibold text-[var(--color-accent)] animate-fade-in">
              You need a will.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
