"use client";

import { useState } from "react";
import type { ChecklistItem } from "@/lib/types";

interface Props {
  items: ChecklistItem[];
}

export default function ExecutionChecklist({ items }: Props) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  function toggle(step: number) {
    const next = new Set(checked);
    if (next.has(step)) next.delete(step);
    else next.add(step);
    setChecked(next);
  }

  const completedCount = checked.size;
  const totalRequired = items.filter((i) => i.required).length;
  const requiredComplete = items
    .filter((i) => i.required)
    .every((i) => checked.has(i.step));

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--color-brand)] mb-2">
        Steps to Make Your Will Official
      </h2>
      <p className="text-gray-500 mb-6">
        Follow these steps in order. Check them off as you go.{" "}
        <span className="text-sm">
          ({completedCount} of {items.length} complete)
        </span>
      </p>

      {requiredComplete && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
          All required steps are complete! Your will should now be legally valid
          in your state.
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.step}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              checked.has(item.step)
                ? "bg-green-50 border-green-200"
                : "bg-white border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => toggle(item.step)}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  checked.has(item.step)
                    ? "bg-[var(--color-accent)] border-[var(--color-accent)]"
                    : "border-gray-300"
                }`}
              >
                {checked.has(item.step) && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3
                    className={`font-medium ${
                      checked.has(item.step)
                        ? "text-green-800 line-through"
                        : "text-[var(--color-brand)]"
                    }`}
                  >
                    {item.title}
                  </h3>
                  {item.required && !checked.has(item.step) && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                      Required
                    </span>
                  )}
                  {!item.required && (
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
