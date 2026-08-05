import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Quote } from "lucide-react";

export function Testimonials() {
  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Testimonials"
        title="What collaborators say."
        align="center"
      />

      <Reveal className="max-w-xl mx-auto">
        <GlassCard hover={false} className="text-center py-12">
          <Quote size={22} className="mx-auto text-[var(--text-faint)] mb-4" />
          <p className="text-[var(--text-muted)]">
            This section is reserved for client and collaborator feedback.
          </p>
          <p className="text-sm text-[var(--text-faint)] mt-2">
            Check back soon — or{" "}
            <a href="#contact" className="text-[var(--color-accent-violet)] hover:underline">
              reach out
            </a>{" "}
            if we&apos;ve worked together.
          </p>
        </GlassCard>
      </Reveal>
    </section>
  );
}
