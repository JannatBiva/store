"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/shop/ProductCard";

type Props = {
  title: string;
  href: string;          
  items: any[];          
  className?: string;
};

export default function ScrollableProducts({ title, href, items, className = "" }: Props) {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, clientWidth, scrollWidth } = el;
    setAtStart(scrollLeft <= 1);
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
  };

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => updateEdges();
    el.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => updateEdges();
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [items?.length]);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Link href={href} className="text-sm text-[#0000FF] hover:underline">
          View more &gt;
        </Link>
      </div>

      <div className="relative">
        {/* gradient edges (mobile only) */}
        {!atStart && <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent md:hidden" />}
        {!atEnd && <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent md:hidden" />}

        {/* track: flex scroller on mobile, grid on md+ */}
        <ul
          ref={trackRef}
          className="
            flex md:grid
            gap-4 md:gap-6
            overflow-x-auto md:overflow-visible
            snap-x snap-mandatory md:snap-none
            [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
            md:grid-cols-3 lg:grid-cols-4
            py-1
          "
          aria-label={`${title} products`}
        >
          {items.map((p) => (
            <li
              key={p.id}
              className="
                snap-start
                min-w-[75%] sm:min-w-[50%]   /* 1–2 cards per view on mobile */
                md:min-w-0                    /* grid takes over on md+ */
              "
            >
              <ProductCard item={p as any} />
            </li>
          ))}
        </ul>

        {/* arrows (mobile only) */}
        <button
          aria-label="Previous"
          onClick={() => scrollByAmount(-1)}
          disabled={atStart}
          className="
            md:hidden
            absolute left-1 top-1/2 -translate-y-1/2
            h-9 w-9 grid place-items-center rounded-full
            bg-white/90 hover:bg-white shadow ring-1 ring-black/10
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          ‹
        </button>
        <button
          aria-label="Next"
          onClick={() => scrollByAmount(1)}
          disabled={atEnd}
          className="
            md:hidden
            absolute right-1 top-1/2 -translate-y-1/2
            h-9 w-9 grid place-items-center rounded-full
            bg-white/90 hover:bg-white shadow ring-1 ring-black/10
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          ›
        </button>
      </div>
    </section>
  );
}
