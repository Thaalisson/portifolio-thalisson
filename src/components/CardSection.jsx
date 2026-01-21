import AppCard from "./AppCard";
import {
  FaCalendarAlt,
  FaWpforms,
  FaChartLine,
  FaPalette,
  FaUserShield,
  FaGlobe,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const apps = [
  {
    title: "Booking App",
    description: "Manage appointments and schedules",
    icon: <FaCalendarAlt size={24} className="text-primary" />,
  },
  {
    title: "Form Builder",
    description: "Create custom forms dynamically",
    icon: <FaWpforms size={24} className="text-primary" />,
  },
  {
    title: "Analytics Dashboard",
    description: "Visualize data and metrics",
    icon: <FaChartLine size={24} className="text-primary" />,
  },
  {
    title: "Theme Customizer",
    description: "Adjust colors and styles",
    icon: <FaPalette size={24} className="text-primary" />,
  },
  {
    title: "User Manager",
    description: "Handle user accounts and roles",
    icon: <FaUserShield size={24} className="text-primary" />,
  },
  {
    title: "Website (Psicologa Erivan)",
    description: "Professional site - React + Tailwind + Framer Motion",
    icon: <FaGlobe size={24} className="text-primary" />,
    link: "https://psicologaerivan.com.br/#home",
  },
];

export default function CardSection() {
  const { t } = useLanguage();

  return (
    <section
      className="py-24 px-6 bg-background text-foreground transition-colors duration-500"
      id="projects"
    >
      <div className="max-w-6xl mx-auto text-center mb-12">
        <motion.h2
          className="text-4xl font-bold tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("projects.title")}
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-base max-w-2xl mx-auto mt-4"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("projects.subtitle")}
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {apps.map((app, index) => (
          <AppCard key={app.title} {...app} delay={index * 0.2} />
        ))}
      </div>
    </section>
  );
}
