import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "warm" | "dark" | "dark-gradient";
}

export function Section({ children, className, id, variant = "default" }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        variant === "warm" && "bg-warm-bg",
        variant === "dark" && "bg-primary text-primary-foreground dark-textured",
        variant === "dark-gradient" &&
          "bg-gradient-to-br from-primary via-primary to-[oklch(0.22_0.06_255)] text-primary-foreground dark-textured",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
