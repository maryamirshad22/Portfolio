import { SectionHeading } from "@/components/ui/SectionHeading";
import { techStack } from "@/data/skills";
import { cn } from "@/lib/utils";

const categoryColor: Record<string, string> = {
  frontend: "var(--color-accent-cyan)",
  backend: "var(--color-accent-violet)",
  ai: "var(--color-accent-emerald)",
  tools: "var(--text-muted)",
};

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = [...techStack, ...techStack];
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={cn(
          "flex gap-4 shrink-0 py-2",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {items.map((t, i) => (
          <span
            key={`${t.name}-${i}`}
            className="flex items-center gap-2 shrink-0 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm whitespace-nowrap"
          >
            <span
              className="h-1.5 w-1.5 rounded-full shrink-0"
              style={{ background: categoryColor[t.category] }}
            />
            {t.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  return (
    <section id="tech-stack" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Tools I reach for."
          align="center"
        />
      </div>
      <div className="space-y-4">
        <Row />
        <Row reverse />
      </div>

      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-reverse { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .animate-marquee { animation: marquee 32s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 32s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee, .animate-marquee-reverse { animation: none; }
        }
      `}</style>
    </section>
  );
}
