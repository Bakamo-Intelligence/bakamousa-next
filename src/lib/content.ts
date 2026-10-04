import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_DIR = path.join(process.cwd(), "content");
const POSTS_DIR = path.join(CONTENT_DIR, "posts");
const _PAGES_DIR = path.join(CONTENT_DIR, "pages"); // eslint-disable-line @typescript-eslint/no-unused-vars

type RawPost = {
  slug: string;
  content: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
};

export type Post = {
  title: string;
  /** Descriptive line shown under the headline. */
  subtitle: string | null;
  /** Title for search results and link previews; falls back to the headline. */
  seoTitle: string | null;
  slug: string;
  date: string | null;
  excerpt: string;
  content?: string;
  featuredImage: string | null;
  raw: RawPost;
};

export function isGitContentConfigured() {
  return fs.existsSync(CONTENT_DIR) && fs.existsSync(POSTS_DIR);
}

function readPostFile(filePath: string): RawPost {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const filename = path.basename(filePath, path.extname(filePath));
  const slug = data.slug || filename.replace(/^[0-9-]+-/, "");
  return { slug, content, data };
}

export function getAllPosts(opts?: { perPage?: number; preview?: boolean }): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  let posts: Post[] = files
    .map((f) => readPostFile(path.join(POSTS_DIR, f)))
    .filter((p) => (opts?.preview ? true : !p.data.draft))
    .map((p) => ({
      title: p.data.title || p.slug,
      subtitle: p.data.subtitle || null,
      seoTitle: p.data.seoTitle || null,
      slug: p.slug,
      date: p.data.date || null,
      excerpt: p.data.summary || p.content.split("\n\n")[0],
      featuredImage: p.data.featuredImage || null,
      raw: p,
    }))
    .sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  if (opts?.perPage) posts = posts.slice(0, opts.perPage);
  return posts;
}

export function getPostBySlug(slug: string, opts?: { preview?: boolean }): Post | null {
  if (!fs.existsSync(POSTS_DIR)) return null;
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  for (const f of files) {
    const p = readPostFile(path.join(POSTS_DIR, f));
    if (p.slug === slug) {
      if (!opts?.preview && p.data.draft) return null;
      const html = marked(p.content) as string;
      return {
        title: p.data.title || p.slug,
        subtitle: p.data.subtitle || null,
        seoTitle: p.data.seoTitle || null,
        slug: p.slug,
        date: p.data.date || null,
        content: html,
        excerpt: p.data.summary || p.content.split("\n\n")[0],
        featuredImage: p.data.featuredImage || null,
        raw: p,
      };
    }
  }
  return null;
}

export function getFeaturedImageUrl(post: Post | null) {
  if (!post) return null;
  return post.featuredImage || null;
}
