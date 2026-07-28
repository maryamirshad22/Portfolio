"use client";

import { Project } from "@/types";
import { Badge } from "./Badge";
import { GlassCard } from "./GlassCard";
import { ArrowUpRight, ExternalLink, Lock } from "lucide-react";
import { GithubMark } from "./BrandIcons";
import { getProjectStatus, statusToneClasses } from "@/lib/project-status";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
  size?: "large" | "normal";
}

export function ProjectCard({ project, onOpenCaseStudy, size = "normal" }: ProjectCardProps) {
  const status = getProjectStatus(project);
  const hasPublicLink = Boolean(project.github || project.demo);

  return (
    <GlassCard className="p-0 overflow-hidden group flex flex-col h-full">
      <div
        className={cn(
          "relative overflow-hidden bg-[var(--bg-elevated)] border-b border-[var(--border)]",
          size === "large" ? "aspect-[16/7]" : "aspect-[16/9]"
        )}
      >
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 500px"
        />
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-mono-eyebrow uppercase",
              statusToneClasses[status.tone]
            )}
          >
            {status.tone === "live" && (
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-emerald)]" />
            )}
            {status.label}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3
            className={cn(
              "font-display font-semibold",
              size === "large" ? "text-lg" : "text-base"
            )}
          >
            {project.title}
          </h3>
        </div>
        <p className="text-xs text-[var(--text-muted)] mb-3">{project.tagline}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {project.tech.slice(0, size === "large" ? 5 : 3).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
          {project.tech.length > (size === "large" ? 5 : 3) && (
            <Badge>+{project.tech.length - (size === "large" ? 5 : 3)}</Badge>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-[var(--border)]">
          <button
            onClick={() => onOpenCaseStudy(project)}
            className="inline-flex items-center gap-1 text-sm font-medium hover:text-[var(--color-accent-violet)] transition-colors cursor-pointer"
          >
            Case study <ArrowUpRight size={14} />
          </button>

          {hasPublicLink ? (
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
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-faint)]">
              <Lock size={12} />
              {project.githubNote ?? "Private codebase"}
            </span>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
