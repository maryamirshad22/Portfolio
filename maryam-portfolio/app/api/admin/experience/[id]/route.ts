import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { readExperience, writeExperience } from "@/lib/experience-store";

const experienceSchema = z.object({
  id: z.string().min(1).regex(/^[a-z0-9-]+$/, "ID must be lowercase letters, numbers, and hyphens only"),
  company: z.string().min(1),
  role: z.string().min(1),
  start: z.string().min(1),
  end: z.string().min(1),
  location: z.string().min(1),
  summary: z.string().min(1),
  highlights: z.array(z.string()).default([]),
  stack: z.array(z.string()).default([]),
});

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const item = readExperience().find((e) => e.id === id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = experienceSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? "Invalid experience data" },
      { status: 400 }
    );
  }

  const items = readExperience();
  const idx = items.findIndex((e) => e.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  items[idx] = result.data;
  writeExperience(items);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const items = readExperience();
  const filtered = items.filter((e) => e.id !== id);

  if (filtered.length === items.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  writeExperience(filtered);
  return NextResponse.json({ ok: true });
}
