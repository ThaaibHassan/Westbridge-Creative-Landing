import Hero from "@/components/sections/Hero";
import Philosophy from "@/components/sections/Philosophy";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Philosophy />
      <Services />
      <Work />
      <Process />
      <About />
      <Contact />
    </main>
  );
}
