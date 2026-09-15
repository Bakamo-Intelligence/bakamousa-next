import { OG_CONTENT_TYPE, OG_SIZE, ogImageAlt, renderOgImage } from "@/lib/og-image";

const content = {
  title: "Hungarian Election Psychographic Analysis",
  descriptor: "Semantic analysis of Hungarian social media conversations",
};

export const alt = ogImageAlt(content);
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage(content);
}
