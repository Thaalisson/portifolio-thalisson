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
    <section className="py-20 px-4 bg-transparent text-inherit">
      <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
        {apps.map((app, index) => (
          <AppCard key={index} {...app} delay={index * 0.2} />
        ))}
      </div>
    </section>
  );
}
