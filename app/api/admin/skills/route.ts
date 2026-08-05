import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { readSkillGroups, writeSkillGroups } from "@/lib/skills-store";
import { formatZodError } from "@/lib/zod-error";

const skillGroupSchema = z.object({
  id: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "ID must be lowercase letters, numbers, and hyphens only"),
  label: z.string().min(1),
  items: z
    .array(
      z.object({
        name: z.string().min(1),
        level: z.number().min(0).max(100),
      })
    )
    .default([]),
});

export async function GET() {
  return NextResponse.json(readSkillGroups());
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = skillGroupSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: formatZodError(result.error, "Invalid skill group data") },
      { status: 400 }
    );
  }

  const groups = readSkillGroups();
  if (groups.some((g) => g.id === result.data.id)) {
    return NextResponse.json({ error: "A skill group with this ID already exists" }, { status: 409 });
  }

  groups.push(result.data);
  writeSkillGroups(groups);
  return NextResponse.json({ ok: true }, { status: 201 });
}
