import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Driveway Installation | ${SITE.name}`,
  description:
    "Professional driveway installation in Anne Arundel County, MD. Asphalt, concrete, and paver driveways built with proper base prep to handle Maryland freeze-thaw cycles. Free estimates.",
  alternates: { canonical: `${SITE.url}/services/driveway-installation` },
};

export default function DrivewayInstallationPage() {
  return (
    <ServicePageTemplate
      title="Driveway Installation"
      slug="driveway-installation"
      heroImage="/images/service-driveway-installation.png"
      heroAlt="Freshly installed residential driveway in Anne Arundel County Maryland"
      headline="Driveway Installation That Handles Maryland Winters"
      subheadline="From crumbling asphalt to brand-new pavers, we build driveways with the proper excavation, base prep, and drainage that Anne Arundel County homeowners need to survive freeze-thaw cycles."
      factNugget="Backyard Bobby's has installed driveways across Annapolis, Severna Park, Crofton, Pasadena, and throughout Anne Arundel County — each one excavated to full depth with compacted aggregate base layers and drainage grading that's engineered to last 20–30 years. Licensed MHIC #05-163777. Installation takes 2–5 days; we offer asphalt, poured concrete, and interlocking paver options to fit a range of budgets."
      serviceOffers={[
        { name: "Asphalt Driveway Installation", description: "Hot-mix asphalt driveways with commercial paver equipment and compacted aggregate base" },
        { name: "Concrete Driveway Installation", description: "Poured and reinforced concrete driveways with proper drainage pitch" },
        { name: "Paver Driveway Installation", description: "Interlocking paver driveways with screeded sand bed and edge restraints" },
        { name: "Driveway Extension & Widening", description: "Extending or widening existing driveways to add parking capacity" },
        { name: "Driveway Replacement", description: "Full tear-out and replacement of damaged or deteriorating driveways" },
      ]}
      intro={[
        "Your driveway is the first thing people see when they pull up to your house—and the surface you drive over every single day. A cracked, uneven, or sinking driveway doesn't just look bad; it damages tires, creates trip hazards, and tanks your curb appeal when it's time to sell. In Anne Arundel County, where temperatures swing from the 90s in summer to the teens in winter, a driveway that wasn't built with the right base will crack and heave within a few years. Doing it right the first time saves you thousands down the road.",
        "At Backyard Bobby's, every driveway starts below the surface. We excavate to the proper depth, install compacted gravel base layers, and ensure drainage slopes water away from your home and garage. Only then do we install your chosen material—whether that's hot-mix asphalt, poured concrete, or interlocking pavers. It's the unglamorous prep work that makes a driveway last 20 to 30 years instead of 5.",
        "We've installed driveways across Annapolis, Severna Park, Crofton, Pasadena, and throughout Anne Arundel County. Whether you're replacing a tired surface, extending an existing driveway, or building from scratch on new construction, we'll walk you through material options, give you an honest price, and get the job done on schedule.",
      ]}
      benefits={[
        {
          title: "Proper Base Preparation",
          description:
            "We excavate to full depth and install compacted aggregate base layers. This is the single biggest factor in whether a driveway lasts 5 years or 25—and it's where most contractors cut corners.",
        },
        {
          title: "Freeze-Thaw Durability",
          description:
            "Maryland's winters are brutal on driveways. Our drainage grading and base compaction prevent water from pooling underneath the surface, which is what causes the cracking and heaving you see on poorly built driveways.",
        },
        {
          title: "Multiple Material Options",
          description:
            "Choose from hot-mix asphalt for affordability, poured concrete for longevity, stamped concrete for style, or interlocking pavers for a premium look. We'll help you pick the right material for your budget and aesthetic.",
        },
        {
          title: "Curb Appeal That Sells",
          description:
            "Real estate agents say the driveway is one of the top five features buyers notice. A clean, well-installed driveway can add thousands to your home's perceived value in competitive Anne Arundel County neighborhoods.",
        },
        {
          title: "Grading & Drainage Built In",
          description:
            "Every driveway we install is graded to move stormwater away from your foundation. Proper pitch means no puddles, no ice sheets in winter, and no water creeping toward your garage or basement.",
        },
        {
          title: "Licensed & Insured",
          description:
            "We carry full liability insurance, hold MHIC license #05-163777, and pull proper county permits when required. You're protected from start to finish.",
        },
      ]}
      process={[
        {
          step: 1,
          title: "Assessment & Design",
          description:
            "We measure your driveway area, evaluate the existing surface and soil conditions, discuss material preferences and budget, and flag any drainage or grading concerns. You'll receive a detailed written estimate with material specs and a project timeline.",
        },
        {
          step: 2,
          title: "Excavation & Base Prep",
          description:
            "Our crew removes the old surface (if applicable), excavates to the required depth, and installs layers of compacted aggregate. We grade the subbase for proper drainage pitch and compact everything to engineering specs before any paving material goes down.",
        },
        {
          step: 3,
          title: "Material Installation",
          description:
            "Depending on your choice, we lay hot-mix asphalt with a commercial paver, pour and screed concrete with reinforcement, or set interlocking pavers on a screeded sand bed. Every step follows manufacturer and industry standards for thickness and coverage.",
        },
        {
          step: 4,
          title: "Finishing & Sealing",
          description:
            "We trim and clean all edges, apply sealant where appropriate, and install any apron transitions to the street. You'll get a walkthrough of the finished driveway plus care instructions so you know exactly when to seal-coat and how to maintain it for decades.",
        },
      ]}
      faqs={[
        {
          question: "What's the best driveway material for Maryland weather?",
          answer:
            "Concrete and asphalt both perform well when installed on a proper base. Asphalt is more forgiving with minor ground movement and costs less upfront. Concrete lasts longer and requires less maintenance. Pavers offer the most visual appeal and are individually replaceable if damaged. We help you weigh the trade-offs during the estimate.",
        },
        {
          question: "How long does a driveway installation take?",
          answer:
            "Most residential driveways take 2 to 5 days depending on the size and material. Asphalt is the fastest—often done in 2 days. Concrete requires cure time of about a week before you can drive on it. Paver driveways take 3 to 5 days for a standard two-car layout.",
        },
        {
          question: "Do I need a permit for a new driveway in Anne Arundel County?",
          answer:
            "In most cases, yes—especially if you're changing the driveway footprint, adding impervious surface, or modifying the curb cut. We handle the permit application as part of the project so you don't have to deal with county paperwork.",
        },
        {
          question: "How much does a new driveway cost?",
          answer:
            "A standard two-car asphalt driveway in Anne Arundel County typically runs $4,000 to $8,000. Concrete driveways range from $6,000 to $14,000. Paver driveways start around $10,000 and go up based on pattern and material. We provide exact pricing after measuring your specific project.",
        },
        {
          question: "Can you widen or extend my existing driveway?",
          answer:
            "Absolutely. We regularly extend driveways to add parking space or widen narrow lanes. We match the existing material when possible, or we can overlay or replace the entire surface for a seamless look.",
        },
        {
          question: "How soon can I drive on my new driveway?",
          answer:
            "Asphalt driveways can handle light traffic within 2 to 3 days and full use within a week. Concrete driveways need about 7 days to cure before vehicle traffic. Paver driveways are ready to drive on immediately after installation.",
        },
      ]}
      relatedServices={[
        { title: "Stamped Concrete", slug: "stamped-concrete" },
        { title: "Hardscaping", slug: "hardscaping" },
        { title: "Excavation & Demolition", slug: "excavation-and-demolition" },
      ]}
      galleryCategory="Driveway Installation"
    />
  );
}
