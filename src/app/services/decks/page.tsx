import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SERVICE_CONTENT } from "@/lib/service-content";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Decks",
  description:
    "Custom deck building in Anne Arundel County, MD. Composite and wood decks designed for Maryland weather. Licensed contractor with free estimates—expand your outdoor living space today.",
  alternates: { canonical: `${SITE.url}/services/decks` },
  openGraph: { images: ["/og-image.png"] },
};

export default function DecksPage() {
  return <ServicePageTemplate {...SERVICE_CONTENT["decks"]} />;
}
