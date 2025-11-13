export type Service = {
  id: string; // "001"
  label: string; // "BRANDING"
  href?: string; // optional
};

export const SERVICES: Service[] = [
  { id: "001", label: "DESIGN", href: "/services/#branding" },
  { id: "002", label: "DEVELOPMENT", href: "/services/#web-design" },
  { id: "003", label: "FULLSTACK", href: "/services/#development" },
  // { id: "004", label: "MOTION GRAPHICS", href: "/services/#motion" },
];
