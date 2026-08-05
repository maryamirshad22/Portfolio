import { BlogBlock } from "@/types";

export function BlogContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="font-display text-xl sm:text-2xl font-semibold pt-4"
              >
                {block.text}
              </h2>
            );
          case "p":
            return (
              <p
                key={i}
                className="text-base text-[var(--text-muted)] leading-relaxed"
              >
                {block.text}
              </p>
            );
          case "list":
            return (
              <ul key={i} className="space-y-2.5">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-base text-[var(--text-muted)] leading-relaxed"
                  >
                    <span className="text-[var(--color-accent-violet)] mt-1 shrink-0">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "code":
            return (
              <pre
                key={i}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 overflow-x-auto text-sm"
              >
                <code className="font-mono">{block.text}</code>
              </pre>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
