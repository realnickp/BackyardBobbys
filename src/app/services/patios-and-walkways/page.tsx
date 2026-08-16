import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SERVICE_CONTENT } from "@/lib/service-content";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Patio & Walkway Installation in ${SITE.address.region}`,
  description:
    "Custom patios, walkways, and pool decks in every style — broom-finished concrete, stamped patterns, and pavers. Licensed contractor serving Anne Arundel County, MD.",
  alternates: { canonical: `${SITE.url}/services/patios-and-walkways` },
  openGraph: { images: ["/og-image.png"] },
};

export default function PatiosAndWalkwaysPage() {
  return <ServicePageTemplate {...SERVICE_CONTENT["patios-and-walkways"]} />;
}
