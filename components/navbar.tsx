"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { NAV } from "@/config/site";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the sheet on route change without cascading renders
  //   useEffect(() => {
  //     if (!open) return;
  //     startTransition(() => setOpen(false));
  //   }, [pathname, open]);

  // ESC to close (only when open)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Optional: lock body scroll when menu open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleHashClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // Check if it's a hash link
    if (href.startsWith("/#")) {
      const hash = href.substring(2); // Remove '/#'

      // Only handle if we're already on the home page
      if (pathname === "/") {
        e.preventDefault();
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      // If not on home page, let the link navigate normally
    }
  };

  return (
    // in app/components/navbar.tsx, header className
    <header className="fixed inset-x-0 top-0 z-999 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/70">
      <nav className="container-xl gutter h-16 md:h-18 flex items-center justify-between">
        {/* Left — Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Avenora — Home"
        >
          {/* Mobile logo */}
          <Image
            src="/logo/avenora_mobile.svg"
            alt=""
            width={32}
            height={32}
            priority
            className="block md:hidden h-8 w-auto invert"
          />
          {/* Desktop logo */}
          <Image
            src="/logo/avenora_desktop.svg"
            alt=""
            width={132}
            height={28}
            priority
            className="hidden md:block h-7 w-auto invert"
          />
        </Link>

        {/* Center — Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href.split("#")[0]);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={(e) => handleHashClick(e, item.href)}
                  className={[
                    "text-[12px] tracking-[0.12em] uppercase",
                    active ? "text-foreground" : "text-foreground-2",
                    "hover:text-foreground transition-colors",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right — Contact (desktop) */}
        <div className="hidden md:block">
          <Link
            href="https://www.instagram.com/buildwithavenora"
            target="_blank"
            rel="noreferrer"
            className="btn bg-foreground text-background h-9 px-4 text-[12px] tracking-[0.12em] uppercase"
          >
            Contact Us
          </Link>
        </div>

        {/* Burger (mobile) */}
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="md:hidden inline-flex items-center justify-center size-10 -mr-2 "
        >
          <span className="sr-only">Menu</span>
          <div className="relative w-5 h-3.5">
            <span className="absolute inset-x-0 top-0 h-0.5 bg-foreground rounded" />
            <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-foreground rounded" />
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-foreground rounded" />
          </div>
        </button>
      </nav>

      {/* Mobile Sheet */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-background min-h-screen"
        >
          <div className="container-xl gutter h-16 flex items-center justify-between">
            <Link
              href="/"
              aria-label="Avenora — Home"
              className="flex items-center"
            >
              <Image
                src="/logo/avenora_mobile.svg"
                alt=""
                width={32}
                height={32}
                priority
                className="h-8 w-auto invert"
              />
            </Link>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center size-10 -mr-2 "
            >
              <span className="sr-only">Close</span>
              <div className="relative w-5 h-5">
                <span className="absolute inset-0 rotate-45 h-0.5 bg-foreground top-1/2 -translate-y-1/2" />
                <span className="absolute inset-0 -rotate-45 h-0.5 bg-foreground top-1/2 -translate-y-1/2" />
              </div>
            </button>
          </div>

          <ul className="gutter mt-6 flex flex-col gap-3">
            {NAV.map((item) => {
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      handleHashClick(e, item.href);
                      setOpen(false);
                    }}
                    className="block py-3 text-[22px] leading-[1.3] font-semibold text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="gutter mt-6">
            <Link
              href="https://www.instagram.com/buildwithavenora"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)} // <— close on tap
              className="btn btn-accent w-full h-12 text-[13px] tracking-[0.12em] uppercase"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
