import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { readExperience, writeExperience } from "@/lib/experience-store";
import { formatZodError } from "@/lib/zod-error";

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

export async function GET() {
  return NextResponse.json(readExperience());
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = experienceSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: formatZodError(result.error, "Invalid experience data") },
      { status: 400 }
    );
  }

  const items = readExperience();
  if (items.some((e) => e.id === result.data.id)) {
    return NextResponse.json({ error: "An entry with this ID already exists" }, { status: 409 });
  }

  items.push(result.data);
  writeExperience(items);
  return NextResponse.json({ ok: true }, { status: 201 });
}
