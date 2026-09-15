import { OG_CONTENT_TYPE, OG_SIZE, ogImageAlt, renderOgImage } from "@/lib/og-image";

const content = {
  title: "Insights",
  descriptor: "Methodology deep-dives and cultural analysis from the Bakamo team",
};

export const alt = ogImageAlt(content);
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage(content);
}
