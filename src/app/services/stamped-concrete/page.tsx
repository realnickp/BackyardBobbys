import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { StampedConcreteStyles } from "@/components/shared/StampedConcreteStyles";
import { SERVICE_CONTENT } from "@/lib/service-content";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Stamped Concrete Services in ${SITE.address.region}`,
  description:
    "Beautiful stamped concrete patios, walkways, and pool decks that mimic natural stone at a fraction of the cost. Licensed contractor serving Anne Arundel County, MD.",
  alternates: { canonical: `${SITE.url}/services/stamped-concrete` },
  openGraph: { images: ["/og-image.png"] },
};

export default function StampedConcretePage() {
  return (
    <ServicePageTemplate {...SERVICE_CONTENT["stamped-concrete"]}>
      <StampedConcreteStyles />
    </ServicePageTemplate>
  );
}
