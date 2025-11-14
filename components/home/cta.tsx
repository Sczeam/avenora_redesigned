"use client";

import Link from "next/link";

export function CTASection() {
  return (
    <section aria-labelledby="cta-heading">
      <div className=" gutter section-pb">
        <div className="text-center">
          <h2
            id="cta-heading"
            className="font-mono uppercase tracking-[0.14em] text-[18px] md:text-[28px] leading-tight"
          >
            Have a project in mind?
          </h2>

          <div className="mt-5 md:mt-6">
            <Link
              href="https://instagram.com/buildwithavenora"
              className="inline-flex items-center justify-center rounded-sm
                         bg-foreground text-background
                         h-10 px-5 md:h-11 md:px-6
                         font-mono text-[14px] tracking-[0.12em] uppercase
                         transition-transform hover:-translate-y-px active:translate-y-0"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
