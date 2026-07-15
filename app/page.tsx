import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { TechStack } from "@/components/sections/TechStack";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { AIProjects } from "@/components/sections/AIProjects";
import { OpenSource } from "@/components/sections/OpenSource";
import { GithubStats } from "@/components/sections/GithubStats";
import { LearningJourney } from "@/components/sections/LearningJourney";
import { Certifications } from "@/components/sections/Certifications";
import { Timeline } from "@/components/sections/Timeline";
import { Testimonials } from "@/components/sections/Testimonials";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <TechStack />
      <Experience />
      <Projects />
      <AIProjects />
      <GithubStats />
      <OpenSource />
      <LearningJourney />
      <Certifications />
      <Timeline />
      <Testimonials />
      <Blog />
      <Contact />
    </>
  );
}
