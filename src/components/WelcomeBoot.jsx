import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const bootLines = [
  "> Initializing system...",
  "> Connecting to GitHub...",
  "> Syncing portfolio layout...",
  "> Boot complete. Welcome.",
  "> Thalisson Portfolio",
];

const STORAGE_KEY = "tp-intro-seen";

export default function WelcomeBoot({ onComplete }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [lines, setLines] = useState([]);
  const [typing, setTyping] = useState(true);
  const audioRef = useRef(null);
  const finishedRef = useRef(false);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // localStorage unavailable — safe to ignore, intro just replays next visit
    }
    onComplete();
  };

  // Best-effort audio — browsers block autoplay-with-sound without a user
  // gesture, so this silently no-ops on first visit and the animation
  // still plays without sound.
  useEffect(() => {
    const audio = new Audio("/songs/typing.mp3");
    audio
      .play()
      .then(() => {
        audio.pause();
        audio.currentTime = 0;
        audioRef.current = audio;
      })
      .catch(() => {
        audioRef.current = audio;
      });
  }, []);

  useEffect(() => {
    if (!typing || currentLine >= bootLines.length) return;

    const fullLine = bootLines[currentLine];
    let charIndex = 0;

    const interval = setInterval(() => {
      const char = fullLine[charIndex];
      setCurrentText(fullLine.slice(0, charIndex + 1));
      charIndex++;

      if (/[a-zA-Z0-9]/.test(char) && audioRef.current) {
        const sfx = audioRef.current.cloneNode();
        sfx.play().catch(() => {});
      }

      if (charIndex >= fullLine.length) {
        clearInterval(interval);
        setTimeout(() => {
          setLines((prev) => [...prev, fullLine]);
          setCurrentText("");
          setCurrentLine((prev) => prev + 1);
        }, 180);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [currentLine, typing]);

  useEffect(() => {
    if (currentLine >= bootLines.length) {
      setTyping(false);
      const timeout = setTimeout(finish, 400);
      return () => clearTimeout(timeout);
    }
  }, [currentLine]);

  return (
    <motion.div
      key="boot"
      className="min-h-screen flex flex-col items-center justify-center gap-6 bg-black text-primary font-mono px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md bg-black/70 p-6 rounded-md border border-primary shadow-[0_0_20px_hsl(var(--primary))] text-sm">
        {lines.map((line, i) => (
          <p key={i} className="leading-5 whitespace-pre-wrap">
            {line}
          </p>
        ))}
        {typing && (
          <p className="leading-5 whitespace-pre-wrap">
            {currentText}
            <span className="animate-pulse">|</span>
          </p>
        )}
      </div>
      <button
        onClick={finish}
        className="text-[0.7rem] tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition"
      >
        Skip Intro
      </button>
    </motion.div>
  );
}
