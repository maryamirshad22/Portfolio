"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { cn } from "@/lib/utils";

// Concrete hex values for GSAP to interpolate (GSAP can't smoothly tween CSS var() references).
const TWINKLE_COLORS = ["#6d5ef9", "#22d3ee", "#34d399", "#f472b6"];

/**
 * Adapted from the common "Background Boxes" pattern. The original renders a
 * 150x100 grid (15,000 divs) sized for a single bounded hero container — far
 * too heavy to keep mounted behind every section of a full page. This version
 * cuts the grid down to roughly 750 cells and pulls colors/borders from the
 * site's theme tokens so it adapts to dark/light mode automatically.
 *
 * On top of the original's hover-only interaction, a GSAP loop continuously
 * "twinkles" random cells on its own — so the grid stays visibly alive even
 * without the cursor moving over it.
 */
export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rows = new Array(30).fill(1);
  const cols = new Array(25).fill(1);

  // Brand accent palette instead of arbitrary pastels, so hovers stay on-brand.
  const colors = [
    "var(--color-accent-violet)",
    "var(--color-accent-cyan)",
    "var(--color-accent-emerald)",
    "var(--color-accent-pink)",
  ];

  // Precomputed once (not during render) so hover colors stay pure/stable per cell.
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
      // Animate a small cluster each cycle so the effect reads clearly at any grid size.
      const batch = gsap.utils.shuffle([...cells]).slice(0, 3);
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
      call = gsap.delayedCall(gsap.utils.random(0.4, 1.1), twinkle);
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
      style={{
        transform:
          "translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)",
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <div key={`row${i}`} className="w-16 h-8 border-l border-[var(--border)] relative">
          {cols.map((_, j) => (
            <motion.div
              data-cell
              whileHover={{
                backgroundColor: colorGrid[i][j],
                transition: { duration: 0 },
              }}
              key={`col${j}`}
              className="w-16 h-8 border-r border-t border-[var(--border)] relative"
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
