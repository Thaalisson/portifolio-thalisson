import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import ParticleNetwork from "./ParticleNetwork";

const STORAGE_KEY = "tp-intro-seen";
const BOOT_LINE = { en: "> booting profile...", pt: "> inicializando perfil..." };
const YEARS_LABEL = { en: "13+ years", pt: "13+ anos" };
const STACK_LINE = ".NET · React · AI-Assisted Engineering";

// Full-screen splash that plays once on a first-time visit. Unlike the old
// WelcomeBoot, it never gates the real DOM — App renders the actual page
// underneath regardless, this is purely a visual overlay that auto-dismisses.
export default function IntroSplash({ onComplete }) {
  const { t, language } = useLanguage();
  const name = t("heroText.fullText");
  const role = t("developer").role[language];
  const bootLine = BOOT_LINE[language];
  const yearsLabel = YEARS_LABEL[language];

  const [bootText, setBootText] = useState("");
  const [nameText, setNameText] = useState("");
  const [stage, setStage] = useState(0); // 0 boot, 1 name, 2 role, 3 stack, 4 years
  const [visible, setVisible] = useState(true);

  const finish = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // localStorage unavailable — splash just replays next visit
    }
    setVisible(false);
  };

  // Type the boot line, then the name, then stage through the rest.
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setBootText(bootLine.slice(0, i));
      if (i >= bootLine.length) {
        clearInterval(interval);
        setTimeout(() => setStage(1), 150);
      }
    }, 22);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (stage !== 1) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setNameText(name.slice(0, i));
      if (i >= name.length) {
        clearInterval(interval);
        setTimeout(() => setStage(2), 200);
      }
    }, 32);
    return () => clearInterval(interval);
  }, [stage, name]);

  useEffect(() => {
    if (stage < 2 || stage > 3) return;
    const timeout = setTimeout(() => setStage((s) => s + 1), 350);
    return () => clearTimeout(timeout);
  }, [stage]);

  useEffect(() => {
    if (stage !== 4) return;
    const timeout = setTimeout(finish, 700);
    return () => clearTimeout(timeout);
  }, [stage]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black font-mono px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <ParticleNetwork />

          <div className="relative w-full max-w-md">
            <div className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
              TP<span className="text-primary">.</span>DEV
            </div>

            <p className="text-sm text-primary/70 mb-4 min-h-[1.25rem]">
              {bootText}
              {stage === 0 && <span className="animate-pulse">_</span>}
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight min-h-[1.2em]">
              {nameText}
              {stage === 1 && <span className="animate-pulse">_</span>}
            </h1>

            <AnimatePresence>
              {stage >= 2 && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="text-lg text-primary mt-2"
                >
                  {role}
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {stage >= 3 && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="text-sm text-white/60 mt-4"
                >
                  {STACK_LINE}
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {stage >= 4 && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="text-sm text-white/40 mt-1"
                >
                  {yearsLabel}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={finish}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.65rem] tracking-[0.2em] uppercase text-white/30 hover:text-primary transition"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
