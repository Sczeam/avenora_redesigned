import { Hero } from "@/components/home/hero";
import { PhilosophySection } from "@/components/home/philosophy";
import { ProcessSection } from "@/components/home/process";
import { ProjectsSection } from "@/components/home/projects";
import { ServicesSection } from "@/components/home/services";

export default function Home() {
  return (
    <>
      <Hero />
      <PhilosophySection />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
    </>
  );
}
