import {
  ExperienceItem,
  TimelineItem,
  Certification,
  Testimonial,
} from "@/types";

export const experience: ExperienceItem[] = [
  {
    id: "ait-developer-intern",
    company: "Al-Khair Institute of Technology (AIT)",
    role: "Developer Intern",
    start: "March 2026",
    end: "July 2026",
    location: "Pakistan",
    summary:
      "Contributed to three production web projects as part of a development team — building CRUD-heavy full-stack modules, recreating a client website end to end, and laying the backend foundation for an AI-driven platform.",
    highlights: [
      "Built and maintained Employee Management System (EMS) modules — institutions, departments, designations, branches, employees, and dashboards — integrating frontend components with Django REST APIs",
      "Recreated the Sherwani Builder main website and four subpages (Bloome Garden, Sherwani Royal Suite, Address One, Hub Valley), including full site navigation",
      "Developed Admin, Teacher, Student, and Coordinator dashboards for a Learning Management System (LMS) with reusable components and a consistent design system",
      "Designed the custom-auth and content-management backend for the AITS Website, applying research into AI agents, LLM APIs, and the Model Context Protocol (MCP)",
    ],
    stack: ["Next.js", "React.js", "Tailwind CSS", "Django", "Django REST Framework", "PostgreSQL", "Docker", "Git & GitHub"],
  },
  {
    id: "freelance-web-developer",
    company: "Freelance / Independent",
    role: "Freelance Web Developer",
    start: "2024",
    end: "Present",
    location: "Remote",
    summary:
      "Independent freelance web development work using Next.js, React, and Tailwind CSS, alongside academic and internship commitments.",
    highlights: [],
    stack: ["Next.js", "React", "Tailwind CSS"],
  },
];

export const timeline: TimelineItem[] = [
  {
    year: "2021",
    title: "Office Automation Course — Aptech",
    description:
      "Started the journey with an Office Automation course at Aptech, building the foundation before moving into development.",
    type: "learning",
  },
  {
    year: "2023",
    title: "Started learning web development — SMIT",
    description:
      "Began learning web development at Saylani Mass IT Training (SMIT), picking up the fundamentals that led into full-stack work.",
    type: "learning",
  },
  {
    year: "2024",
    title: "Started freelancing",
    description:
      "Began freelancing independently, building projects with Next.js, React, and Tailwind CSS.",
    type: "career",
  },
  {
    year: "2026",
    title: "Cyber Security & Networking Course — AIT",
    description:
      "Studied Cyber Security & Networking at Al-Khair Institute of Technology (AIT), broadening beyond application development.",
    type: "learning",
  },
  {
    year: "2026",
    title: "Developer Intern — AIT",
    description:
      "Joined AIT as a Developer Intern, building the Employee Management System, Learning Management System, Sherwani Builder Website, AITS Website, and the IAK chatbot.",
    type: "career",
  },
];

export const certifications: Certification[] = [
  {
    name: "Office Automation Course",
    issuer: "Aptech",
    date: "2021",
  },
  {
    name: "Web Development",
    issuer: "SMIT (Saylani Mass IT Training)",
    date: "2023",
  },
  {
    name: "Cyber Security & Networking",
    issuer: "Al-Khair Institute of Technology (AIT)",
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
