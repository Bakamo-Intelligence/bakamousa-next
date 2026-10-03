"use client";

import { useEffect, useRef } from "react";
import { geoDistance, geoInterpolate, geoOrthographic, geoPath, type GeoPermissibleObjects } from "d3-geo";
import LAND from "@/data/atlas-land.json";
import { FIBRE_ROUTES, type Lnglat } from "@/lib/atlas-routes";
import type { AtlasCase, AtlasPoint } from "@/lib/atlas";

/**
 * The Atlas globe renderer: a night-time sphere whose land is made of points,
 * with short sparks of conversation between them, stylised fibre routes
 * carrying pulses of light between continents, and the published cases as
 * beacons. Everything is drawn on one 2D canvas; the only React state is the
 * props. Pins are positioned HTML buttons so they stay keyboard accessible.
 */

export type GlobeProps = {
  points: AtlasPoint[];
  /** Case id the globe should turn to, or null to drift. */
  target: string | null;
  /** Descend toward the target and dim the sphere behind a reading panel. */
  zoomed: boolean;
  /** Case under the pointer: lights its beacon and holds the globe still. */
  hovered?: string | null;
  onSelect: (atlasCase: AtlasCase) => void;
  onHover?: (id: string | null) => void;
  onReady?: () => void;
  /** 0 to 1: fraction of the usual point density. Lower on small screens. */
  density: number;
};

type Dot = { lng: number; lat: number; b: number; jx: number; jy: number };
type Spark = { a: Dot; b: Dot; t0: number; life: number };
type Strand = { pts: Lnglat[]; feat: { type: "LineString"; coordinates: Lnglat[] } };
type Pulse = { s: Strand; u: number; v: number };

const GOLD = "201,169,110";
const LAND_GEO = LAND as GeoPermissibleObjects;

function isActive(point: AtlasPoint): point is AtlasCase & { status: "active" } {
  return point.status === "active";
}

