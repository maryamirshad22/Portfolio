import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectsGrid } from "./ProjectsGrid";
import { webProjects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Featured Projects"
        title="Full-stack products I've shipped."
        description="Each one taken from database schema to a deployed URL — click through for the full case study."
      />
      <ProjectsGrid projects={webProjects} />
    </section>
  );
}
