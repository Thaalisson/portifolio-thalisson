import AppCard from "./AppCard";
import {
  FaCalendarAlt,
  FaWpforms,
  FaChartLine,
  FaPalette,
  FaUserShield,
} from "react-icons/fa";

const apps = [
  {
    title: "Booking App",
    description: "Manage appointments and schedules",
    icon: <FaCalendarAlt />,
  },
  {
    title: "Form Builder",
    description: "Create custom forms dynamically",
    icon: <FaWpforms />,
  },
  {
    title: "Analytics Dashboard",
    description: "Visualize data and metrics",
    icon: <FaChartLine />,
  },
  {
    title: "Theme Customizer",
    description: "Adjust colors and styles",
    icon: <FaPalette />,
  },
  {
    title: "User Manager",
    description: "Handle user accounts and roles",
    icon: <FaUserShield />,
  },
];

export default function CardSection() {
  return (
    <section className="py-24 px-6 bg-background text-foreground transition-colors duration-500">
      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {apps.map((app, index) => (
          <AppCard key={app.title} {...app} delay={index * 0.2} />
        ))}
      </div>
    </section>
  );
}
