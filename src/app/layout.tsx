import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AnalyticsInstrumentation from "@/components/AnalyticsInstrumentation";
import CookieBanner from "@/components/CookieBanner";
import SiteNavigation from "@/components/SiteNavigation";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/site-url";
import { ORGANIZATION_SCHEMA, pageOpenGraph } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Canonical URLs are set per page; a root canonical here would be inherited by
// any route that forgets its own and quietly point it at the homepage.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bakamo - Social Truth",
    template: "%s | Bakamo",
  },
  description:
    "Bakamo surfaces Social Truth, then builds the quantitative instruments that measure it.",
  openGraph: pageOpenGraph(
    "/",
    "Bakamo - Social Truth",
    "Bakamo surfaces Social Truth, then builds the quantitative instruments that measure it.",
  ),
  // No share image exists yet, so use the small card. Title and description are
  // left out so X falls back to each page's own Open Graph tags.
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body className={`${inter.className} antialiased bg-near-black text-text-primary`}>
        <AnalyticsInstrumentation />
        <SiteNavigation />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />

        {children}

        <SiteFooter />
        <CookieBanner />
      </body>
    </html>
  );
}
