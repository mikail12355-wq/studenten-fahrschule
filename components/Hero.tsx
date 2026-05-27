"use client";

import { motion } from "framer-motion";

// Fixed values to avoid SSR/client hydration mismatch (no Math.random() at render time)
const PARTICLES = [
  { w: 3.2, h: 2.1, left: 5,  top: 12, dur: 4.2, delay: 0.3 },
  { w: 5.1, h: 4.8, left: 14, top: 67, dur: 6.1, delay: 1.7 },
  { w: 2.4, h: 2.9, left: 22, top: 34, dur: 5.0, delay: 0.9 },
  { w: 4.7, h: 3.3, left: 31, top: 80, dur: 3.8, delay: 2.1 },
  { w: 3.9, h: 5.2, left: 40, top: 22, dur: 6.7, delay: 0.5 },
  { w: 2.1, h: 2.5, left: 48, top: 55, dur: 4.5, delay: 3.2 },
  { w: 5.5, h: 3.1, left: 57, top: 8,  dur: 5.3, delay: 1.1 },
  { w: 3.6, h: 4.4, left: 63, top: 73, dur: 3.6, delay: 2.8 },
  { w: 2.8, h: 2.2, left: 72, top: 41, dur: 6.9, delay: 0.7 },
  { w: 4.3, h: 3.7, left: 81, top: 18, dur: 4.1, delay: 3.5 },
  { w: 3.1, h: 5.0, left: 88, top: 62, dur: 5.8, delay: 1.4 },
  { w: 5.9, h: 2.7, left: 95, top: 90, dur: 3.3, delay: 2.0 },
  { w: 2.6, h: 3.8, left: 9,  top: 50, dur: 6.4, delay: 0.2 },
  { w: 4.0, h: 4.1, left: 18, top: 28, dur: 4.8, delay: 3.8 },
  { w: 3.4, h: 2.3, left: 35, top: 95, dur: 5.5, delay: 1.6 },
  { w: 5.2, h: 3.5, left: 52, top: 38, dur: 3.9, delay: 2.4 },
  { w: 2.9, h: 5.4, left: 66, top: 85, dur: 6.2, delay: 0.8 },
  { w: 4.6, h: 2.8, left: 75, top: 5,  dur: 4.6, delay: 3.1 },
  { w: 3.3, h: 4.7, left: 84, top: 47, dur: 5.7, delay: 1.9 },
  { w: 2.5, h: 3.2, left: 92, top: 25, dur: 3.4, delay: 2.6 },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      aria-label="Hero-Bereich"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.w,
              height: p.h,
              left: `${p.left}%`,
              top: `${p.top}%`,
              background: i % 3 === 0 ? "#e94560" : "rgba(255,255,255,0.3)",
            }}
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}

        {/* Road lines */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background:
              "linear-gradient(to top, rgba(233,69,96,0.08), transparent)",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-32"
          style={{ background: "linear-gradient(to top, #e94560, transparent)" }}
          animate={{ scaleY: [0.8, 1, 0.8], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block bg-accent/20 text-accent border border-accent/30 rounded-full px-4 py-1.5 text-sm font-semibold mb-6 tracking-wide uppercase">
              Fahrschule Berlin-Kreuzberg
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white leading-tight mb-6"
          >
            Dein Führerschein.{" "}
            <span className="text-accent">Schnell.</span>{" "}
            Stressfrei.{" "}
            <span className="text-accent">Günstig.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Intensivkurse, flexible Fahrstunden ab 8:00 Uhr täglich, Treffpunkt
            TU Berlin. Klassen B, A, A1, A2 und B196 – erfahrene Fahrlehrer,
            faire Preise.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={() => scrollTo("#kontakt")}
              className="relative bg-accent text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Jetzt zur Fahrschule anmelden"
            >
              <motion.span
                className="absolute inset-0 rounded-full bg-accent"
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative">Jetzt anmelden</span>
            </motion.button>

            <motion.button
              onClick={() => scrollTo("#preise")}
              className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-200 cursor-pointer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Preise ansehen
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
            role="list"
            aria-label="Fahrschule-Kennzahlen"
          >
            {[
              { value: "500+", label: "Absolventen" },
              { value: "10+", label: "Jahre Erfahrung" },
              { value: "★★★★★", label: "Bewertet" },
            ].map((stat) => (
              <div key={stat.label} className="text-center" role="listitem">
                <div className="text-2xl font-black text-accent">{stat.value}</div>
                <div className="text-white/60 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        aria-hidden="true"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
          <motion.div
            className="w-1 h-2 bg-white rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
