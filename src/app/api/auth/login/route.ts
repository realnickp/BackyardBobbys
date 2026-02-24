import { NextRequest, NextResponse } from "next/server";
import { generateSessionToken } from "@/lib/auth";

// Simple in-memory rate limiter (best-effort — limits within a single function instance)
const attempts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = attempts.get(ip);
  if (!record || now > record.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return false;
  }
  if (record.count >= 10) return true;
  record.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const password = process.env.DASHBOARD_PASSWORD;
    if (!password) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many attempts. Try again later." },
        { status: 429 }
      );
    }

    const { password: submitted } = await request.json();

    if (!submitted || submitted !== password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const sessionToken = generateSessionToken(password);

    const response = NextResponse.json({ success: true });
    response.cookies.set("dashboard_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
