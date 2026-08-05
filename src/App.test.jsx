import { afterEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "./context/ThemeContext";
import App from "./App";

function renderApp() {
  return render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

describe("App", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("renders the real page content immediately even while the intro splash is up", () => {
    renderApp();
    // The splash is a visual overlay only — it never delays mounting the
    // real DOM, so this must be present from the very first render.
    expect(screen.getByText("London, ON, Canada")).toBeInTheDocument();
  });

  it("shows the intro splash on a first-time visit", () => {
    renderApp();
    expect(screen.getByText(/skip/i)).toBeInTheDocument();
  });

  it("skips the splash entirely once the intro was already seen", () => {
    localStorage.setItem("tp-intro-seen", "true");
    renderApp();
    expect(screen.queryByText(/skip/i)).not.toBeInTheDocument();
  });
});
