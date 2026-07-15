import {
  ExperienceItem,
  TimelineItem,
  Certification,
  Testimonial,
  BlogPost,
} from "@/types";

export const experience: ExperienceItem[] = [
  {
    company: "Freelance / Independent",
    role: "Full-Stack Developer & AI Engineer",
    start: "2024",
    end: "Present",
    location: "Remote",
    summary:
      "Designing and shipping full-stack products end to end for small teams and founders, with a growing focus on AI agent tooling built on MCP.",
    highlights: [
      "Delivered 6+ production web apps using Next.js, TypeScript, and Django",
      "Built two MCP-connected AI agent products from architecture to deployment",
      "Owned the full lifecycle: design, API, database, deployment, and monitoring",
    ],
    stack: ["Next.js", "TypeScript", "Django Ninja", "Docker", "MCP"],
  },
  {
    company: "Self-Directed Study",
    role: "AI Engineering Specialization",
    start: "2025",
    end: "Present",
    location: "Remote",
    summary:
      "Deepening expertise in agentic systems, LLM tool-use, and the Model Context Protocol through applied projects rather than isolated tutorials.",
    highlights: [
      "Built and open-sourced MCP servers used in two personal AI products",
      "Studied retrieval, evaluation, and agent-orchestration patterns in depth",
    ],
    stack: ["Python", "MCP", "REST APIs", "Docker"],
  },
];

export const timeline: TimelineItem[] = [
  {
    year: "2022",
    title: "Started learning web development",
    description:
      "Began with HTML, CSS, and JavaScript fundamentals, then moved into React within the first year.",
    type: "learning",
  },
  {
    year: "2023",
    title: "Went full-stack",
    description:
      "Picked up Python and Django to build complete products, not just frontends — and started shipping REST APIs.",
    type: "learning",
  },
  {
    year: "2024",
    title: "First freelance clients",
    description:
      "Took on independent full-stack projects end to end, from database design to Vercel deployment.",
    type: "career",
  },
  {
    year: "2025",
    title: "Pivoted toward AI engineering",
    description:
      "Started building AI agents and adopted the Model Context Protocol to connect them to real tools and data.",
    type: "milestone",
  },
  {
    year: "2026",
    title: "Building toward world-class AI engineering",
    description:
      "Currently deepening agent-orchestration and evaluation skills while shipping MCP-based products.",
    type: "milestone",
  },
];

export const certifications: Certification[] = [
  {
    name: "Next.js & React — Advanced Patterns",
    issuer: "Self-paced / Applied Projects",
    date: "2024",
  },
  {
    name: "Python for Backend Development",
    issuer: "Self-paced / Applied Projects",
    date: "2023",
  },
  {
    name: "Docker & Containerized Deployments",
    issuer: "Self-paced / Applied Projects",
    date: "2025",
  },
  {
    name: "AI Agents & the Model Context Protocol",
    issuer: "Self-paced / Applied Projects",
    date: "2026",
  },
];

// Placeholder — intentionally structured so real quotes can drop straight in later.
export const testimonials: Testimonial[] = [
  {
    name: "Testimonial coming soon",
    role: "Client",
    company: "—",
    quote:
      "This space is reserved for feedback from clients and collaborators. Check back soon.",
  },
];

// Placeholder — matches the eventual blog post schema.
export const blogPosts: BlogPost[] = [
  {
    title: "Building my first MCP server",
    excerpt: "Notes on writing a Model Context Protocol server from scratch — coming soon.",
    date: "Coming soon",
    readTime: "—",
    tag: "AI Engineering",
  },
  {
    title: "Django Ninja vs DRF for small APIs",
    excerpt: "A practical comparison based on shipping both in production — coming soon.",
    date: "Coming soon",
    readTime: "—",
    tag: "Backend",
  },
];
