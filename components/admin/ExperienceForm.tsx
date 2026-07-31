"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ExperienceItem } from "@/types";

interface ExperienceFormProps {
  initial?: ExperienceItem;
}

const emptyExperience = {
  id: "",
  company: "",
  role: "",
  start: "",
  end: "",
  location: "",
  summary: "",
  highlights: "",
  stack: "",
};

function toFormState(e?: ExperienceItem) {
  if (!e) return emptyExperience;
  return {
    id: e.id,
    company: e.company,
    role: e.role,
    start: e.start,
    end: e.end,
    location: e.location,
    summary: e.summary,
    highlights: e.highlights.join("\n"),
    stack: e.stack.join(", "),
  };
}

const inputClass =
  "w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent-violet)] transition-colors disabled:opacity-50";
const labelClass = "block text-sm mb-1.5 text-[var(--text-muted)]";

export function ExperienceForm({ initial }: ExperienceFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initial);
  const [form, setForm] = useState(toFormState(initial));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const payload = {
      id: form.id.trim(),
      company: form.company.trim(),
      role: form.role.trim(),
      start: form.start.trim(),
      end: form.end.trim(),
      location: form.location.trim(),
      summary: form.summary.trim(),
      highlights: form.highlights.split("\n").map((t) => t.trim()).filter(Boolean),
      stack: form.stack.split(",").map((t) => t.trim()).filter(Boolean),
    };

    const requiredFields: { key: keyof typeof payload; label: string }[] = [
      { key: "id", label: "ID" },
      { key: "company", label: "Company" },
      { key: "role", label: "Role" },
      { key: "start", label: "Start date" },
      { key: "end", label: "End date" },
      { key: "location", label: "Location" },
      { key: "summary", label: "Summary" },
    ];
    const missing = requiredFields.find((f) => !payload[f.key]);
    if (missing) {
      setError(`"${missing.label}" is required — it looks empty (or just whitespace).`);
      return;
    }

    setSaving(true);

    try {
      const url = isEditing ? `/api/admin/experience/${initial!.id}` : "/api/admin/experience";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");

      router.push("/admin/experience");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label className={labelClass} htmlFor="id">
          ID {isEditing && <span className="text-[var(--text-faint)]">(locked)</span>}
        </label>
        <input
          id="id"
          required
          disabled={isEditing}
          value={form.id}
          onChange={(e) => set("id", e.target.value)}
          placeholder="company-role-slug"
          className={inputClass}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} htmlFor="company">
            Company
          </label>
          <input
            id="company"
            required
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="role">
            Role
          </label>
          <input
            id="role"
            required
            value={form.role}
            onChange={(e) => set("role", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="start">
            Start
          </label>
          <input
            id="start"
            required
            value={form.start}
            onChange={(e) => set("start", e.target.value)}
            placeholder="March 2026"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="end">
            End
          </label>
          <input
            id="end"
            required
            value={form.end}
            onChange={(e) => set("end", e.target.value)}
            placeholder="Present"
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="location">
            Location
          </label>
          <input
            id="location"
            required
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="summary">
          Summary
        </label>
        <textarea
          id="summary"
          required
          rows={3}
          value={form.summary}
          onChange={(e) => set("summary", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="highlights">
          Highlights <span className="text-[var(--text-faint)]">(one per line)</span>
        </label>
        <textarea
          id="highlights"
          rows={4}
          value={form.highlights}
          onChange={(e) => set("highlights", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="stack">
          Stack <span className="text-[var(--text-faint)]">(comma-separated)</span>
        </label>
        <input
          id="stack"
          value={form.stack}
          onChange={(e) => set("stack", e.target.value)}
          placeholder="Next.js, Django, Docker"
          className={inputClass}
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-cyan)] text-white disabled:opacity-60 cursor-pointer"
        >
          {saving && <Loader2 size={15} className="animate-spin" />}
          {isEditing ? "Save changes" : "Create entry"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/experience")}
          className="rounded-full px-6 py-2.5 text-sm font-medium border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
