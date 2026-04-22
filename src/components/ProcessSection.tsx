import { Icon } from '@iconify/react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useTilt } from '@/hooks/useTilt';

interface TiltPhaseCardProps {
  phase: {
    phase: string;
    title: string;
    description: string;
    icon: string;
  };
  index: number;
}

const TiltPhaseCard = ({ phase, index }: TiltPhaseCardProps) => {
  const { tilt, handleMouseMove, handleMouseLeave } = useTilt({ maxTilt: 5 });
  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)]"
      style={{
        transitionDelay: `${index * 100}ms`,
        background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)',
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="relative p-8">
        {/* Phase Label */}
        <p className="font-mono text-xs text-[#ef4444] mb-6">{phase.phase}</p>

        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-[#ef4444]/10 border border-[#ef4444]/20 group-hover:border-[#ef4444]/40 transition-colors"
        >
          <Icon icon={phase.icon} className="w-6 h-6 text-white" />
        </div>

        {/* Content */}
        <h3 className="font-syne font-semibold text-xl text-white mb-3 group-hover:text-[#ef4444] transition-colors">
          {phase.title}
        </h3>
        <p className="text-sm text-white/70 leading-relaxed">{phase.description}</p>
      </div>
    </div>
  );
};

const ProcessSection = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  const phases = [
    {
      phase: 'PHASE 01',
      title: 'Discovery',
      description: 'Deep dive into your current systems, bottlenecks, and revenue leaks.',
      icon: 'solar:magnifer-linear',
    },
    {
      phase: 'PHASE 02',
      title: 'Architecture',
      description: 'Design the complete system flow, integrations, and automation logic.',
      icon: 'solar:pen-new-square-linear',
    },
    {
      phase: 'PHASE 03',
      title: 'Build',
      description:
        'Implement, connect, and configure every component of your revenue system.',
      icon: 'solar:code-linear',
    },
    {
      phase: 'PHASE 04',
      title: 'Launch',
      description: 'Go live with testing, optimization, and handoff documentation.',
      icon: 'solar:rocket-linear',
    },
  ];

  return (
    <section id="process" className="relative bg-[#0a0a0a]/80 backdrop-blur-sm py-20 md:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-4 border-x border-white/10 mb-16">
          <div className="border-r border-white/10 py-8">
            <p className="font-mono text-xs tracking-[0.3em] text-[#ef4444] px-4">
              07 /// PROCESS
            </p>
          </div>
          <div className="col-span-3 py-8 px-4">
            <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-white">
              From chaos to cash flow in 30 days.
            </h2>
          </div>
        </div>

        {/* Timeline Grid - 4 Columns */}
        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {phases.map((phase, index) => (
            <TiltPhaseCard key={index} phase={phase} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
