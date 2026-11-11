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
  "Five products that read what people say to each other and end in questions for your own research: Agenda, Frames, Publics, Common Sense and Public Mood.";

export const metadata: Metadata = {
  title: "What We Do: Five Ways to Find the Question",
  description: DESCRIPTION,
  alternates: {
    canonical: "/what-we-do",
  },
  openGraph: pageOpenGraph("/what-we-do", "What We Do: Five Ways to Find the Question | Bakamo", DESCRIPTION),
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
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Five ways to find the question</p>
          <h1
            className={`${cormorant.className} mt-6 max-w-5xl text-[clamp(3.2rem,7vw,6.5rem)] leading-[0.9] tracking-tight text-white`}
          >
            We read the conversation. You get the questions that matter.
          </h1>
          <div className="mt-10 h-px w-16 bg-accent" />
          <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <p className="max-w-3xl text-xl font-light leading-relaxed text-text-secondary">
              Bakamo reads what people say to each other online about a market, a brand or an
              issue, in the language of each market. We never ask and never interact. Each product
              ends in a set of questions for your own research and decisions.
            </p>
            <p className={`${cormorant.className} text-2xl italic leading-snug text-white md:text-3xl`}>
              {INTRO}
            </p>
          </div>
        </div>
      </section>

      {/* Products, each with the questions it answers */}
      <section
        className="px-6 py-24 md:py-32"
        data-analytics-section="what_we_do_products"
        data-analytics-label="Products"
      >
        <div className="mx-auto max-w-6xl">
          {/* Five identical blocks. The same five labels, in the same order, every time. */}
          <ol className="space-y-20 md:space-y-24">
            {PRODUCT_BLOCKS.map((block) => {
              const product = PRODUCTS.find((p) => p.id === block.id)!;
              const rows: { label: string; text: string; strong?: boolean }[] = [
                { label: "Question it starts from", text: block.question, strong: true },
                { label: "Use it when", text: block.useWhen },
                { label: "What you get", text: block.receive },
                { label: "The questions it hands you", text: block.questions, strong: true },
                { label: "What it does not tell you", text: block.doesNotTell },
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
                        className="grid gap-2 border-b border-border-grey py-5 md:grid-cols-[13rem_1fr] md:gap-10 md:py-6"
                      >
                        <dt className="text-[11px] uppercase tracking-[0.18em] text-accent md:pt-1.5">
                          {row.label}
                        </dt>
                        <dd className="max-w-3xl">
                          <p
                            className={
                              row.strong
                                ? "text-lg leading-snug text-white md:text-xl"
                                : "text-base font-light leading-relaxed text-text-secondary"
                            }
                          >
                            {row.text}
                          </p>
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
                data-analytics-label="Book a meeting and bring the study you are planning"
                data-analytics-location="what_we_do_products"
                data-analytics-destination={BOOKING_HREF}
              >
                Book a meeting and bring the study you are planning
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
