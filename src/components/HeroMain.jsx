import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import bgImage from "../assets/IMG_2459.jpg";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

export default function HeroMain() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const fullText = t("heroText.fullText");
  const roles = t("heroText.roles");

  const [charIndex, setCharIndex] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const [subtext, setSubtext] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (charIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setCharIndex((i) => i + 1);
      }, 130);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, fullText]);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;

    if (!isDeleting && subtext !== current) {
      timeout = setTimeout(() => {
        setSubtext(current.slice(0, subtext.length + 1));
      }, 90);
    } else if (isDeleting && subtext !== "") {
      timeout = setTimeout(() => {
        setSubtext(current.slice(0, subtext.length - 1));
      }, 60);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting((prev) => !prev);
        if (!isDeleting) return;
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [subtext, isDeleting, roleIndex, roles]);

  return (
    <motion.section
      key="hero"
      id="home"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className={`
        min-h-screen px-6 py-24 relative flex items-center justify-start
        transition-colors duration-500 text-foreground
      `}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 z-0 backdrop-blur-sm"
        style={{
          backgroundColor:
            theme === "dark"
              ? "rgba(8, 12, 18, 0.65)"
              : "rgba(248, 250, 252, 0.7)",
        }}
      />

      {/* Text Content */}
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] mb-4">
          {fullText.slice(0, charIndex)}
          {charIndex < fullText.length && (
            <span className="ml-1 border-r-2 animate-pulse" />
          )}
        </h1>

        <p
          className="text-xl sm:text-2xl font-semibold text-primary"
        >
          {subtext}
          {subtext && <span className="ml-1 border-r-2 animate-pulse" />}
        </p>
      </div>

      {/* Scroll Icon */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-foreground/80 text-xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <FaArrowDown className="opacity-70" />
      </motion.div>
    </motion.section>
  );
}
