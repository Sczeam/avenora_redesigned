// app/gsapInit.tsx
"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GsapInit() {
  useEffect(() => {
    // Safe to call multiple times, but we'll guard anyway
    if (typeof window !== "undefined") {
      gsap.registerPlugin(useGSAP, ScrollTrigger);
    }
  }, []);
  return null;
}
