"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Phone, Shield } from "lucide-react";
import { SITE } from "@/lib/constants";
import type { QuizQuestion } from "@/lib/quiz-data";

interface QuizScreenProps {
  question: QuizQuestion;
  stepIndex: number;
  totalSteps: number;
  onAnswer: (answer: string) => void;
  onBack: () => void;
  selectedAnswer: string;
  serviceTitle: string;
}

const STEP_AFFIRMS = [
  "Nice — keep going!",
  "You're doing great!",
  "Almost there!",
  "Last one — you've got this!",
];

export function QuizScreen({
  question,
  stepIndex,
  totalSteps,
  onAnswer,
  onBack,
  selectedAnswer,
  serviceTitle,
}: QuizScreenProps) {
  const [chosen, setChosen] = useState<string>(selectedAnswer);
  const progress = (stepIndex / totalSteps) * 100;
  const hasImages = question.options.some((o) => o.image);

  function handleSelect(label: string) {
    setChosen(label);
    setTimeout(() => onAnswer(label), 320);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2.5 px-4 shrink-0">
        <div className="mx-auto max-w-2xl flex items-center justify-between">
          <span className="text-sm font-bold">Backyard Bobby&apos;s</span>
          <a
            href={SITE.phoneTel}
            className="flex items-center gap-1.5 text-sm font-bold hover:opacity-80 transition-opacity"
          >
            <Phone className="h-3.5 w-3.5" />
            {SITE.phone}
          </a>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-muted shrink-0">
        <div
          className="h-full bg-brand transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className={`w-full ${hasImages ? "max-w-3xl" : "max-w-xl"}`}>

          {/* Step meta */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand">
              {stepIndex === 0 ? `Free ${serviceTitle} Estimate` : STEP_AFFIRMS[stepIndex - 1]}
            </span>
            <span className="text-sm text-muted-foreground">
              {stepIndex + 1} of {totalSteps}
            </span>
          </div>

          {/* Question */}
          <div className="mb-7">
            <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
              {question.question}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              {question.subtext}
            </p>
          </div>

          {/* Option cards */}
          <div className={`grid gap-3 mb-8 ${hasImages ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2"}`}>
            {question.options.map((option) => {
              const isSelected = chosen === option.label;
              return (
                <button
                  key={option.label}
                  onClick={() => handleSelect(option.label)}
                  className={[
                    "relative flex flex-col items-center justify-center rounded-2xl border-2 text-center overflow-hidden min-h-[44px]",
                    "transition-all duration-200 cursor-pointer select-none",
                    option.image ? "gap-0" : "gap-2.5 p-5",
                    isSelected
                      ? "border-brand bg-brand/8 shadow-lg shadow-brand/15 scale-[1.03]"
                      : "border-border bg-white hover:border-brand/50 hover:shadow-md hover:scale-[1.01] active:scale-[0.99]",
                  ].join(" ")}
                >
                  {option.image ? (
                    <>
                      <div className="relative w-full aspect-[4/3]">
                        <Image
                          src={option.image}
                          alt={`${option.label} stamped concrete pattern`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 50vw, 260px"
                        />
                      </div>
                      <span
                        className={`w-full px-3 py-3 text-sm font-semibold leading-snug ${
                          isSelected ? "text-brand" : "text-foreground"
                        }`}
                      >
                        {option.label}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl leading-none">{option.emoji}</span>
                      <span
                        className={`text-sm font-semibold leading-snug ${
                          isSelected ? "text-brand" : "text-foreground"
                        }`}
                      >
                        {option.label}
                      </span>
                    </>
                  )}
                  {isSelected && (
                    <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand">
                      <svg
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Back */}
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 py-2 px-3 min-h-[44px] text-sm text-muted-foreground hover:text-foreground transition-colors -ml-3"
          >
            <ArrowLeft className="h-4 w-4" />
            {stepIndex === 0 ? "Back to overview" : "Previous question"}
          </button>
        </div>
      </div>

      {/* Bottom trust */}
      <div className="shrink-0 border-t border-border/30 py-4 px-4 text-center">
        <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Shield className="h-3.5 w-3.5 shrink-0" />
          100% free · No obligation · Licensed {SITE.license}
        </p>
      </div>
    </div>
  );
}
