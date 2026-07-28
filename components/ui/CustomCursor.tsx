"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";

const emptySubscribe = () => () => {};

/** True only once we can confirm (client-side) this is a fine-pointer device with motion allowed. */
function useCursorEnabled() {
  return useSyncExternalStore(
    emptySubscribe,
    () => {
      const isFinePointer = window.matchMedia("(pointer: fine)").matches;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      return isFinePointer && !prefersReducedMotion;
    },
    () => false
  );
}

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const enabled = useCursorEnabled();

  useEffect(() => {
    if (!enabled || !ringRef.current || !dotRef.current) return;

    document.documentElement.classList.add("custom-cursor-active");

    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.5, ease: "power3.out" });
    const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.12, ease: "power3.out" });

    function onMouseMove(e: MouseEvent) {
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, input, textarea, [role='button'], [data-cursor-hover]"
      );
      gsap.to(ringRef.current, {
        scale: interactive ? 1.8 : 1,
        opacity: interactive ? 0.5 : 1,
        duration: 0.25,
        ease: "power2.out",
      });
    }

    function onMouseLeaveWindow() {
      gsap.to([ringRef.current, dotRef.current], { opacity: 0, duration: 0.2 });
    }
    function onMouseEnterWindow() {
      gsap.to([ringRef.current, dotRef.current], { opacity: 1, duration: 0.2 });
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseleave", onMouseLeaveWindow);
    document.addEventListener("mouseenter", onMouseEnterWindow);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      document.removeEventListener("mouseenter", onMouseEnterWindow);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[200] h-8 w-8 -ml-4 -mt-4 rounded-full border border-[var(--color-accent-violet)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[200] h-1.5 w-1.5 -ml-[3px] -mt-[3px] rounded-full bg-[var(--color-accent-violet)] pointer-events-none"
        aria-hidden="true"
      />
    </>
  );
}
