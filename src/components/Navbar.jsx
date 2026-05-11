import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, Globe, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { theme, cycleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["home", "about", "experience", "skills", "projects", "contact"];
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const toggleLanguage = () => setLanguage(language === "en" ? "pt" : "en");

  const navItems = [
    { id: "home", label: t("nav.home") },
    { id: "about", label: t("nav.about") },
    { id: "experience", label: t("nav.experience") },
    { id: "skills", label: t("nav.skills") },
    { id: "projects", label: t("nav.projects") },
    { id: "contact", label: t("nav.contact") },
  ];

  const bgColor =
    theme === "dark" ? "rgba(8, 12, 18, 0.85)" : "rgba(248, 250, 252, 0.85)";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-border/40" : "border-b border-transparent"
      }`}
      style={{
        backgroundColor: scrolled ? bgColor : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <div className="relative flex items-center h-16 px-6 lg:px-10 max-w-7xl mx-auto">

        {/* Logo — left anchor */}
        <button
          onClick={() => scrollToSection("home")}
          className="text-sm font-bold tracking-[0.25em] uppercase text-foreground hover:text-primary transition-colors duration-200 shrink-0"
        >
          TP<span className="text-primary">.</span>DEV
        </button>

        {/* Desktop nav items — absolutely centered */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
          {navItems.map((item) => (
            <div key={item.id} className="relative">
              <button
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200 ${
                  activeSection === item.id
                    ? "text-primary"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
              {activeSection === item.id && (
                <motion.div
                  layoutId="navUnderline"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Desktop right controls */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="/Thalisson_Pereira_Resume_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold bg-primary text-background hover:bg-primary/85 transition-all duration-200"
          >
            <Download size={13} />
            {language === "en" ? "Resume" : "Currículo"}
          </a>
          <div className="flex items-center gap-0.5 pl-3 border-l border-border/60">
            <button
              onClick={cycleTheme}
              className="p-2 rounded-lg text-foreground/60 hover:text-primary hover:bg-primary/8 transition-all duration-200"
              title={theme === "light" ? "Dark mode" : "Light mode"}
            >
              {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
            </button>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold text-foreground/60 hover:text-primary transition-colors duration-200"
            >
              <Globe size={14} />
              {language.toUpperCase()}
            </button>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2 ml-auto">
          <button
            onClick={cycleTheme}
            className="p-1.5 text-foreground/60 hover:text-primary transition-colors"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            onClick={toggleLanguage}
            className="text-xs font-semibold tracking-widest text-foreground/60 hover:text-primary transition-colors"
          >
            {language.toUpperCase()}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-foreground/60 hover:text-primary transition-colors"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="md:hidden border-t border-border/40"
            style={{
              backgroundColor: bgColor,
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <div className="px-5 py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? "text-primary bg-primary/10"
                      : "text-foreground/70 hover:text-foreground hover:bg-primary/5"
                  }`}
                >
                  {activeSection === item.id && (
                    <span className="w-1 h-1 rounded-full bg-primary mr-2 shrink-0" />
                  )}
                  {item.label}
                </button>
              ))}
              <div className="pt-3 border-t border-border/40">
                <a
                  href="/Thalisson_Pereira_Resume_2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-semibold bg-primary text-background hover:bg-primary/85 transition-all duration-200"
                >
                  <Download size={14} />
                  {language === "en" ? "Download Resume" : "Baixar Currículo"}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
