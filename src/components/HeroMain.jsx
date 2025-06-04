import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import bgImage from "../assets/IMG_2459.jpg";
import { useTheme } from "../context/ThemeContext";

const fullText = "I'm Thalisson Pereira";
const roles = [
  "Software Developer",
  "Fullstack Engineer",
  "Web Design",
  ".NET & React.js",
];

export default function HeroMain() {
  const [charIndex, setCharIndex] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const [subtext, setSubtext] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (charIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setCharIndex((i) => i + 1);
      }, 130);
      return () => clearTimeout(timeout);
    }
  }, [charIndex]);

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
  }, [subtext, isDeleting, roleIndex]);

  return (
    <motion.section
      key="hero"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className={`
        min-h-screen px-6 py-20 relative flex items-center justify-start
        transition-colors duration-500 font-sans
        ${theme === "light" ? "text-black" : "text-white"}
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
              ? "rgba(0, 0, 0, 0.6)"
              : "rgba(255, 255, 255, 0.7)",
        }}
      />

      {/* Conteúdo */}
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4">
          {fullText.slice(0, charIndex)}
          {charIndex < fullText.length && (
            <span className="ml-1 border-r-2 animate-pulse" />
          )}
        </h1>

        <p
          className="text-xl sm:text-2xl font-medium"
          style={{
            color: "oklch(72.3% 0.219 149.579)",
          }}
        >
          {subtext}
          {subtext && <span className="ml-1 border-r-2 animate-pulse" />}
        </p>
      </div>

      {/* Ícone de scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <FaArrowDown className="opacity-70" />
      </motion.div>
    </motion.section>
  );
}
