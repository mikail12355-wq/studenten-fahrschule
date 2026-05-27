"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll } from "framer-motion";

interface NavLink {
  href: string;
  label: string;
  external?: boolean; // true = eigene Seite, false = Anchor auf Homepage
}

const navLinks: NavLink[] = [
  { href: "#klassen", label: "Führerscheinklassen" },
  { href: "#preise", label: "Preise" },
  { href: "/kalender", label: "Theorietermine", external: true },
  { href: "#ueber-uns", label: "Über uns" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  const handleNavClick = (link: NavLink) => {
    setMenuOpen(false);

    if (link.external) {
      router.push(link.href);
      return;
    }

    // Anchor link: navigate to homepage first if not already there
    if (pathname !== "/") {
      router.push("/" + link.href);
      return;
    }

    document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCtaClick = () => {
    setMenuOpen(false);
    if (pathname !== "/") {
      router.push("/#kontakt");
      return;
    }
    document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname !== "/") {
      router.push("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.header
      role="banner"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      animate={{
        backgroundColor: scrolled || pathname !== "/" ? "#1a1a2e" : "transparent",
        boxShadow: scrolled || pathname !== "/" ? "0 2px 20px rgba(0,0,0,0.3)" : "none",
      }}
      transition={{ duration: 0.3 }}
    >
      <nav
        aria-label="Hauptnavigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
      >
        {/* Logo */}
        <a
          href="/"
          onClick={handleLogoClick}
          className="flex items-center gap-2 font-display font-700 text-white"
          aria-label="Die Studentenfahrschule – Startseite"
        >
          <span className="text-accent text-2xl font-black">SF</span>
          <span className="text-sm font-semibold hidden sm:block leading-tight">
            Die<br />Studentenfahrschule
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link)}
                className={`text-sm font-medium transition-colors duration-200 cursor-pointer hover:text-accent ${
                  link.external && pathname === link.href
                    ? "text-accent"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA Desktop */}
        <motion.button
          onClick={handleCtaClick}
          className="hidden md:block bg-accent hover:bg-accent-hover text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Jetzt anmelden
        </motion.button>

        {/* Hamburger */}
        <button
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <motion.span
            className="block w-6 h-0.5 bg-white rounded-full origin-center"
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-white rounded-full"
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-white rounded-full origin-center"
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile Navigation"
            className="md:hidden bg-secondary border-t border-white/10"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <ul className="px-4 py-4 flex flex-col gap-1" role="list">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <button
                    onClick={() => handleNavClick(link)}
                    className="w-full text-left text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.06 }}
                className="pt-2"
              >
                <button
                  onClick={handleCtaClick}
                  className="w-full bg-accent text-white py-3 rounded-full font-semibold text-center cursor-pointer"
                >
                  Jetzt anmelden
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
