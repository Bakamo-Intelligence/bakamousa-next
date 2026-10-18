"use client";

import { useEffect, useRef, useState } from "react";
import { JOURNEY, JOURNEY_GROUPS, JOURNEY_STEPS } from "./content";

// ─── Pyramid geometry ───
// Seven bands, bottom to top, one per journey step. Labels sit to the right
// of each band and the three Maslow groups sit to the left.

const VIEW_W = 760;
const VIEW_H = 460;
const APEX_X = 420;
const APEX_Y = 30;
const BASE_Y = 430;
const BASE_HALF = 190;
const GAP = 4;
const BAND_COUNT = JOURNEY_STEPS.length;
const BAND_H = (BASE_Y - APEX_Y) / BAND_COUNT;

function halfWidthAt(y: number) {
  return (BASE_HALF * (y - APEX_Y)) / (BASE_Y - APEX_Y);
}

type Band = { index: number; yTop: number; yBottom: number; points: string; labelX: number; midY: number };

const BANDS: Band[] = JOURNEY_STEPS.map((_, index) => {
  const yBottom = BASE_Y - index * BAND_H;
  const yTop = yBottom - BAND_H + GAP;
  const hwB = halfWidthAt(yBottom);
  const hwT = Math.max(halfWidthAt(yTop), 6);
  const points = [
    `${APEX_X - hwB},${yBottom}`,
    `${APEX_X + hwB},${yBottom}`,
    `${APEX_X + hwT},${yTop}`,
    `${APEX_X - hwT},${yTop}`,
  ].join(" ");
  return { index, yTop, yBottom, points, labelX: APEX_X + hwB + 16, midY: (yTop + yBottom) / 2 };
});

