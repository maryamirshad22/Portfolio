"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command, Download } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { siteConfig } from "@/data/social";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Timeline", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[80] transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav
          className={`flex items-center justify-between rounded-2xl px-4 sm:px-5 py-2.5 transition-all duration-300 ${
            scrolled ? "glass" : "bg-transparent"
          }`}
        >
          <a href="#top" className="font-display font-semibold tracking-tight text-sm sm:text-base">
            {siteConfig.name}
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="px-3 py-2 rounded-lg text-sm text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                window.dispatchEvent(
                  new KeyboardEvent("keydown", { key: "k", metaKey: true })
                )
              }
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full border border-[var(--border)] text-xs text-[var(--text-faint)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
            >
              <Command size={12} /> K
            </button>
            <a
              href={siteConfig.resumeUrl}
              download
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors"
            >
              <Download size={13} /> Resume
            </a>
            <ThemeToggle />
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden h-9 w-9 rounded-full border border-[var(--border)] flex items-center justify-center hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
            >
              <Menu size={16} />
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[var(--bg)] lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display font-semibold">{siteConfig.name}</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="h-9 w-9 rounded-full border border-[var(--border)] flex items-center justify-center hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            <ul className="flex flex-col px-6 gap-1 mt-6">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-2xl font-display border-b border-[var(--border)] hover:text-[var(--color-accent-violet)] transition-colors"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
