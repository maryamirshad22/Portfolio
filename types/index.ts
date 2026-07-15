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
  demo?: string;
  featured?: boolean;
  year: string;
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

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}
