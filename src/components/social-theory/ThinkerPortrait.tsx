/**
 * A stylised line portrait + idea-glyph, drawn parametrically from a
 * PortraitVariant. Adapted from the TensionScope Field Guide and recoloured for
 * the site's dark palette. Sketches, not likenesses. The faint gold glyph
 * behind the head marks the thinker's idea.
 */

import type { GlyphId, PortraitVariant } from "./thinkers";

const GRAPHITE = "#e6dfd2";
const SOFT = "#9a9184";
const GOLD = "#c9a96e";

function Hair({ variant }: { variant: PortraitVariant }) {
  const { hair, hairPart } = variant;
  const p = (d: string, key: string) => <path key={key} d={d} />;
  switch (hair) {
    case "receding":
      return (
        <>
          {p("M49 72 C47 54 59 44 73 42", "a")}
          {p("M111 74 C113 56 103 46 89 42", "b")}
          {p("M67 41 C75 38 85 38 93 41", "c")}
        </>
      );
    case "full":
      return (
        <>
          {p("M47 70 C45 50 60 40 80 40 C100 40 115 50 113 70", "dome")}
          {hairPart === "side"
            ? p("M64 41 C60 56 56 66 52 74", "part")
            : p("M74 43 C70 55 66 65 60 72", "partL")}
          {hairPart === "side"
            ? p("M70 42 C82 50 94 52 104 50", "sweep")
            : p("M86 43 C90 55 94 65 100 72", "partR")}
        </>
      );
    case "swept":
      return (
        <>
          {p("M47 76 C44 50 60 40 80 40 C100 40 116 50 113 76", "dome")}
          {p("M55 70 C60 56 70 48 82 46", "s1")}
          {p("M70 66 C76 54 86 48 98 50", "s2")}
        </>
      );
    case "short":
      return (
        <>
          {p("M50 66 C48 50 60 42 80 42 C100 42 112 50 110 66", "dome")}
          {p("M70 44 C66 54 62 62 58 68", "part")}
        </>
      );
    case "balding":
      return (
        <>
          {p("M49 84 C46 66 54 58 64 56", "l")}
          {p("M111 84 C114 66 106 58 96 56", "r")}
        </>
      );
    case "bald":
      return (
        <>
          {p("M50 92 C48 80 52 72 60 70", "l")}
          {p("M110 92 C112 80 108 72 100 70", "r")}
        </>
      );
    case "tousled":
      return (
        <>
          {p("M50 64 C48 46 60 38 72 40", "a")}
          {p("M72 40 C80 36 90 38 96 46", "b")}
          {p("M96 46 C108 44 113 54 111 68", "c")}
          {p("M58 50 l-3 -8", "t1")}
          {p("M72 44 l-1 -9", "t2")}
          {p("M86 44 l2 -8", "t3")}
          {p("M100 50 l4 -7", "t4")}
        </>
      );
  }
}

function foreheadLines(variant: PortraitVariant) {
  if (!variant.old) return null;
  if (variant.hair === "balding" || variant.hair === "bald")
    return (
      <>
        <path d="M61 70 q19 -4 38 0" />
        <path d="M63 78 q17 -3 34 0" />
      </>
    );
  if (variant.hair === "swept") return <path d="M61 72 q19 -3 38 0" />;
  return null;
}

function Glasses({ variant }: { variant: PortraitVariant }) {
  if (variant.glasses === "none") return null;
  const lens =
    variant.glasses === "round" ? (
      <>
        <circle cx="65" cy="96" r="10" />
        <circle cx="95" cy="96" r="10" />
      </>
    ) : (
      <>
        <ellipse cx="65" cy="96" rx="12" ry="9" />
        <ellipse cx="95" cy="96" rx="12" ry="9" />
      </>
    );
  return (
    <>
      {lens}
      <path d="M77 95 L83 95" />
      <path d="M53 95 L47 92" />
      <path d="M107 95 L113 93" />
    </>
  );
}

function Brows({ variant }: { variant: PortraitVariant }) {
  if (variant.bushyBrows)
    return (
      <g strokeWidth={2.1}>
        <path d="M54 82 q11 -5 22 -1" />
        <path d="M87 81 q11 -4 22 1" />
      </g>
    );
  return (
    <>
      <path d="M55 84 q10 -4 20 -1" />
      <path d="M87 83 q10 -3 20 1" />
    </>
  );
}

function Beard({ variant }: { variant: PortraitVariant }) {
  switch (variant.beard) {
    case "mustache":
      return (
        <>
          <path d="M70 120 q10 5 20 0" />
          <path d="M71 123 q9 3 18 0" />
        </>
      );
    case "full":
      return (
        <>
          <path d="M60 134 C64 156 74 164 80 164 C86 164 96 156 100 134" />
          <path d="M70 146 l3 8" />
          <path d="M79 150 l1 9" />
          <path d="M87 146 l-2 8" />
        </>
      );
    case "short":
      return <path d="M64 138 C68 152 74 156 80 156 C86 156 92 152 96 138" />;
    case "long":
      return (
        <>
          <path d="M58 132 C55 158 64 184 80 186 C96 184 105 158 102 132" />
          <path d="M71 150 l1 26" />
          <path d="M80 152 l0 30" />
          <path d="M89 150 l-1 26" />
        </>
      );
    default:
      return null;
  }
}

