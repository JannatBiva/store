"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

export type Slide = {
  src: string;
  alt: string;
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

type Props = {
  slides: Slide[];
  intervalMs?: number;
  pauseOnHover?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
  aspect?: string;    
  rounded?: string;
  fullBleed?: boolean;
};

export default function BannerSlider({
  slides,
  intervalMs = 5000,
  pauseOnHover = true,
  showDots = true,
  showArrows = true,
  className,
  aspect = "aspect-[10/9] sm:aspect-[16/9] lg:aspect-[24/7]",
  rounded = "rounded-3xl",
  fullBleed = false,
}: Props) {
  const safeSlides = useMemo(() => slides.filter(Boolean), [slides]);
  const count = safeSlides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // swipe support
  const startX = useRef<number | null>(null);
  const deltaX = useRef(0);

  const next = () => setIndex(i => (i + 1) % count);
  const prev = () => setIndex(i => (i - 1 + count) % count);
  const goTo = (i: number) => setIndex(((i % count) + count) % count);

  useEffect(() => {
    if (count <= 1) return;
    if (pauseOnHover && paused) return;
    const id = window.setInterval(next, intervalMs);
    return () => window.clearInterval(id);
  }, [count, paused, pauseOnHover, intervalMs]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!count) return null;

  return (
    <section
      className={["relative w-full", fullBleed ? "" : "", className ?? ""].join(" ")}
      aria-roledescription="carousel"
      aria-label="Promotional banners"
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      onTouchStart={(e) => {
        startX.current = e.touches[0].clientX;
        deltaX.current = 0;
      }}
      onTouchMove={(e) => {
        if (startX.current === null) return;
        deltaX.current = e.touches[0].clientX - startX.current;
      }}
      onTouchEnd={() => {
        if (Math.abs(deltaX.current) > 50) deltaX.current < 0 ? next() : prev();
        startX.current = null;
        deltaX.current = 0;
      }}
    >
      {/* Stage */}
      <div className={`relative w-full overflow-hidden ${rounded} ${aspect} min-h-[240px] sm:min-h-[300px]`}>
        {safeSlides.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={`${s.src}-${i}`}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${active ? "opacity-100" : "opacity-0"}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 h-full bg-gradient-to-r from-pink-400 via-fuchsia-500 to-indigo-600 text-white">
                {/* Copy block */}
                <div className="flex flex-col justify-center p-4 sm:p-6 md:p-10">
                  {s.heading && (
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight whitespace-pre-line">
                      {s.heading}
                    </h1>
                  )}
                  {s.subheading && (
                    <p className="mt-2 sm:mt-3 text-white/90 text-sm sm:text-base">
                      {s.subheading}
                    </p>
                  )}
                  {s.ctaHref && s.ctaLabel && (
                    <a
                      href={s.ctaHref}
                      className="mt-3 sm:mt-4 inline-flex items-center justify-center rounded-full bg-white text-slate-900 px-3 py-1.5 text-xs sm:text-sm sm:px-4 sm:py-2 hover:bg-white/90 shadow"
                    >
                      {s.ctaLabel}
                    </a>
                  )}
                </div>

                {/* Image block */}
                <div className="relative">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    // On mobile we stack; use cover. On md+ with 2 cols, contain to keep full subject right-aligned.
                    className="object-cover md:object-contain md:object-right"
                    priority={i === 0}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Arrows */}
      {showArrows && count > 1 && (
        <>
          <button
            aria-label="Previous slide"
            onClick={prev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 grid place-items-center
                       h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white/90 hover:bg-white shadow-lg ring-1 ring-black/10"
          >
            <span className="text-base sm:text-xl leading-none">‹</span>
          </button>
          <button
            aria-label="Next slide"
            onClick={next}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 grid place-items-center
                       h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white/90 hover:bg-white shadow-lg ring-1 ring-black/10"
          >
            <span className="text-base sm:text-xl leading-none">›</span>
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && count > 1 && (
        <div className="absolute inset-x-0 bottom-2 sm:bottom-3 flex items-center justify-center gap-1.5 sm:gap-2">
          {safeSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition-all ${
                i === index ? "bg-white w-5 sm:w-6" : "bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
