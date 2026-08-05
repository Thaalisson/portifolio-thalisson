import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "./context/ThemeContext";
import App from "./App";

describe("App", () => {
  it("renders the main content immediately — no intro gate blocking it", () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );
    expect(screen.getByText("London, ON, Canada")).toBeInTheDocument();
  });
});
