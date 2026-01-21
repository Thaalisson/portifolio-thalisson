import { Github, Twitter, Linkedin, Code } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const SocialSidebar = () => {
  const { theme } = useTheme();
  const lineStyle = {
    backgroundColor: theme === "light" ? "black" : "white",
    boxShadow:
      theme === "light"
        ? "0 0 10px rgba(0,0,0,0.2)"
        : "0 0 10px rgba(255,255,255,0.5)",
  };

  return (
    <>
      <div className="fixed bottom-0 left-4 z-30 flex flex-col items-center gap-4 text-[hsl(var(--foreground))] lg:left-6 lg:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <a href="https://github.com/Thaalisson" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github className="hover:-translate-y-1 hover:text-primary transition-all duration-300" size={18} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
            <Twitter className="hover:-translate-y-1 hover:text-primary transition-all duration-300" size={18} />
          </a>
          <a href="https://linkedin.com/in/thalisson" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin className="hover:-translate-y-1 hover:text-primary transition-all duration-300" size={18} />
          </a>
          <a href="#" target="_blank" rel="noreferrer" aria-label="Portfolio Code">
            <Code className="hover:-translate-y-1 hover:text-primary transition-all duration-300" size={18} />
          </a>
        </motion.div>
        <div className="w-[2px] h-16 mt-4 lg:h-28 lg:mt-6" style={lineStyle}></div>
      </div>

      <div className="fixed bottom-0 right-4 z-30 flex flex-col items-center text-sm text-[hsl(var(--foreground))] lg:right-6">
        <motion.a
          href="mailto:thalisson_21@icloud.com"
          className="tracking-[0.3em] text-[0.6rem] hover:-translate-y-1 hover:text-primary transition-all duration-300 lg:tracking-[0.35em] lg:text-[0.65rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ writingMode: "vertical-rl" }}
        >
          thalisson_21@icloud.com
        </motion.a>
        <div className="w-[2px] h-16 mt-4 lg:h-28 lg:mt-6" style={lineStyle}></div>
      </div>
    </>
  );
};

export default SocialSidebar;
