import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Gravel Pads & Concrete Foundations | ${SITE.name}`,
  description: `Professional gravel pads and concrete foundations for sheds, garages, hot tubs, and outdoor structures in ${SITE.address.region}, MD. Free estimates from ${SITE.name}.`,
  alternates: { canonical: `${SITE.url}/services/gravel-pads-and-concrete-foundations` },
};

export default function GravelPadsAndConcreteFoundationsPage() {
  return (
    <ServicePageTemplate
      title="Gravel Pads & Concrete Foundations"
      slug="gravel-pads-and-concrete-foundations"
      heroImage="/images/gravel-pad-shed-foundation-01.jpeg"
      heroAlt="Gravel pad foundation installed by Backyard Bobby's for shed in Anne Arundel County"
      headline="Solid Foundations for Sheds, Garages & Outdoor Structures"
      subheadline="A level, properly drained foundation is the difference between a structure that lasts decades and one that shifts, cracks, and sinks. We build both gravel pads and poured concrete foundations that stand the test of time."
      factNugget="Backyard Bobby's has installed hundreds of gravel pads and concrete foundations across Annapolis, Pasadena, Crofton, Severna Park, and surrounding communities — each one laser-leveled and built with geotextile fabric and compacted crushed stone engineered for local soil conditions. Licensed MHIC #05-163777. Gravel pads typically install in 1–2 days starting around $1,500; concrete slabs take 2–3 days plus cure time starting around $3,500."
      serviceOffers={[
        { name: "Gravel Pad Installation", description: "Compacted crushed stone pads for sheds, hot tubs, and outdoor structures" },
        { name: "Concrete Slab Foundation", description: "Poured concrete foundations with rebar reinforcement for garages, ADUs, and heavy structures" },
        { name: "Hot Tub Pad Installation", description: "Level, load-rated pads sized for spa and hot tub placement" },
        { name: "Generator Pad Installation", description: "Compact concrete or gravel pads for whole-home generator systems" },
      ]}
      intro={[
        "That new shed, detached garage, hot tub, or generator needs a solid base — and in Anne Arundel County, where clay soils shift and water tables run high, cutting corners on the foundation is a recipe for problems. A structure placed on bare ground or a poorly prepared pad will settle unevenly, trap moisture underneath, and start causing headaches within a year or two.",
        "Backyard Bobby's builds gravel pads and poured concrete foundations engineered for the specific conditions on your property. We evaluate your soil, assess drainage, and build a base that distributes weight evenly, sheds water away from your structure, and stays level through Maryland's freeze-thaw cycles. Whether you need a simple 10x12 gravel pad for a prefab shed or a full concrete slab for a two-car garage, we handle the complete process.",
        "We've installed hundreds of foundation pads across Annapolis, Pasadena, Crofton, Severna Park, and the surrounding area. Every one of them started with proper site evaluation and ended with a surface you could trust to support your investment for the long haul.",
      ]}
      benefits={[
        {
          title: "Gravel & Concrete Expertise",
          description:
            "We build both types of foundations and can recommend which is right for your project. Gravel pads are ideal for sheds and lighter structures; concrete is better for garages, ADUs, and heavy equipment. We'll explain the trade-offs clearly.",
        },
        {
          title: "Proper Drainage Built In",
          description:
            "Every pad we build includes a drainage plan. Gravel pads use perimeter grading and compacted stone that lets water pass through. Concrete slabs get slope built into the pour and drainage channels where needed. No standing water, no moisture damage.",
        },
        {
          title: "Engineered for Local Soil",
          description:
            "Anne Arundel County soil varies wildly — heavy clay in Crofton, sandy loam near the Bay, and everything in between. We adjust base depth, material selection, and compaction technique to match what's actually under your yard.",
        },
        {
          title: "Level & Square Every Time",
          description:
            "An out-of-level pad means doors that won't close, walls that don't align, and floors that puddle. We use laser levels and check for square at every stage to guarantee your structure sits perfectly flat.",
        },
        {
          title: "Sized for Any Structure",
          description:
            "From a compact 8x10 hot tub pad to a 24x30 garage foundation, we custom-build to your exact dimensions. We also account for overhangs, door swings, and access paths so the finished pad works for the way you'll actually use it.",
        },
        {
          title: "Seamless Project Coordination",
          description:
            "If your shed, garage, or ADU is being delivered or built after the pad, we coordinate timing so the foundation is cured and ready. Since we also handle excavation and construction, there's no finger-pointing between contractors.",
        },
      ]}
      process={[
        {
          step: 1,
          title: "Site Evaluation & Measurements",
          description:
            "We visit your property, confirm exact pad dimensions based on your structure specs, evaluate soil type and drainage patterns, and identify the best placement. We account for setback requirements, access for delivery trucks, and proximity to utilities.",
        },
        {
          step: 2,
          title: "Ground Preparation & Grading",
          description:
            "We excavate the area to the correct depth — typically 6 to 8 inches for gravel pads, deeper for concrete — strip away topsoil and organic material, and grade the subsoil to create proper drainage slope. This step prevents future settling and water problems.",
        },
        {
          step: 3,
          title: "Base Material & Compaction",
          description:
            "For gravel pads, we lay geotextile fabric to prevent weed growth and soil mixing, then build up layers of crushed stone — compacting each lift with a plate compactor for maximum stability. For concrete, we set forms, lay compacted gravel sub-base, add rebar or wire mesh reinforcement, and pour to the specified thickness.",
        },
        {
          step: 4,
          title: "Final Surface & Drainage Verification",
          description:
            "We verify the finished surface is dead level (or properly sloped for drainage), check all edges and corners for square, and confirm the pad meets the specs for your structure. For concrete, we handle proper finishing and curing. We leave the site clean and ready for your structure delivery or next build phase.",
        },
      ]}
      faqs={[
        {
          question: "Should I get a gravel pad or a concrete foundation for my shed?",
          answer:
            "For most prefab and kit sheds under about 200 square feet, a properly built gravel pad is the best choice — it's more affordable, drains naturally, and is plenty strong for the load. For larger sheds, garages, or permanent structures, a concrete slab provides superior strength and longevity. We'll recommend the right option based on your structure's size, weight, and intended use.",
        },
        {
          question: "How thick does a gravel pad need to be?",
          answer:
            "We typically build gravel pads 4 to 6 inches thick with compacted crushed stone (after excavating and removing topsoil). For heavier structures or areas with soft soil, we may increase that to 8 inches. The pad also extends 1 to 2 feet beyond the structure on all sides for drainage and stability.",
        },
        {
          question: "Do I need a permit for a shed pad or concrete slab in Anne Arundel County?",
          answer:
            "The pad itself generally doesn't require a separate permit, but the structure you're placing on it may. Sheds over 200 square feet, any structure with electrical or plumbing, and detached garages typically need permits in Anne Arundel County. We can advise you during the estimate and help with permitting if needed.",
        },
        {
          question: "How long does it take to install a gravel pad?",
          answer:
            "Most residential gravel pads take 1 to 2 days — one day for excavation and ground prep, and a second day for stone placement and compaction. Concrete foundations take 2 to 3 days for prep and pour, plus 5 to 7 days of curing time before your structure can be placed on it.",
        },
        {
          question: "Will a gravel pad sink or shift over time?",
          answer:
            "Not if it's built correctly. The key is proper excavation depth, geotextile fabric beneath the stone, the right type of crushed stone (not round river rock), and thorough compaction. We compact in lifts and verify the finished surface with a laser level. Our pads stay stable for years.",
        },
        {
          question: "Can you build a foundation on a sloped lot?",
          answer:
            "Yes. Sloped lots are common across Anne Arundel County, and we handle them regularly. Depending on the slope, we may need to do more excavation on the high side and build up a retaining edge on the low side. For steeper grades, a concrete foundation with a step-down design may be the best approach. We'll evaluate the slope during your site visit and recommend the most cost-effective solution.",
        },
      ]}
      relatedServices={[
        { title: "Excavation & Demolition", slug: "excavation-and-demolition" },
        { title: "Stamped Concrete", slug: "stamped-concrete" },
        { title: "Accessory Dwelling Units", slug: "accessory-dwelling-units" },
        { title: "Hardscaping", slug: "hardscaping" },
      ]}
      galleryCategory="Gravel Pads & Concrete Foundations"
    />
  );
}
