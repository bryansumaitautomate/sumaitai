import { Icon } from '@iconify/react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const ProcessSection = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  const phases = [
    {
      week: 'WEEK 1',
      title: 'Discovery',
      description: 'Deep dive into your current systems, bottlenecks, and revenue leaks.',
      icon: 'solar:magnifer-linear'
    },
    {
      week: 'WEEK 2',
      title: 'Architecture',
      description: 'Design the complete system flow, integrations, and automation logic.',
      icon: 'solar:pen-new-square-linear'
    },
    {
      week: 'WEEK 3',
      title: 'Build',
      description: 'Implement, connect, and configure every component of your revenue system.',
      icon: 'solar:code-linear'
    },
    {
      week: 'WEEK 4',
      title: 'Launch',
      description: 'Go live with testing, optimization, and handoff documentation.',
      icon: 'solar:rocket-linear'
    }
  ];

  return (
    <section className="bg-background section-padding">
      <div className="container-grid">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          <div className="lg:col-divider lg:pr-8">
            <p className="section-label">06 /// PROCESS</p>
          </div>
          <div className="lg:col-span-3 lg:pl-8">
            <h2 className="text-heading">
              From chaos to cash flow in 4 weeks.
            </h2>
          </div>
        </div>

        {/* Timeline Grid */}
        <div 
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${isVisible ? 'stagger-children visible' : 'stagger-children'}`}
        >
          {phases.map((phase, index) => (
            <div
              key={index}
              className="group p-8 border-t border-l border-white/10 hover:bg-white/5 transition-all duration-300 first:border-l-0 md:first:border-l lg:first:border-l-0"
            >
              {/* Week Label */}
              <p className="font-mono text-xs text-primary mb-6">{phase.week}</p>
              
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Icon icon={phase.icon} className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-syne font-semibold text-xl mb-3">{phase.title}</h3>
              <p className="text-small text-muted-foreground">{phase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
