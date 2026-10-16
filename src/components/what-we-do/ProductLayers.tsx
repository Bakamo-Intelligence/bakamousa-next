"use client";

import { useEffect, useRef, useState } from "react";
import { PRODUCTS, READING_MACHINE_LINE } from "@/lib/products";

type Timing = { figure: string; unit: string };

type Props = {
  headingClassName: string;
  firstFindings: Record<string, Timing>;
};

const GOLD = "#c9a96e";

/* ── The cross-section ──────────────────────────────────────────────────
   Four strata that widen as they go down: each product includes the one
   above and reaches further. Public Mood is the same section read again,
   drawn as echoes behind it. Textures are deterministic so server and
   client render the same marks. */

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const W = 500;
const TOP = 56;
const BAND_H = 92;
const CX = 300;
// half-widths, top to bottom
const HALF = [92, 116, 140, 164];

function bandPath(i: number) {
  const y0 = TOP + i * BAND_H;
  const y1 = y0 + BAND_H;
  const topHalf = i === 0 ? HALF[0] : HALF[i - 1];
  const botHalf = HALF[i];
  return `M${CX - topHalf} ${y0} L${CX + topHalf} ${y0} L${CX + botHalf} ${y1} L${CX - botHalf} ${y1} Z`;
}

function outlinePath() {
  const y0 = TOP;
  const y1 = TOP + 4 * BAND_H;
  return `M${CX - HALF[0]} ${y0} L${CX + HALF[0]} ${y0} L${CX + HALF[3]} ${y1} L${CX - HALF[3]} ${y1} Z`;
}

/** x-extent of band i at a given y (0..1 inside the band) */
function halfAt(i: number, f: number) {
  const topHalf = i === 0 ? HALF[0] : HALF[i - 1];
  return topHalf + (HALF[i] - topHalf) * f;
}

function TopicDots() {
  const rnd = seeded(11);
  const dots: { x: number; y: number; r: number }[] = [];
  for (let n = 0; n < 34; n++) {
    const f = 0.12 + rnd() * 0.76;
    const h = halfAt(0, f) - 10;
    dots.push({ x: CX + (rnd() * 2 - 1) * h, y: TOP + f * BAND_H, r: 1.6 + rnd() * rnd() * 7 });
  }
  return (
    <>
      {dots.map((d, k) => (
        <circle key={k} cx={d.x.toFixed(1)} cy={d.y.toFixed(1)} r={d.r.toFixed(1)} />
      ))}
    </>
  );
}

function NarrativeLines() {
  const rnd = seeded(23);
  const y0 = TOP + BAND_H;
  const lines: string[] = [];
  for (let n = 0; n < 6; n++) {
    const f = 0.14 + (n / 5) * 0.72;
    const y = y0 + f * BAND_H;
    const h = halfAt(1, f) - 12;
    const a = 4 + rnd() * 7;
    const x0 = CX - h;
    const x1 = CX + h;
    const q1 = x0 + (x1 - x0) * 0.25;
    const q2 = x0 + (x1 - x0) * 0.5;
    const q3 = x0 + (x1 - x0) * 0.75;
    lines.push(
      `M${x0} ${y} C${q1} ${y - a} ${q1} ${y + a} ${q2} ${y} S${q3} ${y + a} ${x1} ${y - a * 0.4}`,
    );
  }
  return (
    <>
      {lines.map((d, k) => (
        <path key={k} d={d} fill="none" />
      ))}
    </>
  );
}

function PeopleClusters() {
  const rnd = seeded(37);
  const y0 = TOP + 2 * BAND_H;
  const centers = [
    { x: CX - 74, y: y0 + 34, n: 14 },
    { x: CX + 10, y: y0 + 58, n: 18 },
    { x: CX + 82, y: y0 + 30, n: 11 },
    { x: CX - 20, y: y0 + 22, n: 7 },
  ];
  const dots: { x: number; y: number }[] = [];
  for (const c of centers) {
    for (let k = 0; k < c.n; k++) {
      const ang = rnd() * Math.PI * 2;
      const rad = Math.sqrt(rnd()) * 20;
      dots.push({ x: c.x + Math.cos(ang) * rad * 1.3, y: c.y + Math.sin(ang) * rad * 0.8 });
    }
  }
  return (
    <>
      {dots.map((d, k) => (
        <circle key={k} cx={d.x.toFixed(1)} cy={d.y.toFixed(1)} r="1.7" />
      ))}
    </>
  );
}

function BedrockHatch() {
  const y0 = TOP + 3 * BAND_H;
  const rows: string[] = [];
  for (let n = 0; n < 9; n++) {
    const f = 0.1 + (n / 8) * 0.8;
    const y = y0 + f * BAND_H;
    const h = halfAt(3, f) - 10;
    const dash = n % 2 === 0 ? "14 6" : "8 5";
    rows.push(`${(CX - h).toFixed(1)} ${y.toFixed(1)} L${(CX + h).toFixed(1)} ${y.toFixed(1)}|${dash}`);
  }
  return (
    <>
      {rows.map((r, k) => {
        const [d, dash] = r.split("|");
        return <path key={k} d={`M${d}`} strokeDasharray={dash} fill="none" />;
      })}
    </>
  );
}

const TEXTURES = [TopicDots, NarrativeLines, PeopleClusters, BedrockHatch];

