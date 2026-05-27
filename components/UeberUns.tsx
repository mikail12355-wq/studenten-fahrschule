"use client";

import { motion } from "framer-motion";

export default function UeberUns() {
  return (
    <section
      id="ueber-uns"
      aria-labelledby="ueber-uns-heading"
      className="py-20 lg:py-28 bg-surface"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left – visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
            aria-hidden="true"
          >
            <div className="relative bg-primary rounded-3xl overflow-hidden aspect-[4/3] flex items-end p-8">
              {/* Abstract city illustration */}
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
                  }}
                />
                {/* Buildings silhouette */}
                <svg
                  className="absolute bottom-0 left-0 right-0 w-full"
                  viewBox="0 0 400 200"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect x="0" y="100" width="60" height="100" fill="rgba(255,255,255,0.05)" />
                  <rect x="10" y="60" width="40" height="140" fill="rgba(255,255,255,0.08)" />
                  <rect x="80" y="80" width="50" height="120" fill="rgba(255,255,255,0.06)" />
                  <rect x="140" y="40" width="35" height="160" fill="rgba(255,255,255,0.09)" />
                  <rect x="185" y="70" width="55" height="130" fill="rgba(255,255,255,0.05)" />
                  <rect x="250" y="50" width="40" height="150" fill="rgba(255,255,255,0.08)" />
                  <rect x="300" y="90" width="60" height="110" fill="rgba(255,255,255,0.06)" />
                  <rect x="360" y="60" width="40" height="140" fill="rgba(255,255,255,0.07)" />
                  {/* TV Tower */}
                  <line x1="200" y1="0" x2="200" y2="80" stroke="rgba(233,69,96,0.6)" strokeWidth="3" />
                  <circle cx="200" cy="20" r="12" fill="rgba(233,69,96,0.3)" />
                  <circle cx="200" cy="20" r="6" fill="#e94560" />
                  {/* Street */}
                  <rect x="0" y="190" width="400" height="10" fill="rgba(255,255,255,0.1)" />
                  <line x1="200" y1="190" x2="200" y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="8 8" />
                </svg>
              </div>

              {/* Address card */}
              <div className="relative z-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 w-full">
                <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1">
                  Unser Standort
                </p>
                <p className="text-white font-bold text-lg leading-tight">
                  Sorauer Straße 16<br />
                  <span className="font-normal text-white/70 text-base">10997 Berlin-Kreuzberg</span>
                </p>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-5 -right-5 bg-accent text-white rounded-2xl px-5 py-3 shadow-lg"
            >
              <p className="text-xs font-medium opacity-80">Treffpunkt</p>
              <p className="font-bold text-sm">TU Berlin</p>
            </motion.div>
          </motion.div>

          {/* Right – text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">
              Über uns
            </span>
            <h2
              id="ueber-uns-heading"
              className="text-3xl sm:text-4xl font-display font-black text-primary mt-2 mb-6"
            >
              Fahrschule mit Herz,<br />mitten in Berlin
            </h2>

            <p className="text-gray-600 leading-relaxed mb-5">
              Die Studentenfahrschule wurde von{" "}
              <strong className="text-primary">Joachim Köhne</strong> gegründet
              und richtet sich besonders an Studierende und junge Menschen in
              Berlin. Unser Ziel: ein entspannter, sicherer und schneller Weg
              zum Führerschein – ohne unnötigen Stress.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Wir bieten Fahrstunden ab täglich 8:00 Uhr an, mit einem
              praktischen Treffpunkt direkt am{" "}
              <strong className="text-primary">Ernst-Reuter-Platz / TU Berlin</strong>.
              Ob klassischer Führerschein oder Intensivkurs – wir passen uns
              deinem Zeitplan an.
            </p>

            {/* Highlights */}
            <ul className="space-y-3 mb-8" role="list" aria-label="Unsere Stärken">
              {[
                { icon: "🎯", text: "Leitung durch Joachim Köhne – persönliche Betreuung" },
                { icon: "📍", text: "Treffpunkt TU Berlin / Ernst-Reuter-Platz" },
                { icon: "⏰", text: "Fahrstunden täglich ab 8:00 Uhr vereinbar" },
                { icon: "❄️", text: "Motorradausbildung auch im Winter" },
              ].map((item) => (
                <motion.li
                  key={item.text}
                  role="listitem"
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="text-xl shrink-0" aria-hidden="true">{item.icon}</span>
                  <span className="text-gray-600 text-sm leading-relaxed">{item.text}</span>
                </motion.li>
              ))}
            </ul>

            <motion.button
              onClick={() =>
                document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-primary hover:bg-secondary text-white px-8 py-4 rounded-full font-semibold transition-colors duration-200 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Kontakt aufnehmen
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
