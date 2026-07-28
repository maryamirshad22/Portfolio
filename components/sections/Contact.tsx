"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Mail, MapPin, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { siteConfig } from "@/data/social";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Contact"
        title="Have a project in mind?"
        description="Whether it's a full-stack build or an AI agent, I'd love to hear about it."
      />

      <div className="grid lg:grid-cols-5 gap-10">
        <Reveal className="lg:col-span-2 space-y-6">
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-4 p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] transition-colors"
          >
            <div className="h-11 w-11 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center shrink-0">
              <Mail size={17} className="text-[var(--color-accent-violet)]" />
            </div>
            <div>
              <p className="text-xs text-[var(--text-faint)] font-mono-eyebrow uppercase">Email</p>
              <p className="text-sm font-medium">{siteConfig.email}</p>
            </div>
          </a>
          <div className="flex items-center gap-4 p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <div className="h-11 w-11 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center shrink-0">
              <MapPin size={17} className="text-[var(--color-accent-cyan)]" />
            </div>
            <div>
              <p className="text-xs text-[var(--text-faint)] font-mono-eyebrow uppercase">Location</p>
              <p className="text-sm font-medium">{siteConfig.location} · Remote-friendly</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm mb-2 text-[var(--text-muted)]">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  minLength={2}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent-violet)] hover:border-[var(--border-strong)] transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-[var(--text-muted)]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent-violet)] hover:border-[var(--border-strong)] transition-colors"
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm mb-2 text-[var(--text-muted)]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                rows={5}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent-violet)] hover:border-[var(--border-strong)] transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit" size="lg" disabled={status === "loading"}>
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending...
                  </>
                ) : (
                  "Send message"
                )}
              </Button>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-sm text-[var(--color-accent-emerald)]"
                  >
                    <CheckCircle2 size={15} /> Message sent
                  </motion.span>
                )}
                {status === "error" && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-sm text-red-400"
                  >
                    <XCircle size={15} /> {errorMsg}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
