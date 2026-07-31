import { z } from "zod";

export function formatZodError(error: z.ZodError, fallback = "Invalid data"): string {
  const issue = error.issues[0];
  if (!issue) return fallback;
  const path = issue.path.join(".");
  return path ? `${path}: ${issue.message}` : issue.message;
}
