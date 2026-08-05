import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { readProjects, writeProjects } from "@/lib/projects-store";
import { formatZodError } from "@/lib/zod-error";

const projectSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  title: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(["web", "ai"]),
  image: z.string().min(1),
  tech: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  challenges: z.array(z.string()).default([]),
  role: z.string().min(1),
  github: z.string().optional().or(z.literal("")),
  githubNote: z.string().optional().or(z.literal("")),
  demo: z.string().optional().or(z.literal("")),
  demoNote: z.string().optional().or(z.literal("")),
  featured: z.boolean().optional(),
  year: z.string().optional().or(z.literal("")),
});

export async function GET() {
  return NextResponse.json(readProjects());
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = projectSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: formatZodError(result.error, "Invalid project data") },
      { status: 400 }
    );
  }

  const projects = readProjects();
  if (projects.some((p) => p.slug === result.data.slug)) {
    return NextResponse.json(
      { error: "A project with this slug already exists" },
      { status: 409 }
    );
  }

  projects.push(result.data);
  writeProjects(projects);
  return NextResponse.json({ ok: true }, { status: 201 });
}
