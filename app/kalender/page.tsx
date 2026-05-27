import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Theoriekalender from "@/components/Theoriekalender";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Theorietermine | Die Studentenfahrschule Berlin",
  description:
    "Alle wöchentlichen Theoriestunden der Studentenfahrschule Berlin auf einen Blick. Klasse B (dienstags), Klasse A / B196 (montags). Jetzt Termin sichern!",
  alternates: {
    canonical: "https://www.studenten-fahrschule.de/kalender",
  },
};

export default function KalenderPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-16" style={{ background: "#ffffff" }}>
        <Theoriekalender />
      </main>
      <Footer />
    </>
  );
}
