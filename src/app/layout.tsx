import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AnalyticsInstrumentation from "@/components/AnalyticsInstrumentation";
import BookingModal from "@/components/BookingModal";
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
    default: "Bakamo | Social Intelligence & Consumer Research",
    template: "%s | Bakamo",
  },
  description:
    "Bakamo is a social intelligence company. We read unprompted conversation, then build better surveys and trackers for brands, health and the public sector.",
  openGraph: pageOpenGraph(
    "/",
    "Bakamo | Social Intelligence & Consumer Research",
    "Bakamo is a social intelligence company. We read unprompted conversation, then build better surveys and trackers for brands, health and the public sector.",
  ),
  // Share images come from the opengraph-image/twitter-image files. Title and
  // description are left out so X falls back to each page's Open Graph tags.
  twitter: {
    card: "summary_large_image",
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
        <BookingModal />
        <CookieBanner />
      </body>
    </html>
  );
}
