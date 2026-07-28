"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";

export function Skills() {
  const [active, setActive] = useState(0);
  const group = skillGroups[active];

  return (
    <section id="skills" className="mx-auto max-w-4xl px-4 sm:px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Skills"
        title="What I bring to a team."
        description="A working proficiency map — grown through shipped projects, not just tutorials."
        align="center"
      />

      {/* Category tabs — a single horizontal line instead of separate stacked boxes */}
      <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-[var(--border)] pb-6">
        {skillGroups.map((g, i) => (
          <button
            key={g.label}
            onClick={() => setActive(i)}
            className={cn(
              "relative px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer",
              active === i
                ? "text-white"
                : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)]"
            )}
          >
            {active === i && (
              <motion.span
                layoutId="skills-tab-pill"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-cyan)]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {g.label}
          </button>
        ))}
      </div>

      {/* Selected category's skills only */}
      <AnimatePresence mode="wait">
        <motion.div
          key={group.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="grid sm:grid-cols-2 gap-x-10 gap-y-6"
        >
          {group.items.map((item, i) => (
            <div key={item.name} className="group rounded-xl px-3 -mx-3 hover:bg-[var(--surface)] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors">{item.name}</span>
                <span className="font-mono-eyebrow text-xs text-[var(--text-faint)]">
                  {item.level}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.level}%` }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-cyan)] group-hover:brightness-110 transition-[filter]"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
