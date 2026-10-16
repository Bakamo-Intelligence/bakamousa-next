import type { Metadata } from "next";
import { connection } from "next/server";
import SocialTruthHome, { pickHeroVideo } from "@/components/SocialTruthHome";
import { HOME_FAQ_SCHEMA } from "@/lib/home-faq";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  // Opt this route into per-request rendering so each visit can get a different clip.
  await connection();
  const heroVideo = pickHeroVideo();

  return (
    <main className="relative w-full min-h-screen bg-near-black overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_FAQ_SCHEMA) }}
      />
      <SocialTruthHome heroVideo={heroVideo} />
    </main>
  );
}
