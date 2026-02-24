"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { QUIZ_DATA } from "@/lib/quiz-data";
import { PRIMARY_SERVICES } from "@/lib/constants";
import { QuizScreen } from "@/components/lp/QuizScreen";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const service = params.service as string;

  const questions = QUIZ_DATA[service] ?? [];
  const svc = PRIMARY_SERVICES.find((s) => s.slug === service);

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(() => Array(questions.length).fill(""));
  const [hydrated, setHydrated] = useState(false);

  // Restore from sessionStorage after mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(`bb_quiz_${service}`);
      if (saved) {
        const parsed = JSON.parse(saved) as { answers: string[]; currentStep: number };
        if (Array.isArray(parsed.answers) && parsed.answers.length === questions.length) {
          setAnswers(parsed.answers);
          setCurrentStep(Math.min(parsed.currentStep ?? 0, questions.length - 1));
        }
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, [service, questions.length]);

  // Persist to sessionStorage
  const persist = useCallback(
    (newAnswers: string[], step: number) => {
      try {
        sessionStorage.setItem(
          `bb_quiz_${service}`,
          JSON.stringify({ answers: newAnswers, currentStep: step })
        );
      } catch {
        // ignore
      }
    },
    [service]
  );

  function handleAnswer(answer: string) {
    const newAnswers = [...answers];
    newAnswers[currentStep] = answer;
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      const nextStep = currentStep + 1;
      persist(newAnswers, nextStep);
      setTimeout(() => {
        setCurrentStep(nextStep);
        window.scrollTo({ top: 0, behavior: "instant" });
      }, 320);
    } else {
      persist(newAnswers, currentStep);
      setTimeout(() => router.push(`/lp/${service}/contact`), 320);
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      persist(answers, prevStep);
      setCurrentStep(prevStep);
    } else {
      router.push(`/lp/${service}`);
    }
  }

  // Redirect if service has no quiz data
  if (!questions.length) {
    router.replace(`/lp/${service}`);
    return null;
  }

  // Avoid hydration flash
  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-8 w-8 rounded-full border-2 border-brand border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <QuizScreen
      question={questions[currentStep]}
      stepIndex={currentStep}
      totalSteps={questions.length}
      onAnswer={handleAnswer}
      onBack={handleBack}
      selectedAnswer={answers[currentStep]}
      serviceTitle={svc?.title ?? service}
    />
  );
}
