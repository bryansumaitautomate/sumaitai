import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export const useCountUp = ({
  start = 0,
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
}: UseCountUpOptions) => {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    startTimeRef.current = undefined;
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      
      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = start + (end - start) * easeOutQuart;
      
      setCount(currentValue);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
        setIsAnimating(false);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const formattedValue = `${prefix}${count.toFixed(decimals)}${suffix}`;

  return { count, formattedValue, startAnimation, isAnimating };
};

// Parse metric string to extract number, prefix, and suffix
export const parseMetric = (metric: string): { value: number; prefix: string; suffix: string } => {
  const match = metric.match(/^([^\d]*)(\d+(?:\.\d+)?)([^\d]*)$/);
  if (match) {
    return {
      prefix: match[1] || '',
      value: parseFloat(match[2]),
      suffix: match[3] || '',
    };
  }
  return { value: 0, prefix: '', suffix: metric };
};
