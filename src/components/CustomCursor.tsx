import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if mobile/touch device
    const checkMobile = () => {
      const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      setIsMobile(isTouchDevice);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) return;

    // Direct cursor movement - no easing, no delay
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 150);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for CTA buttons (shimmer buttons, primary CTAs)
      const isCTA = target.closest('.shimmer-button') || 
                    target.closest('[href="#contact"]') ||
                    (target.tagName === 'BUTTON' && target.classList.contains('bg-[#ef4444]'));
      
      if (isCTA) {
        setIsHoveringCTA(true);
        setIsHovering(true);
        return;
      }

      // Check for regular interactive elements
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('[role="button"]')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('[role="button"]') ||
        target.closest('.shimmer-button')
      ) {
        setIsHovering(false);
        setIsHoveringCTA(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isMobile]);

  // Don't render on mobile/touch devices
  if (isMobile) return null;

  const getScale = () => {
    if (isClicking) return 'scale(0.8)';
    if (isHoveringCTA) return 'scale(1.5)';
    if (isHovering) return 'scale(1.2)';
    return 'scale(1)';
  };

  const getGlowOpacity = () => {
    if (isHoveringCTA) return 0.6;
    if (isHovering) return 0.5;
    return 0.35;
  };

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      style={{
        marginLeft: '-12px',
        marginTop: '-12px',
      }}
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 transition-all duration-150 ease-out mix-blend-screen"
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(239, 68, 68, ${getGlowOpacity()}) 0%, rgba(239, 68, 68, 0.1) 50%, transparent 70%)`,
          boxShadow: isHoveringCTA 
            ? '0 0 20px 6px rgba(239, 68, 68, 0.5)' 
            : isHovering 
              ? '0 0 15px 4px rgba(239, 68, 68, 0.4)'
              : '0 0 12px 3px rgba(239, 68, 68, 0.3)',
          transform: getScale(),
          transition: 'transform 150ms ease-out, box-shadow 150ms ease-out',
        }}
      />

      {/* Inner ring */}
      <div
        className="absolute transition-transform duration-150 ease-out"
        style={{
          width: '12px',
          height: '12px',
          top: '6px',
          left: '6px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          transform: getScale(),
        }}
      />

      {/* Center dot */}
      <div
        className="absolute transition-transform duration-150 ease-out"
        style={{
          width: '4px',
          height: '4px',
          top: '10px',
          left: '10px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          boxShadow: '0 0 4px 1px rgba(255, 255, 255, 0.3)',
          transform: getScale(),
        }}
      />
    </div>
  );
};

export default CustomCursor;
