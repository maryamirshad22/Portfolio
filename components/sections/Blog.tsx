import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { blogPosts } from "@/data/blog";
import { FileText, ArrowUpRight } from "lucide-react";

export function Blog() {
  return (
    <section id="blog" className="mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Writing"
        title="Notes from the build."
        description="Long-form write-ups on what I'm learning, straight from shipping real projects."
      />

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
    </section>
  );
}
