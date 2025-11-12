// app/layout.tsx
import type { Metadata } from "next";
import { Anonymous_Pro, IBM_Plex_Mono, Antonio } from "next/font/google";

import "./globals.css";
import { Navbar } from "@/components/navbar";
import GsapInit from "./gsap-init";

/**
 * Fonts
 * - Anonymous Pro: headings (via --font-anonymous)
 * - IBM Plex Mono: body / UI (via --font-plex-mono)
 */
const anonymous = Anonymous_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-anonymous",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plex-mono",
});

const antonio = Antonio({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-hero",
});

/**
 * Site constants
 * Set NEXT_PUBLIC_SITE_URL in your env (e.g., https://avenora.co.uk)
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://example.com";
const SITE_NAME = "Avenora";
const SITE_TITLE = "Avenora — Minimal, Modern Web Design & Development";
const SITE_DESCRIPTION =
  "Avenora is a design-led web studio crafting minimalist, high-performance websites with precision and care.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Avenora",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Avenora",
    "web design",
    "web development",
    "Next.js",
    "Tailwind",
    "UI/UX",
    "minimal design",
    "creative studio",
    "performance web",
  ],
  authors: [{ name: "Avenora Studio" }],
  creator: "Avenora",
  publisher: "Avenora",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og.jpg", // put your OG image in /public/og.jpg (1200x630)
        width: 1200,
        height: 630,
        alt: "Avenora — Minimal, Modern Web Design & Development",
      },
    ],
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    site: "@avenora", // change or remove if not using Twitter
    creator: "@avenora",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest", // add one in /public if you have a PWA plan
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "technology",
  // Optional: theme color that matches your bg (light only for now)
  themeColor: "#FFF5EE",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${anonymous.variable} ${plexMono.variable} ${antonio.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground font-mono antialiased">
        {/* <GsapInit /> */}
        <Navbar />
        <main className="pt-16 md:pt-18">{children}</main>
      </body>
    </html>
  );
}
