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

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const group = readSkillGroups().find((g) => g.id === id);
  if (!group) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(group);
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
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
  const idx = groups.findIndex((g) => g.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  groups[idx] = result.data;
  writeSkillGroups(groups);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const groups = readSkillGroups();
  const filtered = groups.filter((g) => g.id !== id);

  if (filtered.length === groups.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  writeSkillGroups(filtered);
  return NextResponse.json({ ok: true });
}
