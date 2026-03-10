"use client";

import { useState, useEffect } from "react";

export function ObfuscatedEmail({ email, className }: { email: string; className?: string }) {
  const [shown, setShown] = useState(false);
  useEffect(() => setShown(true), []);
  if (!shown) return <span className={className}>Contact us</span>;
  return <span className={className}>{email}</span>;
}
