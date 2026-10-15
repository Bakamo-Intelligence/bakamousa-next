"use client";

import { useEffect, useRef } from "react";

/**
 * Background clip for the homepage hero.
 *
 * Nothing but the poster is fetched before first paint: the video has no
 * autoplay and preload="none", and playback is only started after the window
 * load event, in an idle slot. Visitors who prefer reduced motion never
 * download a clip (and the caller hides the element with motion-reduce:hidden).
 *
 * `clip` is the path without extension; a .webp poster, a .webm and an .mp4
 * are expected to sit next to each other.
 */
export default function HeroVideo({ clip, className }: { clip: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;

    const start = () => {
      if (cancelled) return;
      video.play().catch(() => {
        /* Autoplay blocked: the poster stays, which is fine. */
      });
    };

    const schedule = () => {
      if (cancelled) return;
      if (typeof window.requestIdleCallback === "function") {
        idleHandle = window.requestIdleCallback(start, { timeout: 2000 });
      } else {
        timeoutHandle = window.setTimeout(start, 300);
      }
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      if (idleHandle !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
    };
  }, [clip]);

  return (
    <video
      ref={ref}
      key={clip}
      loop
      muted
      playsInline
      preload="none"
      poster={`${clip}.webp`}
      aria-hidden="true"
      className={className}
    >
      <source src={`${clip}.webm`} type="video/webm" />
      <source src={`${clip}.mp4`} type="video/mp4" />
    </video>
  );
}
