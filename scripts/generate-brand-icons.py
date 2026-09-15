#!/usr/bin/env python3
"""Render Bakamo's favicon set and brand mark.

The mark is an uppercase "B" in Cormorant Garamond, gold (#c9a96e) on
near-black (#0a0a0a), matching the site's display face and palette.

The font is downloaded from the Google Fonts CSS2 API into a temporary
directory each run, so no font files are committed. Requires Pillow.

Outputs (paths relative to the repository root):
  src/app/favicon.ico          16, 32 and 48 px frames
  src/app/icon.png             512 x 512
  src/app/apple-icon.png       180 x 180
  public/brand/bakamo-mark.png 512 x 512 (Organization logo in JSON-LD)

Usage:
  python3 scripts/generate-brand-icons.py
"""

from __future__ import annotations

import re
import ssl
import sys
import tempfile
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent

BACKGROUND = (0x0A, 0x0A, 0x0A)
GOLD = (0xC9, 0xA9, 0x6E)
GLYPH = "B"
FAMILY = "Cormorant Garamond"

# Draw large, then downsample, for clean anti-aliasing at every size.
SUPERSAMPLE = 8

# Share of the canvas height the glyph's ink occupies. Large icons keep a
# subtle inner margin; the tiny favicon frames fill more of the square so the
# letter stays legible in a browser tab.
LARGE_INK_RATIO = 0.62
SMALL_INK_RATIO = 0.78

# Heavier weight for the tiny frames so Cormorant's hairlines survive at 16 px.
LARGE_WEIGHT = 600
SMALL_WEIGHT = 700


def ssl_context() -> ssl.SSLContext:
    # python.org builds on macOS ship without system CA certificates; use
    # certifi's bundle when it is installed. Verification is never disabled.
    try:
        import certifi
    except ImportError:
        return ssl.create_default_context()
    return ssl.create_default_context(cafile=certifi.where())


def fetch(url: str) -> bytes:
    # A non-browser user agent makes Google Fonts serve TrueType rather than WOFF2.
    request = urllib.request.Request(url, headers={"User-Agent": "bakamo-brand-icons/1.0"})
    with urllib.request.urlopen(request, timeout=30, context=ssl_context()) as res:
        return res.read()


def download_font(weight: int, dest_dir: Path) -> Path:
    query = urllib.parse.urlencode({"family": f"{FAMILY}:wght@{weight}", "text": GLYPH})
    css = fetch(f"https://fonts.googleapis.com/css2?{query}").decode("utf-8")
    match = re.search(r"src:\s*url\(([^)]+)\)\s*format\(['\"](?:truetype|opentype)['\"]\)", css)
    if not match:
        raise RuntimeError(f"No TrueType source in Google Fonts response for weight {weight}")
    path = dest_dir / f"cormorant-garamond-{weight}.ttf"
    path.write_bytes(fetch(match.group(1)))
    return path


def render_mark(size: int, font_path: Path, ink_ratio: float) -> Image.Image:
    canvas = size * SUPERSAMPLE
    image = Image.new("RGB", (canvas, canvas), BACKGROUND)
    draw = ImageDraw.Draw(image)

    # Measure the glyph's ink at a reference size, then scale so its height
    # matches the target ratio exactly.
    reference = 1000
    left, top, right, bottom = draw.textbbox((0, 0), GLYPH, font=ImageFont.truetype(str(font_path), reference))
    font_size = round(reference * (canvas * ink_ratio) / (bottom - top))
    font = ImageFont.truetype(str(font_path), font_size)

    # Center the ink box, not the advance box.
    left, top, right, bottom = draw.textbbox((0, 0), GLYPH, font=font)
    x = (canvas - (right - left)) / 2 - left
    y = (canvas - (bottom - top)) / 2 - top
    draw.text((x, y), GLYPH, font=font, fill=GOLD)

    return image.resize((size, size), Image.Resampling.LANCZOS)


def main() -> int:
    app_dir = ROOT / "src" / "app"
    brand_dir = ROOT / "public" / "brand"
    brand_dir.mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory(prefix="bakamo-fonts-") as tmp:
        tmp_dir = Path(tmp)
        large_font = download_font(LARGE_WEIGHT, tmp_dir)
        small_font = download_font(SMALL_WEIGHT, tmp_dir)

        mark_512 = render_mark(512, large_font, LARGE_INK_RATIO)
        mark_512.save(app_dir / "icon.png", optimize=True)
        mark_512.save(brand_dir / "bakamo-mark.png", optimize=True)
        render_mark(180, large_font, LARGE_INK_RATIO).save(app_dir / "apple-icon.png", optimize=True)

        # ICO frames are stored as PNG; Next.js (Turbopack) only decodes RGBA ones.
        frames = [render_mark(size, small_font, SMALL_INK_RATIO).convert("RGBA") for size in (48, 32, 16)]
        frames[0].save(
            app_dir / "favicon.ico",
            format="ICO",
            sizes=[(16, 16), (32, 32), (48, 48)],
            append_images=frames[1:],
        )

    for path in (
        app_dir / "favicon.ico",
        app_dir / "icon.png",
        app_dir / "apple-icon.png",
        brand_dir / "bakamo-mark.png",
    ):
        print(f"wrote {path.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
