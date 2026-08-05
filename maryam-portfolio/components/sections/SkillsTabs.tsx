"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkillGroup } from "@/types";
import { cn } from "@/lib/utils";

export function SkillsTabs({ groups }: { groups: SkillGroup[] }) {
  const [active, setActive] = useState(0);
  const group = groups[active];

  if (!group) return null;

  return (
    <>
      {/* Category tabs — a single horizontal line instead of separate stacked boxes */}
      <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-[var(--border)] pb-6">
        {groups.map((g, i) => (
          <button
            key={g.id}
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
          key={group.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="grid sm:grid-cols-2 gap-x-10 gap-y-6"
        >
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
                  animate={{ width: `${item.level}%` }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-cyan)]"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
