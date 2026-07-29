import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { MapPin, Briefcase, Rocket, Target } from "lucide-react";

const facts = [
  { icon: MapPin, label: "Based in", value: "Pakistan · Remote-friendly" },
  { icon: Briefcase, label: "Currently", value: "Developer Intern @ AIT" },
  { icon: Rocket, label: "Freelancing since", value: "2024" },
  { icon: Target, label: "Goal", value: "World-class Full-Stack AI Engineer" },
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
            the space between frontend polish and backend correctness. As a{" "}
            <span className="text-[var(--text)]">Developer Intern at Al-Khair Institute of Technology (AIT)</span>
            , I&apos;ve worked across real production projects: building out an{" "}
            <span className="text-[var(--text)]">Employee Management System</span> and a
            multi-dashboard <span className="text-[var(--text)]">Learning Management System</span>,
            and recreating a full client website — the{" "}
            <span className="text-[var(--text)]">Sherwani Builder</span> site — pixel by pixel
            across five pages.
          </p>
          <p>
            Alongside that, I freelance independently with{" "}
            <span className="text-[var(--text)]">Next.js, React, and Tailwind CSS</span>, and
            I&apos;ve been pulling my growing interest in AI into real work — designing the
            backend architecture for an AI customer-support platform, and building an
            animated, holographic chatbot interface for{" "}
            <span className="text-[var(--text)]">Idara Al-Khair&apos;s</span> nonprofit
            website — applying what I&apos;ve studied about agents, LLM APIs, and the{" "}
            <span className="text-[var(--text)]">Model Context Protocol</span> to things
            people actually use.
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
