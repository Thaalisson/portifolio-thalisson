import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "#hero" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Navbar Container */}
      <motion.nav
        className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-black/30 shadow-md transition-all"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
      >
        {/* Placeholder minimalista (vazio ou futura logo) */}
        <div className="text-sm font-bold text-transparent">.</div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex space-x-6 text-sm uppercase font-semibold tracking-wide text-[color:var(--color-text-light)] dark:text-[color:var(--color-text-dark)] hacker:text-[color:var(--color-text-hacker)]">
          {links.map((link) => (
            <li key={link.name}>
              <a href={link.href} className="hover:text-teal-400 transition">
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme Toggle + Mobile Menu Icon */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Slide Menu for Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 right-0 w-3/4 h-screen bg-black/90 backdrop-blur-md p-8 z-40 flex flex-col space-y-8 text-white"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium hover:text-teal-400 transition"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
