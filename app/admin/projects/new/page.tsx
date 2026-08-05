import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <AdminShell>
      <h1 className="font-display text-2xl font-semibold mb-8">Add project</h1>
      <ProjectForm />
    </AdminShell>
  );
}
