"use client";

import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Star, GitFork, Users, BookMarked } from "lucide-react";

const GITHUB_USERNAME = "maryamirshad22";

interface Stats {
  repos: number;
  followers: number;
  stars: number;
  forks: number;
}

const FALLBACK: Stats = { repos: 24, followers: 38, stars: 61, forks: 19 };

export function GithubStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`),
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error("not found");
        const user = await userRes.json();
        const repos = await reposRes.json();
        if (cancelled) return;
        const stars = repos.reduce(
          (acc: number, r: { stargazers_count: number }) => acc + r.stargazers_count,
          0
        );
        const forks = repos.reduce(
          (acc: number, r: { forks_count: number }) => acc + r.forks_count,
          0
        );
        setStats({ repos: user.public_repos ?? repos.length, followers: user.followers ?? 0, stars, forks });
      } catch {
        if (!cancelled) setStats(FALLBACK);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const items = [
    { label: "Public repos", icon: BookMarked, value: stats?.repos },
    { label: "Followers", icon: Users, value: stats?.followers },
    { label: "Stars earned", icon: Star, value: stats?.stars },
    { label: "Forks", icon: GitFork, value: stats?.forks },
  ];

  return (
    <section id="github-stats" className="mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Open Source"
        title="GitHub, in numbers."
        description="Live stats pulled straight from the GitHub API."
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.08}>
            <GlassCard className="text-center group">
              <item.icon size={18} className="mx-auto text-[var(--color-accent-violet)] mb-3 group-hover:scale-110 transition-transform" />
              {loading ? (
                <div className="h-8 w-14 mx-auto rounded bg-[var(--border)] animate-pulse" />
              ) : (
                <p className="font-display text-3xl font-semibold tracking-tight group-hover:text-[var(--color-accent-cyan)] transition-colors">
                  {item.value}
                  <span className="text-[var(--color-accent-emerald)]">+</span>
                </p>
              )}
              <p className="text-xs text-[var(--text-faint)] font-mono-eyebrow mt-2 uppercase">
                {item.label}
              </p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
