"use client";

import { useEffect, useRef, useState } from "react";
import { HONEYPOT_FIELD, TIMESTAMP_FIELD } from "@/lib/anti-spam";

// Shared anti-spam wiring for the public lead forms.
//
// `antiSpamFields()` returns the extra keys to merge into the POST body: the
// honeypot value and the moment the form mounted in the browser. Both are
// inspected server-side by isSpamSubmission(). Invisible to real users.
export function useAntiSpam() {
  const [honeypotValue, setHoneypotValue] = useState("");
  const loadedAt = useRef(0);

  // Capture mount time on the client only — avoids any SSR/hydration skew.
  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);

  return {
    honeypotValue,
    setHoneypotValue,
    antiSpamFields: () => ({
      [HONEYPOT_FIELD]: honeypotValue,
      [TIMESTAMP_FIELD]: loadedAt.current,
    }),
  };
}

// Visually hidden, off-screen, untabbable, and hidden from screen readers, so
// no human ever fills it. Bots that populate every field trip the honeypot.
export function HoneypotField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-9999px",
        top: "-9999px",
        width: 1,
        height: 1,
        overflow: "hidden",
      }}
    >
      <label htmlFor={HONEYPOT_FIELD}>Company (leave this field blank)</label>
      <input
        id={HONEYPOT_FIELD}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
