// ── Shared service content ───────────────────────────────────────────────────
//
// Single source of truth for the marketing content rendered by BOTH the public
// service pages (`/services/[slug]`) and the Google-Ads landing pages
// (`/lp/[slug]`). Both render the same <ServicePageTemplate> from this data, so
// the two page sets can never drift apart.
//
// Only the five services we run paid ads for live here. The remaining service
// pages keep their own inline content.

export interface ServiceContent {
  title: string;
  slug: string;
  heroImage: string;
  heroAlt: string;
  headline: string;
  subheadline: string;
  factNugget?: string;
  intro: string[];
  benefits: { title: string; description: string }[];
  process: { step: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  relatedServices: { title: string; slug: string }[];
  galleryCategory: string;
  serviceOffers?: { name: string; description?: string }[];
}

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  // ── Stamped Concrete ──────────────────────────────────────────────────────
  // Note: "stamped concrete" stays prominent (industry term), but the copy also
  // uses "decorative concrete", "patterned concrete", and "textured concrete" so
  // it captures searchers who don't use the trade term.
  "stamped-concrete": {
    title: "Stamped Concrete",
    slug: "stamped-concrete",
    heroImage: "/images/stamped-concrete-driveway-decorative-01.webp",
    heroAlt:
      "Decorative stamped concrete driveway installed by Backyard Bobby's in Anne Arundel County Maryland",
    headline:
      "Decorative Stamped Concrete Patios, Walkways & Pool Decks That Look Like Natural Stone",
    subheadline:
      "Also called decorative or patterned concrete, stamped concrete gives you the high-end look of flagstone, slate, or brick at a fraction of the cost — a seamless, low-maintenance surface built to handle Maryland's toughest seasons.",
    factNugget:
      "Backyard Bobby's has poured stamped concrete patios, pool decks, and walkways across Annapolis, Severna Park, Crofton, Arnold, and throughout Anne Arundel County. Every pour uses air-entrained concrete with fiber reinforcement engineered for Maryland's freeze-thaw cycles, with patterns including Ashlar slate, random stone, cobblestone, and herringbone brick. Licensed MHIC #05-163777. Most projects finish in 1–2 days with a 25+ year lifespan; installed costs typically run 30–50% less than natural stone.",
    serviceOffers: [
      { name: "Stamped Concrete Patio Installation", description: "Decorative stamped patios with integral color and custom patterns" },
      { name: "Stamped Concrete Walkways", description: "Front walkways and garden paths with natural stone patterns" },
      { name: "Stamped Concrete Pool Decks", description: "Non-slip stamped surfaces for pool surrounds with texture additives" },
      { name: "Stamped Concrete Driveway Aprons", description: "Decorative driveway entrances and apron transitions" },
      { name: "Concrete Resealing & Maintenance", description: "Periodic resealing to restore color and surface protection" },
    ],
    intro: [
      "If you love the look of natural stone but not the price tag, decorative stamped concrete is your answer (you may also hear it called patterned or textured concrete). With dozens of patterns and color combinations available — from Ashlar slate to cobblestone to herringbone brick — stamped concrete gives you the rich, textured appearance of premium materials at 30–50% less cost. And unlike individual pavers that can shift and grow weeds between joints, stamped concrete is a single monolithic slab that stays locked in place.",
      "Backyard Bobby's has been pouring and stamping decorative concrete across Anne Arundel County for years. We've installed stamped patios in Annapolis, pool decks in Severna Park, and walkways in Crofton — each one custom-designed with patterns and integral colors chosen to complement the homeowner's property. Our finishing techniques create surfaces that guests genuinely can't tell apart from real stone.",
      "The key to decorative concrete that lasts in Maryland's climate is in the details that most contractors rush through: proper sub-base preparation, the right concrete mix design for our freeze-thaw cycles, precise timing on the stamp application, and a professional-grade sealer that protects color and resists moisture penetration. That's what you get with Backyard Bobby's.",
    ],
    benefits: [
      { title: "High-End Look at 30–50% Less Cost", description: "Stamped concrete replicates the appearance of flagstone, slate, brick, or cobblestone without the premium price. You get the aesthetic upgrade your yard deserves without blowing your budget." },
      { title: "Virtually Zero Joint Maintenance", description: "Unlike pavers with sand joints that grow weeds and wash out, decorative concrete is a continuous surface. No re-sanding, no ant hills, no weeds pushing through — just periodic resealing every 2–3 years." },
      { title: "Unlimited Pattern & Color Combinations", description: "Choose from Ashlar slate, random stone, wood plank, herringbone brick, and more. We offer integral colors, surface-applied hardeners, and accent release colors for a fully custom look." },
      { title: "Designed for Maryland Freeze-Thaw", description: "We use air-entrained concrete mixes specifically designed to resist freeze-thaw damage, with fiber reinforcement and control joints placed strategically to prevent unsightly cracking." },
      { title: "Perfect for Patios, Pool Decks & Walkways", description: "Patterned concrete works beautifully for large patio areas, pool surrounds (with non-slip texture options), front walkways, and driveway aprons. One material, one seamless look." },
      { title: "Fast Installation, Long Lifespan", description: "Most stamped concrete projects are poured and finished in 1–2 days. With proper installation and sealing, your surface will look great for 25+ years with minimal upkeep." },
    ],
    process: [
      { step: 1, title: "Design & Color Selection", description: "We visit your property to discuss layout, review stamp pattern samples and color charts in your actual outdoor lighting, and help you choose combinations that complement your home's exterior. You'll know exactly what your finished surface will look like before we start." },
      { step: 2, title: "Site Prep & Forming", description: "We excavate to the required depth, compact the sub-base, install forms at the correct grade for drainage, and place rebar or wire mesh reinforcement. Control joints are planned in advance to keep any natural cracking hidden in the pattern lines." },
      { step: 3, title: "Pour, Stamp & Color", description: "We pour air-entrained concrete with integral color, apply a color hardener for depth and durability, broadcast the release agent, and hand-press stamp mats into the surface while the concrete is at the ideal consistency. Timing is everything — this is where experience matters most." },
      { step: 4, title: "Cure & Seal", description: "After proper curing time, we wash the surface to reveal the final color contrast, apply a high-quality acrylic or polyurethane sealer for UV protection and moisture resistance, and do a final walkthrough with you to make sure every detail is right." },
    ],
    faqs: [
      { question: "How does stamped concrete compare to pavers in terms of cost?", answer: "Stamped concrete typically costs $12–$22 per square foot installed, while paver patios run $15–$30+ per square foot. For larger areas, the savings with decorative concrete can be significant — a 400-square-foot patio could save you $2,000–$4,000 compared to a comparable paver installation." },
      { question: "Will stamped concrete crack in Maryland winters?", answer: "All concrete can develop hairline cracks over time, but we minimize this risk with air-entrained concrete mixes designed for freeze-thaw, fiber mesh reinforcement, and strategically placed control joints that are hidden within the stamp pattern. Properly installed stamped concrete holds up extremely well in Maryland's climate." },
      { question: "How often does stamped concrete need to be resealed?", answer: "We recommend resealing every 2–3 years to maintain the color vibrancy and surface protection. It's a straightforward process — a good cleaning followed by a fresh coat of sealer — and we're happy to do it for you or show you how to handle it yourself." },
      { question: "Can stamped concrete be slippery when wet?", answer: "The stamped texture itself provides good traction, but sealed surfaces can be slick when wet. For pool decks and high-traffic walkways, we add a non-slip additive to the sealer that provides grip without changing the appearance. This is standard on all our pool deck projects." },
      { question: "What patterns are most popular in Anne Arundel County?", answer: "Ashlar slate and random stone patterns are our most requested — they pair beautifully with both colonial and modern-style homes common in Annapolis, Severna Park, and Arnold. For a more traditional look, running bond brick and cobblestone are popular choices. We bring physical samples to your consultation so you can see and feel the texture." },
      { question: "Can you add stamped concrete around my existing pool or patio?", answer: "Yes, we do this regularly. We can pour decorative concrete up to the edge of existing structures, including pools, existing patios, and house foundations. Color matching to adjacent concrete requires skill, and we use techniques to blend new work seamlessly with what's already there." },
    ],
    relatedServices: [
      { title: "Hardscaping", slug: "hardscaping" },
      { title: "Driveway Installation", slug: "driveway-installation" },
      { title: "Gravel Pads & Concrete Foundations", slug: "gravel-pads-and-concrete-foundations" },
      { title: "Decks", slug: "decks" },
    ],
    galleryCategory: "Stamped Concrete",
  },

