"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors cursor-pointer",
        size === "md" && "px-5 py-2.5 text-sm",
        size === "lg" && "px-7 py-3.5 text-base",
        variant === "primary" &&
          "bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-cyan)] text-white shadow-[0_0_30px_var(--glow)] hover:shadow-[0_0_40px_var(--glow)]",
        variant === "secondary" &&
          "bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]",
        variant === "ghost" && "hover:bg-[var(--surface-hover)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
