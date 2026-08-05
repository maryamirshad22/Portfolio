import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, FileText } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Writing",
  description: "Long-form write-ups on full-stack development and AI engineering.",
};

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-32 pb-24 sm:pb-32">
      <Reveal>
        <Link
          href="/#blog"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Back home
        </Link>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
          Writing
        </h1>
        <p className="text-lg text-[var(--text-muted)] mb-14 max-w-lg">
          Notes on what I&apos;m building and learning — full-stack development and AI engineering.
        </p>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-6">
        {blogPosts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.08}>
            <Link href={`/blog/${post.slug}`} className="block group h-full">
              <GlassCard className="h-full">
                <div className="flex items-center justify-between mb-4">
                  <FileText size={18} className="text-[var(--text-faint)]" />
                  <Badge>{post.tag}</Badge>
                </div>
                <h3 className="font-display font-semibold mb-2 group-hover:text-[var(--color-accent-violet)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] mb-5">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <p className="font-mono-eyebrow text-xs text-[var(--text-faint)]">
                    {post.date} · {post.readTime}
                  </p>
                  <ArrowUpRight
                    size={14}
                    className="text-[var(--text-faint)] group-hover:text-[var(--color-accent-violet)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
              </GlassCard>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
