export type Step = {
  id: string;
  title: string;
  bullets: string[];
};

export const STEPS: Step[] = [
  {
    id: "001",
    title: "DISCOVERY",
    bullets: [
      "We listen before we build.",
      "Every project starts with understanding your story, goals, and users.",
      "We define the core problem before deciding what to design.",
    ],
  },
  {
    id: "002",
    title: "STRATEGY",
    bullets: [
      "We translate ideas into clear direction.",
      "Site architecture, content flow, and experience mapping come first.",
      "Every decision is intentional — driven by purpose, not preference.",
    ],
  },
  {
    id: "003",
    title: "DESIGN",
    bullets: [
      "Where clarity meets emotion.",
      "We iterate in the open, testing states, motion, and edge cases.",
      "Design systems, not one-off screens.",
    ],
  },
  {
    id: "004",
    title: "BUILD",
    bullets: [
      "Production-grade implementation in Next.js.",
      "Performance, accessibility, and maintainability are non-negotiable.",
      "Ship, observe, refine.",
    ],
  },
];
