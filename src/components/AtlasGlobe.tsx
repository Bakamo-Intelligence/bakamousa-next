"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import { ATLAS_POINTS, type AtlasPoint, type AtlasCase } from "@/lib/atlas";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

type ProjectedPoint = AtlasPoint & {
  x: number;
  y: number;
  visible: boolean;
  depth: number;
};

type GeoPoint = {
  lat: number;
  lng: number;
};

type ProjectedGeoPoint = GeoPoint & {
  x: number;
  y: number;
  visible: boolean;
  depth: number;
};

type Landmass = {
  id: string;
  points: GeoPoint[];
};

const WIDTH = 900;
const HEIGHT = 560;
const BASE_RADIUS = 230;

const LANDMASSES: Landmass[] = [
  {
    id: "north-america",
    points: [
      { lat: 71, lng: -156 },
      { lat: 70, lng: -142 },
      { lat: 69, lng: -135 },
      { lat: 60, lng: -141 },
      { lat: 56, lng: -134 },
      { lat: 50, lng: -127 },
      { lat: 47, lng: -124 },
      { lat: 42, lng: -124 },
      { lat: 38, lng: -123 },
      { lat: 34, lng: -120 },
      { lat: 32, lng: -117 },
      { lat: 30, lng: -116 },
      { lat: 23, lng: -110 },
      { lat: 22, lng: -106 },
      { lat: 17, lng: -101 },
      { lat: 16, lng: -97 },
      { lat: 14, lng: -92 },
      { lat: 12, lng: -87 },
      { lat: 9, lng: -83 },
      { lat: 8, lng: -78 },
      { lat: 12, lng: -83 },
      { lat: 16, lng: -88 },
      { lat: 21, lng: -86 },
      { lat: 19, lng: -91 },
      { lat: 22, lng: -97 },
      { lat: 26, lng: -97 },
      { lat: 29, lng: -94 },
      { lat: 29, lng: -89 },
      { lat: 30, lng: -84 },
      { lat: 26, lng: -82 },
      { lat: 25, lng: -81 },
      { lat: 27, lng: -80 },
      { lat: 32, lng: -81 },
      { lat: 35, lng: -76 },
      { lat: 39, lng: -75 },
      { lat: 41, lng: -71 },
      { lat: 44, lng: -68 },
      { lat: 45, lng: -61 },
      { lat: 48, lng: -59 },
      { lat: 51, lng: -56 },
      { lat: 53, lng: -56 },
      { lat: 56, lng: -61 },
      { lat: 60, lng: -64 },
      { lat: 62, lng: -78 },
      { lat: 58, lng: -78 },
      { lat: 55, lng: -82 },
      { lat: 53, lng: -82 },
      { lat: 56, lng: -87 },
      { lat: 60, lng: -94 },
      { lat: 64, lng: -85 },
      { lat: 67, lng: -82 },
      { lat: 71, lng: -71 },
      { lat: 75, lng: -78 },
      { lat: 76, lng: -95 },
      { lat: 73, lng: -108 },
      { lat: 71, lng: -118 },
      { lat: 69, lng: -127 },
      { lat: 70, lng: -148 },
    ],
  },
  {
    id: "south-america",
    points: [
      { lat: 11, lng: -72 },
      { lat: 12, lng: -68 },
      { lat: 9, lng: -60 },
      { lat: 5, lng: -52 },
      { lat: -1, lng: -48 },
      { lat: -5, lng: -36 },
      { lat: -8, lng: -34 },
      { lat: -13, lng: -38 },
      { lat: -17, lng: -39 },
      { lat: -22, lng: -41 },
      { lat: -25, lng: -48 },
      { lat: -29, lng: -49 },
      { lat: -33, lng: -52 },
      { lat: -38, lng: -57 },
      { lat: -41, lng: -62 },
      { lat: -47, lng: -65 },
      { lat: -52, lng: -68 },
      { lat: -55, lng: -68 },
      { lat: -53, lng: -73 },
      { lat: -49, lng: -75 },
      { lat: -42, lng: -73 },
      { lat: -36, lng: -73 },
      { lat: -27, lng: -71 },
      { lat: -20, lng: -71 },
      { lat: -15, lng: -76 },
      { lat: -8, lng: -79 },
      { lat: -3, lng: -81 },
      { lat: 1, lng: -80 },
      { lat: 5, lng: -77 },
      { lat: 9, lng: -77 },
      { lat: 12, lng: -73 },
    ],
  },
  {
    id: "eurasia",
    points: [
      { lat: 36, lng: -6 },
      { lat: 37, lng: -9 },
      { lat: 43, lng: -9 },
      { lat: 48, lng: -5 },
      { lat: 50, lng: -1 },
      { lat: 50, lng: 2 },
      { lat: 51, lng: 4 },
      { lat: 53, lng: 7 },
      { lat: 57, lng: 8 },
      { lat: 58, lng: 10 },
      { lat: 63, lng: 5 },
      { lat: 68, lng: 14 },
      { lat: 71, lng: 26 },
      { lat: 69, lng: 33 },
      { lat: 67, lng: 41 },
      { lat: 68, lng: 55 },
      { lat: 72, lng: 70 },
      { lat: 74, lng: 84 },
      { lat: 76, lng: 100 },
      { lat: 73, lng: 113 },
      { lat: 72, lng: 130 },
      { lat: 71, lng: 140 },
      { lat: 67, lng: 158 },
      { lat: 64, lng: 178 },
      { lat: 60, lng: 168 },
      { lat: 58, lng: 162 },
      { lat: 53, lng: 158 },
      { lat: 50, lng: 156 },
      { lat: 47, lng: 142 },
      { lat: 42, lng: 134 },
      { lat: 39, lng: 128 },
      { lat: 35, lng: 126 },
      { lat: 30, lng: 122 },
      { lat: 23, lng: 117 },
      { lat: 21, lng: 109 },
      { lat: 11, lng: 107 },
      { lat: 9, lng: 105 },
      { lat: 13, lng: 100 },
      { lat: 8, lng: 99 },
      { lat: 2, lng: 102 },
      { lat: 7, lng: 95 },
      { lat: 16, lng: 95 },
      { lat: 21, lng: 90 },
      { lat: 22, lng: 87 },
      { lat: 19, lng: 84 },
      { lat: 13, lng: 80 },
      { lat: 8, lng: 77 },
      { lat: 15, lng: 73 },
      { lat: 23, lng: 68 },
      { lat: 25, lng: 60 },
      { lat: 25, lng: 57 },
      { lat: 26, lng: 56 },
      { lat: 28, lng: 51 },
      { lat: 25, lng: 50 },
      { lat: 19, lng: 41 },
      { lat: 13, lng: 43 },
      { lat: 12, lng: 51 },
      { lat: 17, lng: 56 },
      { lat: 23, lng: 60 },
      { lat: 22, lng: 60 },
      { lat: 24, lng: 35 },
      { lat: 30, lng: 33 },
      { lat: 36, lng: 36 },
      { lat: 36, lng: 30 },
      { lat: 41, lng: 28 },
      { lat: 38, lng: 24 },
      { lat: 41, lng: 19 },
      { lat: 45, lng: 13 },
      { lat: 44, lng: 9 },
      { lat: 43, lng: 5 },
      { lat: 41, lng: 3 },
      { lat: 38, lng: -1 },
    ],
  },
  {
    id: "uk-ireland",
    points: [
      { lat: 50, lng: -5 },
      { lat: 51, lng: -4 },
      { lat: 51, lng: 1 },
      { lat: 53, lng: 1 },
      { lat: 55, lng: -2 },
      { lat: 58, lng: -3 },
      { lat: 58, lng: -5 },
      { lat: 55, lng: -6 },
      { lat: 55, lng: -8 },
      { lat: 52, lng: -10 },
      { lat: 51, lng: -10 },
      { lat: 53, lng: -6 },
      { lat: 53, lng: -3 },
      { lat: 52, lng: -4 },
    ],
  },
  {
    id: "africa",
    points: [
      { lat: 32, lng: -9 },
      { lat: 35, lng: -6 },
      { lat: 37, lng: -1 },
      { lat: 36, lng: 5 },
      { lat: 33, lng: 11 },
      { lat: 32, lng: 22 },
      { lat: 31, lng: 30 },
      { lat: 30, lng: 33 },
      { lat: 24, lng: 36 },
      { lat: 18, lng: 39 },
      { lat: 12, lng: 43 },
      { lat: 11, lng: 51 },
      { lat: 2, lng: 46 },
      { lat: -5, lng: 40 },
      { lat: -10, lng: 40 },
      { lat: -16, lng: 40 },
      { lat: -22, lng: 35 },
      { lat: -26, lng: 33 },
      { lat: -29, lng: 32 },
      { lat: -34, lng: 26 },
      { lat: -35, lng: 20 },
      { lat: -34, lng: 18 },
      { lat: -29, lng: 17 },
      { lat: -23, lng: 14 },
      { lat: -18, lng: 12 },
      { lat: -12, lng: 13 },
      { lat: -5, lng: 12 },
      { lat: 0, lng: 9 },
      { lat: 4, lng: 9 },
      { lat: 6, lng: 3 },
      { lat: 6, lng: -2 },
      { lat: 5, lng: -8 },
      { lat: 9, lng: -13 },
      { lat: 14, lng: -17 },
      { lat: 20, lng: -17 },
      { lat: 25, lng: -15 },
      { lat: 30, lng: -10 },
    ],
  },
  {
    id: "madagascar",
    points: [
      { lat: -12, lng: 49 },
      { lat: -15, lng: 50 },
      { lat: -20, lng: 49 },
      { lat: -25, lng: 47 },
      { lat: -25, lng: 44 },
      { lat: -22, lng: 43 },
      { lat: -16, lng: 45 },
      { lat: -13, lng: 47 },
    ],
  },
  {
    id: "australia",
    points: [
      { lat: -11, lng: 132 },
      { lat: -12, lng: 137 },
      { lat: -15, lng: 141 },
      { lat: -11, lng: 142 },
      { lat: -14, lng: 144 },
      { lat: -20, lng: 149 },
      { lat: -25, lng: 153 },
      { lat: -29, lng: 153 },
      { lat: -34, lng: 151 },
      { lat: -38, lng: 147 },
      { lat: -39, lng: 143 },
      { lat: -38, lng: 140 },
      { lat: -35, lng: 138 },
      { lat: -32, lng: 134 },
      { lat: -34, lng: 122 },
      { lat: -33, lng: 115 },
      { lat: -30, lng: 115 },
      { lat: -26, lng: 113 },
      { lat: -22, lng: 114 },
      { lat: -20, lng: 119 },
      { lat: -18, lng: 122 },
      { lat: -14, lng: 126 },
      { lat: -12, lng: 130 },
    ],
  },
  {
    id: "new-zealand-n",
    points: [
      { lat: -35, lng: 174 },
      { lat: -37, lng: 175 },
      { lat: -38, lng: 178 },
      { lat: -41, lng: 175 },
      { lat: -40, lng: 173 },
      { lat: -37, lng: 173 },
    ],
  },
  {
    id: "new-zealand-s",
    points: [
      { lat: -41, lng: 174 },
      { lat: -43, lng: 173 },
      { lat: -46, lng: 170 },
      { lat: -47, lng: 168 },
      { lat: -45, lng: 167 },
      { lat: -42, lng: 171 },
    ],
  },
  {
    id: "greenland",
    points: [
      { lat: 83, lng: -32 },
      { lat: 81, lng: -16 },
      { lat: 75, lng: -19 },
      { lat: 68, lng: -23 },
      { lat: 64, lng: -40 },
      { lat: 60, lng: -44 },
      { lat: 64, lng: -52 },
      { lat: 68, lng: -53 },
      { lat: 73, lng: -56 },
      { lat: 76, lng: -65 },
      { lat: 80, lng: -68 },
      { lat: 82, lng: -50 },
    ],
  },
  {
    id: "iceland",
    points: [
      { lat: 64, lng: -22 },
      { lat: 65, lng: -16 },
      { lat: 66, lng: -15 },
      { lat: 66, lng: -19 },
      { lat: 64, lng: -23 },
      { lat: 64, lng: -24 },
    ],
  },
  {
    id: "japan-honshu",
    points: [
      { lat: 35, lng: 139 },
      { lat: 38, lng: 141 },
      { lat: 41, lng: 141 },
      { lat: 41, lng: 140 },
      { lat: 38, lng: 137 },
      { lat: 36, lng: 133 },
      { lat: 34, lng: 131 },
      { lat: 33, lng: 132 },
      { lat: 34, lng: 136 },
      { lat: 34, lng: 138 },
    ],
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function round(value: number) {
  return Number(value.toFixed(3));
}

function projectGeoPoint(point: GeoPoint, rotation: number, tilt: number, zoom: number): ProjectedGeoPoint {
  const radius = BASE_RADIUS * zoom;
  const lat = (point.lat * Math.PI) / 180;
  const lon = ((point.lng + rotation) * Math.PI) / 180;
  const tiltRad = (tilt * Math.PI) / 180;

  const cosLat = Math.cos(lat);
  const sinLat = Math.sin(lat);
  const cosLon = Math.cos(lon);
  const sinLon = Math.sin(lon);
  const cosTilt = Math.cos(tiltRad);
  const sinTilt = Math.sin(tiltRad);

  const x = radius * cosLat * sinLon;
  const y = radius * (sinLat * cosTilt - cosLat * cosLon * sinTilt);
  const z = sinLat * sinTilt + cosLat * cosLon * cosTilt;

  return {
    ...point,
    x: round(WIDTH / 2 + x),
    y: round(HEIGHT / 2 - y),
    depth: round(z),
    visible: z > -0.08,
  };
}

function projectPoint(point: AtlasPoint, rotation: number, tilt: number, zoom: number): ProjectedPoint {
  return {
    ...point,
    ...projectGeoPoint(point, rotation, tilt, zoom),
  };
}

function greatCircleInterpolate(a: GeoPoint, b: GeoPoint, steps: number): GeoPoint[] {
  const aLat = (a.lat * Math.PI) / 180;
  const aLng = (a.lng * Math.PI) / 180;
  const bLat = (b.lat * Math.PI) / 180;
  const bLng = (b.lng * Math.PI) / 180;

  const cosDelta =
    Math.sin(aLat) * Math.sin(bLat) + Math.cos(aLat) * Math.cos(bLat) * Math.cos(bLng - aLng);
  const delta = Math.acos(clamp(cosDelta, -1, 1));

  if (delta < 1e-6) return [a];

  const sinDelta = Math.sin(delta);
  const result: GeoPoint[] = [];

  for (let i = 0; i < steps; i++) {
    const t = i / steps;
    const f1 = Math.sin((1 - t) * delta) / sinDelta;
    const f2 = Math.sin(t * delta) / sinDelta;

    const x = f1 * Math.cos(aLat) * Math.cos(aLng) + f2 * Math.cos(bLat) * Math.cos(bLng);
    const y = f1 * Math.cos(aLat) * Math.sin(aLng) + f2 * Math.cos(bLat) * Math.sin(bLng);
    const z = f1 * Math.sin(aLat) + f2 * Math.sin(bLat);

    const lat = (Math.atan2(z, Math.sqrt(x * x + y * y)) * 180) / Math.PI;
    const lng = (Math.atan2(y, x) * 180) / Math.PI;

    result.push({ lat, lng });
  }

  return result;
}

function densifyLandmass(landmass: Landmass, segmentsPerEdge: number): GeoPoint[] {
  const dense: GeoPoint[] = [];
  const points = landmass.points;
  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    dense.push(...greatCircleInterpolate(a, b, segmentsPerEdge));
  }
  return dense;
}

function makeLandPath(landmass: Landmass, rotation: number, tilt: number, zoom: number) {
  const dense = densifyLandmass(landmass, 8);
  const projected = dense.map((point) => projectGeoPoint(point, rotation, tilt, zoom));

  const segments: ProjectedGeoPoint[][] = [];
  let current: ProjectedGeoPoint[] = [];
  for (const point of projected) {
    if (point.visible) {
      current.push(point);
    } else if (current.length > 0) {
      segments.push(current);
      current = [];
    }
  }
  if (current.length > 0) {
    if (segments.length > 0 && projected[0].visible) {
      segments[0] = [...current, ...segments[0]];
    } else {
      segments.push(current);
    }
  }

  const visibleSegments = segments.filter((segment) => segment.length >= 2);
  if (visibleSegments.length === 0) return null;

  const allVisible = visibleSegments.flat();
  const averageDepth =
    allVisible.reduce((total, point) => total + point.depth, 0) / allVisible.length;
  const opacity = clamp(0.26 + averageDepth * 0.2, 0.14, 0.42);

  const path = visibleSegments
    .map((segment) =>
      segment
        .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
        .join(" "),
    )
    .join(" ");

  return {
    id: landmass.id,
    opacity: round(opacity),
    path: `${path} Z`,
  };
}

function makeMeridian(rotation: number, tilt: number, zoom: number, meridian: number) {
  return Array.from({ length: 49 }, (_, index) => {
    const lat = -72 + index * 3;
    return projectPoint(
      { id: `m-${meridian}-${index}`, status: "inert", lat, lng: meridian },
      rotation,
      tilt,
      zoom,
    );
  })
    .filter((point) => point.visible)
    .map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`)
    .join(" ");
}

function makeParallel(rotation: number, tilt: number, zoom: number, parallel: number) {
  return Array.from({ length: 73 }, (_, index) => {
    const lng = -180 + index * 5;
    return projectPoint(
      { id: `p-${parallel}-${index}`, status: "inert", lat: parallel, lng },
      rotation,
      tilt,
      zoom,
    );
  })
    .filter((point) => point.visible)
    .map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`)
    .join(" ");
}

