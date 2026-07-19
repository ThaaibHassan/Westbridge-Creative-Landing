export const SITE = {
  name: "Westbridge",
  fullName: "Westbridge Creative Studio",
  location: "London, New York",
  email: "studio@westbridge.studio",
  availability: "Booking selected projects for 2026",
  responseTime: "Replies within two working days",
  tagline:
    "An independent studio shaping brands, products, and the moments in between.",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export type Service = {
  index: string;
  /** Marker used on the services page, e.g. "S.01". */
  marker: string;
  title: string;
  description: string;
  disciplines: string[];
  scope: string[];
  pricingFrom: string;
  timeline: string;
  deliverables: string[];
};

export const SERVICES: Service[] = [
  {
    index: "01",
    marker: "S.01",
    title: "Brand Identity",
    description:
      "Positioning, naming, and visual systems built to hold their shape across every surface a brand inhabits.",
    disciplines: ["Strategy", "Identity", "Art Direction", "Guidelines"],
    scope: [
      "Audience, market, and positioning workshops",
      "Naming and verbal tone of voice",
      "Logotype, marque, and core visual system",
      "Typography, layout, and art-direction rules",
    ],
    pricingFrom: "From £12k",
    timeline: "6-9 weeks",
    deliverables: [
      "Strategy & positioning document",
      "Logo suite and visual identity",
      "Brand guidelines",
      "Asset library and templates",
    ],
  },
  {
    index: "02",
    marker: "S.02",
    title: "Digital Experience",
    description:
      "Considered interfaces and interactions, from first principles to the final pixel, engineered for clarity and feel.",
    disciplines: ["Product", "UX / UI", "Prototyping", "Design Systems"],
    scope: [
      "Product and information architecture",
      "Interaction and interface design",
      "Prototyping and usability passes",
      "Design system and component library",
    ],
    pricingFrom: "From £18k",
    timeline: "8-12 weeks",
    deliverables: [
      "UX flows and wireframes",
      "High-fidelity interface design",
      "Interactive prototype",
      "Documented design system",
    ],
  },
  {
    index: "03",
    marker: "S.03",
    title: "Web Design & Build",
    description:
      "Editorial, performance-minded websites that read beautifully and load instantly, hand-built without compromise.",
    disciplines: ["Web Design", "Motion", "Development", "CMS"],
    scope: [
      "Editorial art direction and layout",
      "Motion and scroll choreography",
      "Front-end build in Next.js",
      "Headless CMS and handover",
    ],
    pricingFrom: "From £15k",
    timeline: "6-10 weeks",
    deliverables: [
      "Responsive website design",
      "Production front-end build",
      "CMS integration",
      "Performance and SEO pass",
    ],
  },
  {
    index: "04",
    marker: "S.04",
    title: "Care & Iteration",
    description:
      "Ongoing partnership for brands that keep moving, measured improvements, new pages, and the occasional rethink.",
    disciplines: ["Retainer", "Optimisation", "New work", "Support"],
    scope: [
      "Monthly design and build time",
      "New sections, pages, and campaigns",
      "Performance and accessibility audits",
      "Analytics-led iteration",
    ],
    pricingFrom: "From £2k / month",
    timeline: "Rolling, monthly",
    deliverables: [
      "Prioritised improvement roadmap",
      "Shipped enhancements",
      "Quarterly performance review",
      "Priority support",
    ],
  },
];

export type Faq = { question: string; answer: string };

export const SERVICE_FAQ: Faq[] = [
  {
    question: "How do engagements usually start?",
    answer:
      "With a short call to understand the work and whether we are the right fit. If we are, we send a written proposal with scope, timeline, and a fixed price before anything begins.",
  },
  {
    question: "Do you work remotely?",
    answer:
      "Yes. We work with clients across time zones and run projects remotely by default, with occasional on-site sessions for kick-offs or launches when it genuinely helps.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most identity and website projects run between six and twelve weeks. We hold a small number of projects at once so yours always has senior attention.",
  },
  {
    question: "What do you need from us to do good work?",
    answer:
      "A decision-maker who can stay close to the project, honest context about the business, and the willingness to cut scope rather than dilute quality. We handle the rest.",
  },
  {
    question: "Do you offer ongoing maintenance?",
    answer:
      "We do. After launch, many clients move to a light monthly retainer for iteration, new pages, and performance care, so the work keeps its edge over time.",
  },
];

export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  year: string;
  role: string;
  /** One-line summary used on the home teaser. */
  summary: string;
  /** Longer paragraph used on the index list. */
  description: string;
  tags: string[];
  liveUrl?: string;
  /** Case-study detail content. */
  detail: {
    intro: string;
    overview: string[];
    services: string[];
    deliverables: string[];
    client: string;
    sector: string;
  };
};

