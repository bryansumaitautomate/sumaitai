import { Icon } from '@iconify/react';
import bryanProfile from '@/assets/bryan-sumait-profile.png';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const ProfileSection = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  const experienceCards = [
    {
      year: '2021',
      title: 'Lead Capture Systems',
      description: 'Built AI receptionist and missed call recovery systems that capture leads 24/7 for home services.',
      icon: 'solar:chat-round-line-linear',
      badge: null,
    },
    {
      year: '2022',
      title: 'Sales Automation',
      description: 'Designed GoHighLevel pipelines and auto-follow-up sequences that reduce response time from hours to minutes.',
      icon: 'solar:server-square-linear',
      badge: null,
    },
    {
      year: '2023',
      title: 'Content Engines',
      description: 'Created video repurposing and high-retention editing systems that turn one piece of content into 10.',
      icon: 'solar:clapperboard-edit-linear',
      badge: null,
    },
    {
      year: '2024',
      title: 'MADEEA',
      description: 'Built complete business operations: social media automation, lead generation systems, automation hub, and 100+ custom GPTs for workflow optimization.',
      icon: 'solar:widget-5-linear',
      badge: 'M',
    },
    {
      year: '2025',
      title: 'Disruptor Media Agency',
      description: 'Engineered meeting-to-task automation (AI notes → Slack), scripting automation, and complete CRM pipeline systems.',
      icon: 'solar:atom-linear',
      badge: 'D',
    },
  ];

  const skills = [
    'Revenue Systems',
    'Sales Automation',
    'AI Integration',
    'CRM Architecture',
  ];

  return (
    <section id="experience" className="relative z-20 bg-[#0a0a0a] text-white w-full border-b border-white/10">
      <div
        ref={ref}
        className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 w-full max-w-7xl mx-auto">
          
          {/* Header (Full Width) */}
          <div className="col-span-1 lg:col-span-4 p-8 lg:p-16 border-b border-white/10 flex flex-col items-start gap-6 bg-[#0a0a0a]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ef4444]/8 border border-[#ef4444]/15 backdrop-blur-md">
              <Icon icon="solar:cpu-bolt-linear" width={16} className="text-[#ef4444]" />
              <span className="text-xs font-mono font-medium tracking-wide text-[#ef4444] uppercase">Systems Architect</span>
            </div>
            <h2 className="text-5xl lg:text-8xl font-syne font-bold tracking-tighter text-white leading-[0.9]">
              Bryan Sumait<span className="text-[#ef4444]">.</span>
            </h2>
            <p className="text-white/50 text-xl lg:text-2xl max-w-3xl font-light leading-relaxed">
              I turn scattered funnels into revenue machines.
            </p>
          </div>

          {/* Left Column: Profile Card */}
          <div 
            className="col-span-1 lg:col-span-1 flex flex-col min-h-[600px] h-full border-r border-white/10 border-b lg:border-b-0 p-8 justify-between bg-white/5 backdrop-blur-md"
          >
            <div className="flex flex-col gap-8">
              {/* Avatar */}
              <div className="aspect-[4/5] overflow-hidden group w-full border border-white/10 rounded-sm relative shadow-2xl">
                <img 
                  src={bryanProfile} 
                  alt="Bryan Sumait" 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90"></div>
                
                {/* Availability Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-[#0a0a0a]/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444] shadow-[0_0_8px_#ef4444] animate-pulse"></div>
                    <span className="text-[10px] font-mono text-white font-medium uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-syne font-medium tracking-tight mb-2 text-white">Bryan Sumait</h3>
                <p className="text-sm text-white/50 leading-relaxed font-normal">
                  Specializing in high-ticket sales infrastructure and AI automation.
                </p>
              </div>

              {/* Socials */}
              <div className="flex items-center gap-3">
                <a 
                  href="#" 
                  className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-sm hover:bg-[#ef4444] hover:text-white hover:border-[#ef4444] transition-all group text-white/50"
                >
                  <Icon icon="simple-icons:x" width={16} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-sm hover:bg-[#ef4444] hover:text-white hover:border-[#ef4444] transition-all group text-white/50"
                >
                  <Icon icon="simple-icons:linkedin" width={16} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-sm hover:bg-[#ef4444] hover:text-white hover:border-[#ef4444] transition-all group text-white/50"
                >
                  <Icon icon="simple-icons:instagram" width={16} />
                </a>
              </div>
            </div>

            <a 
              href="https://cal.com/bryan-dave-sumait-nzvzba/automation-intro"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-12 w-full py-4 px-6 bg-[#ef4444] text-white font-syne font-bold text-sm tracking-wide rounded-sm flex items-center justify-between hover:shadow-[0_0_30px_rgba(239,68,68,0.35)] transition-all"
            >
              Connect
              <Icon icon="solar:arrow-right-up-linear" width={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Right Column: Experience Cards Grid */}
          <div className="col-span-1 lg:col-span-3 flex flex-col h-full bg-[#0a0a0a]">
            
            {/* Tags Section */}
            <div className="p-8 lg:p-12 border-b border-white/10">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-xs font-mono uppercase tracking-wider text-white/50 hover:text-white hover:border-[#ef4444]/25 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Section Header */}
            <div className="px-8 lg:px-12 pt-8 lg:pt-12 pb-6">
              <span className="text-xs font-mono tracking-widest text-[#ef4444] uppercase mb-3 block">
                05 /// EXPERIENCE
              </span>
              <h3 className="text-3xl lg:text-4xl font-syne font-bold text-white tracking-tight">
                Timeline
              </h3>
            </div>

            {/* Experience Cards - Stacked List */}
            <div className="flex-1">
              {experienceCards.map((card, index) => (
                <div
                  key={card.year}
                  className={`group flex items-start gap-6 p-6 lg:p-8 transition-all duration-300 hover:bg-white/5 cursor-default ${
                    index !== experienceCards.length - 1 ? 'border-b border-white/10' : ''
                  }`}
                  style={{
                    background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)',
                  }}
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/20 flex items-center justify-center flex-shrink-0">
                    <Icon icon={card.icon} width={20} className="text-[#ef4444]" />
                  </div>

                  {/* Year */}
                  <span className="text-sm font-mono text-white/50 w-12 flex-shrink-0 pt-1">
                    {card.year}
                  </span>

                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="text-lg font-syne font-bold text-white mb-2 group-hover:text-[#ef4444] transition-colors">
                      {card.title}
                    </h4>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
