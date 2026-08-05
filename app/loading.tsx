export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-[var(--border)]" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--color-accent-violet)] animate-spin" />
        </div>
        <p className="font-mono-eyebrow text-xs text-[var(--text-faint)] uppercase tracking-widest">
          Loading
        </p>
      </div>
    </div>
  );
}
