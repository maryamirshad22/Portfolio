"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, borderColor: "var(--border-strong)" } : undefined}
      transition={{ duration: 0.25 }}
      className={cn(
        "rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
