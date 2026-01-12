import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const bootLines = [
  "> Initializing system...",
  "> Connecting to GitHub...",
  "> Syncing portfolio layout...",
  "> Boot complete. Welcome.",
  "> Thalisson Portfolio",
];

export default function WelcomeBoot({ onComplete }) {
  const [started, setStarted] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [lines, setLines] = useState([]);
  const [typing, setTyping] = useState(false);
  const audioRef = useRef(null);

  const startSequence = () => {
    const audio = new Audio("/songs/typing.mp3");
    audio
      .play()
      .then(() => {
        audio.pause();
        audio.currentTime = 0;
        audioRef.current = audio;
        setStarted(true);
        setTyping(true);
      })
      .catch(() => {
        audioRef.current = audio;
        setStarted(true);
        setTyping(true);
      });
  };

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
        }, 400);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [currentLine, typing]);

  useEffect(() => {
    if (started && currentLine >= bootLines.length) {
      setTyping(false);
      const timeout = setTimeout(onComplete, 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, onComplete, started]);

  return (
    <motion.div
      key="boot"
      className="min-h-screen flex items-center justify-center bg-black text-green-400 font-mono px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!started ? (
        <button
          onClick={startSequence}
          className="px-6 py-3 text-sm font-semibold border border-green-500 rounded shadow-lg hover:bg-green-500 hover:text-black transition"
        >
          Start Boot Sequence
        </button>
      ) : (
        <div className="w-full max-w-md bg-black/70 p-6 rounded-md border border-green-500 shadow-[0_0_20px_#22ff22] text-sm">
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
      )}
    </motion.div>
  );
}
