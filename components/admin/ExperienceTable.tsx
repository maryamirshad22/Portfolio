"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ExperienceItem } from "@/types";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { formatRange } from "@/lib/utils";

export function ExperienceTable({ items }: { items: ExperienceItem[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleDelete(id: string, label: string) {
    if (!confirm(`Delete "${label}"? This can't be undone.`)) return;
    setDeleting(id);
    setError("");
    try {
      const res = await fetch(`/api/admin/experience/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setDeleting(null);
    }
  }

  if (items.length === 0) {
    return (
      <p className="text-sm text-[var(--text-muted)] py-10 text-center">
        No experience entries yet. Add your first one above.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {error && <p className="text-sm text-red-400 mb-2">{error}</p>}
      {items.map((e) => (
        <div
          key={e.id}
          className="flex items-center justify-between gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
        >
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">
              {e.role} — {e.company}
            </p>
            <p className="text-xs text-[var(--text-faint)] mt-0.5 font-mono-eyebrow">
              {formatRange(e.start, e.end)}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={`/admin/experience/${e.id}/edit`}
              className="h-8 w-8 rounded-lg border border-[var(--border)] flex items-center justify-center hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)] transition-colors"
              aria-label={`Edit ${e.role} at ${e.company}`}
            >
              <Pencil size={14} />
            </Link>
            <button
              onClick={() => handleDelete(e.id, `${e.role} — ${e.company}`)}
              disabled={deleting === e.id}
              className="h-8 w-8 rounded-lg border border-[var(--border)] flex items-center justify-center hover:border-red-400/50 hover:text-red-400 transition-colors cursor-pointer disabled:opacity-50"
              aria-label={`Delete ${e.role} at ${e.company}`}
            >
              {deleting === e.id ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Trash2 size={14} />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
