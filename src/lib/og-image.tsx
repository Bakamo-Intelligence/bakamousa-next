import { ImageResponse } from "next/og";

/**
 * Shared renderer for every Open Graph / Twitter share image on the site.
 *
 * Each route's opengraph-image.tsx calls `renderOgImage` and exports
 * `size`, `contentType` and `alt` themselves, as the Next.js file convention
 * requires. Nothing here reads request data, so every image is generated once
 * at build time.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const COLORS = {
  background: "#0a0a0a",
  primary: "#e8e8e8",
  secondary: "#999999",
  muted: "#8a8a8a",
  accent: "#c9a96e",
};

const WORDMARK = "BAKAMO";
const DOMAIN = "bakamosocial.com";

type FontWeight = 300 | 400 | 500;
type LoadedFont = { name: string; data: ArrayBuffer; weight: FontWeight; style: "normal" };

const fontCache = new Map<string, Promise<ArrayBuffer | null>>();

function isFontFile(data: ArrayBuffer): boolean {
  if (data.byteLength < 4) return false;
  const tag = new DataView(data).getUint32(0);
  // TrueType (0x00010000), OpenType/CFF ("OTTO") or Apple TrueType ("true").
  return tag === 0x00010000 || tag === 0x4f54544f || tag === 0x74727565;
}

/**
 * Fetches a TTF subset holding only the glyphs in `text` from the Google Fonts
 * CSS2 API. Returns null on any failure so a build never breaks over a font;
 * the image then falls back to the default font bundled with next/og.
 */
function loadGoogleFont(family: string, weight: FontWeight, text: string): Promise<ArrayBuffer | null> {
  const glyphs = Array.from(new Set(Array.from(text))).sort().join("");
  const key = `${family}:${weight}:${glyphs}`;
  const cached = fontCache.get(key);
  if (cached) return cached;

  const load = (async () => {
    try {
      const cssUrl =
        `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}` +
        `&text=${encodeURIComponent(glyphs)}`;
      const css = await fetch(cssUrl, { signal: AbortSignal.timeout(10_000) }).then((res) =>
        res.ok ? res.text() : "",
      );
      const src = css.match(/src:\s*url\(([^)]+)\)\s*format\(['"](?:opentype|truetype)['"]\)/);
      if (!src) return null;
      const res = await fetch(src[1], { signal: AbortSignal.timeout(10_000) });
      if (!res.ok) return null;
      const data = await res.arrayBuffer();
      return isFontFile(data) ? data : null;
    } catch {
      return null;
    }
  })();

  fontCache.set(key, load);
  return load;
}

/**
 * Loads every face or none. A partial set would leave some text drawn from a
 * subset that lacks its glyphs, and an empty array would stop next/og from
 * using its bundled default font, so any failure returns undefined instead.
 */
async function loadFonts(title: string, descriptor: string): Promise<LoadedFont[] | undefined> {
  const interText = `${WORDMARK}${DOMAIN}${descriptor}`;
  const requests: [string, FontWeight, string][] = [
    ["Cormorant Garamond", 500, title],
    ["Inter", 300, interText],
    ["Inter", 400, interText],
  ];
  const results = await Promise.all(
    requests.map(async ([name, weight, text]) => {
      const data = await loadGoogleFont(name, weight, text);
      return data ? { name, data, weight, style: "normal" as const } : null;
    }),
  );
  const fonts = results.filter((font): font is LoadedFont => font !== null);
  if (fonts.length < requests.length) {
    console.warn("[og-image] Google Fonts unavailable; rendering with the default font.");
    return undefined;
  }
  return fonts;
}

export type OgImageContent = {
  /** Large display line, set in Cormorant Garamond. */
  title: string;
  /** Optional single line under the title, set in Inter. */
  descriptor?: string;
};

export function ogImageAlt({ title, descriptor }: OgImageContent): string {
  if (!descriptor) return `Bakamo: ${title}`;
  return `Bakamo: ${title}. ${descriptor}${/[.!?]$/.test(descriptor) ? "" : "."}`;
}

export async function renderOgImage({ title, descriptor }: OgImageContent): Promise<ImageResponse> {
  const fonts = await loadFonts(title, descriptor ?? "");
  const titleSize = title.length > 30 ? 92 : title.length > 18 ? 108 : 124;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          backgroundColor: COLORS.background,
          color: COLORS.primary,
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 300,
            letterSpacing: 6,
            color: COLORS.primary,
          }}
        >
          {WORDMARK}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              maxWidth: 1000,
              fontFamily: "Cormorant Garamond",
              fontWeight: 500,
              fontSize: titleSize,
              lineHeight: 0.95,
              letterSpacing: -1,
              color: COLORS.primary,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", width: 64, height: 2, marginTop: 40, backgroundColor: COLORS.accent }} />
          {descriptor ? (
            <div
              style={{
                display: "flex",
                marginTop: 32,
                fontSize: 30,
                fontWeight: 300,
                lineHeight: 1.3,
                color: COLORS.secondary,
              }}
            >
              {descriptor}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 20,
            fontWeight: 400,
            letterSpacing: 1,
            color: COLORS.muted,
          }}
        >
          {DOMAIN}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
