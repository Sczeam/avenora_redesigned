"use client";

import { SERVICES } from "@/content/home/services";
import { Row } from "../primitives/row";

export function ServicesSection() {
  return (
    <section aria-labelledby="services-heading" className="relative">
      <div className=" gutter section-pt section-pb">
        <h2
          id="services-heading"
          className="font-mono text-[20px] md:text-[40px] leading-[-0.5%] mb-6"
        >
          Our Services
        </h2>

        <ul className="divide-y divide-border border-t border-border">
          {SERVICES.map((s, i) => {
            const right = i % 2 === 1;
            const rowClass =
              "relative flex items-start gap-3 md:gap-40 py-10 md:py-14 focus:outline-none";

            const Content = (
              <>
                {/* left index */}
                <span className="min-w-12 md:min-w-16 text-foreground-2 font-mono text-[10px] md:text-[12px] tracking-[0.14em] select-none">
                  {s.id}
                </span>

                {/* zig-zag track + label */}
                <div
                  className={[
                    "mx-auto w-[92%] md:w-[70%]",
                    right ? "md:ml-auto md:mr-0" : "md:mr-auto md:ml-0",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "block font-sans font-bold uppercase leading-[0.95] tracking-[-0.01em]",
                      "text-[clamp(2rem,7vw,8rem)] text-foreground",
                      "text-left transition-transform duration-300 group-hover:scale-[1.01]",
                      right ? "md:translate-x-[2%]" : "md:-translate-x-[2%]",
                    ].join(" ")}
                  >
                    {s.label}
                  </span>
                </div>

                {/* right hint */}
                <span
                  className="hidden md:block shrink-0 text-foreground-2 text-[12px] tracking-[0.12em] uppercase pr-1 group-hover:text-foreground transition-colors"
                  aria-hidden
                >
                  {s.href ? "View" : "\u00A0"}
                </span>

                {/* underline */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100"
                />
              </>
            );

            return (
              <li key={s.id} className="group">
                {s.href ? (
                  <Row href={s.href} className={rowClass}>
                    {Content}
                  </Row>
                ) : (
                  <Row className={rowClass}>{Content}</Row>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
