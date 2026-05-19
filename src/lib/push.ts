import webpush from "web-push";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

let vapidConfigured = false;

function configureVapid(): boolean {
  if (vapidConfigured) return true;
  // VAPID_PUBLIC_KEY and NEXT_PUBLIC_VAPID_PUBLIC_KEY hold the same value;
  // fall back to the NEXT_PUBLIC_ one so only one needs to be set.
  const publicKey = process.env.VAPID_PUBLIC_KEY || process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT || "mailto:robert@backyardbobbys.com";
  if (!publicKey || !privateKey) return false;
  webpush.setVapidDetails(subject, publicKey, privateKey);
  vapidConfigured = true;
  return true;
}

export interface PushPayload {
  title: string;
  body: string;
  url?: string;
  tag?: string;
}

interface PushSubscriptionRow {
  id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
}

/** Sends a notification to every registered device. Deletes dead subscriptions. */
export async function sendPushToAll(
  payload: PushPayload
): Promise<{ sent: number; failed: number; removed: number }> {
  if (!configureVapid()) {
    console.warn("[PUSH] VAPID keys not configured — skipping push.");
    return { sent: 0, failed: 0, removed: 0 };
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("push_subscriptions")
    .select("id, endpoint, p256dh, auth");

  if (error) {
    console.error("[PUSH] Failed to load subscriptions:", error.message);
    return { sent: 0, failed: 0, removed: 0 };
  }

  const subs = (data as PushSubscriptionRow[]) || [];
  if (subs.length === 0) {
    console.log("[PUSH] No registered devices — nothing to send.");
    return { sent: 0, failed: 0, removed: 0 };
  }

  let sent = 0;
  let failed = 0;
  let removed = 0;
  const json = JSON.stringify(payload);

  await Promise.allSettled(
    subs.map(async (s) => {
      try {
        await webpush.sendNotification(
          { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
          json
        );
        sent++;
        await supabase
          .from("push_subscriptions")
          .update({ last_used_at: new Date().toISOString() })
          .eq("id", s.id);
      } catch (err: unknown) {
        const statusCode = (err as { statusCode?: number }).statusCode;
        if (statusCode === 404 || statusCode === 410) {
          await supabase.from("push_subscriptions").delete().eq("id", s.id);
          removed++;
        } else {
          failed++;
          const message = err instanceof Error ? err.message : "unknown error";
          console.error(`[PUSH] send failed (status ${statusCode}): ${message}`);
        }
      }
    })
  );

  console.log(`[PUSH] sent=${sent} failed=${failed} removed=${removed}`);
  return { sent, failed, removed };
}

/** Builds and sends the "new lead" notification. */
export async function sendLeadPush(lead: {
  id: string;
  name: string;
  service?: string;
  cityOrZip?: string;
  score?: number;
  priority?: string;
}): Promise<void> {
  const emoji = lead.priority === "hot" ? "🔥" : lead.priority === "warm" ? "⚡" : "📋";
  const parts = [lead.service || "Inquiry"];
  if (lead.cityOrZip) parts.push(lead.cityOrZip);
  if (typeof lead.score === "number") parts.push(`${lead.score}/100`);
  await sendPushToAll({
    title: `${emoji} New Lead: ${lead.name}`,
    body: parts.join(" · "),
    url: `/dashboard/leads/${lead.id}`,
    tag: `lead-${lead.id}`,
  });
}