/** Sample land into a point grid by rasterising the coastlines once. */
function buildDots(stepDeg: number): Dot[] {
  const W = 1440;
  const H = 720;
  const off = document.createElement("canvas");
  off.width = W;
  off.height = H;
  const ctx = off.getContext("2d");
  if (!ctx) return [];
  const eq = (lng: number, lat: number): [number, number] => [((lng + 180) / 360) * W, ((90 - lat) / 180) * H];
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  for (const poly of (LAND as { coordinates: number[][][][] }).coordinates) {
    for (const ring of poly) {
      ring.forEach((c, i) => {
        const [x, y] = eq(c[0], c[1]);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
    }
  }
  ctx.fill("evenodd");
  const img = ctx.getImageData(0, 0, W, H).data;
  const out: Dot[] = [];
  // Deterministic pseudo-random so the texture is stable between renders.
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let lat = -84; lat <= 84; lat += stepDeg) {
    const cosl = Math.cos((lat * Math.PI) / 180);
    const step = stepDeg / Math.max(cosl, 0.15);
    for (let lng = -180; lng < 180; lng += step) {
      const [x, y] = eq(lng, lat);
      const i = ((y | 0) * W + (x | 0)) * 4;
      if (img[i] > 128) {
        const r = rnd();
        out.push({ lng, lat, b: r * r, jx: (rnd() - 0.5) * step * 0.5, jy: (rnd() - 0.5) * stepDeg * 0.5 });
      }
    }
  }
  return out;
}

/** Expand each route into parallel, gently wobbling threads. */
function buildStrands(): Strand[] {
  const strands: Strand[] = [];
  let seed = 3;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (const route of FIBRE_ROUTES) {
    // Resample the waypoint chain along great circles, roughly every 1.5 degrees.
    const base: Lnglat[] = [];
    for (let i = 1; i < route.points.length; i++) {
      const a = route.points[i - 1];
      const b = route.points[i];
      const n = Math.max(2, Math.ceil((geoDistance(a, b) * 180) / Math.PI / 1.5));
      const ip = geoInterpolate(a, b);
      for (let k = i === 1 ? 0 : 1; k <= n; k++) base.push(ip(k / n));
    }
    const phase = rnd() * Math.PI * 2;
    for (let s = 0; s < route.strands; s++) {
      const lateral = (s - (route.strands - 1) / 2) * 0.42;
      const pts: Lnglat[] = base.map((p, i) => {
        const prev = base[Math.max(0, i - 1)];
        const next = base[Math.min(base.length - 1, i + 1)];
        let dx = next[0] - prev[0];
        const dy = next[1] - prev[1];
        if (dx > 180) dx -= 360;
        if (dx < -180) dx += 360;
        const len = Math.hypot(dx, dy) || 1;
        const px = -dy / len;
        const py = dx / len;
        // Threads converge at the landings and spread mid-ocean.
        const ends = Math.min(i, base.length - 1 - i);
        const spread = Math.min(1, ends / 6);
        const wobble = Math.sin(i * 0.55 + phase + s) * 0.3 * spread;
        const off = lateral * spread + wobble;
        const cosl = Math.max(0.2, Math.cos((p[1] * Math.PI) / 180));
        return [p[0] + (px * off) / cosl, p[1] + py * off];
      });
      strands.push({ pts, feat: { type: "LineString", coordinates: pts } });
    }
  }
  return strands;
}

function shortAngle(from: number, to: number) {
  return ((((to - from) % 360) + 540) % 360) - 180;
}

export default function AtlasGlobeCanvas({ points, target, zoomed, hovered = null, onSelect, onHover, onReady, density }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pinsRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef({ points, target, zoomed, hovered, onSelect, onHover, density });
  propsRef.current = { points, target, zoomed, hovered, onSelect, onHover, density };

  useEffect(() => {
    const canvas = canvasRef.current;
    const pinLayer = pinsRef.current;
    if (!canvas || !pinLayer) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dens = propsRef.current.density;
    const dots = buildDots(dens >= 0.8 ? 1.5 : dens >= 0.5 ? 1.9 : 2.4);
    const strands = buildStrands();
    const longStrands = strands.filter((s) => s.pts.length > 12);
    const maxSparks = Math.round(120 * dens);
    const pulses: Pulse[] = Array.from({ length: Math.round(40 * dens) }, () => ({
      s: longStrands[Math.floor(Math.random() * longStrands.length)],
      u: Math.random(),
      v: 0.05 + Math.random() * 0.06,
    }));
    const sparks: Spark[] = [];

    const projection = geoOrthographic().clipAngle(90);
    const path = geoPath(projection, ctx);
    const rot: [number, number] = [-15, -22];
    let zoom = 1;
    let dim = 0;
    let shift = 0;
    let spin = 1;
    // A flight is one timed move of rotation, zoom, shift and dim together,
    // so opening and closing a case reads as a single gesture.
    type Pose = { lng: number; lat: number; zoom: number; dim: number; shift: number };
    let flight: { start: number; dur: number; from: Pose; to: Pose } | null = null;
    let flightKey = "idle";
    let w = 0;
    let h = 0;
    let r0 = 0;
    let dragging: { x: number; y: number; r: [number, number] } | null = null;
    let dragUntil = 0;
    let visible = false;
    let raf: number | null = null;
    let last = performance.now();
    const t0 = last;
    const pinEls = new Map<string, HTMLButtonElement>();

    const nearDot = (a: { lng: number; lat: number }, maxR: number): Dot | null => {
      for (let i = 0; i < 6; i++) {
        const b = dots[Math.floor(Math.random() * dots.length)];
        const d = geoDistance([a.lng, a.lat], [b.lng, b.lat]);
        if (d > 0.03 && d < maxR) return b;
      }
      return null;
    };

    const along = (s: Strand, u: number): Lnglat => {
      const f = u * (s.pts.length - 1);
      const i = Math.min(s.pts.length - 2, Math.floor(f));
      return geoInterpolate(s.pts[i], s.pts[i + 1])(f - i);
    };

    // Pins: one button per published case, moved by hand each frame.
    for (const point of propsRef.current.points) {
      if (!isActive(point)) continue;
      const button = document.createElement("button");
      button.type = "button";
      button.className =
        "absolute h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent";
      button.setAttribute("aria-label", `Open ${point.name}`);
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        propsRef.current.onSelect(point);
      });
      button.addEventListener("pointerdown", (event) => event.stopPropagation());
      button.addEventListener("pointerenter", () => propsRef.current.onHover?.(point.id));
      button.addEventListener("pointerleave", () => propsRef.current.onHover?.(null));
      button.addEventListener("focus", () => propsRef.current.onHover?.(point.id));
      button.addEventListener("blur", () => propsRef.current.onHover?.(null));
      pinLayer.appendChild(button);
      pinEls.set(point.id, button);
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth || 600;
      h = canvas.clientHeight || w;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      r0 = Math.min(w, h) * 0.46;
      render(performance.now());
    };

    const visAngle = (lng: number, lat: number) => geoDistance([lng, lat], [-rot[0], -rot[1]]);

    const render = (now: number) => {
      const t = (now - t0) / 1000;
      const { points: pts, target: targetId, hovered: hoveredId } = propsRef.current;
      const r = r0 * zoom;
      // While reading, keep the case in the half of the frame the panel leaves clear.
      const cx = w / 2 - shift * (w >= 768 ? w * 0.22 : 0);
      const cy = h / 2;
      projection.rotate(rot).translate([cx, cy]).scale(r);
      ctx.clearRect(0, 0, w, h);

      // Atmosphere
      const atm = ctx.createRadialGradient(cx, cy, r * 0.95, cx, cy, r * 1.2);
      atm.addColorStop(0, "rgba(80,130,200,0.3)");
      atm.addColorStop(0.45, "rgba(60,100,170,0.1)");
      atm.addColorStop(1, "rgba(40,70,140,0)");
      ctx.fillStyle = atm;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.clip();

      const base = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 0, cx, cy, r);
      base.addColorStop(0, "#0b1521");
      base.addColorStop(1, "#03050a");
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);

      ctx.beginPath();
      path(LAND_GEO);
      ctx.fillStyle = "rgba(40,58,80,0.5)";
      ctx.fill();
      if (zoom > 1.6) {
        ctx.strokeStyle = `rgba(${GOLD},${Math.min(0.5, (zoom - 1.6) * 0.3)})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      const centre: Lnglat = [-rot[0], -rot[1]];
      const limit = zoom > 2 ? Math.PI / 2 : 1.53;
      const dotScale = Math.sqrt(zoom);
      for (const d of dots) {
        const dist = geoDistance([d.lng, d.lat], centre);
        if (dist > limit) continue;
        const p = projection([d.lng + d.jx, d.lat + d.jy]);
        if (!p || p[0] < -4 || p[0] > w + 4 || p[1] < -4 || p[1] > h + 4) continue;
        const k = Math.cos(dist);
        ctx.fillStyle = `rgba(225,205,165,${(0.06 + 0.3 * d.b) * (0.3 + 0.7 * k)})`;
        ctx.beginPath();
        ctx.arc(p[0], p[1], (0.5 + 0.9 * d.b) * dotScale, 0, Math.PI * 2);
        ctx.fill();
      }

      // Sparks of conversation between neighbouring points.
      if (!reduced) {
        for (let i = 0; i < 3 && sparks.length < maxSparks; i++) {
          const a = dots[Math.floor(Math.random() * dots.length)];
          const b = nearDot(a, 0.2);
          if (b) sparks.push({ a, b, t0: t, life: 0.6 + Math.random() * 1.2 });
        }
        for (let i = sparks.length - 1; i >= 0; i--) if (t - sparks[i].t0 > sparks[i].life) sparks.splice(i, 1);
      }
      for (const s of sparks) {
        const age = (t - s.t0) / s.life;
        if (geoDistance([s.a.lng, s.a.lat], centre) > 1.5) continue;
        ctx.beginPath();
        path({ type: "LineString", coordinates: [[s.a.lng, s.a.lat], [s.b.lng, s.b.lat]] });
        ctx.strokeStyle = `rgba(${GOLD},${0.5 * Math.sin(age * Math.PI)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Fibre: glass threads, then the light travelling along them.
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      for (const s of strands) path(s.feat);
      ctx.strokeStyle = "rgba(190,215,240,0.06)";
      ctx.lineWidth = 2.4;
      ctx.stroke();
      ctx.strokeStyle = "rgba(205,225,245,0.3)";
      ctx.lineWidth = 0.65;
      ctx.stroke();
      for (const p of pulses) {
        const head = along(p.s, p.u);
        if (geoDistance(head, centre) > 1.5) continue;
        const u0 = Math.max(0, p.u - 0.06);
        const trail: Lnglat[] = [];
        for (let k = 0; k <= 5; k++) trail.push(along(p.s, u0 + ((p.u - u0) * k) / 5));
        ctx.beginPath();
        path({ type: "LineString", coordinates: trail });
        ctx.strokeStyle = `rgba(${GOLD},0.85)`;
        ctx.lineWidth = 1.3;
        ctx.stroke();
        const q = projection(head);
        if (q) {
          const glow = ctx.createRadialGradient(q[0], q[1], 0, q[0], q[1], 5);
          glow.addColorStop(0, `rgba(${GOLD},0.7)`);
          glow.addColorStop(1, `rgba(${GOLD},0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(q[0], q[1], 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const rim = ctx.createRadialGradient(cx, cy, r * 0.84, cx, cy, r);
      rim.addColorStop(0, "rgba(90,140,210,0)");
      rim.addColorStop(1, "rgba(90,140,210,0.32)");
      ctx.fillStyle = rim;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      // Placeholders and beacons.
      let i = 0;
      for (const point of pts) {
        const hidden = visAngle(point.lng, point.lat) > Math.PI / 2 - 0.02;
        const p = hidden ? null : projection([point.lng, point.lat]);
        if (!isActive(point)) {
          if (!p) continue;
          ctx.beginPath();
          ctx.arc(p[0], p[1], 1.6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(170,190,220,0.4)";
          ctx.fill();
          continue;
        }
        const el = pinEls.get(point.id);
        if (!p) {
          if (el) el.style.display = "none";
          continue;
        }
        if (el) {
          el.style.display = "block";
          el.style.left = `${(p[0] / w) * 100}%`;
          el.style.top = `${(p[1] / h) * 100}%`;
        }
        const hot = targetId === point.id || hoveredId === point.id;
        const k = (hot ? 1.3 : 0.75) + 0.1 * Math.sin(t * 2 + i++);
        const glow = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], 22 * k);
        glow.addColorStop(0, `rgba(${GOLD},0.7)`);
        glow.addColorStop(0.35, `rgba(${GOLD},0.22)`);
        glow.addColorStop(1, `rgba(${GOLD},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p[0], p[1], 22 * k, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p[0], p[1], hot ? 3.2 : 2.4, 0, Math.PI * 2);
        ctx.fillStyle = "#fff4dc";
        ctx.fill();
        if (hot && !reduced) {
          const q = (t * 0.6) % 1;
          ctx.beginPath();
          ctx.arc(p[0], p[1], 8 + q * 34, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${GOLD},${(1 - q) * 0.7})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      if (dim > 0.01) {
        ctx.fillStyle = `rgba(10,10,10,${dim * 0.72})`;
        ctx.fillRect(0, 0, w, h);
      }
    };

    const step = (now: number) => {
      raf = null;
      if (!visible) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const { points: pts, target: targetId, zoomed: isZoomed, hovered: hoveredId } = propsRef.current;
      const targetCase = targetId ? pts.find((p) => p.id === targetId) : null;

      // Start a flight whenever the reading state changes.
      const key = isZoomed && targetCase ? `read:${targetCase.id}` : "idle";
      if (key !== flightKey) {
        const opening = key !== "idle";
        flightKey = key;
        flight = {
          start: now,
          dur: reduced ? 1 : opening ? 1500 : 1100,
          from: { lng: rot[0], lat: rot[1], zoom, dim, shift },
          to: opening && targetCase
            ? { lng: rot[0] + shortAngle(rot[0], -targetCase.lng), lat: -targetCase.lat, zoom: 3, dim: 1, shift: 1 }
            : { lng: rot[0], lat: rot[1], zoom: 1, dim: 0, shift: 0 },
        };
        spin = 0;
        dragging = null;
        dragUntil = 0;
      }

      if (flight) {
        const p = Math.min(1, (now - flight.start) / flight.dur);
        const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
        const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
        const opening = flight.to.zoom > flight.from.zoom;
        // Opening: turn first, then descend. Closing: lift first, then drift.
        const turn = ease(opening ? clamp01(p / 0.7) : p);
        const dive = ease(opening ? clamp01((p - 0.2) / 0.8) : clamp01(p / 0.8));
        rot[0] = flight.from.lng + (flight.to.lng - flight.from.lng) * turn;
        rot[1] = flight.from.lat + (flight.to.lat - flight.from.lat) * turn;
        zoom = flight.from.zoom + (flight.to.zoom - flight.from.zoom) * dive;
        // The sideways shift rides with the turn so the case travels in one direction.
        shift = flight.from.shift + (flight.to.shift - flight.from.shift) * turn;
        dim = flight.from.dim + (flight.to.dim - flight.from.dim) * dive;
        if (p >= 1) flight = null;
      } else if (!isZoomed && !dragging) {
        if (targetCase) {
          // Locator mode: follow the plate being read.
          rot[0] += shortAngle(rot[0], -targetCase.lng) * Math.min(1, dt * 2.2);
          rot[1] += (-targetCase.lat - rot[1]) * Math.min(1, dt * 2.2);
        } else {
          // Drift, easing in and out so hover and drag never snap.
          const wantSpin = !reduced && !hoveredId && now > dragUntil ? 1 : 0;
          spin += (wantSpin - spin) * Math.min(1, dt * 3);
          rot[0] += (360 / 80) * dt * spin;
        }
      }
      pinLayer.style.pointerEvents = isZoomed ? "none" : "auto";
      if (!reduced) {
        for (const p of pulses) {
          p.u += (p.v * dt * 12) / Math.max(12, p.s.pts.length);
          if (p.u > 1) {
            p.u = 0;
            p.s = longStrands[Math.floor(Math.random() * longStrands.length)];
          }
        }
      }
      render(now);
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (raf !== null) return;
      last = performance.now();
      raf = requestAnimationFrame(step);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (propsRef.current.zoomed || flight) return;
      canvas.setPointerCapture(event.pointerId);
      dragging = { x: event.clientX, y: event.clientY, r: [rot[0], rot[1]] };
      dragUntil = performance.now() + 5000;
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const k = 180 / Math.min(w, h);
      rot[0] = dragging.r[0] + (event.clientX - dragging.x) * k;
      rot[1] = Math.max(-60, Math.min(60, dragging.r[1] - (event.clientY - dragging.y) * k));
    };
    const onPointerUp = () => {
      dragging = null;
    };
    const onKey = (event: KeyboardEvent) => {
      const map: Record<string, [number, number]> = {
        ArrowLeft: [-6, 0],
        ArrowRight: [6, 0],
        ArrowUp: [0, -4],
        ArrowDown: [0, 4],
      };
      const m = map[event.key];
      if (!m || propsRef.current.zoomed || flight) return;
      event.preventDefault();
      rot[0] += m[0];
      rot[1] = Math.max(-60, Math.min(60, rot[1] + m[1]));
      dragUntil = performance.now() + 5000;
      render(performance.now());
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("keydown", onKey);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting && document.visibilityState === "visible";
        if (visible) start();
      },
      { threshold: 0.05 },
    );
    io.observe(canvas);
    const onVisibility = () => {
      if (document.visibilityState === "hidden") visible = false;
      else {
        visible = true;
        start();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    onReady?.();

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("keydown", onKey);
      for (const el of pinEls.values()) el.remove();
    };
    // The renderer reads live props through propsRef; it mounts once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        tabIndex={0}
        role="img"
        aria-label="Interactive globe showing the Atlas of Social Truths. Use the arrow keys to turn it."
        className="absolute inset-0 h-full w-full touch-none select-none outline-none focus-visible:ring-1 focus-visible:ring-accent"
      />
      <div ref={pinsRef} className="absolute inset-0" aria-hidden={false} />
    </>
  );
}
