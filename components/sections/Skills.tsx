"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Skills"
        title="What I bring to a team."
        description="A working proficiency map — grown through shipped projects, not just tutorials."
      />

      <div className="grid sm:grid-cols-2 gap-6">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.label} delay={gi * 0.08}>
            <GlassCard hover={false} className="h-full">
              <h3 className="font-display font-semibold mb-6">{group.label}</h3>
              <div className="space-y-5">
                {group.items.map((item, i) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[var(--text-muted)]">{item.name}</span>
                      <span className="font-mono-eyebrow text-xs text-[var(--text-faint)]">
                        {item.level}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-cyan)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
