import { Icon } from '@iconify/react';
import bryanProfile from '@/assets/bryan-sumait-profile.png';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const ProfileSection = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  const timeline = [
    {
      year: '2021',
      title: 'CRM Architecture',
      icon: 'solar:server-minimalistic-linear',
      brandIcon: 'simple-icons:hubspot',
      brandColor: '#FF7A59',
    },
    {
      year: '2022',
      title: 'Process Automation',
      icon: 'solar:routing-2-linear',
      brandIcon: 'simple-icons:zapier',
      brandColor: '#FF4A00',
    },
    {
      year: '2023',
      title: 'AI Integration',
      icon: 'solar:cpu-bolt-linear',
      brandIcon: 'simple-icons:openai',
      brandColor: '#FFFFFF',
    },
    {
      year: '2024',
      title: 'Founder, Sumait AI',
      icon: 'solar:flag-linear',
      brandIcon: 'simple-icons:stripe',
      brandColor: '#635BFF',
    },
  ];

  const skills = [
    'Revenue Systems',
    'Sales Automation',
    'AI Integration',
    'CRM Architecture',
  ];

  return (
    <section className="relative z-20 bg-[#0a0a0a] text-white w-full border-b border-white/10">
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
                  className="w-full h-full object-cover grayscale contrast-125 opacity-80 group-hover:opacity-100 transition-all duration-700"
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

            <button className="group mt-12 w-full py-4 px-6 bg-[#ef4444] text-white font-syne font-bold text-sm tracking-wide rounded-sm flex items-center justify-between hover:shadow-[0_0_30px_rgba(239,68,68,0.35)] transition-all">
              Connect
              <Icon icon="solar:arrow-right-up-linear" width={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          {/* Right Column: Details */}
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

            {/* Experience Timeline */}
            <div className="flex-1 flex flex-col">
              {timeline.map((item, index) => (
                <div 
                  key={item.year}
                  className={`group flex-1 flex flex-col lg:flex-row items-start lg:items-center justify-between p-6 lg:px-12 border-t-2 border-[#ef4444]/15 hover:bg-white/5 transition-colors cursor-default gap-4 ${
                    index < timeline.length - 1 ? 'border-b border-white/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-8 w-full lg:w-auto">
                    <div className="flex items-center gap-3 w-32">
                      <Icon icon={item.icon} width={16} className="text-[#ef4444]" />
                      <span className="text-sm font-mono text-white/50 group-hover:text-white transition-colors">{item.year}</span>
                    </div>
                    <h4 className="text-lg font-syne font-semibold tracking-tight text-white">{item.title}</h4>
                  </div>
                  <div className="flex items-center justify-between w-full lg:w-auto lg:flex-1 lg:justify-end gap-8">
                    <Icon 
                      icon={item.brandIcon} 
                      width={96} 
                      height={24} 
                      className="opacity-30 group-hover:opacity-100 transition-colors"
                      style={{ color: item.brandColor }}
                    />
                    <Icon 
                      icon="solar:arrow-right-linear" 
                      width={20} 
                      className="text-white/30 group-hover:text-[#ef4444] group-hover:translate-x-2 transition-all" 
                    />
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
