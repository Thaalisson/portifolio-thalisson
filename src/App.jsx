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

export default function App() {
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
    </LanguageProvider>
  );
}
