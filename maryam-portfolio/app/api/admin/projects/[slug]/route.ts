import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { readProjects, writeProjects } from "@/lib/projects-store";

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

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { slug } = await params;
  const project = readProjects().find((p) => p.slug === slug);
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const { slug } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = projectSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? "Invalid project data" },
      { status: 400 }
    );
  }

  const projects = readProjects();
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  projects[idx] = result.data;
  writeProjects(projects);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const { slug } = await params;
  const projects = readProjects();
  const filtered = projects.filter((p) => p.slug !== slug);

  if (filtered.length === projects.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  writeProjects(filtered);
  return NextResponse.json({ ok: true });
}
