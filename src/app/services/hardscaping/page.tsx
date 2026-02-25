import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Hardscaping Services in ${SITE.address.region} | ${SITE.name}`,
  description:
    "Custom patios, walkways, retaining walls, fire pits, and outdoor kitchens built to last in Maryland's climate. Licensed hardscaping contractor serving Anne Arundel County.",
  alternates: { canonical: `${SITE.url}/services/hardscaping` },
  openGraph: { images: ["/og-image.png"] },
};

export default function HardscapingPage() {
  return (
    <ServicePageTemplate
      title="Hardscaping"
      slug="hardscaping"
      heroImage="/images/paver-walkway-interlocking-bricks-01.jpeg"
      heroAlt="Paver walkway and hardscaping built by Backyard Bobby's in Anne Arundel County"
      headline="Patios, Walkways & Retaining Walls That Transform Your Outdoor Space"
      subheadline="From elegant paver patios to functional retaining walls, we design and build hardscaping that handles Maryland weather and makes your backyard the best room in the house."
      factNugget="Backyard Bobby's has completed hardscaping projects across Annapolis, Severna Park, Arnold, and 16 other Anne Arundel County communities. Every patio and walkway is built on 6–8 inches of compacted aggregate base engineered for Maryland's clay soil and freeze-thaw cycles. Licensed MHIC #05-163777. Most residential patios take 5–10 working days; installed costs range from $15–$50 per square foot depending on material."
      serviceOffers={[
        { name: "Paver Patio Installation", description: "Custom concrete paver patios with compacted aggregate base and polymeric sand joints" },
        { name: "Natural Stone Walkways", description: "Flagstone, bluestone, and travertine walkway installation" },
        { name: "Retaining Wall Construction", description: "Structural and decorative retaining walls using segmental block, natural stone, or poured concrete" },
        { name: "Outdoor Kitchen Hardscaping", description: "Built-in grill islands, countertops, and bar areas with durable stone or paver surfaces" },
        { name: "Fire Pit Installation", description: "Wood-burning and gas fire pits with surrounding paver or stone patio" },
      ]}
      intro={[
        "Your backyard should be more than just grass and a garden hose. A well-designed hardscape turns wasted yard space into an outdoor living area you'll actually use — for morning coffee, weekend cookouts, or just unwinding after a long day. At Backyard Bobby's, we specialize in building patios, walkways, retaining walls, outdoor kitchens, and fire pits that look stunning and stand up to everything Anne Arundel County's climate throws at them.",
        "Maryland's freeze-thaw cycles, clay-heavy soils, and summer downpours demand more than a quick paver job. We engineer every project with proper excavation depth, compacted aggregate bases, and drainage solutions designed specifically for local soil conditions. That's the difference between a patio that shifts and cracks in two years and one that looks perfect a decade later.",
        "Whether you're envisioning a natural stone walkway to your front door, a multi-level paver patio with a built-in fire pit, or a retaining wall that tames a sloped yard and adds usable square footage, we handle the entire project in-house — from design through final installation. No subcontractors, no runaround.",
      ]}
      benefits={[
        {
          title: "Engineered for Maryland Soil & Climate",
          description:
            "We account for Anne Arundel County's clay soils, freeze-thaw cycles, and heavy rainfall with proper base depth, drainage, and joint sand — so your hardscape doesn't shift, settle, or crack.",
        },
        {
          title: "Serious Return on Investment",
          description:
            "A professionally installed patio or outdoor kitchen can recoup 50–80% of its cost at resale. More importantly, you get an outdoor living space your family will use every season.",
        },
        {
          title: "Endless Material & Design Options",
          description:
            "Choose from concrete pavers, natural flagstone, bluestone, travertine, or tumbled brick. We'll help you pick materials and patterns that complement your home's architecture.",
        },
        {
          title: "Complete In-House Crew",
          description:
            "Our own team handles excavation, grading, base work, and paver installation. No subcontractors means better communication, consistent quality, and fewer delays.",
        },
        {
          title: "Built-In Drainage Solutions",
          description:
            "We integrate proper slope, channel drains, and permeable paver options so water moves away from your foundation — not toward it.",
        },
        {
          title: "Licensed, Insured & MHIC Certified",
          description:
            "We carry full liability coverage and our MHIC license means your project is protected by Maryland's Home Improvement Guaranty Fund.",
        },
      ]}
      process={[
        {
          step: 1,
          title: "Design & Layout Planning",
          description:
            "We meet at your property to discuss your vision, measure the space, evaluate slope and soil conditions, and mark the layout with stakes and string so you can see the final footprint before we break ground.",
        },
        {
          step: 2,
          title: "Site Prep & Excavation",
          description:
            "Our crew excavates to the proper depth based on your soil type, removes organic material, and establishes precise grade for drainage. For retaining walls, we dig below the frost line to prevent heaving.",
        },
        {
          step: 3,
          title: "Base Installation & Leveling",
          description:
            "We install layers of compacted aggregate base and leveling sand, checking grade at every stage with laser levels. This hidden foundation is what separates a 20-year patio from a 2-year one.",
        },
        {
          step: 4,
          title: "Paver/Stone Setting & Finishing",
          description:
            "Pavers or natural stone are hand-set in your chosen pattern, cut precisely at edges, and locked in with polymeric joint sand. We finish with edge restraints and a final compaction pass for a rock-solid surface.",
        },
      ]}
      faqs={[
        {
          question: "How long does a typical patio installation take in Anne Arundel County?",
          answer:
            "Most residential patio projects take 5–10 working days depending on size and complexity. A simple 200-square-foot patio might be done in a week, while a multi-level design with a fire pit or outdoor kitchen could take two weeks. Weather and permit timelines can also factor in.",
        },
        {
          question: "Will pavers shift or crack with Maryland's freeze-thaw cycles?",
          answer:
            "Not when installed correctly. We excavate to the proper depth for Anne Arundel County's clay soil, install 6–8 inches of compacted aggregate base, and use polymeric sand in the joints. Pavers are actually more freeze-thaw resistant than poured concrete because the joints allow slight flex without cracking.",
        },
        {
          question: "What's the difference between pavers and natural stone?",
          answer:
            "Concrete pavers are manufactured, consistent in size, and available in a huge range of colors and patterns — they're typically more budget-friendly. Natural stone (flagstone, bluestone, travertine) offers a unique, high-end look but costs more and requires more skilled installation. We work with both and can help you decide based on your budget and aesthetic goals.",
        },
        {
          question: "Do I need a permit for a patio or retaining wall in Anne Arundel County?",
          answer:
            "Patios at ground level generally don't require a permit, but retaining walls over 4 feet tall and any project near the Critical Area (within 1,000 feet of the Chesapeake Bay or its tributaries) typically do. We handle all permit applications and know the county requirements inside and out.",
        },
        {
          question: "How much does hardscaping cost per square foot?",
          answer:
            "Paver patios typically range from $15–$30 per square foot installed, depending on the material and design complexity. Natural stone runs $25–$50+. Retaining walls are priced per square face foot and range from $25–$60 depending on material. We provide detailed, itemized estimates so you know exactly where every dollar goes.",
        },
        {
          question: "Can you build a patio on a sloped yard?",
          answer:
            "Absolutely — that's one of our specialties. We use retaining walls, terraced levels, and proper grading to create flat, usable patio spaces on sloped properties. Many of our best projects in Severna Park and Arnold involve working with the natural grade to create multi-level outdoor living areas.",
        },
      ]}
      relatedServices={[
        { title: "Stamped Concrete", slug: "stamped-concrete" },
        { title: "Decks", slug: "decks" },
        { title: "Fencing", slug: "fencing" },
        { title: "Excavation & Demolition", slug: "excavation-and-demolition" },
      ]}
      galleryCategory="Hardscaping"
    />
  );
}
