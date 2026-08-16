import type { Metadata } from "next";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

export const metadata: Metadata = {
  title: { default: "Lead Command Center", template: "%s | Bobby's CRM" },
  robots: { index: false, follow: false },
  // PWA install is dashboard-only — public pages must never link the manifest,
  // or browsers offer "Install Backyard Bobby's Leads" to site visitors.
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "BB Leads",
    statusBarStyle: "default",
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardNav />

      {/* Main content — pt-14 offsets the fixed mobile header */}
      <main className="flex-1 overflow-auto pt-14 md:pt-0">
        {children}
      </main>
    </div>
  );
}
