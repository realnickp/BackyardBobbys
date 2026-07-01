import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SERVICE_CONTENT } from "@/lib/service-content";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Driveway Installation",
  description:
    "Professional driveway installation in Anne Arundel County, MD. Asphalt, concrete, and paver driveways built with proper base prep to handle Maryland freeze-thaw cycles. Free estimates.",
  alternates: { canonical: `${SITE.url}/services/driveway-installation` },
  openGraph: { images: ["/og-image.png"] },
};

export default function DrivewayInstallationPage() {
  return <ServicePageTemplate {...SERVICE_CONTENT["driveway-installation"]} />;
}
