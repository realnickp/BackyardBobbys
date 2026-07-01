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
  // Ad-origin signal (e.g. "google_ads") carried from the landing page so the
  // contact step tags the lead correctly. Read from the URL, persisted through
  // the quiz so it survives the full flow.
  const [adSrc, setAdSrc] = useState("");

  // Restore from sessionStorage after mount
  useEffect(() => {
    let resolvedSrc = "";
    try {
      const urlSrc = new URLSearchParams(window.location.search).get("src");
      if (urlSrc) resolvedSrc = urlSrc;
    } catch {
      // ignore
    }
    try {
      const saved = sessionStorage.getItem(`bb_quiz_${service}`);
      if (saved) {
        const parsed = JSON.parse(saved) as { answers: string[]; currentStep: number; src?: string };
        if (!resolvedSrc && parsed.src) resolvedSrc = parsed.src;
        if (Array.isArray(parsed.answers) && parsed.answers.length === questions.length) {
          setAnswers(parsed.answers);
          setCurrentStep(Math.min(parsed.currentStep ?? 0, questions.length - 1));
        }
      }
    } catch {
      // ignore
    }
    setAdSrc(resolvedSrc);
    setHydrated(true);
  }, [service, questions.length]);

  // Persist to sessionStorage
  const persist = useCallback(
    (newAnswers: string[], step: number) => {
      try {
        sessionStorage.setItem(
          `bb_quiz_${service}`,
          JSON.stringify({ answers: newAnswers, currentStep: step, src: adSrc })
        );
      } catch {
        // ignore
      }
    },
    [service, adSrc]
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
      setTimeout(
        () => router.push(`/lp/${service}/contact${adSrc ? `?src=${adSrc}` : ""}`),
        320
      );
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
