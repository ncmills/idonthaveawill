interface ProgressBarProps {
  progress: number;
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({
  progress,
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-baseline mb-3">
        <span className="iha-caps">
          Folio{" "}
          <span className="font-[family-name:var(--font-display)] italic text-[13px] text-[var(--color-ink)] normal-case tracking-normal">
            {currentStep + 1} of {totalSteps}
          </span>
        </span>
        <span className="iha-caps">{Math.round(progress)}% complete</span>
      </div>
      <div
        className="w-full h-[2px] bg-[var(--color-rule)] overflow-hidden"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-[var(--color-sage-deep)] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
