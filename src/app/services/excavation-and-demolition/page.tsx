import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Excavation & Demolition Services | ${SITE.name}`,
  description: `Professional excavation, site grading, demolition, and land clearing in ${SITE.address.region}, MD. Licensed & insured. Free estimates from ${SITE.name}.`,
  alternates: { canonical: `${SITE.url}/services/excavation-and-demolition` },
};

export default function ExcavationAndDemolitionPage() {
  return (
    <ServicePageTemplate
      title="Excavation & Demolition"
      slug="excavation-and-demolition"
      heroImage="/images/excavation-site-grading-backhoe-01.webp"
      heroAlt="Backhoe excavating and grading residential property in Anne Arundel County Maryland"
      headline="Expert Excavation & Demolition for Your Next Project"
      subheadline="From clearing overgrown lots to precision grading for new construction, we handle the heavy site work so your project starts on solid ground."
      factNugget="Backyard Bobby's has prepped hundreds of residential sites across Severna Park, Pasadena, Crofton, Annapolis, and throughout Anne Arundel County — operating mini excavators, skid steers, and dump trucks with full knowledge of the county's clay-heavy soil conditions. Licensed MHIC #05-163777. We pull all required grading and demolition permits and coordinate Miss Utility markings before every job. Most residential projects take 1–3 days."
      serviceOffers={[
        { name: "Residential Excavation", description: "Precision excavation for foundations, patios, driveways, and utility trenches" },
        { name: "Site Grading & Drainage", description: "Grading to direct stormwater away from structures and prevent erosion" },
        { name: "Land Clearing", description: "Brush, tree stump, and overgrowth removal to prepare lots for construction" },
        { name: "Structure Demolition", description: "Removal of old sheds, retaining walls, concrete, and other structures" },
        { name: "Regrading for Drainage Correction", description: "Reshaping terrain to fix standing water, wet basements, and erosion issues" },
      ]}
      intro={[
        "Every great outdoor project starts below the surface. Whether you're building a new deck, pouring a foundation, or adding a detached garage, the excavation and grading work sets the stage for everything that follows. In Anne Arundel County, where clay-heavy soils and variable water tables are the norm, getting this step right isn't optional — it's essential.",
        "Backyard Bobby's brings the heavy equipment, local soil knowledge, and attention to detail that site work demands. We handle land clearing, tree stump removal, drainage grading, old structure demolition, and everything in between. Our crew has prepped hundreds of residential sites across Severna Park, Pasadena, Crofton, and Annapolis — and we know how to work efficiently without tearing up the rest of your property.",
        "Whether you need a clean slate for new construction or targeted grading to fix a drainage nightmare, we'll get your site ready the right way — on time, permitted, and built to support whatever comes next.",
      ]}
      benefits={[
        {
          title: "Local Soil Expertise",
          description:
            "Anne Arundel County's mix of clay, sand, and fill soil requires someone who knows the terrain. We've worked in every corner of the county and adjust our approach based on your specific lot conditions.",
        },
        {
          title: "Precision Grading for Drainage",
          description:
            "Poor grading leads to standing water, foundation damage, and soggy yards. We grade your site to move water away from structures and toward proper drainage points — critical in Maryland's wet seasons.",
        },
        {
          title: "Full Demolition Capabilities",
          description:
            "Old sheds, crumbling retaining walls, broken concrete, or entire structures — we demolish and haul it all. We handle debris disposal responsibly and leave you with a clean, level site.",
        },
        {
          title: "Permit Coordination",
          description:
            "Anne Arundel County has specific requirements for excavation, grading, and demolition. We pull the right permits and coordinate utility markings so your project stays compliant from day one.",
        },
        {
          title: "Minimal Property Disruption",
          description:
            "Heavy equipment doesn't have to mean a destroyed lawn. We plan access routes, use ground protection when needed, and restore disturbed areas so your property looks great when we're done.",
        },
        {
          title: "One Contractor, Start to Finish",
          description:
            "Since we also build decks, pour foundations, and install driveways, your excavation flows seamlessly into the next phase. No delays waiting on a separate crew.",
        },
      ]}
      process={[
        {
          step: 1,
          title: "Site Assessment & Scope Planning",
          description:
            "We walk your property, evaluate soil conditions and slope, identify underground utilities and drainage patterns, and map out exactly what needs to be excavated, graded, or demolished. You'll get a detailed scope of work and transparent pricing.",
        },
        {
          step: 2,
          title: "Permits & Utility Marking",
          description:
            "We pull all required Anne Arundel County grading and demolition permits and schedule Miss Utility to mark underground lines. This protects you legally and prevents costly damage to gas, water, or electrical infrastructure.",
        },
        {
          step: 3,
          title: "Excavation, Grading & Demolition",
          description:
            "Our crew brings in the right equipment for your job — mini excavators for tight backyards, skid steers for grading, and dump trucks for hauling. We cut to grade, establish proper drainage slopes, and remove all debris and demolished material from your property.",
        },
        {
          step: 4,
          title: "Site Cleanup & Prep for Next Phase",
          description:
            "Once earthwork is complete, we compact the subgrade, verify final elevations, and leave your site ready for the next construction phase. If we're handling the follow-up work — a foundation, driveway, or pad — we transition right into it with zero downtime.",
        },
      ]}
      faqs={[
        {
          question: "Do I need a permit for excavation or demolition in Anne Arundel County?",
          answer:
            "In most cases, yes. Anne Arundel County requires grading permits for any significant earth-moving work, and demolition permits for removing structures. We handle the entire permit process for you, including drawings and applications, so you don't have to deal with the county offices.",
        },
        {
          question: "How do you handle the clay soil that's common in this area?",
          answer:
            "Clay soil is heavy, retains water, and shifts with freeze-thaw cycles. We account for this by adjusting excavation depths, adding proper base material for drainage, and compacting in lifts to avoid settling. Our experience in Anne Arundel County means we know what to expect lot by lot.",
        },
        {
          question: "Can you excavate in a tight backyard without destroying my lawn?",
          answer:
            "Absolutely. We use compact equipment like mini excavators and tracked skid steers that can fit through standard fence gates. We also lay ground protection mats and plan access routes to minimize damage to existing landscaping.",
        },
        {
          question: "What happens to the dirt, concrete, and debris you remove?",
          answer:
            "All material is hauled off-site and disposed of properly. Clean fill dirt goes to approved fill sites, concrete goes to recycling facilities, and any mixed debris goes to licensed disposal yards. We never dump illegally.",
        },
        {
          question: "How long does a typical residential excavation project take?",
          answer:
            "Most residential site prep and grading jobs take 1 to 3 days depending on the scope. Demolition of a larger structure like an old garage might add another day or two. We'll give you a clear timeline during the estimate so you know exactly what to expect.",
        },
        {
          question: "Can you fix drainage problems on my property with regrading?",
          answer:
            "Yes — regrading is one of the most effective solutions for standing water, wet basements, and erosion issues. We reshape the terrain to direct water toward swales, storm drains, or dry wells. Many of our clients see immediate improvement after a single grading session.",
        },
      ]}
      relatedServices={[
        { title: "Gravel Pads & Concrete Foundations", slug: "gravel-pads-and-concrete-foundations" },
        { title: "Driveway Installation", slug: "driveway-installation" },
        { title: "Accessory Dwelling Units", slug: "accessory-dwelling-units" },
      ]}
      galleryCategory="Excavation & Demolition"
    />
  );
}
