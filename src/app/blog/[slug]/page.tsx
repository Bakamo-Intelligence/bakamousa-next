import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getFeaturedImageUrl, isGitContentConfigured, type Post } from "@/lib/content";
import { SITE_URL } from "@/lib/site-url";
import { ORGANIZATION_REF, authorRef, pageOpenGraph } from "@/lib/seo";
import sanitizeHtml from "sanitize-html";
import { cookies } from 'next/headers';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const description = typeof post.excerpt === "string" ? post.excerpt : undefined;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      ...pageOpenGraph(`/blog/${slug}`, post.title, description ?? ""),
      type: "article",
      publishedTime: post.date || undefined,
      images: post.featuredImage
        ? [post.featuredImage]
        : [{ url: "/blog/opengraph-image", width: 1200, height: 630, alt: "Bakamo: Insights" }],
    },
    ...(post.featuredImage ? { twitter: { images: [post.featuredImage] } } : {}),
  };
}

function ArticleJsonLd({ post, slug, featuredImage }: { post: Post; slug: string; featuredImage: string | null }) {
  const url = `${SITE_URL}/blog/${slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date || undefined,
    dateModified: post.raw?.data?.updated || post.date || undefined,
    url,
    mainEntityOfPage: url,
    author: authorRef(post.raw?.data?.author),
    publisher: ORGANIZATION_REF,
    ...(featuredImage ? { image: `${SITE_URL}${featuredImage}` } : {}),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function BlogPostPage({ params }: Props) {
  if (!isGitContentConfigured()) {
    notFound();
  }

  const { slug } = await params;
  const cookiesStore = await cookies();
  const isPreview = Boolean(cookiesStore.get?.('git-preview')?.value);
  const post = getPostBySlug(slug, { preview: isPreview });

  if (!post) {
    notFound();
  }

  const featuredImage = getFeaturedImageUrl(post);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/blog"
          className="text-sm text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
        >
          ← Blog
        </Link>
        {post?.raw?.data?.link ? (
          <a
            href={String(post.raw.data.link)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            View on WordPress ↗
          </a>
        ) : null}
      </div>

      {/* Article JSON-LD */}
      <ArticleJsonLd post={post} slug={slug} featuredImage={featuredImage} />

      <article className="mt-8">
        {featuredImage ? (
          <div className="mb-6">
            <img src={featuredImage} alt={sanitizeHtml(String(post.title))} className="w-full rounded-lg object-cover max-h-96" />
          </div>
        ) : null}

        <h1 className="text-3xl font-semibold tracking-tight">{sanitizeHtml(String(post.title))}</h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          {post.date ? new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }) : null}
        </p>

        <div className="prose prose-zinc mt-8 max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: sanitizeHtml(String(post.content)) }} />
      </article>
    </main>
  );
}
