import { AdminShell } from "@/components/admin/AdminShell";
import { SkillGroupForm } from "@/components/admin/SkillGroupForm";

export default function NewSkillGroupPage() {
  return (
    <AdminShell>
      <h1 className="font-display text-2xl font-semibold mb-8">Add skill group</h1>
      <SkillGroupForm />
    </AdminShell>
  );
}
