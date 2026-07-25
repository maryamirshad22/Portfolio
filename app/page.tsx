import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { TechStack } from "@/components/sections/TechStack";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { OpenSource } from "@/components/sections/OpenSource";
import { GithubStats } from "@/components/sections/GithubStats";
import { LearningJourney } from "@/components/sections/LearningJourney";
import { Journey } from "@/components/sections/Journey";
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
      <GithubStats />
      <OpenSource />
      <LearningJourney />
      <Journey />
      <Testimonials />
      <Blog />
      <Contact />
    </>
  );
}
