"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { bewertungen } from "@/data/bewertungen";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} von 5 Sternen`} role="img">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-gold text-xl leading-none" aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

export default function Bewertungen() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / bewertungen.length;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(idx, bewertungen.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateActiveIndex, { passive: true });
    return () => el.removeEventListener("scroll", updateActiveIndex);
  }, [updateActiveIndex]);

  const scrollTo = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / bewertungen.length;
    el.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
  };

  const prev = () => scrollTo(Math.max(activeIndex - 1, 0));
  const next = () => scrollTo(Math.min(activeIndex + 1, bewertungen.length - 1));

  return (
    <section
      id="bewertungen"
      aria-labelledby="bewertungen-heading"
      className="py-20 lg:py-28 bg-primary overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Kundenstimmen
          </span>
          <h2
            id="bewertungen-heading"
            className="text-3xl sm:text-4xl font-display font-black text-white mt-2"
          >
            Was unsere Schüler sagen
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-gold text-xl tracking-wide" aria-hidden="true">
              ★★★★★
            </span>
            <span className="text-white/70 text-sm font-medium">
              Ausgezeichnet bewertet
            </span>
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-2"
            role="list"
            aria-label="Kundenbewertungen"
          >
            {bewertungen.map((b, i) => (
              <motion.article
                key={b.name}
                role="listitem"
                whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="
                  snap-center flex-shrink-0
                  w-[85vw] sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-14px)]
                  bg-white/10 backdrop-blur-sm border border-white/10
                  rounded-3xl p-7 flex flex-col gap-4 cursor-default
                "
              >
                {/* Stars */}
                <StarRating count={b.sterne} />

                {/* Quote */}
                <blockquote className="text-white/80 text-sm leading-relaxed flex-1">
                  <span aria-hidden="true" className="text-accent text-2xl leading-none font-serif">"</span>
                  {b.text}
                  <span aria-hidden="true" className="text-accent text-2xl leading-none font-serif">"</span>
                </blockquote>

                {/* Author */}
                <footer className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <div
                    className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold text-sm shrink-0"
                    aria-hidden="true"
                  >
                    {b.name.charAt(0)}
                  </div>
                  <div>
                    <cite className="not-italic font-semibold text-white text-sm">{b.name}</cite>
                    <p className="text-white/40 text-xs">{b.datum}</p>
                  </div>
                </footer>
              </motion.article>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              disabled={activeIndex === 0}
              aria-label="Vorherige Bewertung"
              className="p-3 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2" role="tablist" aria-label="Bewertungsnavigation">
              {bewertungen.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={activeIndex === i}
                  aria-label={`Bewertung ${i + 1}`}
                  onClick={() => scrollTo(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === i
                      ? "bg-accent w-6"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={activeIndex === bewertungen.length - 1}
              aria-label="Nächste Bewertung"
              className="p-3 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
