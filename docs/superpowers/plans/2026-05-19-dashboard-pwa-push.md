# Dashboard PWA + Push Notifications Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the `/dashboard` installable to a phone home screen as an app, and push a lock-screen notification to every registered device whenever a new lead comes in.

**Architecture:** Self-hosted Web Push. A web app manifest + service worker make the dashboard an installable PWA. Devices register a push subscription (stored in Supabase). The existing `after()` block in `/api/leads` sends a Web Push notification (VAPID-authenticated, via the `web-push` library) to every stored subscription. Push is additive — email is untouched.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Supabase, `web-push`, the browser Push API + Service Worker API.

**Note on testing:** This project has no test runner configured (`package.json` has only `dev`/`build`/`start`/`lint`), and this feature is almost entirely browser-runtime and service-integration code that a unit test cannot meaningfully exercise. Verification is therefore: `npx tsc --noEmit` (types) and `npm run build` (compile) per task, plus a real install + test-notification smoke test in Task 12. The built-in "Send test notification" button is the permanent integration check.

---

## File Structure

**New files:**
- `supabase/migration_003_push_subscriptions.sql` — DB table for device subscriptions
- `scripts/generate-pwa-icons.mjs` — one-off icon generator (kept, regeneratable)
- `public/icon-192.png`, `public/icon-512.png`, `public/icon-512-maskable.png` — app icons
- `src/app/manifest.ts` — web app manifest (Next.js metadata route)
- `public/sw.js` — service worker (push receiver)
- `src/lib/push.ts` — `web-push` send helper
- `src/app/api/push/subscribe/route.ts` — POST/DELETE a device subscription
- `src/app/api/push/test/route.ts` — POST a test notification
- `src/components/dashboard/NotificationSetup.tsx` — install + enable UI

**Modified files:**
- `package.json` — add `web-push` + `@types/web-push`
- `.env.local`, `.env.local.example` — VAPID keys
- `src/app/api/leads/route.ts` — call `sendLeadPush` inside the existing `after()` block
- `src/app/dashboard/page.tsx` — mount `<NotificationSetup />`
- `src/app/layout.tsx` — add `appleWebApp` metadata

---

## Task 1: Install web-push and configure VAPID keys

**Files:**
- Modify: `package.json` (via npm)
- Modify: `.env.local`
- Modify: `.env.local.example`

- [ ] **Step 1: Install the dependency**

Run: `npm install web-push && npm install --save-dev @types/web-push`
Expected: both packages added, no errors.

- [ ] **Step 2: Generate VAPID keys**

Run: `npx web-push generate-vapid-keys`
Expected output (example — yours will differ):
```
Public Key:
BNc...long-base64url-string...
Private Key:
k1d...shorter-base64url-string...
```
Copy both values for the next step.

- [ ] **Step 3: Add VAPID vars to `.env.local`**

Append to `.env.local`, directly below the `LEAD_NOTIFICATION_EMAILS` line, substituting the keys generated in Step 2:

```
# ── Web Push (dashboard PWA notifications) ───────────────────
VAPID_PUBLIC_KEY=<public key from step 2>
VAPID_PRIVATE_KEY=<private key from step 2>
NEXT_PUBLIC_VAPID_PUBLIC_KEY=<same public key from step 2>
VAPID_SUBJECT=mailto:robert@backyardbobbys.com
```

- [ ] **Step 4: Document the vars in `.env.local.example`**

Append to `.env.local.example`, below the `LEAD_NOTIFICATION_EMAILS` line:

```
# ── Web Push (dashboard PWA notifications) ───────────────────
VAPID_PUBLIC_KEY=generate-with-npx-web-push-generate-vapid-keys
VAPID_PRIVATE_KEY=generate-with-npx-web-push-generate-vapid-keys
NEXT_PUBLIC_VAPID_PUBLIC_KEY=same-value-as-VAPID_PUBLIC_KEY
VAPID_SUBJECT=mailto:robert@backyardbobbys.com
```

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json .env.local.example
git commit -m "feat: add web-push dependency and VAPID config"
```
Note: `.env.local` is git-ignored and is not committed.

- [ ] **Step 6: USER ACTION — add VAPID vars to Vercel**

The user must add four env vars in Vercel (Project `backyard-bobbys` → Settings → Environment Variables), all targeting Production, Preview, and Development, using the values from Step 2:
`VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `NEXT_PUBLIC_VAPID_PUBLIC_KEY`, `VAPID_SUBJECT`.
Flag this clearly to the user; it is required before Task 12.

