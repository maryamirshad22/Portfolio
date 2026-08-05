import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { ShieldCheck, Network, ServerCog, BrainCircuit } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Cyber Security & Networking",
    description: "Just completed a dedicated course at AIT — building a security-first mindset alongside development work.",
    progress: 60,
  },
  {
    icon: Network,
    title: "Model Context Protocol, in depth",
    description: "Applying MCP concepts to real projects like the AITS Website backend, beyond just tutorials.",
    progress: 55,
  },
  {
    icon: ServerCog,
    title: "Production infrastructure",
    description: "Docker and PostgreSQL deployment patterns, practiced across EMS, LMS, and AITS.",
    progress: 65,
  },
  {
    icon: BrainCircuit,
    title: "AI agent & LLM fundamentals",
    description: "Studying AI agents, LLM APIs, and prompt engineering to apply to real chatbot and backend work.",
    progress: 50,
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
