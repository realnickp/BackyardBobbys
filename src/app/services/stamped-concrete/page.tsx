import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { StampedConcreteStyles } from "@/components/shared/StampedConcreteStyles";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Stamped Concrete Services in ${SITE.address.region} | ${SITE.name}`,
  description:
    "Beautiful stamped concrete patios, walkways, and pool decks that mimic natural stone at a fraction of the cost. Licensed contractor serving Anne Arundel County, MD.",
  alternates: { canonical: `${SITE.url}/services/stamped-concrete` },
  openGraph: { images: ["/og-image.png"] },
};

export default function StampedConcretePage() {
  return (
    <ServicePageTemplate
      title="Stamped Concrete"
      slug="stamped-concrete"
      heroImage="/images/stamped-concrete-driveway-decorative-01.webp"
      heroAlt="Decorative stamped concrete driveway installed by Backyard Bobby's in Anne Arundel County Maryland"
      headline="Stamped Concrete Patios, Walkways & Pool Decks That Look Like Natural Stone"
      subheadline="Get the high-end look of flagstone, slate, or brick at a fraction of the cost — with a seamless, low-maintenance surface built to handle Maryland's toughest seasons."
      factNugget="Backyard Bobby's has poured stamped concrete patios, pool decks, and walkways across Annapolis, Severna Park, Crofton, Arnold, and throughout Anne Arundel County. Every pour uses air-entrained concrete with fiber reinforcement engineered for Maryland's freeze-thaw cycles, with patterns including Ashlar slate, random stone, cobblestone, and herringbone brick. Licensed MHIC #05-163777. Most projects finish in 1–2 days with a 25+ year lifespan; installed costs typically run 30–50% less than natural stone."
      serviceOffers={[
        { name: "Stamped Concrete Patio Installation", description: "Decorative stamped patios with integral color and custom patterns" },
        { name: "Stamped Concrete Walkways", description: "Front walkways and garden paths with natural stone patterns" },
        { name: "Stamped Concrete Pool Decks", description: "Non-slip stamped surfaces for pool surrounds with texture additives" },
        { name: "Stamped Concrete Driveway Aprons", description: "Decorative driveway entrances and apron transitions" },
        { name: "Concrete Resealing & Maintenance", description: "Periodic resealing to restore color and surface protection" },
      ]}
      intro={[
        "If you love the look of natural stone but not the price tag, stamped concrete is your answer. With dozens of patterns and color combinations available — from Ashlar slate to cobblestone to herringbone brick — stamped concrete gives you the rich, textured appearance of premium materials at 30–50% less cost. And unlike individual pavers that can shift and grow weeds between joints, stamped concrete is a single monolithic slab that stays locked in place.",
        "Backyard Bobby's has been pouring and stamping decorative concrete across Anne Arundel County for years. We've installed stamped patios in Annapolis, pool decks in Severna Park, and walkways in Crofton — each one custom-designed with patterns and integral colors chosen to complement the homeowner's property. Our finishing techniques create surfaces that guests genuinely can't tell apart from real stone.",
        "The key to stamped concrete that lasts in Maryland's climate is in the details that most contractors rush through: proper sub-base preparation, the right concrete mix design for our freeze-thaw cycles, precise timing on the stamp application, and a professional-grade sealer that protects color and resists moisture penetration. That's what you get with Backyard Bobby's.",
      ]}
      benefits={[
        {
          title: "High-End Look at 30–50% Less Cost",
          description:
            "Stamped concrete replicates the appearance of flagstone, slate, brick, or cobblestone without the premium price. You get the aesthetic upgrade your yard deserves without blowing your budget.",
        },
        {
          title: "Virtually Zero Joint Maintenance",
          description:
            "Unlike pavers with sand joints that grow weeds and wash out, stamped concrete is a continuous surface. No re-sanding, no ant hills, no weeds pushing through — just periodic resealing every 2–3 years.",
        },
        {
          title: "Unlimited Pattern & Color Combinations",
          description:
            "Choose from Ashlar slate, random stone, wood plank, herringbone brick, and more. We offer integral colors, surface-applied hardeners, and accent release colors for a fully custom look.",
        },
        {
          title: "Designed for Maryland Freeze-Thaw",
          description:
            "We use air-entrained concrete mixes specifically designed to resist freeze-thaw damage, with fiber reinforcement and control joints placed strategically to prevent unsightly cracking.",
        },
        {
          title: "Perfect for Patios, Pool Decks & Walkways",
          description:
            "Stamped concrete works beautifully for large patio areas, pool surrounds (with non-slip texture options), front walkways, and driveway aprons. One material, one seamless look.",
        },
        {
          title: "Fast Installation, Long Lifespan",
          description:
            "Most stamped concrete projects are poured and finished in 1–2 days. With proper installation and sealing, your surface will look great for 25+ years with minimal upkeep.",
        },
      ]}
      process={[
        {
          step: 1,
          title: "Design & Color Selection",
          description:
            "We visit your property to discuss layout, review stamp pattern samples and color charts in your actual outdoor lighting, and help you choose combinations that complement your home's exterior. You'll know exactly what your finished surface will look like before we start.",
        },
        {
          step: 2,
          title: "Site Prep & Forming",
          description:
            "We excavate to the required depth, compact the sub-base, install forms at the correct grade for drainage, and place rebar or wire mesh reinforcement. Control joints are planned in advance to keep any natural cracking hidden in the pattern lines.",
        },
        {
          step: 3,
          title: "Pour, Stamp & Color",
          description:
            "We pour air-entrained concrete with integral color, apply a color hardener for depth and durability, broadcast the release agent, and hand-press stamp mats into the surface while the concrete is at the ideal consistency. Timing is everything — this is where experience matters most.",
        },
        {
          step: 4,
          title: "Cure & Seal",
          description:
            "After proper curing time, we wash the surface to reveal the final color contrast, apply a high-quality acrylic or polyurethane sealer for UV protection and moisture resistance, and do a final walkthrough with you to make sure every detail is right.",
        },
      ]}
      faqs={[
        {
          question: "How does stamped concrete compare to pavers in terms of cost?",
          answer:
            "Stamped concrete typically costs $12–$22 per square foot installed, while paver patios run $15–$30+ per square foot. For larger areas, the savings with stamped concrete can be significant — a 400-square-foot patio could save you $2,000–$4,000 compared to a comparable paver installation.",
        },
        {
          question: "Will stamped concrete crack in Maryland winters?",
          answer:
            "All concrete can develop hairline cracks over time, but we minimize this risk with air-entrained concrete mixes designed for freeze-thaw, fiber mesh reinforcement, and strategically placed control joints that are hidden within the stamp pattern. Properly installed stamped concrete holds up extremely well in Maryland's climate.",
        },
        {
          question: "How often does stamped concrete need to be resealed?",
          answer:
            "We recommend resealing every 2–3 years to maintain the color vibrancy and surface protection. It's a straightforward process — a good cleaning followed by a fresh coat of sealer — and we're happy to do it for you or show you how to handle it yourself.",
        },
        {
          question: "Can stamped concrete be slippery when wet?",
          answer:
            "The stamped texture itself provides good traction, but sealed surfaces can be slick when wet. For pool decks and high-traffic walkways, we add a non-slip additive to the sealer that provides grip without changing the appearance. This is standard on all our pool deck projects.",
        },
        {
          question: "What patterns are most popular in Anne Arundel County?",
          answer:
            "Ashlar slate and random stone patterns are our most requested — they pair beautifully with both colonial and modern-style homes common in Annapolis, Severna Park, and Arnold. For a more traditional look, running bond brick and cobblestone are popular choices. We bring physical samples to your consultation so you can see and feel the texture.",
        },
        {
          question: "Can you add stamped concrete around my existing pool or patio?",
          answer:
            "Yes, we do this regularly. We can pour stamped concrete up to the edge of existing structures, including pools, existing patios, and house foundations. Color matching to adjacent concrete requires skill, and we use techniques to blend new work seamlessly with what's already there.",
        },
      ]}
      relatedServices={[
        { title: "Hardscaping", slug: "hardscaping" },
        { title: "Driveway Installation", slug: "driveway-installation" },
        { title: "Gravel Pads & Concrete Foundations", slug: "gravel-pads-and-concrete-foundations" },
        { title: "Decks", slug: "decks" },
      ]}
      galleryCategory="Stamped Concrete"
    >
      <StampedConcreteStyles />
    </ServicePageTemplate>
  );
}
