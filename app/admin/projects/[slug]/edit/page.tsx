import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { getProjectBySlug } from "@/lib/projects-store";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <AdminShell>
      <h1 className="font-display text-2xl font-semibold mb-8">Edit project</h1>
      <ProjectForm initial={project} />
    </AdminShell>
  );
}
