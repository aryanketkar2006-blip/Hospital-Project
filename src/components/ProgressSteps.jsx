/**
 * ProgressSteps — Multi-step progress indicator for registration forms.
 * Shows completed (green), active (blue), and upcoming (gray) steps with connecting lines.
 * @param {{ steps: string[], currentStep: number }} props — currentStep is 0-indexed
 */
export default function ProgressSteps({ steps, currentStep }) {
  return (
    <div className="flex items-center mb-8">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            {/* Step circle + label */}
            <div className="flex flex-col items-center">
              <div
                className={`w-[28px] h-[28px] rounded-full flex items-center justify-center text-xs font-semibold ${
                  isCompleted
                    ? 'bg-success text-white'
                    : isActive
                      ? 'bg-primary text-white'
                      : 'bg-border text-muted'
                }`}
              >
                {isCompleted ? '✓' : index + 1}
              </div>
              <span
                className={`text-xs mt-1.5 whitespace-nowrap ${
                  isCompleted
                    ? 'text-success font-medium'
                    : isActive
                      ? 'text-primary font-medium'
                      : 'text-muted'
                }`}
              >
                {step}
              </span>
            </div>

            {/* Connecting line */}
            {!isLast && (
              <div className="flex-1 mx-3 mt-[-16px]">
                <div
                  className={`h-px ${
                    index < currentStep ? 'bg-success' : 'bg-border'
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
