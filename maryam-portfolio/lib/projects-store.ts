import "server-only";
import fs from "fs";
import path from "path";
import { Project } from "@/types";
import { projects as seedProjects } from "@/data/projects";

const STORE_PATH = path.join(process.cwd(), "data", "store", "projects.json");

/**
 * Reads the live (admin-editable) project list. Falls back to the static
 * seed in `data/projects.ts` if the JSON store is missing or unreadable —
 * so the site never breaks even before the store file exists.
 */
export function readProjects(): Project[] {
  try {
    const raw = fs.readFileSync(STORE_PATH, "utf-8");
    return JSON.parse(raw) as Project[];
  } catch {
    return seedProjects;
  }
}

export function writeProjects(projects: Project[]) {
  fs.mkdirSync(path.dirname(STORE_PATH), { recursive: true });
  fs.writeFileSync(STORE_PATH, JSON.stringify(projects, null, 2), "utf-8");
}

export function getProjectBySlug(slug: string): Project | undefined {
  return readProjects().find((p) => p.slug === slug);
}
