"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Bot } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Filter = "all" | "web" | "ai";

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All Projects" },
  { key: "web", label: "Web" },
  { key: "ai", label: "AI" },
];

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<Project | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [projects, filter]
  );

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "relative px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer",
              filter === f.key
                ? "text-white"
                : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)]"
            )}
          >
            {filter === f.key && (
              <motion.span
                layoutId="projects-tab-pill"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-cyan)]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {f.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <ProjectCard project={p} onOpenCaseStudy={setActive} />
              </Reveal>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <GlassCard hover={false} className="text-center py-14 max-w-xl mx-auto">
              <Bot size={22} className="mx-auto text-[var(--text-faint)] mb-4" />
              <p className="text-[var(--text-muted)]">
                Currently building my first public AI agent project on MCP.
              </p>
              <p className="text-sm text-[var(--text-faint)] mt-2">
                Case studies land here as soon as they&apos;re ready — check the{" "}
                <Link href="/blog" className="text-[var(--color-accent-violet)] hover:underline">
                  writing section
                </Link>{" "}
                for progress notes in the meantime.
              </p>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </>
  );
}
