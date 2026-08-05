import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import { render } from "@testing-library/react";

function Probe() {
  const { t, language, setLanguage } = useLanguage();
  return (
    <div>
      <span data-testid="nav-home">{t("nav.home")}</span>
      <span data-testid="missing-key">{t("this.key.does.not.exist")}</span>
      <button onClick={() => setLanguage(language === "en" ? "pt" : "en")}>
        toggle
      </button>
    </div>
  );
}

describe("LanguageContext", () => {
  it("translates a known key for the active language", () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    );
    expect(screen.getByTestId("nav-home")).toHaveTextContent("Home");
  });

  it("falls back to the raw key when the translation is missing in every language", () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    );
    expect(screen.getByTestId("missing-key")).toHaveTextContent(
      "this.key.does.not.exist"
    );
  });

  it("switches translated text when the language changes", async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    );
    expect(screen.getByTestId("nav-home")).toHaveTextContent("Home");
    await user.click(screen.getByText("toggle"));
    expect(screen.getByTestId("nav-home")).toHaveTextContent("Inicio");
  });
});
