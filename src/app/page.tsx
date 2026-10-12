import Contact from "@/components/home/Contact";
import Experience from "@/components/home/Experience";
import Hero from "@/components/home/Hero";
import Nav from "@/components/home/Nav";
import OffDuty from "@/components/home/OffDuty";
import Projects from "@/components/home/Projects";
import Ticker from "@/components/home/Ticker";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden text-black">
      <Nav />
      <Hero />
      <Ticker />
      <Experience />
      <Projects />
      <OffDuty />
      <Contact />
    </main>
  );
}
