"use client";

import { useState } from "react";
import type { ChecklistItem } from "@/lib/types";

interface Props {
  items: ChecklistItem[];
}

export default function ExecutionChecklist({ items }: Props) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  function toggleCheck(step: number) {
    const next = new Set(checked);
    if (next.has(step)) next.delete(step);
    else next.add(step);
    setChecked(next);
  }

  function toggleExpand(step: number) {
    const next = new Set(expanded);
    if (next.has(step)) next.delete(step);
    else next.add(step);
    setExpanded(next);
  }

  const requiredComplete = items
    .filter((i) => i.required)
    .every((i) => checked.has(i.step));

  return (
    <div>
      <p className="iha-caps">Executing the document</p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-[28px] md:text-[34px] font-medium text-[var(--color-ink)] leading-tight tracking-[-0.01em]">
        Steps to make your will official.
      </h2>
      <p className="mt-3 font-[family-name:var(--font-display)] italic text-[16px] text-[var(--color-ink-soft)]">
        Follow these in order. Click any step for detailed instructions, an
        explanation of why it matters, and the relevant legal citations for your state.
      </p>

      {requiredComplete && (
        <div className="mt-6 iha-callout" role="status">
          <strong>All required steps marked complete.</strong>
          Make sure you&apos;ve actually done each one — checking a box here
          doesn&apos;t make it legally so.
        </div>
      )}

      <ol className="mt-8 space-y-3">
        {items.map((item) => {
          const isChecked = checked.has(item.step);
          const isExpanded = expanded.has(item.step);
          const panelId = `checklist-panel-${item.step}`;

          return (
            <li
              key={item.step}
              className={`border transition-colors ${
                isChecked
                  ? "bg-[var(--color-cream-deep)] border-[var(--color-sage)]"
                  : "bg-[var(--color-cream)] border-[var(--color-rule)]"
              }`}
            >
              <button
                type="button"
                className="flex items-start gap-4 p-4 md:p-5 w-full text-left cursor-pointer"
                onClick={() => toggleExpand(item.step)}
                aria-expanded={isExpanded}
                aria-controls={panelId}
              >
                <span
                  role="checkbox"
                  aria-checked={isChecked}
                  aria-label={`Mark step ${item.step} complete`}
                  tabIndex={0}
                  className={`w-6 h-6 border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked
                      ? "bg-[var(--color-ink)] border-[var(--color-ink)]"
                      : "bg-[var(--color-cream)] border-[var(--color-ink-soft)]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCheck(item.step);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleCheck(item.step);
                    }
                  }}
                >
                  {isChecked && (
                    <svg
                      className="w-3.5 h-3.5 text-[var(--color-cream)]"
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

                <span className="flex-1">
                  <span className="flex items-baseline gap-3 flex-wrap">
                    <span
                      className="font-[family-name:var(--font-display)] italic text-[var(--color-sage-deep)] text-[14px] tracking-wide"
                      aria-hidden="true"
                    >
                      {item.step.toString().padStart(2, "0")}
                    </span>
                    <h3
                      className={`font-[family-name:var(--font-display)] text-[18px] md:text-[19px] font-medium leading-snug ${
                        isChecked ? "text-[var(--color-ink-soft)] line-through" : "text-[var(--color-ink)]"
                      }`}
                    >
                      {item.title}
                    </h3>
                    {item.required && !isChecked && (
                      <span className="iha-caps">Required</span>
                    )}
                    {!item.required && (
                      <span className="iha-caps">Recommended</span>
                    )}
                  </span>
                  <p className="mt-1.5 text-[14px] text-[var(--color-ink-soft)] leading-relaxed">
                    {item.requirement}
                  </p>
                </span>

                <svg
                  className={`w-4 h-4 text-[var(--color-ink-soft)] shrink-0 mt-1 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isExpanded && (
                <div
                  id={panelId}
                  role="region"
                  className="px-4 md:px-5 pb-5 ml-0 sm:ml-10 space-y-5 border-t border-[var(--color-rule)] pt-5"
                >
                  <div>
                    <h4 className="iha-caps">How to do this</h4>
                    <p className="mt-2 text-[14.5px] text-[var(--color-ink)] leading-relaxed">
                      {item.howTo}
                    </p>
                  </div>

                  <div>
                    <h4 className="iha-caps">Why this matters</h4>
                    <p className="mt-2 text-[14.5px] text-[var(--color-ink)] leading-relaxed">
                      {item.why}
                    </p>
                  </div>

                  {item.citations.length > 0 && (
                    <div>
                      <h4 className="iha-caps">Legal authority</h4>
                      <ul className="mt-2 space-y-1.5">
                        {item.citations.map((citation, i) => (
                          <li key={i} className="text-[13.5px] text-[var(--color-ink-soft)]">
                            {citation.url ? (
                              <a
                                href={citation.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-[family-name:var(--font-display)] italic text-[var(--color-ink)] underline decoration-[var(--color-rule)] underline-offset-[4px] hover:decoration-[var(--color-ink)] transition-colors"
                              >
                                {citation.text}
                              </a>
                            ) : (
                              <span className="font-[family-name:var(--font-mono)] text-[12px] bg-[var(--color-cream-deep)] px-2 py-1 border border-[var(--color-rule)]">
                                {citation.text}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
