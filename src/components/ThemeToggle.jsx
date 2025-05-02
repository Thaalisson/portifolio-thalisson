import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import { TbBrandMatrix } from "react-icons/tb";

export default function ThemeToggle() {
  const { theme, cycleTheme } = useTheme();

  const icon =
    theme === "light" ? <FiSun size={18} /> :
    theme === "dark" ? <FiMoon size={18} /> :
    <TbBrandMatrix size={18} />;

  const label =
    theme === "light" ? "Light" :
    theme === "dark" ? "Dark" :
    "Hacker";

  return (
    <button
      onClick={cycleTheme}
      className="
        flex items-center gap-2 px-3 py-1.5 rounded-md
        bg-zinc-800 text-white text-xs
        hover:bg-zinc-700 transition-colors duration-300
      "
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
