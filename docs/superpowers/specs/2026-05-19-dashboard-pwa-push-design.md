# Dashboard PWA + Push Notifications — Design

**Date:** 2026-05-19
**Project:** Backyard Bobby's (`site/`, Next.js 16, Vercel project `backyard-bobbys`)
**Status:** Approved design — pending spec review

## Goal

Let Bobby and Nick install the lead dashboard to their phone home screens as an
app, and receive a push notification on the lock screen whenever a new lead
comes through. Tapping the notification opens that lead.

- Bobby uses an iPhone (iOS Safari).
- Nick uses Android (Chrome).
- Both log into the same password-protected `/dashboard`.

## Approach

**Self-hosted Web Push** (chosen over OneSignal and Pushover). The dashboard
itself becomes the installable Progressive Web App; notifications are sent by
the existing lead code using the standard Web Push protocol with VAPID auth. No
third-party service, no recurring cost, consistent with the rest of the stack
(Resend, Supabase used directly).

Push is **additive** — email notifications are unchanged and remain the
guaranteed channel. Push is the fast, convenient layer on top.

## User Experience

### Install (one-time per person)
- **Android (Nick):** dashboard shows an "Install app" button (driven by the
  `beforeinstallprompt` event). Tap → confirm → "Backyard Bobby's Leads" app
  appears on the home screen, opens standalone to `/dashboard`.
- **iPhone (Bobby):** no install API exists on iOS. The dashboard detects
  iOS-Safari-not-installed and shows step-by-step "Share → Add to Home Screen"
  instructions instead of a button.

### Enable alerts (one-time per device)
A "🔔 Enable lead alerts on this device" control in the dashboard. Tapping it
registers the service worker, requests notification permission, creates a push
subscription, and saves it to the database. Each device registers itself, so
multiple devices/people are supported. The control reflects state: enabled,
not-enabled, or blocked (permission denied).

### Receive a lead
On a new lead, every registered device gets a lock-screen notification, e.g.
`🔥 New Lead: Sarah M. — Deck — Annapolis — 72/100`. Tapping opens the app
directly to `/dashboard/leads/<id>`.

### iOS constraint (stated, not a bug)
Apple does not allow web push until the PWA is added to the home screen and
opened standalone. For Bobby, "Add to Home Screen" is therefore step one. The
enable control is hidden behind the install instructions until iOS reports the
app is running standalone.

## Architecture / Components

### 1. Web App Manifest — `src/app/manifest.ts`
Next.js metadata route. `name: "Backyard Bobby's Leads"`, `short_name:
"BB Leads"`, `start_url: "/dashboard"`, `display: "standalone"`, brand
`theme_color`/`background_color`, icon set.

### 2. App icons — `public/icon-192.png`, `icon-512.png`, `icon-512-maskable.png`
Generated from the existing logo with `sharp` (already a dependency). The
maskable variant includes safe padding for Android adaptive icons.

### 3. Service worker — `public/sw.js`
Plain static JS, root scope. Handles:
- `push` event → `showNotification()` with the lead title/body and a URL.
- `notificationclick` → focus an existing dashboard window or open the lead URL.

### 4. Database table — `supabase/migration_003_push_subscriptions.sql`
New table `push_subscriptions`:

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | default `gen_random_uuid()` |
| `endpoint` | text | **unique** — the push service URL |
| `p256dh` | text | subscription public key |
| `auth` | text | subscription auth secret |
| `user_agent` | text | for a human-readable device label |
| `created_at` | timestamptz | default `now()` |
| `last_used_at` | timestamptz | updated on each successful send |

### 5. VAPID keys — environment variables
Generated once with `web-push generate-vapid-keys`. Added to `.env.local` and
Vercel (Production/Preview/Development):
- `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY` — server, signs push requests.
- `VAPID_SUBJECT` — a `mailto:` contact string.
- `NEXT_PUBLIC_VAPID_PUBLIC_KEY` — same public key, exposed to the browser so
  it can create a subscription.

