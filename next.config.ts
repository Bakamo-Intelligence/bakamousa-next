import type { NextConfig } from "next";

const CANONICAL_ORIGIN = "https://www.bakamosocial.com";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  async redirects() {
    return [
      // bakamousa.com is being discontinued: send every path to the canonical host.
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?:www\\.)?bakamousa\\.com" }],
        destination: `${CANONICAL_ORIGIN}/:path*`,
        permanent: true,
      },

      // Routes removed from the current site.
      { source: "/science", destination: "/our-method", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/gdpr", destination: "/privacy", permanent: true },
      { source: "/blog/welcome", destination: "/blog", permanent: true },
      { source: "/blog/platform-update-git-pivot", destination: "/blog", permanent: true },

      // Legacy bakamosocial.com URLs that are still indexed or linked from other sites.
      { source: "/2018-eu-migration-study", destination: "/migration", permanent: true },
      {
        source: "/:section(blog|whatsnew)/:slug(french-presidential-election-fake-news|communique-presse-presidentielle-fake-news)",
        destination: "/frenchelection",
        permanent: true,
      },
      { source: "/whatsnew/:year/:month/:slug(.*migration.*)", destination: "/migration", permanent: true },
      {
        source: "/:section(blog|whatsnew)/:year/:month/:slug(.*(?:french|presidential|presidentielle|misinformation|desinformation).*)",
        destination: "/frenchelection",
        permanent: true,
      },
      // Old WordPress report uploads still cited by Wikipedia, press and Search
      // Console. Matched by keyword so encoded French filenames are covered too.
      {
        source: "/wp-content/uploads/2021/03/:file(.*(?:French|sinformation|Deck_).*)",
        destination: "/frenchelection",
        permanent: true,
      },
      {
        source: "/wp-content/uploads/2021/03/:file(.*Migration.*)",
        destination: "/migration",
        permanent: true,
      },
      { source: "/:page(public|public1|bakamopublic)", destination: "/migration", permanent: true },
      {
        source: "/:page(business|business1|business-2|how-we-do-it|howdowe|whatwedo|advantage|solutions|in-house-teams|health)",
        destination: "/our-method",
        permanent: true,
      },
      { source: "/:page(whoweare|about-us|team|join-us)", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/media-and-press", destination: "/blog", permanent: true },
      { source: "/:section(whatsnew|events)/:path*", destination: "/blog", permanent: true },
    ];
  },

  async rewrites() {
    return [
      // Short URL cited by Wikipedia and press. Served as a static file so the
      // 9 MB report comes from the CDN instead of a serverless function.
      {
        source: "/frenchelection",
        destination: "/media/Deck_French%20Presidential%20Election%20Report%20TotalFinal.pdf",
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
