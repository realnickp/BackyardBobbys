import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SERVICE_CONTENT } from "@/lib/service-content";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Hardscaping Services in ${SITE.address.region}`,
  description:
    "Custom patios, walkways, retaining walls, fire pits, and outdoor kitchens built to last in Maryland's climate. Licensed hardscaping contractor serving Anne Arundel County.",
  alternates: { canonical: `${SITE.url}/services/hardscaping` },
  openGraph: { images: ["/og-image.png"] },
};

export default function HardscapingPage() {
  return <ServicePageTemplate {...SERVICE_CONTENT["hardscaping"]} />;
}
