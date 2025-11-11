"use client";

import Image from "next/image";
import { CARDS } from "@/content/home/hero";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".card");
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Final layout is defined by your absolute positions.
      // We only animate transforms for performance.
      if (prefersReduced) {
        gsap.set(cards, { xPercent: 0 });
        return;
      }

      cards.forEach((el) =>
        gsap.set(el, {
          xPercent: el.className.includes("right-") ? 10 : -10,
          willChange: "transform",
        })
      );

      const enter = () =>
        gsap.to(cards, {
          xPercent: 0,
          duration: 1,
          ease: "power4.out",
          overwrite: "auto",
        });

      const leave = () =>
        gsap.to(cards, {
          xPercent: (i, el) => (el.className.includes("right-") ? 10 : -10),

          duration: 1,
          ease: "power4.out",
          overwrite: "auto",
        });

      const el = root.current!;
      el.addEventListener("mouseenter", enter, { passive: true });
      el.addEventListener("mouseleave", leave, { passive: true });

      return () => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      };
    },
    { scope: root }
  );
  return (
    <section
      ref={root}
      className="relative overflow-hidden h-[calc(100vh-4.5rem)] flex flex-col items-center md:justify-center"
    >
      <div className="container-xl gutter section-pt section-pb text-center ">
        {/* Overline */}
        <p className="text-foreground font-mono text-[18px] md:text-[22px] leading-[1.4] mb-4">
          We don’t just build websites
        </p>

        {/* Big headliner */}
        <h1 className="font-hero font-bold text-[75px] md:text-[150px] text-center uppercase leading-[0.95] tracking-[-0.01em] select-none">
          {/* Use a clamp to match your Figma scale (mobile→desktop) */}
          WE BUILT TO BE REMEMBERED
        </h1>

        {/* --- Mobile Horizontal Carousel (fixed fades) --- */}
        <div className="relative mt-8 w-full md:hidden">
          {/* scroller */}
          <div className="overflow-x-auto snap-x snap-mandatory scroll-smooth">
            <div className="flex gap-4 px-2 h-[500px]">
              {CARDS.map((c, i) => (
                <figure
                  key={i}
                  className="card shrink-0 w-[85%] snap-center overflow-hidden rounded-sm shadow-sm bg-surface"
                >
                  <Image
                    src={c.src}
                    alt={c.alt}
                    width={300}
                    height={500}
                    className="w-full h-full object-cover"
                    priority={i < 2}
                  />
                </figure>
              ))}
            </div>
          </div>

          {/* fixed edge fades (don’t scroll) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>

      {/* Floating desktop cards */}
      <div className="cursor-pointer">
        {CARDS.map((c, i) => (
          <figure
            key={i}
            className={["card overflow-hidden shadow-sm", c.className].join(
              " "
            )}
          >
            <Image
              src={c.src}
              alt={c.alt}
              width={720}
              height={480}
              className="w-full h-auto"
              priority={i < 2}
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