export const PROJECTS: Project[] = [
  {
    slug: "atelier-norden",
    index: "01",
    title: "Atelier Norden",
    category: "Brand Identity",
    year: "2025",
    role: "Identity & art direction",
    summary: "A furniture house rebuilt around quiet confidence.",
    description:
      "A Scandinavian furniture house, rebuilt around quiet confidence and an obsession with material honesty. A flexible wordmark, a restrained palette, and an art-direction system that lets the objects speak.",
    tags: ["Strategy", "Identity", "Art Direction"],
    detail: {
      intro:
        "Norden makes furniture meant to outlast trends. The identity had to feel as considered as the joinery, warm, exact, and unhurried.",
      overview: [
        "We began by stripping the brand back to its convictions: material honesty, longevity, and a refusal to shout. From there we built a typographic system with one voice and many registers, so the brand could move between a price tag and a billboard without losing its composure.",
        "Art direction leans on negative space and natural light. Photography is treated as evidence, not decoration, every frame earns its place, every crop is deliberate. The result is a brand that reads as quietly expensive.",
      ],
      services: ["Brand Strategy", "Visual Identity", "Art Direction", "Guidelines"],
      deliverables: ["Wordmark & marque", "Type system", "Photo direction", "Brand book"],
      client: "Atelier Norden",
      sector: "Furniture · Retail",
    },
  },
  {
    slug: "meridian-capital",
    index: "02",
    title: "Meridian Capital",
    category: "Digital Experience",
    year: "2025",
    role: "Product design & build",
    summary: "A private investment platform where restraint signals trust.",
    description:
      "A private investment platform where restraint signals trust, and every interaction earns its place. A design system tuned for clarity, density, and calm under pressure.",
    tags: ["Product", "UX / UI", "Design System"],
    liveUrl: "#",
    detail: {
      intro:
        "Meridian manages serious capital for a small number of families. The product had to feel inevitable, precise, legible, and entirely without noise.",
      overview: [
        "We designed a system that treats information as the interface. Dense tables, considered typography, and a strict spacing grid let advisors move quickly while the experience stays composed. Motion is used sparingly, only to clarify cause and effect.",
        "The build is a component library shared between design and engineering, documented so the platform can grow without drifting. Performance was a first-class requirement, every view loads instantly and behaves predictably.",
      ],
      services: ["Product Strategy", "UX / UI", "Design System", "Front-end"],
      deliverables: ["Design system", "Dashboard suite", "Component library", "Handover docs"],
      client: "Meridian Capital",
      sector: "Finance · Private wealth",
    },
  },
  {
    slug: "cobalt-and-vine",
    index: "03",
    title: "Cobalt & Vine",
    category: "Web Design & Build",
    year: "2024",
    role: "Web design & development",
    summary: "An editorial commerce experience for a boutique vintner.",
    description:
      "An editorial commerce experience for a boutique vintner, part magazine, part shop, fully composed. Long-form storytelling that flows into a frictionless checkout.",
    tags: ["Web Design", "Motion", "Development"],
    liveUrl: "#",
    detail: {
      intro:
        "Cobalt & Vine sell a small, fiercely curated list. The site needed to read like a magazine and convert like a shop, without the seams showing.",
      overview: [
        "We treated each release as a story. Editorial spreads introduce the maker and the place, then resolve into a calm, confident product page. Scroll pacing is deliberate; nothing rushes the reader, yet purchase is always one gesture away.",
        "Built on a headless stack with motion handled in GSAP and Lenis, the experience stays fast on every device. The CMS lets the team publish a new chapter as easily as a new bottle.",
      ],
      services: ["Web Design", "Art Direction", "Motion", "Development"],
      deliverables: ["Editorial system", "Commerce flow", "CMS", "Motion design"],
      client: "Cobalt & Vine",
      sector: "Commerce · Wine",
    },
  },
  {
    slug: "field-notes-studio",
    index: "04",
    title: "Field Notes Studio",
    category: "Brand Identity",
    year: "2024",
    role: "Naming & identity",
    summary: "Naming and identity for a documentary collective.",
    description:
      "Naming and identity for a documentary collective, tuned for the long form and the unhurried frame. An identity that recedes so the films can speak.",
    tags: ["Naming", "Identity", "Guidelines"],
    detail: {
      intro:
        "A collective of documentary filmmakers needed a name and a mark that could stand behind the work, never in front of it.",
      overview: [
        "We named the studio for the way its members work, patient, observational, present. The identity is deliberately spare: a single typeface, a quiet mark, and a layout system built around the still frame.",
        "Guidelines keep the brand consistent across festivals, titles, and press while leaving room for each film's own voice. Restraint is the point.",
      ],
      services: ["Naming", "Visual Identity", "Guidelines"],
      deliverables: ["Studio name", "Identity", "Title system", "Guidelines"],
      client: "Field Notes Studio",
      sector: "Film · Culture",
    },
  },
  {
    slug: "lumen-house",
    index: "05",
    title: "Lumen House",
    category: "Digital Experience",
    year: "2024",
    role: "Design system & build",
    summary: "A measured digital home for a lighting atelier.",
    description:
      "A measured digital home for a lighting atelier, where catalogue, craft, and commerce share one calm grid. Designed so the products provide the only colour.",
    tags: ["UX / UI", "Design System", "Development"],
    liveUrl: "#",
    detail: {
      intro:
        "Lumen House design lighting as architecture. Their site needed the same precision, structural, generous, and quietly technical.",
      overview: [
        "We built a modular grid that carries everything from a single fixture to a full collection. Typography does the structural work; product imagery supplies the warmth. The result is a catalogue that feels like a considered space rather than a list.",
        "A lightweight design system keeps the team self-sufficient, with components that compose cleanly and never fight the content.",
      ],
      services: ["UX / UI", "Design System", "Front-end"],
      deliverables: ["Site design", "Component system", "Catalogue", "Handover"],
      client: "Lumen House",
      sector: "Lighting · Design",
    },
  },
  {
    slug: "aperture",
    index: "06",
    title: "Aperture",
    category: "Web Design & Build",
    year: "2023",
    role: "Editorial web design",
    summary: "A portfolio platform for a photography agency.",
    description:
      "A portfolio platform for a photography agency, composed around the image and the white space that frames it. Fast, full-bleed, and entirely out of the way.",
    tags: ["Web Design", "Motion", "Development"],
    detail: {
      intro:
        "Aperture represent photographers whose work needs room to breathe. The platform had to disappear and let the images carry the page.",
      overview: [
        "We designed a system of full-bleed frames and disciplined typography, with transitions that move between bodies of work like turning pages. The agency can sequence a story in minutes, and the site keeps pace on any connection.",
        "Every motion decision serves the rhythm of looking, slow where it should be, instant where it must be.",
      ],
      services: ["Web Design", "Motion", "Development"],
      deliverables: ["Portfolio platform", "Motion system", "CMS"],
      client: "Aperture",
      sector: "Photography · Agency",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string): Project {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
}

export type ProcessStep = {
  index: string;
  title: string;
  description: string;
};

export const PROCESS: ProcessStep[] = [
  {
    index: "01",
    title: "Listen",
    description:
      "We begin in conversation, mapping ambitions, constraints, and the audience you are building for before a single mark is made.",
  },
  {
    index: "02",
    title: "Define",
    description:
      "Strategy sharpens into direction. We frame the territory, set the tone, and agree on the few decisions that shape everything else.",
  },
  {
    index: "03",
    title: "Craft",
    description:
      "Ideas become artefacts. We design in tight loops, refining typography, motion, and detail until the work feels inevitable.",
  },
  {
    index: "04",
    title: "Deliver",
    description:
      "We build, document, and hand over with care, so the work keeps its rigour long after we step away.",
  },
];

export const STATS = [
  { value: "11", label: "Years in practice" },
  { value: "60+", label: "Brands shaped" },
  { value: "9", label: "Industry awards" },
  { value: "4", label: "Countries served" },
];

export const CLIENTS = [
  "Norden",
  "Meridian",
  "Cobalt & Vine",
  "Field Notes",
  "Aperture",
  "Lumen House",
];

/* ----------------------------- About page ----------------------------- */

export const ABOUT_APPROACH = {
  method: {
    title: "Working method",
    body: "We keep the studio small and the work close. Every project is led end to end by the people who design and build it, no account layers, no hand-offs, no diluted intent. We work in tight loops, show early, and decide quickly, so momentum never becomes a casualty of process.",
  },
  stack: {
    title: "Technical foundation",
    body: "We build on a modern, boring-on-purpose stack: Next.js and TypeScript for structure, Tailwind for a disciplined system, GSAP and Lenis for motion that serves the reading. Performance and accessibility are requirements, not afterthoughts, every build targets fast loads and clean, semantic markup.",
  },
};

export const ABOUT_BACKGROUND = [
  "Westbridge began as a two-person practice with a stubborn belief: that restraint is the clearest sign of a well-considered piece of work. A decade on, that conviction still sets the brief.",
  "We have shaped brands and digital experiences for furniture houses, investment firms, vintners, and cultural collectives, work that tends to be quiet on the surface and exact underneath. We take on a deliberately small number of projects each year so each one keeps our full attention.",
];

export type Collaborator = { name: string; role: string; note: string };

export const ABOUT_COLLABORATORS: Collaborator[] = [
  {
    name: "Studio team",
    role: "Design & front-end",
    note: "The core of every project, strategy, design, and build under one roof.",
  },
  {
    name: "Partner network",
    role: "Art direction & 3D",
    note: "For work that calls for strong art direction or motion and 3D, we bring in a trusted handful of independents whose practice complements ours.",
  },
  {
    name: "Engineering",
    role: "Specialist build",
    note: "On larger platforms we extend the team with senior engineers we have shipped with before, under our direction and standards.",
  },
];

export const ABOUT_COLLAB_NOTE =
  "We work alone on most projects. When a brief asks for a dimension beyond our core, heavier art direction, 3D, or specialist engineering, we assemble a small, hand-picked team rather than scaling for its own sake. The accountability stays with us.";

export type CapabilityGroup = { title: string; items: string[] };

export const ABOUT_CAPABILITIES: CapabilityGroup[] = [
  {
    title: "Frameworks & languages",
    items: ["Next.js / React", "TypeScript", "Node", "HTML & CSS", "Tailwind CSS"],
  },
  {
    title: "Animation & motion",
    items: ["GSAP", "ScrollTrigger", "Lenis", "Scroll choreography", "Micro-interactions"],
  },
  {
    title: "3D & WebGL",
    items: ["Three.js", "React Three Fiber", "Shaders (lite)", "Realtime scenes"],
  },
  {
    title: "SEO & performance",
    items: ["Core Web Vitals", "Structured data", "Lighthouse 95+", "Accessibility (WCAG)"],
  },
];

/* ---------------------------- Contact page ---------------------------- */

export const CONTACT_DETAILS = [
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { label: "Location", value: SITE.location },
  { label: "Availability", value: SITE.availability },
  { label: "Response time", value: SITE.responseTime },
];

export const CONTACT_HELP = [
  "Brand identity & art direction",
  "Digital products & interfaces",
  "Editorial websites & builds",
  "Design systems",
  "Motion & scroll experiences",
  "Ongoing care & iteration",
];

export type ContactStep = { index: string; title: string; description: string };

export const CONTACT_STEPS: ContactStep[] = [
  {
    index: "01",
    title: "First contact",
    description:
      "Tell us about the project in a few lines. We reply within two working days to arrange a short, no-pressure call.",
  },
  {
    index: "02",
    title: "Proposal & scoping",
    description:
      "We write up scope, timeline, and a fixed price. Nothing starts until it is clear and agreed on both sides.",
  },
  {
    index: "03",
    title: "Production",
    description:
      "We design and build in tight loops, sharing progress often so feedback stays specific and momentum stays high.",
  },
  {
    index: "04",
    title: "Delivery & follow-up",
    description:
      "We launch, document, and hand over with care, then stay available for iteration as the work finds its feet.",
  },
];
