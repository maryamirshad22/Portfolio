"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut, ExternalLink } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Projects", href: "/admin" },
  { label: "Experience", href: "/admin/experience" },
  { label: "Skills", href: "/admin/skills" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="border-b border-[var(--border)] sticky top-0 z-10 bg-[var(--bg)]/90 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/admin" className="font-display font-semibold">
            Portfolio Admin
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              View site <ExternalLink size={13} />
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 flex items-center gap-1 pb-3">
          {navItems.map((item) => {
            const active =
              item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm transition-colors",
                  active
                    ? "bg-[var(--surface)] border border-[var(--border-strong)] text-[var(--text)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-10">{children}</main>
    </div>
  );
}
