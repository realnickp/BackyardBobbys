import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// No Chatbot on ad landing pages — the estimate quiz/form, call, and text are
// the only conversion paths, and the widget crowded the mobile layout.
export default function LpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
