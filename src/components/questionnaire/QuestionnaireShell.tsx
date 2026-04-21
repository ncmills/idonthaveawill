"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence } from "motion/react";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import ProgressBar from "./ProgressBar";
import DisclaimerBanner from "@/components/shared/DisclaimerBanner";
import { trackStepViewed, trackStepCompleted } from "@/lib/tracking";

// Step components
import StateSelection from "./steps/StateSelection";
import PersonalInfo from "./steps/PersonalInfo";
import FamilyStatus from "./steps/FamilyStatus";
import Children from "./steps/Children";
import Guardians from "./steps/Guardians";
import Executor from "./steps/Executor";
import SpecificBequests from "./steps/SpecificBequests";
import ResiduaryEstate from "./steps/ResiduaryEstate";
import DigitalAssets from "./steps/DigitalAssets";
import DebtsAndExpenses from "./steps/DebtsAndExpenses";
import FinalWishes from "./steps/FinalWishes";
import PetCare from "./steps/PetCare";
import Disinheritance from "./steps/Disinheritance";
import SimultaneousDeath from "./steps/SimultaneousDeath";
import NoContest from "./steps/NoContest";
import ReviewAnswers from "./steps/ReviewAnswers";

const STEP_COMPONENTS: Record<string, React.ComponentType<any>> = {
  StateSelection,
  PersonalInfo,
  FamilyStatus,
  Children,
  Guardians,
  Executor,
  SpecificBequests,
  ResiduaryEstate,
  DigitalAssets,
  DebtsAndExpenses,
  FinalWishes,
  PetCare,
  Disinheritance,
  SimultaneousDeath,
  NoContest,
  ReviewAnswers,
};

export default function QuestionnaireShell() {
  const {
    answers,
    currentStep,
    currentStepIndex,
    direction,
    totalSteps,
    progress,
    isFirst,
    isLast,
    updateAnswers,
    next,
    prev,
    goToStep,
  } = useQuestionnaire();

  const StepComponent = STEP_COMPONENTS[currentStep.component];
  const prevStepRef = useRef(currentStep.id);

  // Track step views
  useEffect(() => {
    trackStepViewed(currentStep.id, currentStepIndex);
  }, [currentStep.id, currentStepIndex]);

  const handleNext = () => {
    trackStepCompleted(prevStepRef.current, currentStepIndex, {
      state: answers.state || undefined,
    });
    if (isLast) {
      // Hand off answers via sessionStorage so the review page can restore them.
      // (Previously we serialized via btoa() in a URL param — that throws on any
      // non-Latin-1 character, so names with accents or curly apostrophes silently
      // broke the final step.)
      try {
        sessionStorage.setItem("idonthaveawill_answers", JSON.stringify(answers));
      } catch {
        // Quota / private-mode — review page will prompt to start over.
      }
      window.location.href = "/review";
    } else {
      next();
    }
    prevStepRef.current = currentStep.id;
  };

  return (
    <div>
      <DisclaimerBanner />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <ProgressBar
          progress={progress}
          currentStep={currentStepIndex}
          totalSteps={totalSteps}
        />

        <div className="mt-8 relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {StepComponent && (
              <StepComponent
                key={currentStep.id}
                answers={answers}
                updateAnswers={updateAnswers}
                onNext={handleNext}
                onPrev={prev}
                isFirst={isFirst}
                isLast={isLast}
                direction={direction}
                goToStep={goToStep}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
