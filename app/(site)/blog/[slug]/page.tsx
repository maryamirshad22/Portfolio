import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { siteConfig } from "@/data/social";
import { Badge } from "@/components/ui/Badge";
import { BlogContent } from "@/components/ui/BlogContent";
import { Reveal } from "@/components/ui/Reveal";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${siteConfig.url}/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: siteConfig.name },
  };

  return (
    <article className="mx-auto max-w-2xl px-4 sm:px-6 pt-32 pb-24 sm:pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Reveal>
        <Link
          href="/#blog"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Back to writing
        </Link>

        <div className="flex items-center gap-3 mb-5">
          <Badge variant="accent">{post.tag}</Badge>
          <span className="font-mono-eyebrow text-xs text-[var(--text-faint)]">
            {post.date} · {post.readTime}
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-12">
          {post.excerpt}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <BlogContent blocks={post.content} />
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-16 pt-8 border-t border-[var(--border)] flex items-center justify-between">
          <p className="text-sm text-[var(--text-muted)]">
            Written by {siteConfig.name}
          </p>
          <Link
            href="/#contact"
            className="text-sm font-medium text-[var(--color-accent-violet)] hover:underline"
          >
            Get in touch →
          </Link>
        </div>
      </Reveal>
    </article>
  );
}
