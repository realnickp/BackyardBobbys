import { SITE, SERVICE_AREAS, PRIMARY_SERVICES } from "@/lib/constants";

const BOBBY_PERSON = {
  "@type": "Person" as const,
  name: "Bobby",
  jobTitle: "Owner & Lead Contractor",
  worksFor: {
    "@type": "HomeAndConstructionBusiness" as const,
    name: SITE.name,
  },
  knowsAbout: [
    "Gravel pad installation",
    "Concrete foundations",
    "Deck construction",
    "Driveway installation",
    "Fence installation",
    "Hardscaping",
    "Stamped concrete",
    "Excavation and grading",
    "Retaining walls",
    "Accessory dwelling units",
    "Residential roofing",
    "Site preparation",
    "Outdoor living construction",
  ],
};

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    description: `${SITE.name} is a licensed outdoor construction contractor based in Millersville, Maryland, serving 19 communities across Anne Arundel County. Services include gravel pads, decks, driveways, fencing, hardscaping, stamped concrete, excavation, roofing, and accessory dwelling units. Licensed ${SITE.license}.`,
    telephone: SITE.phone,
    email: SITE.email,
    url: SITE.url,
    sameAs: [
      "https://www.facebook.com/backyardbobbys",
      "https://www.google.com/maps/place/Backyard+Bobbys",
      "https://www.yelp.com/biz/backyard-bobbys-millersville",
    ],
    founder: BOBBY_PERSON,
    foundingLocation: {
      "@type": "Place",
      name: "Millersville, Maryland",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.0368,
      longitude: -76.6347,
    },
    areaServed: SERVICE_AREAS.map((area) => ({
      "@type": "City",
      name: area,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Anne Arundel County",
        containedInPlace: { "@type": "State", name: "Maryland" },
      },
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Millersville",
      addressRegion: SITE.address.stateCode,
      addressCountry: "US",
    },
    knowsAbout: [
      "Gravel pad installation",
      "Shed foundations",
      "Concrete slab foundations",
      "Custom deck construction",
      "Composite decking",
      "Driveway installation and replacement",
      "Wood fence installation",
      "Vinyl fence installation",
      "Aluminum fence installation",
      "Paver patios and walkways",
      "Retaining walls",
      "Stamped concrete patios",
      "Stamped concrete driveways",
      "Residential excavation",
      "Site grading and preparation",
      "French drain installation",
      "Accessory dwelling units",
      "Residential roofing",
      "Outdoor living spaces",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Outdoor Construction Services",
      itemListElement: PRIMARY_SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          url: `${SITE.url}/services/${service.slug}`,
        },
      })),
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: SITE.license,
      recognizedBy: {
        "@type": "Organization",
        name: "Maryland Home Improvement Commission",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "47",
      bestRating: "5",
    },
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "16:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ServiceSchemaProps {
  name: string;
  description: string;
  image?: string;
  slug: string;
  offers?: { name: string; description?: string }[];
}

export function ServiceSchema({
  name,
  description,
  image,
  slug,
  offers,
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      telephone: SITE.phone,
      url: SITE.url,
    },
    areaServed: SERVICE_AREAS.map((area) => ({
      "@type": "City",
      name: area,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Anne Arundel County",
        containedInPlace: { "@type": "State", name: "Maryland" },
      },
    })),
    serviceArea: {
      "@type": "AdministrativeArea",
      name: "Anne Arundel County, Maryland",
    },
    url: `${SITE.url}/services/${slug}`,
    ...(image && { image: `${SITE.url}${image}` }),
    ...(offers && {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${name} Services`,
        itemListElement: offers.map((offer) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: offer.name,
            ...(offer.description && { description: offer.description }),
          },
        })),
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface HowToSchemaProps {
  name: string;
  description: string;
  steps: { title: string; description: string }[];
}

export function HowToSchema({ name, description, steps }: HowToSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.description,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQPageSchemaProps {
  faqs: { question: string; answer: string }[];
}

export function FAQPageSchema({ faqs }: FAQPageSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BlogPostSchemaProps {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  image?: string;
}

export function BlogPostSchema({
  title,
  description,
  slug,
  datePublished,
  image,
}: BlogPostSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    author: {
      ...BOBBY_PERSON,
      "@type": "Person",
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      url: SITE.url,
    },
    url: `${SITE.url}/blog/${slug}`,
    ...(image && { image: `${SITE.url}${image}` }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/blog/${slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
