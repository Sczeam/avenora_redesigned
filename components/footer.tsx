import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className=" gutter section-pt section-pb">
        {/* Top grid */}
        <div className="grid gap-10 md:gap-12 md:grid-cols-12">
          {/* Brand / blurb */}
          <div className="md:col-span-4">
            <Link
              href="/"
              aria-label="Avenora — Home"
              className="inline-flex items-center gap-3"
            >
              <Image
                src="/logo/avenora_desktop.svg"
                alt=""
                width={132}
                height={28}
                className="h-7 w-auto invert"
                priority
              />
            </Link>

            <p className="mt-5 max-w-[38ch] font-mono text-[13px] leading-[1.7] text-foreground-2">
              We build quietly confident websites that feel inevitable — simple,
              intentional, and built to be remembered.
            </p>
          </div>

          {/* Navigation */}
          <nav className="md:col-span-3">
            <h4 className="font-mono text-[12px] tracking-[0.14em] uppercase text-foreground-2 mb-3">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "Services" },
                { href: "/about", label: "About" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[15px] uppercase tracking-[0.08em] hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-[12px] tracking-[0.14em] uppercase text-foreground-2 mb-3">
              Services
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/services/#design", label: "Design" },
                { href: "/services/#development", label: "Development" },
                { href: "/services/#full-stack", label: "FullStack" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[15px] uppercase tracking-[0.08em] hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h4 className="font-mono text-[12px] tracking-[0.14em] uppercase text-foreground-2 mb-3">
              Contact
            </h4>

            <ul className="space-y-2 text-[15px] tracking-[0.02em]">
              <li>
                <a
                  className="hover:text-foreground transition-colors"
                  href="mailto:hello@avenora.co.uk"
                >
                  hello@avenora.co.uk
                </a>
              </li>
              <li>
                <a
                  className="hover:text-foreground transition-colors"
                  href="tel:+447000000000"
                >
                  +44 7000 000000
                </a>
              </li>
            </ul>

            <div className="mt-4 flex items-center gap-3">
              {/* Keep socials simple text for now; swap to icons later if you like */}
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[12px] tracking-[0.14em] uppercase text-foreground-2 hover:text-foreground"
              >
                Instagram
              </a>
              <span className="text-foreground-2">/</span>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[12px] tracking-[0.14em] uppercase text-foreground-2 hover:text-foreground"
              >
                Twitter
              </a>
              <span className="text-foreground-2">/</span>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[12px] tracking-[0.14em] uppercase text-foreground-2 hover:text-foreground"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 md:mt-12 border-t border-border" />

        {/* Bottom bar */}
        <div className="mt-4 md:mt-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[12px] tracking-[0.08em] text-foreground-2">
            © {year} Avenora. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/legal/privacy"
              className="font-mono text-[12px] tracking-[0.12em] uppercase text-foreground-2 hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/legal/terms"
              className="font-mono text-[12px] tracking-[0.12em] uppercase text-foreground-2 hover:text-foreground"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
