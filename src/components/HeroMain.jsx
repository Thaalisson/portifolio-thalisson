import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import bgImage from "../assets/IMG_2459.jpg";

const fullText = "I'm Thalisson Pereira";
const roles = [
  "Software Developer",
  "Fullstack Engineer",
  "Web Design",
  ".NET & React",
];

export default function HeroMain() {
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
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="
        min-h-screen px-6 py-20 relative flex items-center justify-start
        bg-background text-foreground
        transition-colors duration-500
        font-sans hacker:font-[var(--font-hacker)]
      "
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      <div className="relative z-10 p-8 rounded-xl max-w-xl bg-card/80 text-card-foreground shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          <span className="pr-2">
            {fullText.slice(0, charIndex)}
            {charIndex < fullText.length && <span className="border-r-2 animate-pulse ml-1" />}
          </span>
        </h1>

        <p className="text-xl font-medium opacity-90">
          {subtext}
          {subtext && <span className="border-r-2 animate-pulse ml-1" />}
        </p>
      </div>

      {/* Scroll Down Icon */}
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
