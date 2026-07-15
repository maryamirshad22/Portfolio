"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  User,
  Code2,
  Briefcase,
  FolderGit2,
  Sparkles,
  Mail,
  CornerDownLeft,
} from "lucide-react";
import { GithubMark } from "./BrandIcons";

interface Command {
  label: string;
  hint: string;
  icon: React.ElementType;
  action: () => void;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const goTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
    setQuery("");
  }, []);

  const commands: Command[] = [
    { label: "About", hint: "Who I am", icon: User, action: () => goTo("about") },
    { label: "Skills", hint: "What I know", icon: Sparkles, action: () => goTo("skills") },
    { label: "Experience", hint: "Where I've worked", icon: Briefcase, action: () => goTo("experience") },
    { label: "Projects", hint: "What I've built", icon: FolderGit2, action: () => goTo("projects") },
    { label: "AI Projects", hint: "Agent & MCP work", icon: Code2, action: () => goTo("ai-projects") },
    { label: "Contact", hint: "Get in touch", icon: Mail, action: () => goTo("contact") },
    {
      label: "Open GitHub",
      hint: "github.com/maryamirshad22",
      icon: GithubMark,
      action: () => window.open("https://github.com/maryamirshad22", "_blank"),
    },
  ];

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
              <Search size={16} className="text-[var(--text-faint)]" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section..."
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-[var(--text-faint)]"
              />
              <kbd className="hidden sm:inline text-[10px] font-mono-eyebrow border border-[var(--border)] rounded px-1.5 py-0.5 text-[var(--text-faint)]">
                ESC
              </kbd>
            </div>
            <div className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="text-sm text-[var(--text-faint)] px-3 py-6 text-center">
                  No matches.
                </p>
              )}
              {filtered.map((c) => (
                <button
                  key={c.label}
                  onClick={c.action}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-[var(--surface-hover)] transition-colors group"
                >
                  <c.icon size={16} className="text-[var(--text-muted)]" />
                  <span className="flex-1">
                    <span className="block text-sm">{c.label}</span>
                    <span className="block text-xs text-[var(--text-faint)]">{c.hint}</span>
                  </span>
                  <CornerDownLeft
                    size={14}
                    className="text-[var(--text-faint)] opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
