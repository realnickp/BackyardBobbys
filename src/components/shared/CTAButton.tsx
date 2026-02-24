"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Phone } from "lucide-react";
import { SITE } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

interface CTAButtonProps {
  variant?: "primary" | "secondary" | "phone" | "outline" | "outline-light";
  size?: "default" | "lg";
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function CTAButton({
  variant = "primary",
  size = "default",
  href,
  onClick,
  children,
  className,
}: CTAButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 cursor-pointer";

  const variants = {
    primary:
      "bg-gradient-to-br from-brand to-brand-dark text-white shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/30 hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-primary text-primary-foreground hover:bg-primary/90",
    phone:
      "bg-white/10 text-white border border-white/25 backdrop-blur-sm hover:bg-white/20 hover:border-white/40",
    outline:
      "border-2 border-brand text-brand hover:bg-brand hover:text-white hover:scale-[1.02]",
    "outline-light":
      "border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50",
  };

  const sizes = {
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  const handleClick = () => {
    if (variant === "phone") {
      trackEvent("cta_phone_click");
    } else {
      trackEvent("cta_click", { variant });
    }
    onClick?.();
  };

  if (variant === "phone") {
    return (
      <a href={SITE.phoneTel} className={classes} onClick={handleClick}>
        <Phone className="h-4 w-4" />
        {children ?? `Call ${SITE.phone}`}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={handleClick}>
      {children}
    </button>
  );
}
