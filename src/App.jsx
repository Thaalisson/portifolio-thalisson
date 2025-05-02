import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import WelcomeBoot from "./components/WelcomeBoot";
import HeroMain from "./components/HeroMain";
import CardSection from "./components/CardSection";
import ExperienceSection from "./components/ExperienceSection";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <ThemeToggle />
      <AnimatePresence mode="wait">
        {!booted ? (
          <WelcomeBoot key="boot" onComplete={() => setBooted(true)} />
        ) : (
          <>
            <HeroMain key="hero" />
            <CardSection />
            <ExperienceSection />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
