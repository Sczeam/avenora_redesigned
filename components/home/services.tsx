// components/home/services.tsx
"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
// Import SplitText plugin (runtime value)
import SplitTextPlugin from "gsap/SplitText";

import { SERVICES } from "@/content/home/services";
import { Row } from "../primitives/row";

gsap.registerPlugin(useGSAP);
// Register SplitText if available (works in prod/dev when the plugin is present)
try {
  gsap.registerPlugin(SplitTextPlugin as unknown as object);
} catch {
  /* noop */
}

// Strict typings for the SplitText instance (no `any`)
type SplitCtor = new (
  element: Element | string | null,
  vars?: { type?: string }
) => {
  chars: HTMLElement[];
  words: HTMLElement[];
  lines: HTMLElement[];
  revert(): void;
};

const SplitText = SplitTextPlugin as unknown as SplitCtor;

type Service = {
  id: string | number;
  label: string;
  href?: string;
};

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative"
    >
      <div className="gutter section-pt section-pb">
        <h2
          id="services-heading"
          className="font-mono text-[20px] md:text-[40px] leading-[-0.5%] mb-6"
        >
          Our Services
        </h2>

        <ul className="divide-y divide-border border-t border-border">
          {SERVICES.map((s: Service, i: number) => (
            <li key={s.id} className="group">
              <AnimatedServiceRow s={s} right={i % 2 === 1} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function AnimatedServiceRow({ s, right }: { s: Service; right: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const topLabelRef = useRef<HTMLSpanElement>(null);
  const bottomLabelRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const splitCleanup = useRef<(() => void) | null>(null);
  const resizeObs = useRef<ResizeObserver | null>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const topEl = topRef.current;
      const bottomEl = bottomRef.current;

      if (!wrap || !topEl || !bottomEl) return;

      // Stack rows; bottom starts below
      gsap.set([topEl, bottomEl], {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        yPercent: 0,
        willChange: "transform",
      });
      gsap.set(bottomEl, { yPercent: 100 });

      // Keep wrapper height = top row height
      const setWrapHeight = () => {
        wrap.style.height = `${topEl.offsetHeight}px`;
      };
      setWrapHeight();
      resizeObs.current = new ResizeObserver(setWrapHeight);
      resizeObs.current.observe(topEl);

      // ---- SplitText (strict, no any)
      let topSplit: { chars: HTMLElement[]; revert(): void } | undefined;
      let bottomSplit: { chars: HTMLElement[]; revert(): void } | undefined;

      try {
        if (typeof SplitText === "function") {
          topSplit = new SplitText(topLabelRef.current, { type: "chars" });
          bottomSplit = new SplitText(bottomLabelRef.current, {
            type: "chars",
          });

          // Initial char states
          if (topSplit.chars) {
            gsap.set(topSplit.chars, { y: 0, opacity: 1 });
          }
          if (bottomSplit.chars) {
            gsap.set(bottomSplit.chars, { y: 22, opacity: 0 });
          }

          splitCleanup.current = () => {
            topSplit?.revert();
            bottomSplit?.revert();
          };
        }
      } catch {
        splitCleanup.current = null;
      }

      // ---- Timeline
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out", duration: 0.7 },
      });

      // 1) Color push first (rows move)
      tl.to(topEl, { yPercent: -100 }, 0).to(bottomEl, { yPercent: 0 }, 0);

      // 2) Text rise one-by-one (simultaneous for top & bottom)
      const charDelay = 0.14;
      const fromSide = right ? "end" : "start";

      if (topSplit?.chars && bottomSplit?.chars) {
        // Top (visible) label: lift up & soften
        tl.to(
          topSplit.chars,
          {
            y: -14,
            opacity: 0.55,
            stagger: { each: 0.01, from: fromSide },
            duration: 0.5,
            ease: "power2.out",
          },
          charDelay
        );

        // Bottom (hidden) label: lift into place
        tl.to(
          bottomSplit.chars,
          {
            y: 0,
            opacity: 1,
            stagger: { each: 0.01, from: fromSide },
            duration: 0.55,
            ease: "power2.out",
          },
          charDelay
        );
      }

      tlRef.current = tl;

      const onEnter = () => tlRef.current?.play();
      const onLeave = () => tlRef.current?.reverse();

      wrap.addEventListener("mouseenter", onEnter);
      wrap.addEventListener("mouseleave", onLeave);
      wrap.addEventListener("focusin", onEnter);
      wrap.addEventListener("focusout", onLeave);

      return () => {
        wrap.removeEventListener("mouseenter", onEnter);
        wrap.removeEventListener("mouseleave", onLeave);
        wrap.removeEventListener("focusin", onEnter);
        wrap.removeEventListener("focusout", onLeave);
        tlRef.current?.kill();
        splitCleanup.current?.();
        resizeObs.current?.disconnect();
      };
    },
    { scope: wrapRef }
  );

  // Make Row the flex container
  const rowClass =
    "relative flex items-start gap-3 md:gap-40 py-10 md:py-14 focus:outline-none";

  return (
    <div ref={wrapRef} className="relative overflow-hidden">
      {/* Top (visible) row */}
      <ColorRow
        ref={topRef}
        s={s}
        right={right}
        rowClass={rowClass}
        inverted={false}
        labelRef={topLabelRef}
      />

      {/* Bottom (hidden) row — inverted colors */}
      <ColorRow
        ref={bottomRef}
        s={s}
        right={right}
        rowClass={rowClass}
        inverted
        labelRef={bottomLabelRef}
      />
    </div>
  );
}

