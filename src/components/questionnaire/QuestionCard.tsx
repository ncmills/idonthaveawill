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
      initial={{ x: direction * 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: direction * -100, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full"
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 md:p-8">
        {children}

        {/* Why we ask */}
        <div className="mt-6 border-t border-gray-100 pt-4">
          <button
            onClick={() => setShowWhy(!showWhy)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className={`w-4 h-4 transition-transform ${showWhy ? "rotate-90" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            Why do we ask this?
          </button>
          {showWhy && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="mt-3 text-sm text-gray-500 leading-relaxed bg-gray-50 rounded-lg p-4"
            >
              {whyWeAsk}
            </motion.p>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-between items-center">
          {!isFirst ? (
            <button
              onClick={onPrev}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
            className={`flex items-center gap-2 font-medium px-6 py-3 rounded-xl transition-all ${
              nextDisabled
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : isLast
                ? "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white hover:scale-[1.02] active:scale-[0.98]"
                : "bg-[var(--color-brand)] hover:bg-[var(--color-brand-light)] text-white hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {nextLabel ?? (isLast ? "Generate My Will" : "Continue")}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
