export interface QuizOption {
  label: string;
  emoji: string;
  image?: string;
}

export interface QuizQuestion {
  question: string;
  subtext: string;
  options: QuizOption[];
}

// ── Shared questions reused across services ──────────────────────────────────

const DECISION_STAGE_QUESTION: QuizQuestion = {
  question: "Where are you in your decision process?",
  subtext:
    "Bobby is happy to answer questions at any stage — no pressure, no pushy sales calls. Just honest advice from someone who knows the work.",
  options: [
    { label: "Just starting to research", emoji: "🔍" },
    { label: "Comparing a few contractors", emoji: "⚖️" },
    { label: "Ready to hire the right person", emoji: "🏆" },
    { label: "Need to loop in my partner", emoji: "👫" },
  ],
};

// ── Quiz data per service (8 questions each) ───────────────────────────────────
// Order: type → size → material → situational #1 → situational #2 → budget → decision stage → timeline
// Timeline is always LAST so extractTimeframe() works correctly.

export const QUIZ_DATA: Record<string, QuizQuestion[]> = {
  decks: [
    {
      question: "What kind of deck are you envisioning?",
      subtext:
        "Bobby has built every style — from simple weekend retreats to full outdoor living rooms. There's no project he hasn't tackled.",
      options: [
        { label: "Brand new deck", emoji: "🏗️" },
        { label: "Replace existing", emoji: "🔄" },
        { label: "Deck + pergola", emoji: "🌿" },
        { label: "Expand existing", emoji: "➕" },
      ],
    },
    {
      question: "How big do you want to go?",
      subtext:
        "Bobby's estimates are always honest and transparent — no surprise fees, no upselling. Just the right deck for your space.",
      options: [
        { label: "Under 200 sq ft", emoji: "🏠" },
        { label: "200–400 sq ft", emoji: "🎉" },
        { label: "400+ sq ft", emoji: "🔥" },
        { label: "Not sure yet", emoji: "🤔" },
      ],
    },
    {
      question: "What material are you leaning toward?",
      subtext:
        "Bobby will walk you through every option in person — composite, wood, hardwood — and help you pick what fits your budget and lifestyle.",
      options: [
        { label: "Composite (low-maintenance)", emoji: "✨" },
        { label: "Pressure-treated wood", emoji: "🌲" },
        { label: "Premium hardwood", emoji: "👑" },
        { label: "Help me decide", emoji: "💭" },
      ],
    },
    {
      question: "How high off the ground will the deck be?",
      subtext:
        "Elevation determines structural requirements, footing depth, and whether a permit is required — Bobby designs everything to code so there are never any surprises.",
      options: [
        { label: "At grade / ground level", emoji: "🌿" },
        { label: "1–3 feet off the ground", emoji: "📐" },
        { label: "4+ feet / elevated or 2nd story", emoji: "🏔️" },
        { label: "Depends on the design", emoji: "🤔" },
      ],
    },
    {
      question: "What is the deck connecting to?",
      subtext:
        "Attaching to brick or stucco requires special ledger flashing and waterproofing — Bobby scopes this correctly upfront so your estimate is accurate from day one.",
      options: [
        { label: "House wall — standard siding", emoji: "🏠" },
        { label: "House wall — brick or stucco", emoji: "🧱" },
        { label: "Freestanding / floating deck", emoji: "🏗️" },
        { label: "Not sure yet", emoji: "🤔" },
      ],
    },
    {
      question: "What's your rough budget in mind?",
      subtext:
        "This helps Bobby prepare an estimate that actually fits your situation. There's no wrong answer — he works at every price point.",
      options: [
        { label: "Under $10,000", emoji: "💵" },
        { label: "$10,000–$25,000", emoji: "💰" },
        { label: "$25,000–$50,000", emoji: "💎" },
        { label: "Still figuring it out", emoji: "🤔" },
      ],
    },
    DECISION_STAGE_QUESTION,
    {
      question: "When do you want to get started?",
      subtext:
        "Bobby's calendar fills fast — especially in spring and summer. The sooner you lock in an estimate, the better your spot.",
      options: [
        { label: "ASAP — I'm ready!", emoji: "⚡" },
        { label: "Within 3 months", emoji: "📅" },
        { label: "This summer", emoji: "☀️" },
        { label: "Just exploring", emoji: "🔍" },
      ],
    },
  ],

  fencing: [
    {
      question: "What kind of fence are you looking for?",
      subtext:
        "Bobby's crew installs every fence style — clean lines, tight posts, and a finished look that lasts for years.",
      options: [
        { label: "Privacy fence", emoji: "🔒" },
        { label: "Picket / decorative", emoji: "🏡" },
        { label: "Chain-link", emoji: "⛓️" },
        { label: "Pet / dog fence", emoji: "🐾" },
      ],
    },
    {
      question: "How much fencing do you need?",
      subtext:
        "Bobby prices every job fairly — transparent quotes with zero hidden fees. You'll know exactly what you're paying before any work starts.",
      options: [
        { label: "Under 100 ft", emoji: "📏" },
        { label: "100–250 ft", emoji: "📐" },
        { label: "250–500 ft", emoji: "🏘️" },
        { label: "500+ ft", emoji: "🌄" },
      ],
    },
    {
      question: "What material are you thinking?",
      subtext:
        "Bobby only installs materials built to survive Maryland winters year after year — no cheap shortcuts.",
      options: [
        { label: "Wood", emoji: "🌲" },
        { label: "Vinyl", emoji: "✨" },
        { label: "Aluminum", emoji: "🔧" },
        { label: "Chain-link", emoji: "⛓️" },
      ],
    },
    {
      question: "What's the terrain like along the fence line?",
      subtext:
        "Sloped or rocky ground requires extra posts, stepped sections, and more digging — Bobby scopes this accurately so there are no surprise costs on job day.",
      options: [
        { label: "Flat — pretty level all around", emoji: "🌿" },
        { label: "Gentle slope", emoji: "📐" },
        { label: "Steep slope or grade changes", emoji: "⛰️" },
        { label: "Rocky ground or tree roots", emoji: "🪨" },
      ],
    },
    {
      question: "Is there an existing fence to remove first?",
      subtext:
        "Old fence removal — especially concrete-footed posts — is its own scope. Bobby's crew handles it cleanly so you don't have to coordinate a separate haul-away.",
      options: [
        { label: "No existing fence — fresh install", emoji: "✅" },
        { label: "Yes — needs to come down first", emoji: "🔨" },
        { label: "Partial removal (some sections)", emoji: "♻️" },
        { label: "Not sure", emoji: "🤔" },
      ],
    },
    {
      question: "What's your rough budget in mind?",
      subtext:
        "Bobby's quotes are always competitive and itemized — you'll see exactly what you're getting for every dollar.",
      options: [
        { label: "Under $3,000", emoji: "💵" },
        { label: "$3,000–$8,000", emoji: "💰" },
        { label: "$8,000–$20,000", emoji: "💎" },
        { label: "Still figuring it out", emoji: "🤔" },
      ],
    },
    DECISION_STAGE_QUESTION,
    {
      question: "When are you hoping to get this done?",
      subtext:
        "Bobby's team is in high demand — the best way to guarantee your spot is to reach out now.",
      options: [
        { label: "ASAP — I'm ready!", emoji: "⚡" },
        { label: "Within 3 months", emoji: "📅" },
        { label: "This summer", emoji: "☀️" },
        { label: "Just exploring", emoji: "🔍" },
      ],
    },
  ],

  hardscaping: [
    {
      question: "What do you have in mind?",
      subtext:
        "Bobby transforms ordinary backyards into stunning outdoor spaces that add real value and beauty to your home.",
      options: [
        { label: "Patio", emoji: "🏖️" },
        { label: "Retaining wall", emoji: "🧱" },
        { label: "Walkway / steps", emoji: "👣" },
        { label: "Multiple items", emoji: "✨" },
      ],
    },
    {
      question: "Approximately how large?",
      subtext:
        "Bobby handles everything from small accent features to complete backyard overhauls — each one built with the same care.",
      options: [
        { label: "Small (under 200 sq ft)", emoji: "📐" },
        { label: "Medium (200–500 sq ft)", emoji: "🏡" },
        { label: "Large (500+ sq ft)", emoji: "🔥" },
        { label: "Not sure yet", emoji: "🤔" },
      ],
    },
    {
      question: "What material are you drawn to?",
      subtext:
        "Bobby works with every material and will personally recommend what looks best, lasts longest, and fits your budget.",
      options: [
        { label: "Pavers / brick", emoji: "🧱" },
        { label: "Natural stone", emoji: "🪨" },
        { label: "Concrete", emoji: "⬜" },
        { label: "Not sure yet", emoji: "💭" },
      ],
    },
    {
      question: "What's the slope or drainage situation?",
      subtext:
        "Standing water or a steep grade often requires drainage work before the surface goes in — Bobby identifies this upfront so your project is built on solid, dry ground.",
      options: [
        { label: "Mostly flat — good drainage", emoji: "🌿" },
        { label: "Moderate slope", emoji: "📐" },
        { label: "Steep slope / retaining wall needed", emoji: "⛰️" },
        { label: "Standing water / drainage issues", emoji: "💧" },
      ],
    },
    {
      question: "Is there existing hardscape to remove first?",
      subtext:
        "Breaking out old concrete or pulling up pavers is a separate phase — Bobby's crew handles it all and hauls everything away so your yard is clean and prepped.",
      options: [
        { label: "Starting fresh — nothing to remove", emoji: "✅" },
        { label: "Old concrete to break up and haul", emoji: "🔨" },
        { label: "Existing pavers or stone to pull up", emoji: "🧱" },
        { label: "Not sure what's under there", emoji: "🤔" },
      ],
    },
    {
      question: "What's your rough budget in mind?",
      subtext:
        "This helps Bobby show up prepared with the right design ideas and material options — no wasted time for either of you.",
      options: [
        { label: "Under $5,000", emoji: "💵" },
        { label: "$5,000–$15,000", emoji: "💰" },
        { label: "$15,000–$35,000", emoji: "💎" },
        { label: "Still figuring it out", emoji: "🤔" },
      ],
    },
    DECISION_STAGE_QUESTION,
    {
      question: "When are you looking to start?",
      subtext:
        "Bobby's schedule books out fast in spring and summer — reaching out early gets you the best availability.",
      options: [
        { label: "ASAP — I'm ready!", emoji: "⚡" },
        { label: "Within 3 months", emoji: "📅" },
        { label: "This summer", emoji: "☀️" },
        { label: "Just exploring", emoji: "🔍" },
      ],
    },
  ],

  "stamped-concrete": [
    {
      question: "What's the stamped concrete for?",
      subtext:
        "Bobby creates stunning surfaces that look exactly like natural stone — at a fraction of the cost, sealed to last decades.",
      options: [
        { label: "Patio", emoji: "🏖️" },
        { label: "Driveway", emoji: "🚗" },
        { label: "Walkway", emoji: "👣" },
        { label: "Pool deck", emoji: "🏊" },
      ],
    },
    {
      question: "Approximate size?",
      subtext:
        "Bobby's crew brings the same attention to detail and craftsmanship to every project, big or small.",
      options: [
        { label: "Under 300 sq ft", emoji: "📐" },
        { label: "300–600 sq ft", emoji: "🏡" },
        { label: "600+ sq ft", emoji: "🔥" },
        { label: "Not sure yet", emoji: "🤔" },
      ],
    },
    {
      question: "What pattern style are you drawn to?",
      subtext:
        "Bobby brings physical stamp samples to your estimate so you can see and feel the texture — but this gives him a head start on what to bring.",
      options: [
        { label: "Ashlar Slate", emoji: "🪨", image: "/images/stamped-ashlar-slate.jpg" },
        { label: "Random Stone", emoji: "🪨", image: "/images/stamped-random-stone.jpg" },
        { label: "London Cobblestone", emoji: "🏛️", image: "/images/stamped-london-cobblestone.jpg" },
        { label: "Herringbone Brick", emoji: "🧱", image: "/images/stamped-herringbone-brick.png" },
        { label: "Basketweave Brick", emoji: "🧱", image: "/images/stamped-basketweave-brick.jpg" },
        { label: "Wood Plank", emoji: "🌿", image: "/images/stamped-wood-plank.jpg" },
        { label: "Mexican Tile", emoji: "🏛️", image: "/images/stamped-mexican-tile.jpg" },
        { label: "Cesar Stone", emoji: "🪨", image: "/images/stamped-cesar-stone.jpg" },
        { label: "Royal Ashlar", emoji: "🪨", image: "/images/stamped-royal-ashlar.jpg" },
        { label: "18×18 Slate", emoji: "⬜", image: "/images/stamped-18x18-slate.png" },
        { label: "Not sure — show me options", emoji: "💭" },
      ],
    },
    {
      question: "Is there existing concrete to deal with?",
      subtext:
        "Bobby's team handles demo and disposal — you don't have to coordinate anything. They leave the site cleaner than they found it.",
      options: [
        { label: "Starting fresh", emoji: "✨" },
        { label: "Existing needs removal", emoji: "🔨" },
        { label: "Overlaying existing", emoji: "📋" },
        { label: "Not sure", emoji: "💭" },
      ],
    },
    {
      question: "What's the sun exposure and primary use?",
      subtext:
        "Pool decks require anti-slip texture by code, and full-sun surfaces need UV-rated sealers — Bobby specs the right materials for your exact conditions.",
      options: [
        { label: "Full sun most of the day", emoji: "☀️" },
        { label: "Mix of sun and shade", emoji: "🌤️" },
        { label: "Mostly shaded (pergola / trees)", emoji: "🌿" },
        { label: "Pool deck — needs anti-slip finish", emoji: "🏊" },
      ],
    },
    {
      question: "How detailed do you want the pattern?",
      subtext:
        "Bobby brings physical stamp samples to your estimate so you can see and feel exactly what your finished surface will look like — no guessing.",
      options: [
        { label: "Simple / single-color", emoji: "✅" },
        { label: "Medium detail (brick, flagstone)", emoji: "🧱" },
        { label: "High detail (cobblestone, slate, wood)", emoji: "🏛️" },
        { label: "Help me decide", emoji: "💭" },
      ],
    },
    {
      question: "What's your rough budget in mind?",
      subtext:
        "Bobby only uses premium sealers and materials — and he'll make sure you get the most out of every dollar.",
      options: [
        { label: "Under $5,000", emoji: "💵" },
        { label: "$5,000–$12,000", emoji: "💰" },
        { label: "$12,000–$25,000", emoji: "💎" },
        { label: "Still figuring it out", emoji: "🤔" },
      ],
    },
    DECISION_STAGE_QUESTION,
    {
      question: "When do you want to start?",
      subtext:
        "Bobby books fast — especially in warm months. Get your estimate locked in today before the calendar fills.",
      options: [
        { label: "ASAP — I'm ready!", emoji: "⚡" },
        { label: "Within 3 months", emoji: "📅" },
        { label: "This summer", emoji: "☀️" },
        { label: "Just exploring", emoji: "🔍" },
      ],
    },
  ],

  "patios-and-walkways": [
    {
      question: "What are we building?",
      subtext:
        "Patios, walkways, pool decks: Bobby builds them all, in every style. Pick what you have in mind and he'll take it from there.",
      options: [
        { label: "Patio", emoji: "🏖️" },
        { label: "Walkway / front entry", emoji: "👣" },
        { label: "Pool deck", emoji: "🏊" },
        { label: "More than one of these", emoji: "✨" },
      ],
    },
    {
      question: "Approximately how large?",
      subtext:
        "A rough guess is fine. Bobby measures everything precisely at your free estimate, and there's no wrong answer here.",
      options: [
        { label: "Under 200 sq ft", emoji: "📐" },
        { label: "200–500 sq ft", emoji: "🏡" },
        { label: "500+ sq ft", emoji: "🔥" },
        { label: "Not sure yet", emoji: "🤔" },
      ],
    },
    {
      question: "What surface are you leaning toward?",
      subtext:
        "Bobby installs every one of these, so you'll get an honest recommendation, not a sales pitch for whichever material a company happens to sell.",
      options: [
        { label: "Stamped concrete", emoji: "🪨" },
        { label: "Broom-finished concrete", emoji: "⬜" },
        { label: "Pavers / brick", emoji: "🧱" },
        { label: "Help me decide", emoji: "💭" },
      ],
    },
    {
      question: "Is there an existing surface to deal with?",
      subtext:
        "Bobby's crew handles tear-out, hauling, and disposal as part of the job, so you never have to coordinate a separate contractor.",
      options: [
        { label: "Starting fresh", emoji: "✨" },
        { label: "Old concrete to remove", emoji: "🔨" },
        { label: "Pavers or stone to pull up", emoji: "🧱" },
        { label: "Not sure", emoji: "🤔" },
      ],
    },
    {
      question: "What's the sun and use situation?",
      subtext:
        "Pool decks get a non-slip finish as standard, and full-sun surfaces call for lighter colors and UV-rated sealers. Bobby specs all of this for your exact conditions.",
      options: [
        { label: "Full sun most of the day", emoji: "☀️" },
        { label: "Mix of sun and shade", emoji: "🌤️" },
        { label: "Mostly shaded", emoji: "🌿" },
        { label: "Pool deck — needs anti-slip finish", emoji: "🏊" },
      ],
    },
    {
      question: "What's your rough budget in mind?",
      subtext:
        "This helps Bobby show up with the right options for your situation. There's no wrong answer, and he works at every price point.",
      options: [
        { label: "Under $5,000", emoji: "💵" },
        { label: "$5,000–$12,000", emoji: "💰" },
        { label: "$12,000–$25,000", emoji: "💎" },
        { label: "Still figuring it out", emoji: "🤔" },
      ],
    },
    DECISION_STAGE_QUESTION,
    {
      question: "When do you want to get started?",
      subtext:
        "Bobby's calendar fills fast in the warm months. The sooner you lock in your estimate, the better your spot in line.",
      options: [
        { label: "ASAP — I'm ready!", emoji: "⚡" },
        { label: "Within 3 months", emoji: "📅" },
        { label: "This summer", emoji: "☀️" },
        { label: "Just exploring", emoji: "🔍" },
      ],
    },
  ],

  "driveway-installation": [
    {
      question: "What type of driveway work do you need?",
      subtext:
        "Bobby has installed hundreds of driveways across Maryland — built right to handle our brutal freeze-thaw winters.",
      options: [
        { label: "New driveway", emoji: "🏗️" },
        { label: "Replace existing", emoji: "🔄" },
        { label: "Extend / widen", emoji: "↔️" },
        { label: "Repairs only", emoji: "🔧" },
      ],
    },
    {
      question: "What material are you considering?",
      subtext:
        "Bobby gives you an honest side-by-side comparison — no upselling, just the right material for your home and budget.",
      options: [
        { label: "Asphalt", emoji: "⬛" },
        { label: "Concrete", emoji: "⬜" },
        { label: "Pavers", emoji: "🧱" },
        { label: "Gravel", emoji: "🪨" },
      ],
    },
    {
      question: "How big is the driveway?",
      subtext:
        "Bobby ensures proper grading and drainage on every job — no puddles, no cracking, no callbacks a year later.",
      options: [
        { label: "1–2 car widths", emoji: "🚗" },
        { label: "3–4 car widths", emoji: "🚙" },
        { label: "Long (100+ ft)", emoji: "🛣️" },
        { label: "Not sure", emoji: "🤔" },
      ],
    },
    {
      question: "What's the ground like under the driveway area?",
      subtext:
        "Soft or wet soil in Maryland often requires extra base material before any surface goes down — Bobby identifies this during the estimate so nothing gets missed.",
      options: [
        { label: "Solid ground — drains well", emoji: "✅" },
        { label: "Low or wet area after rain", emoji: "💧" },
        { label: "Steep slope to manage", emoji: "📐" },
        { label: "Not sure — never dug it up", emoji: "🤔" },
      ],
    },
    {
      question: "How does the driveway connect to the road?",
      subtext:
        "A new curb cut requires a county permit and road department coordination — Bobby handles all of it so you don't have to navigate the process alone.",
      options: [
        { label: "Existing curb cut already in place", emoji: "✅" },
        { label: "No curb — straight street access", emoji: "🏘️" },
        { label: "New curb cut will be needed", emoji: "🏗️" },
        { label: "Not sure", emoji: "🤔" },
      ],
    },
    {
      question: "What's your rough budget in mind?",
      subtext:
        "Driveway costs vary a lot by material — Bobby will give you a clear breakdown so you can make the best choice.",
      options: [
        { label: "Under $5,000", emoji: "💵" },
        { label: "$5,000–$12,000", emoji: "💰" },
        { label: "$12,000–$25,000", emoji: "💎" },
        { label: "Still figuring it out", emoji: "🤔" },
      ],
    },
    DECISION_STAGE_QUESTION,
    {
      question: "When do you want this done?",
      subtext:
        "Bobby's schedule fills up fast — the sooner you get an estimate, the sooner you get on the calendar.",
      options: [
        { label: "ASAP — I'm ready!", emoji: "⚡" },
        { label: "Within 3 months", emoji: "📅" },
        { label: "This summer", emoji: "☀️" },
        { label: "Just exploring", emoji: "🔍" },
      ],
    },
  ],

  "gravel-pads-and-concrete-foundations": [
    {
      question: "What's the pad or foundation for?",
      subtext:
        "Bobby builds solid, properly drained bases that your structure will sit on confidently for decades.",
      options: [
        { label: "Shed", emoji: "🏚️" },
        { label: "Garage", emoji: "🏠" },
        { label: "Pool", emoji: "🏊" },
        { label: "Playground / equipment", emoji: "🎠" },
      ],
    },
    {
      question: "Approximate size?",
      subtext:
        "Bobby handles everything from small shed pads to full garage slabs — priced fairly, built to last.",
      options: [
        { label: "Small (under 200 sq ft)", emoji: "📐" },
        { label: "Medium (200–400 sq ft)", emoji: "🏡" },
        { label: "Large (400+ sq ft)", emoji: "🔥" },
        { label: "Not sure yet", emoji: "🤔" },
      ],
    },
    {
      question: "What surface type do you need?",
      subtext:
        "Bobby will recommend the right base for your structure and soil — no cutting corners on what goes underneath.",
      options: [
        { label: "Gravel pad", emoji: "🪨" },
        { label: "Concrete slab", emoji: "⬜" },
        { label: "Gravel + concrete", emoji: "✨" },
        { label: "Not sure yet", emoji: "💭" },
      ],
    },
    {
      question: "What's currently in that area?",
      subtext:
        "Knowing what needs to come out first lets Bobby schedule the right equipment and give you an accurate all-in price — no surprise add-ons after work starts.",
      options: [
        { label: "Clear and mostly level — ready to go", emoji: "✅" },
        { label: "Overgrown / needs clearing", emoji: "🌿" },
        { label: "Old shed or structure to remove", emoji: "🔨" },
        { label: "Not sure — needs a look", emoji: "🤔" },
      ],
    },
    {
      question: "Does water pool or drain poorly in that area?",
      subtext:
        "A wet site needs extra base depth, drainage fabric, and sometimes a perimeter drain — Bobby builds this in upfront so your pad stays level and dry for decades.",
      options: [
        { label: "Drains fine — no water issues", emoji: "✅" },
        { label: "Water pools there after rain", emoji: "💧" },
        { label: "Has had drainage problems nearby", emoji: "🔧" },
        { label: "Not sure / never noticed", emoji: "🤔" },
      ],
    },
    {
      question: "What's your rough budget in mind?",
      subtext:
        "Bobby is upfront about costs from the very first conversation — no surprises when the invoice arrives.",
      options: [
        { label: "Under $2,000", emoji: "💵" },
        { label: "$2,000–$6,000", emoji: "💰" },
        { label: "$6,000–$15,000", emoji: "💎" },
        { label: "Still figuring it out", emoji: "🤔" },
      ],
    },
    DECISION_STAGE_QUESTION,
    {
      question: "When do you want to get started?",
      subtext:
        "Bobby's concrete work is in high demand — get your estimate scheduled before the calendar closes out.",
      options: [
        { label: "ASAP — I'm ready!", emoji: "⚡" },
        { label: "Within 3 months", emoji: "📅" },
        { label: "This summer", emoji: "☀️" },
        { label: "Just exploring", emoji: "🔍" },
      ],
    },
  ],

  "accessory-dwelling-units": [
    {
      question: "What type of ADU are you planning?",
      subtext:
        "Bobby manages the entire ADU process — permits, foundation, framing, utilities, finish. One contractor, zero headaches.",
      options: [
        { label: "Detached cottage / studio", emoji: "🏡" },
        { label: "In-law suite", emoji: "👨‍👩‍👧" },
        { label: "Guest house", emoji: "🏠" },
        { label: "Garage conversion", emoji: "🔄" },
      ],
    },
    {
      question: "Approximate size?",
      subtext:
        "Bobby builds ADUs that feel like full homes — thoughtfully designed, code-compliant, and expertly crafted.",
      options: [
        { label: "Under 500 sq ft", emoji: "🏠" },
        { label: "500–800 sq ft", emoji: "🏡" },
        { label: "800+ sq ft", emoji: "🏘️" },
        { label: "Not sure yet", emoji: "🤔" },
      ],
    },
    {
      question: "What's the primary use?",
      subtext:
        "Understanding your goals helps Bobby design the ADU perfectly for how you'll actually live in and use it.",
      options: [
        { label: "Family / in-law housing", emoji: "👨‍👩‍👧" },
        { label: "Rental income", emoji: "💰" },
        { label: "Home office", emoji: "💻" },
        { label: "Guest accommodation", emoji: "🛏️" },
      ],
    },
    {
      question: "What utilities and features will the ADU need?",
      subtext:
        "Full plumbing and kitchen dramatically affect cost and permitting — Bobby lays out every option clearly before any plans are drawn.",
      options: [
        { label: "Basic — electric + heating/cooling", emoji: "⚡" },
        { label: "Full bathroom + kitchenette", emoji: "🛁" },
        { label: "Full kitchen + full bathroom", emoji: "🍳" },
        { label: "Not sure — want Bobby's input", emoji: "💭" },
      ],
    },
    {
      question: "Have you looked into zoning or HOA approval?",
      subtext:
        "Some properties in Anne Arundel County require a variance or impervious surface review — Bobby's team helps navigate the permitting process from the very first conversation.",
      options: [
        { label: "Yes — ADU is permitted here", emoji: "✅" },
        { label: "In early conversations with the county", emoji: "📋" },
        { label: "Haven't looked into it yet", emoji: "🤔" },
        { label: "Have concerns about HOA / zoning", emoji: "⚠️" },
      ],
    },
    {
      question: "What's your rough budget in mind?",
      subtext:
        "ADUs are a significant investment — Bobby will help you understand exactly what's possible at your budget before any plans are drawn.",
      options: [
        { label: "Under $75,000", emoji: "💵" },
        { label: "$75,000–$150,000", emoji: "💰" },
        { label: "$150,000–$250,000", emoji: "💎" },
        { label: "Still figuring it out", emoji: "🤔" },
      ],
    },
    DECISION_STAGE_QUESTION,
    {
      question: "What's your timeline?",
      subtext:
        "ADUs take planning — the earlier Bobby connects with you, the smoother and faster the entire process goes.",
      options: [
        { label: "ASAP — let's plan now", emoji: "⚡" },
        { label: "Within 6 months", emoji: "📅" },
        { label: "Next year", emoji: "🗓️" },
        { label: "Just exploring", emoji: "🔍" },
      ],
    },
  ],

  "excavation-and-demolition": [
    {
      question: "What do you need done?",
      subtext:
        "Bobby's crew handles the toughest site work in Maryland — professional equipment, clean execution, and a site ready for whatever comes next.",
      options: [
        { label: "Land clearing", emoji: "🌳" },
        { label: "Site grading", emoji: "📐" },
        { label: "Structure demolition", emoji: "🔨" },
        { label: "All of the above", emoji: "💪" },
      ],
    },
    {
      question: "How large is the area?",
      subtext:
        "Bobby walks every property before quoting — no guesswork, no surprises on the final bill.",
      options: [
        { label: "Small yard", emoji: "🏠" },
        { label: "Large yard / lot", emoji: "🏘️" },
        { label: "Multiple acres", emoji: "🌄" },
        { label: "Not sure", emoji: "🤔" },
      ],
    },
    {
      question: "Do you need debris hauled away?",
      subtext:
        "Bobby's team handles everything from demo to disposal — your site will be clean and ready when they leave.",
      options: [
        { label: "Yes — haul it all away", emoji: "🚛" },
        { label: "I'll handle the debris", emoji: "👋" },
        { label: "Partial hauling", emoji: "📦" },
        { label: "Not sure yet", emoji: "💭" },
      ],
    },
    {
      question: "Is there concrete, asphalt, or a foundation to demolish?",
      subtext:
        "Hard material demo requires different equipment and disposal — Bobby's team handles reinforced slabs, block foundations, and asphalt all the same.",
      options: [
        { label: "No hard surfaces — earth / vegetation only", emoji: "🌿" },
        { label: "Concrete slab or foundation", emoji: "⬜" },
        { label: "Asphalt surface", emoji: "⬛" },
        { label: "Mixed / not sure", emoji: "💭" },
      ],
    },
    {
      question: "What's happening on this site after the work?",
      subtext:
        "Knowing what comes next lets Bobby grade to the right spec, compact to the right depth, and leave the site perfectly staged for whatever follows.",
      options: [
        { label: "New construction (foundation, slab, etc.)", emoji: "🏗️" },
        { label: "Lawn, landscaping, or planting", emoji: "🌿" },
        { label: "Drainage correction / re-grading only", emoji: "💧" },
        { label: "Demolition only — no new build", emoji: "🔨" },
      ],
    },
    {
      question: "What's your rough budget in mind?",
      subtext:
        "Bobby's estimates are detailed and itemized — you'll know the cost of every phase before any equipment rolls in.",
      options: [
        { label: "Under $3,000", emoji: "💵" },
        { label: "$3,000–$8,000", emoji: "💰" },
        { label: "$8,000–$20,000", emoji: "💎" },
        { label: "Still figuring it out", emoji: "🤔" },
      ],
    },
    DECISION_STAGE_QUESTION,
    {
      question: "When do you need this completed?",
      subtext:
        "Excavation often needs permits and weather windows — reaching out early gives Bobby time to plan it perfectly.",
      options: [
        { label: "ASAP — I'm ready!", emoji: "⚡" },
        { label: "Within 3 months", emoji: "📅" },
        { label: "This summer", emoji: "☀️" },
        { label: "Just exploring", emoji: "🔍" },
      ],
    },
  ],

  roofing: [
    {
      question: "What kind of roofing work do you need?",
      subtext:
        "Bobby's roofing crew handles everything from emergency patch repairs to full tear-offs — fast response, done right the first time.",
      options: [
        { label: "Repair (leaks / damage)", emoji: "🔧" },
        { label: "Full replacement", emoji: "🏠" },
        { label: "New installation", emoji: "🏗️" },
        { label: "Inspection first", emoji: "🔍" },
      ],
    },
    {
      question: "How large is your home?",
      subtext:
        "Bobby provides detailed, honest quotes — you'll know exactly what you're getting before a single nail is driven.",
      options: [
        { label: "Under 1,500 sq ft", emoji: "🏠" },
        { label: "1,500–2,500 sq ft", emoji: "🏡" },
        { label: "2,500+ sq ft", emoji: "🏘️" },
        { label: "Not sure", emoji: "🤔" },
      ],
    },
    {
      question: "What's your current roof material?",
      subtext:
        "Bobby works with all roofing materials and will make sure your replacement or repair is the perfect fit for your home.",
      options: [
        { label: "Asphalt shingles", emoji: "🏠" },
        { label: "Metal", emoji: "🔩" },
        { label: "Tile", emoji: "🏛️" },
        { label: "Don't know", emoji: "💭" },
      ],
    },
    {
      question: "How many layers of shingles are on the roof now?",
      subtext:
        "Two layers already means a mandatory full tear-off before new shingles go on — Maryland code doesn't allow a third layer. Bobby determines this exactly during the estimate.",
      options: [
        { label: "One layer (original shingles)", emoji: "1️⃣" },
        { label: "Two layers already on there", emoji: "2️⃣" },
        { label: "Not sure — house is older", emoji: "🤔" },
        { label: "New construction — no existing roof", emoji: "🏗️" },
      ],
    },
    {
      question: "Any signs of soft spots, rot, or deck damage?",
      subtext:
        "Rotted decking under the shingles has to be replaced before the new roof goes on — Bobby inspects and quotes any repairs honestly before a single shingle is removed.",
      options: [
        { label: "Feels solid — no soft spots noticed", emoji: "✅" },
        { label: "Some soft spots or sagging", emoji: "🔨" },
        { label: "Active leak — likely deck damage", emoji: "💧" },
        { label: "Not sure — needs inspection", emoji: "🤔" },
      ],
    },
    {
      question: "What's your rough budget in mind?",
      subtext:
        "Bobby will tell you upfront what your roof needs — and what it will cost — before any work begins. No surprises.",
      options: [
        { label: "Under $5,000", emoji: "💵" },
        { label: "$5,000–$15,000", emoji: "💰" },
        { label: "$15,000–$30,000", emoji: "💎" },
        { label: "Still figuring it out", emoji: "🤔" },
      ],
    },
    DECISION_STAGE_QUESTION,
    {
      question: "How urgent is this?",
      subtext:
        "Bobby prioritizes emergency calls — if you have an active leak right now, we will get someone out to you fast.",
      options: [
        { label: "Emergency — active leak!", emoji: "🚨" },
        { label: "Within 1 month", emoji: "📅" },
        { label: "Within 3 months", emoji: "🗓️" },
        { label: "Planning ahead", emoji: "🔍" },
      ],
    },
  ],
};

// ── Helpers ───────────────────────────────────────────────────────────────────

export function extractTimeframe(lastAnswer: string): string {
  const a = lastAnswer.toLowerCase();
  if (a.includes("asap") || a.includes("emergency") || a.includes("active leak")) return "ASAP";
  if (a.includes("1 month")) return "Within 1 month";
  if (a.includes("3 month")) return "Within 3 months";
  if (a.includes("6 month")) return "Within 6 months";
  if (a.includes("summer")) return "This summer";
  if (a.includes("next year")) return "Next year";
  if (a.includes("explor") || a.includes("planning ahead")) return "Just exploring";
  return "To be discussed";
}

export function extractBudget(answers: string[]): string | null {
  const budgetAnswer = answers.find((a) => a.includes("$"));
  return budgetAnswer ?? null;
}
