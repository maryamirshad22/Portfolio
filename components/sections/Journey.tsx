"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { timeline, certifications } from "@/data/experience";
import { Award } from "lucide-react";
import { cn } from "@/lib/utils";

const dotColor = {
  milestone: "var(--color-accent-violet)",
  learning: "var(--color-accent-cyan)",
  career: "var(--color-accent-emerald)",
};

type Tab = "journey" | "certifications";

export function Journey() {
  const [tab, setTab] = useState<Tab>("journey");

  return (
    <section id="timeline" className="mx-auto max-w-4xl px-4 sm:px-6 py-24 sm:py-32">
      <SectionHeading eyebrow="Journey" title="How I got here." align="center" />

      <div className="flex justify-center mb-14">
        <div className="relative inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1">
          {(["journey", "certifications"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "relative z-10 px-5 py-2 rounded-full text-sm font-medium capitalize transition-colors cursor-pointer",
                tab === t ? "text-white" : "text-[var(--text-muted)] hover:text-[var(--text)]"
              )}
            >
              {tab === t && (
                <motion.span
                  layoutId="journey-tab-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-cyan)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {t === "journey" ? "Journey" : "Certifications"}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {tab === "journey" ? (
          <motion.div
            key="journey"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="relative pl-8 sm:pl-10"
          >
            <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-[var(--border)]" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <Reveal key={item.year + item.title} delay={i * 0.06} y={16}>
                  <div className="relative group rounded-xl px-4 -mx-4 hover:bg-[var(--surface)] transition-colors">
                    <span
                      className="absolute -left-8 sm:-left-10 top-1.5 h-3.5 w-3.5 rounded-full transition-transform group-hover:scale-125"
                      style={{
                        background: dotColor[item.type],
                        boxShadow: `0 0 0 4px var(--bg)`,
                      }}
                    />
                    <p className="font-mono-eyebrow text-xs text-[var(--text-faint)] mb-1">
                      {item.year}
                    </p>
                    <h3 className="font-display font-semibold text-lg mb-1.5 group-hover:text-[var(--color-accent-violet)] transition-colors">{item.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-lg">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="certifications"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {certifications.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.06}>
                <GlassCard className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center shrink-0">
                    <Award size={16} className="text-[var(--color-accent-emerald)]" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{c.name}</p>
                    <p className="text-xs text-[var(--text-faint)] mt-0.5">
                      {c.issuer} · {c.date}
                    </p>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
