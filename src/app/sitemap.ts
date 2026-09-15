import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content";
import { SITE_URL } from "@/lib/site-url";

// lastModified is the date the page's content last changed. Update the date
// when a page's copy changes; Google ignores lastmod that changes on every fetch.
const STATIC_PAGES: Array<{ path: string; lastModified: string }> = [
  { path: "", lastModified: "2026-09-15" },
  { path: "/about", lastModified: "2026-09-15" },
  { path: "/our-method", lastModified: "2026-09-15" },
  { path: "/technology", lastModified: "2026-09-15" },
  { path: "/research", lastModified: "2026-09-15" },
  { path: "/research/french-election-2017", lastModified: "2026-09-15" },
  { path: "/elections", lastModified: "2026-09-15" },
  { path: "/migration", lastModified: "2026-09-15" },
  { path: "/contact", lastModified: "2026-09-15" },
  { path: "/privacy", lastModified: "2026-09-15" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticPages: MetadataRoute.Sitemap = STATIC_PAGES.map(({ path, lastModified }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(lastModified),
  }));

  const newestPostDate = posts.find((post) => post.date)?.date;
  const blogIndex: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      ...(newestPostDate ? { lastModified: new Date(newestPostDate) } : {}),
    },
  ];

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    ...(post.date ? { lastModified: new Date(post.date) } : {}),
  }));

  return [...staticPages, ...blogIndex, ...blogPages];
}
