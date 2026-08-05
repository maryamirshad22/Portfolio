import { Project } from "@/types";

export type StatusTone = "live" | "ongoing" | "private";

export interface ProjectStatus {
  label: string;
  tone: StatusTone;
}

/**
 * Derives a single status badge from a project's existing link fields —
 * no new data needed, keeps every project's card honest about whether
 * there's a public demo, it's still in progress, or the code isn't public.
 */
export function getProjectStatus(project: Project): ProjectStatus {
  if (project.demo) return { label: "Live", tone: "live" };

  if (project.demoNote && /development|ongoing|progress/i.test(project.demoNote)) {
    return { label: "Ongoing", tone: "ongoing" };
  }

  return { label: "Private Codebase", tone: "private" };
}

export const statusToneClasses: Record<StatusTone, string> = {
  live: "bg-[color-mix(in_srgb,var(--color-accent-emerald)_16%,transparent)] border-[color-mix(in_srgb,var(--color-accent-emerald)_40%,transparent)] text-[var(--color-accent-emerald)]",
  ongoing:
    "bg-[color-mix(in_srgb,var(--color-accent-pink)_16%,transparent)] border-[color-mix(in_srgb,var(--color-accent-pink)_40%,transparent)] text-[var(--color-accent-pink)]",
  private:
    "bg-[var(--surface)] border-[var(--border-strong)] text-[var(--text-muted)]",
};
