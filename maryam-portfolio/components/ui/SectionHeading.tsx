import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("mb-14", align === "center" && "text-center", className)}>
      <div
        className={cn(
          "flex items-center gap-3 mb-4",
          align === "center" && "justify-center"
        )}
      >
        <span className="h-px w-8 bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-cyan)]" />
        <span className="font-mono-eyebrow text-xs uppercase text-[var(--text-muted)]">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-[var(--text-muted)] text-base sm:text-lg max-w-2xl leading-relaxed",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
