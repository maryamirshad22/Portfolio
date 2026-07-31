"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, X } from "lucide-react";
import { SkillGroup } from "@/types";

interface SkillGroupFormProps {
  initial?: SkillGroup;
}

interface SkillItemDraft {
  name: string;
  level: string; // kept as string while editing, parsed to number on submit
}

const inputClass =
  "w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent-violet)] transition-colors disabled:opacity-50";
const labelClass = "block text-sm mb-1.5 text-[var(--text-muted)]";

export function SkillGroupForm({ initial }: SkillGroupFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initial);
  const [id, setId] = useState(initial?.id ?? "");
  const [label, setLabel] = useState(initial?.label ?? "");
  const [items, setItems] = useState<SkillItemDraft[]>(
    initial?.items.map((i) => ({ name: i.name, level: String(i.level) })) ?? [
      { name: "", level: "50" },
    ]
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function updateItem(index: number, key: keyof SkillItemDraft, value: string) {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, [key]: value } : it)));
  }

  function addItem() {
    setItems((prev) => [...prev, { name: "", level: "50" }]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const cleanedItems = items
      .map((it) => ({ name: it.name.trim(), level: Number(it.level) }))
      .filter((it) => it.name.length > 0);

    const payload = { id: id.trim(), label: label.trim(), items: cleanedItems };

    if (!payload.id) return setError('"ID" is required — it looks empty (or just whitespace).');
    if (!payload.label)
      return setError('"Label" is required — it looks empty (or just whitespace).');
    if (payload.items.length === 0)
      return setError("Add at least one skill with a name before saving.");
    if (payload.items.some((it) => Number.isNaN(it.level) || it.level < 0 || it.level > 100)) {
      return setError("Each skill's level must be a number between 0 and 100.");
    }

    setSaving(true);

    try {
      const url = isEditing ? `/api/admin/skills/${initial!.id}` : "/api/admin/skills";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");

      router.push("/admin/skills");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} htmlFor="id">
            ID {isEditing && <span className="text-[var(--text-faint)]">(locked)</span>}
          </label>
          <input
            id="id"
            required
            disabled={isEditing}
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="frontend"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="label">
            Label
          </label>
          <input
            id="label"
            required
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Frontend"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className={labelClass + " mb-0"}>Skills in this group</label>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-accent-violet)] hover:underline cursor-pointer"
          >
            <Plus size={12} /> Add skill
          </button>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={item.name}
                onChange={(e) => updateItem(i, "name", e.target.value)}
                placeholder="Skill name, e.g. React & Next.js"
                className={inputClass + " flex-1"}
              />
              <input
                type="number"
                min={0}
                max={100}
                value={item.level}
                onChange={(e) => updateItem(i, "level", e.target.value)}
                className={inputClass + " w-24 text-center"}
              />
              <span className="text-xs text-[var(--text-faint)] shrink-0">%</span>
              <button
                type="button"
                onClick={() => removeItem(i)}
                disabled={items.length === 1}
                className="h-8 w-8 shrink-0 rounded-lg border border-[var(--border)] flex items-center justify-center hover:border-red-400/50 hover:text-red-400 transition-colors disabled:opacity-30 cursor-pointer"
                aria-label="Remove skill"
              >
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-cyan)] text-white disabled:opacity-60 cursor-pointer"
        >
          {saving && <Loader2 size={15} className="animate-spin" />}
          {isEditing ? "Save changes" : "Create group"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/skills")}
          className="rounded-full px-6 py-2.5 text-sm font-medium border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
