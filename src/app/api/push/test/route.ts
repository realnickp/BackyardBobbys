import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { sendPushToAll } from "@/lib/push";

// POST — send a test notification to every registered device.
export async function POST(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  const result = await sendPushToAll({
    title: "✅ Test Notification",
    body: "Lead alerts are working on this device.",
    url: "/dashboard",
    tag: "bb-test",
  });

  return NextResponse.json({ success: true, ...result });
}
