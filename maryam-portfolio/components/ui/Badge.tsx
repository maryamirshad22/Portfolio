import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "accent" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-mono-eyebrow border",
        variant === "default" &&
          "bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)]",
        variant === "accent" &&
          "bg-[color-mix(in_srgb,var(--color-accent-violet)_12%,transparent)] border-[color-mix(in_srgb,var(--color-accent-violet)_35%,transparent)] text-[var(--color-accent-violet)]",
        variant === "outline" && "border-[var(--border-strong)] text-[var(--text)]",
        className
      )}
    >
      {children}
    </span>
  );
}
