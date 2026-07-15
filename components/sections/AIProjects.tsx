import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectsGrid } from "./ProjectsGrid";
import { aiProjects } from "@/data/projects";

export function AIProjects() {
  return (
    <section
      id="ai-projects"
      className="relative mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-32"
    >
      <div
        className="absolute inset-0 -z-10 opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 15% 20%, var(--glow), transparent)",
        }}
      />
      <SectionHeading
        eyebrow="AI Engineering"
        title="Agents that call real tools."
        description="Projects built around the Model Context Protocol — connecting LLMs to live data and actions instead of static prompts."
      />
      <ProjectsGrid projects={aiProjects} />
    </section>
  );
}
