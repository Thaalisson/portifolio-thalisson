import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import { MapPin, ArrowRight, Download } from "lucide-react";
import bgImage from "../assets/IMG_2459.jpg";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

export default function HeroMain() {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const fullText = t("heroText.fullText");
  const roles = t("heroText.roles");
  const valueProps = t("heroText.valueProps");
  const cta = t("heroText.cta");

  const [charIndex, setCharIndex] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const [subtext, setSubtext] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Reset animation on language change
  useEffect(() => {
    setCharIndex(0);
    setSubtext("");
    setRoleIndex(0);
    setIsDeleting(false);
  }, [language]);

  // Type the name
  useEffect(() => {
    if (charIndex < fullText.length) {
      const t = setTimeout(() => setCharIndex((i) => i + 1), 100);
      return () => clearTimeout(t);
    }
  }, [charIndex, fullText]);

  // Cycle roles
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;

    if (!isDeleting && subtext !== current) {
      timeout = setTimeout(() => setSubtext(current.slice(0, subtext.length + 1)), 80);
    } else if (isDeleting && subtext !== "") {
      timeout = setTimeout(() => setSubtext(current.slice(0, subtext.length - 1)), 50);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting((prev) => !prev);
        if (!isDeleting) return;
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 1200);
    }

    return () => clearTimeout(timeout);
  }, [subtext, isDeleting, roleIndex, roles]);

  const nameComplete = charIndex >= fullText.length;

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.section
      key="hero"
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen px-6 lg:px-16 relative flex items-start justify-start text-foreground"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "60% 18%",
        paddingTop: "calc(64px + 16vh)",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(to right, rgba(8,12,18,0.85) 45%, rgba(8,12,18,0.2) 100%)"
              : "linear-gradient(to right, rgba(248,250,252,0.88) 45%, rgba(248,250,252,0.25) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-xl">

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-1.5 text-sm text-foreground/50 mb-5"
        >
          <MapPin size={12} />
          <span>London, ON, Canada</span>
        </motion.div>

        {/* Name — inline style wins over any CSS layer conflict */}
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-3"
          style={{ color: "hsl(var(--foreground))" }}
        >
          {fullText.slice(0, charIndex)}
          {!nameComplete && (
            <span
              className="ml-0.5 inline-block w-[3px] rounded-sm animate-pulse align-middle"
              style={{ height: "0.82em", backgroundColor: "hsl(var(--primary))" }}
            />
          )}
        </h1>

        {/* Role — inline style for same reason */}
        <p
          className="text-xl sm:text-2xl font-medium mb-8 h-9"
          style={{ color: "hsl(var(--primary))" }}
        >
          {subtext}
          {subtext && (
            <span
              className="ml-0.5 inline-block w-[2px] rounded-sm animate-pulse align-middle"
              style={{ height: "0.82em", backgroundColor: "hsl(var(--primary))" }}
            />
          )}
        </p>

        {/* Value prop — fades in after name finishes */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: nameComplete ? 1 : 0, y: nameComplete ? 0 : 6 }}
          transition={{ duration: 0.6 }}
          className="text-base text-foreground/55 mb-12 leading-relaxed"
        >
          {valueProps}
        </motion.p>

        {/* CTAs — slide up after value prop */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: nameComplete ? 1 : 0, y: nameComplete ? 0 : 8 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => scrollTo("projects")}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200"
            style={{
              backgroundColor: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {cta.work}
            <ArrowRight size={15} />
          </button>
          <a
            href="/Thalisson_Pereira_Resume_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200"
            style={{
              border: "1px solid hsl(var(--foreground) / 0.25)",
              color: "hsl(var(--foreground) / 0.75)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "hsl(var(--primary))";
              e.currentTarget.style.color = "hsl(var(--primary))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "hsl(var(--foreground) / 0.25)";
              e.currentTarget.style.color = "hsl(var(--foreground) / 0.75)";
            }}
          >
            <Download size={14} />
            {cta.resume}
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: nameComplete ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center gap-6 mt-10 pt-8 border-t border-foreground/10"
        >
          <div>
            <div className="text-xl font-bold" style={{ color: "hsl(var(--foreground))" }}>13+</div>
            <div className="text-[11px] text-foreground/40 tracking-wide mt-0.5">
              {language === "en" ? "Years exp." : "Anos exp."}
            </div>
          </div>
          <div className="w-px h-7 bg-foreground/15" />
          <div>
            <div className="text-xl font-bold" style={{ color: "hsl(var(--foreground))" }}>40%</div>
            <div className="text-[11px] text-foreground/40 tracking-wide mt-0.5">
              {language === "en" ? "Cost reduction" : "Redução de custo"}
            </div>
          </div>
          <div className="w-px h-7 bg-foreground/15" />
          <div>
            <div className="text-xl font-bold" style={{ color: "hsl(var(--foreground))" }}>5+</div>
            <div className="text-[11px] text-foreground/40 tracking-wide mt-0.5">
              {language === "en" ? "Industries" : "Indústrias"}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/40"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
      >
        <FaArrowDown size={16} />
      </motion.div>
    </motion.section>
  );
}
