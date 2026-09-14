"use client";

/**
 * "Our social theory" — the lineage section at the bottom of /our-method.
 * A constellation of who shaped whom, then a gallery of sketch cards. Clicking
 * a portrait, or an on-stage name in the constellation, opens that thinker in
 * an overlay; any click or Escape closes it. Adapted from the TensionScope
 * Field Guide (ConstellationMap + PhilosopherGallery), restyled for the site.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DISCOURSE_EDGES,
  DISCOURSE_NODES,
  THINKERS,
  type DiscourseEdge,
  type DiscourseNode,
  type EdgeKind,
  type Thinker,
  type ThinkerDeep,
} from "./thinkers";
import { ThinkerPortrait } from "./ThinkerPortrait";

const INK = "#ffffff";
const INK_SOFT = "#b3aca0";
const INK_MUTED = "#6f6a62";
const RULE = "#2a2a2a";
const GOLD = "#c9a96e";

/* ── Constellation ──────────────────────────────────────────────────────── */

const BANDS: { label: string; y: number }[] = [
  { label: "dialogue", y: 48 },
  { label: "hermeneutics", y: 132 },
  { label: "language", y: 252 },
  { label: "culture", y: 366 },
  { label: "systems", y: 486 },
  { label: "the empirical line", y: 580 },
];

interface EdgeStyle {
  stroke: string;
  width: number;
  dash?: string;
  cap?: "round";
}

const EDGE_STYLE: Record<EdgeKind, EdgeStyle> = {
  taught: { stroke: "#e6dfd2", width: 1.7 },
  influenced: { stroke: "#8a847a", width: 0.9 },
  collab: { stroke: "#e6dfd2", width: 1.1 },
  contra: { stroke: "#8a847a", width: 1, dash: "7 4" },
  rhyme: { stroke: GOLD, width: 1.5, dash: "0.1 5.5", cap: "round" },
};

const EDGE_LEGEND: { kind: EdgeKind; label: string }[] = [
  { kind: "taught", label: "taught" },
  { kind: "influenced", label: "influenced" },
  { kind: "collab", label: "worked together" },
  { kind: "contra", label: "argued against" },
  { kind: "rhyme", label: "rhyme — a conceptual echo, not a lineage" },
];

function edgeGeom(a: DiscourseNode, b: DiscourseNode) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const off = Math.min(38, len * 0.14);
  const cx = (a.x + b.x) / 2 + (-dy / len) * off;
  const cy = (a.y + b.y) / 2 + (dx / len) * off;
  let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  if (angle > 90) angle -= 180;
  if (angle < -90) angle += 180;
  // round so server and client render identical attribute strings
  const r = (v: number) => Math.round(v * 100) / 100;
  return {
    d: `M ${a.x} ${a.y} Q ${r(cx)} ${r(cy)} ${b.x} ${b.y}`,
    midX: r(0.25 * a.x + 0.5 * cx + 0.25 * b.x),
    midY: r(0.25 * a.y + 0.5 * cy + 0.25 * b.y),
    angle: r(angle),
  };
}

function LegendSwatch({ kind }: { kind: EdgeKind }) {
  const s = EDGE_STYLE[kind];
  return (
    <svg width="30" height="10" viewBox="0 0 30 10" aria-hidden="true" className="shrink-0">
      <path
        d="M1 5 H29"
        fill="none"
        stroke={s.stroke}
        strokeWidth={s.width}
        strokeDasharray={s.dash}
        strokeLinecap={s.cap}
      />
    </svg>
  );
}

