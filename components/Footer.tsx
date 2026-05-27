"use client";

import { useRouter } from "next/navigation";

const navLinks = [
  { href: "#klassen", label: "Führerscheinklassen", external: false },
  { href: "#preise", label: "Preise", external: false },
  { href: "/kalender", label: "Theorietermine", external: true },
  { href: "#ueber-uns", label: "Über uns", external: false },
  { href: "#kontakt", label: "Kontakt", external: false },
];

export default function Footer() {
  const router = useRouter();

  const handleClick = (href: string, external: boolean) => {
    if (external) {
      router.push(href);
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/" + href);
    }
  };

  return (
    <footer className="bg-secondary text-white/60" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-accent text-3xl font-black">SF</span>
              <div className="text-sm font-semibold text-white leading-tight">
                Die<br />Studentenfahrschule
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Deine Fahrschule in Berlin-Kreuzberg. Führerschein Klasse B, A,
              A1, A2 und B196. Intensivkurse, faire Preise, nette Fahrlehrer.
            </p>
            <div className="mt-5 flex items-center gap-1" aria-label="5-Sterne-Bewertung: Ausgezeichnet">
              <span className="text-gold text-lg" aria-hidden="true">★★★★★</span>
              <span className="text-xs ml-1">Ausgezeichnet bewertet</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleClick(link.href, link.external)}
                    className="text-sm hover:text-white transition-colors duration-150 cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Kontakt
            </h3>
            <address className="not-italic space-y-2 text-sm">
              <p>Sorauer Straße 16<br />10997 Berlin</p>
              <p>
                <a
                  href="tel:+493025015902"
                  className="hover:text-white transition-colors"
                >
                  030 250 15 902
                </a>
              </p>
              <p>
                <a
                  href="tel:+4917620051736"
                  className="hover:text-white transition-colors"
                >
                  0176 2005 17 36
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@studenten-fahrschule.de"
                  className="hover:text-white transition-colors break-all"
                >
                  info@studenten-fahrschule.de
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>
            © {new Date().getFullYear()} Die Studentenfahrschule – Joachim Köhne.
            Alle Rechte vorbehalten.
          </p>
          <nav aria-label="Rechtliche Links">
            <ul className="flex items-center gap-5" role="list">
              <li>
                <a
                  href="/impressum"
                  className="hover:text-white transition-colors"
                >
                  Impressum
                </a>
              </li>
              <li>
                <a
                  href="/datenschutz"
                  className="hover:text-white transition-colors"
                >
                  Datenschutz
                </a>
              </li>
              <li>
                <a
                  href="/agb"
                  className="hover:text-white transition-colors"
                >
                  AGB
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
