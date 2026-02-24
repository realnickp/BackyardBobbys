"use client";

import { useState } from "react";
import { X, Shield, FileText, Clock, DollarSign } from "lucide-react";

export function FinancingModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </span>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-brand to-brand-dark text-white">
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5" />
                <div>
                  <p className="font-bold text-sm">Prequalify for Financing</p>
                  <p className="text-xs text-white/70">
                    Powered by Wisetack &middot; No credit impact
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-white">
              <iframe
                src="https://wisetack.us/#/m39n9j4/prequalify"
                title="Wisetack Financing Prequalification — Backyard Bobby's"
                className="w-full border-0"
                style={{ height: "580px" }}
                loading="lazy"
                allow="payment"
              />
            </div>

            <div className="flex items-center justify-center gap-5 px-5 py-3 bg-gray-50 border-t border-border/30 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Shield className="h-3 w-3" /> Secure
              </span>
              <span className="flex items-center gap-1">
                <FileText className="h-3 w-3" /> No hard credit pull
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> ~60 seconds
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
