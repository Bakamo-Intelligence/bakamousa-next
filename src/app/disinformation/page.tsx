import type { Metadata } from "next";
import SectorPage from "@/components/SectorPage";
import { getSector } from "@/lib/sectors";
import { pageOpenGraph } from "@/lib/seo";

const sector = getSector("disinformation");

export const metadata: Metadata = {
  title: sector.metaTitle,
  description: sector.description,
  alternates: {
    canonical: sector.path,
  },
  openGraph: pageOpenGraph(sector.path, `${sector.metaTitle} | Bakamo`, sector.description),
};

export default function DisinformationPage() {
  return <SectorPage sector={sector} />;
}
