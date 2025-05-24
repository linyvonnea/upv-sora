import { cn } from "@/lib/utils";

interface Step {
  label: string;
  completed: boolean;
}

interface ProgressTrackerProps {
  steps: Step[];
}

export function ProgressTracker({ steps }: ProgressTrackerProps) {
  return (
    <div className="flex flex-col relative ml-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start relative">
          <div
            className={cn(
              "w-3 h-3 rounded-full z-10 mt-0.5",
              step.completed
                ? "bg-green-600"
                : "border-2 border-green-600 bg-white"
            )}
          />
          {index !== steps.length - 1 && (
            <div className="absolute left-[5px] top-3.5 w-px h-full bg-green-300" />
          )}
          <p className="ml-4 mb-6 text-sm">{step.label}</p>
        </div>
      ))}
    </div>
  );
}