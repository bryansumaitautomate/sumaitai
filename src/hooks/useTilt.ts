import { useState, useCallback, useMemo } from "react";
import type React from "react";

interface UseTiltOptions {
  maxTilt?: number;
}

interface TiltState {
  rotateX: number;
  rotateY: number;
}

export const useTilt = ({ maxTilt = 6 }: UseTiltOptions = {}) => {
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0 });

  const isDisabled = useMemo(() => {
    if (typeof window === "undefined") return true;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fineCursor = window.matchMedia("(pointer: fine)").matches;
    return reduceMotion || !fineCursor;
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (isDisabled) return;

      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      const rotateY = Math.max(-maxTilt, Math.min(maxTilt, percentX * maxTilt));
      const rotateX = Math.max(-maxTilt, Math.min(maxTilt, -percentY * maxTilt));

      setTilt({ rotateX, rotateY });
    },
    [isDisabled, maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return { tilt, handleMouseMove, handleMouseLeave };
};
