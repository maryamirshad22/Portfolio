import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillsTabs } from "./SkillsTabs";
import { readSkillGroups } from "@/lib/skills-store";

export function Skills() {
  const skillGroups = readSkillGroups();

  return (
    <section id="skills" className="mx-auto max-w-4xl px-4 sm:px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Skills"
        title="What I bring to a team."
        description="A working proficiency map — grown through shipped projects, not just tutorials."
        align="center"
      />
      <SkillsTabs groups={skillGroups} />
    </section>
  );
}
