export type Service = {
  id: string; // "001"
  label: string; // "BRANDING"
  href?: string; // optional
};

export const SERVICES: Service[] = [
  { id: "001", label: "BRANDING", href: "/services/branding" },
  { id: "002", label: "WEB DESIGN", href: "/services/web-design" },
  { id: "003", label: "DEVELOPMENT", href: "/services/development" },
  { id: "004", label: "MOTION GRAPHICS", href: "/services/motion" },
];
