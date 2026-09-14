import { getSiteUrl } from "@/lib/site-url";
import SocialTruthHome, { pickHeroVideo } from "@/components/SocialTruthHome";

function buildServiceSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Bakamo",
    url: siteUrl,
    description:
      "Bakamo surfaces Social Truth, then builds the quantitative instruments that measure it.",
    serviceType: "Consumer Intelligence & Cultural Research",
    areaServed: { "@type": "Country", name: "United States" },
  };
}

export default async function Home() {
  const siteUrl = await getSiteUrl();
  const SERVICE_SCHEMA = buildServiceSchema(siteUrl);
  // the home route renders per request, so each visit can get a different clip
  const heroVideo = pickHeroVideo();

  return (
    <main className="relative w-full min-h-screen bg-near-black overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
      />
      <SocialTruthHome heroVideo={heroVideo} />
    </main>
  );
}
