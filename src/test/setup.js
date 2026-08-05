import "@testing-library/jest-dom/vitest";

// jsdom doesn't implement these — framer-motion (whileInView) and the
// Navbar's smooth-scroll nav both rely on them.
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = window.IntersectionObserver || MockIntersectionObserver;

window.matchMedia =
  window.matchMedia ||
  (() => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
  }));

Element.prototype.scrollIntoView = Element.prototype.scrollIntoView || (() => {});
