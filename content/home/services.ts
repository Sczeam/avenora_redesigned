export type Service = {
  id: string; // "001"
  label: string; // "BRANDING"
  href?: string; // optional
  desc?: string; // optional description
  price?: number; // optional price
};

export const SERVICES: Service[] = [
  {
    id: "001",
    label: "DESIGN",
    href: "https://www.instagram.com/buildwithavenora",
    desc: "Every interface we craft is rooted in purpose. We strip away the unnecessary and amplify what matters.",
    price: 500,
  },
  {
    id: "002",
    label: "DEVELOPMENT",
    href: "https://www.instagram.com/buildwithavenora",
    desc: "Clean code, thoughtful architecture, and precise execution. Products that perform beautifully across every device.",
    price: 700,
  },
  {
    id: "003",
    label: "FULLSTACK",
    href: "https://www.instagram.com/buildwithavenora",
    desc: "Say the word, and we’ll build the whole thing. Design, UX, content structure, and development — delivered as a complete, ready-to-launch website tailored to your brand.",
    price: 1500,
  },
  // { id: "004", label: "MOTION GRAPHICS", href: "/services/#motion" },
];
