"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import CustomEase from "gsap/CustomEase";

export function PhilosophySection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

      // handcrafted ease (snappy but not gimmicky)
      if (!gsap.parseEase("avenora")) {
        CustomEase.create("avenora", "M0,0 C0.12,0.78 0.18,1 1,1");
      }

      const el = root.current!;
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const titleEl = el.querySelector(".ph-title")!;
      const kickerEl = el.querySelector(".ph-kicker")!;
      const bodyEl = el.querySelector(".ph-body")!;
      const rightBlocks = gsap.utils.toArray<HTMLElement>(
        el.querySelectorAll(".ph-right")
      );

      if (reduced) {
        gsap.set([titleEl, kickerEl, bodyEl, rightBlocks], {
          autoAlpha: 1,
          clearProps: "all",
        });
        return;
      }

      // Split big title into lines & words
      const titleSplit = new SplitText(titleEl as HTMLElement, {
        type: "lines,words",
      });
      // Build a per-line curtain mask with clip-path
      const lines = titleSplit.lines as HTMLElement[];
      lines.forEach((line) => {
        line.style.position = "relative";
        line.style.overflow = "visible";
        line.classList.add("ph-line");
      });

      // Kicker underline target
      const underline = (kickerEl as HTMLElement).querySelector(
        ".ph-underline"
      ) as HTMLElement;

      // Right column word splits (alternate directions + z-depth)
      const rightSplits: SplitText[] = [];
      rightBlocks.forEach((block, i) => {
        const h = block.querySelector("h4");
        if (!h) return;
        const sp = new SplitText(h as HTMLElement, { type: "words" });
        rightSplits.push(sp);
        gsap.set(sp.words, {
          xPercent: i % 2 === 0 ? 22 : -22,
          yPercent: i % 2 === 0 ? 8 : -6,
          z: i % 2 === 0 ? 2 : -2,
          autoAlpha: 0,
          rotateZ: i % 2 === 0 ? -0.6 : 0.6,
          willChange: "transform,opacity",
        });
      });

      // Pre-states
      gsap.set(titleSplit.words, {
        yPercent: 110,
        rotateX: 12,
        skewY: 6,
        transformOrigin: "0% 100%",
        autoAlpha: 0,
        willChange: "transform,opacity",
      });
      gsap.set(kickerEl, {
        yPercent: 20,
        autoAlpha: 0,
        willChange: "transform,opacity",
      });
      gsap.set(underline, {
        scaleX: 0,
        transformOrigin: "0% 50%",
        willChange: "transform",
      });
      gsap.set(bodyEl, {
        y: 18,
        autoAlpha: 0,
        willChange: "transform,opacity",
      });

      // Pinned micro-sequence that feels crafted, not template
      const tl = gsap.timeline({
        defaults: { ease: "avenora" },
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          end: "+=60%",
          scrub: false,
          //   pin: true,
          anticipatePin: 1,
        },
      });

      // 1) Title: curtain reveal per line + kinetic debias on words
      tl.to(
        titleSplit.words,
        {
          yPercent: 0,
          rotateX: 0,
          skewY: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: { each: 0.02, from: "edges" },
        },
        0
      );

      // Optional: micro line offset to avoid monotony
      tl.fromTo(
        lines,
        { clipPath: "inset(-10px 100% -12px 0 round 2px)" },
        {
          clipPath: "inset(-10px 0% -12px 0 round 2px)",
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.08,
        },
        0.02
      );

      // 2) Kicker slides up, underline draws with slight overshoot
      tl.to(
        kickerEl,
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.6,
        },
        "-=0.4"
      )
        .to(
          underline,
          {
            scaleX: 1.06,
            duration: 0.5,
            ease: "power2.out",
          },
          "<+0.02"
        )
        .to(
          underline,
          { scaleX: 1, duration: 0.2, ease: "power1.inOut" },
          ">-0.1"
        );

      // 3) Right column: alternating vector cascade (words)
      tl.to(
        rightSplits.map((s) => s.words),
        {
          xPercent: 0,
          yPercent: 0,
          rotateZ: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: { each: 0.012, from: "random" },
        },
        "-=0.3"
      );

      // 4) Body copy settles last with slight spring
      tl.to(
        bodyEl,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          ease: "power3.out",
        },
        "-=0.25"
      );

      // Depth: subtle counter-scroll drift on title block (no pin needed here)
      gsap.to(titleEl, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // Micro-parallax on right column (opposite directions so it breathes)
      rightBlocks.forEach((block, i) => {
        gsap.to(block, {
          yPercent: i % 2 === 0 ? -4 : 3,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      });

      // cleanup
      return () => {
        titleSplit.revert();
        rightSplits.forEach((s) => s.revert());
      };
    },
    { scope: root }
  );

  return (
    <section ref={root} className="md:min-h-screen mt-10">
      <div className="gutter md:h-[calc(100vh-4.5rem)]">
        <div className="grid gap-4 md:gap-20 md:grid-cols-3 md:grid-rows-3 h-full">
          {/* LEFT — spans all rows */}
          <div className="md:row-span-3 ">
            <h2 className="ph-title font-hero font-bold uppercase leading-[0.9] tracking-[-0.01em] text-foreground text-[clamp(2.5rem,7vw,7.8rem)] overflow-visible">
              Our Philosophy
            </h2>
          </div>

          {/* MIDDLE */}
          <div className="hidden md:block md:col-start-2 md:row-start-1" />
          <div className="md:col-start-2 md:row-start-2 flex items-center">
            <p className="ph-kicker font-sans uppercase tracking-[0.02em] text-foreground text-[18px] md:text-[22px] leading-[1.4] text-left">
              <span className="ph-underline inline-block align-baseline">
                This is Avenora
              </span>
            </p>
          </div>
          <div className="md:col-start-2 md:row-start-3 flex items-end pb-10">
            <p className="ph-body text-foreground-2 font-mono text-[14px] md:text-[15px] leading-[1.6] md:w-[70%]">
              We believe good design is invisible. Every interaction,
              transition, and layout should feel natural, not forced. We don’t
              chase trends. We refine them.
            </p>
          </div>

          {/* RIGHT */}
          <div className="md:col-start-3 pt-20 md:row-start-1 md:self-start md:justify-self-end w-full h-full ph-right">
            <h4 className="font-sans uppercase tracking-[0.02em] text-foreground text-[16px] md:text-[24px] leading-normal text-left">
              Avenora isn’t about making more websites
            </h4>
          </div>
          <div className="md:col-start-3 md:row-start-2 md:self-start max-w-[30ch] ph-right">
            <h4 className="font-sans text-foreground text-[16px] md:text-[24px] leading-[1.6]">
              It’s about making better ones.
            </h4>
          </div>
          <div className="hidden md:block md:col-start-3 md:row-start-3" />
        </div>
      </div>
    </section>
  );
}
