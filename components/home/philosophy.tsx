export function PhilosophySection() {
  return (
    <section className="md:min-h-screen mt-10">
      <div className="gutter md:h-[calc(100vh-4.5rem)]">
        {/* 3 columns × 3 rows on desktop; stacked on mobile */}
        <div className="grid gap-4 md:gap-20 md:grid-cols-3 md:grid-rows-3  h-full">
          {/* LEFT — spans all rows */}
          <div className="md:row-span-3">
            <h2 className="font-hero font-bold uppercase leading-[0.9] tracking-[-0.01em] text-foreground text-[clamp(2.5rem,7vw,8rem)]">
              Our Philosophy
            </h2>
          </div>

          {/* MIDDLE — row 2: centered kicker */}
          <div className="hidden md:block md:col-start-2 md:row-start-1 " />
          <div className="md:col-start-2 md:row-start-2 flex items-center ">
            <p className="font-sans uppercase tracking-[0.02em] text-foreground text-[18px] md:text-[22px] leading-[1.4] text-left">
              This is Avenora
            </p>
          </div>
          <div className="md:col-start-2 md:row-start-3 flex items-end pb-10">
            <p className="text-foreground-2 font-mono text-[14px] md:text-[15px] leading-[1.6] md:w-[70%]">
              We believe good design is invisible. Every interaction,
              transition, and layout should feel natural, not forced. We don’t
              chase trends. We refine them.
            </p>
          </div>

          {/* RIGHT — row 1: top headline; row 2: subline; row 3: empty */}
          <div className="md:col-start-3 pt-20 md:row-start-1 md:self-start md:justify-self-end w-full h-full">
            <h4
              className="font-sans uppercase tracking-[0.02em] text-foreground
                           text-[16px] md:text-[24px] leading-normal text-left"
            >
              Avenora isn’t about making more websites
            </h4>
          </div>
          <div className="md:col-start-3 md:row-start-2 md:self-start max-w-[30ch]">
            <h4 className="font-sans text-foreground text-[16px] md:text-[24px] leading-[1.6]">
              It’s about making better ones.
            </h4>
          </div>
          <div className="hidden md:block md:col-start-3 md:row-start-3" />

          {/* MOBILE STACK (keeps a sensible reading order) */}
          {/* <div className="md:hidden mt-8 space-y-6">
            <h3 className="font-mono uppercase tracking-[0.02em] text-foreground text-[16px] leading-normal">
              Avenora isn’t about making more websites
            </h3>
            <p className="font-mono text-foreground text-[16px] leading-[1.6]">
              It’s about making better ones.
            </p>
            <p className="font-mono uppercase tracking-[0.02em] text-foreground text-[18px] leading-[1.4] text-center">
              This is Avenora
            </p>
            <p className="text-foreground-2 font-mono text-[14px] leading-[1.6]">
              We believe good design is invisible. Every interaction,
              transition, and layout should feel natural, not forced. We don’t
              chase trends. We refine them.
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
}
