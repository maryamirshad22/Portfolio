"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface BlobConfig {
  className: string;
  style: React.CSSProperties;
  parallax: number;
}

const blobs: BlobConfig[] = [
  {
    className: "aurora-blob",
    style: {
      top: "-8%",
      left: "-6%",
      width: "42vw",
      height: "42vw",
      maxWidth: 620,
      maxHeight: 620,
      background: "var(--color-accent-violet)",
    },
    parallax: 1.4,
  },
  {
    className: "aurora-blob",
    style: {
      top: "28%",
      right: "-10%",
      width: "36vw",
      height: "36vw",
      maxWidth: 560,
      maxHeight: 560,
      background: "var(--color-accent-cyan)",
    },
    parallax: -1.8,
  },
  {
    className: "aurora-blob",
    style: {
      bottom: "-14%",
      left: "18%",
      width: "38vw",
      height: "38vw",
      maxWidth: 600,
      maxHeight: 600,
      background: "var(--color-accent-emerald)",
    },
    parallax: 1.1,
  },
  {
    className: "aurora-blob",
    style: {
      top: "55%",
      left: "48%",
      width: "26vw",
      height: "26vw",
      maxWidth: 420,
      maxHeight: 420,
      background: "var(--color-accent-pink)",
      opacity: 0.3,
    },
    parallax: -2.2,
  },
];

export function AnimatedBackground() {
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const elements = blobRefs.current.filter(Boolean) as HTMLDivElement[];

      // Continuous organic floating loop — randomized per blob so nothing repeats in sync
      elements.forEach((el, i) => {
        gsap.to(el, {
          x: gsap.utils.random(-90, 90),
          y: gsap.utils.random(-70, 70),
          scale: gsap.utils.random(0.9, 1.25),
          duration: gsap.utils.random(12, 20),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.4,
        });
      });

      // Subtle mouse-parallax layered on top, via quickTo for smooth interpolation
      const parallaxSetters = elements.map((el, i) => ({
        x: gsap.quickTo(el, "xPercent", { duration: 1.4, ease: "power3.out" }),
        y: gsap.quickTo(el, "yPercent", { duration: 1.4, ease: "power3.out" }),
        factor: blobs[i]?.parallax ?? 1,
      }));

      function onMouseMove(e: MouseEvent) {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        parallaxSetters.forEach((s) => {
          s.x(nx * s.factor * 10);
          s.y(ny * s.factor * 10);
        });
      }

      window.addEventListener("mousemove", onMouseMove);
      return () => window.removeEventListener("mousemove", onMouseMove);
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="aurora-bg" aria-hidden="true">
      {blobs.map((b, i) => (
        <div
          key={i}
          ref={(el) => {
            blobRefs.current[i] = el;
          }}
          className={b.className}
          style={b.style}
        />
      ))}
    </div>
  );
}
