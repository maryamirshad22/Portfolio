import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { ExperienceTable } from "@/components/admin/ExperienceTable";
import { readExperience } from "@/lib/experience-store";

export default function AdminExperiencePage() {
  const items = readExperience();

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold">Experience</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            {items.length} entr{items.length === 1 ? "y" : "ies"} — changes appear on your
            live site immediately.
          </p>
        </div>
        <Link
          href="/admin/experience/new"
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-cyan)] text-white"
        >
          <Plus size={15} /> Add entry
        </Link>
      </div>

      <ExperienceTable items={items} />
    </AdminShell>
  );
}
