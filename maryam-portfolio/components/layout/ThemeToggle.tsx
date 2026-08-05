"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** True only after hydration — avoids a server/client theme mismatch without an effect-triggered re-render. */
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return <div className="h-9 w-9 rounded-full border border-[var(--border)]" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="h-9 w-9 rounded-full border border-[var(--border)] flex items-center justify-center hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)] transition-colors cursor-pointer"
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
