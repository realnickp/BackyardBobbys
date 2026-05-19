"use client";

import { useState, useEffect, useCallback } from "react";
import { Bell, BellRing, BellOff, Loader2, Share, Plus, CheckCircle2 } from "lucide-react";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "";

function urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const buffer = new ArrayBuffer(raw.length);
  const arr = new Uint8Array(buffer);
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
