"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitTextPlugin from "gsap/SplitText";
import { STEPS } from "@/content/home/steps";

gsap.registerPlugin(useGSAP, ScrollTrigger);
try {
  gsap.registerPlugin(SplitTextPlugin as unknown as object);
} catch {}

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

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Panels & elements
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stepsColRef = useRef<HTMLDivElement>(null);
  const leftBlockRef = useRef<HTMLDivElement>(null);
  const rightBlockRef = useRef<HTMLDivElement>(null);
  const step001Ref = useRef<HTMLLIElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const leftPanel = leftPanelRef.current;
      const rightPanel = rightPanelRef.current;
      const titleEl = titleRef.current;
      const leftBlock = leftBlockRef.current;
      const rightBlock = rightBlockRef.current;
      const step001 = step001Ref.current;

      if (
        !section ||
        !leftPanel ||
        !rightPanel ||
        !leftBlock ||
        !rightBlock ||
        !step001
      )
        return;

      // ——— Pinning
      const stepsCol = stepsColRef.current;
      if (!stepsCol) return;

      // kill any old pins (hot reload safety)
      ScrollTrigger.getAll().forEach((st) => {
        const v = st.vars;
        if (v?.pin === leftPanel || v?.pin === rightPanel) st.kill();
      });

      // Helper to compute a stable end distance:
      // pin until the bottom of steps column rises above the viewport bottom.

      const mm = gsap.matchMedia();
      // Pin LEFT panel
      mm.add("(min-width: 768px)", () => {
        const pinEndDistance = () => {
          //   const rect = stepsCol.getBoundingClientRect();
          // Use scrollHeight to be safe with dynamic content
          const total = stepsCol.scrollHeight;
          const vh = window.innerHeight;
          //pin = total height minus the part visible at any time
          return `+=${Math.max(total - vh, 0)}`;
        };
        // Pin LEFT panel
        ScrollTrigger.create({
          trigger: stepsCol,
          start: "top top",
          end: pinEndDistance, // precise end
          pin: leftPanel,
          pinSpacing: true, // avoids layout jump when unpinning
          pinReparent: true, // smoother in CSS grid
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
          // add to both ScrollTriggers
          pinType: "fixed",
        });

        // Pin RIGHT panel
        ScrollTrigger.create({
          trigger: stepsCol,
          start: "top top",
          end: pinEndDistance,
          pin: rightPanel,
          pinSpacing: true,
          pinReparent: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
          // add to both ScrollTriggers
          pinType: "fixed",
        });
      });

      // After fonts/layout finalize, refresh ST (prevents 1-frame jitter)
      document.fonts?.ready?.then?.(() => ScrollTrigger.refresh());

      // ——— Colored blocks entrance (slower, same ease) when step 001 reaches
      const secRect = section.getBoundingClientRect();
      const centerX = secRect.width / 2;
      const centerY = secRect.height / 2;
      const fromDelta = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        const elCenterX = r.left - secRect.left + r.width / 2;
        const elCenterY = r.top - secRect.top + r.height / 2;
        return { x: centerX - elCenterX, y: centerY - elCenterY };
      };
      const leftFrom = fromDelta(leftBlock);
      const rightFrom = fromDelta(rightBlock);
      gsap.set([leftBlock, rightBlock], { opacity: 0, scale: 0.92 });

      const blocksTL = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: step001,
          start: "top 10%",
          once: true,
        },
      });

      blocksTL
        .fromTo(
          leftBlock,
          { x: leftFrom.x, y: leftFrom.y, opacity: 0, scale: 0.92 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.25,
            ease: "back.out(1.4)",
          },
          0
        )
        .fromTo(
          rightBlock,
          { x: rightFrom.x, y: rightFrom.y, opacity: 0, scale: 0.92 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.25,
            ease: "back.out(1.4)",
          },
          0
        );

      // ——— Reveal "Our Process" as soon as it enters viewport (independent trigger)
      // Fonts-ready avoids SplitText layout pop.
      let titleSplit: { chars: HTMLElement[]; revert(): void } | undefined;
      const fontsReady = document.fonts?.ready ?? Promise.resolve();

      fontsReady.then(() => {
        try {
          if (typeof SplitText === "function" && titleEl) {
            titleSplit = new SplitText(titleEl, { type: "chars" });
            gsap.set(titleSplit.chars, {
              y: 18,
              opacity: 0,
              willChange: "transform",
            });

            gsap.to(titleSplit.chars, {
              y: 0,
              opacity: 1,
              duration: 0.55,
              ease: "power2.out",
              stagger: { each: 0.01, from: "start" },
              scrollTrigger: {
                trigger: titleEl,
                start: "top 85%", // reveal as soon as it enters
                once: true, // fire once
              },
            });
          } else if (titleEl) {
            gsap.fromTo(
              titleEl,
              { y: 16, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: titleEl,
                  start: "top 85%",
                  once: true,
                },
              }
            );
          }
        } catch {
          // fallback safely ignored
        }
      });

      // ——— Reveal each bullet line individually when it enters the viewport
      // Markup adds data-anim="bullet" to each bullet <li>.
      const bulletEls = gsap.utils.toArray<HTMLElement>(
        'li[data-anim="bullet"]'
      );

      // Set initial state for all bullets
      gsap.set(bulletEls, { y: 12, opacity: 0, willChange: "transform" });

      // Batch for performance (stagger within batch)
      ScrollTrigger.batch(bulletEls, {
        start: "top 90%",
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.38,
            ease: "power2.out",
            stagger: 0.06,
          });
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, {
            y: 12,
            opacity: 0,
            duration: 0.25,
            ease: "power2.inOut",
            stagger: 0.04,
          });
        },
      });

      // ——— Optional: per-step titles (kept from before; still looks good)
      const stepTitleEls = gsap.utils.toArray<HTMLElement>(
        'h3[data-anim="step-title"]'
      );
      const stepSplitCache: Array<{ revert: () => void }> = [];

      stepTitleEls.forEach((el) => {
        try {
          if (typeof SplitText === "function") {
            const split = new SplitText(el, { type: "chars" });
            stepSplitCache.push(split);
            gsap.set(split.chars, {
              y: 14,
              opacity: 0,
              willChange: "transform",
            });

            gsap.to(split.chars, {
              y: 0,
              opacity: 1,
              duration: 0.45,
              ease: "power2.out",
              stagger: { each: 0.008, from: "start" },
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
          } else {
            gsap.fromTo(
              el,
              { y: 12, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        } catch {
          // ignore
        }
      });

      // Cleanup
      return () => {
        titleSplit?.revert();
        stepSplitCache.forEach((s) => s.revert());
        ScrollTrigger.getAll().forEach((st) => {
          const trg = st.trigger as Element | null;
          if (
            trg === section ||
            trg === step001 ||
            stepTitleEls.includes(trg as HTMLElement) ||
            trg === titleRef.current
          ) {
            st.kill();
          }
        });
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative">
      <div className="gutter section-pb">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* LEFT — sticky title panel WITH left block */}
          <aside className="md:col-span-1">
            <div
              ref={leftPanelRef}
              className="relative md:top-24 md:h-[calc(100vh-4.5rem)]"
            >
              <h2
                ref={titleRef}
                className="font-hero font-bold uppercase leading-[0.9] tracking-[-0.01em] text-[clamp(2.25rem,7vw,8rem)]"
              >
                <span className="block">Our</span>
                <span className="block">Process</span>
              </h2>

              <div
                ref={leftBlockRef}
                data-block="left"
                className="hidden md:block absolute left-0 bottom-10 w-[396px] h-[255px] bg-foreground rounded-sm"
              />
            </div>
          </aside>

          {/* MIDDLE — scrolling steps */}
          <div
            ref={stepsColRef}
            data-col="steps"
            className="md:col-span-1 md:pt-[400px]"
          >
            <ol className="space-y-16">
              {STEPS.map((s, i) => (
                <li
                  key={s.id}
                  id={`step-${s.id}`}
                  className="scroll-mt-24"
                  data-step-index={i}
                  ref={s.id === "001" ? step001Ref : undefined}
                >
                  <div className="text-foreground-2 font-mono text-[12px] tracking-[0.14em] mb-2">
                    {s.id}
                  </div>

                  {/* Step title anim hook */}
                  <h3
                    className="font-mono uppercase text-[16px] md:text-[18px] leading-normal"
                    data-anim="step-title"
                  >
                    {s.title}
                  </h3>

                  <ul className="mt-3 space-y-2">
                    {s.bullets.map((b, bi) => (
                      <li
                        key={bi}
                        data-anim="bullet"
                        className="font-mono text-foreground-2 text-[14px] leading-[1.6]"
                      >
                        <span className="text-foreground-2 mr-1">
                          {String(bi + 1).padStart(2, "0")}
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>

          {/* RIGHT — pinned wrapper + block */}
          <div className="relative md:col-span-1">
            <div
              ref={rightPanelRef}
              className="relative md:sticky md:top-24 md:h-[calc(100vh-4.5rem)]"
            >
              <div
                ref={rightBlockRef}
                data-block="right"
                className="hidden md:block absolute right-0 top-6 w-[201px] h-[280px] bg-foreground rounded-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
