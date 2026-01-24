import { Icon } from '@iconify/react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const ExperienceSection = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  const skills = [
    'Revenue Systems',
    'Sales Automation',
    'AI Integration',
    'CRM Architecture',
  ];

  const timeline = [
    {
      year: '2021',
      icon: 'solar:chat-round-line-linear',
      title: 'Lead Capture Systems',
      description: 'Built AI receptionist and missed call recovery systems that capture leads 24/7 for home services.',
    },
    {
      year: '2022',
      icon: 'solar:server-square-linear',
      title: 'Sales Automation',
      description: 'Designed GoHighLevel pipelines and auto-follow-up sequences that reduce response time from hours to minutes.',
    },
    {
      year: '2023',
      icon: 'solar:clapperboard-edit-linear',
      title: 'Content Engines',
      description: 'Created video repurposing and high-retention editing systems that turn one piece of content into 10.',
    },
    {
      year: '2024',
      icon: 'solar:widget-5-linear',
      title: 'MADEEA',
      description: 'Built complete business operations: social media automation, lead generation systems, automation hub, and 100+ custom GPTs for workflow optimization.',
      badge: 'M',
    },
    {
      year: '2025',
      icon: 'solar:atom-linear',
      title: 'Disruptor Media Agency',
      description: 'Engineered meeting-to-task automation (AI notes → Slack), scripting automation, and complete CRM pipeline systems.',
      badge: 'D',
      highlight: true,
    },
  ];

  return (
    <section className="w-full bg-[#0a0a0a] border-b border-white/10 py-20">
      <div
        ref={ref}
        className={`max-w-[1400px] mx-auto px-6 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-3">
            <span className="font-mono text-[#ef4444] text-xs block mb-4">05 /// EXPERIENCE</span>
            <h2 className="text-3xl font-syne font-medium text-white">Timeline</h2>
          </div>
          <div className="md:col-span-9">
            <div className="flex gap-4 flex-wrap">
              {skills.map((skill) => (
                <button
                  key={skill}
                  className="px-4 py-2 border border-white/10 bg-white/5 backdrop-blur text-white/70 text-xs font-medium uppercase tracking-wider hover:border-[#ef4444]/35 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-all"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Items */}
        <div className="space-y-0 border-t border-white/10">
          {timeline.map((item, index) => (
            <div
              key={item.year}
              className={`group grid grid-cols-1 md:grid-cols-12 gap-6 py-8 hover:bg-white/5 hover:backdrop-blur transition-all cursor-pointer ${
                index < timeline.length - 1 ? 'border-b border-white/10' : ''
              }`}
            >
              <div className="md:col-span-2 flex items-start gap-3">
                <Icon icon={item.icon} className="text-[#ef4444] text-xl mt-1" />
                <span className="text-white/50 text-sm font-mono">{item.year}</span>
              </div>
              <div className="md:col-span-7">
                <h3 className="text-xl font-medium text-white mb-2 group-hover:text-[#ef4444] transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
              </div>
              <div className="md:col-span-3 flex items-center justify-end">
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <div
                      className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center backdrop-blur transition-all ${
                        item.highlight
                          ? 'border border-[#ef4444]/35 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.25)]'
                          : 'border border-white/10'
                      }`}
                    >
                      <span
                        className={`text-[10px] font-bold ${
                          item.highlight ? 'text-[#ef4444]' : 'text-white/70'
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>
                  )}
                  <Icon
                    icon="solar:alt-arrow-right-linear"
                    className="text-white/30 text-xl group-hover:text-[#ef4444] group-hover:translate-x-2 transition-all"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
