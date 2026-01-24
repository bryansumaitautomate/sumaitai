import { Icon } from '@iconify/react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

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
    <section className="bg-black py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-4 border-x border-white/10 mb-16">
          <div className="border-r border-white/10 py-8">
            <p className="font-mono text-xs tracking-[0.3em] text-[#EF4444] px-4">
              07 /// PROCESS
            </p>
          </div>
          <div className="col-span-3 py-8 px-4">
            <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-white">
              From chaos to cash flow in 4 weeks.
            </h2>
          </div>
        </div>

        {/* Timeline Grid - 4 Columns with vertical dividers */}
        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-x border-t border-white/10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {phases.map((phase, index) => (
            <div
              key={index}
              className={`group p-8 border-b border-white/10 hover:bg-white/5 transition-all duration-300 ${
                index < 3 ? 'lg:border-r' : ''
              } ${index < 2 ? 'md:border-r' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Phase Label */}
              <p className="font-mono text-xs text-[#EF4444] mb-6">{phase.phase}</p>

              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#EF4444]/20 transition-colors">
                <Icon icon={phase.icon} className="w-6 h-6 text-[#EF4444]" />
              </div>

              {/* Content */}
              <h3 className="font-syne font-semibold text-xl text-white mb-3">
                {phase.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">{phase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
