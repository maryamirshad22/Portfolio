import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { blogPosts } from "@/data/experience";
import { FileText } from "lucide-react";

export function Blog() {
  return (
    <section id="blog" className="mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Writing"
        title="Notes from the build."
        description="Long-form write-ups on what I'm learning — launching soon."
      />

      <div className="grid sm:grid-cols-2 gap-6">
        {blogPosts.map((post, i) => (
          <Reveal key={post.title} delay={i * 0.08}>
            <GlassCard hover={false} className="opacity-80">
              <div className="flex items-center justify-between mb-4">
                <FileText size={18} className="text-[var(--text-faint)]" />
                <Badge>{post.tag}</Badge>
              </div>
              <h3 className="font-display font-semibold mb-2">{post.title}</h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">{post.excerpt}</p>
              <p className="font-mono-eyebrow text-xs text-[var(--text-faint)]">
                {post.date} · {post.readTime}
              </p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
