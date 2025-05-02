import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import WelcomeBoot from "./components/WelcomeBoot";
import HeroMain from "./components/HeroMain";
import CardSection from "./components/CardSection";
import ExperienceSection from "./components/ExperienceSection";
import ThemeToggle from "./components/ThemeToggle";
import SocialSidebar from "./components/SocialSidebar";
import Navbar from "./components/Navbar";
import About from "./components/About";

export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <ThemeToggle />
      <Navbar />
      <SocialSidebar/>
      <AnimatePresence mode="wait">
        {!booted ? (
          <WelcomeBoot key="boot" onComplete={() => setBooted(true)} />
        ) : (
          <>
            <HeroMain key="hero" />
            <About/>
            <CardSection />
            <ExperienceSection />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