type ColorRowProps = {
  s: Service;
  right: boolean;
  rowClass: string;
  inverted: boolean;
  labelRef: React.RefObject<HTMLSpanElement | null>;
};

const ColorRow = React.forwardRef<HTMLDivElement, ColorRowProps>(
  ({ s, right, rowClass, inverted, labelRef }, ref) => {
    const content = (
      <>
        {/* left index */}
        <span
          className={[
            "min-w-12 md:min-w-16 font-mono text-[10px] md:text-[12px] tracking-[0.14em] select-none",
            inverted ? "text-background/80" : "text-foreground-2",
          ].join(" ")}
        >
          {s.id}
        </span>

        {/* label */}
        <div
          className={[
            "flex-1 mx-auto w-[92%] md:w-[70%]",
            right ? "md:ml-auto md:mr-0" : "md:mr-auto md:ml-0",
          ].join(" ")}
        >
          <span
            ref={labelRef}
            className={[
              "block font-sans font-bold uppercase leading-[0.95] tracking-[-0.01em]",
              "text-[clamp(2rem,7vw,8rem)]",
              inverted ? "text-background" : "text-foreground",
              right ? "md:translate-x-[2%]" : "md:-translate-x-[2%]",
            ].join(" ")}
          >
            {s.label}
          </span>
        </div>

        {/* right hint */}
        <span
          className={[
            "hidden md:block shrink-0 text-[12px] tracking-[0.12em] uppercase pr-1 transition-colors",
            inverted
              ? "text-background/70"
              : "text-foreground-2 group-hover:text-foreground",
          ].join(" ")}
          aria-hidden
        >
          {s.href ? "View" : "\u00A0"}
        </span>

        {/* underline (visual only for top row) */}
        {!inverted && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100"
          />
        )}
      </>
    );

    // NOTE: don't put flex on this outer wrapper
    const Inner = (
      <div
        ref={ref}
        className={inverted ? "bg-foreground text-background" : undefined}
      >
        {s.href ? (
          <Row href={s.href} className={[rowClass, "w-full px-2"].join(" ")}>
            {content}
          </Row>
        ) : (
          <Row className={[rowClass, "w-full px-2"].join(" ")}>{content}</Row>
        )}
      </div>
    );

    return Inner;
  }
);
ColorRow.displayName = "ColorRow";
