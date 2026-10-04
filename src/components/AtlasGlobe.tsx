"use client";

import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import { Cormorant_Garamond } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { ATLAS_POINTS, type AtlasCase } from "@/lib/atlas";
import type { GlobeProps } from "@/components/AtlasGlobeCanvas";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

type Props = {
  /**
   * "hero": clicking a case descends into it and opens the reading panel.
   * "locator": the globe follows `target` and reports clicks to `onSelect`;
   * the page shows the case itself.
   */
  mode?: "hero" | "locator";
  target?: string | null;
  onSelect?: (atlasCase: AtlasCase) => void;
  className?: string;
};

/**
 * Lazy shell around the canvas globe. Renders a lightweight placeholder
 * sphere on the server and loads the renderer and its data only when the
 * section is about to scroll into view.
 */
export default function AtlasGlobe({ mode = "hero", target = null, onSelect, className = "" }: Props) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [Canvas, setCanvas] = useState<ComponentType<GlobeProps> | null>(null);
  const [ready, setReady] = useState(false);
  const [density, setDensity] = useState(1);
  const [selected, setSelected] = useState<AtlasCase | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const width = shell.clientWidth;
        setDensity(width >= 900 ? 1 : width >= 600 ? 0.6 : 0.4);
        import("@/components/AtlasGlobeCanvas").then((mod) => setCanvas(() => mod.default));
      },
      { rootMargin: "500px 0px" },
    );
    observer.observe(shell);
    return () => observer.disconnect();
  }, []);

  const handleSelect = useCallback(
    (atlasCase: AtlasCase) => {
      if (mode === "hero") setSelected(atlasCase);
      onSelect?.(atlasCase);
    },
    [mode, onSelect],
  );

  const close = useCallback(() => {
    setSelected(null);
    setHovered(null);
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, close]);

  const hero = mode === "hero";
  // In hero mode only a click moves the globe; hovering just holds it still.
  const activeTarget = hero ? (selected?.id ?? null) : target;
  // Only a published study has its own page. Short cases are read in place.
  const studyHref = selected?.href && !selected.href.startsWith("/research#") ? selected.href : null;
  const hoveredCase = hovered && !selected ? ATLAS_POINTS.find((p) => p.id === hovered) : null;

  return (
    <div
      ref={shellRef}
      className={`relative mx-auto w-full overflow-hidden ${hero ? "mt-14 max-w-6xl aspect-square md:aspect-[16/10]" : "aspect-square"} ${className}`}
      onPointerLeave={() => setHovered(null)}
    >
      {/* Placeholder sphere, visible until the canvas has drawn its first frame. */}
      <div
        aria-hidden
        className={`absolute left-1/2 top-1/2 aspect-square h-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
        style={{
          background:
            "radial-gradient(circle at 35% 35%, #0b1521 0%, #03050a 100%)",
          boxShadow: "0 0 60px rgba(60,100,170,0.18), inset 0 0 40px rgba(90,140,210,0.12)",
        }}
      />

      {Canvas ? (
        <Canvas
          points={ATLAS_POINTS}
          target={activeTarget}
          zoomed={hero && selected !== null}
          hovered={selected ? null : hovered}
          onSelect={handleSelect}
          onHover={setHovered}
          onReady={() => setReady(true)}
          density={density}
        />
      ) : null}

      {hoveredCase && hoveredCase.status === "active" ? (
        <p className="pointer-events-none absolute left-1/2 top-4 z-20 -translate-x-1/2 border border-border-grey bg-near-black/90 px-4 py-2 text-center text-sm text-white">
          {hoveredCase.name}
        </p>
      ) : null}

      {hero ? (
        <p
          className={`pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-text-muted transition-opacity duration-500 ${selected ? "opacity-0" : "opacity-100"}`}
        >
          Click a lit point
        </p>
      ) : null}

      {hero && selected ? (
        <button
          type="button"
          aria-label="Back to the world"
          className="absolute inset-0 z-20 cursor-default bg-transparent"
          onClick={close}
        />
      ) : null}

      {hero ? (
        <aside
          aria-hidden={selected === null}
          aria-label={selected ? `Case: ${selected.name}` : undefined}
          className={`absolute inset-y-0 right-0 z-30 flex w-full flex-col overflow-y-auto p-7 text-left transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] md:w-[46%] md:max-w-lg md:p-11 ${selected ? "translate-x-0" : "translate-x-[104%]"}`}
          style={{
            background:
              "linear-gradient(90deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.94) 14%, rgba(10,10,10,0.97) 100%)",
          }}
        >
          {selected ? (
            <>
              <button
                type="button"
                className="mb-7 self-start text-xs uppercase tracking-[0.18em] text-accent transition-colors hover:text-white"
                onClick={close}
              >
                &larr; Back to the world
              </button>
              {selected.image ? (
                <Image
                  src={selected.image.src}
                  alt={selected.image.alt}
                  width={selected.image.width}
                  height={selected.image.height}
                  sizes="(min-width: 768px) 320px, 70vw"
                  className="mb-6 h-auto w-full max-w-xs"
                />
              ) : null}
              <h3 className={`${cormorant.className} text-3xl font-light leading-tight text-white md:text-4xl`}>
                {selected.name}
              </h3>
              {selected.sectorRegion ? (
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-accent">{selected.sectorRegion}</p>
              ) : null}
              <div
                className={`${cormorant.className} mt-6 space-y-4 border-l border-accent pl-5 text-xl italic leading-snug text-white`}
              >
                {selected.essence.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              {studyHref ? (
                <Link
                  href={studyHref}
                  className="cta-button mt-8 self-start text-sm"
                  data-analytics-event="cta_click"
                  data-analytics-label={`Atlas case: ${selected.name}`}
                  data-analytics-location="atlas_case_panel"
                  data-analytics-destination={studyHref}
                >
                  {selected.linkLabel ?? "See the study"}
                </Link>
              ) : null}
            </>
          ) : null}
        </aside>
      ) : null}
    </div>
  );
}
