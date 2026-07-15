import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "orbit-agent-studio",
    title: "Orbit — AI Agent Studio",
    tagline: "A visual builder for multi-tool AI agents over MCP",
    description:
      "Orbit lets teams compose AI agents by wiring together LLM calls, tools, and MCP servers on a visual canvas, then deploy them as callable endpoints. Built to make agent orchestration inspectable instead of a black box.",
    category: "ai",
    image: "/images/projects/orbit.svg",
    tech: ["Next.js", "TypeScript", "Python", "FastAPI", "MCP", "Docker"],
    features: [
      "Drag-and-drop canvas for chaining LLM + tool calls",
      "Live MCP server discovery and tool introspection",
      "Streaming execution trace with per-step token usage",
      "One-click deploy to a hosted agent endpoint",
    ],
    challenges: [
      "Designing a serializable agent graph format that stays human-readable",
      "Handling partial failures mid-chain without losing execution state",
      "Keeping the canvas responsive while streaming live token output",
    ],
    role: "Sole full-stack developer — architecture, frontend, and agent runtime",
    github: "https://github.com/maryamirshad22/orbit-agent-studio",
    demo: "https://orbit-demo.maryamirshad.dev",
    featured: true,
    year: "2026",
  },
  {
    slug: "docuchat-mcp",
    title: "DocuChat",
    tagline: "Chat with your team's docs via an MCP-connected assistant",
    description:
      "An MCP server + Next.js client that turns a Google Drive or Notion workspace into a queryable assistant, with citations back to the source paragraph.",
    category: "ai",
    image: "/images/projects/docuchat.svg",
    tech: ["Next.js", "Python", "Django Ninja", "MCP", "PostgreSQL"],
    features: [
      "Custom MCP server exposing document search as a tool",
      "Inline citations linking back to the exact source passage",
      "Incremental re-indexing on document change webhooks",
      "Role-based access so answers respect source permissions",
    ],
    challenges: [
      "Chunking long documents without losing cross-reference context",
      "Keeping the index in sync with external doc providers reliably",
      "Balancing answer latency against retrieval accuracy",
    ],
    role: "Backend lead — designed the MCP server and retrieval pipeline",
    github: "https://github.com/maryamirshad22/docuchat-mcp",
    demo: "https://docuchat-demo.maryamirshad.dev",
    featured: true,
    year: "2025",
  },
  {
    slug: "pulse-analytics",
    title: "Pulse",
    tagline: "Real-time product analytics dashboard for indie SaaS",
    description:
      "A lightweight, privacy-friendly analytics platform with a REST ingestion API and a live dashboard, built as a faster, cheaper alternative for small SaaS teams.",
    category: "web",
    image: "/images/projects/pulse.svg",
    tech: ["Next.js", "TypeScript", "Django", "REST APIs", "Docker", "Vercel"],
    features: [
      "Sub-100ms event ingestion API with async batching",
      "Live dashboard with WebSocket-driven chart updates",
      "Cohort and funnel views built from raw event streams",
      "Self-serve API key management and usage limits",
    ],
    challenges: [
      "Designing an ingestion API that survives traffic spikes without dropping events",
      "Keeping dashboard queries fast as event volume grew past millions of rows",
      "Building funnels generically enough to support arbitrary event schemas",
    ],
    role: "Full-stack developer — API design, dashboard UI, and deployment",
    github: "https://github.com/maryamirshad22/pulse-analytics",
    demo: "https://pulse-demo.maryamirshad.dev",
    featured: true,
    year: "2025",
  },
  {
    slug: "shelfie",
    title: "Shelfie",
    tagline: "A minimal, fast personal reading tracker",
    description:
      "A clean, opinionated reading tracker built to be faster than Goodreads — logging books, streaks, and yearly reading goals with an emphasis on speed and typography.",
    category: "web",
    image: "/images/projects/shelfie.svg",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    features: [
      "Optimistic UI so logging a book feels instant",
      "Reading streak and yearly goal tracking",
      "Open Library API integration for book metadata search",
      "Exportable reading history as CSV",
    ],
    challenges: [
      "Getting optimistic updates to gracefully roll back on API failure",
      "Deduplicating noisy third-party book metadata",
    ],
    role: "Solo developer — end to end",
    github: "https://github.com/maryamirshad22/shelfie",
    demo: "https://shelfie-demo.maryamirshad.dev",
    featured: false,
    year: "2024",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const webProjects = projects.filter((p) => p.category === "web");
export const aiProjects = projects.filter((p) => p.category === "ai");
