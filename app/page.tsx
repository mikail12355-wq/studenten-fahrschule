import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import USPs from "@/components/USPs";
import Klassen from "@/components/Klassen";
import Preise from "@/components/Preise";
import UeberUns from "@/components/UeberUns";
import Bewertungen from "@/components/Bewertungen";
import Kontakt from "@/components/Kontakt";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <USPs />
        <Klassen />
        <Preise />
        <UeberUns />
        <Bewertungen />
        <Kontakt />
      </main>
      <Footer />
    </>
  );
}
