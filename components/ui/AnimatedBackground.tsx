"use client";

import { Boxes } from "./background-boxes";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 opacity-70">
        <Boxes />
      </div>
      {/*
        Plain radial-gradient overlay (not mask-image) — transparent in the
        middle so the grid shows through, fading to the solid page background
        color toward the edges. Using `background` here instead of CSS masking
        avoids any browser/vendor-prefix inconsistencies with mask-image.
      */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 75% at 50% 35%, transparent 0%, var(--bg) 85%)",
        }}
      />
    </div>
  );
}
