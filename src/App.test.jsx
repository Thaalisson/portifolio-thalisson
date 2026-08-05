import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "./context/ThemeContext";
import App from "./App";

describe("App", () => {
  it("renders the main content immediately — no boot gate blocking it", () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );
    // Hero's location line is static text, present from the very first render.
    expect(screen.getByText("London, ON, Canada")).toBeInTheDocument();
    expect(screen.queryByText(/skip intro/i)).not.toBeInTheDocument();
  });
});
