import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test/test-utils";
import SocialSidebar from "./SocialSidebar";

describe("SocialSidebar", () => {
  it("renders no placeholder '#' links", () => {
    renderWithProviders(<SocialSidebar />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
    links.forEach((link) => {
      expect(link.getAttribute("href")).not.toBe("#");
      expect(link.getAttribute("href")).toBeTruthy();
    });
  });

  it("points the source-code link at the real portfolio repo", () => {
    renderWithProviders(<SocialSidebar />);
    const repoLink = screen.getByLabelText(/portfolio source code/i);
    expect(repoLink).toHaveAttribute(
      "href",
      "https://github.com/Thaalisson/portifolio-thalisson"
    );
  });
});
