import React from "react"
import { cn } from "@/lib/utils"

interface StepIndicatorProps {
  steps: string[]
  currentStep: number
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                index <= currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              {index + 1}
            </div>
            <span className="mt-2 text-sm">{step}</span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn("flex-1 h-1", index < currentStep ? "bg-primary" : "bg-secondary")}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
