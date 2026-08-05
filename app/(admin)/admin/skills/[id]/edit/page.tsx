import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { SkillGroupForm } from "@/components/admin/SkillGroupForm";
import { getSkillGroupById } from "@/lib/skills-store";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditSkillGroupPage({ params }: PageProps) {
  const { id } = await params;
  const group = getSkillGroupById(id);

  if (!group) notFound();

  return (
    <AdminShell>
      <h1 className="font-display text-2xl font-semibold mb-8">Edit skill group</h1>
      <SkillGroupForm initial={group} />
    </AdminShell>
  );
}
