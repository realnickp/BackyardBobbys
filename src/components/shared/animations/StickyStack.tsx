"use client";

import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function StickyStack({ children, className = "" }: Props) {
  return (
    <div className={`sticky top-0 z-0 ${className}`}>
      {children}
    </div>
  );
}

export function StackOver({ children, className = "" }: Props) {
  return (
    <div
      className={`relative z-10 rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.1)] bg-white ${className}`}
    >
      {children}
    </div>
  );
}
