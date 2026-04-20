"use client";

import { useState, type ReactNode } from "react";
import { motion } from "motion/react";

interface QuestionCardProps {
  children: ReactNode;
  whyWeAsk: string;
  direction: 1 | -1;
  stepKey: string;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  nextLabel?: string;
  nextDisabled?: boolean;
}

export default function QuestionCard({
  children,
  whyWeAsk,
  direction,
  stepKey,
  onNext,
  onPrev,
  isFirst,
  isLast,
  nextLabel,
  nextDisabled = false,
}: QuestionCardProps) {
  const [showWhy, setShowWhy] = useState(false);

  return (
    <motion.div
      key={stepKey}
      initial={{ x: direction * 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: direction * -60, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full iha-wizard"
    >
      <div className="bg-[var(--color-cream-deep)] border border-[var(--color-rule)] p-5 sm:p-7 md:p-9">
        {children}

        {/* Why we ask — editorial disclosure */}
        <div className="mt-8 border-t border-[var(--color-rule)] pt-5">
          <button
            type="button"
            onClick={() => setShowWhy(!showWhy)}
            className="flex items-center gap-2 text-[13px] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors font-[family-name:var(--font-display)] italic"
            aria-expanded={showWhy}
            aria-controls={`why-panel-${stepKey}`}
          >
            <svg
              className={`w-3.5 h-3.5 transition-transform ${showWhy ? "rotate-90" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            Why do we ask this?
          </button>
          {showWhy && (
            <motion.p
              id={`why-panel-${stepKey}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="mt-4 pl-4 border-l border-[var(--color-sage)] text-[14px] text-[var(--color-ink)] leading-relaxed"
            >
              {whyWeAsk}
            </motion.p>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center gap-4">
          {!isFirst ? (
            <button
              type="button"
              onClick={onPrev}
              className="flex items-center gap-2 text-[14px] font-[family-name:var(--font-display)] italic text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors min-h-[44px]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={onNext}
            disabled={nextDisabled}
            className={`iha-seal ${nextDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <span className="iha-seal-mark" aria-hidden="true" />
            {nextLabel ?? (isLast ? "Generate the draft" : "Continue")}
            <svg className="w-3.5 h-3.5 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
