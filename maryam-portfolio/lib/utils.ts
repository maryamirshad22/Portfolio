import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names safely, resolving conflicts (e.g. "p-2 p-4" -> "p-4").
 * Used throughout the UI layer instead of raw template strings.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formats a date range for experience / timeline entries. */
export function formatRange(start: string, end: string | "Present") {
  return `${start} — ${end}`;
}
