import type { Metadata } from "next";
import { connection } from "next/server";
import SocialTruthHome, { pickHeroVideo } from "@/components/SocialTruthHome";

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
      <SocialTruthHome heroVideo={heroVideo} />
    </main>
  );
}
