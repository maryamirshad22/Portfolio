import "server-only";
import fs from "fs";
import path from "path";
import { SkillGroup } from "@/types";
import { skillGroups as seedSkillGroups } from "@/data/skills";

const STORE_PATH = path.join(process.cwd(), "data", "store", "skills.json");

export function readSkillGroups(): SkillGroup[] {
  try {
    const raw = fs.readFileSync(STORE_PATH, "utf-8");
    return JSON.parse(raw) as SkillGroup[];
  } catch {
    return seedSkillGroups;
  }
}

export function writeSkillGroups(groups: SkillGroup[]) {
  fs.mkdirSync(path.dirname(STORE_PATH), { recursive: true });
  fs.writeFileSync(STORE_PATH, JSON.stringify(groups, null, 2), "utf-8");
}

export function getSkillGroupById(id: string): SkillGroup | undefined {
  return readSkillGroups().find((g) => g.id === id);
}