function Pyramid({ active, compact }: { active: number; compact?: boolean }) {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role="img"
      aria-label={`The EVE hierarchy of needs. Step ${active + 1} of ${BAND_COUNT}: ${JOURNEY_STEPS[active].title}`}
      className="h-full w-full"
    >
      <defs>
        <radialGradient id="eve-glow" cx="50%" cy="75%" r="60%">
          <stop offset="0%" stopColor="rgba(201,169,110,0.22)" />
          <stop offset="100%" stopColor="rgba(201,169,110,0)" />
        </radialGradient>
        <filter id="eve-band-glow" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="url(#eve-glow)" />

      {/* Maslow groups, left of the pyramid */}
      {!compact &&
        JOURNEY_GROUPS.map((group) => {
          const top = BANDS[group.to].yTop;
          const bottom = BANDS[group.from].yBottom;
          const reached = active >= group.from;
          const x = APEX_X - halfWidthAt(bottom) - 22;
          return (
            <g key={group.name} className="transition-opacity duration-700" style={{ opacity: reached ? 1 : 0.4 }}>
              <line x1={x} x2={x} y1={top} y2={bottom} stroke="var(--border-grey)" strokeWidth="1" />
              <line x1={x - 6} x2={x} y1={top} y2={top} stroke="var(--border-grey)" strokeWidth="1" />
              <line x1={x - 6} x2={x} y1={bottom} y2={bottom} stroke="var(--border-grey)" strokeWidth="1" />
              <text
                x={x - 14}
                y={(top + bottom) / 2 - 4}
                textAnchor="end"
                fill={reached ? "var(--white)" : "var(--text-muted)"}
                fontSize="13"
                letterSpacing="2"
                style={{ textTransform: "uppercase" }}
              >
                {group.name}
              </text>
              <text
                x={x - 14}
                y={(top + bottom) / 2 + 14}
                textAnchor="end"
                fill="var(--text-muted)"
                fontSize="11"
                fontStyle="italic"
              >
                {group.needs}
              </text>
            </g>
          );
        })}

      {/* Bands, bottom to top */}
      {BANDS.map((band) => {
        const state = band.index < active ? "done" : band.index === active ? "active" : "ahead";
        return (
          <g key={band.index}>
            <polygon
              points={band.points}
              fill="var(--accent)"
              stroke={state === "ahead" ? "var(--border-grey)" : "var(--accent)"}
              strokeWidth="1"
              filter={state === "active" ? "url(#eve-band-glow)" : undefined}
              className="transition-[fill-opacity,stroke] duration-700 ease-out"
              style={{ fillOpacity: state === "active" ? 0.92 : state === "done" ? 0.3 : 0 }}
            />
            {!compact && (
              <text
                x={band.labelX}
                y={band.midY + 4}
                fill={state === "active" ? "var(--white)" : state === "done" ? "var(--text-secondary)" : "var(--text-muted)"}
                fontSize="13"
                letterSpacing="1.5"
                className="transition-[fill] duration-700"
                style={{ textTransform: "uppercase" }}
              >
                {band.index + 1}. {JOURNEY_STEPS[band.index].band}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/**
 * The scroll section. The pyramid stays pinned while the seven steps scroll
 * past. Whichever step is nearest the middle of the viewport is the active
 * one, and the pyramid lights up to that band.
 */
export default function Journey({ serif }: { serif: string }) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const elements = stepRefs.current.filter((el): el is HTMLLIElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(index)) setActive(index);
          }
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="journey"
      className="scroll-mt-28 border-t border-border-grey"
      data-analytics-section="eve_journey"
      data-analytics-label="The Journey"
    >
      <div className="mx-auto max-w-6xl px-6 pt-20 md:pt-28">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">A player&apos;s path</p>
        <h2 className={`${serif} mt-4 text-4xl leading-tight text-white md:text-6xl`}>{JOURNEY.heading}</h2>
        <p className="mt-8 max-w-3xl text-xl font-light leading-relaxed text-text-secondary">{JOURNEY.lead}</p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:gap-16">
        {/* Pinned pyramid. On small screens it is a short strip at the top. */}
        <div className="sticky top-24 z-10 -mx-6 h-[34vh] bg-near-black/95 px-6 pb-3 pt-4 backdrop-blur-sm md:static md:mx-0 md:h-auto md:bg-transparent md:p-0 md:backdrop-blur-none">
          <div className="h-full md:sticky md:top-32 md:flex md:h-[calc(100vh-9rem)] md:items-center">
            <div className="h-full w-full md:h-auto md:max-h-full">
              <div className="h-full md:hidden">
                <Pyramid active={active} compact />
              </div>
              <div className="hidden md:block">
                <Pyramid active={active} />
              </div>
            </div>
          </div>
          <p className="mt-1 text-center text-[11px] uppercase tracking-[0.18em] text-text-muted md:hidden">
            {active + 1} of {BAND_COUNT}. {JOURNEY_STEPS[active].band}
          </p>
        </div>

        {/* The steps */}
        <ol className="pb-24 md:pb-40">
          {JOURNEY_STEPS.map((step, index) => {
            const current = index === active;
            return (
              <li
                key={step.id}
                id={`journey-${step.id}`}
                data-index={index}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className={`flex min-h-[70vh] scroll-mt-40 items-center py-12 transition-opacity duration-700 md:min-h-[85vh] ${
                  current ? "opacity-100" : "opacity-40"
                }`}
              >
                <div className="w-full">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">
                    Step {index + 1}
                    {step.marker ? <span className="text-text-muted"> &middot; {step.marker}</span> : null}
                  </p>
                  <h3 className={`${serif} mt-4 text-3xl leading-tight text-white md:text-5xl`}>{step.title}</h3>
                  <div className="mt-6 space-y-4 text-lg font-light leading-relaxed text-text-secondary">
                    {step.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                  {step.stat ? (
                    <div className="mt-8 border-l border-accent/60 pl-5">
                      <p className={`${serif} text-5xl leading-none text-accent md:text-6xl`}>{step.stat.value}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-text-muted">{step.stat.label}</p>
                    </div>
                  ) : null}
                  {step.quote ? (
                    <blockquote className="mt-8 rounded-[1.25rem] border border-white/10 bg-dark-grey/60 p-6">
                      <p className={`${serif} text-2xl leading-snug text-white`}>&quot;{step.quote.text}&quot;</p>
                      <footer className="mt-3 text-xs uppercase tracking-[0.16em] text-accent">{step.quote.source}</footer>
                    </blockquote>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