### 6. Push send helper — `src/lib/push.ts`
`sendLeadPush(lead)` — loads all `push_subscriptions`, sends each a notification
via the `web-push` npm package. On a `404`/`410` response (expired/unsubscribed)
it deletes that row. All sends run with `Promise.allSettled`; per-device
failures are logged and never block the others.

### 7. API routes
- `src/app/api/push/subscribe/route.ts`
  - `POST` — upsert a subscription (auth-protected via `requireAuth`).
  - `DELETE` — remove a subscription by endpoint (turn alerts off).
- `src/app/api/push/test/route.ts`
  - `POST` — send a test notification to all registered devices
    (auth-protected). Backs the "Send test notification" button.

### 8. Dashboard UI — `src/components/dashboard/NotificationSetup.tsx`
Client component, mounted on the dashboard overview page. Responsibilities:
- Register the service worker.
- Detect platform/install state (`display-mode: standalone`,
  `navigator.standalone`, iOS UA).
- Render the Android "Install app" button or the iOS add-to-home-screen guide.
- Render the "Enable / Disable lead alerts" control + a "Send test
  notification" button.

## Data Flow

**Enable:** dashboard → register `sw.js` → `Notification.requestPermission()` →
`pushManager.subscribe(NEXT_PUBLIC_VAPID_PUBLIC_KEY)` → `POST /api/push/subscribe`
→ row saved.

**New lead:** form `POST /api/leads` → lead row inserted → existing `after()`
block runs → welcome email, admin email, SMS attempts, **+ `sendLeadPush(lead)`**
→ each device gets a notification → tap → `/dashboard/leads/<id>`.

Chatbot-qualified leads also post to `/api/leads`, so they are covered with no
extra work.

## Error Handling

- Permission denied → UI shows a "blocked" state with re-enable guidance.
- Expired/invalid subscription → server deletes the row on `404`/`410`.
- Push send failure → logged like email (`[lead <id>] push ...`), does not block
  other devices or other notification channels.
- No registered devices → push step no-ops silently.
- iOS, not installed → enable control replaced by install instructions; no
  dead-end button.

## Out of Scope

- SMS / Twilio (separate, deferred by the user).
- Per-user notification preferences or quiet hours.
- Filtering to hot-leads-only (notifications fire for every lead; filtering is a
  trivial later change).
- Making the marketing site installable in a deliberate way — the manifest
  technically applies origin-wide, but install/enable UI appears only on the
  dashboard, so homeowners never encounter it. Acceptable.

## Testing / Verification

- `npm run build` + `tsc --noEmit` clean.
- Local: subscribe in desktop Chrome, submit a test lead, confirm the
  notification fires and the click opens the lead.
- Production: after deploy, Nick installs on Android and enables alerts, then a
  test lead is submitted and confirmed; the "Send test notification" button
  gives an on-demand re-check. Bobby repeats the install on iPhone.
- A clearly-marked test lead is deleted afterward, as in the email fix.

## Dependencies & Config Checklist

- npm: add `web-push`.
- Env vars (local + Vercel): `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`,
  `VAPID_SUBJECT`, `NEXT_PUBLIC_VAPID_PUBLIC_KEY`.
- Supabase: run `migration_003_push_subscriptions.sql`.

## Files

**New:**
- `src/app/manifest.ts`
- `public/sw.js`
- `public/icon-192.png`, `public/icon-512.png`, `public/icon-512-maskable.png`
- `supabase/migration_003_push_subscriptions.sql`
- `src/lib/push.ts`
- `src/app/api/push/subscribe/route.ts`
- `src/app/api/push/test/route.ts`
- `src/components/dashboard/NotificationSetup.tsx`

**Modified:**
- `src/app/api/leads/route.ts` — add `sendLeadPush` to the `after()` block.
- `src/app/dashboard/page.tsx` — mount `NotificationSetup`.
- `src/app/layout.tsx` — apple-touch / PWA `<meta>` tags (manifest itself is
  auto-linked by `manifest.ts`).
- `.env.local`, `.env.local.example` — VAPID keys.
- `package.json` — `web-push` dependency.
