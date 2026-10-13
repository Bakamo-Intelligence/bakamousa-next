import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import { Cormorant_Garamond } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { BOOKING_HREF } from "@/lib/booking";
import { FOUNDER_REF, ORGANIZATION_REF, pageOpenGraph } from "@/lib/seo";
import { SITE_URL } from "@/lib/site-url";
import { CHAPTERS, LEAD, type Block, type Chapter, type Drawing } from "./content";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const TITLE = "Why We Read the Way We Do: Niklas Luhmann and Social Truth";
const PAGE_PATH = "/our-method/luhmann";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const DESCRIPTION =
  "Niklas Luhmann's systems theory explained plainly: minds are closed, only communication can be observed, meaning is a difference. Why Bakamo reads conversation instead of asking.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: { ...pageOpenGraph(PAGE_PATH, `${TITLE} | Bakamo`, DESCRIPTION), type: "article" },
};

const ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${PAGE_URL}#article`,
  headline: TITLE,
  description: DESCRIPTION,
  url: PAGE_URL,
  mainEntityOfPage: PAGE_URL,
  image: `${PAGE_URL}/opengraph-image`,
  inLanguage: "en",
  author: FOUNDER_REF,
  publisher: ORGANIZATION_REF,
  about: { "@type": "Person", name: "Niklas Luhmann", sameAs: "https://en.wikipedia.org/wiki/Niklas_Luhmann" },
};

const MEDIA_DIR = path.join(process.cwd(), "public", "media", "luhmann");

/** A drawing is shown only once its file is in the repo; the text never waits for the art. */
function drawingIfPresent(drawing: Drawing | undefined): Drawing | undefined {
  if (!drawing) return undefined;
  return existsSync(path.join(MEDIA_DIR, drawing.file)) ? drawing : undefined;
}

function Figure({ drawing }: { drawing: Drawing }) {
  const width = drawing.portrait ? 1696 : 2528;
  const height = drawing.portrait ? 2528 : 1696;
  return (
    <figure className={`mt-12 ${drawing.portrait ? "mx-auto max-w-xl" : ""}`}>
      <Image
        src={`/media/luhmann/${drawing.file}`}
        alt={drawing.alt}
        width={width}
        height={height}
        sizes="(min-width: 1024px) 56rem, 100vw"
        className="w-full border border-border-grey"
      />
      <figcaption className={`${cormorant.className} mt-4 text-xl italic text-text-secondary`}>
        {drawing.caption}
      </figcaption>
    </figure>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "p":
      return <p>{block.text}</p>;
    case "ol":
      return (
        <ol className="list-decimal space-y-5 pl-6 marker:text-accent">
          {block.items.map((item) => (
            <li key={item.lead}>
              <span className="text-white">{item.lead}</span> {item.text}
            </li>
          ))}
        </ol>
      );
    case "objection":
      return (
        <p>
          <span className="text-white">{block.lead}</span> {block.text}
        </p>
      );
    case "table":
      return (
        <div className="-mx-6 overflow-x-auto px-6">
          <table className="w-full min-w-[40rem] border-t border-border-grey text-left text-base">
            <thead>
              <tr>
                {block.columns.map((column) => (
                  <th
                    key={column}
                    className="py-4 pr-6 align-top text-xs font-normal uppercase tracking-[0.2em] text-accent"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border-grey">
              {block.rows.map(([term, plain, friends]) => (
                <tr key={term} className="align-top">
                  <td className="w-[22%] py-5 pr-6 text-white">{term}</td>
                  <td className="w-[39%] py-5 pr-6 leading-relaxed text-text-secondary">{plain}</td>
                  <td className="w-[39%] py-5 pr-2 leading-relaxed italic text-text-secondary">
                    {friends}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

function ChapterView({ chapter, index }: { chapter: Chapter; index: number }) {
  const drawing = drawingIfPresent(chapter.drawing);
  return (
    <section id={chapter.id} className="border-t border-border-grey px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h2 className={`${cormorant.className} mt-4 text-4xl leading-tight text-white md:text-6xl`}>
          {chapter.heading}
        </h2>
        {drawing ? <Figure drawing={drawing} /> : null}
        <div className="mt-10 space-y-7 text-xl font-light leading-relaxed text-text-secondary">
          {chapter.blocks.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function LuhmannPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-near-black text-text-primary">
      <div className="grain-overlay" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }}
      />

      <section className="px-6 pb-20 pt-32 md:pb-28 md:pt-44">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/our-method"
            className="text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:text-white"
          >
            &larr; Our method
          </Link>
          <h1
            className={`${cormorant.className} mt-6 max-w-5xl text-[clamp(3.2rem,7vw,6.5rem)] leading-[0.9] tracking-tight text-white`}
          >
            Why we read the way we do.
          </h1>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-text-secondary">
            Niklas Luhmann and Social Truth
          </p>
          <p className="mt-10 max-w-3xl text-xl font-light leading-relaxed text-text-secondary">
            {LEAD}
          </p>
        </div>
      </section>

      {CHAPTERS.map((chapter, index) => (
        <ChapterView key={chapter.id} chapter={chapter} index={index} />
      ))}

      <section className="border-t border-border-grey px-6 py-28 text-center md:py-36">
        <div className="mx-auto max-w-4xl">
          <h2 className={`${cormorant.className} text-5xl leading-none text-white md:text-7xl`}>
            Build your next study on reality.
          </h2>
          <p className="mt-8 text-base text-text-secondary">
            <Link href="/our-method" className="text-accent transition-colors hover:text-white">
              How the method works
            </Link>
            <span className="mx-3">&middot;</span>
            <Link href="/technology" className="text-accent transition-colors hover:text-white">
              The Reading Machine
            </Link>
          </p>
          <Link
            href={BOOKING_HREF}
            className="cta-button mt-10 text-sm"
            data-analytics-event="book_demo_click"
            data-analytics-label="Book a demo"
            data-analytics-location="luhmann_cta"
            data-analytics-destination={BOOKING_HREF}
          >
            Book a demo
          </Link>
        </div>
      </section>
    </main>
  );
}
