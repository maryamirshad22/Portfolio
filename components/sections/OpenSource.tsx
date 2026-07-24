// import { SectionHeading } from "@/components/ui/SectionHeading";
// import { GlassCard } from "@/components/ui/GlassCard";
// import { Badge } from "@/components/ui/Badge";
// import { Reveal } from "@/components/ui/Reveal";
// import { GitPullRequest, ExternalLink } from "lucide-react";

// const contributions = [
//   {
//     repo: "modelcontextprotocol/servers",
//     description: "Fixed a schema-validation edge case in a reference MCP server example.",
//     type: "Bug fix",
//     url: "https://github.com/modelcontextprotocol/servers",
//   },
//   {
//     repo: "vercel/next.js",
//     description: "Improved a documentation example for App Router route handlers.",
//     type: "Docs",
//     url: "https://github.com/vercel/next.js",
//   },
//   {
//     repo: "django-ninja/django-ninja",
//     description: "Reported and helped reproduce an issue with nested schema serialization.",
//     type: "Issue",
//     url: "https://github.com/vitalik/django-ninja",
//   },
// ];

// export function OpenSource() {
//   return (
//     <section id="open-source" className="mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-32">
//       <SectionHeading
//         eyebrow="Contributing"
//         title="Giving back to the tools I use."
//       />

//       <div className="space-y-4">
//         {contributions.map((c, i) => (
//           <Reveal key={c.repo} delay={i * 0.08}>
//             <a href={c.url} target="_blank" rel="noopener noreferrer" className="block">
//               <GlassCard className="flex items-center gap-4">
//                 <div className="h-10 w-10 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center shrink-0">
//                   <GitPullRequest size={16} className="text-[var(--color-accent-violet)]" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-2 mb-1">
//                     <p className="font-mono-eyebrow text-sm truncate">{c.repo}</p>
//                     <Badge>{c.type}</Badge>
//                   </div>
//                   <p className="text-sm text-[var(--text-muted)]">{c.description}</p>
//                 </div>
//                 <ExternalLink size={15} className="text-[var(--text-faint)] shrink-0" />
//               </GlassCard>
//             </a>
//           </Reveal>
//         ))}
//       </div>
//     </section>
//   );
// }
