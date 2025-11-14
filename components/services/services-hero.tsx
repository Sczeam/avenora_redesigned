// components/services/services-hero.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const AVENORA_TEXT = "AVENORA";

export function ServicesHero() {
  const root = useRef<HTMLElement>(null);

  const overlineRef = useRef<HTMLParagraphElement>(null);
  const caretRef = useRef<HTMLButtonElement>(null);
  const avenoraWrapperRef = useRef<HTMLSpanElement>(null);

  // THIS, IS, AVENORA (the word wrapper) — for the rise animation
  const wordRefs = useRef<HTMLSpanElement[]>([]);
  // A V E N O R A — for color animation
  const charRefs = useRef<HTMLSpanElement[]>([]);

  useGSAP(
    () => {
      const overline = overlineRef.current;
      const caret = caretRef.current;
      const avenoraWrapper = avenoraWrapperRef.current;

      const words = wordRefs.current.filter(
        (el): el is HTMLSpanElement => el != null
      );
      const chars = charRefs.current.filter(
        (el): el is HTMLSpanElement => el != null
      );

      if (
        !overline ||
        !caret ||
        !avenoraWrapper ||
        words.length < 3 ||
        !chars.length
      )
        return;

      // Initial: words come from below
      gsap.set(words, {
        y: 40,
        opacity: 0,
        willChange: "transform, opacity",
      });

      // Initial: highlight collapsed
      gsap.set(avenoraWrapper, {
        "--a-highlight-scale": 0,
      } as gsap.TweenVars);

      // Initial: all characters in foreground color
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

      // 2) Words rise one by one (slow & smooth)
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
        avenoraWrapper,
        {
          "--a-highlight-scale": 1,
          duration: highlightDuration,
          ease: "power2.out",
        } as gsap.TweenVars,
        "+=0.1" // small pause after words finish rising
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
        "<" // start with the highlight
      );

      // 4) Scroll caret at the end
      tl.fromTo(
        caret,
        { y: -8, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2"
      );
    },
    { scope: root }
  );

  const scrollToList = () => {
    document
      .getElementById("services-list")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // assign word refs (THIS, IS, AVENORA wrapper)
  const setWordRef =
    (index: number) =>
    (el: HTMLSpanElement | null): void => {
      if (!el) return;
      wordRefs.current[index] = el;
    };

  // assign char refs (A, V, E, N, O, R, A)
  const setCharRef =
    (index: number) =>
    (el: HTMLSpanElement | null): void => {
      if (!el) return;
      charRefs.current[index] = el;
    };

  return (
    <section ref={root} aria-labelledby="services-hero" className="relative">
      <div className="gutter section-pt section-pb text-center min-h-[calc(100vh-4.5rem)] flex flex-col items-center justify-between">
        {/* Overline */}
        <p
          ref={overlineRef}
          className="font-mono text-foreground-2 text-[14px] md:text-[16px] leading-[1.7]"
          id="services-hero"
        >
          We don’t chase trends. We refine them…
        </p>

        {/* Big Headline */}
        <h1
          className="mt-10 md:mt-14 font-hero font-bold uppercase leading-[0.92] tracking-[-0.01em]
                     text-[clamp(2.5rem,8vw,8rem)]"
        >
          {/* THIS IS */}
          <span ref={setWordRef(0)} className="inline-block align-baseline">
            <span className="inline-block align-baseline">THIS</span>
            <span>&nbsp;</span>
            <span ref={setWordRef(1)} className="inline-block align-baseline">
              IS
            </span>
          </span>{" "}
          {/* AVENORA (word wrapper animates position + highlight; chars animate color) */}
          <span
            ref={(el) => {
              if (!el) return;
              avenoraWrapperRef.current = el;
              setWordRef(2)(el); // AVENORA wrapper is the 3rd "word"
            }}
            className="sv-avenora inline-block align-baseline -mx-1 px-3 md:px-3 pb-3"
          >
            {AVENORA_TEXT.split("").map((ch, i) => (
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

        {/* Scroll cue */}
        <button
          ref={caretRef}
          type="button"
          onClick={scrollToList}
          aria-label="Scroll to services"
          className="mt-14 inline-flex items-center justify-center size-10 animate-bounce rounded-full
                     hover:-translate-y-0.5 transition-transform"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
