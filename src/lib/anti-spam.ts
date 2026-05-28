// Anti-spam helpers shared by the public lead forms and the /api/leads route.
//
// Fail-open by design: if the anti-spam fields are missing, malformed, or
// ambiguous, the submission is treated as a real lead. A bot is only ever
// blocked on an unambiguous positive signal, so a genuine customer can never
// be dropped by this check.

export const HONEYPOT_FIELD = "company_website";
export const TIMESTAMP_FIELD = "formLoadedAt";

// A human filling a multi-field form cannot realistically render the page and
// submit in under this many milliseconds. Near-instant submits are bots.
export const MIN_FILL_MS = 3000;

export function isSpamSubmission(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const data = body as Record<string, unknown>;

  // 1. Honeypot — an invisible field a human can neither see nor fill.
  //    Any non-empty value means an automated client filled every input.
  const honeypot = data[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim() !== "") return true;

  // 2. Fast-submit — only acts on a sane, positive elapsed time. A missing,
  //    non-numeric, future, or negative timestamp falls through as legitimate.
  const loadedAt = Number(data[TIMESTAMP_FIELD]);
  if (Number.isFinite(loadedAt) && loadedAt > 0) {
    const elapsed = Date.now() - loadedAt;
    if (elapsed >= 0 && elapsed < MIN_FILL_MS) return true;
  }

  return false;
}
