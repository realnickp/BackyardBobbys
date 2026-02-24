"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, X, ArrowRight, ZoomIn } from "lucide-react";
import { STAMPED_CONCRETE_STYLES, type StampedConcreteStyle } from "@/lib/constants";

interface StampedStylePickerProps {
  onSelect?: (style: StampedConcreteStyle) => void;
  selectedSlug?: string;
}

export function StampedStylePicker({ onSelect, selectedSlug }: StampedStylePickerProps) {
  const [lightbox, setLightbox] = useState<StampedConcreteStyle | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
        {STAMPED_CONCRETE_STYLES.map((style) => {
          const isSelected = selectedSlug === style.slug;
          return (
            <div
              key={style.slug}
              role="button"
              tabIndex={0}
              onClick={() => onSelect?.(style)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect?.(style); } }}
              className={`group relative rounded-xl overflow-hidden text-left transition-all duration-200 ring-offset-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                isSelected
                  ? "ring-2 ring-brand shadow-lg shadow-brand/20 scale-[1.02]"
                  : "hover:shadow-md hover:scale-[1.01]"
              }`}
            >
              <div className="aspect-square relative">
                <Image
                  src={style.image}
                  alt={`${style.name} stamped concrete pattern`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {isSelected && (
                  <div className="absolute top-2 right-2 h-7 w-7 rounded-full bg-brand flex items-center justify-center shadow-md">
                    <Check className="h-4 w-4 text-white" strokeWidth={3} />
                  </div>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox(style);
                  }}
                  className="absolute top-2 left-2 h-7 w-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
                  aria-label={`Enlarge ${style.name}`}
                >
                  <ZoomIn className="h-3.5 w-3.5 text-white" />
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-2.5">
                <p className="text-white font-bold text-xs leading-tight drop-shadow-md">
                  {style.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          />
          <div className="relative max-w-2xl w-full animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white p-2 transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="rounded-2xl overflow-hidden bg-white shadow-2xl">
              <div className="relative aspect-[4/3]">
                <Image
                  src={lightbox.image}
                  alt={`${lightbox.name} stamped concrete pattern`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 640px"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-1">{lightbox.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {lightbox.description}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onSelect?.(lightbox);
                    setLightbox(null);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-brand to-brand-dark text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  Select This Style <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function StampedStyleGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
      {STAMPED_CONCRETE_STYLES.map((style) => (
        <div key={style.slug} className="group rounded-xl overflow-hidden">
          <div className="aspect-square relative">
            <Image
              src={style.image}
              alt={`${style.name} stamped concrete pattern`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-2.5">
            <p className="text-white font-bold text-xs leading-tight drop-shadow-md">
              {style.name}
            </p>
            <p className="text-white/60 text-[10px] leading-tight mt-0.5 line-clamp-2">
              {style.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
