import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { timeline } from "@/data/experience";

const dotColor = {
  milestone: "var(--color-accent-violet)",
  learning: "var(--color-accent-cyan)",
  career: "var(--color-accent-emerald)",
};

export function Timeline() {
  return (
    <section id="timeline" className="mx-auto max-w-4xl px-4 sm:px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Journey"
        title="Milestones & Growth ."
        align="center"
      />

      <div className="relative pl-8 sm:pl-10">
        <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-[var(--border)]" />
        <div className="space-y-10">
          {timeline.map((item, i) => (
            <Reveal key={`${item.year}-${i}`} delay={i * 0.08} y={16}>
              <div className="relative">
                <span
                  className="absolute -left-8 sm:-left-10 top-1.5 h-3.5 w-3.5 rounded-full"
                  style={{
                    background: dotColor[item.type],
                    boxShadow: `0 0 0 4px var(--bg)`,
                  }}
                />
                <p className="font-mono-eyebrow text-xs text-[var(--text-faint)] mb-1">
                  {item.year}
                </p>
                <h3 className="font-display font-semibold text-lg mb-1.5">{item.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-lg">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
