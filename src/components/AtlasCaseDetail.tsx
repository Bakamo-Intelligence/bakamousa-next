"use client";

import { useState } from "react";
import { Cormorant_Garamond } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import type { AtlasCase } from "@/lib/atlas";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

type Props = {
  atlasCase: AtlasCase;
  /** "panel": beside the globe on the home page. "list": in a case list. */
  variant: "panel" | "list";
  analyticsLocation: string;
};

/**
 * Everything a reader sees about one Atlas case: image, headline numbers, the
 * Social Truth, the places it covers and the way on to its page.
 */
export default function AtlasCaseDetail({ atlasCase, variant, analyticsLocation }: Props) {
  const locations = atlasCase.locations ?? [];
  // Parents key this component by case and location, so the tab resets when
  // the reader opens another point.
  const [locationId, setLocationId] = useState<string | undefined>(atlasCase.locationId ?? locations[0]?.id);
  const location = locations.find((l) => l.id === locationId) ?? locations[0];

  // Only a published study has its own page. Short cases are read in place.
  const studyHref = atlasCase.href && !atlasCase.href.startsWith("/research#") ? atlasCase.href : null;
  const panel = variant === "panel";

  return (
    <>
      {atlasCase.image ? (
        <div
          className={`mb-7 overflow-hidden rounded-[1.25rem] ${
            atlasCase.image.framed ? "border border-white/10 bg-white" : ""
          }`}
          style={
            atlasCase.image.framed
              ? undefined
              : { background: "radial-gradient(ellipse at 50% 60%, rgba(201,169,110,0.16), transparent 70%)" }
          }
        >
          <Image
            src={atlasCase.image.src}
            alt={atlasCase.image.alt}
            width={atlasCase.image.width}
            height={atlasCase.image.height}
            sizes="(min-width: 768px) 520px, 90vw"
            className={`mx-auto h-auto w-full ${atlasCase.image.framed ? "" : "max-w-sm px-4 pt-4"}`}
          />
        </div>
      ) : null}

      {atlasCase.sectorRegion ? (
        <p className="text-[11px] uppercase tracking-[0.2em] text-accent">{atlasCase.sectorRegion}</p>
      ) : null}
      <h3
        className={`${cormorant.className} mt-3 font-light leading-[1.05] text-white ${
          panel ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"
        }`}
      >
        {atlasCase.name}
      </h3>

      {atlasCase.stats ? (
        <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-5 border-y border-white/10 py-5">
          {atlasCase.stats.map((stat) => (
            <div key={stat.label}>
              <dd className={`${cormorant.className} text-4xl leading-none text-accent md:text-5xl`}>{stat.value}</dd>
              <dt className="mt-2 text-[10px] uppercase tracking-[0.16em] text-text-muted">{stat.label}</dt>
            </div>
          ))}
        </dl>
      ) : null}

      <div
        className={`${cormorant.className} mt-7 space-y-4 border-l border-accent pl-5 italic leading-snug text-white ${
          panel ? "text-xl" : "text-lg md:text-xl"
        }`}
      >
        {atlasCase.essence.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {location ? (
        <div className="mt-8">
          <div role="tablist" aria-label="Countries" className="flex flex-wrap gap-2">
            {locations.map((l) => {
              const active = l.id === location.id;
              return (
                <button
                  key={l.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setLocationId(l.id)}
                  className={`rounded-full border px-4 py-1.5 text-[11px] uppercase tracking-[0.16em] transition-colors ${
                    active
                      ? "border-accent bg-accent text-near-black"
                      : "border-white/15 text-text-muted hover:border-accent hover:text-white"
                  }`}
                >
                  {l.label}
                </button>
              );
            })}
          </div>
          <div role="tabpanel" className="mt-5 rounded-[1.25rem] border border-white/10 bg-black/30 p-6">
            <p className={`${cormorant.className} text-2xl leading-tight text-white md:text-3xl`}>
              {location.character}
            </p>
            <p className="mt-5 text-[10px] uppercase tracking-[0.18em] text-accent">Where young people go</p>
            <ol className="mt-3 space-y-1.5">
              {location.places.map((place, index) => (
                <li key={place} className="flex items-baseline gap-3 text-sm font-light text-text-secondary">
                  <span className={`${cormorant.className} text-lg text-accent/80`}>{index + 1}</span>
                  {place}
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : null}

      {atlasCase.ranking ? (
        <div className="mt-8">
          <p className="text-[10px] uppercase tracking-[0.18em] text-accent">{atlasCase.ranking.title}</p>
          <ol className="mt-3 divide-y divide-white/10 border-y border-white/10">
            {atlasCase.ranking.items.map((item, index) => (
              <li key={item} className="flex items-baseline gap-4 py-2.5">
                <span className={`${cormorant.className} w-6 text-2xl leading-none text-accent`}>{index + 1}</span>
                <span className={`${cormorant.className} text-xl text-white`}>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {studyHref ? (
        <Link
          href={studyHref}
          className="cta-button mt-8 inline-block self-start text-sm"
          data-analytics-event="cta_click"
          data-analytics-label={`Atlas case: ${atlasCase.name}`}
          data-analytics-location={analyticsLocation}
          data-analytics-destination={studyHref}
        >
          {atlasCase.linkLabel ?? "See the study"}
          <span className="sr-only">: {atlasCase.name}</span>
        </Link>
      ) : null}
    </>
  );
}
