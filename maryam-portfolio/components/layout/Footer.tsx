"use client";

import { Mail, ArrowUp } from "lucide-react";
import { GithubMark, LinkedinMark } from "@/components/ui/BrandIcons";
import { siteConfig, socialLinks } from "@/data/social";

const iconMap = { Github: GithubMark, Linkedin: LinkedinMark, Mail };

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight mb-2">
              Let&apos;s build something{" "}
              <span className="text-gradient">intelligent</span>.
            </p>
            <p className="text-sm text-[var(--text-muted)]">
              {siteConfig.name} — {siteConfig.role}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((s) => {
              const Icon = iconMap[s.icon as keyof typeof iconMap];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="h-10 w-10 rounded-full border border-[var(--border)] flex items-center justify-center hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)] transition-colors"
                >
                  {Icon && <Icon size={16} />}
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-faint)] font-mono-eyebrow">
            © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js &amp; Tailwind CSS.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            Back to top <ArrowUp size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
