import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import ScrollProgressBar from "./ScrollProgressBar";

describe("ScrollProgressBar", () => {
  it("renders a fixed-position bar", () => {
    const { container } = render(<ScrollProgressBar />);
    const bar = container.querySelector("[data-testid='scroll-progress-bar']");
    expect(bar).not.toBeNull();
  });

  it("is marked as decorative for accessibility", () => {
    const { container } = render(<ScrollProgressBar />);
    const bar = container.querySelector("[aria-hidden='true']");
    expect(bar).not.toBeNull();
  });

  it("uses brand red color", () => {
    const { container } = render(<ScrollProgressBar />);
    const inner = container.querySelector("[data-testid='scroll-progress-fill']");
    expect(inner).not.toBeNull();
    const className = inner?.getAttribute("class") ?? "";
    expect(className).toContain("bg-[#ef4444]");
  });
});
