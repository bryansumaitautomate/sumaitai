import { useEffect, useRef, useState } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const FORCE_VISIBLE_DELAY_MS = 2000;

export const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Reduced motion: show content instantly, no observation, no transition
    // (transitions are also zeroed out by the global reduced-motion CSS).
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      setIsVisible(true);
      return;
    }

    // Safety observer: reveal slightly BEFORE the element enters the
    // viewport (10% bottom rootMargin). The caller's threshold is clamped
    // to what the element can actually achieve — a container taller than
    // the viewport can never satisfy a fixed threshold, which is what left
    // full sections permanently invisible.
    const elementHeight = element.getBoundingClientRect().height;
    const maxAchievableRatio =
      elementHeight > 0 ? window.innerHeight / elementHeight : 1;
    const effectiveThreshold = Math.max(
      0,
      Math.min(threshold, maxAchievableRatio - 0.05)
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: effectiveThreshold, rootMargin: '0px 0px 10% 0px' }
    );
    observer.observe(element);

    // Failsafe: never leave content invisible because of observer or scroll
    // timing (fast scroll, anchor jump). Force-visible shortly after mount
    // regardless of scroll state.
    const failsafe = window.setTimeout(
      () => setIsVisible(true),
      FORCE_VISIBLE_DELAY_MS
    );

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [threshold]);

  return { ref, isVisible };
};
