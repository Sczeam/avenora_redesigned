"use client";

import Link from "next/link";
import DesignMockCardSvg from "./designMockCardSvg";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SERVICES } from "@/content/home/services";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function DesignServiceSection() {
  const rootRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  //   useGSAP(
  //     () => {
  //       const root = rootRef.current;
  //       const svg = svgRef.current;

  //       if (!root || !svg) return;

  //       const border = svg.querySelector(
  //         "#card-border"
  //       ) as SVGGeometryElement | null;
  //       const main = svg.querySelector("#card-main") as SVGGeometryElement | null;
  //       const pill = svg.querySelector("#card-pill") as SVGRectElement | null;
  //       const lines = gsap.utils.toArray<SVGRectElement>(".sv-card-line");
  //       const swatches = gsap.utils.toArray<SVGRectElement>(".sv-card-swatch");

  //       const metaEls = {
  //         index: root.querySelector('[data-el="index"]') as HTMLElement | null,
  //         title: root.querySelector('[data-el="title"]') as HTMLElement | null,
  //         body: root.querySelector('[data-el="body"]') as HTMLElement | null,
  //         price: root.querySelector('[data-el="price"]') as HTMLElement | null,
  //         cta: root.querySelector('[data-el="cta"]') as HTMLButtonElement | null,
  //       };

  //       // Helper: draw setup for a rect/path
  //       const setupDraw = (el: SVGGeometryElement | null) => {
  //         if (!el) return;
  //         const length = el.getTotalLength();
  //         gsap.set(el, {
  //           strokeDasharray: length,
  //           strokeDashoffset: length,
  //         });
  //       };

  //       setupDraw(border);
  //       setupDraw(main);

  //       // Initial states
  //       if (pill) {
  //         gsap.set(pill, { x: 30, opacity: 0, willChange: "transform,opacity" });
  //       }
  //       if (lines.length) {
  //         gsap.set(lines, {
  //           x: 20,
  //           opacity: 0,
  //           willChange: "transform,opacity",
  //         });
  //       }
  //       if (swatches.length) {
  //         gsap.set(swatches, {
  //           y: 16,
  //           opacity: 0,
  //           scale: 0.96,
  //           transformOrigin: "center",
  //           willChange: "transform,opacity",
  //         });
  //       }

  //       if (metaEls.index) {
  //         gsap.set(metaEls.index, { y: 8, opacity: 0 });
  //       }
  //       if (metaEls.title) {
  //         gsap.set(metaEls.title, { y: 18, opacity: 0 });
  //       }
  //       if (metaEls.body) {
  //         gsap.set(metaEls.body, { y: 12, opacity: 0 });
  //       }
  //       if (metaEls.price) {
  //         gsap.set(metaEls.price, { y: 12, opacity: 0 });
  //       }
  //       if (metaEls.cta) {
  //         gsap.set(metaEls.cta, { y: 10, opacity: 0, scale: 0.96 });
  //       }

  //       const tl = gsap.timeline({
  //         defaults: { ease: "power2.out" },
  //         scrollTrigger: {
  //           trigger: root,
  //           start: "top 70%",
  //           once: true,
  //         },
  //       });

  //       // 1) Meta block
  //       if (metaEls.index) {
  //         tl.to(metaEls.index, {
  //           y: 0,
  //           opacity: 1,
  //           duration: 0.4,
  //           ease: "power3.out",
  //         });
  //       }

  //       if (metaEls.title) {
  //         tl.to(
  //           metaEls.title,
  //           {
  //             y: 0,
  //             opacity: 1,
  //             duration: 0.7,
  //             ease: "power3.out",
  //           },
  //           "-=0.1"
  //         );
  //       }

  //       if (metaEls.body) {
  //         tl.to(
  //           metaEls.body,
  //           {
  //             y: 0,
  //             opacity: 1,
  //             duration: 0.5,
  //           },
  //           "-=0.1"
  //         );
  //       }

  //       if (metaEls.price) {
  //         tl.to(
  //           metaEls.price,
  //           {
  //             y: 0,
  //             opacity: 1,
  //             duration: 0.45,
  //           },
  //           "-=0.05"
  //         );
  //       }

  //       if (metaEls.cta) {
  //         tl.to(
  //           metaEls.cta,
  //           {
  //             y: 0,
  //             opacity: 1,
  //             scale: 1,
  //             duration: 0.5,
  //             ease: "power3.out",
  //           },
  //           "-=0.1"
  //         );
  //       }

  //       // 2) Card border + main "draw"
  //       if (border) {
  //         tl.to(
  //           border,
  //           {
  //             strokeDashoffset: 0,
  //             duration: 0.8,
  //             ease: "power2.out",
  //           },
  //           "+=0.1"
  //         );
  //       }

  //       if (main) {
  //         tl.to(
  //           main,
  //           {
  //             strokeDashoffset: 0,
  //             duration: 0.8,
  //             ease: "power2.out",
  //           },
  //           "-=0.5" // overlap slightly with border draw
  //         );
  //       }

  //       // 3) Right pill + lines
  //       if (pill || lines.length) {
  //         tl.to(
  //           [pill, ...lines].filter((el): el is SVGRectElement => Boolean(el)),
  //           {
  //             x: 0,
  //             opacity: 1,
  //             duration: 0.6,
  //             stagger: 0.08,
  //             ease: "power3.out",
  //           },
  //           "-=0.3"
  //         );
  //       }

  //       // 4) Swatches — palette reveal left → right
  //       if (swatches.length) {
  //         tl.to(
  //           swatches,
  //           {
  //             y: 0,
  //             opacity: 1,
  //             scale: 1,
  //             duration: 0.6,
  //             ease: "power3.out",
  //             stagger: 0.08,
  //           },
  //           "-=0.1"
  //         );
  //       }
  //     },
  //     { scope: rootRef }
  //   );
  return (
    <section
      ref={rootRef}
      id="services"
      aria-labelledby="services-heading"
      className="border-t border-border"
    >
      <div className="container-xl gutter section-pt section-pb">
        <h2 id="services-heading" className="sr-only">
          Our Services
        </h2>

        <div className="space-y-16">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between"
            >
              {/* Left: label + title + copy + price */}
              <div>
                <p className="font-mono text-[10px] tracking-[0.14em] text-foreground-2 mb-4">
                  {service.id}
                </p>

                <h3 className="font-hero font-bold uppercase text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.9] tracking-[-0.01em]">
                  {service.label}
                </h3>

                {service.desc && (
                  <p className="mt-5 max-w-[52ch] font-mono text-[14px] leading-[1.7] text-foreground">
                    {service.desc}
                  </p>
                )}

                {service.price && (
                  <p className="mt-4 font-mono text-[16px] md:text-[18px] font-semibold">
                    From £{service.price}
                  </p>
                )}
              </div>

              {/* Right: Contact CTA */}
              <div className="md:pt-3">
                <Link
                  href={
                    service.href || "https://www.instagram.com/buildwithavenora"
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center border border-foreground text-foreground
                             px-8 font-mono text-[13px] tracking-[0.12em] uppercase hover:bg-foreground hover:text-background
                             transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Main mock layout block */}

        {/* <DesignMockCardSvg svgRef={svgRef} /> */}
      </div>
    </section>
  );
}
