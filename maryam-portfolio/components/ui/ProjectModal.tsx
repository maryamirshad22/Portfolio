"use client";

import { Project } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, CheckCircle2, AlertTriangle, User } from "lucide-react";
import { GithubMark } from "./BrandIcons";
import { Badge } from "./Badge";
import Image from "next/image";
import { useEffect } from "react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = project ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} case study`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="relative aspect-[16/9]">
              <Image src={project.image} alt={project.title} fill className="object-cover" />
              <button
                onClick={onClose}
                aria-label="Close case study"
                className="absolute top-4 right-4 h-9 w-9 rounded-full glass flex items-center justify-center cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-display text-2xl font-semibold">{project.title}</h3>
                {project.year && (
                  <span className="font-mono-eyebrow text-xs text-[var(--text-faint)] pt-2 shrink-0">
                    {project.year}
                  </span>
                )}
              </div>
              <p className="text-[var(--text-muted)] mb-6">{project.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-8">
                {project.tech.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold mb-3">
                    <CheckCircle2 size={15} className="text-[var(--color-accent-emerald)]" />
                    Key features
                  </h4>
                  <ul className="space-y-2">
                    {project.features.map((f) => (
                      <li key={f} className="text-sm text-[var(--text-muted)] leading-relaxed">
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold mb-3">
                    <AlertTriangle size={15} className="text-[var(--color-accent-violet)]" />
                    Challenges solved
                  </h4>
                  <ul className="space-y-2">
                    {project.challenges.map((c) => (
                      <li key={c} className="text-sm text-[var(--text-muted)] leading-relaxed">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-2 mb-8 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                <User size={15} className="text-[var(--text-muted)] mt-0.5 shrink-0" />
                <p className="text-sm text-[var(--text-muted)]">
                  <span className="text-[var(--text)] font-medium">My role: </span>
                  {project.role}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors"
                  >
                    <GithubMark size={15} /> View source
                  </a>
                ) : project.githubNote ? (
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-[var(--text-faint)] border border-[var(--border)]">
                    <GithubMark size={15} /> {project.githubNote}
                  </span>
                ) : null}
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-cyan)] text-white"
                  >
                    <ExternalLink size={15} /> Live demo
                  </a>
                ) : project.demoNote ? (
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-[var(--text-faint)] border border-[var(--border)]">
                    <ExternalLink size={15} /> {project.demoNote}
                  </span>
                ) : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
