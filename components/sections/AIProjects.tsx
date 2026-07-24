import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Bot } from "lucide-react";
import { aiProjects } from "@/data/projects";
import { ProjectsGrid } from "./ProjectsGrid";

export function AIProjects() {
  const hasProjects = aiProjects.length > 0;

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
        title="Building the backbone for AI-driven products."
        description="Backend and platform work for AI-powered applications — grounded in hands-on study of agents, LLM APIs, prompt engineering, and the Model Context Protocol."
      />

      {hasProjects ? (
        <ProjectsGrid projects={aiProjects} />
      ) : (
        <Reveal>
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
        </Reveal>
      )}
    </section>
  );
}