  // ── Hardscaping ───────────────────────────────────────────────────────────
  hardscaping: {
    title: "Hardscaping",
    slug: "hardscaping",
    heroImage: "/images/paver-walkway-interlocking-bricks-01.jpeg",
    heroAlt: "Paver walkway and hardscaping built by Backyard Bobby's in Anne Arundel County",
    headline: "Patios, Walkways & Retaining Walls That Transform Your Outdoor Space",
    subheadline:
      "From elegant paver patios to functional retaining walls, we design and build hardscaping that handles Maryland weather and makes your backyard the best room in the house.",
    factNugget:
      "Backyard Bobby's has completed hardscaping projects across Annapolis, Severna Park, Arnold, and 16 other Anne Arundel County communities. Every patio and walkway is built on 6–8 inches of compacted aggregate base engineered for Maryland's clay soil and freeze-thaw cycles. Licensed MHIC #05-163777. Most residential patios take 5–10 working days; installed costs range from $15–$50 per square foot depending on material.",
    serviceOffers: [
      { name: "Paver Patio Installation", description: "Custom concrete paver patios with compacted aggregate base and polymeric sand joints" },
      { name: "Natural Stone Walkways", description: "Flagstone, bluestone, and travertine walkway installation" },
      { name: "Retaining Wall Construction", description: "Structural and decorative retaining walls using segmental block, natural stone, or poured concrete" },
      { name: "Outdoor Kitchen Hardscaping", description: "Built-in grill islands, countertops, and bar areas with durable stone or paver surfaces" },
      { name: "Fire Pit Installation", description: "Wood-burning and gas fire pits with surrounding paver or stone patio" },
    ],
    intro: [
      "Your backyard should be more than just grass and a garden hose. A well-designed hardscape turns wasted yard space into an outdoor living area you'll actually use — for morning coffee, weekend cookouts, or just unwinding after a long day. At Backyard Bobby's, we specialize in building patios, walkways, retaining walls, outdoor kitchens, and fire pits that look stunning and stand up to everything Anne Arundel County's climate throws at them.",
      "Maryland's freeze-thaw cycles, clay-heavy soils, and summer downpours demand more than a quick paver job. We engineer every project with proper excavation depth, compacted aggregate bases, and drainage solutions designed specifically for local soil conditions. That's the difference between a patio that shifts and cracks in two years and one that looks perfect a decade later.",
      "Whether you're envisioning a natural stone walkway to your front door, a multi-level paver patio with a built-in fire pit, or a retaining wall that tames a sloped yard and adds usable square footage, we handle the entire project in-house — from design through final installation. No subcontractors, no runaround.",
    ],
    benefits: [
      { title: "Engineered for Maryland Soil & Climate", description: "We account for Anne Arundel County's clay soils, freeze-thaw cycles, and heavy rainfall with proper base depth, drainage, and joint sand — so your hardscape doesn't shift, settle, or crack." },
      { title: "Serious Return on Investment", description: "A professionally installed patio or outdoor kitchen can recoup 50–80% of its cost at resale. More importantly, you get an outdoor living space your family will use every season." },
      { title: "Endless Material & Design Options", description: "Choose from concrete pavers, natural flagstone, bluestone, travertine, or tumbled brick. We'll help you pick materials and patterns that complement your home's architecture." },
      { title: "Complete In-House Crew", description: "Our own team handles excavation, grading, base work, and paver installation. No subcontractors means better communication, consistent quality, and fewer delays." },
      { title: "Built-In Drainage Solutions", description: "We integrate proper slope, channel drains, and permeable paver options so water moves away from your foundation — not toward it." },
      { title: "Licensed, Insured & MHIC Certified", description: "We carry full liability coverage and our MHIC license means your project is protected by Maryland's Home Improvement Guaranty Fund." },
    ],
    process: [
      { step: 1, title: "Design & Layout Planning", description: "We meet at your property to discuss your vision, measure the space, evaluate slope and soil conditions, and mark the layout with stakes and string so you can see the final footprint before we break ground." },
      { step: 2, title: "Site Prep & Excavation", description: "Our crew excavates to the proper depth based on your soil type, removes organic material, and establishes precise grade for drainage. For retaining walls, we dig below the frost line to prevent heaving." },
      { step: 3, title: "Base Installation & Leveling", description: "We install layers of compacted aggregate base and leveling sand, checking grade at every stage with laser levels. This hidden foundation is what separates a 20-year patio from a 2-year one." },
      { step: 4, title: "Paver/Stone Setting & Finishing", description: "Pavers or natural stone are hand-set in your chosen pattern, cut precisely at edges, and locked in with polymeric joint sand. We finish with edge restraints and a final compaction pass for a rock-solid surface." },
    ],
    faqs: [
      { question: "How long does a typical patio installation take in Anne Arundel County?", answer: "Most residential patio projects take 5–10 working days depending on size and complexity. A simple 200-square-foot patio might be done in a week, while a multi-level design with a fire pit or outdoor kitchen could take two weeks. Weather and permit timelines can also factor in." },
      { question: "Will pavers shift or crack with Maryland's freeze-thaw cycles?", answer: "Not when installed correctly. We excavate to the proper depth for Anne Arundel County's clay soil, install 6–8 inches of compacted aggregate base, and use polymeric sand in the joints. Pavers are actually more freeze-thaw resistant than poured concrete because the joints allow slight flex without cracking." },
      { question: "What's the difference between pavers and natural stone?", answer: "Concrete pavers are manufactured, consistent in size, and available in a huge range of colors and patterns — they're typically more budget-friendly. Natural stone (flagstone, bluestone, travertine) offers a unique, high-end look but costs more and requires more skilled installation. We work with both and can help you decide based on your budget and aesthetic goals." },
      { question: "Do I need a permit for a patio or retaining wall in Anne Arundel County?", answer: "Patios at ground level generally don't require a permit, but retaining walls over 4 feet tall and any project near the Critical Area (within 1,000 feet of the Chesapeake Bay or its tributaries) typically do. We handle all permit applications and know the county requirements inside and out." },
      { question: "How much does hardscaping cost per square foot?", answer: "Paver patios typically range from $15–$30 per square foot installed, depending on the material and design complexity. Natural stone runs $25–$50+. Retaining walls are priced per square face foot and range from $25–$60 depending on material. We provide detailed, itemized estimates so you know exactly where every dollar goes." },
      { question: "Can you build a patio on a sloped yard?", answer: "Absolutely — that's one of our specialties. We use retaining walls, terraced levels, and proper grading to create flat, usable patio spaces on sloped properties. Many of our best projects in Severna Park and Arnold involve working with the natural grade to create multi-level outdoor living areas." },
    ],
    relatedServices: [
      { title: "Stamped Concrete", slug: "stamped-concrete" },
      { title: "Decks", slug: "decks" },
      { title: "Fencing", slug: "fencing" },
      { title: "Excavation & Demolition", slug: "excavation-and-demolition" },
    ],
    galleryCategory: "Hardscaping",
  },

