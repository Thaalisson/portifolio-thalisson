import { useLanguage } from "../context/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 text-xs">
      <button
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 rounded hover:underline transition ${
          language === "en" ? "font-bold underline" : "opacity-60"
        }`}
      >
        🇺🇸 EN
      </button>
      <span>/</span>
      <button
        onClick={() => setLanguage("pt")}
        className={`px-2 py-1 rounded hover:underline transition ${
          language === "pt" ? "font-bold underline" : "opacity-60"
        }`}
      >
        🇧🇷 PT
      </button>
    </div>
  );
}
