import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedGame from "@/components/FeaturedGame";
import Games from "@/components/Games";
import About from "@/components/About";
import Team from "@/components/Team";
import Careers from "@/components/Careers";
import Gallery from "@/components/Gallery";
import Philosophy from "@/components/Philosophy";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedGame />
        <Games />
        <About />
        <Team />
        <Careers />
        <Gallery />
        <Philosophy />
        <Contact />
      </main>
    </>
  );
}
