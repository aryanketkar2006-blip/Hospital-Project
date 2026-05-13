/**
 * QueueTracker — Horizontal 5-step tracker showing patient queue progress.
 * Steps: Registered → In Queue → Being Called → In Consultation → Done.
 * Completed steps show blue fill with white checkmark, active shows blue border with number.
 * @param {{ steps: string[], currentStep: number }} props — currentStep is 1-indexed
 */
export default function QueueTracker({ steps, currentStep }) {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, index) => {
        const stepNum = index + 1;
        const isCompleted = stepNum < currentStep;
        const isActive = stepNum === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div key={step} className={`flex items-center ${isLast ? '' : 'flex-1'}`}>
            {/* Step circle + label */}
            <div className="flex flex-col items-center min-w-[60px]">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 ${
                  isCompleted
                    ? 'bg-primary border-primary text-white'
                    : isActive
                      ? 'bg-white border-primary text-primary'
                      : 'bg-white border-border text-muted'
                }`}
              >
                {isCompleted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={`text-[11px] mt-1.5 text-center whitespace-nowrap ${
                  isCompleted || isActive ? 'text-primary font-semibold' : 'text-muted'
                }`}
              >
                {step}
              </span>
            </div>

            {/* Connecting line */}
            {!isLast && (
              <div className="flex-1 mx-1 mt-[-16px]">
                <div
                  className={`h-0.5 ${isCompleted ? 'bg-primary' : 'bg-border'}`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
