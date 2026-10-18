"use client";

import {
  COUNTRIES,
  TILES,
  TILE_COLUMNS,
  TILE_ROWS,
  fearShare,
  formatPct,
  formatPosts,
  leadingNarrative,
} from "@/data/migration-narratives";
import { useSelection } from "./SelectionContext";

export default function TileMap() {
  const { code: current, select } = useSelection();
  return (
    <div
      role="list"
      aria-label="Tile map of the 28 member states, coloured by leading narrative"
      className="grid w-full gap-1"
      style={{
        gridTemplateColumns: `repeat(${TILE_COLUMNS}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${TILE_ROWS}, minmax(0, 1fr))`,
        aspectRatio: `${TILE_COLUMNS} / ${TILE_ROWS}`,
      }}
    >
      {COUNTRIES.map((c) => {
        const [col, row] = TILES[c.code];
        const n = leadingNarrative(c);
        const fear = fearShare(c);
        const active = c.code === current;
        return (
          <button
            key={c.code}
            type="button"
            role="listitem"
            aria-current={active ? "true" : undefined}
            aria-label={`${c.country}, ${n.label} leads, fear share ${formatPct(fear)}`}
            title={`${c.country}. ${n.label} leads at ${formatPct(c.narratives_pct[n.key])}. Fear share ${formatPct(fear)}. ${formatPosts(c.total_posts)} posts.`}
            onClick={() => select(c.code, true)}
            className={`relative grid place-items-center rounded-[3px] border-2 text-[clamp(0.55rem,1.4vw,0.8rem)] font-medium tracking-[0.04em] text-white transition-colors hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent ${
              active ? "border-white" : "border-transparent"
            }`}
            style={{ gridColumn: col + 1, gridRow: row + 1, background: n.color }}
          >
            {c.code}
            <span
              aria-hidden="true"
              className="absolute bottom-0.5 right-1 text-[0.6em] font-normal tabular-nums opacity-85"
            >
              {Math.round(fear)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