  // ── Driveway Installation ─────────────────────────────────────────────────
  "driveway-installation": {
    title: "Driveway Installation",
    slug: "driveway-installation",
    heroImage: "/images/service-driveway-installation.png",
    heroAlt: "Freshly installed residential driveway in Anne Arundel County Maryland",
    headline: "Driveway Installation That Handles Maryland Winters",
    subheadline:
      "From crumbling asphalt to brand-new pavers, we build driveways with the proper excavation, base prep, and drainage that Anne Arundel County homeowners need to survive freeze-thaw cycles.",
    factNugget:
      "Backyard Bobby's has installed driveways across Annapolis, Severna Park, Crofton, Pasadena, and throughout Anne Arundel County — each one excavated to full depth with compacted aggregate base layers and drainage grading that's engineered to last 20–30 years. Licensed MHIC #05-163777. Installation takes 2–5 days; we offer asphalt, poured concrete, and interlocking paver options to fit a range of budgets.",
    serviceOffers: [
      { name: "Asphalt Driveway Installation", description: "Hot-mix asphalt driveways with commercial paver equipment and compacted aggregate base" },
      { name: "Concrete Driveway Installation", description: "Poured and reinforced concrete driveways with proper drainage pitch" },
      { name: "Paver Driveway Installation", description: "Interlocking paver driveways with screeded sand bed and edge restraints" },
      { name: "Driveway Extension & Widening", description: "Extending or widening existing driveways to add parking capacity" },
      { name: "Driveway Replacement", description: "Full tear-out and replacement of damaged or deteriorating driveways" },
    ],
    intro: [
      "Your driveway is the first thing people see when they pull up to your house—and the surface you drive over every single day. A cracked, uneven, or sinking driveway doesn't just look bad; it damages tires, creates trip hazards, and tanks your curb appeal when it's time to sell. In Anne Arundel County, where temperatures swing from the 90s in summer to the teens in winter, a driveway that wasn't built with the right base will crack and heave within a few years. Doing it right the first time saves you thousands down the road.",
      "At Backyard Bobby's, every driveway starts below the surface. We excavate to the proper depth, install compacted gravel base layers, and ensure drainage slopes water away from your home and garage. Only then do we install your chosen material—whether that's hot-mix asphalt, poured concrete, or interlocking pavers. It's the unglamorous prep work that makes a driveway last 20 to 30 years instead of 5.",
      "We've installed driveways across Annapolis, Severna Park, Crofton, Pasadena, and throughout Anne Arundel County. Whether you're replacing a tired surface, extending an existing driveway, or building from scratch on new construction, we'll walk you through material options, give you an honest price, and get the job done on schedule.",
    ],
    benefits: [
      { title: "Proper Base Preparation", description: "We excavate to full depth and install compacted aggregate base layers. This is the single biggest factor in whether a driveway lasts 5 years or 25—and it's where most contractors cut corners." },
      { title: "Freeze-Thaw Durability", description: "Maryland's winters are brutal on driveways. Our drainage grading and base compaction prevent water from pooling underneath the surface, which is what causes the cracking and heaving you see on poorly built driveways." },
      { title: "Multiple Material Options", description: "Choose from hot-mix asphalt for affordability, poured concrete for longevity, stamped concrete for style, or interlocking pavers for a premium look. We'll help you pick the right material for your budget and aesthetic." },
      { title: "Curb Appeal That Sells", description: "Real estate agents say the driveway is one of the top five features buyers notice. A clean, well-installed driveway can add thousands to your home's perceived value in competitive Anne Arundel County neighborhoods." },
      { title: "Grading & Drainage Built In", description: "Every driveway we install is graded to move stormwater away from your foundation. Proper pitch means no puddles, no ice sheets in winter, and no water creeping toward your garage or basement." },
      { title: "Licensed & Insured", description: "We carry full liability insurance, hold MHIC license #05-163777, and pull proper county permits when required. You're protected from start to finish." },
    ],
    process: [
      { step: 1, title: "Assessment & Design", description: "We measure your driveway area, evaluate the existing surface and soil conditions, discuss material preferences and budget, and flag any drainage or grading concerns. You'll receive a detailed written estimate with material specs and a project timeline." },
      { step: 2, title: "Excavation & Base Prep", description: "Our crew removes the old surface (if applicable), excavates to the required depth, and installs layers of compacted aggregate. We grade the subbase for proper drainage pitch and compact everything to engineering specs before any paving material goes down." },
      { step: 3, title: "Material Installation", description: "Depending on your choice, we lay hot-mix asphalt with a commercial paver, pour and screed concrete with reinforcement, or set interlocking pavers on a screeded sand bed. Every step follows manufacturer and industry standards for thickness and coverage." },
      { step: 4, title: "Finishing & Sealing", description: "We trim and clean all edges, apply sealant where appropriate, and install any apron transitions to the street. You'll get a walkthrough of the finished driveway plus care instructions so you know exactly when to seal-coat and how to maintain it for decades." },
    ],
    faqs: [
      { question: "What's the best driveway material for Maryland weather?", answer: "Concrete and asphalt both perform well when installed on a proper base. Asphalt is more forgiving with minor ground movement and costs less upfront. Concrete lasts longer and requires less maintenance. Pavers offer the most visual appeal and are individually replaceable if damaged. We help you weigh the trade-offs during the estimate." },
      { question: "How long does a driveway installation take?", answer: "Most residential driveways take 2 to 5 days depending on the size and material. Asphalt is the fastest—often done in 2 days. Concrete requires cure time of about a week before you can drive on it. Paver driveways take 3 to 5 days for a standard two-car layout." },
      { question: "Do I need a permit for a new driveway in Anne Arundel County?", answer: "In most cases, yes—especially if you're changing the driveway footprint, adding impervious surface, or modifying the curb cut. We handle the permit application as part of the project so you don't have to deal with county paperwork." },
      { question: "How much does a new driveway cost?", answer: "A standard two-car asphalt driveway in Anne Arundel County typically runs $4,000 to $8,000. Concrete driveways range from $6,000 to $14,000. Paver driveways start around $10,000 and go up based on pattern and material. We provide exact pricing after measuring your specific project." },
      { question: "Can you widen or extend my existing driveway?", answer: "Absolutely. We regularly extend driveways to add parking space or widen narrow lanes. We match the existing material when possible, or we can overlay or replace the entire surface for a seamless look." },
      { question: "How soon can I drive on my new driveway?", answer: "Asphalt driveways can handle light traffic within 2 to 3 days and full use within a week. Concrete driveways need about 7 days to cure before vehicle traffic. Paver driveways are ready to drive on immediately after installation." },
    ],
    relatedServices: [
      { title: "Stamped Concrete", slug: "stamped-concrete" },
      { title: "Hardscaping", slug: "hardscaping" },
      { title: "Excavation & Demolition", slug: "excavation-and-demolition" },
    ],
    galleryCategory: "Driveway Installation",
  },

