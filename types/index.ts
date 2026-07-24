export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: "web" | "ai";
  image: string;
  tech: string[];
  features: string[];
  challenges: string[];
  role: string;
  github?: string;
  githubNote?: string;
  demo?: string;
  demoNote?: string;
  featured?: boolean;
  year?: string;
}

export interface SkillGroup {
  label: string;
  items: { name: string; level: number }[];
}

export interface TechItem {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "ai" | "tools";
}

export interface ExperienceItem {
  company: string;
  role: string;
  start: string;
  end: string | "Present";
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  type: "milestone" | "learning" | "career";
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
}

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "code"; text: string; lang?: string }
  | { type: "list"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
  content: BlogBlock[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}
