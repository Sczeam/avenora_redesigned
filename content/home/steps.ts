export type Step = {
  id: string;
  title: string;
  bullets: string[];
};

export const STEPS: Step[] = [
  {
    id: "001",
    title: "LEAD & DISCOVERY",
    bullets: [
      "We start with a conversation, not a proposal.",
      "Clarify goals, scope, timeline, and budget to check fit.",
      "Capture everything in a clear, internal project brief.",
    ],
  },
  {
    id: "002",
    title: "PROPOSAL & CONTRACT",
    bullets: [
      "Turn the brief into a structured, easy-to-read proposal.",
      "Define scope, deliverables, investment, and timeline upfront.",
      "Secure the project with a signed agreement and 50% deposit.",
    ],
  },
  {
    id: "003",
    title: "PLANNING & STRATEGY",
    bullets: [
      "Map the site structure, user flows, and milestones.",
      "Gather all brand assets, copy, and references before we design.",
      "Align expectations so success is defined before we build.",
    ],
  },
  {
    id: "004",
    title: "DESIGN & DEVELOPMENT",
    bullets: [
      "Design responsive layouts using Avenora’s minimalist system.",
      "Iterate through focused review rounds before writing code.",
      "Build in a modern stack — fast, accessible, and production-ready.",
    ],
  },
  {
    id: "005",
    title: "LAUNCH & HANDOVER",
    bullets: [
      "Run final QA, connect domains, and deploy the live website.",
      "Deliver source files, admin access, and a concise handover guide.",
      "Close the project cleanly with clear next-step options.",
    ],
  },
  {
    id: "006",
    title: "POST-LAUNCH SUPPORT",
    bullets: [
      "Provide 14 days of post-launch bug fixes for peace of mind.",
      "Offer an optional Avenora Care Plan for ongoing support.",
      "Collect feedback, testimonials, and archive the project properly.",
    ],
  },
];
