"use client";

import { motion } from "framer-motion";
import { preise } from "@/data/preise";

export default function Preise() {
  return (
    <section
      id="preise"
      aria-labelledby="preise-heading"
      className="py-20 lg:py-28 bg-surface"
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
            Preisübersicht
          </span>
          <h2
            id="preise-heading"
            className="text-3xl sm:text-4xl font-display font-black text-primary mt-2"
          >
            Faire Preise, klare Konditionen
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Keine versteckten Kosten – bei uns weißt du von Anfang an, was dich
            der Führerschein kostet.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {preise.map((kategorie, i) => (
            <motion.article
              key={kategorie.klasse}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100"
            >
              {/* Card Header */}
              <div className="bg-primary px-8 py-6 flex items-center gap-4">
                <span className="text-4xl" aria-hidden="true">
                  {kategorie.icon}
                </span>
                <h3 className="text-xl font-display font-bold text-white">
                  {kategorie.klasse}
                </h3>
              </div>

              {/* Pricing rows */}
              <div className="px-8 py-6" role="list" aria-label={`Preise ${kategorie.klasse}`}>
                {kategorie.items.map((item, j) => (
                  <motion.div
                    key={item.bezeichnung}
                    role="listitem"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + j * 0.07 }}
                    className={`flex items-center justify-between py-3 border-b border-gray-50 last:border-0 ${
                      item.highlight
                        ? "rounded-xl bg-accent/5 px-3 -mx-3 border-b-0 mt-1"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {item.highlight && (
                        <span
                          className="text-accent text-xs font-bold bg-accent/10 rounded-full px-2 py-0.5"
                          aria-label="Empfehlung"
                        >
                          TOP
                        </span>
                      )}
                      <span
                        className={`text-sm ${
                          item.highlight
                            ? "font-semibold text-primary"
                            : "text-gray-600"
                        }`}
                      >
                        {item.bezeichnung}
                      </span>
                    </div>
                    <span
                      className={`font-bold text-base ${
                        item.highlight ? "text-accent text-lg" : "text-primary"
                      }`}
                    >
                      {item.preis}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className="px-8 pb-6">
                <motion.button
                  onClick={() =>
                    document
                      .querySelector("#kontakt")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="w-full bg-accent hover:bg-accent-hover text-white py-3 rounded-full font-semibold transition-colors duration-200 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`Jetzt für ${kategorie.klasse} anmelden`}
                >
                  Jetzt anmelden
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
