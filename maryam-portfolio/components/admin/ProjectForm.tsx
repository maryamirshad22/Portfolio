"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Project } from "@/types";

interface ProjectFormProps {
  initial?: Project;
}

const emptyProject = {
  slug: "",
  title: "",
  tagline: "",
  description: "",
  category: "web" as "web" | "ai",
  image: "",
  tech: "",
  features: "",
  challenges: "",
  role: "",
  github: "",
  githubNote: "",
  demo: "",
  demoNote: "",
  featured: true,
  year: "",
};

function toFormState(p?: Project) {
  if (!p) return emptyProject;
  return {
    slug: p.slug,
    title: p.title,
    tagline: p.tagline,
    description: p.description,
    category: p.category,
    image: p.image,
    tech: p.tech.join(", "),
    features: p.features.join("\n"),
    challenges: p.challenges.join("\n"),
    role: p.role,
    github: p.github ?? "",
    githubNote: p.githubNote ?? "",
    demo: p.demo ?? "",
    demoNote: p.demoNote ?? "",
    featured: p.featured ?? true,
    year: p.year ?? "",
  };
}

const inputClass =
  "w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent-violet)] transition-colors disabled:opacity-50";
const labelClass = "block text-sm mb-1.5 text-[var(--text-muted)]";

export function ProjectForm({ initial }: ProjectFormProps) {
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
    setSaving(true);
    setError("");

    const payload = {
      slug: form.slug.trim(),
      title: form.title.trim(),
      tagline: form.tagline.trim(),
      description: form.description.trim(),
      category: form.category,
      image: form.image.trim(),
      tech: form.tech.split(",").map((t) => t.trim()).filter(Boolean),
      features: form.features.split("\n").map((t) => t.trim()).filter(Boolean),
      challenges: form.challenges.split("\n").map((t) => t.trim()).filter(Boolean),
      role: form.role.trim(),
      github: form.github.trim() || undefined,
      githubNote: form.githubNote.trim() || undefined,
      demo: form.demo.trim() || undefined,
      demoNote: form.demoNote.trim() || undefined,
      featured: form.featured,
      year: form.year.trim() || undefined,
    };

    try {
      const url = isEditing ? `/api/admin/projects/${initial!.slug}` : "/api/admin/projects";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");

      router.push("/admin");
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
          <label className={labelClass} htmlFor="slug">
            Slug {isEditing && <span className="text-[var(--text-faint)]">(locked)</span>}
          </label>
          <input
            id="slug"
            required
            disabled={isEditing}
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            placeholder="my-project-name"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => set("category", e.target.value as "web" | "ai")}
            className={inputClass}
          >
            <option value="web">Web</option>
            <option value="ai">AI</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="title">
          Title
        </label>
        <input
          id="title"
          required
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="tagline">
          Tagline
        </label>
        <input
          id="tagline"
          required
          value={form.tagline}
          onChange={(e) => set("tagline", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          required
          rows={3}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="image">
          Image path
        </label>
        <input
          id="image"
          required
          value={form.image}
          onChange={(e) => set("image", e.target.value)}
          placeholder="/images/projects/my-project.svg"
          className={inputClass}
        />
        <p className="text-xs text-[var(--text-faint)] mt-1.5">
          Upload the image to <code>public/images/projects/</code> and reference its path here.
        </p>
      </div>

      <div>
        <label className={labelClass} htmlFor="tech">
          Tech stack <span className="text-[var(--text-faint)]">(comma-separated)</span>
        </label>
        <input
          id="tech"
          value={form.tech}
          onChange={(e) => set("tech", e.target.value)}
          placeholder="Next.js, TypeScript, Django"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="features">
          Key features <span className="text-[var(--text-faint)]">(one per line)</span>
        </label>
        <textarea
          id="features"
          rows={4}
          value={form.features}
          onChange={(e) => set("features", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="challenges">
          Challenges solved <span className="text-[var(--text-faint)]">(one per line)</span>
        </label>
        <textarea
          id="challenges"
          rows={4}
          value={form.challenges}
          onChange={(e) => set("challenges", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="role">
          My role
        </label>
        <textarea
          id="role"
          required
          rows={2}
          value={form.role}
          onChange={(e) => set("role", e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} htmlFor="github">
            GitHub URL <span className="text-[var(--text-faint)]">(if public)</span>
          </label>
          <input
            id="github"
            value={form.github}
            onChange={(e) => set("github", e.target.value)}
            placeholder="https://github.com/..."
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="githubNote">
            GitHub note <span className="text-[var(--text-faint)]">(if not public)</span>
          </label>
          <input
            id="githubNote"
            value={form.githubNote}
            onChange={(e) => set("githubNote", e.target.value)}
            placeholder="Private repository"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="demo">
            Live demo URL
          </label>
          <input
            id="demo"
            value={form.demo}
            onChange={(e) => set("demo", e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="demoNote">
            Demo note <span className="text-[var(--text-faint)]">(if no live link)</span>
          </label>
          <input
            id="demoNote"
            value={form.demoNote}
            onChange={(e) => set("demoNote", e.target.value)}
            placeholder="In development"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="year">
            Year <span className="text-[var(--text-faint)]">(optional)</span>
          </label>
          <input
            id="year"
            value={form.year}
            onChange={(e) => set("year", e.target.value)}
            placeholder="2026"
            className={inputClass}
          />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input
            id="featured"
            type="checkbox"
            checked={form.featured}
            onChange={(e) => set("featured", e.target.checked)}
            className="h-4 w-4 accent-[var(--color-accent-violet)]"
          />
          <label htmlFor="featured" className="text-sm text-[var(--text-muted)]">
            Show in Featured Projects
          </label>
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
          {isEditing ? "Save changes" : "Create project"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="rounded-full px-6 py-2.5 text-sm font-medium border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
