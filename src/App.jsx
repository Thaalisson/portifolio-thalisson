import { useEffect, useState } from "react";
import HeroMain from "./components/HeroMain";
import CardSection from "./components/CardSection";
import ExperienceSection from "./components/ExperienceSection";
import ExperienceTimeline from "./components/ExperienceTimeline";
import SocialSidebar from "./components/SocialSidebar";
import Navbar from "./components/Navbar";
import About from "./components/About";
import { LanguageProvider } from "./context/LanguageContext";
import ContactSection from "./components/ContactSection";
import BlogSection from "./components/BlogSection";
import IntroSplash from "./components/IntroSplash";

const hasSeenIntro = () => {
  try {
    return localStorage.getItem("tp-intro-seen") === "true";
  } catch {
    return false;
  }
};

export default function App() {
  const [showIntro, setShowIntro] = useState(() => !hasSeenIntro());

  // Splash is a visual overlay only — it never delays mounting the real
  // page, so it just needs the scrollbar locked while it covers the viewport.
  useEffect(() => {
    if (!showIntro) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  return (
    <LanguageProvider>
      <Navbar />
      <SocialSidebar />
      <HeroMain />
      <About />
      <ExperienceTimeline />
      <ExperienceSection />
      <CardSection />
      <BlogSection />
      <ContactSection />
      {showIntro && <IntroSplash onComplete={() => setShowIntro(false)} />}
    </LanguageProvider>
  );
}