  // ── Gravel Pads & Concrete Foundations ────────────────────────────────────
  "gravel-pads-and-concrete-foundations": {
    title: "Gravel Pads & Concrete Foundations",
    slug: "gravel-pads-and-concrete-foundations",
    heroImage: "/images/gravel-pad-shed-foundation-01.jpeg",
    heroAlt: "Gravel pad foundation installed by Backyard Bobby's for shed in Anne Arundel County",
    headline: "Solid Foundations for Sheds, Garages & Outdoor Structures",
    subheadline:
      "A level, properly drained foundation is the difference between a structure that lasts decades and one that shifts, cracks, and sinks. We build both gravel pads and poured concrete foundations that stand the test of time.",
    factNugget:
      "Backyard Bobby's has installed hundreds of gravel pads and concrete foundations across Annapolis, Pasadena, Crofton, Severna Park, and surrounding communities — each one laser-leveled and built with geotextile fabric and compacted crushed stone engineered for local soil conditions. Licensed MHIC #05-163777. Gravel pads typically install in 1–2 days starting around $1,500; concrete slabs take 2–3 days plus cure time starting around $3,500.",
    serviceOffers: [
      { name: "Gravel Pad Installation", description: "Compacted crushed stone pads for sheds, hot tubs, and outdoor structures" },
      { name: "Concrete Slab Foundation", description: "Poured concrete foundations with rebar reinforcement for garages, ADUs, and heavy structures" },
      { name: "Hot Tub Pad Installation", description: "Level, load-rated pads sized for spa and hot tub placement" },
      { name: "Generator Pad Installation", description: "Compact concrete or gravel pads for whole-home generator systems" },
    ],
    intro: [
      "That new shed, detached garage, hot tub, or generator needs a solid base — and in Anne Arundel County, where clay soils shift and water tables run high, cutting corners on the foundation is a recipe for problems. A structure placed on bare ground or a poorly prepared pad will settle unevenly, trap moisture underneath, and start causing headaches within a year or two.",
      "Backyard Bobby's builds gravel pads and poured concrete foundations engineered for the specific conditions on your property. We evaluate your soil, assess drainage, and build a base that distributes weight evenly, sheds water away from your structure, and stays level through Maryland's freeze-thaw cycles. Whether you need a simple 10x12 gravel pad for a prefab shed or a full concrete slab for a two-car garage, we handle the complete process.",
      "We've installed hundreds of foundation pads across Annapolis, Pasadena, Crofton, Severna Park, and the surrounding area. Every one of them started with proper site evaluation and ended with a surface you could trust to support your investment for the long haul.",
    ],
    benefits: [
      { title: "Gravel & Concrete Expertise", description: "We build both types of foundations and can recommend which is right for your project. Gravel pads are ideal for sheds and lighter structures; concrete is better for garages, ADUs, and heavy equipment. We'll explain the trade-offs clearly." },
      { title: "Proper Drainage Built In", description: "Every pad we build includes a drainage plan. Gravel pads use perimeter grading and compacted stone that lets water pass through. Concrete slabs get slope built into the pour and drainage channels where needed. No standing water, no moisture damage." },
      { title: "Engineered for Local Soil", description: "Anne Arundel County soil varies wildly — heavy clay in Crofton, sandy loam near the Bay, and everything in between. We adjust base depth, material selection, and compaction technique to match what's actually under your yard." },
      { title: "Level & Square Every Time", description: "An out-of-level pad means doors that won't close, walls that don't align, and floors that puddle. We use laser levels and check for square at every stage to guarantee your structure sits perfectly flat." },
      { title: "Sized for Any Structure", description: "From a compact 8x10 hot tub pad to a 24x30 garage foundation, we custom-build to your exact dimensions. We also account for overhangs, door swings, and access paths so the finished pad works for the way you'll actually use it." },
      { title: "Seamless Project Coordination", description: "If your shed, garage, or ADU is being delivered or built after the pad, we coordinate timing so the foundation is cured and ready. Since we also handle excavation and construction, there's no finger-pointing between contractors." },
    ],
    process: [
      { step: 1, title: "Site Evaluation & Measurements", description: "We visit your property, confirm exact pad dimensions based on your structure specs, evaluate soil type and drainage patterns, and identify the best placement. We account for setback requirements, access for delivery trucks, and proximity to utilities." },
      { step: 2, title: "Ground Preparation & Grading", description: "We excavate the area to the correct depth — typically 6 to 8 inches for gravel pads, deeper for concrete — strip away topsoil and organic material, and grade the subsoil to create proper drainage slope. This step prevents future settling and water problems." },
      { step: 3, title: "Base Material & Compaction", description: "For gravel pads, we lay geotextile fabric to prevent weed growth and soil mixing, then build up layers of crushed stone — compacting each lift with a plate compactor for maximum stability. For concrete, we set forms, lay compacted gravel sub-base, add rebar or wire mesh reinforcement, and pour to the specified thickness." },
      { step: 4, title: "Final Surface & Drainage Verification", description: "We verify the finished surface is dead level (or properly sloped for drainage), check all edges and corners for square, and confirm the pad meets the specs for your structure. For concrete, we handle proper finishing and curing. We leave the site clean and ready for your structure delivery or next build phase." },
    ],
    faqs: [
      { question: "Should I get a gravel pad or a concrete foundation for my shed?", answer: "For most prefab and kit sheds under about 200 square feet, a properly built gravel pad is the best choice — it's more affordable, drains naturally, and is plenty strong for the load. For larger sheds, garages, or permanent structures, a concrete slab provides superior strength and longevity. We'll recommend the right option based on your structure's size, weight, and intended use." },
      { question: "How thick does a gravel pad need to be?", answer: "We typically build gravel pads 4 to 6 inches thick with compacted crushed stone (after excavating and removing topsoil). For heavier structures or areas with soft soil, we may increase that to 8 inches. The pad also extends 1 to 2 feet beyond the structure on all sides for drainage and stability." },
      { question: "Do I need a permit for a shed pad or concrete slab in Anne Arundel County?", answer: "The pad itself generally doesn't require a separate permit, but the structure you're placing on it may. Sheds over 200 square feet, any structure with electrical or plumbing, and detached garages typically need permits in Anne Arundel County. We can advise you during the estimate and help with permitting if needed." },
      { question: "How long does it take to install a gravel pad?", answer: "Most residential gravel pads take 1 to 2 days — one day for excavation and ground prep, and a second day for stone placement and compaction. Concrete foundations take 2 to 3 days for prep and pour, plus 5 to 7 days of curing time before your structure can be placed on it." },
      { question: "Will a gravel pad sink or shift over time?", answer: "Not if it's built correctly. The key is proper excavation depth, geotextile fabric beneath the stone, the right type of crushed stone (not round river rock), and thorough compaction. We compact in lifts and verify the finished surface with a laser level. Our pads stay stable for years." },
      { question: "Can you build a foundation on a sloped lot?", answer: "Yes. Sloped lots are common across Anne Arundel County, and we handle them regularly. Depending on the slope, we may need to do more excavation on the high side and build up a retaining edge on the low side. For steeper grades, a concrete foundation with a step-down design may be the best approach. We'll evaluate the slope during your site visit and recommend the most cost-effective solution." },
    ],
    relatedServices: [
      { title: "Excavation & Demolition", slug: "excavation-and-demolition" },
      { title: "Stamped Concrete", slug: "stamped-concrete" },
      { title: "Accessory Dwelling Units", slug: "accessory-dwelling-units" },
      { title: "Hardscaping", slug: "hardscaping" },
    ],
    galleryCategory: "Gravel Pads & Concrete Foundations",
  },

