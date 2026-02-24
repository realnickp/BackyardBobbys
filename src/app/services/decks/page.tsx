import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Decks | ${SITE.name}`,
  description:
    "Custom deck building in Anne Arundel County, MD. Composite and wood decks designed for Maryland weather. Licensed contractor with free estimates—expand your outdoor living space today.",
  alternates: { canonical: `${SITE.url}/services/decks` },
};

export default function DecksPage() {
  return (
    <ServicePageTemplate
      title="Decks"
      slug="decks"
      heroImage="/images/wood-deck-construction-01.webp"
      heroAlt="Custom wood deck with railing built by Backyard Bobby's in Anne Arundel County"
      headline="Custom Decks That Turn Your Backyard Into a Destination"
      subheadline="From intimate elevated platforms to full outdoor living spaces with built-in seating, we design and build decks that stand up to Maryland's humidity, rain, and snow—and make your neighbors jealous."
      factNugget="Backyard Bobby's builds custom decks across 19 Anne Arundel County communities using stainless steel fasteners and pressure-treated framing rated for ground contact — materials chosen specifically for the Chesapeake Bay region's humidity and salt air. Licensed MHIC #05-163777, with all county permits and inspections handled in-house. A typical 350 sq ft deck takes 1–2 weeks to build; installed costs range from $30–$75 per square foot depending on material."
      serviceOffers={[
        { name: "Composite Deck Building", description: "Trex, TimberTech, and Azek composite deck construction with manufacturer warranty" },
        { name: "Pressure-Treated Wood Decks", description: "Traditional wood deck building with pressure-treated pine or cedar" },
        { name: "Multi-Level Deck Design", description: "Custom multi-level and wraparound deck layouts with built-in seating and planters" },
        { name: "Deck Board Replacement", description: "Re-decking with new boards on structurally sound existing frames" },
        { name: "Pergola & Shade Structure Integration", description: "Pergolas and shade structures built into new or existing deck designs" },
      ]}
      intro={[
        "A great deck changes how you use your home. It's where Saturday morning coffee happens, where the grill lives from April through October, and where your kids actually want to hang out instead of staring at screens. In Anne Arundel County, where the weather gives you a solid eight months of outdoor living, a well-built deck is one of the highest-return improvements you can make—both in daily enjoyment and at resale. Remodeling Magazine's Cost vs. Value report consistently ranks deck additions among the top ROI projects nationwide.",
        "At Backyard Bobby's, we build decks that are engineered for the Chesapeake Bay region. That means pressure-treated framing rated for ground contact, stainless steel fasteners that won't streak, and decking materials chosen specifically for Maryland's humidity and UV exposure. Whether you want the warmth of natural hardwood, the low maintenance of composite, or the premium feel of capped PVC, we'll help you pick the right material and design a layout that fits your house, your yard, and how you actually live.",
        "We handle everything from the initial design through county permits, construction, and final inspection. Our builds meet or exceed Anne Arundel County's structural and safety codes, and we stand behind our work. If you're ready to stop looking at your backyard and start living in it, let's talk.",
      ]}
      benefits={[
        {
          title: "Built for Maryland Weather",
          description:
            "We use materials and fasteners rated for the Chesapeake Bay climate—high humidity, heavy rain, freeze-thaw cycles, and intense summer UV. Your deck won't warp, rot, or fade like the bargain builds you see falling apart after three years.",
        },
        {
          title: "Composite & Wood Options",
          description:
            "Choose from Trex, TimberTech, or Azek composites for near-zero maintenance, or go with pressure-treated pine, cedar, or ipe hardwood for a natural look. We'll lay out the cost, lifespan, and upkeep differences so you make an informed choice.",
        },
        {
          title: "Custom Designs, Not Cookie-Cutters",
          description:
            "Multi-level layouts, wraparound designs, built-in benches, planter boxes, pergola integration, and cable railing—we design around your home's architecture and your family's lifestyle, not a one-size-fits-all template.",
        },
        {
          title: "Strong Return on Investment",
          description:
            "Deck additions consistently recoup 65–75% of their cost at resale in the Mid-Atlantic market. In desirable Anne Arundel County neighborhoods like Severna Park and Annapolis, outdoor living space is a major selling point.",
        },
        {
          title: "Code-Compliant Construction",
          description:
            "Every deck meets Anne Arundel County's building codes for structural load, railing height, stair dimensions, and ledger board attachment. We pull permits, schedule inspections, and make sure everything passes the first time.",
        },
        {
          title: "Clean, Respectful Job Sites",
          description:
            "We protect your landscaping, clean up every day, and haul away all debris when the job is done. Your yard will look better after we leave—not like a construction zone.",
        },
      ]}
      process={[
        {
          step: 1,
          title: "Design Consultation",
          description:
            "We visit your home, measure the build area, evaluate the attachment points on your house, and discuss your vision—size, shape, features, and materials. You'll get a design concept and a detailed estimate with no obligation.",
        },
        {
          step: 2,
          title: "Permits & Material Selection",
          description:
            "We prepare structural drawings, submit the permit application to Anne Arundel County, and finalize your material choices. Once the permit is approved, we order materials and lock in your build date so there are no surprises.",
        },
        {
          step: 3,
          title: "Build & Framing",
          description:
            "Our crew sets the posts, installs the ledger board and beams, and frames the entire deck structure. We use hot-dipped galvanized or stainless hardware at every connection point. Framing is inspected before we move to decking.",
        },
        {
          step: 4,
          title: "Finish & Inspection",
          description:
            "We install the decking boards, railings, stairs, and any custom features like built-in seating or lighting. The county inspector signs off on the completed structure, and we do a final walkthrough with you to make sure every detail is right.",
        },
      ]}
      faqs={[
        {
          question: "Should I go with composite or pressure-treated wood?",
          answer:
            "Composite costs more upfront but requires almost no maintenance—no staining, no sealing, no sanding. Pressure-treated wood is significantly cheaper to install but needs staining or sealing every 1 to 2 years to prevent rot and graying. For most Maryland homeowners who don't want weekend maintenance, composite pays for itself within 5 to 7 years.",
        },
        {
          question: "How long does it take to build a deck?",
          answer:
            "A standard 300–400 square foot deck takes about 1 to 2 weeks from the start of construction. Larger or multi-level decks with custom features can take 2 to 3 weeks. Permitting adds 2 to 6 weeks before construction begins, depending on the county's review schedule.",
        },
        {
          question: "Do I need a permit to build a deck in Anne Arundel County?",
          answer:
            "Yes. Anne Arundel County requires a building permit for any attached or freestanding deck. The permit ensures the structure meets code for safety and structural integrity. We handle the entire permit process as part of your project.",
        },
        {
          question: "How much does a new deck cost in Maryland?",
          answer:
            "A pressure-treated wood deck typically runs $30 to $45 per square foot installed. Composite decks range from $45 to $75 per square foot depending on the brand and railing style. A typical 350 square foot deck costs between $10,500 and $26,000. We provide exact pricing after the on-site consultation.",
        },
        {
          question: "Can you replace my old deck boards without rebuilding the frame?",
          answer:
            "Sometimes. If the existing frame is structurally sound and meets current code, we can remove the old decking and install new boards on top. We inspect every joist, beam, and connection before making that call. If the frame has rot or doesn't meet code, we'll recommend a full rebuild for your safety.",
        },
        {
          question: "What's the best time of year to build a deck in Maryland?",
          answer:
            "Spring and fall are ideal for construction comfort, but we build year-round. The best strategy is to start the design and permitting process in late winter so construction can begin as soon as the weather breaks. That way you're enjoying your new deck by Memorial Day instead of waiting until fall.",
        },
      ]}
      relatedServices={[
        { title: "Hardscaping", slug: "hardscaping" },
        { title: "Fencing", slug: "fencing" },
        { title: "Stamped Concrete", slug: "stamped-concrete" },
        { title: "Roofing", slug: "roofing" },
      ]}
      galleryCategory="Decks"
    />
  );
}
