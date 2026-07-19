import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import RouteTransition from "@/components/providers/RouteTransition";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = "https://westbridge.studio";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Westbridge | Creative Studio",
    template: "%s | Westbridge",
  },
  description:
    "Westbridge is a creative studio crafting brand identities, digital experiences, and premium web design with editorial precision.",
  keywords: [
    "creative studio",
    "branding",
    "digital experience",
    "web design",
    "art direction",
  ],
  openGraph: {
    title: "Westbridge | Creative Studio",
    description:
      "Brand identities, digital experiences, and premium web design with editorial precision.",
    url: SITE_URL,
    siteName: "Westbridge Creative Studio",
    type: "website",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <SmoothScroll>
          <RouteTransition>
            <Nav />
            {children}
            <Footer />
          </RouteTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
