"use client";

import { motion } from "framer-motion";

const klassen = [
  {
    icon: "🚗",
    klasse: "Klasse B",
    subtitle: "Auto-Führerschein",
    beschreibung:
      "Der klassische Pkw-Führerschein – flexibel, sicher, mit Intensivkurs möglich. Fahrstunden ab 8:00 Uhr täglich vereinbar.",
    preis: "ab 50 € / Std.",
    highlight: "Intensivkurs ab 2.499 €",
    features: [
      "Tägliche Fahrstunden ab 8:00 Uhr",
      "Treffpunkt TU Berlin / Ernst-Reuter-Platz",
      "Intensivkurs in 1,5 Wochen",
    ],
    color: "#e94560",
  },
  {
    icon: "🏍️",
    klasse: "Klasse A / A1 / A2",
    subtitle: "Motorrad-Führerschein",
    beschreibung:
      "Motorradausbildung auf höchstem Niveau – auch im Winter. Von A1 (125er) bis vollwertiger Klasse A.",
    preis: "ab 50 € / Std.",
    highlight: "Auch im Winter",
    features: [
      "Klassen A, A1 und A2",
      "Winterausbildung möglich",
      "Erfahrene Moto-Fahrlehrer",
      "Theorieunterricht montags 19:00 Uhr",
    ],
    color: "#1a1a2e",
  },
  {
    icon: "🛵",
    klasse: "B196",
    subtitle: "Motorrad ohne Prüfung",
    beschreibung:
      "Mit dem B196-Kurs dürfen Inhaber der Klasse B Motorräder bis 125 ccm fahren – ganz ohne Prüfung!",
    preis: "599 € Komplettkurs",
    highlight: "Kein TÜV-Prüfung nötig",
    features: [
      "Nur 3 Fahrstunden + Theorie",
      "Günstigste Motorradoption",
      "Schnelle Terminvergabe",
      "Klasse B Voraussetzung",
    ],
    color: "#0f3460",
  },
];

export default function Klassen() {
  return (
    <section
      id="klassen"
      aria-labelledby="klassen-heading"
      className="py-20 lg:py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Führerscheinklassen
          </span>
          <h2
            id="klassen-heading"
            className="text-3xl sm:text-4xl font-display font-black text-primary mt-2"
          >
            Was möchtest du fahren?
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Ob Auto, Motorrad oder der B196-Kurs – bei uns findest du die
            passende Ausbildung für dein Ziel.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {klassen.map((k, i) => (
            <motion.article
              key={k.klasse}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md flex flex-col"
            >
              {/* Header */}
              <div
                className="px-8 pt-8 pb-6"
                style={{ backgroundColor: k.color }}
              >
                <div className="text-5xl mb-4" aria-hidden="true">
                  {k.icon}
                </div>
                <h3 className="text-2xl font-display font-black text-white">
                  {k.klasse}
                </h3>
                <p className="text-white/70 text-sm mt-1">{k.subtitle}</p>
                <div className="mt-4 inline-block bg-white/20 rounded-full px-3 py-1 text-white text-xs font-semibold">
                  {k.highlight}
                </div>
              </div>

              {/* Body */}
              <div className="px-8 py-6 flex-1 flex flex-col">
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {k.beschreibung}
                </p>

                <ul className="space-y-2 mb-6 flex-1" aria-label={`Features ${k.klasse}`}>
                  {k.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                  <span className="font-bold text-primary text-lg">{k.preis}</span>
                  <motion.button
                    onClick={() =>
                      document
                        .querySelector("#kontakt")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-accent font-semibold text-sm hover:underline cursor-pointer"
                    whileHover={{ x: 4 }}
                    aria-label={`Mehr erfahren über ${k.klasse}`}
                  >
                    Mehr erfahren →
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
