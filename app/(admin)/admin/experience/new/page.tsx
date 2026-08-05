import { AdminShell } from "@/components/admin/AdminShell";
import { ExperienceForm } from "@/components/admin/ExperienceForm";

export default function NewExperiencePage() {
  return (
    <AdminShell>
      <h1 className="font-display text-2xl font-semibold mb-8">Add experience</h1>
      <ExperienceForm />
    </AdminShell>
  );
}
