function WorkHero() {
  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="min-h-[50vh] md:min-h-[60vh] flex items-end">
          <div className="container-xl gutter pb-12 md:pb-16">
            <h1 className="font-hero font-bold uppercase text-[clamp(3rem,8vw,8.5rem)] leading-[0.9] tracking-[-0.01em] text-foreground">
              PROJECT TITLE
            </h1>
          </div>
        </section>

        {/* Info Bar */}
        <section className="border-y border-border bg-background/95">
          <div className="container-xl gutter py-8 md:py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Left - Description */}
              <div className="md:col-span-1">
                <p className="font-mono text-[14px] md:text-[15px] leading-[1.7] text-foreground max-w-[45ch]">
                  description bldkla lksdjlfajsdl vl kdjf lkadslk
                </p>
              </div>

              {/* Middle - Project Details */}
              <div className="md:col-span-1">
                <div className="space-y-2 font-mono text-[13px] leading-[1.7]">
                  <p className="text-foreground-2">
                    <span className="text-foreground">Client</span> - client org
                    name
                  </p>
                  <p className="text-foreground-2">
                    <span className="text-foreground">type</span> -
                    Design/Development/Website
                  </p>
                  <p className="text-foreground-2">
                    <span className="text-foreground">location</span> - client
                    location
                  </p>
                </div>
              </div>

              {/* Right - Tech Stack */}
              <div className="md:col-span-1">
                <h3 className="font-mono text-[10px] tracking-[0.14em] uppercase text-foreground-2 mb-3">
                  TECH STACK
                </h3>
                <div className="space-y-1 font-mono text-[13px] leading-[1.7] text-foreground">
                  <p>Next JS</p>
                  <p>Tailwind</p>
                  <p>GSAP</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Images / Content Section */}
        <section className="min-h-[60vh] bg-[#E5E5E5]">
          <div className="container-xl gutter py-16 md:py-24">
            {/* Add project images/content here */}
          </div>
        </section>
      </main>
    </>
  );
}

export default WorkHero;
