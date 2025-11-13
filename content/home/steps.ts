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
      "We design with rhythm, hierarchy, and restraint.",
      "Every frame is crafted to feel effortless, precise, and timeless.",
    ],
  },
  {
    id: "004",
    title: "BUILD",
    bullets: [
      "Built cleanly, coded beautifully.",
      "Fast, accessible, and scalable — without sacrificing craft.",
      "We obsess over the invisible details.",
    ],
  },
  {
    id: "005",
    title: "LAUNCH",
    bullets: ["We test, refine, and deliver a flawless handoff."],
  },
];
