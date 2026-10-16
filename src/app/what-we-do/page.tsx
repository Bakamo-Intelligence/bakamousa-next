import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { BOOKING_HREF } from "@/lib/booking";
import { PRODUCTS, READING_MACHINE_LINE } from "@/lib/products";
import { ALSO_COMMISSIONED, PRODUCT_BLOCKS } from "@/lib/whatWeDo";
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

/* One mark for all five products: a square for Agenda, and one more ring
   around it for each product that includes the one before. Public Mood is the
   full set drawn dashed: the same reading, repeated. */
function DepthMark({ depth, repeat }: { depth: number; repeat?: boolean }) {
  const halves = [10, 23, 36, 49];
  return (
    <svg viewBox="0 0 112 112" width="112" height="112" aria-hidden="true" className="block">
      <rect x="0" y="0" width="112" height="112" fill="var(--near-black)" />
      {halves.map((h, k) => {
        const inSet = k < depth;
        const current = k === depth - 1 && !repeat;
        return (
          <rect
            key={k}
            x={56 - h}
            y={56 - h}
            width={h * 2}
            height={h * 2}
            rx="1.5"
            fill="none"
            stroke={inSet ? "var(--accent)" : "rgba(255,255,255,0.1)"}
            strokeWidth={current ? 1.6 : 1}
            strokeOpacity={inSet ? (current ? 1 : repeat ? 0.9 : 0.4) : 1}
            strokeDasharray={repeat && inSet ? "3 3" : undefined}
          />
        );
      })}
    </svg>
  );
}

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
                What we do, and which product does it.
              </h2>
            </div>
            <p className="text-lg font-light leading-relaxed text-text-secondary lg:pb-2">
              Each product includes everything in the one before it and answers a bigger question.
              Public Mood continues any of them.
            </p>
          </div>

          <ol className="relative mt-20 border-t border-border-grey">
            {/* The line the marks sit on */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-[3.5rem] top-0 hidden w-px bg-border-grey lg:block"
            />
            {PRODUCT_BLOCKS.map((block, index) => {
              const product = PRODUCTS.find((p) => p.id === block.id)!;
              const repeat = block.id === "public-mood";
              const depth = repeat ? 4 : index + 1;
              return (
                <li
                  key={block.id}
                  className="grid gap-8 border-b border-border-grey py-16 lg:grid-cols-[7rem_1fr] lg:gap-12 lg:py-20"
                >
                  <div className="relative hidden lg:block">
                    <div className="sticky top-32">
                      <DepthMark depth={depth} repeat={repeat} />
                    </div>
                  </div>

                  <div>
                    {/* Name, question, purpose, and the figure */}
                    <div className="grid gap-8 md:grid-cols-[1fr_11rem] md:gap-12">
                      <div>
                        <div className="flex items-center gap-4 lg:hidden">
                          <div className="w-14 shrink-0 [&>svg]:h-14 [&>svg]:w-14">
                            <DepthMark depth={depth} repeat={repeat} />
                          </div>
                        </div>
                        <h3
                          className={`${cormorant.className} mt-4 text-5xl leading-none text-white md:text-6xl lg:mt-0`}
                        >
                          {product.name}
                        </h3>
                        <p className="mt-5 max-w-xl text-xl leading-snug text-white md:text-2xl">
                          {product.question}
                        </p>
                        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-text-secondary">
                          {block.purpose}
                        </p>
                      </div>
                      <div className="md:pt-2 md:text-right">
                        <p className={`${cormorant.className} text-6xl leading-none text-white md:text-7xl`}>
                          {block.figure}
                        </p>
                        <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-text-muted">
                          {block.unit}
                        </p>
                        {block.report ? (
                          <p className="mt-3 text-xs font-light text-text-muted">{block.report}</p>
                        ) : null}
                      </div>
                    </div>

                    {/* The questions it answers, and what you receive */}
                    <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.3fr] md:gap-14">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-accent">Answers</p>
                        <ul className="mt-4 divide-y divide-border-grey border-y border-border-grey">
                          {block.answers.map((a) => (
                            <li key={a} className="py-3 text-base leading-snug text-white">
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-accent">You receive</p>
                        <ul className="mt-4 divide-y divide-border-grey border-y border-border-grey">
                          {block.receive.map((r) => (
                            <li key={r} className="py-3 text-base font-light leading-relaxed text-text-secondary">
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <p className="mt-8 text-xs font-light leading-relaxed text-text-muted">
            Every product: {READING_MACHINE_LINE.charAt(0).toLowerCase() + READING_MACHINE_LINE.slice(1)}
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-start">
            <p className="max-w-3xl text-base font-light leading-relaxed text-text-secondary">
              {ALSO_COMMISSIONED} Scope, markets and languages are set to the brief. Book a meeting
              and bring the question.
            </p>
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
