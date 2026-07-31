import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { readExperience } from "@/lib/experience-store";
import { formatRange } from "@/lib/utils";
import { Briefcase } from "lucide-react";

export function Experience() {
  const experience = readExperience();

  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've put this into practice."
      />

      <div className="space-y-6">
        {experience.map((e, i) => (
          <Reveal key={e.id} delay={i * 0.1}>
            <GlassCard hover={false} className="grid md:grid-cols-[220px_1fr] gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2 md:hidden">
                  <Briefcase size={14} className="text-[var(--color-accent-violet)]" />
                  <span className="font-mono-eyebrow text-xs text-[var(--text-faint)]">
                    {formatRange(e.start, e.end)}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg">{e.role}</h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">{e.company}</p>
                <p className="text-xs text-[var(--text-faint)] mt-1">{e.location}</p>
                <p className="hidden md:block font-mono-eyebrow text-xs text-[var(--text-faint)] mt-4">
                  {formatRange(e.start, e.end)}
                </p>
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                  {e.summary}
                </p>
                {e.highlights.length > 0 && (
                  <ul className="space-y-2 mb-5">
                    {e.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm text-[var(--text-muted)]">
                        <span className="text-[var(--color-accent-violet)] mt-1">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {e.stack.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
