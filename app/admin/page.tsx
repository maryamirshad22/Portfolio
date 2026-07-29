import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectsTable } from "@/components/admin/ProjectsTable";
import { readProjects } from "@/lib/projects-store";

export default function AdminDashboardPage() {
  const projects = readProjects();

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold">Projects</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            {projects.length} project{projects.length === 1 ? "" : "s"} — changes appear on
            your live site immediately.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-cyan)] text-white"
        >
          <Plus size={15} /> Add project
        </Link>
      </div>

      <ProjectsTable projects={projects} />
    </AdminShell>
  );
}
