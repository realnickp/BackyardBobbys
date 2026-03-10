import type { ReactNode } from "react";

export function HeroFadeIn({ children, className = "", delay = 100 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <div
      className={`animate-hero-fade-in ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