function Constellation({ onSelectThinker }: { onSelectThinker: (id: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const nodeById = useMemo(() => new Map(DISCOURSE_NODES.map((n) => [n.id, n])), []);
  const neighbors = useMemo(() => {
    const m = new Map<string, Set<string>>();
    for (const n of DISCOURSE_NODES) m.set(n.id, new Set([n.id]));
    for (const e of DISCOURSE_EDGES) {
      m.get(e.from)?.add(e.to);
      m.get(e.to)?.add(e.from);
    }
    return m;
  }, []);

  const focusId = hovered ?? selected;
  const ego = focusId ? (neighbors.get(focusId) ?? new Set([focusId])) : null;
  const focusNode = focusId ? nodeById.get(focusId) : undefined;

  const edgeTouchesFocus = (e: DiscourseEdge) =>
    focusId != null && (e.from === focusId || e.to === focusId);

  const activate = (node: DiscourseNode) => {
    setSelected((prev) => (prev === node.id ? null : node.id));
    if (!node.offstage) onSelectThinker(node.id);
  };

  return (
    <div className="border border-border-grey bg-near-black/60">
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 1000 640"
          className="block h-auto w-full min-w-[720px]"
          role="group"
          aria-label="Constellation of the thinkers behind Bakamo's methodology"
        >
          <rect
            x="0"
            y="0"
            width="1000"
            height="640"
            fill="transparent"
            onClick={() => setSelected(null)}
          />

          {BANDS.map((b) => (
            <g key={b.label} pointerEvents="none">
              <line
                x1="34"
                y1={b.y}
                x2="988"
                y2={b.y}
                stroke={RULE}
                strokeWidth="0.8"
                strokeDasharray="2 7"
              />
              <text
                x="15"
                y={b.y}
                transform={`rotate(-90 15 ${b.y})`}
                textAnchor="middle"
                fontSize="9"
                letterSpacing="0.14em"
                fill={INK_MUTED}
              >
                {b.label.toUpperCase()}
              </text>
            </g>
          ))}

          {DISCOURSE_EDGES.map((e) => {
            const a = nodeById.get(e.from);
            const b = nodeById.get(e.to);
            if (!a || !b) return null;
            const g = edgeGeom(a, b);
            const s = EDGE_STYLE[e.kind];
            const lit = edgeTouchesFocus(e);
            return (
              <g
                key={`${e.from}-${e.to}`}
                opacity={!ego ? 1 : lit ? 1 : 0.12}
                pointerEvents="none"
                style={{ transition: "opacity 200ms ease" }}
              >
                <path
                  d={g.d}
                  fill="none"
                  stroke={s.stroke}
                  strokeWidth={s.width}
                  strokeDasharray={s.dash}
                  strokeLinecap={s.cap}
                />
                <text
                  x={g.midX}
                  y={g.midY - 6}
                  textAnchor="middle"
                  fontSize="12"
                  fill={e.kind === "rhyme" ? GOLD : INK_SOFT}
                  fontStyle="italic"
                  opacity={lit ? 1 : 0}
                  transform={`rotate(${g.angle} ${g.midX} ${g.midY})`}
                  style={{ transition: "opacity 200ms ease" }}
                >
                  {e.note}
                </text>
              </g>
            );
          })}

          {DISCOURSE_NODES.map((n) => {
            const off = !!n.offstage;
            const labelAbove = n.y > 585;
            return (
              <g
                key={n.id}
                role="button"
                tabIndex={0}
                aria-label={off ? `${n.name}: ${n.note ?? ""}` : `${n.name} — open card`}
                aria-pressed={selected === n.id}
                className="cursor-pointer focus:outline-none"
                opacity={!ego ? 1 : ego.has(n.id) ? 1 : 0.2}
                style={{ transition: "opacity 200ms ease" }}
                onClick={() => activate(n)}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter" || ev.key === " ") {
                    ev.preventDefault();
                    activate(n);
                  }
                }}
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered((h) => (h === n.id ? null : h))}
                onFocus={() => setHovered(n.id)}
                onBlur={() => setHovered((h) => (h === n.id ? null : h))}
              >
                <circle cx={n.x} cy={n.y} r="16" fill="transparent" />
                {(hovered === n.id || selected === n.id) && (
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r="8"
                    fill="none"
                    stroke={GOLD}
                    strokeWidth="0.8"
                    strokeDasharray="1.5 2.5"
                  />
                )}
                <circle cx={n.x} cy={n.y} r={off ? 2.6 : 4.2} fill={off ? INK_MUTED : GOLD} />
                <text
                  x={n.x}
                  y={labelAbove ? n.y - 12 : n.y + 20}
                  textAnchor="middle"
                  fontSize={off ? 13 : 16}
                  fill={off ? INK_MUTED : INK}
                  fontStyle={off ? "italic" : "normal"}
                >
                  {n.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="px-5 pb-5">
        <p className="min-h-[1.5rem] text-sm italic text-text-secondary" aria-live="polite">
          {focusNode?.offstage && focusNode.note ? `${focusNode.name} — ${focusNode.note}` : " "}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border-grey pt-4">
          {EDGE_LEGEND.map((l) => (
            <span key={l.kind} className="flex items-center gap-2">
              <LegendSwatch kind={l.kind} />
              <span className="text-xs text-text-secondary">{l.label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Gallery + overlay ──────────────────────────────────────────────────── */

const DEEP_SECTIONS: { label: string; key: keyof Pick<ThinkerDeep, "saw" | "take" | "sure"> }[] = [
  { label: "What they saw", key: "saw" },
  { label: "What our method takes", key: "take" },
  { label: "Why we're more sure", key: "sure" },
];

function Portrait({ thinker }: { thinker: Thinker }) {
  return thinker.portrait ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={thinker.portrait} alt={`Portrait of ${thinker.name}`} className="h-full w-auto" />
  ) : (
    <ThinkerPortrait variant={thinker.variant} glyph={thinker.glyph} name={thinker.name} />
  );
}

function Gallery({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="grid grid-cols-1 gap-px bg-border-grey sm:grid-cols-2 lg:grid-cols-4">
      {THINKERS.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onOpen(t.id)}
          aria-haspopup="dialog"
          className="group block w-full bg-dark-grey px-6 pb-6 pt-6 text-left transition-colors hover:bg-[#1a1a1a]"
          data-analytics-event="thinker_card_open"
          data-analytics-label={t.name}
          data-analytics-location="method_social_theory"
        >
          <span className="mx-auto block h-[150px] w-[108px] transition-transform duration-300 group-hover:-translate-y-1">
            <Portrait thinker={t} />
          </span>
          <span className="mt-4 block text-xl font-light text-white">{t.name}</span>
          <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-text-secondary">
            {t.dates}
          </span>
          <span className="mt-4 block text-base italic leading-snug text-accent">
            {t.line.replace(" / ", " ")}
          </span>
          <span className="mt-5 block text-xs uppercase tracking-[0.16em] text-text-secondary transition-colors group-hover:text-white">
            Read on +
          </span>
        </button>
      ))}
    </div>
  );
}

function ThinkerOverlay({ thinker, onClose }: { thinker: Thinker; onClose: () => void }) {
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    // any click — on the backdrop or the panel — closes the overlay
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 px-4 py-6 backdrop-blur-sm sm:px-8"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="thinker-overlay-name"
        className="relative max-h-full w-full max-w-3xl cursor-pointer overflow-y-auto border border-border-grey bg-dark-grey px-6 py-8 sm:px-12 sm:py-12"
      >
        <p className="absolute right-5 top-5 text-xs uppercase tracking-[0.16em] text-text-secondary">
          Close ×
        </p>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-10">
          <div className="h-[170px] w-[122px] shrink-0">
            <Portrait thinker={thinker} />
          </div>
          <div>
            <h4 id="thinker-overlay-name" className="text-3xl font-light text-white md:text-4xl">
              {thinker.name}
            </h4>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-text-secondary">
              {thinker.dates}
            </p>
            <p className="mt-4 text-xl italic leading-snug text-accent">
              {thinker.line.replace(" / ", " ")}
            </p>
          </div>
        </div>

        <p className="mt-10 border-t border-border-grey pt-8 text-lg font-light leading-relaxed text-white/90">
          {thinker.blurb}
        </p>
        <div className="mt-8 space-y-8">
          {DEEP_SECTIONS.map((s) => (
            <div key={s.key}>
              <p className="text-xs uppercase tracking-[0.2em] text-accent">{s.label}</p>
              <p className="mt-3 text-base leading-relaxed text-text-secondary">
                {thinker.deep[s.key]}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-10 border-t border-border-grey pt-6 text-sm text-text-secondary">
          <span className="text-white/70">In hand:</span>{" "}
          <span className="italic">{thinker.deep.work}</span>
        </p>
      </div>
    </div>
  );
}

/* ── Section ────────────────────────────────────────────────────────────── */

export function SocialTheory({ headingClassName }: { headingClassName?: string }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = THINKERS.find((t) => t.id === activeId) ?? null;
  const close = useCallback(() => setActiveId(null), []);

  return (
    <section
      className="border-t border-border-grey bg-dark-grey px-6 py-24 md:py-32"
      data-analytics-section="method_social_theory"
      aria-labelledby="social-theory-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Our social theory</p>
        <h2
          id="social-theory-heading"
          className={`${headingClassName ?? ""} mt-6 max-w-4xl text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.95] tracking-tight text-white`}
        >
          The thinking behind our methodology.
        </h2>
        <p className="mt-10 max-w-3xl text-xl font-light leading-relaxed text-text-secondary">
          Our methodology is an argument made of other people&apos;s ideas. It holds for every
          study we have run, with or without The Reading Machine. These are the sixteen thinkers
          it leans on, who shaped whom, and what each one gives the work.
        </p>

        <h3 className="mt-20 text-2xl font-light text-white md:text-3xl">
          The discourse, as we read it.
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary">
          Who taught whom, who argued, and where ideas rhyme across traditions. Hover a name to
          see its corner of the web; click it to read about the thinker.
        </p>
        <div className="mt-10">
          <Constellation onSelectThinker={setActiveId} />
        </div>

        <h3 className="mt-24 text-2xl font-light text-white md:text-3xl">The thinkers.</h3>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary">
          Click a portrait to read what each one saw, what our method takes from it, and why it
          makes us more sure.
        </p>
        <div className="mt-10 border border-border-grey">
          <Gallery onOpen={setActiveId} />
        </div>
        <p className="mt-6 text-xs italic text-text-secondary">Sketches, not likenesses.</p>
      </div>

      {active && <ThinkerOverlay thinker={active} onClose={close} />}
    </section>
  );
}
