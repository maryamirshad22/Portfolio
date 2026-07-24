"use client";

import { Project } from "@/types";
import { Badge } from "./Badge";
import { GlassCard } from "./GlassCard";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubMark } from "./BrandIcons";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
}

export function ProjectCard({ project, onOpenCaseStudy }: ProjectCardProps) {
  return (
    <GlassCard className="p-0 overflow-hidden group flex flex-col h-full">
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-elevated)] border-b border-[var(--border)]">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="accent">{project.category === "ai" ? "AI" : "Web"}</Badge>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-display text-lg font-semibold">{project.title}</h3>
          {project.year && (
            <span className="font-mono-eyebrow text-xs text-[var(--text-faint)] shrink-0 pt-1">
              {project.year}
            </span>
          )}
        </div>
        <p className="text-sm text-[var(--text-muted)] mb-4">{project.tagline}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.slice(0, 4).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
          {project.tech.length > 4 && <Badge>+{project.tech.length - 4}</Badge>}
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-[var(--border)]">
          <button
            onClick={() => onOpenCaseStudy(project)}
            className="inline-flex items-center gap-1 text-sm font-medium hover:text-[var(--color-accent-violet)] transition-colors cursor-pointer"
          >
            Case study <ArrowUpRight size={14} />
          </button>
          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                <GithubMark size={16} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
