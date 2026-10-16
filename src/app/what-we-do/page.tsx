import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { BOOKING_HREF } from "@/lib/booking";
import { PRODUCTS } from "@/lib/products";
import { CLOSING, INTRO, PRODUCT_BLOCKS } from "@/lib/whatWeDo";
import { pageOpenGraph } from "@/lib/seo";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const DESCRIPTION =
  "The questions clients bring Bakamo and the research product that answers each. Agenda, Frames, Publics, Common Sense and Public Mood.";

export const metadata: Metadata = {
  title: "What We Do: Social Intelligence Products",
  description: DESCRIPTION,
  alternates: {
    canonical: "/what-we-do",
  },
  openGraph: pageOpenGraph("/what-we-do", "What We Do: Social Intelligence Products | Bakamo", DESCRIPTION),
};

export default function WhatWeDoPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-near-black text-text-primary">
      <div className="grain-overlay" />

      {/* Hero */}
      <section
        className="relative isolate overflow-hidden border-b border-border-grey px-6 pb-24 pt-32 md:pb-32 md:pt-44"
        data-analytics-section="what_we_do_hero"
        data-analytics-label="What We Do Hero"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_10%,rgba(201,169,110,0.14),transparent_38%)]" />
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">What we do</p>
          <h1
            className={`${cormorant.className} mt-6 max-w-5xl text-[clamp(3.2rem,7vw,6.5rem)] leading-[0.9] tracking-tight text-white`}
          >
            We read the conversation. You get the question that matters.
          </h1>
          <div className="mt-10 h-px w-16 bg-accent" />
          <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <p className="max-w-3xl text-xl font-light leading-relaxed text-text-secondary">
              Bakamo reads what people say to each other online about a market, a brand or an
              issue, in the language of each market, and interprets it: the narratives, tensions
              and personas that govern it, and what they mean for your decision.
            </p>
            <p className={`${cormorant.className} text-2xl italic leading-snug text-white md:text-3xl`}>
              We never ask and never interact. People perform for researchers. They tell each other
              the truth.
            </p>
          </div>
        </div>
      </section>

      {/* The questions people bring, each with the product that answers it */}
      <section
        className="border-b border-border-grey px-6 py-24 md:py-32"
        data-analytics-section="what_we_do_questions"
        data-analytics-label="Client Questions"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Where we start</p>
              <h2 className="mt-4 text-4xl font-light leading-tight text-white md:text-5xl">
                The questions people bring us.
              </h2>
            </div>
            <p className="text-lg font-light leading-relaxed text-text-secondary lg:pb-2">
              Find yours, and the product beside it answers it. Each product is described further
              down.
            </p>
          </div>

          <ul className="mt-14 border-t border-border-grey">
            {PRODUCT_BLOCKS.flatMap((block) => {
              const product = PRODUCTS.find((p) => p.id === block.id)!;
              return block.answers.map((q) => (
                <li key={q} className="border-b border-border-grey">
                  <Link
                    href={`#${block.id}`}
                    className="group grid gap-1 py-5 transition-colors md:grid-cols-[1fr_11rem] md:items-baseline md:gap-8"
                    data-analytics-event="cta_click"
                    data-analytics-label={product.name}
                    data-analytics-location="what_we_do_questions"
                    data-analytics-destination={`#${block.id}`}
                  >
                    <span className="text-lg leading-snug text-white md:text-xl">{q}</span>
                    <span
                      className={`${cormorant.className} text-2xl leading-none text-accent transition-colors group-hover:text-white md:text-right`}
                    >
                      {product.name}
                    </span>
                  </Link>
                </li>
              ));
            })}
          </ul>
        </div>
      </section>

      {/* Products, each with the questions it answers */}
      <section
        className="px-6 py-24 md:py-32"
        data-analytics-section="what_we_do_products"
        data-analytics-label="Products"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent">The products</p>
              <h2 className="mt-4 text-4xl font-light leading-tight text-white md:text-5xl">
                Which product answers your question.
              </h2>
            </div>
            <p className="text-lg font-light leading-relaxed text-text-secondary lg:pb-2">{INTRO}</p>
          </div>

          {/* Five identical blocks. The same five labels, in the same order, every time. */}
          <ol className="mt-20 space-y-20 md:space-y-24">
            {PRODUCT_BLOCKS.map((block) => {
              const product = PRODUCTS.find((p) => p.id === block.id)!;
              const rows: { label: string; lines: string[]; strong?: boolean }[] = [
                { label: "The question", lines: [block.question], strong: true },
                { label: "Use it when", lines: [block.useWhen] },
                { label: "It answers", lines: block.answers, strong: true },
                { label: "You receive", lines: block.receive },
                { label: "Timing", lines: [block.timing], strong: true },
              ];
              return (
                <li key={block.id} id={block.id} className="scroll-mt-28">
                  <h3 className={`${cormorant.className} text-5xl leading-none text-white md:text-6xl`}>
                    {product.name}
                  </h3>
                  <dl className="mt-8 border-t border-accent/60">
                    {rows.map((row) => (
                      <div
                        key={row.label}
                        className="grid gap-2 border-b border-border-grey py-5 md:grid-cols-[10rem_1fr] md:gap-10 md:py-6"
                      >
                        <dt className="text-[11px] uppercase tracking-[0.18em] text-accent md:pt-1.5">
                          {row.label}
                        </dt>
                        <dd className="max-w-3xl">
                          {row.lines.map((line) => (
                            <p
                              key={line}
                              className={
                                row.strong
                                  ? "text-lg leading-snug text-white md:text-xl [&+&]:mt-2"
                                  : "text-base font-light leading-relaxed text-text-secondary [&+&]:mt-1.5"
                              }
                            >
                              {line}
                            </p>
                          ))}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </li>
              );
            })}
          </ol>

          <div className="mt-20 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-start">
            <p className="max-w-3xl text-base font-light leading-relaxed text-text-secondary">{CLOSING}</p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 md:justify-self-end">
              <Link
                href={BOOKING_HREF}
                className="cta-button text-sm"
                data-analytics-event="book_demo_click"
                data-analytics-label="Book a meeting"
                data-analytics-location="what_we_do_products"
                data-analytics-destination={BOOKING_HREF}
              >
                Book a meeting
              </Link>
              <Link
                href="/our-method"
                className="inline-flex text-sm uppercase tracking-[0.16em] text-accent transition-colors hover:text-white"
                data-analytics-event="cta_click"
                data-analytics-label="How the work is done"
                data-analytics-location="what_we_do_products"
                data-analytics-destination="/our-method"
              >
                How the work is done &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="border-t border-border-grey px-6 py-28 text-center md:py-36"
        data-analytics-section="what_we_do_cta"
        data-analytics-label="CTA"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className={`${cormorant.className} text-5xl leading-none text-white md:text-7xl`}>
            Bring us the question.
          </h2>
          <Link
            href={BOOKING_HREF}
            className="cta-button mt-10 text-sm"
            data-analytics-event="book_demo_click"
            data-analytics-label="Book a meeting"
            data-analytics-location="what_we_do_cta"
            data-analytics-destination={BOOKING_HREF}
          >
            Book a meeting
          </Link>
        </div>
      </section>
    </main>
  );
}
