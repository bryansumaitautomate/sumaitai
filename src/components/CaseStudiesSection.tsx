import { useState, useEffect, useRef, useCallback } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useTilt } from '@/hooks/useTilt';
import { parseMetric } from '@/hooks/useCountUp';

interface CaseStudy {
  category: string;
  title: string;
  metric: string;
  metricLabel: string;
  description: string;
}

// Animated counter component
const AnimatedMetric = ({ 
  metric, 
  isVisible 
}: { 
  metric: string; 
  isVisible: boolean;
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);
  const { value, prefix, suffix } = parseMetric(metric);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 2000;
      const startTime = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing: easeOutQuart for smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = value * eased;
        
        setDisplayValue(current);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isVisible, value]);

  const formattedNumber = Number.isInteger(value) 
    ? Math.round(displayValue).toString()
    : displayValue.toFixed(1);

  return (
    <span className="tabular-nums">
      {prefix}{formattedNumber}{suffix}
    </span>
  );
};

// Interactive glow card with cursor-following effect
const GradientCard = ({ 
  children, 
  index,
  isVisible 
}: { 
  children: React.ReactNode; 
  index: number;
  isVisible: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { tilt, handleMouseMove: handleTiltMove, handleMouseLeave: handleTiltLeave } = useTilt({ maxTilt: 5 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const combinedMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMouseMove(e);
    handleTiltMove(e);
  };

  const combinedMouseLeave = () => {
    setIsHovered(false);
    handleTiltLeave();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={combinedMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={combinedMouseLeave}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 backdrop-blur-sm transition-all duration-300 ease-in-out
        hover:scale-[1.02] hover:border-primary/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)]
        ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
        }`}
      style={{
        transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
        background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)',
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Cursor-following glow effect */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(239, 68, 68, 0.15), transparent 60%)`,
          }}
        />
      )}
      <div className="relative p-8">
        {children}
      </div>
    </div>
  );
};

const CaseStudiesSection = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  const caseStudies: CaseStudy[] = [
    {
      category: 'COACHING · BETTER BODY ACADEMY',
      title: 'Sales Call AI Brain',
      metric: '100%',
      metricLabel: 'Call coverage',
      description:
        'Built a Fathom to n8n to AI agent pipeline that captures, routes, and summarizes every sales and coaching call. Active retainer.',
    },
    {
      category: 'AGENCY · DISRUPTORS MEDIA',
      title: 'Client Approval Portal',
      metric: '6 hrs',
      metricLabel: 'Saved per client per week',
      description:
        'Shipped an 8-workflow client portal with editable templates and per-message confirm. Approval cycle dropped from two days to four hours.',
    },
    {
      category: 'FINTECH · AI TECH SOLUTIONS',
      title: 'Voice and Outbound Stack',
      metric: '14 days',
      metricLabel: 'Build to launch',
      description:
        'VAPI inbound voice agent, GHL pipeline, and 8-inbox Instantly outbound shipped in two weeks. Mortgage vertical.',
    },
  ];

  return (
    <section className="relative bg-[#0a0a0a]/80 backdrop-blur-sm py-20 md:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* 4-column grid overlay */}
        <div className="grid grid-cols-4 border-x border-white/10 mb-16">
          <div className="border-r border-white/10 py-8">
            <p className="font-mono text-xs tracking-[0.3em] text-primary px-4">
              06 /// RESULTS
            </p>
          </div>
          <div className="col-span-3 py-8 px-4">
            <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-white">
              Real systems. Real numbers.
            </h2>
          </div>
        </div>

        {/* Case Study Cards - 3 Column Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {caseStudies.map((study, index) => (
            <GradientCard key={index} index={index} isVisible={isVisible}>
              {/* Category */}
              <p className="font-mono text-xs text-white/30 mb-6">{study.category}</p>

              {/* Metric - Red accent with count-up animation */}
              <div className="mb-6">
                <p className="font-syne font-bold text-5xl text-primary">
                  <AnimatedMetric metric={study.metric} isVisible={isVisible} />
                </p>
                <p className="text-sm text-white/30 mt-1">{study.metricLabel}</p>
              </div>

              {/* Title & Description */}
              <h3 className="font-syne font-semibold text-xl text-white mb-3 group-hover:text-primary transition-colors duration-300 ease-in-out">
                {study.title}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                {study.description}
              </p>
            </GradientCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
