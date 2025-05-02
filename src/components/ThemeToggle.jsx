import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import { TbBrandMatrix } from "react-icons/tb";

export default function ThemeToggle() {
  const { theme, cycleTheme } = useTheme();

  const icon =
    theme === "light" ? <FiSun size={20} /> :
    theme === "dark" ? <FiMoon size={20} /> :
    <TbBrandMatrix size={20} />;

  const label =
    theme === "light" ? "Light Mode" :
    theme === "dark" ? "Dark Mode" :
    "Hacker Mode";

  return (
    <button
      onClick={cycleTheme}
      className="
        fixed top-4 right-4 flex items-center gap-2
        px-4 py-2 rounded shadow-md
        bg-zinc-800 text-white hover:bg-zinc-700
        transition-colors duration-300 z-50
      "
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );
}
