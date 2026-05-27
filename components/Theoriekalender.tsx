"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTermineForMonth, getUpcomingTermine, RecurringTermin } from "@/data/termine";
import { isHoliday } from "@/lib/holidays";

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const MONTHS = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

interface ModalData {
  date: Date;
  termine: RecurringTermin[];
  holidayName: string | null;
}

export default function Theoriekalender() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [direction, setDirection] = useState(1);
  const [modal, setModal] = useState<ModalData | null>(null);

  const termine = useMemo(
    () => getTermineForMonth(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const upcoming = useMemo(() => getUpcomingTermine(4), []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  }, [currentMonth]);

  const goToNext = useCallback(() => {
    setDirection(1);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  }, [currentMonth]);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    // ISO week: Monday = 0 offset
    const startOffset = (firstDay.getDay() + 6) % 7;
    const cells: Array<{ day: number | null; date: Date | null }> = [];

    for (let i = 0; i < startOffset; i++) {
      cells.push({ day: null, date: null });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, date: new Date(currentYear, currentMonth, d) });
    }
    // Pad to complete last row
    while (cells.length % 7 !== 0) {
      cells.push({ day: null, date: null });
    }
    return cells;
  }, [currentYear, currentMonth]);

  const handleDayClick = (cell: { day: number | null; date: Date | null }) => {
    if (!cell.day || !cell.date) return;
    const dayTermine = termine.get(cell.day) ?? [];
    const holidayName = isHoliday(cell.date);
    if (dayTermine.length > 0 || holidayName) {
      setModal({ date: cell.date, termine: dayTermine, holidayName });
    }
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString("de-DE", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <section
      id="kalender"
      aria-labelledby="kalender-heading"
      className="py-20 lg:py-28 bg-white"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Theorietermine
          </span>
          <h2
            id="kalender-heading"
            className="text-3xl sm:text-4xl font-display font-black text-primary mt-2"
          >
            Wann findet Theorie statt?
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Wöchentliche Theoriestunden – einfach Termin auswählen und anmelden.
          </p>
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6 flex-wrap" role="list" aria-label="Kalender-Legende">
            <div className="flex items-center gap-2" role="listitem">
              <span className="w-4 h-4 rounded-full bg-blue-500 inline-block" aria-hidden="true" />
              <span className="text-sm text-gray-600">Theorie Klasse B (Di)</span>
            </div>
            <div className="flex items-center gap-2" role="listitem">
              <span className="w-4 h-4 rounded-full bg-red-500 inline-block" aria-hidden="true" />
              <span className="text-sm text-gray-600">Theorie Klasse A / B196 (Mo)</span>
            </div>
            <div className="flex items-center gap-2" role="listitem">
              <span className="w-4 h-4 rounded-full bg-gray-300 inline-block" aria-hidden="true" />
              <span className="text-sm text-gray-600">Feiertag Berlin</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-surface rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={goToPrev}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
              aria-label="Vorheriger Monat"
            >
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.h3
                key={`${currentYear}-${currentMonth}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-xl font-display font-bold text-primary"
                aria-live="polite"
              >
                {MONTHS[currentMonth]} {currentYear}
              </motion.h3>
            </AnimatePresence>

            <button
              onClick={goToNext}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
              aria-label="Nächster Monat"
            >
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 mb-2" role="row">
            {WEEKDAYS.map((d) => (
              <div key={d} className="text-center text-xs font-semibold text-gray-400 py-2" role="columnheader" aria-label={d}>
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${currentYear}-${currentMonth}-grid`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="grid grid-cols-7 gap-1"
              role="grid"
              aria-label={`Kalender ${MONTHS[currentMonth]} ${currentYear}`}
            >
              {calendarDays.map((cell, idx) => {
                if (!cell.day || !cell.date) {
                  return <div key={`empty-${idx}`} className="aspect-square" role="gridcell" aria-hidden="true" />;
                }

                const dayTermine = termine.get(cell.day) ?? [];
                const holidayName = isHoliday(cell.date);
                const isToday =
                  cell.date.toDateString() === today.toDateString();
                const isPast = cell.date < today && !isToday;
                const hasEvent = dayTermine.length > 0;
                const isClickable = hasEvent || !!holidayName;

                return (
                  <div
                    key={cell.day}
                    role="gridcell"
                    aria-label={`${cell.day}. ${MONTHS[currentMonth]}${hasEvent ? ": " + dayTermine.map(t => t.title).join(", ") : ""}${holidayName ? " (Feiertag: " + holidayName + ")" : ""}`}
                    onClick={() => handleDayClick(cell)}
                    tabIndex={isClickable ? 0 : undefined}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") handleDayClick(cell);
                    }}
                    className={`
                      relative aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-medium transition-all duration-150
                      ${isClickable ? "cursor-pointer" : "cursor-default"}
                      ${isToday ? "ring-2 ring-accent ring-offset-1" : ""}
                      ${holidayName ? "bg-gray-100 text-gray-400" : ""}
                      ${!holidayName && isPast ? "text-gray-300" : ""}
                      ${!holidayName && !isPast && !isToday ? "text-primary hover:bg-gray-100" : ""}
                      ${isToday && !holidayName ? "bg-primary text-white" : ""}
                    `}
                  >
                    <span>{cell.day}</span>
                    {/* Event dots */}
                    {hasEvent && (
                      <div className="flex gap-0.5 mt-0.5" aria-hidden="true">
                        {dayTermine.map((t) => (
                          <span
                            key={t.klasse}
                            className={`w-1.5 h-1.5 rounded-full ${
                              t.klasse === "klasse-b" ? "bg-blue-500" : "bg-red-500"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Upcoming events */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10"
        >
          <h3 className="text-xl font-display font-bold text-primary mb-4">
            Nächste Theorietermine
          </h3>
          <div className="space-y-3" role="list" aria-label="Kommende Theorietermine">
            {upcoming.slice(0, 6).map(({ date, termin }, i) => (
              <motion.div
                key={`${date.toISOString()}-${termin.klasse}`}
                role="listitem"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-4 bg-surface rounded-2xl px-5 py-4 border border-gray-100"
              >
                <div
                  className={`w-3 h-3 rounded-full shrink-0 ${
                    termin.klasse === "klasse-b" ? "bg-blue-500" : "bg-red-500"
                  }`}
                  aria-hidden="true"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-primary text-sm">{termin.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {date.toLocaleDateString("de-DE", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}{" "}
                    · {termin.time}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    termin.klasse === "klasse-b"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {termin.klasse === "klasse-b" ? "Klasse B" : "Klasse A / B196"}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-5 text-sm text-gray-500 bg-accent/5 border border-accent/20 rounded-xl px-5 py-3"
            role="note"
          >
            <strong className="text-accent">Hinweis:</strong> Anmeldung telefonisch (030 250 15 902 / 0176 2005 17 36) oder per E-Mail (info@studenten-fahrschule.de) erforderlich.
          </motion.p>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setModal(null)}
              aria-hidden="true"
            />
            <motion.div
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 z-10"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <button
                onClick={() => setModal(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                aria-label="Schließen"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h4 id="modal-title" className="text-xl font-display font-bold text-primary mb-1">
                {formatDate(modal.date)}
              </h4>

              {modal.holidayName && (
                <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                  <span className="text-orange-500">🎌</span>
                  Feiertag: {modal.holidayName}
                </p>
              )}

              {modal.termine.length === 0 && !modal.holidayName && (
                <p className="text-gray-500 text-sm">Kein Theorietermin an diesem Tag.</p>
              )}

              {modal.termine.map((t) => (
                <div
                  key={t.klasse}
                  className={`rounded-2xl p-5 mb-3 last:mb-0 ${
                    t.klasse === "klasse-b" ? "bg-blue-50 border border-blue-100" : "bg-red-50 border border-red-100"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        t.klasse === "klasse-b" ? "bg-blue-500" : "bg-red-500"
                      }`}
                      aria-hidden="true"
                    />
                    <h5 className="font-bold text-primary">{t.title}</h5>
                  </div>
                  <div className="space-y-1.5 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Uhrzeit:</span> {t.time}
                    </p>
                    <p>
                      <span className="font-medium">Ort:</span> {t.ort}
                    </p>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">{t.hinweis}</p>
                  </div>
                </div>
              ))}

              <button
                onClick={() => {
                  setModal(null);
                  document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-5 w-full bg-accent text-white py-3 rounded-full font-semibold cursor-pointer hover:bg-accent-hover transition-colors"
              >
                Jetzt anmelden
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
