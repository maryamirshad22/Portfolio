"use client";

import { Boxes } from "./background-boxes";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <Boxes />
      <div
        className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_70%_70%_at_50%_35%,transparent,black)]"
        style={{ background: "var(--bg)" }}
      />
    </div>
  );
}
