// import { SectionHeading } from "@/components/ui/SectionHeading";
// import { GlassCard } from "@/components/ui/GlassCard";
// import { Reveal } from "@/components/ui/Reveal";
// import { certifications } from "@/data/experience";
// import { Award } from "lucide-react";

// export function Certifications() {
//   return (
//     <section id="certifications" className="mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-32">
//       <SectionHeading eyebrow="Certifications" title="Credentials & applied study." />

//       <div className="grid sm:grid-cols-2 gap-4">
//         {certifications.map((c, i) => (
//           <Reveal key={c.name} delay={i * 0.06}>
//             <GlassCard className="flex items-center gap-4">
//               <div className="h-10 w-10 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center shrink-0">
//                 <Award size={16} className="text-[var(--color-accent-emerald)]" />
//               </div>
//               <div className="min-w-0">
//                 <p className="font-medium text-sm truncate">{c.name}</p>
//                 <p className="text-xs text-[var(--text-faint)] mt-0.5">
//                   {c.issuer} · {c.date}
//                 </p>
//               </div>
//             </GlassCard>
//           </Reveal>
//         ))}
//       </div>
//     </section>
//   );
// }
