import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  name: string;
  location: string;
  text: string;
  service: string;
  rating: number;
  featured?: boolean;
}

export function TestimonialCard({ name, location, text, service, rating, featured }: TestimonialCardProps) {
  if (featured) {
    return (
      <div className="relative rounded-2xl bg-primary text-primary-foreground p-8 md:p-12 dark-textured overflow-hidden">
        <div className="absolute top-4 left-6 text-brand/20 text-[120px] leading-none font-display select-none">
          &ldquo;
        </div>
        <div className="relative">
          <div className="flex gap-0.5 mb-6">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-brand text-brand" />
            ))}
          </div>
          <blockquote className="font-display text-2xl md:text-3xl leading-snug mb-6 text-primary-foreground/90">
            &ldquo;{text}&rdquo;
          </blockquote>
          <div>
            <p className="font-bold text-brand">{name}</p>
            <p className="text-sm text-primary-foreground/50">
              {location} &middot; {service}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col rounded-2xl bg-white p-6 shadow-md border border-border/30")}>
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-brand text-brand" />
        ))}
      </div>
      <blockquote className="flex-1 text-muted-foreground mb-4 leading-relaxed text-sm">
        &ldquo;{text}&rdquo;
      </blockquote>
      <div className="border-t border-border/50 pt-3">
        <p className="font-semibold text-sm">{name}</p>
        <p className="text-xs text-muted-foreground">
          {location} &middot; {service}
        </p>
      </div>
    </div>
  );
}
