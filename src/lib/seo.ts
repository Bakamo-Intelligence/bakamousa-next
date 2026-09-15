import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-url";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const ORGANIZATION_REF = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "Bakamo",
  url: SITE_URL,
};

type OpenGraph = NonNullable<Metadata["openGraph"]>;

/**
 * Next.js replaces (rather than merges) the layout's openGraph object when a
 * page sets its own, so every page builds its Open Graph tags from here to keep
 * og:url, og:type, og:site_name and og:locale.
 */
export function pageOpenGraph(path: string, title: string, description: string): OpenGraph {
  return {
    type: "website",
    url: path,
    siteName: "Bakamo",
    locale: "en_US",
    title,
    description,
  };
}

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "Bakamo",
      alternateName: ["Bakamo.Social", "Bakamo Social"],
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/bakamo-mark.png`,
        width: 512,
        height: 512,
      },
      image: `${SITE_URL}/brand/bakamo-mark.png`,
      description:
        "Bakamo is a social intelligence company that surfaces Social Truth, then builds the quantitative instruments that measure it.",
      foundingDate: "2016",
      founder: {
        "@type": "Person",
        name: "Daniel Fazekas",
        jobTitle: "Founder & CEO",
        sameAs: ["https://www.linkedin.com/in/danielfazekas/"],
      },
      email: "info@bakamosocial.com",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "enquiries",
        email: "info@bakamosocial.com",
        telephone: "+44-1553-432939",
      },
      location: [
        { "@type": "Place", address: { "@type": "PostalAddress", addressRegion: "NJ", addressCountry: "US" } },
        { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" } },
        { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: "Dortmund", addressCountry: "DE" } },
        { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: "Budapest", addressCountry: "HU" } },
        { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: "Kuala Lumpur", addressCountry: "MY" } },
      ],
      sameAs: ["https://www.linkedin.com/company/bakamosocial"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Bakamo",
      alternateName: "Bakamo.Social",
      url: SITE_URL,
      inLanguage: "en",
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};
