import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Fencing Installation & Repair | ${SITE.name}`,
  description: `Professional fence installation in ${SITE.address.region}, MD. Wood, vinyl, aluminum, and chain link fencing. HOA compliant. Free estimates from ${SITE.name}.`,
  alternates: { canonical: `${SITE.url}/services/fencing` },
};

export default function FencingPage() {
  return (
    <ServicePageTemplate
      title="Fencing"
      slug="fencing"
      heroImage="/images/service-fencing.png"
      heroAlt="Wood privacy fence installation in a Maryland residential backyard"
      headline="Privacy, Security & Style — Built to Last"
      subheadline="From classic wood privacy fences to low-maintenance vinyl and sleek aluminum, we install fencing that protects your family, defines your property, and looks great for years."
      factNugget="Backyard Bobby's sets every fence post 30–36 inches deep with concrete footings — below Maryland's frost line — using corrosion-resistant fasteners rated for the Chesapeake Bay region's humidity. Licensed MHIC #05-163777, serving Annapolis, Severna Park, Edgewater, and 16 other Anne Arundel County communities. Most residential fences install in 2–4 days; pricing varies by material starting around $20 per linear foot."
      serviceOffers={[
        { name: "Wood Privacy Fence Installation", description: "Pressure-treated pine and cedar privacy fences with custom gate options" },
        { name: "Vinyl Fence Installation", description: "Low-maintenance vinyl privacy and semi-privacy fencing" },
        { name: "Aluminum Fence Installation", description: "Decorative aluminum fencing for pools, front yards, and property perimeters" },
        { name: "Chain Link Fence Installation", description: "Galvanized and vinyl-coated chain link for utility and pet containment" },
        { name: "Custom Gate Building", description: "Single walk gates, double drive gates, and custom entry gates with quality hardware" },
      ]}
      intro={[
        "A well-built fence does more than mark your property line. It gives your kids and pets a safe place to play, creates the private outdoor space you've been wanting, and can add real value to your home. In Anne Arundel County — where neighborhoods range from waterfront properties in Edgewater to established communities in Severna Park — the right fence makes all the difference.",
        "Backyard Bobby's installs wood, vinyl, aluminum, and chain link fencing tailored to your needs, your neighborhood, and your budget. We know which materials hold up best in Maryland's humid summers and icy winters, and we stay current on local HOA requirements and county setback regulations so your fence passes inspection the first time.",
        "Whether you're enclosing a backyard for your dog, adding curb appeal with a decorative aluminum fence, or building a 6-foot privacy wall between you and your neighbors, we'll handle it from the first post to the final gate latch.",
      ]}
      benefits={[
        {
          title: "Material Options for Every Budget",
          description:
            "We install pressure-treated wood, cedar, vinyl, aluminum, and chain link fencing. We'll walk you through the pros and cons of each — durability, maintenance, appearance, and cost — so you pick the right fit.",
        },
        {
          title: "HOA & Code Compliant",
          description:
            "Many Anne Arundel County neighborhoods have strict HOA rules on fence height, style, and color. We check your community's covenants before we build and make sure every detail meets requirements.",
        },
        {
          title: "Built for Maryland Weather",
          description:
            "Humidity, rain, snow, and wind take a toll on cheap fencing. We use corrosion-resistant fasteners, pressure-treated or rot-resistant materials, and proper post depth to ensure your fence holds up season after season.",
        },
        {
          title: "Accurate Property Line Placement",
          description:
            "Fence disputes with neighbors are stressful and expensive. We work from your property survey or help coordinate one to ensure your fence sits exactly where it should — no encroachment, no surprises.",
        },
        {
          title: "Custom Gates & Hardware",
          description:
            "Every fence needs at least one great gate. We build single walk gates, double drive gates, and custom entries with quality hardware that latches securely and swings smoothly for years.",
        },
        {
          title: "Pet & Child Safety Focus",
          description:
            "If keeping pets or children safely contained is your priority, we design with that in mind — no gaps at the bottom, secure latches kids can't reach, and materials that won't splinter or warp.",
        },
      ]}
      process={[
        {
          step: 1,
          title: "Property Survey & Fence Design",
          description:
            "We visit your property, review your survey or plat, measure the fence line, and discuss your goals — privacy, pet containment, decoration, or all three. We'll map out gate locations, identify slope challenges, and flag any underground utilities or HOA restrictions before design is finalized.",
        },
        {
          step: 2,
          title: "Material Selection & Ordering",
          description:
            "Based on your design, budget, and aesthetic preferences, we help you choose the ideal material — wood for a classic look, vinyl for zero maintenance, aluminum for elegance, or chain link for utility. We source quality materials and schedule your install date.",
        },
        {
          step: 3,
          title: "Post Setting & Panel Installation",
          description:
            "We dig post holes to the proper depth for your soil type (deeper in sandy areas, with concrete footings in clay), set posts plumb and level, and install rails and panels. Every section is checked for alignment and consistent spacing before we move on.",
        },
        {
          step: 4,
          title: "Gate Fitting & Final Walkthrough",
          description:
            "Gates are hung, leveled, and fitted with quality latches and hinges. We walk the entire fence line with you to confirm everything meets your expectations — straight lines, secure posts, smooth gates, and a clean job site with all debris removed.",
        },
      ]}
      faqs={[
        {
          question: "What type of fence is best for privacy in Maryland?",
          answer:
            "A 6-foot solid board wood fence (pressure-treated pine or cedar) or a vinyl privacy fence are the two most popular options. Wood gives you a classic, natural look and can be stained any color. Vinyl costs more upfront but requires virtually no maintenance and won't rot or warp. We install both and can help you weigh the trade-offs.",
        },
        {
          question: "Do I need a permit to install a fence in Anne Arundel County?",
          answer:
            "Anne Arundel County generally does not require a permit for residential fences under 6.5 feet tall, but you do need to comply with setback rules and sight-line requirements near driveways and intersections. If you have an HOA, their approval is usually required before installation. We handle all of this during the planning phase.",
        },
        {
          question: "How long does a fence installation take?",
          answer:
            "A typical residential fence (100–200 linear feet) takes 2 to 4 days from the first post hole to the last gate latch. Larger properties, difficult terrain, or custom designs may take a bit longer. We'll give you a specific timeline in your estimate.",
        },
        {
          question: "How deep do fence posts need to be?",
          answer:
            "We typically set posts 30 to 36 inches deep with concrete footings, which gets below the frost line in Maryland. In sandier soil near the Chesapeake, we may go deeper or use larger footings for stability. Proper post depth is the single biggest factor in how long your fence lasts.",
        },
        {
          question: "Will my fence hold up in Maryland's humidity and storms?",
          answer:
            "It will if it's built right. We use pressure-treated lumber rated for ground contact, stainless or hot-dipped galvanized fasteners, and proper post-setting techniques. For vinyl and aluminum, we select products rated for high-wind zones. Our fences are built to handle Maryland's worst.",
        },
        {
          question: "Can you install a fence on a sloped yard?",
          answer:
            "Yes — sloped installations are common in Anne Arundel County. We use either a stepped (stair-step) method or a racked (contour-following) method depending on the grade and the fence style. We'll recommend the best approach during your estimate based on how your yard slopes.",
        },
      ]}
      relatedServices={[
        { title: "Decks", slug: "decks" },
        { title: "Hardscaping", slug: "hardscaping" },
        { title: "Excavation & Demolition", slug: "excavation-and-demolition" },
      ]}
      galleryCategory="Fencing"
    />
  );
}
