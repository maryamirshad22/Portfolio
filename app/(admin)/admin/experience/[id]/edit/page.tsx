import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ExperienceForm } from "@/components/admin/ExperienceForm";
import { getExperienceById } from "@/lib/experience-store";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditExperiencePage({ params }: PageProps) {
  const { id } = await params;
  const item = getExperienceById(id);

  if (!item) notFound();

  return (
    <AdminShell>
      <h1 className="font-display text-2xl font-semibold mb-8">Edit experience</h1>
      <ExperienceForm initial={item} />
    </AdminShell>
  );
}
