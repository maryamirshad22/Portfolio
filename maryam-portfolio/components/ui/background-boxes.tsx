"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { cn } from "@/lib/utils";

// Concrete hex values for GSAP to interpolate (GSAP can't smoothly tween CSS var() references).
const TWINKLE_COLORS = ["#6d5ef9", "#22d3ee", "#34d399", "#f472b6"];

/**
 * Adapted from the common "Background Boxes" pattern. Two changes from the
 * original 150x100-cell version:
 *  1. Grid density cut way down (from 15,000 cells to ~1,200) — the original
 *     is sized for one bounded hero container, not a permanent site-wide layer.
 *  2. The original's skewX/skewY/scale/translate transform is dropped entirely.
 *     That transform assumes a huge oversized grid (150x100) to still cover the
 *     viewport after being skewed and shrunk to 67.5% — at our much smaller
 *     cell count, the same transform left the visible grid far too small to
 *     cover the screen at all. A plain, non-transformed grid sized to the
 *     viewport is simpler and guarantees full coverage.
 */
export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // 34 cols x 36 rows at 64x32px cells comfortably covers up to ~2176x1152px —
  // safely covers the vast majority of real screens as a `fixed` (viewport-only) layer.
  const rows = new Array(36).fill(1);
  const cols = new Array(34).fill(1);

  // Brand accent palette instead of arbitrary pastels, so hovers stay on-brand.
  const colors = [
    "var(--color-accent-violet)",
    "var(--color-accent-cyan)",
    "var(--color-accent-emerald)",
    "var(--color-accent-pink)",
  ];

  // Precomputed once (not during render) so hover colors stay stable per cell.
  const colorGrid = React.useMemo(
    () =>
      rows.map(() =>
        cols.map(() => colors[Math.floor(Math.random() * colors.length)])
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const cells = Array.from(
      containerRef.current.querySelectorAll<HTMLDivElement>("[data-cell]")
    );
    if (cells.length === 0) return;

    let cancelled = false;
    let call: gsap.core.Tween | null = null;

    function twinkle() {
      if (cancelled) return;
      const batch = gsap.utils.shuffle([...cells]).slice(0, 4);
      batch.forEach((cell) => {
        gsap.fromTo(
          cell,
          { backgroundColor: "rgba(0,0,0,0)" },
          {
            backgroundColor: gsap.utils.random(TWINKLE_COLORS),
            duration: 0.6,
            ease: "power1.inOut",
            yoyo: true,
            repeat: 1,
          }
        );
      });
      call = gsap.delayedCall(gsap.utils.random(0.35, 0.9), twinkle);
    }

    twinkle();

    return () => {
      cancelled = true;
      call?.kill();
      gsap.killTweensOf(cells);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 flex flex-col overflow-hidden", className)}
      {...rest}
    >
      {rows.map((_, i) => (
        <div key={`row${i}`} className="flex shrink-0">
          {cols.map((_, j) => (
            <motion.div
              data-cell
              whileHover={{
                backgroundColor: colorGrid[i][j],
                transition: { duration: 0 },
              }}
              key={`col${j}`}
              className="w-16 h-8 shrink-0 border-r border-t border-[var(--border-strong)] relative"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-6 w-10 -top-[14px] -left-[22px] text-[var(--border-strong)] stroke-[1px] pointer-events-none"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
