import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SERVICE_CONTENT } from "@/lib/service-content";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Gravel Pads & Concrete Foundations",
  description: `Professional gravel pads and concrete foundations for sheds, garages, hot tubs, and outdoor structures in ${SITE.address.region}, MD. Free estimates from ${SITE.name}.`,
  alternates: { canonical: `${SITE.url}/services/gravel-pads-and-concrete-foundations` },
  openGraph: { images: ["/og-image.png"] },
};

export default function GravelPadsAndConcreteFoundationsPage() {
  return <ServicePageTemplate {...SERVICE_CONTENT["gravel-pads-and-concrete-foundations"]} />;
}