function Section({ activeIndex }: { activeIndex: number }) {
  const tracking = activeIndex === 4;
  return (
    <svg
      viewBox={`0 0 ${W} ${TOP + 4 * BAND_H + 48}`}
      width="100%"
      role="img"
      aria-label="Cross-section of the five products: each one includes the one above and reaches further; Public Mood reads the whole section again every month"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      {/* Public Mood: the section read again, echoed behind */}
      {[2, 1].map((k) => (
        <path
          key={k}
          d={outlinePath()}
          fill="none"
          stroke={GOLD}
          strokeWidth="0.8"
          strokeDasharray="2 4"
          transform={`translate(${k * 14} ${-k * 14})`}
          style={{
            opacity: tracking ? 0.9 - k * 0.25 : 0.12,
            transition: "opacity 500ms ease",
          }}
        />
      ))}

      <g
        style={{
          transform: `translateY(${tracking ? 0 : -activeIndex * 16}px)`,
          transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
      {[0, 1, 2, 3].map((i) => {
        const lit = tracking || i <= activeIndex;
        const focus = i === activeIndex;
        const Texture = TEXTURES[i];
        return (
          <g key={i}>
            <path
              d={bandPath(i)}
              fill={GOLD}
              stroke={focus ? GOLD : "rgba(255,255,255,0.18)"}
              strokeWidth={focus ? 1 : 0.8}
              style={{
                fillOpacity: focus ? 0.14 : lit ? 0.05 : 0,
                transition: "fill-opacity 500ms ease, stroke 500ms ease",
              }}
            />
            <g
              fill={GOLD}
              stroke={GOLD}
              strokeWidth="1"
              style={{
                opacity: focus ? 0.95 : lit ? 0.45 : 0.14,
                transition: "opacity 500ms ease",
              }}
            >
              <Texture />
            </g>
            <text
              x={CX - halfAt(i, 0) - 10}
              y={TOP + i * BAND_H + 16}
              textAnchor="end"
              fontSize="10"
              letterSpacing="1.5"
              fill={focus ? GOLD : "rgba(255,255,255,0.35)"}
              style={{ transition: "fill 500ms ease" }}
            >
              {PRODUCTS[i].name.toUpperCase()}
            </text>
          </g>
        );
      })}
      </g>

      {/* Ground line and the monthly ticks for Public Mood */}
      <path
        d={`M${CX - HALF[3] - 18} ${TOP + 4 * BAND_H} L${CX + HALF[3] + 18} ${TOP + 4 * BAND_H}`}
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="0.8"
      />
      <g style={{ opacity: tracking ? 1 : 0.25, transition: "opacity 500ms ease" }}>
        {[0, 1, 2, 3, 4, 5].map((m) => {
          const x = CX - 60 + m * 24;
          const y = TOP + 4 * BAND_H + 26;
          return (
            <g key={m}>
              <path d={`M${x} ${y - 5} L${x} ${y + 5}`} stroke={GOLD} strokeWidth="1" />
              {tracking && m === 5 ? <circle cx={x} cy={y} r="3" fill={GOLD} /> : null}
            </g>
          );
        })}
        <text
          x={CX + 72}
          y={TOP + 4 * BAND_H + 30}
          fontSize="10"
          letterSpacing="1.5"
          fill={tracking ? GOLD : "rgba(255,255,255,0.35)"}
        >
          MONTHLY
        </text>
      </g>
    </svg>
  );
}

/* ── Rows + sticky diagram ─────────────────────────────────────────────── */

export default function ProductLayers({ headingClassName, firstFindings }: Props) {
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean) as HTMLLIElement[];
    if (rows.length === 0 || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.index);
            if (!Number.isNaN(i)) setActive(i);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  const current = PRODUCTS[active];

  return (
    <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
      {/* Diagram */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="mx-auto max-w-sm lg:max-w-none">
          <Section activeIndex={active} />
        </div>
        <div className="mt-4 min-h-[5.5rem] border-t border-border-grey pt-4" aria-live="polite">
          <p className={`${headingClassName} text-3xl leading-none text-white`}>{current.name}</p>
          <p className="mt-2 text-sm leading-snug text-text-secondary">{current.question}</p>
        </div>
      </div>

      {/* Rows */}
      <div>
        <ol className="border-t border-border-grey">
          {PRODUCTS.map((product, index) => {
            const tracking = product.id === "public-mood";
            const timing = firstFindings[product.id];
            const focus = index === active;
            return (
              <li
                key={product.id}
                data-index={index}
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
                onMouseEnter={() => setActive(index)}
                className="grid gap-5 border-b border-border-grey py-10 transition-opacity duration-500 md:grid-cols-[1fr_7.5rem] md:gap-8 md:py-12"
                style={{ opacity: focus ? 1 : 0.65 }}
              >
                <div>
                  <h3 className={`${headingClassName} text-4xl leading-none text-white md:text-5xl`}>
                    {product.name}
                  </h3>
                  <p className="mt-4 max-w-md text-lg leading-snug text-white">{product.question}</p>
                  <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-text-secondary">
                    {product.benefit}
                  </p>
                  <details className="group/details mt-5">
                    <summary className="inline-flex cursor-pointer list-none items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-accent transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
                      <span className="group-open/details:hidden">What you receive +</span>
                      <span className="hidden group-open/details:inline">What you receive &minus;</span>
                    </summary>
                    <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-text-secondary">
                      {product.summary}
                    </p>
                  </details>
                </div>

                <div className="md:pt-8 md:text-right">
                  <p className={`${headingClassName} text-5xl leading-none text-white`}>{timing.figure}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-text-muted">{timing.unit}</p>
                  {tracking ? (
                    <p className="mt-3 text-xs font-light text-text-muted">Six-month minimum</p>
                  ) : product.id !== "agenda" ? (
                    <p className="mt-3 text-xs font-light text-text-muted">Full report in {product.timing}</p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-6 text-xs font-light leading-relaxed text-text-muted">
          Every product: {READING_MACHINE_LINE.charAt(0).toLowerCase() + READING_MACHINE_LINE.slice(1)}
        </p>
      </div>
    </div>
  );
}
