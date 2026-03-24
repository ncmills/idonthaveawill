"use client";

import { useReducer, useEffect, useCallback, useMemo } from "react";
import type { WillAnswers } from "@/lib/types";
import { EMPTY_ANSWERS } from "@/lib/types";
import { getActiveSteps } from "@/lib/questionFlow";

const STORAGE_KEY = "idonthaveawill_answers";

interface QState {
  answers: WillAnswers;
  currentStepIndex: number;
  direction: 1 | -1;
}

type QAction =
  | { type: "UPDATE_ANSWERS"; payload: Partial<WillAnswers> }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "GO_TO_STEP"; payload: number }
  | { type: "RESTORE"; payload: WillAnswers };

function reducer(state: QState, action: QAction): QState {
  switch (action.type) {
    case "UPDATE_ANSWERS": {
      const answers = { ...state.answers, ...action.payload };
      return { ...state, answers };
    }
    case "NEXT_STEP": {
      const steps = getActiveSteps(state.answers);
      const nextIndex = Math.min(state.currentStepIndex + 1, steps.length - 1);
      return { ...state, currentStepIndex: nextIndex, direction: 1 };
    }
    case "PREV_STEP": {
      const prevIndex = Math.max(state.currentStepIndex - 1, 0);
      return { ...state, currentStepIndex: prevIndex, direction: -1 };
    }
    case "GO_TO_STEP":
      return {
        ...state,
        currentStepIndex: action.payload,
        direction: action.payload > state.currentStepIndex ? 1 : -1,
      };
    case "RESTORE":
      return { ...state, answers: action.payload };
    default:
      return state;
  }
}

export function useQuestionnaire() {
  const [state, dispatch] = useReducer(reducer, {
    answers: EMPTY_ANSWERS,
    currentStepIndex: 0,
    direction: 1 as const,
  });

  // Restore from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        dispatch({ type: "RESTORE", payload: parsed });
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist to sessionStorage on every change
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state.answers));
    } catch {
      // ignore storage errors
    }
  }, [state.answers]);

  const activeSteps = useMemo(
    () => getActiveSteps(state.answers),
    [state.answers]
  );

  const currentStep = activeSteps[state.currentStepIndex] ?? activeSteps[0];

  const updateAnswers = useCallback((partial: Partial<WillAnswers>) => {
    dispatch({ type: "UPDATE_ANSWERS", payload: partial });
  }, []);

  const next = useCallback(() => {
    dispatch({ type: "NEXT_STEP" });
  }, []);

  const prev = useCallback(() => {
    dispatch({ type: "PREV_STEP" });
  }, []);

  const goToStep = useCallback((index: number) => {
    dispatch({ type: "GO_TO_STEP", payload: index });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESTORE", payload: EMPTY_ANSWERS });
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  const isFirst = state.currentStepIndex === 0;
  const isLast = state.currentStepIndex === activeSteps.length - 1;
  const progress =
    activeSteps.length > 1
      ? (state.currentStepIndex / (activeSteps.length - 1)) * 100
      : 0;

  return {
    answers: state.answers,
    currentStep,
    currentStepIndex: state.currentStepIndex,
    direction: state.direction,
    activeSteps,
    totalSteps: activeSteps.length,
    progress,
    isFirst,
    isLast,
    updateAnswers,
    next,
    prev,
    goToStep,
    reset,
  };
}
