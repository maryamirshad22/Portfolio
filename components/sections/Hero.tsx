"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { GithubMark } from "@/components/ui/BrandIcons";
import { AnimatedNetwork } from "@/components/ui/AnimatedNetwork";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/social";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20"
    >
      <AnimatedNetwork />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 20%, var(--glow), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent-emerald)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent-emerald)]" />
          </span>
          <span className="font-mono-eyebrow text-xs text-[var(--text-muted)]">
            Available for freelance & full-time roles
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-semibold tracking-tight text-4xl sm:text-6xl md:text-7xl max-w-4xl leading-[1.05]"
        >
          Building software that{" "}
          <span className="text-gradient">thinks, connects,</span> and ships.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-[var(--text-muted)] max-w-xl leading-relaxed"
        >
          I&apos;m {siteConfig.name}, a full-stack developer working across{" "}
          <span className="text-[var(--text)]">Next.js and Django</span>,
          increasingly focused on building{" "}
          <span className="text-[var(--text)]">AI agents connected via MCP</span>{" "}
          to real tools and data.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View my work <ArrowRight size={16} />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() =>
              window.open("https://github.com/maryamirshad22", "_blank")
            }
          >
            <GithubMark size={16} /> GitHub
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-mono-eyebrow text-[var(--text-faint)]"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles size={12} /> Next.js · React · TypeScript
          </span>
          <span>Python · Django · Django Ninja</span>
          <span>AI Agents · MCP</span>
          <span>Docker · Vercel</span>
        </motion.div>
      </div>
    </section>
  );
}
