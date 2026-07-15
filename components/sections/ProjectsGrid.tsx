"use client";

import { useState } from "react";
import { Project } from "@/types";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { Reveal } from "@/components/ui/Reveal";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06}>
            <ProjectCard project={p} onOpenCaseStudy={setActive} />
          </Reveal>
        ))}
      </div>
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </>
  );
}
