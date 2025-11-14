// components/home/hero.tsx
"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { CARDS } from "@/content/home/hero";

gsap.registerPlugin(useGSAP);

const HIGHLIGHT_TEXT = "REMEMBERED";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  const overlineRef = useRef<HTMLParagraphElement>(null);
  const highlightWrapperRef = useRef<HTMLSpanElement>(null);

  // WE, BUILT, TO, BE, REMEMBERED wrapper (for rise animation)
  const wordRefs = useRef<HTMLSpanElement[]>([]);
  // R E M E M B E R E D (characters for color animation)
  const charRefs = useRef<HTMLSpanElement[]>([]);

  useGSAP(
    () => {
      const overline = overlineRef.current;
      const highlightWrapper = highlightWrapperRef.current;

      const words = wordRefs.current.filter(
        (el): el is HTMLSpanElement => el != null
      );
      const chars = charRefs.current.filter(
        (el): el is HTMLSpanElement => el != null
      );

      if (!overline || !highlightWrapper || words.length === 0 || !chars.length)
        return;

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) {
        gsap.set([overline, ...words, highlightWrapper, ...chars], {
          clearProps: "all",
        });
        return;
      }

      // Initial: words come from below
      gsap.set(words, {
        y: 40,
        opacity: 0,
        willChange: "transform,opacity",
      });

      // Initial: highlight collapsed
      gsap.set(highlightWrapper, {
        "--a-highlight-scale": 0,
      } as gsap.TweenVars);

      // Initial: all highlight chars in foreground color
      gsap.set(chars, {
        color: "var(--color-foreground)",
        willChange: "color",
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      // 1) Overline
      tl.from(overline, {
        y: 14,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      // 2) Words rise one by one
      tl.to(
        words,
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.16,
          ease: "power3.out",
        },
        "-=0.15"
      );

      // 3) Highlight draw + per-character color flip in sync
      const highlightDuration = 1.0;

      tl.to(
        highlightWrapper,
        {
          "--a-highlight-scale": 1,
          duration: highlightDuration,
          ease: "power2.out",
        } as gsap.TweenVars,
        "+=0.1"
      );

      tl.to(
        chars,
        {
          color: "var(--color-background)",
          duration: highlightDuration * 0.9,
          ease: "none",
          stagger: {
            each: (highlightDuration * 0.9) / chars.length,
            from: "start",
          },
        },
        "<" // run together with highlight
      );
    },
    { scope: root }
  );

  // helper to assign refs for words
  const setWordRef =
    (index: number) =>
    (el: HTMLSpanElement | null): void => {
      if (!el) return;
      wordRefs.current[index] = el;
    };

  // helper to assign refs for highlight characters
  const setCharRef =
    (index: number) =>
    (el: HTMLSpanElement | null): void => {
      if (!el) return;
      charRefs.current[index] = el;
    };

  return (
    <section
      ref={root}
      className="relative overflow-hidden h-[calc(100vh-4.5rem)] flex flex-col items-center md:justify-center"
    >
      <div className="container-xl gutter section-pt section-pb text-center">
        {/* Overline */}
        <p
          ref={overlineRef}
          className="text-foreground font-mono text-[18px] md:text-[22px] leading-[1.4] mb-4"
        >
          We don’t just build websites
        </p>

        {/* Big headliner */}
        <h1 className="font-hero font-bold text-[75px] md:text-[150px] text-center uppercase leading-[1.2] tracking-[-0.01em] select-none">
          <span ref={setWordRef(0)} className="inline-block home-hero-word">
            WE
          </span>{" "}
          <span ref={setWordRef(1)} className="inline-block home-hero-word">
            BUILT
          </span>{" "}
          <span ref={setWordRef(2)} className="inline-block home-hero-word">
            TO
          </span>{" "}
          <span ref={setWordRef(3)} className="inline-block home-hero-word">
            BE
          </span>{" "}
          {/* Highlighted word (REMEMBERED) */}
          <span
            ref={(el) => {
              if (!el) return;
              highlightWrapperRef.current = el;
              setWordRef(4)(el); // treat highlight wrapper as the 5th "word"
            }}
            className="sv-avenora inline-block align-baseline -mx-1 px-3 md:px-3 pb-3"
          >
            {HIGHLIGHT_TEXT.split("").map((ch, i) => (
              <span
                key={`${ch}-${i}`}
                ref={setCharRef(i)}
                className="inline-block align-baseline"
              >
                {ch}
              </span>
            ))}
          </span>
        </h1>

        {/* Mobile Horizontal Carousel (unchanged) */}
        {/* <div className="relative mt-8 w-full md:hidden">
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

          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-background to-transparent" />
        </div> */}
      </div>
    </section>
  );
}
