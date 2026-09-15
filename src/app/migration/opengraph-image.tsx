import { OG_CONTENT_TYPE, OG_SIZE, ogImageAlt, renderOgImage } from "@/lib/og-image";

const content = {
  title: "Migration Research",
  descriptor: "A decade of reading how Europeans talk about migration",
};

export const alt = ogImageAlt(content);
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage(content);
}