---

## Task 2: Database migration for push subscriptions

**Files:**
- Create: `supabase/migration_003_push_subscriptions.sql`

- [ ] **Step 1: Create the migration file**

Create `supabase/migration_003_push_subscriptions.sql`:

```sql
-- Migration 003: device push subscriptions for dashboard PWA notifications
-- Run once in Supabase → SQL Editor.

create table if not exists push_subscriptions (
  id           uuid primary key default gen_random_uuid(),
  endpoint     text not null unique,
  p256dh       text not null,
  auth         text not null,
  user_agent   text,
  created_at   timestamptz not null default now(),
  last_used_at timestamptz
);

-- Accessed only via the Supabase service-role key (server side), which
-- bypasses RLS. Enable RLS with no policies so the anon/public key cannot
-- read or write subscription endpoints.
alter table push_subscriptions enable row level security;
```

- [ ] **Step 2: Commit**

```bash
git add supabase/migration_003_push_subscriptions.sql
git commit -m "feat: add push_subscriptions table migration"
```

- [ ] **Step 3: USER ACTION — run the migration**

The user must open Supabase → SQL Editor, paste the contents of
`supabase/migration_003_push_subscriptions.sql`, and click Run.
Flag this clearly to the user; it is required before Task 12.

---

## Task 3: Generate PWA app icons

**Files:**
- Create: `scripts/generate-pwa-icons.mjs`
- Create: `public/icon-192.png`, `public/icon-512.png`, `public/icon-512-maskable.png` (generated)

- [ ] **Step 1: Create the icon generation script**

Create `scripts/generate-pwa-icons.mjs`:

```js
// Generates PWA icons from the existing app logo using sharp.
// Run: node scripts/generate-pwa-icons.mjs
import sharp from "sharp";

const SOURCE = "src/app/icon.png";

async function main() {
  // Transparent square icons (purpose: any)
  await sharp(SOURCE)
    .resize(192, 192, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile("public/icon-192.png");

  await sharp(SOURCE)
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile("public/icon-512.png");

  // Maskable icon: logo at ~70% inside a white safe-zone, padded to 512x512.
  // 358 + 77 padding on each side = 512.
  await sharp(SOURCE)
    .resize(358, 358, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .extend({ top: 77, bottom: 77, left: 77, right: 77, background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .png()
    .toFile("public/icon-512-maskable.png");

  console.log("PWA icons written to public/: icon-192.png, icon-512.png, icon-512-maskable.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

- [ ] **Step 2: Run the script**

Run: `node scripts/generate-pwa-icons.mjs`
Expected: `PWA icons written to public/: icon-192.png, icon-512.png, icon-512-maskable.png`

- [ ] **Step 3: Verify the files exist**

Run: `ls public/icon-192.png public/icon-512.png public/icon-512-maskable.png`
Expected: all three paths listed.

- [ ] **Step 4: Commit**

```bash
git add scripts/generate-pwa-icons.mjs public/icon-192.png public/icon-512.png public/icon-512-maskable.png
git commit -m "feat: generate PWA app icons from logo"
```

---

## Task 4: Web app manifest

**Files:**
- Create: `src/app/manifest.ts`

- [ ] **Step 1: Create the manifest route**

Create `src/app/manifest.ts`:

```ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Backyard Bobby's Leads",
    short_name: "BB Leads",
    description: "Lead command center for Backyard Bobby's.",
    start_url: "/dashboard",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#E8742A",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: exit 0, no output.

- [ ] **Step 3: Commit**

```bash
git add src/app/manifest.ts
git commit -m "feat: add web app manifest for installable dashboard"
```

---

## Task 5: Service worker

**Files:**
- Create: `public/sw.js`

- [ ] **Step 1: Create the service worker**

Create `public/sw.js`:

