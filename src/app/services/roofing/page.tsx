import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roofing Services in ${SITE.address.region} | ${SITE.name}`,
  description:
    "Expert roof repairs, replacements, and storm damage restoration for Anne Arundel County homeowners. Licensed Maryland roofing contractor with warranty-backed installations.",
  alternates: { canonical: `${SITE.url}/services/roofing` },
  openGraph: { images: ["/og-image.png"] },
};

export default function RoofingPage() {
  return (
    <ServicePageTemplate
      title="Roofing"
      slug="roofing"
      heroImage="/images/roof-architectural-shingles-colonial.jpg"
      heroAlt="Professional roofing installation on a residential home in Anne Arundel County Maryland"
      headline="Reliable Roof Repairs & Replacements for Anne Arundel County Homes"
      subheadline="From storm damage repairs to full roof replacements, we protect your biggest investment with quality materials, expert installation, and warranties you can count on."
      factNugget="Backyard Bobby's is a local, licensed roofing contractor (MHIC #05-163777) that has repaired and replaced roofs across Annapolis, Severna Park, Pasadena, Crofton, and surrounding Anne Arundel County communities. We install GAF, CertainTeed, and Owens Corning shingle systems with ice and water shield, proper ridge ventilation, and manufacturer warranties up to 50 years. Most replacements are completed in 1–3 days, and we handle insurance claim documentation for storm damage."
      serviceOffers={[
        { name: "Roof Replacement", description: "Full tear-off and re-roof with architectural or impact-resistant shingles" },
        { name: "Roof Repair", description: "Targeted repair of missing shingles, flashing, pipe boots, and leak points" },
        { name: "Storm Damage Restoration", description: "Insurance-documented storm damage repair with adjuster coordination" },
        { name: "Attic Ventilation Improvement", description: "Ridge vent, soffit vent, and baffle installation to prevent ice dams and reduce cooling costs" },
      ]}
      intro={[
        "Your roof takes the worst of what Maryland dishes out — nor'easters, summer thunderstorms, ice dams, UV exposure, and humidity that accelerates wear on shingles and flashing. When your roof starts showing its age or takes a hit from a storm, you need a contractor who understands the specific challenges Anne Arundel County homes face, not a fly-by-night crew chasing storm work from out of state.",
        "Backyard Bobby's is a local, licensed roofing contractor that lives and works right here in Anne Arundel County. We've repaired and replaced roofs across Annapolis, Severna Park, Pasadena, Crofton, and surrounding communities. We know which shingle systems hold up best against the Chesapeake Bay's coastal humidity, how to properly ventilate attics to prevent ice damming, and how to navigate your insurance claim if storm damage is involved.",
        "Whether you need a few missing shingles replaced after a wind event, a full tear-off and re-roof with architectural shingles, or a proactive upgrade to improve your home's energy efficiency, we deliver honest assessments, transparent pricing, and workmanship that's backed by both manufacturer and labor warranties.",
      ]}
      benefits={[
        {
          title: "Local Storm Damage Expertise",
          description:
            "We know how Maryland storms damage roofs — from wind-lifted shingles to hail bruising. We document everything properly to support your insurance claim and get the work approved fast.",
        },
        {
          title: "Premium Material Options",
          description:
            "We install GAF, CertainTeed, and Owens Corning shingle systems — including architectural and impact-resistant lines. We'll help you choose the right product for your budget and performance needs.",
        },
        {
          title: "Proper Ventilation & Ice Dam Prevention",
          description:
            "We assess and correct attic ventilation as part of every roof replacement, reducing ice dam risk in winter and cutting cooling costs in summer — a critical detail many roofers skip.",
        },
        {
          title: "Manufacturer & Labor Warranties",
          description:
            "Our installations qualify for manufacturer warranties up to 50 years on materials, and we back our labor with our own warranty. Your roof is protected long after we leave.",
        },
        {
          title: "Clean, Respectful Job Sites",
          description:
            "We use tarps and magnetic nail sweepers to protect your landscaping, siding, and driveway. Your property looks as good when we leave as it did when we arrived — minus the old roof.",
        },
        {
          title: "MHIC Licensed & Fully Insured",
          description:
            "We carry general liability and workers' comp so you're never at risk. Our MHIC license means your project is backed by Maryland's consumer protection guaranty fund.",
        },
      ]}
      process={[
        {
          step: 1,
          title: "Roof Inspection & Assessment",
          description:
            "We perform a thorough inspection of your roof, attic, and ventilation system — checking for damaged shingles, deteriorated flashing, soft decking, and signs of leaks. You get a written report with photos documenting every issue.",
        },
        {
          step: 2,
          title: "Estimate & Material Selection",
          description:
            "Based on the inspection, we provide a detailed estimate covering materials, labor, and any structural repairs. We walk you through shingle options, color choices, and warranty tiers so you can make an informed decision.",
        },
        {
          step: 3,
          title: "Tear-Off & Installation",
          description:
            "We strip the old roofing down to the deck, replace any damaged plywood or OSB, install ice and water shield in valleys and eaves, and lay your new shingle system with proper starter strips, flashing, and ridge ventilation.",
        },
        {
          step: 4,
          title: "Final Inspection & Warranty",
          description:
            "After installation, we do a complete walk-around and attic check to verify every detail. We clean up all debris, run magnetic nail sweeps, and provide your warranty documentation along with maintenance recommendations.",
        },
      ]}
      faqs={[
        {
          question: "How do I know if my roof needs repair or a full replacement?",
          answer:
            "As a rule of thumb, if your roof is under 15 years old and the damage is localized (a few missing shingles, a small leak around a pipe boot), a repair is usually the right call. If your roof is 20+ years old, has widespread granule loss, curling shingles, or multiple leak points, a full replacement is almost always more cost-effective than patching. We'll give you an honest recommendation either way.",
        },
        {
          question: "Will you work with my insurance company on a storm damage claim?",
          answer:
            "Yes. We document all storm damage with photos and detailed reports, meet with your insurance adjuster on-site if needed, and provide a scope of work that aligns with what your policy covers. We've helped dozens of Anne Arundel County homeowners navigate the claims process smoothly.",
        },
        {
          question: "How long does a roof replacement take?",
          answer:
            "Most residential roof replacements are completed in 1–3 days depending on the size of the home, weather conditions, and whether any decking needs to be replaced. We never leave your home exposed overnight — if we start a tear-off, we finish or secure the area with tarps before we leave.",
        },
        {
          question: "What type of shingles do you recommend for homes near the Chesapeake Bay?",
          answer:
            "For coastal Anne Arundel County homes, we typically recommend architectural shingles rated for 130+ mph winds with algae-resistant granules to combat the humidity. GAF Timberline HDZ and CertainTeed Landmark are two of our go-to products. For areas prone to hail, we can upgrade to impact-resistant Class 4 shingles.",
        },
        {
          question: "Do I need a permit for a roof replacement in Anne Arundel County?",
          answer:
            "Yes — Anne Arundel County requires a building permit for roof replacements. We handle the entire permit process for you, including the application and the required final inspection. This is included in our estimate at no extra charge.",
        },
        {
          question: "How much does a new roof cost in Maryland?",
          answer:
            "A typical asphalt shingle roof replacement for an average-sized home in Anne Arundel County ranges from $8,000–$15,000 depending on roof size, pitch, accessibility, material choice, and whether any decking or structural repairs are needed. We provide itemized estimates so you see exactly what you're paying for.",
        },
      ]}
      relatedServices={[
        { title: "Accessory Dwelling Units", slug: "accessory-dwelling-units" },
        { title: "Decks", slug: "decks" },
      ]}
      galleryCategory="Roofing"
    />
  );
}
