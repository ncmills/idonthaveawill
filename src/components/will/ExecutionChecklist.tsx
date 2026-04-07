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
      <h2 className="text-2xl font-bold text-[var(--color-brand)] mb-2">
        Steps to Make Your Will Official
      </h2>
      <p className="text-gray-500 mb-6">
        Follow these steps in order. Click any step to see detailed instructions, an explanation of why it matters, and the relevant legal citations for your state.
      </p>

      {requiredComplete && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
          All required steps are marked complete. Make sure you&apos;ve actually done each one — checking a box here doesn&apos;t make it legally so.
        </div>
      )}

      <div className="space-y-4">
        {items.map((item) => {
          const isChecked = checked.has(item.step);
          const isExpanded = expanded.has(item.step);
          const panelId = `checklist-panel-${item.step}`;

          return (
            <div
              key={item.step}
              className={`rounded-xl border transition-all ${
                isChecked
                  ? "bg-green-50 border-green-200"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* Header row — clickable to expand */}
              <button
                type="button"
                className="flex items-start gap-3 p-4 w-full text-left cursor-pointer"
                onClick={() => toggleExpand(item.step)}
                aria-expanded={isExpanded}
                aria-controls={panelId}
              >
                {/* Checkbox */}
                <span
                  role="checkbox"
                  aria-checked={isChecked}
                  aria-label={`Mark step ${item.step} complete`}
                  tabIndex={0}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    isChecked
                      ? "bg-[var(--color-accent)] border-[var(--color-accent)]"
                      : "border-gray-300"
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
                </span>

                {/* Title + badges */}
                <span className="flex-1">
                  <span className="flex items-center gap-2 flex-wrap">
                    <h3
                      className={`font-semibold ${
                        isChecked
                          ? "text-green-800 line-through"
                          : "text-[var(--color-brand)]"
                      }`}
                    >
                      Step {item.step}: {item.title}
                    </h3>
                    {item.required && !isChecked && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                        Required
                      </span>
                    )}
                    {!item.required && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    )}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.requirement}
                  </p>
                </span>

                {/* Expand arrow */}
                <svg
                  className={`w-5 h-5 text-gray-400 shrink-0 mt-1 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <div id={panelId} role="region" className="px-4 pb-4 ml-0 sm:ml-9 space-y-4 border-t border-gray-100 pt-4">
                  {/* How to do this */}
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--color-brand)] mb-1">
                      How to do this:
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.howTo}
                    </p>
                  </div>

                  {/* Why this matters */}
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--color-brand)] mb-1">
                      Why this matters:
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.why}
                    </p>
                  </div>

                  {/* Legal citations */}
                  {item.citations.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--color-brand)] mb-1">
                        Legal authority:
                      </h4>
                      <ul className="space-y-1">
                        {item.citations.map((citation, i) => (
                          <li key={i} className="text-sm text-gray-500">
                            {citation.url ? (
                              <a
                                href={citation.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {citation.text}
                              </a>
                            ) : (
                              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
