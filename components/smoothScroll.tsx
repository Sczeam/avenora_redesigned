// app/components/SmoothScroll.tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = { children: React.ReactNode };

export default function SmoothScroll({ children }: Props) {
  useEffect(() => {
    // Respect reduced motion: skip smoothing entirely
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReduced) return;

    const lenis = new Lenis({
      autoRaf: false, // we'll drive it with GSAP
      smoothWheel: true, // mouse/trackpad smoothing
      syncTouch: false, // set true if you want touch inertia emulation
      duration: 1.1, // use lerp OR duration (not both); this uses duration
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      gestureOrientation: "vertical",
    });

    // Keep ScrollTrigger in sync
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis via GSAP's ticker
    const raf = (time: number) => {
      lenis.raf(time * 1000); // GSAP gives seconds; Lenis wants ms
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Measure after Lenis is active
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
