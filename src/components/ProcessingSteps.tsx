import React from 'react';
import { Check, Image, Wand2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProcessingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: ProcessingStep[] = [
  {
    id: 1,
    title: "Upload",
    description: "Select a photo",
    icon: <Image className="w-5 h-5" />,
  },
  {
    id: 2,
    title: "Detect",
    description: "Finding face",
    icon: <Wand2 className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "Stylize",
    description: "Creating art",
    icon: <Sparkles className="w-5 h-5" />,
  },
];

interface ProcessingStepsProps {
  currentStep: number;
}

export const ProcessingSteps: React.FC<ProcessingStepsProps> = ({ currentStep }) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                  currentStep > step.id 
                    ? "bg-sage text-primary-foreground shadow-soft" 
                    : currentStep === step.id
                    ? "bg-coral text-primary-foreground shadow-glow animate-pulse-soft"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {currentStep > step.id ? (
                  <Check className="w-6 h-6" />
                ) : (
                  step.icon
                )}
              </div>
              <p className={cn(
                "mt-2 text-sm font-display transition-colors",
                currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
              )}>
                {step.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {step.description}
              </p>
            </div>
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-4 rounded-full overflow-hidden bg-muted">
                <div 
                  className={cn(
                    "h-full bg-sage transition-all duration-700 ease-out",
                    currentStep > step.id ? "w-full" : "w-0"
                  )}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
