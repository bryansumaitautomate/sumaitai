import { useEffect, useRef, useState } from "react";

interface UseMagneticOptions {
  range?: number;
  maxOffset?: number;
}

interface MagneticOffset {
  x: number;
  y: number;
}

export const useMagnetic = ({ range = 120, maxOffset = 8 }: UseMagneticOptions = {}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState<MagneticOffset>({ x: 0, y: 0 });

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fineCursor = window.matchMedia("(pointer: fine)").matches;

    if (reduceMotion || !fineCursor) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = event.clientX - centerX;
      const distanceY = event.clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance > range) {
        setOffset({ x: 0, y: 0 });
        return;
      }

      const targetX = Math.max(-maxOffset, Math.min(maxOffset, distanceX * 0.4));
      const targetY = Math.max(-maxOffset, Math.min(maxOffset, distanceY * 0.4));

      setOffset({ x: targetX, y: targetY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [range, maxOffset]);

  return { ref, offset };
};
