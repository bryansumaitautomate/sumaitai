import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if mobile/touch device
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
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
        target.closest('[role="button"]')
      ) {
        setIsHovering(false);
      }
    };

    // Smooth animation loop using lerp
    let animationId: number;
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      // Cursor follows mouse with fast easing
      cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, 0.35);
      cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, 0.35);

      // Glow follows with medium easing
      glowPos.current.x = lerp(glowPos.current.x, mousePos.current.x, 0.15);
      glowPos.current.y = lerp(glowPos.current.y, mousePos.current.y, 0.15);

      // Trail follows with slow easing
      trailPos.current.x = lerp(trailPos.current.x, mousePos.current.x, 0.08);
      trailPos.current.y = lerp(trailPos.current.y, mousePos.current.y, 0.08);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowPos.current.x}px, ${glowPos.current.y}px)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailPos.current.x}px, ${trailPos.current.y}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationId);
    };
  }, [isMobile]);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <>
      {/* Trail - slowest follow */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen transition-opacity duration-500"
        style={{
          width: '32px',
          height: '32px',
          marginLeft: '-16px',
          marginTop: '-16px',
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)',
          opacity: isHovering ? 0.8 : 0.4,
        }}
      />

      {/* Glow ring - medium follow */}
      <div
        ref={glowRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen transition-all duration-200 ${
          isClicking ? 'scale-150' : ''
        }`}
        style={{
          width: '24px',
          height: '24px',
          marginLeft: '-12px',
          marginTop: '-12px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.35) 0%, rgba(239, 68, 68, 0.1) 40%, transparent 70%)',
          boxShadow: isHovering 
            ? '0 0 20px 8px rgba(239, 68, 68, 0.4)' 
            : '0 0 15px 4px rgba(239, 68, 68, 0.25)',
          opacity: isClicking ? 1 : isHovering ? 0.9 : 0.7,
        }}
      />

      {/* Primary cursor dot - fast follow */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-100 ${
          isClicking ? 'scale-75' : isHovering ? 'scale-125' : ''
        }`}
        style={{
          width: '6px',
          height: '6px',
          marginLeft: '-3px',
          marginTop: '-3px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          boxShadow: '0 0 6px 1px rgba(255, 255, 255, 0.3)',
        }}
      />
    </>
  );
};

export default CustomCursor;
