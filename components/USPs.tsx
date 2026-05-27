"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const usps = [
  {
    icon: "⚡",
    title: "Intensivkurse",
    description:
      "Führerschein in nur 1,5 Wochen – Theorie und Praxis kompakt. Perfekt für alle, die schnell ans Ziel wollen.",
  },
  {
    icon: "😊",
    title: "Stressfreie Ausbildung",
    description:
      "Nette Fahrlehrer, entspannte Atmosphäre, individuelle Betreuung. Bei uns fühlst du dich gut aufgehoben.",
  },
  {
    icon: "🏍️",
    title: "Winter-Motorrad",
    description:
      "Motorradausbildung auch im Winter möglich – wir lassen das ganze Jahr keinen Fahrschüler im Stich.",
  },
];

const stats = [
  { target: 500, suffix: "+", label: "Absolventen" },
  { target: 10, suffix: "+", label: "Jahre Erfahrung" },
  { target: 98, suffix: "%", label: "Bestehensquote" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function USPs() {
  return (
    <section
      id="vorteile"
      aria-labelledby="vorteile-heading"
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
            Warum wir?
          </span>
          <h2
            id="vorteile-heading"
            className="text-3xl sm:text-4xl font-display font-black text-primary mt-2"
          >
            Dein Erfolg ist unser Anspruch
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Die Studentenfahrschule steht für günstige Preise, kompetente
            Fahrlehrer und flexible Ausbildungskonzepte.
          </p>
        </motion.div>

        {/* USP Cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16"
          role="list"
          aria-label="Unsere Vorteile"
        >
          {usps.map((usp, i) => (
            <motion.article
              key={usp.title}
              role="listitem"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 cursor-default"
            >
              <div
                className="text-4xl mb-4"
                aria-hidden="true"
                role="img"
              >
                {usp.icon}
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">{usp.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{usp.description}</p>
            </motion.article>
          ))}
        </div>

        {/* Stats + Rating Badge */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 bg-primary rounded-3xl px-8 py-10">
          <div className="grid grid-cols-3 gap-8 w-full lg:w-auto" role="list" aria-label="Statistiken">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                role="listitem"
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="text-3xl sm:text-4xl font-black text-accent">
                  <AnimatedCounter target={s.target} suffix={s.suffix} />
                </div>
                <div className="text-white/60 text-sm mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Rating Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-2 bg-white/10 border border-white/20 rounded-2xl px-8 py-6"
            aria-label="Kundenbewertung: Ausgezeichnet"
          >
            <div className="text-gold text-2xl tracking-wide" aria-hidden="true">
              ★★★★★
            </div>
            <p className="text-white font-semibold text-base">
              Ausgezeichnet bewertet
            </p>
            <p className="text-white/50 text-xs">von unseren Fahrschülern</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
