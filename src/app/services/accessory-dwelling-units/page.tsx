import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Accessory Dwelling Units (ADUs) | ${SITE.name}`,
  description:
    "Custom accessory dwelling units in Anne Arundel County, MD. Add living space, rental income, or an aging-in-place suite. Licensed Maryland ADU contractor—free estimates.",
  alternates: { canonical: `${SITE.url}/services/accessory-dwelling-units` },
  openGraph: { images: ["/og-image.png"] },
};

export default function AccessoryDwellingUnitsPage() {
  return (
    <ServicePageTemplate
      title="Accessory Dwelling Units"
      slug="accessory-dwelling-units"
      heroImage="/images/service-accessory-dwelling-unit.png"
      heroAlt="Modern accessory dwelling unit built in a backyard in Anne Arundel County MD"
      headline="Custom Accessory Dwelling Units Built for Maryland Living"
      subheadline="Add a detached guest house, rental suite, or in-law unit to your property—designed and built by a licensed Anne Arundel County contractor who handles every step from permits to punch list."
      factNugget="Backyard Bobby's designs and builds accessory dwelling units as a single licensed contractor (MHIC #05-163777) — handling architectural planning, county permits, excavation, foundation, framing, roofing, mechanical systems, and finish work under one roof. Serving 19 Anne Arundel County communities. A well-designed ADU can generate $1,500–$2,500/month in rental income. Typical builds take 4–6 months from permit approval to move-in."
      serviceOffers={[
        { name: "Detached ADU Construction", description: "Full design-build of freestanding accessory dwelling units from foundation through finish" },
        { name: "In-Law Suite Construction", description: "Accessible living spaces with wide doorways, step-free entry, and ADA-compliant bathrooms" },
        { name: "Rental Unit Construction", description: "Income-generating detached units with separate entrances and optional utility metering" },
        { name: "ADU Permitting Services", description: "Zoning review, construction drawings, and county permit coordination for Anne Arundel County" },
      ]}
      intro={[
        "An accessory dwelling unit is one of the smartest investments a Maryland homeowner can make. Whether you need a private space for aging parents, a rental unit that generates monthly income, or a detached home office that actually feels separate from your house, a well-built ADU adds square footage and real value to your property. In Anne Arundel County—where housing demand stays strong year-round—a quality ADU can pay for itself faster than almost any other home improvement.",
        "At Backyard Bobby's, we design and build ADUs from the ground up. We handle the full scope: architectural planning, county permits, excavation, foundation, framing, roofing, electrical, plumbing, and finish work. You get one licensed contractor managing the entire project instead of juggling five different subs. That means fewer delays, clearer communication, and a final product that actually matches what you were promised.",
        "Maryland updated its ADU regulations to make it easier for homeowners to add these units, and Anne Arundel County has its own set of zoning requirements around setbacks, size limits, and utility connections. We stay current on every rule so your project sails through the permitting process without surprises. If you've been thinking about an ADU, a quick conversation with our team will tell you exactly what's possible on your lot.",
      ]}
      benefits={[
        {
          title: "Turnkey Construction",
          description:
            "One contractor from design through move-in day. We manage excavation, foundation, framing, mechanical systems, and interior finishes so you never have to coordinate multiple trades.",
        },
        {
          title: "Rental Income Potential",
          description:
            "Anne Arundel County's rental market is strong. A well-designed ADU can generate $1,500–$2,500 per month, often covering your mortgage payment or funding your next project.",
        },
        {
          title: "Aging-in-Place Ready",
          description:
            "We build ADUs with wide doorways, step-free entries, and accessible bathrooms so your family members can live independently—right in your backyard.",
        },
        {
          title: "County Permit Expertise",
          description:
            "We navigate Anne Arundel County's zoning codes, setback requirements, and utility connection rules. Your permits get filed correctly the first time, avoiding costly delays.",
        },
        {
          title: "Property Value Boost",
          description:
            "A finished ADU adds usable square footage to your property record. Homes with ADUs in the Annapolis and Severna Park areas consistently appraise higher than comparable properties without them.",
        },
        {
          title: "Energy-Efficient Builds",
          description:
            "Every ADU we construct uses modern insulation, efficient HVAC, and tight building envelopes. That means lower utility bills for you or your tenants—even during Maryland's humid summers.",
        },
      ]}
      process={[
        {
          step: 1,
          title: "Consultation & Design",
          description:
            "We visit your property, review your lot's zoning classification, and discuss how you plan to use the unit. You'll get a preliminary layout, a realistic budget range, and a clear picture of what Anne Arundel County will allow on your specific parcel.",
        },
        {
          step: 2,
          title: "Permits & Planning",
          description:
            "We prepare construction drawings, handle the county permit application, coordinate with utility providers for water and sewer connections, and schedule any required inspections. You sign off on the final plan before any work begins.",
        },
        {
          step: 3,
          title: "Site Work & Foundation",
          description:
            "Our crew handles excavation, grading, and drainage to prepare your lot. We pour the foundation—slab or crawlspace—to meet Maryland's structural and frost-depth requirements, setting a rock-solid base for the build.",
        },
        {
          step: 4,
          title: "Construction & Finish",
          description:
            "Framing, roofing, siding, electrical, plumbing, HVAC, insulation, drywall, flooring, cabinetry, and fixtures all happen under our supervision. We schedule county inspections at every milestone and hand you the keys to a fully finished, move-in-ready unit.",
        },
      ]}
      faqs={[
        {
          question: "Does Anne Arundel County allow accessory dwelling units?",
          answer:
            "Yes. Maryland passed legislation encouraging ADU construction, and Anne Arundel County allows them on qualifying residential lots. Specific rules around lot size, setbacks, and maximum square footage vary by zoning district. We review your parcel's eligibility during the free consultation.",
        },
        {
          question: "How much does it cost to build an ADU in Maryland?",
          answer:
            "Most ADU projects in Anne Arundel County range from $100,000 to $250,000 depending on size, finishes, and whether you need new utility connections. We provide a detailed written estimate after the on-site consultation so you know exactly what to expect before committing.",
        },
        {
          question: "How long does an ADU build take from start to finish?",
          answer:
            "A typical ADU takes 4 to 6 months from permit approval to move-in. Permitting itself can take 4 to 8 weeks depending on the county's review queue. We give you a project timeline during the planning phase and keep you updated weekly throughout construction.",
        },
        {
          question: "Can I rent out my ADU?",
          answer:
            "In most Anne Arundel County zoning districts, yes. Some areas have owner-occupancy requirements, meaning you need to live in either the main house or the ADU. We'll clarify the rental rules that apply to your specific property during our initial visit.",
        },
        {
          question: "Do I need a separate address and utility meters for the ADU?",
          answer:
            "It depends on the county's requirements and how you plan to use the unit. Some homeowners share utilities with the main house; others install separate meters for easier billing. We help you decide the best approach and coordinate with BGE and the county water authority.",
        },
        {
          question: "Will building an ADU increase my property taxes?",
          answer:
            "Adding livable square footage will likely increase your assessed value, which can raise property taxes. However, the rental income or added equity typically far outweighs the tax increase. We recommend talking to your accountant for specific numbers.",
        },
      ]}
      relatedServices={[
        { title: "Excavation & Demolition", slug: "excavation-and-demolition" },
        { title: "Gravel Pads & Concrete Foundations", slug: "gravel-pads-and-concrete-foundations" },
        { title: "Roofing", slug: "roofing" },
        { title: "Decks", slug: "decks" },
      ]}
      galleryCategory="Accessory Dwelling Units"
    />
  );
}
