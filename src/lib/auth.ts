import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const SESSION_SEED = "bb-dashboard-v1";

/**
 * Generates a deterministic, opaque session token from the dashboard password.
 * Token is HMAC-SHA256(password, SESSION_SEED) as lowercase hex.
 * Changing the password automatically invalidates all existing sessions.
 */
export function generateSessionToken(password: string): string {
  return createHmac("sha256", password).update(SESSION_SEED).digest("hex");
}

/**
 * Constant-time comparison of a cookie value against the expected session token.
 */
export function verifySessionToken(
  cookieValue: string | undefined,
  password: string
): boolean {
  // Expected token is always 64 lowercase hex chars (SHA-256 = 32 bytes)
  if (!cookieValue || !/^[0-9a-f]{64}$/.test(cookieValue)) return false;
  try {
    const expected = generateSessionToken(password);
    return timingSafeEqual(
      Buffer.from(cookieValue, "hex"),
      Buffer.from(expected, "hex")
    );
  } catch {
    return false;
  }
}

/**
 * Call at the top of any dashboard-only API route handler.
 * Returns a 401 NextResponse if the request is not authenticated,
 * or null if auth passed (caller should continue normally).
 */
export function requireAuth(request: NextRequest): NextResponse | null {
  const password = process.env.DASHBOARD_PASSWORD;
  if (!password) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const cookie = request.cookies.get("dashboard_session");
  if (!verifySessionToken(cookie?.value, password)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
