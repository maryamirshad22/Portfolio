import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { MapPin, GraduationCap, Target, Coffee } from "lucide-react";

const facts = [
  { icon: MapPin, label: "Based in", value: "Pakistan · Remote-first" },
  { icon: GraduationCap, label: "Focus", value: "Full-Stack + AI Engineering" },
  { icon: Target, label: "Goal", value: "World-class AI systems engineer" },
  { icon: Coffee, label: "Currently", value: "Building agents with MCP" },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="About"
        title="A developer who likes finishing what she starts."
      />

      <div className="grid lg:grid-cols-5 gap-8">
        <Reveal className="lg:col-span-3 space-y-5 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
          <p>
            I&apos;m Maryam — a software developer who spends most of her time in
            the space between frontend polish and backend correctness. I build
            with{" "}
            <span className="text-[var(--text)]">
              Next.js, React, and TypeScript
            </span>{" "}
            on the frontend, and{" "}
            <span className="text-[var(--text)]">Python with Django and Django Ninja</span>{" "}
            on the backend — shipping products that feel fast and stay
            maintainable.
          </p>
          <p>
            Over the last year, my focus has shifted toward{" "}
            <span className="text-[var(--text)]">AI engineering</span>: designing
            agents that can reason about a task, call the right tool, and act on
            real data through the{" "}
            <span className="text-[var(--text)]">Model Context Protocol</span>.
            I&apos;m especially interested in making agent behavior inspectable —
            not a black box, but a system you can reason about like any other
            piece of software.
          </p>
          <p>
            My goal is to become a world-class Full-Stack AI Engineer and build
            impactful products that combine great user experiences with
            intelligent automation — taking an idea from a blank repo to a
            deployed, reliable product, frontend, backend, infrastructure, and
            the AI layer included.
          </p>
        </Reveal>

        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.08}>
              <GlassCard className="h-full">
                <f.icon size={18} className="text-[var(--color-accent-violet)] mb-4" />
                <p className="font-mono-eyebrow text-[10px] uppercase text-[var(--text-faint)] mb-1">
                  {f.label}
                </p>
                <p className="text-sm font-medium leading-snug">{f.value}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
