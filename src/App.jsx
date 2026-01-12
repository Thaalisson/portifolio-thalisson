import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import WelcomeBoot from "./components/WelcomeBoot";
import HeroMain from "./components/HeroMain";
import CardSection from "./components/CardSection";
import ExperienceSection from "./components/ExperienceSection";
import SocialSidebar from "./components/SocialSidebar";
import Navbar from "./components/Navbar";
import About from "./components/About";
import { LanguageProvider } from "./context/LanguageContext";
import ContactSection from "./components/ContactSection";
import BlogSection from "./components/BlogSection";


export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <LanguageProvider>
      <AnimatePresence mode="wait">
        {!booted ? (
          <WelcomeBoot key="boot" onComplete={() => setBooted(true)} />
        ) : (
          <>
        
            <Navbar />
            <SocialSidebar />
            <HeroMain key="hero" />
            <About />
            <CardSection />
            <ExperienceSection />
            <BlogSection />
            <ContactSection />
          </>
        )}
      </AnimatePresence>
    </LanguageProvider>
  );
}
