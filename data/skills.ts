import { SkillGroup, TechItem } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    items: [
      { name: "React & Next.js", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Framer Motion", level: 78 },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Python", level: 85 },
      { name: "Django & Django Ninja", level: 82 },
      { name: "REST API Design", level: 88 },
      { name: "PostgreSQL", level: 75 },
    ],
  },
  {
    label: "AI & Agents",
    items: [
      { name: "AI Agent Design", level: 80 },
      { name: "Model Context Protocol", level: 78 },
      { name: "LLM Integration", level: 82 },
      { name: "Prompt Engineering", level: 85 },
    ],
  },
  {
    label: "Tooling",
    items: [
      { name: "Docker", level: 76 },
      { name: "Git & GitHub", level: 90 },
      { name: "Vercel", level: 88 },
      { name: "CI/CD", level: 70 },
    ],
  },
];

// Rendered as a marquee / orbit in the Tech Stack section
export const techStack: TechItem[] = [
  { name: "Next.js", icon: "Nextjs", category: "frontend" },
  { name: "React", icon: "React", category: "frontend" },
  { name: "TypeScript", icon: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", icon: "Tailwind", category: "frontend" },
  { name: "JavaScript", icon: "JavaScript", category: "frontend" },
  { name: "Python", icon: "Python", category: "backend" },
  { name: "Django", icon: "Django", category: "backend" },
  { name: "Django Ninja", icon: "DjangoNinja", category: "backend" },
  { name: "REST APIs", icon: "Api", category: "backend" },
  { name: "AI Agents", icon: "Bot", category: "ai" },
  { name: "MCP", icon: "Mcp", category: "ai" },
  { name: "Docker", icon: "Docker", category: "tools" },
  { name: "Git", icon: "Git", category: "tools" },
  { name: "GitHub", icon: "Github", category: "tools" },
  { name: "Vercel", icon: "Vercel", category: "tools" },
];
