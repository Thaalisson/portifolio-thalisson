import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const cycleTheme = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : prev === "dark" ? "hacker" : "light"
    );
  };

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("light-mode", "dark", "hacker");
  
    if (theme === "light") html.classList.add("light-mode");
    else if (theme === "dark") html.classList.add("dark");
    else html.classList.add("hacker"); // modo hacker customizado
  }, [theme]);
  

  return (
    <ThemeContext.Provider value={{ theme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
