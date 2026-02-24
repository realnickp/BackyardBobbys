import { cn } from "@/lib/utils";

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
  className?: string;
}

export function ProcessSteps({ steps, className }: ProcessStepsProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Desktop: horizontal timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-6 left-[calc(12.5%)] right-[calc(12.5%)] h-0.5 bg-gradient-to-r from-brand/30 via-brand to-brand/30" />
          <div className="grid grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-dark text-white font-bold text-lg shadow-lg shadow-brand/20 mb-5">
                  {s.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="md:hidden relative">
        <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-gradient-to-b from-brand via-brand to-brand/30" />
        <div className="space-y-8">
          {steps.map((s) => (
            <div key={s.step} className="relative flex gap-5 pl-0">
              <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-dark text-white font-bold text-lg shadow-lg shadow-brand/20">
                {s.step}
              </div>
              <div className="pt-1.5">
                <h3 className="font-bold text-lg mb-1">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
