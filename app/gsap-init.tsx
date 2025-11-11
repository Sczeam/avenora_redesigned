"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
// Add other plugins here too, e.g. ScrollTrigger

export default function GsapInit() {
  useEffect(() => {
    // register once
    gsap.registerPlugin(useGSAP);
  }, []);
  return null;
}
