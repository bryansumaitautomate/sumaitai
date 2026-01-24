import { Icon } from '@iconify/react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface SystemCardProps {
  number: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  isLight?: boolean;
  reversed?: boolean;
}

const SystemCard = ({ number, title, description, features, icon, isLight = false, reversed = false }: SystemCardProps) => {
  const { ref, isVisible } = useScrollReveal(0.2);

  const bgClass = isLight ? 'light-section' : 'bg-background';
  const textClass = isLight ? 'text-light-fg' : 'text-foreground';
  const mutedClass = isLight ? 'text-light-muted' : 'text-muted-foreground';
  const borderClass = isLight ? 'border-black/10' : 'border-white/10';

  return (
    <div className={`${bgClass} section-padding`}>
      <div className="container-grid">
        <div
          ref={ref}
          className={`reveal ${isVisible ? 'visible' : ''}`}
        >
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 ${reversed ? 'lg:flex-row-reverse' : ''}`}>
            {/* Content */}
            <div className={`${reversed ? 'lg:order-2' : ''} flex flex-col justify-center`}>
              <p className="section-label mb-6">{number} /// SYSTEM</p>
              <h3 className={`text-heading ${textClass} mb-6`}>{title}</h3>
              <p className={`text-body ${mutedClass} mb-8`}>{description}</p>
              
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className={`flex items-start gap-3 ${mutedClass}`}>
                    <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-small">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Abstract Mockup */}
            <div className={`${reversed ? 'lg:order-1' : ''} flex items-center justify-center`}>
              <div className={`relative w-full max-w-md aspect-square glass rounded-lg ${borderClass} p-8`}>
                {/* Abstract UI Elements */}
                <div className="absolute inset-4">
                  {/* Header bar */}
                  <div className={`flex items-center gap-2 mb-6 pb-4 border-b ${borderClass}`}>
                    <div className="w-3 h-3 rounded-full bg-primary/30" />
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                  </div>
                  
                  {/* Main Icon */}
                  <div className="flex items-center justify-center h-32">
                    <Icon icon={icon} className="w-20 h-20 text-primary/50" />
                  </div>

                  {/* Abstract Lines */}
                  <div className="space-y-3 mt-6">
                    <div className={`h-2 ${isLight ? 'bg-black/10' : 'bg-white/10'} rounded w-3/4`} />
                    <div className={`h-2 ${isLight ? 'bg-black/10' : 'bg-white/10'} rounded w-1/2`} />
                    <div className={`h-2 ${isLight ? 'bg-black/10' : 'bg-white/10'} rounded w-2/3`} />
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute top-8 right-8 w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center animate-float">
                    <Icon icon="solar:bolt-linear" className="w-6 h-6 text-primary" />
                  </div>
                </div>

                {/* Glow Effect */}
                <div 
                  className="absolute inset-0 rounded-lg opacity-30"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, hsl(0 84% 50% / 0.2) 0%, transparent 50%)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SystemsSection = () => {
  const systems = [
    {
      number: '02',
      title: 'Lead Capture Engine',
      description: 'Stop losing leads to broken forms and slow follow-ups. My capture systems grab every prospect and start nurturing instantly.',
      features: [
        'Multi-channel capture (web, social, ads)',
        'Instant lead scoring and routing',
        'Automated welcome sequences',
        'CRM integration and sync'
      ],
      icon: 'solar:magnet-linear',
      isLight: false,
      reversed: false
    },
    {
      number: '03',
      title: 'Appointment Booking Flow',
      description: 'Turn interested leads into booked calls without the back-and-forth. Qualification, scheduling, and reminders—all automated.',
      features: [
        'Smart qualification questions',
        'Calendar sync across platforms',
        'Automated confirmation and reminders',
        'No-show recovery sequences'
      ],
      icon: 'solar:calendar-linear',
      isLight: true,
      reversed: true
    },
    {
      number: '04',
      title: 'Deal Closing Pipeline',
      description: 'Keep deals moving with automated follow-ups, proposal delivery, and contract workflows that close faster.',
      features: [
        'Stage-based automation triggers',
        'Proposal and contract templates',
        'Payment integration ready',
        'Win/loss analysis tracking'
      ],
      icon: 'solar:chart-linear',
      isLight: false,
      reversed: false
    }
  ];

  return (
    <div id="systems">
      {systems.map((system, index) => (
        <SystemCard key={index} {...system} />
      ))}
    </div>
  );
};

export default SystemsSection;
