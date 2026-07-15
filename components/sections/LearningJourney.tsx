import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { BrainCircuit, Network, ServerCog, LineChart } from "lucide-react";

const items = [
  {
    icon: BrainCircuit,
    title: "Agent orchestration patterns",
    description: "Multi-step planning, tool-selection, and error recovery in agent loops.",
    progress: 70,
  },
  {
    icon: Network,
    title: "Model Context Protocol, in depth",
    description: "Writing custom MCP servers and understanding transport-level details.",
    progress: 65,
  },
  {
    icon: ServerCog,
    title: "Production infrastructure",
    description: "Docker, CI/CD pipelines, and deployment reliability at scale.",
    progress: 55,
  },
  {
    icon: LineChart,
    title: "LLM evaluation",
    description: "Building repeatable evals for agent output quality, not just vibes.",
    progress: 40,
  },
];

export function LearningJourney() {
  return (
    <section id="learning" className="mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Currently Learning"
        title="What I'm sharpening right now."
        description="Honest, in-progress — because a portfolio should reflect where I am, not just where I've been."
      />

      <div className="grid sm:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08}>
            <GlassCard className="h-full">
              <item.icon size={20} className="text-[var(--color-accent-violet)] mb-4" />
              <h3 className="font-display font-semibold mb-1.5">{item.title}</h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">{item.description}</p>
              <div className="h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-cyan)]"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
