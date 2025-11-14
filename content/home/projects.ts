import { type LinkProps } from "next/link";
export type Project = {
  id: string;
  title: string; // e.g., "ESTORA"
  tag?: "DESIGN" | "DEVELOPMENT" | "WEBSITE"; // e.g., "WEBSITE"
  cover: string; // image path
  href?: LinkProps["href"];
  desc?: string;
  images?: string[];
  solvedProblems?: string;
  techStack?: string[];
  client?: string;
  location?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "estora",
    title: "ESTORA",
    tag: "DESIGN",
    client: "Estora",
    location: "Thailand",
    desc: "A sleek, modern website for Estora. Real estate company based in Thailand.",
    cover: "/images/estora/cover.png",
    href: "/work/estora",
    techStack: ["Figma", "Adobe Photoshop"],
  },
  {
    id: "work2",
    title: "WORK 2",
    tag: "WEBSITE",
    cover: "/images/projects/estora-hero.png",
    href: "/work/work2",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "work3",
    title: "WORK 3",
    tag: "WEBSITE",
    cover: "/images/projects/estora-hero.png",
    href: "/work/work3",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "work4",
    title: "WORK 4",
    tag: "WEBSITE",
    cover: "/images/projects/estora-hero.png",
    href: "/work/work4",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
];
