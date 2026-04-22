import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMagnetic } from "./useMagnetic";

describe("useMagnetic", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches:
          query === "(pointer: fine)" ? true :
          query === "(prefers-reduced-motion: reduce)" ? false :
          false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      }),
    });
  });

  it("starts at zero offset", () => {
    const { result } = renderHook(() => useMagnetic());
    expect(result.current.offset).toEqual({ x: 0, y: 0 });
  });

  it("returns zero offset when prefers-reduced-motion is set", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      }),
    });

    const { result } = renderHook(() => useMagnetic({ range: 100, maxOffset: 8 }));

    const div = document.createElement("div");
    document.body.appendChild(div);
    Object.defineProperty(div, "getBoundingClientRect", {
      value: () => ({ left: 0, top: 0, width: 100, height: 50, right: 100, bottom: 50, x: 0, y: 0, toJSON: () => "" }),
    });
    (result.current.ref as { current: HTMLDivElement | null }).current = div;

    act(() => {
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 60, clientY: 25 }));
    });

    expect(result.current.offset).toEqual({ x: 0, y: 0 });
    document.body.removeChild(div);
  });

  it("returns zero offset when pointer is coarse (touch device)", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      }),
    });

    const { result } = renderHook(() => useMagnetic());
    expect(result.current.offset).toEqual({ x: 0, y: 0 });
  });

  it("caps offset at maxOffset pixels", () => {
    const { result } = renderHook(() => useMagnetic({ range: 200, maxOffset: 8 }));

    const div = document.createElement("div");
    document.body.appendChild(div);
    Object.defineProperty(div, "getBoundingClientRect", {
      value: () => ({ left: 0, top: 0, width: 100, height: 50, right: 100, bottom: 50, x: 0, y: 0, toJSON: () => "" }),
    });
    (result.current.ref as { current: HTMLDivElement | null }).current = div;

    act(() => {
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 250, clientY: 25 }));
    });

    expect(result.current.offset.x).toBeLessThanOrEqual(8);
    expect(result.current.offset.x).toBeGreaterThan(0);
    document.body.removeChild(div);
  });
});
