import Link from "next/link";
import { getAllPosts, isGitContentConfigured, type Post } from "@/lib/content";
import sanitizeHtml from "sanitize-html";

import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Consumer intelligence insights, methodology deep-dives, and cultural analysis from the Bakamo team.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: pageOpenGraph(
    "/blog",
    "Insights | Bakamo",
    "Consumer intelligence insights, methodology deep-dives, and cultural analysis from the Bakamo team.",
  ),
};

export default async function BlogIndexPage() {
  const gitOk = isGitContentConfigured();
  let posts: Post[] = [];
  const { cookies: cookiesFn } = await import('next/headers');
  const cookiesStore = await cookiesFn();
  const isPreview = Boolean(cookiesStore.get?.('git-preview')?.value);
  if (gitOk) {
    posts = getAllPosts({ perPage: 12, preview: isPreview });
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Insights</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Consumer intelligence insights, methodology deep-dives, and cultural analysis from the Bakamo team.
          </p>
        </div>
        <Link
          href="/"
          className="text-sm text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
        >
          ← Home
        </Link>
      </div>

      {!gitOk ? (
        <div className="mt-6 rounded-xl border border-amber-300/40 bg-amber-50 p-4 text-amber-950 dark:border-amber-200/20 dark:bg-amber-950/30 dark:text-amber-100">
          <p className="text-sm">
            Add Markdown files under <code className="font-mono">content/posts/</code>.
          </p>
        </div>
      ) : null}

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-black/10 bg-white p-6 text-zinc-700 dark:border-white/15 dark:bg-zinc-950 dark:text-zinc-300">
            <p className="text-sm">No posts found.</p>
          </div>
        ) : (
          posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/15 dark:bg-zinc-950"
            >
              <h2 className="text-base font-semibold">{sanitizeHtml(String(post.title))}</h2>
              <div className="mt-2 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400" dangerouslySetInnerHTML={{ __html: sanitizeHtml(String(post.excerpt)) }} />
              <p className="mt-3 text-sm font-medium">Read more →</p>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