  // ── Decks ─────────────────────────────────────────────────────────────────
  decks: {
    title: "Decks",
    slug: "decks",
    heroImage: "/images/wood-deck-construction-01.webp",
    heroAlt: "Custom wood deck with railing built by Backyard Bobby's in Anne Arundel County",
    headline: "Custom Decks That Turn Your Backyard Into a Destination",
    subheadline:
      "From intimate elevated platforms to full outdoor living spaces with built-in seating, we design and build decks that stand up to Maryland's humidity, rain, and snow—and make your neighbors jealous.",
    factNugget:
      "Backyard Bobby's builds custom decks across 19 Anne Arundel County communities using stainless steel fasteners and pressure-treated framing rated for ground contact — materials chosen specifically for the Chesapeake Bay region's humidity and salt air. Licensed MHIC #05-163777, with all county permits and inspections handled in-house. A typical 350 sq ft deck takes 1–2 weeks to build; installed costs range from $30–$75 per square foot depending on material.",
    serviceOffers: [
      { name: "Composite Deck Building", description: "Trex, TimberTech, and Azek composite deck construction with manufacturer warranty" },
      { name: "Pressure-Treated Wood Decks", description: "Traditional wood deck building with pressure-treated pine or cedar" },
      { name: "Multi-Level Deck Design", description: "Custom multi-level and wraparound deck layouts with built-in seating and planters" },
      { name: "Deck Board Replacement", description: "Re-decking with new boards on structurally sound existing frames" },
      { name: "Pergola & Shade Structure Integration", description: "Pergolas and shade structures built into new or existing deck designs" },
    ],
    intro: [
      "A great deck changes how you use your home. It's where Saturday morning coffee happens, where the grill lives from April through October, and where your kids actually want to hang out instead of staring at screens. In Anne Arundel County, where the weather gives you a solid eight months of outdoor living, a well-built deck is one of the highest-return improvements you can make—both in daily enjoyment and at resale. Remodeling Magazine's Cost vs. Value report consistently ranks deck additions among the top ROI projects nationwide.",
      "At Backyard Bobby's, we build decks that are engineered for the Chesapeake Bay region. That means pressure-treated framing rated for ground contact, stainless steel fasteners that won't streak, and decking materials chosen specifically for Maryland's humidity and UV exposure. Whether you want the warmth of natural hardwood, the low maintenance of composite, or the premium feel of capped PVC, we'll help you pick the right material and design a layout that fits your house, your yard, and how you actually live.",
      "We handle everything from the initial design through county permits, construction, and final inspection. Our builds meet or exceed Anne Arundel County's structural and safety codes, and we stand behind our work. If you're ready to stop looking at your backyard and start living in it, let's talk.",
    ],
    benefits: [
      { title: "Built for Maryland Weather", description: "We use materials and fasteners rated for the Chesapeake Bay climate—high humidity, heavy rain, freeze-thaw cycles, and intense summer UV. Your deck won't warp, rot, or fade like the bargain builds you see falling apart after three years." },
      { title: "Composite & Wood Options", description: "Choose from Trex, TimberTech, or Azek composites for near-zero maintenance, or go with pressure-treated pine, cedar, or ipe hardwood for a natural look. We'll lay out the cost, lifespan, and upkeep differences so you make an informed choice." },
      { title: "Custom Designs, Not Cookie-Cutters", description: "Multi-level layouts, wraparound designs, built-in benches, planter boxes, pergola integration, and cable railing—we design around your home's architecture and your family's lifestyle, not a one-size-fits-all template." },
      { title: "Strong Return on Investment", description: "Deck additions consistently recoup 65–75% of their cost at resale in the Mid-Atlantic market. In desirable Anne Arundel County neighborhoods like Severna Park and Annapolis, outdoor living space is a major selling point." },
      { title: "Code-Compliant Construction", description: "Every deck meets Anne Arundel County's building codes for structural load, railing height, stair dimensions, and ledger board attachment. We pull permits, schedule inspections, and make sure everything passes the first time." },
      { title: "Clean, Respectful Job Sites", description: "We protect your landscaping, clean up every day, and haul away all debris when the job is done. Your yard will look better after we leave—not like a construction zone." },
    ],
    process: [
      { step: 1, title: "Design Consultation", description: "We visit your home, measure the build area, evaluate the attachment points on your house, and discuss your vision—size, shape, features, and materials. You'll get a design concept and a detailed estimate with no obligation." },
      { step: 2, title: "Permits & Material Selection", description: "We prepare structural drawings, submit the permit application to Anne Arundel County, and finalize your material choices. Once the permit is approved, we order materials and lock in your build date so there are no surprises." },
      { step: 3, title: "Build & Framing", description: "Our crew sets the posts, installs the ledger board and beams, and frames the entire deck structure. We use hot-dipped galvanized or stainless hardware at every connection point. Framing is inspected before we move to decking." },
      { step: 4, title: "Finish & Inspection", description: "We install the decking boards, railings, stairs, and any custom features like built-in seating or lighting. The county inspector signs off on the completed structure, and we do a final walkthrough with you to make sure every detail is right." },
    ],
    faqs: [
      { question: "Should I go with composite or pressure-treated wood?", answer: "Composite costs more upfront but requires almost no maintenance—no staining, no sealing, no sanding. Pressure-treated wood is significantly cheaper to install but needs staining or sealing every 1 to 2 years to prevent rot and graying. For most Maryland homeowners who don't want weekend maintenance, composite pays for itself within 5 to 7 years." },
      { question: "How long does it take to build a deck?", answer: "A standard 300–400 square foot deck takes about 1 to 2 weeks from the start of construction. Larger or multi-level decks with custom features can take 2 to 3 weeks. Permitting adds 2 to 6 weeks before construction begins, depending on the county's review schedule." },
      { question: "Do I need a permit to build a deck in Anne Arundel County?", answer: "Yes. Anne Arundel County requires a building permit for any attached or freestanding deck. The permit ensures the structure meets code for safety and structural integrity. We handle the entire permit process as part of your project." },
      { question: "How much does a new deck cost in Maryland?", answer: "A pressure-treated wood deck typically runs $30 to $45 per square foot installed. Composite decks range from $45 to $75 per square foot depending on the brand and railing style. A typical 350 square foot deck costs between $10,500 and $26,000. We provide exact pricing after the on-site consultation." },
      { question: "Can you replace my old deck boards without rebuilding the frame?", answer: "Sometimes. If the existing frame is structurally sound and meets current code, we can remove the old decking and install new boards on top. We inspect every joist, beam, and connection before making that call. If the frame has rot or doesn't meet code, we'll recommend a full rebuild for your safety." },
      { question: "What's the best time of year to build a deck in Maryland?", answer: "Spring and fall are ideal for construction comfort, but we build year-round. The best strategy is to start the design and permitting process in late winter so construction can begin as soon as the weather breaks. That way you're enjoying your new deck by Memorial Day instead of waiting until fall." },
    ],
    relatedServices: [
      { title: "Hardscaping", slug: "hardscaping" },
      { title: "Fencing", slug: "fencing" },
      { title: "Stamped Concrete", slug: "stamped-concrete" },
      { title: "Roofing", slug: "roofing" },
    ],
    galleryCategory: "Decks",
  },
};

/** Slugs that have a fully built-out ad landing page (`/lp/[slug]`). */
export const AD_LANDING_SLUGS = Object.keys(SERVICE_CONTENT);
