import { Github, Twitter, Linkedin, Mail, Code } from "lucide-react";
import { motion } from "framer-motion";

const SocialSidebar = () => {
  return (
    <>
      <div className="fixed bottom-0 left-6 z-30 lg:flex hidden flex-col items-center gap-6 text-[hsl(var(--foreground))]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <a href="https://github.com/Thaalisson" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github className="hover:-translate-y-1 transition-all duration-300" size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
            <Twitter className="hover:-translate-y-1 transition-all duration-300" size={20} />
          </a>
          <a href="https://linkedin.com/in/thalisson" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin className="hover:-translate-y-1 transition-all duration-300" size={20} />
          </a>
          <a href="#" target="_blank" rel="noreferrer" aria-label="Portfolio Code">
            <Code className="hover:-translate-y-1 transition-all duration-300" size={20} />
          </a>
        </motion.div>
        <div className="w-[1px] h-24 bg-slate-400 mt-6"></div>
      </div>

      <div className="fixed bottom-0 right-6 z-30 lg:flex hidden flex-col items-center text-sm text-[hsl(var(--foreground))]">
        <motion.a
          href="mailto:thalisson_21@icloud.com"
          className="font-mono tracking-widest text-xs hover:-translate-y-1 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ writingMode: "vertical-rl" }}
        >
          thalisson_21@icloud.com
        </motion.a>
        <div className="w-[1px] h-24 bg-slate-400 mt-6"></div>
      </div>
    </>
  );
};

export default SocialSidebar;
