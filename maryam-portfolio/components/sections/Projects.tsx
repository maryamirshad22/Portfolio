import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectsGrid } from "./ProjectsGrid";
import { readProjects } from "@/lib/projects-store";

export function Projects() {
  const projects = readProjects();

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-32">
      <div
        className="absolute inset-0 -z-10 opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 15% 20%, var(--glow), transparent)",
        }}
      />
      <SectionHeading
        eyebrow="Featured Projects"
        title="What I've built — web and AI."
        description="Real work from internships, freelance, and team projects. Filter by type, or click through for the full case study."
        align="center"
      />
      <ProjectsGrid projects={projects} />
    </section>
  );
}

