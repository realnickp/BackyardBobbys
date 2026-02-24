"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Validate redirect to prevent open redirect to external URLs
  const rawRedirect = searchParams.get("redirect") || "/dashboard";
  const redirect =
    rawRedirect.startsWith("/") && !rawRedirect.startsWith("//")
      ? rawRedirect
      : "/dashboard";

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(
          data.error === "Too many attempts. Try again later."
            ? "Too many failed attempts. Please wait before trying again."
            : "Invalid password. Please try again."
        );
        return;
      }

      router.push(redirect);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Dashboard Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
        Sign In
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Image src="/images/logo.png" alt="Backyard Bobby's" width={200} height={75} className="h-16 w-auto mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900">Lead Command Center</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to manage your leads</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <Suspense fallback={<div className="h-32 flex items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-gray-400" /></div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
