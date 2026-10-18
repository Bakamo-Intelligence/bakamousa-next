"use client";

import { COUNTRIES, fearShare, formatPct, formatPosts } from "@/data/migration-narratives";
import { useSelection } from "./SelectionContext";

const W = 640;
const H = 420;
const M = { l: 46, r: 16, t: 14, b: 40 };
const ACCENT = "#c9a96e";
const LINE = "#2a2a2a";
const LINE_2 = "#3a3a3a";
const INK_2 = "#999999";
const INK_3 = "#8a8a8a";

const x = (v: number) => M.l + (v / 100) * (W - M.l - M.r);
const y = (v: number) => H - M.b - (v / 100) * (H - M.t - M.b);

const volumes = COUNTRIES.map((c) => Math.log10(c.total_posts));
const vmin = Math.min(...volumes);
const vmax = Math.max(...volumes);
const radius = (posts: number) => 5 + 10 * ((Math.log10(posts) - vmin) / (vmax - vmin));

const LABELLED = ["HU", "PL", "DE", "UK", "NL", "ES", "FR", "IT", "SE", "DK", "CY", "SK", "EE", "IE"];
const NUDGE: Record<string, [number, number]> = {
  PL: [0, -9],
  HU: [0, 2],
  DE: [0, 11],
  IT: [0, -2],
  IE: [0, 9],
};

const TICKS = [0, 25, 50, 75, 100];

export default function Scatter() {
  const { code: current, select } = useSelection();
  const bySize = [...COUNTRIES].sort((a, b) => radius(b.total_posts) - radius(a.total_posts));
  const labelled = COUNTRIES.filter((c) => LABELLED.includes(c.code));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Scatter of humanitarian share against security plus identity share for 28 countries"
      className="block h-auto w-full"
      style={{ fontFamily: "inherit", fontSize: 11 }}
    >
      {TICKS.map((v) => (
        <g key={v}>
          <line x1={M.l} x2={W - M.r} y1={y(v)} y2={y(v)} stroke={LINE} strokeDasharray="2 4" />
          <text x={M.l - 8} y={y(v) + 4} textAnchor="end" fill={INK_3}>
            {v}%
          </text>
          <text x={x(v)} y={H - M.b + 16} textAnchor="middle" fill={INK_3}>
            {v}%
          </text>
        </g>
      ))}
      <line x1={M.l} x2={W - M.r} y1={y(0)} y2={y(0)} stroke={LINE_2} />
      <line x1={M.l} x2={M.l} y1={y(0)} y2={y(100)} stroke={LINE_2} />
      <text
        x={x(4)}
        y={y(97)}
        fill="#e8e8e8"
        opacity={0.55}
        fontSize={10}
        letterSpacing="0.1em"
        style={{ textTransform: "uppercase" }}
      >
        THREAT WITHOUT MIGRANTS
      </text>
      <text
        x={x(96)}
        y={y(6)}
        textAnchor="end"
        fill="#e8e8e8"
        opacity={0.55}
        fontSize={10}
        letterSpacing="0.1em"
      >
        WHO DESERVES HELP
      </text>
      <text x={(M.l + W - M.r) / 2} y={H - 6} textAnchor="middle" fill={INK_3}>
        Humanitarian share of conversation
      </text>
      <text
        transform={`translate(12 ${(M.t + H - M.b) / 2}) rotate(-90)`}
        textAnchor="middle"
        fill={INK_3}
      >
        Security + identity share
      </text>

      {bySize.map((c) => {
        const active = c.code === current;
        return (
          <circle
            key={c.code}
            cx={x(c.narratives_pct.humanitarianism || 0)}
            cy={y(fearShare(c))}
            r={radius(c.total_posts).toFixed(1)}
            fill={ACCENT}
            fillOpacity={active ? 1 : 0.55}
            stroke="#0a0a0a"
            strokeWidth={2}
            className="cursor-pointer hover:[fill-opacity:1]"
            tabIndex={0}
            role="button"
            aria-label={`${c.country}: security plus identity ${formatPct(fearShare(c))}, humanitarian ${formatPct(c.narratives_pct.humanitarianism)}`}
            onClick={() => select(c.code, true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                select(c.code, true);
              }
            }}
          >
            <title>
              {`${c.country}. Security + identity ${formatPct(fearShare(c))}. Humanitarian ${formatPct(c.narratives_pct.humanitarianism)}. ${formatPosts(c.total_posts)} posts.`}
            </title>
          </circle>
        );
      })}

      {labelled.map((c) => {
        const px = x(c.narratives_pct.humanitarianism || 0);
        const py = y(fearShare(c));
        const r = radius(c.total_posts);
        const right = px < W - 70;
        const [dx, dy] = NUDGE[c.code] || [0, 0];
        return (
          <text
            key={c.code}
            x={(right ? px + r + 4 : px - r - 4) + dx}
            y={py + 4 + dy}
            textAnchor={right ? "start" : "end"}
            fill={INK_2}
            fontSize={10.5}
            pointerEvents="none"
          >
            {c.code}
          </text>
        );
      })}
    </svg>
  );
}
