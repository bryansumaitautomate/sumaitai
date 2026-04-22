import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTilt } from "./useTilt";
import type React from "react";

describe("useTilt", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches: query === "(pointer: fine)",
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

  it("starts at zero tilt", () => {
    const { result } = renderHook(() => useTilt());
    expect(result.current.tilt).toEqual({ rotateX: 0, rotateY: 0 });
  });

  it("returns zero tilt when prefers-reduced-motion is set", () => {
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

    const { result } = renderHook(() => useTilt({ maxTilt: 6 }));
    const fakeEvent = {
      clientX: 200,
      clientY: 200,
      currentTarget: {
        getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100, right: 100, bottom: 100, x: 0, y: 0, toJSON: () => "" }),
      },
    } as unknown as React.MouseEvent<HTMLElement>;

    act(() => result.current.handleMouseMove(fakeEvent));
    expect(result.current.tilt).toEqual({ rotateX: 0, rotateY: 0 });
  });

  it("caps tilt at maxTilt degrees", () => {
    const { result } = renderHook(() => useTilt({ maxTilt: 6 }));
    const fakeEvent = {
      clientX: 200,
      clientY: 200,
      currentTarget: {
        getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100, right: 100, bottom: 100, x: 0, y: 0, toJSON: () => "" }),
      },
    } as unknown as React.MouseEvent<HTMLElement>;

    act(() => result.current.handleMouseMove(fakeEvent));
    expect(Math.abs(result.current.tilt.rotateX)).toBeLessThanOrEqual(6);
    expect(Math.abs(result.current.tilt.rotateY)).toBeLessThanOrEqual(6);
  });

  it("handleMouseLeave resets tilt to zero", () => {
    const { result } = renderHook(() => useTilt());
    const fakeMoveEvent = {
      clientX: 80,
      clientY: 80,
      currentTarget: {
        getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100, right: 100, bottom: 100, x: 0, y: 0, toJSON: () => "" }),
      },
    } as unknown as React.MouseEvent<HTMLElement>;

    act(() => result.current.handleMouseMove(fakeMoveEvent));
    act(() => result.current.handleMouseLeave());
    expect(result.current.tilt).toEqual({ rotateX: 0, rotateY: 0 });
  });
});
