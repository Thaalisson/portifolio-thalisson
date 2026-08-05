import { afterEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../test/test-utils";
import IntroSplash from "./IntroSplash";

describe("IntroSplash", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("remembers the intro was seen immediately, then calls onComplete once the exit animation settles", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    renderWithProviders(<IntroSplash onComplete={onComplete} />);

    await user.click(screen.getByText(/skip/i));

    // localStorage is written synchronously by the skip handler.
    expect(localStorage.getItem("tp-intro-seen")).toBe("true");
    // onComplete only fires after framer-motion's exit transition finishes.
    await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1));
  });

  it("is marked decorative so screen readers land straight on the real page", () => {
    renderWithProviders(<IntroSplash onComplete={() => {}} />);
    expect(screen.getByText(/skip/i).closest("[aria-hidden='true']")).not.toBeNull();
  });
});
