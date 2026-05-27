"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen haben"),
  email: z.string().email("Bitte gib eine gültige E-Mail-Adresse ein"),
  telefon: z.string().optional(),
  nachricht: z.string().min(10, "Nachricht muss mindestens 10 Zeichen haben"),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Adresse",
    value: "Sorauer Straße 16, 10997 Berlin",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Telefon",
    value: "030 250 15 902 / 0176 2005 17 36",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "E-Mail",
    value: "info@studenten-fahrschule.de",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Bürozeiten",
    value: "Telefonisch erfragen",
  },
];

export default function Kontakt() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    setSubmitting(true);
    const subject = encodeURIComponent(`Anfrage von ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nE-Mail: ${data.email}${data.telefon ? `\nTelefon: ${data.telefon}` : ""}\n\n${data.nachricht}`
    );
    window.location.href = `mailto:info@studenten-fahrschule.de?subject=${subject}&body=${body}`;
    setSubmitted(true);
    reset();
    setSubmitting(false);
  };

  const inputClass = (hasError: boolean) =>
    `w-full bg-surface rounded-xl px-4 py-3 text-primary text-sm outline-none border transition-all duration-200 placeholder:text-gray-400 ${
      hasError
        ? "border-accent focus:border-accent"
        : "border-gray-200 focus:border-primary"
    }`;

  return (
    <section
      id="kontakt"
      aria-labelledby="kontakt-heading"
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
            Kontakt
          </span>
          <h2
            id="kontakt-heading"
            className="text-3xl sm:text-4xl font-display font-black text-primary mt-2"
          >
            Bereit für den Führerschein?
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Melde dich jetzt an oder stelle uns deine Fragen – wir melden uns
            schnellstmöglich bei dir.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center bg-surface rounded-3xl p-12"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">E-Mail-Programm geöffnet!</h3>
                <p className="text-gray-500 mb-6">
                  Deine Nachricht wurde in deinem E-Mail-Programm vorbereitet. Bitte sende sie ab, um uns zu kontaktieren.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-accent font-semibold hover:underline cursor-pointer"
                >
                  Weitere Nachricht senden
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="bg-surface rounded-3xl p-8 space-y-5"
                aria-label="Kontaktformular"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-primary mb-1.5">
                    Name <span className="text-accent" aria-label="Pflichtfeld">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Dein vollständiger Name"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name")}
                    className={inputClass(!!errors.name)}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="text-accent text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-primary mb-1.5">
                    E-Mail <span className="text-accent" aria-label="Pflichtfeld">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="deine@email.de"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                    className={inputClass(!!errors.email)}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="text-accent text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="telefon" className="block text-sm font-semibold text-primary mb-1.5">
                    Telefon <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    id="telefon"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+49 30 ..."
                    {...register("telefon")}
                    className={inputClass(false)}
                  />
                </div>

                <div>
                  <label htmlFor="nachricht" className="block text-sm font-semibold text-primary mb-1.5">
                    Nachricht <span className="text-accent" aria-label="Pflichtfeld">*</span>
                  </label>
                  <textarea
                    id="nachricht"
                    rows={5}
                    placeholder="Welche Führerscheinklasse interessiert dich? Hast du Fragen zum Kurs?"
                    aria-required="true"
                    aria-invalid={!!errors.nachricht}
                    aria-describedby={errors.nachricht ? "nachricht-error" : undefined}
                    {...register("nachricht")}
                    className={`${inputClass(!!errors.nachricht)} resize-none`}
                  />
                  {errors.nachricht && (
                    <p id="nachricht-error" role="alert" className="text-accent text-xs mt-1">
                      {errors.nachricht.message}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-accent hover:bg-accent-hover disabled:bg-gray-300 text-white py-4 rounded-full font-bold transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed"
                  whileHover={!submitting ? { scale: 1.02 } : {}}
                  whileTap={!submitting ? { scale: 0.98 } : {}}
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Wird gesendet...
                    </span>
                  ) : (
                    "Nachricht senden"
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Right – info + map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            {/* Contact info */}
            <div className="bg-primary rounded-3xl p-8">
              <h3 className="text-lg font-display font-bold text-white mb-6">
                Kontaktdaten
              </h3>
              <address className="not-italic space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center text-accent shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-white/50 text-xs font-medium uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="text-white font-medium text-sm mt-0.5">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </address>
            </div>

            {/* Map */}
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm flex-1 min-h-[260px]">
              <iframe
                title="Standort Die Studentenfahrschule – Sorauer Straße 16, 10997 Berlin"
                src="https://maps.google.com/maps?q=Sorauer+Stra%C3%9Fe+16%2C+10997+Berlin&output=embed"
                width="100%"
                height="100%"
                style={{ minHeight: "260px", border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Google Maps: Sorauer Straße 16, 10997 Berlin"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
