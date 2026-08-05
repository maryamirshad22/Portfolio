import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { SkillGroupsTable } from "@/components/admin/SkillGroupsTable";
import { readSkillGroups } from "@/lib/skills-store";

export default function AdminSkillsPage() {
  const groups = readSkillGroups();

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold">Skills</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            {groups.length} group{groups.length === 1 ? "" : "s"} — changes appear on your
            live site immediately.
          </p>
        </div>
        <Link
          href="/admin/skills/new"
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-cyan)] text-white"
        >
          <Plus size={15} /> Add group
        </Link>
      </div>

      <SkillGroupsTable groups={groups} />
    </AdminShell>
  );
}