```js
// Backyard Bobby's dashboard service worker — receives Web Push and shows
// lead notifications. No caching/offline logic by design.

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// No-op fetch handler — present so the browser treats the app as installable.
self.addEventListener("fetch", () => {});

self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = {};
  }
  const title = data.title || "New Lead — Backyard Bobby's";
  const options = {
    body: data.body || "A new lead just came in.",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    tag: data.tag || "bb-lead",
    data: { url: data.url || "/dashboard" },
    requireInteraction: false,
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || "/dashboard";
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        for (const client of windowClients) {
          if (client.url.includes("/dashboard") && "focus" in client) {
            client.focus();
            if ("navigate" in client) client.navigate(targetUrl);
            return;
          }
        }
        return self.clients.openWindow(targetUrl);
      })
  );
});
```

- [ ] **Step 2: Commit**

```bash
git add public/sw.js
git commit -m "feat: add service worker for push notifications"
```

---

## Task 6: Push send helper

**Files:**
- Create: `src/lib/push.ts`

- [ ] **Step 1: Create the push helper**

Create `src/lib/push.ts`:

```ts
import webpush from "web-push";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

let vapidConfigured = false;

function configureVapid(): boolean {
  if (vapidConfigured) return true;
  const publicKey = process.env.VAPID_PUBLIC_KEY;
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
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: exit 0, no output.

- [ ] **Step 3: Commit**

```bash
git add src/lib/push.ts
git commit -m "feat: add web-push send helper"
```

---

## Task 7: Subscribe / unsubscribe API route

**Files:**
- Create: `src/app/api/push/subscribe/route.ts`

- [ ] **Step 1: Create the route**

Create `src/app/api/push/subscribe/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { requireAuth } from "@/lib/auth";

