import "server-only";
import fs from "fs";
import path from "path";
import { ExperienceItem } from "@/types";
import { experience as seedExperience } from "@/data/experience";

const STORE_PATH = path.join(process.cwd(), "data", "store", "experience.json");

export function readExperience(): ExperienceItem[] {
  try {
    const raw = fs.readFileSync(STORE_PATH, "utf-8");
    return JSON.parse(raw) as ExperienceItem[];
  } catch {
    return seedExperience;
  }
}

export function writeExperience(items: ExperienceItem[]) {
  fs.mkdirSync(path.dirname(STORE_PATH), { recursive: true });
  fs.writeFileSync(STORE_PATH, JSON.stringify(items, null, 2), "utf-8");
}

export function getExperienceById(id: string): ExperienceItem | undefined {
  return readExperience().find((e) => e.id === id);
}