function Glyph({ glyph }: { glyph: GlyphId }) {
  switch (glyph) {
    case "systems":
      return (
        <>
          <circle cx="80" cy="98" r="18" />
          <circle cx="80" cy="98" r="30" />
          <circle cx="80" cy="98" r="42" />
        </>
      );
    case "mark":
      return <path d="M46 78 L116 78 L116 110" strokeWidth={2} />;
    case "difference":
      return (
        <>
          <circle cx="58" cy="98" r="3" fill={GOLD} stroke="none" />
          <circle cx="102" cy="98" r="3" fill={GOLD} stroke="none" />
          <path d="M64 98 L78 90 L74 102 L96 98" />
        </>
      );
    case "fore":
      return (
        <>
          <path d="M40 116 L120 116" />
          <path d="M80 116 L72 96" />
          <path d="M80 116 L80 90" />
          <path d="M80 116 L88 96" />
        </>
      );
    case "horizons":
      return (
        <>
          <path d="M38 120 A48 48 0 0 1 98 70" />
          <path d="M122 120 A48 48 0 0 0 62 70" />
        </>
      );
    case "between":
      return (
        <>
          <path d="M56 76 C44 92 44 108 56 124" />
          <path d="M104 76 C116 92 116 108 104 124" />
          <circle cx="80" cy="100" r="2.5" fill={GOLD} stroke="none" />
        </>
      );
    case "narrative":
      return <path d="M44 112 C40 74 116 70 114 104 C113 122 92 122 92 108" />;
    case "frame":
      return (
        <>
          <path d="M44 64 L44 50 L58 50" />
          <path d="M116 64 L116 50 L102 50" />
          <path d="M44 134 L44 148 L58 148" />
          <path d="M116 134 L116 148 L102 148" />
        </>
      );
    case "layers":
      return (
        <>
          <rect x="50" y="80" width="60" height="18" rx="4" />
          <rect x="50" y="104" width="60" height="18" rx="4" />
          <path d="M80 98 L80 104" />
        </>
      );
    case "web":
      return (
        <>
          <path d="M80 100 L50 80 M80 100 L110 80 M80 100 L116 104 M80 100 L96 128 M80 100 L64 128 M80 100 L44 104" />
          <path d="M50 80 L110 80 L116 104 L96 128 L64 128 L44 104 Z" />
        </>
      );
    case "ladder":
      return (
        <>
          <path d="M66 64 L66 134" />
          <path d="M94 64 L94 134" />
          <path d="M66 76 L94 76 M66 92 L94 92 M66 108 L94 108 M66 124 L94 124" />
        </>
      );
    case "twostep":
      return (
        <>
          <circle cx="54" cy="98" r="4" />
          <path d="M58 98 L92 84 M58 98 L92 114" />
          <circle cx="96" cy="84" r="4" />
          <circle cx="96" cy="114" r="4" />
        </>
      );
    case "twosystems":
      return (
        <>
          <circle cx="80" cy="100" r="32" />
          <path d="M80 68 L80 132" />
          <path d="M70 84 L64 100 L72 100 L66 114" />
          <path d="M90 86 C100 96 100 104 90 114" />
        </>
      );
    case "needs":
      return (
        <>
          {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((deg) => {
            const r = (deg * Math.PI) / 180;
            return (
              <circle key={deg} cx={Math.round(80 + 38 * Math.cos(r))} cy={Math.round(100 + 38 * Math.sin(r))} r="4" />
            );
          })}
        </>
      );
    case "models":
      return (
        <>
          <rect x="40" y="82" width="36" height="36" rx="3" />
          <circle cx="104" cy="100" r="18" />
          <path d="M76 100 L86 100" strokeDasharray="2 3" />
        </>
      );
    case "mirror":
      return (
        <>
          <ellipse cx="80" cy="100" rx="26" ry="38" />
          <path d="M66 138 L94 62" />
        </>
      );
  }
}

export function ThinkerPortrait({
  variant,
  glyph,
  name,
}: {
  variant: PortraitVariant;
  glyph: GlyphId;
  name: string;
}) {
  return (
    <svg
      viewBox="0 0 160 224"
      width="100%"
      role="img"
      aria-label={`Sketch portrait of ${name}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke={GOLD} strokeWidth={1} opacity={0.45}>
        <Glyph glyph={glyph} />
      </g>
      <g fill="none" stroke={GRAPHITE} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M80 40 C99 40 111 54 113 74 C115 96 109 130 91 146 C86 151 74 151 69 146 C51 130 45 96 47 74 C49 54 61 40 80 40 Z" />
        <path d="M80 100 l-2 16 q2 4 7 3" />
        <path d="M71 128 q9 5 18 0" />
        <path d="M71 150 l-2 18" />
        <path d="M89 150 l2 18" />
        <path d="M69 168 L57 196" />
        <path d="M91 168 L103 196" />
        <path d="M69 168 L80 180 L91 168" />
        <path d="M45 212 C51 194 61 184 69 180" />
        <path d="M115 212 C109 194 99 184 91 180" />
        <path d="M60 97 q5 4 10 0" />
        <path d="M90 97 q5 4 10 0" />
        <Brows variant={variant} />
        <Glasses variant={variant} />
        <Beard variant={variant} />
      </g>
      <g fill="none" stroke={SOFT} strokeWidth={1.1} strokeLinecap="round" strokeLinejoin="round">
        <Hair variant={variant} />
        {foreheadLines(variant)}
        <path d="M99 120 l8 5" />
        <path d="M97 128 l8 5" />
        <path d="M95 136 l7 4" />
      </g>
    </svg>
  );
}