// POST — register (upsert) this device's push subscription.
export async function POST(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const sub = body?.subscription;
    if (!sub?.endpoint || !sub?.keys?.p256dh || !sub?.keys?.auth) {
      return NextResponse.json({ error: "Invalid subscription" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("push_subscriptions").upsert(
      {
        endpoint: sub.endpoint,
        p256dh: sub.keys.p256dh,
        auth: sub.keys.auth,
        user_agent: request.headers.get("user-agent") || null,
        last_used_at: new Date().toISOString(),
      },
      { onConflict: "endpoint" }
    );
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/push/subscribe error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE — remove this device's subscription (turn alerts off).
export async function DELETE(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const { endpoint } = (await request.json()) as { endpoint?: string };
    if (!endpoint) {
      return NextResponse.json({ error: "Missing endpoint" }, { status: 400 });
    }
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("push_subscriptions")
      .delete()
      .eq("endpoint", endpoint);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/push/subscribe error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: exit 0, no output.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/push/subscribe/route.ts
git commit -m "feat: add push subscribe/unsubscribe endpoint"
```

---

## Task 8: Test-notification API route

**Files:**
- Create: `src/app/api/push/test/route.ts`

- [ ] **Step 1: Create the route**

Create `src/app/api/push/test/route.ts`:

```ts
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
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: exit 0, no output.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/push/test/route.ts
git commit -m "feat: add push test-notification endpoint"
```

---

## Task 9: Wire push into the lead handler

**Files:**
- Modify: `src/app/api/leads/route.ts`

- [ ] **Step 1: Add the import**

In `src/app/api/leads/route.ts`, the existing import block includes a line importing from `@/lib/automations`. Add this new import line directly below it:

```ts
import { sendLeadPush } from "@/lib/push";
```

- [ ] **Step 2: Send the push inside the existing `after()` block**

In the `POST` handler, the `after(async () => { ... })` block ends with a `results.forEach(...)` loop that logs each notification outcome. Immediately after that `results.forEach((r, i) => { ... });` statement and before the closing `});` of the `after()` callback, add:

```ts
        // 5. Push notification to every registered dashboard device
        try {
          await sendLeadPush({
            id: leadId,
            name,
            service,
            cityOrZip,
            score,
            priority,
          });
        } catch (err) {
          console.error(`[lead ${leadId}] push notification threw:`, err);
        }
```

(`sendLeadPush` logs its own `[PUSH] sent=… failed=… removed=…` line internally.)

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: build completes, route tree printed, no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/leads/route.ts
git commit -m "feat: send push notification on every new lead"
```

---

## Task 10: NotificationSetup UI component

**Files:**
- Create: `src/components/dashboard/NotificationSetup.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/dashboard/NotificationSetup.tsx`:

```tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { Bell, BellRing, BellOff, Loader2, Share, Plus, CheckCircle2 } from "lucide-react";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "";

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return arr;
}

type State =
  | "loading"
  | "unsupported"
  | "ios-needs-install"
  | "blocked"
  | "disabled"
  | "enabled";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
}

export function NotificationSetup() {
  const [state, setState] = useState<State>("loading");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  const detect = useCallback(async () => {
    if (typeof window === "undefined") return;
    const supported =
      "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;

    if (!supported) {
      const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      setState(isIOS && !standalone ? "ios-needs-install" : "unsupported");
      return;
    }

    try {
      const reg = await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;
      if (Notification.permission === "denied") {
        setState("blocked");
        return;
      }
      const sub = await reg.pushManager.getSubscription();
      setState(sub ? "enabled" : "disabled");
    } catch {
      setState("unsupported");
    }
  }, []);

  useEffect(() => {
    detect();
  }, [detect]);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function enable() {
    setBusy(true);
    setMsg("");
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setState("blocked");
        return;
      }
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription: sub.toJSON() }),
      });
      if (!res.ok) throw new Error("save failed");
      setState("enabled");
      setMsg("Lead alerts are on for this device.");
    } catch {
      setMsg("Couldn't enable alerts. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function disable() {
    setBusy(true);
    setMsg("");
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await fetch("/api/push/subscribe", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: sub.endpoint }),
        });
        await sub.unsubscribe();
      }
      setState("disabled");
      setMsg("Lead alerts turned off for this device.");
    } catch {
      setMsg("Couldn't turn off alerts.");
    } finally {
      setBusy(false);
    }
  }

  async function sendTest() {
    setBusy(true);
    setMsg("");
    try {
      const res = await fetch("/api/push/test", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error("test failed");
      setMsg(`Test sent to ${data.sent} device${data.sent === 1 ? "" : "s"}. Check your lock screen.`);
    } catch {
      setMsg("Couldn't send test notification.");
    } finally {
      setBusy(false);
    }
  }

  async function install() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    setInstallPrompt(null);
  }

  if (state === "loading" || state === "unsupported") return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      {state === "ios-needs-install" && (
        <div className="flex items-start gap-3">
          <Bell className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-700">
            <p className="font-semibold text-gray-900">Get lead alerts on your iPhone</p>
            <p className="mt-1 text-gray-500">
              Tap the <Share className="inline h-4 w-4 align-text-bottom" /> Share button below,
              choose <strong>Add to Home Screen</strong>, then open the app from your home screen
              and turn on alerts here.
            </p>
          </div>
        </div>
      )}

      {state === "blocked" && (
        <div className="flex items-start gap-3">
          <BellOff className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-700">
            <p className="font-semibold text-gray-900">Notifications are blocked</p>
            <p className="mt-1 text-gray-500">
              Enable notifications for this site in your browser/phone settings, then reload.
            </p>
          </div>
        </div>
      )}

      {state === "disabled" && (
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-orange-500 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-gray-900">Lead alerts are off on this device</p>
              <p className="text-gray-500">Get a notification the moment a lead comes in.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {installPrompt && (
              <button
                onClick={install}
                className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors min-h-[44px]"
              >
                <Plus className="h-4 w-4" /> Install app
              </button>
            )}
            <button
              onClick={enable}
              disabled={busy}
              className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors min-h-[44px] disabled:opacity-60"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <BellRing className="h-4 w-4" />}
              Enable lead alerts
            </button>
          </div>
        </div>
      )}

      {state === "enabled" && (
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-gray-900">Lead alerts are on for this device</p>
              <p className="text-gray-500">You&apos;ll be notified the moment a lead comes in.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={sendTest}
              disabled={busy}
              className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors min-h-[44px] disabled:opacity-60"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <BellRing className="h-4 w-4" />}
              Send test
            </button>
            <button
              onClick={disable}
              disabled={busy}
              className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors min-h-[44px] disabled:opacity-60"
            >
              <BellOff className="h-4 w-4" /> Turn off
            </button>
          </div>
        </div>
      )}

      {msg && <p className="mt-3 text-xs text-gray-500">{msg}</p>}
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: exit 0, no output.

- [ ] **Step 3: Commit**

```bash
git add src/components/dashboard/NotificationSetup.tsx
git commit -m "feat: add NotificationSetup dashboard component"
```

---

## Task 11: Mount the UI and add PWA metadata

**Files:**
- Modify: `src/app/dashboard/page.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Import NotificationSetup in the dashboard page**

In `src/app/dashboard/page.tsx`, the import block ends with the line
`import type { DashboardStats, Lead } from "@/lib/dashboard-types";`.
Add directly below it:

```ts
import { NotificationSetup } from "@/components/dashboard/NotificationSetup";
```

- [ ] **Step 2: Render NotificationSetup below the header**

In the same file, the JSX has a `{/* Header */}` block that closes with a `</div>` immediately before the `{/* Stats */}` comment. Insert `<NotificationSetup />` between them so this section reads:

```tsx
      {/* Notifications setup */}
      <NotificationSetup />

      {/* Stats */}
      <StatsGrid stats={stats || fallbackStats} />
```

- [ ] **Step 3: Add appleWebApp metadata in the root layout**

In `src/app/layout.tsx`, the exported `metadata` object ends with the `keywords: [ ... ]` array followed by `};`. Add an `appleWebApp` property to the object, directly after the closing `]` of `keywords` and before the final `};`:

```ts
  appleWebApp: {
    capable: true,
    title: "BB Leads",
    statusBarStyle: "default",
  },
```

(The `<link rel="manifest">` tag is added automatically by Next.js because `src/app/manifest.ts` exists — no manual tag needed.)

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: build completes, route tree shows `/manifest.webmanifest` and `/api/push/...`, no errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/dashboard/page.tsx src/app/layout.tsx
git commit -m "feat: mount notification setup UI and PWA metadata"
```

---

## Task 12: Deploy and verify end-to-end

**Files:** none (deploy + smoke test)

- [ ] **Step 1: Confirm prerequisites with the user**

Before deploying, confirm the user has completed:
- Task 1 Step 6 — the four VAPID env vars added to Vercel.
- Task 2 Step 3 — `migration_003_push_subscriptions.sql` run in Supabase.
Do not proceed until both are confirmed.

- [ ] **Step 2: Push to deploy**

With user authorization, run: `git push origin main`
Expected: push succeeds; Vercel auto-deploys. Wait for the deployment to reach "Ready" (`vercel ls`).

- [ ] **Step 3: Install + enable on a device**

The user opens `https://www.backyardbobbys.com/dashboard` on a phone (Nick: Android; Bobby: iPhone), installs to the home screen, opens the installed app, and taps "Enable lead alerts." Expected: permission prompt → granted → card shows "Lead alerts are on for this device."

- [ ] **Step 4: Send a test notification**

In the installed app, tap "Send test." Expected: the card shows "Test sent to N devices…" and a "✅ Test Notification" appears on the phone's lock screen. Tapping it opens the dashboard.

- [ ] **Step 5: Verify a real lead triggers a push**

Submit a clearly-marked test lead (reuse the verified method: `POST https://www.backyardbobbys.com/api/leads` with a `TEST` name). Expected: a "📋 New Lead: TEST…" notification on the lock screen; Vercel logs show `[PUSH] sent=… failed=0 removed=0`. Then delete the test lead from the database (same as the email-fix verification).

- [ ] **Step 6: Final commit (if any cleanup needed)**

If no code changed in this task, nothing to commit. Otherwise commit any fixes with a descriptive message.

---

## Self-Review Notes

- **Spec coverage:** manifest (T4), service worker (T5), icons (T3), `push_subscriptions` table (T2), VAPID keys (T1), `push.ts` send helper with stale-subscription cleanup (T6), subscribe/unsubscribe + test routes (T7, T8), lead-handler wiring (T9), `NotificationSetup` UI with iOS/blocked/install states (T10), mount + appleWebApp metadata (T11), testing/deploy (T12). All spec sections map to a task.
- **iOS constraint** handled in T10 via the `ios-needs-install` state.
- **Error handling** — expired subscriptions removed on 404/410 (T6); all push failures logged, never block other channels (T6, T9).
- **No placeholders** — every code step contains complete, final code.
- **Type consistency** — `sendPushToAll` / `sendLeadPush` signatures in T6 match their call sites in T8 and T9; `PushPayload` fields (`title`, `body`, `url`, `tag`) are consistent across `push.ts`, `sw.js`, and the routes.