function isActivePoint(point: ProjectedPoint): point is ProjectedPoint & AtlasCase & { status: "active" } {
  return point.status === "active";
}

export default function AtlasGlobe() {
  const [rotation, setRotation] = useState(-20);
  const [tilt, setTilt] = useState(8);
  const [zoom, setZoom] = useState(1);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<AtlasCase | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const dragRef = useRef({ x: 0, y: 0, rotation: 0, tilt: 0 });
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const tick = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const elapsed = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (!reducedMotion && !isDragging) {
        setRotation((current) => (current + (elapsed / 1000) * (360 / 55)) % 360);
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isDragging, reducedMotion]);

  const points = useMemo(
    () =>
      ATLAS_POINTS.map((point) => projectPoint(point, rotation, tilt, zoom)).sort(
        (a, b) => a.depth - b.depth,
      ),
    [rotation, tilt, zoom],
  );

  const hoveredPoint = points.find(
    (point): point is ProjectedPoint & AtlasCase & { status: "active" } =>
      point.id === hovered && isActivePoint(point),
  );
  const meridians = [-120, -60, 0, 60, 120, 180].map((value) =>
    makeMeridian(rotation, tilt, zoom, value),
  );
  const parallels = [-60, -30, 0, 30, 60].map((value) =>
    makeParallel(rotation, tilt, zoom, value),
  );
  const landPaths = LANDMASSES.map((landmass) => makeLandPath(landmass, rotation, tilt, zoom)).filter(
    (landPath): landPath is NonNullable<typeof landPath> => landPath !== null,
  );

  return (
    <div
      className="relative mx-auto mt-14 w-full max-w-6xl touch-none select-none"
      onPointerLeave={() => setHovered(null)}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label="Interactive globe showing the Atlas of Social Truths"
        className="h-auto w-full"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          dragRef.current = {
            x: event.clientX,
            y: event.clientY,
            rotation,
            tilt,
          };
          setIsDragging(true);
        }}
        onPointerMove={(event) => {
          if (!isDragging) return;
          const dx = event.clientX - dragRef.current.x;
          const dy = event.clientY - dragRef.current.y;
          setRotation(dragRef.current.rotation + dx * 0.35);
          setTilt(clamp(dragRef.current.tilt + dy * 0.18, -42, 42));
        }}
        onPointerUp={() => setIsDragging(false)}
        onPointerCancel={() => setIsDragging(false)}
        onWheel={(event) => {
          event.preventDefault();
          setZoom((current) => clamp(current - event.deltaY * 0.0007, 0.82, 1.34));
        }}
      >
        <defs>
          <radialGradient id="atlasSurface" cx="38%" cy="30%" r="68%">
            <stop offset="0%" stopColor="#163342" />
            <stop offset="56%" stopColor="#08151f" />
            <stop offset="100%" stopColor="#020508" />
          </radialGradient>
          <radialGradient id="atlasAtmosphere" cx="42%" cy="34%" r="68%">
            <stop offset="0%" stopColor="#4fa4b8" stopOpacity="0.18" />
            <stop offset="62%" stopColor="#123646" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#07131b" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="atlasLand" x1="25%" y1="15%" x2="82%" y2="92%">
            <stop offset="0%" stopColor="#345464" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#13242f" stopOpacity="0.62" />
          </linearGradient>
          <filter id="atlasLandSoftness" x="-8%" y="-8%" width="116%" height="116%">
            <feGaussianBlur stdDeviation="0.35" />
          </filter>
          <clipPath id="atlasClip">
            <circle cx={WIDTH / 2} cy={HEIGHT / 2} r={round(BASE_RADIUS * zoom)} />
          </clipPath>
        </defs>

        <circle
          cx={WIDTH / 2}
          cy={HEIGHT / 2}
          r={round(BASE_RADIUS * zoom)}
          fill="url(#atlasSurface)"
          stroke="#2b4f5f"
          strokeWidth="1"
        />
        <circle
          cx={WIDTH / 2}
          cy={HEIGHT / 2}
          r={round(BASE_RADIUS * zoom)}
          fill="url(#atlasAtmosphere)"
        />
        <g clipPath="url(#atlasClip)" filter="url(#atlasLandSoftness)">
          {landPaths.map((landPath) => (
            <path
              key={landPath.id}
              d={landPath.path}
              fill="url(#atlasLand)"
              opacity={landPath.opacity}
              stroke="#7bb5c4"
              strokeOpacity="0.11"
              strokeWidth="0.85"
            />
          ))}
        </g>
        <g clipPath="url(#atlasClip)" opacity="0.46">
          {parallels.map((parallel, index) => (
            <polyline
              key={`parallel-${index}`}
              points={parallel}
              fill="none"
              stroke="#315261"
              strokeWidth="0.8"
            />
          ))}
          {meridians.map((meridian, index) => (
            <polyline
              key={`meridian-${index}`}
              points={meridian}
              fill="none"
              stroke="#315261"
              strokeWidth="0.8"
            />
          ))}
        </g>

        {points.map((point) => {
          if (!point.visible) return null;
          const active = isActivePoint(point);
          const radius = active ? 5.5 : 4.2;
          return (
            <g
              key={point.id}
              className={active ? "cursor-pointer" : ""}
              pointerEvents={active ? "all" : "none"}
              onPointerDown={(event) => {
                if (active) event.stopPropagation();
              }}
              onPointerUp={(event) => {
                if (!active) return;
                event.stopPropagation();
                setSelectedCase(point);
              }}
              onPointerEnter={() => {
                if (active) setHovered(point.id);
              }}
              onPointerLeave={() => {
                if (active) setHovered(null);
              }}
              onClick={(event) => {
                if (!active) return;
                event.stopPropagation();
                setSelectedCase(point);
              }}
            >
              {active ? (
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={radius + 8}
                  fill="var(--accent)"
                  opacity="0.14"
                  className="atlas-pulse"
                  pointerEvents="all"
                />
              ) : null}
              <circle
                cx={point.x}
                cy={point.y}
                r={radius}
                fill="var(--accent)"
                opacity={active ? 0.95 : 0.42}
                stroke={active ? "var(--near-black)" : "transparent"}
                strokeWidth="1.5"
                pointerEvents={active ? "all" : "none"}
              />
            </g>
          );
        })}
      </svg>

      {points.map((point) => {
        if (!point.visible || !isActivePoint(point)) return null;
        return (
          <button
            key={`hit-${point.id}`}
            type="button"
            aria-label={`Open ${point.name}`}
            className="absolute z-10 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent"
            style={{
              left: `${(point.x / WIDTH) * 100}%`,
              top: `${(point.y / HEIGHT) * 100}%`,
            }}
            onPointerEnter={() => setHovered(point.id)}
            onPointerLeave={() => setHovered(null)}
            onPointerDown={(event) => {
              event.stopPropagation();
              setSelectedCase(point);
            }}
            onClick={() => setSelectedCase(point)}
          />
        );
      })}

      {hoveredPoint ? (
        <div
          className="pointer-events-none absolute z-20 max-w-[16rem] border border-border-grey bg-near-black px-4 py-3 text-left shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
          style={{
            left: `${(hoveredPoint.x / WIDTH) * 100}%`,
            top: `${(hoveredPoint.y / HEIGHT) * 100}%`,
            transform: "translate(-50%, calc(-100% - 14px))",
          }}
        >
          <p className="text-sm text-white">{hoveredPoint.name}</p>
          {hoveredPoint.sector ? (
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-text-muted">
              {hoveredPoint.sector}
            </p>
          ) : null}
        </div>
      ) : null}

      {selectedCase ? (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/68 px-0 md:px-8">
          <article className="relative flex h-full w-full flex-col overflow-y-auto border border-border-grey bg-near-black p-7 text-left md:h-auto md:max-h-[88%] md:w-[68vw] md:max-w-3xl md:p-10">
            <button
              type="button"
              aria-label="Close case panel"
              className="absolute right-5 top-5 text-xs uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-white"
              onClick={() => setSelectedCase(null)}
            >
              Close
            </button>
            <h3 className="pr-20 text-4xl font-light leading-none text-white md:text-5xl">
              {selectedCase.name}
            </h3>
            {selectedCase.sectorRegion ? (
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-accent">
                {selectedCase.sectorRegion}
              </p>
            ) : null}
            <div
              className={`${cormorant.className} mt-8 space-y-4 border-l border-accent pl-6 text-xl italic leading-snug text-white md:text-2xl`}
            >
              {selectedCase.essence.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            {selectedCase.href ? (
              <Link
                href={selectedCase.href}
                className="mt-8 self-start text-xs uppercase tracking-[0.18em] text-accent underline-offset-4 transition-colors hover:text-white hover:underline"
                data-analytics-event="cta_click"
                data-analytics-label={`Atlas case: ${selectedCase.name}`}
                data-analytics-location="atlas_case_panel"
                data-analytics-destination={selectedCase.href}
              >
                {selectedCase.href.startsWith("/research") ? "Read more" : "See the study"}
              </Link>
            ) : null}
          </article>
        </div>
      ) : null}
    </div>
  );
}
