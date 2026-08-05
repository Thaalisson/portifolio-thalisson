import { render } from "@testing-library/react";
import { ThemeProvider } from "../context/ThemeContext";
import { LanguageProvider } from "../context/LanguageContext";

function AllProviders({ children }) {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}

export function renderWithProviders(ui, options) {
  return render(ui, { wrapper: AllProviders, ...options });
}

export * from "@testing-library/react";
