import { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';

// Logo imports
import whiterabbitdataLogo from '@/assets/logos/whiterabbitdata.png';
import tembusulawLogo from '@/assets/logos/tembusulaw.png';
import legacyleadprosLogo from '@/assets/logos/legactleadpros.png';
import superssizemediaLogo from '@/assets/logos/supersizemedia.png';
import gratefulgesturesLogo from '@/assets/logos/gratefulgestures.png';
import evolvesmarterLogo from '@/assets/logos/evolvesmarter.png';
import biznomadLogo from '@/assets/logos/biznomad.png';
import bighammerLogo from '@/assets/logos/bighammerwines.png';
import sadmarketingLogo from '@/assets/logos/sadmarketing.png';
import adclientsLogo from '@/assets/logos/adclients.png';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: string;
  metricLabel: string;
  logo: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Integrating Bryan's automation logic with our data workflows was seamless. He helped us turn raw information into actionable leads with zero manual effort.",
    author: "White Rabbit Data",
    role: "Founder/CEO",
    company: "White Rabbit Data",
    metric: "100%",
    metricLabel: "Automation",
    logo: whiterabbitdataLogo
  },
  {
    id: 2,
    quote: "The precision in the lead capture architecture Bryan built is impressive. For a legal practice, response time and reliability are everything, and he delivered both.",
    author: "Tembusu Law",
    role: "Founder/CEO",
    company: "Tembusu Law",
    metric: "24/7",
    metricLabel: "Response Time",
    logo: tembusulawLogo
  },
  {
    id: 3,
    quote: "As lead generation experts, we have high standards. The Call Magik system is one of the most effective tools we've seen for instant speed-to-lead conversion.",
    author: "Legacy Lead Pros",
    role: "Founder/CEO",
    company: "Legacy Lead Pros",
    metric: "5x",
    metricLabel: "Conversion Rate",
    logo: legacyleadprosLogo
  },
  {
    id: 4,
    quote: "Bryan's AI automation allowed us to scale our content distribution without ballooning our overhead. A must-have for any modern media agency.",
    author: "Supersize Media",
    role: "Founder/CEO",
    company: "Supersize Media",
    metric: "60%",
    metricLabel: "Overhead Reduced",
    logo: superssizemediaLogo
  },
  {
    id: 5,
    quote: "The automated follow-up system feels surprisingly personal and thoughtful. It has helped us maintain a high-touch feel while growing our customer base.",
    author: "Grateful Gestures",
    role: "Founder/CEO",
    company: "Grateful Gestures",
    metric: "98%",
    metricLabel: "Retention Rate",
    logo: gratefulgesturesLogo
  },
  {
    id: 6,
    quote: "Bryan truly lives up to our brand name. His automation solutions helped our operations evolve by removing bottlenecks we didn't even know we had.",
    author: "Evolve Smarter",
    role: "Founder/CEO",
    company: "Evolve Smarter",
    metric: "40hrs",
    metricLabel: "Saved Weekly",
    logo: evolvesmarterLogo
  },
  {
    id: 7,
    quote: "Finally, an AI service that understands the Small Business Hero. Practical, easy to use, and focused entirely on the bottom line.",
    author: "Biznomad",
    role: "Founder/CEO",
    company: "Biznomad",
    metric: "10x",
    metricLabel: "ROI",
    logo: biznomadLogo
  },
  {
    id: 8,
    quote: "We needed a robust system to handle high-volume inquiries during peak seasons. Bryan's custom CRM logic ensured no customer was ever left waiting.",
    author: "Big Hammer Wines",
    role: "Founder/CEO",
    company: "Big Hammer Wines",
    metric: "0",
    metricLabel: "Customers Waiting",
    logo: bighammerLogo
  },
  {
    id: 9,
    quote: "The synergy between our ad campaigns and Bryan's automated pipeline is flawless. We are seeing much higher conversion rates on our existing traffic.",
    author: "Complete Marketing",
    role: "Founder/CEO",
    company: "Complete Marketing",
    metric: "3x",
    metricLabel: "Conversion Rate",
    logo: sadmarketingLogo
  },
  {
    id: 10,
    quote: "Bryan's technical expertise in connecting lead sources to automated booking systems has fundamentally improved the ROI we deliver to our clients.",
    author: "AdClients.com",
    role: "Founder/CEO",
    company: "AdClients.com",
    metric: "200%",
    metricLabel: "ROI Improvement",
    logo: adclientsLogo
  }
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const sumaitNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const sumaitPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      sumaitNext();
    }, 8000);
    return () => clearInterval(interval);
  }, [sumaitNext]);

  const current = testimonials[currentIndex];

  return (
    <section className="relative py-24 md:py-32 bg-[#0a0a0a]/80 backdrop-blur-sm overflow-hidden">
      {/* Border gradient overlay - subtle red tint */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, transparent 50%, rgba(239, 68, 68, 0.05) 100%)`,
        }}
      />
      {/* 4-Column Grid Lines */}
      <div className="absolute inset-0 grid grid-cols-4 pointer-events-none">
        <div className="border-r border-white/10" />
        <div className="border-r border-white/10" />
        <div className="border-r border-white/10" />
        <div />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-0">
          {/* Left Column - Title (Column 1) */}
          <div className="lg:col-span-1 lg:pr-8 lg:border-r lg:border-white/10">
            <span className="font-mono text-xs tracking-[0.3em] text-[#ef4444] mb-4 block">08 /// TESTIMONIALS</span>
            <h2 className="font-syne text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
              Results that speak volumes
            </h2>
            <p className="font-inter text-white/50 text-sm leading-relaxed mb-8">
              Real feedback from founders and executives who've experienced the Revenue Systems approach.
            </p>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={sumaitPrev}
                disabled={isAnimating}
                className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:text-[#ef4444] transition-all duration-300 disabled:opacity-50 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#ef4444]/25"
                aria-label="Previous testimonial"
              >
                <Icon icon="solar:arrow-left-linear" className="w-5 h-5" />
              </button>
              <button
                onClick={sumaitNext}
                disabled={isAnimating}
                className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:text-[#ef4444] transition-all duration-300 disabled:opacity-50 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#ef4444]/25"
                aria-label="Next testimonial"
              >
                <Icon icon="solar:arrow-right-linear" className="w-5 h-5" />
              </button>
              <span className="font-mono text-xs text-white/30 ml-2">
                {String(currentIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Right Column - Testimonial Card (Columns 2, 3, 4) */}
          <div className="lg:col-span-3 lg:pl-8">
            <div 
              className={`relative transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
            >
              {/* Large Quote Mark */}
              <div className="absolute -top-4 -left-2 pointer-events-none select-none">
                <span className="font-syne text-[120px] md:text-[180px] text-[#ef4444]/15 leading-none">
                  "
                </span>
              </div>
              {/* Quote Content */}
              <div className="relative pt-16 md:pt-20">
                <blockquote className="font-inter text-xl md:text-2xl lg:text-3xl text-white leading-relaxed mb-8">
                  {current.quote}
                </blockquote>

                {/* Author Info & Metric */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    {/* Logo Watermark - next to author */}
                    <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-white/5 p-2 flex items-center justify-center">
                      <img 
                        src={current.logo}
                        alt={`${current.company} logo`}
                        className="w-full h-full object-contain opacity-70 grayscale"
                      />
                    </div>
                    <div>
                      <p className="font-syne font-bold text-white text-lg">
                        {current.author}
                      </p>
                      <p className="font-inter text-white/30 text-sm">
                        {current.role}, {current.company}
                      </p>
                    </div>
                  </div>

                  {/* Metric Highlight */}
                  <div className="flex items-baseline gap-2">
                    <span className="font-syne font-bold text-4xl md:text-5xl text-[#ef4444]">
                      {current.metric}
                    </span>
                    <span className="font-mono text-xs text-white/30 uppercase tracking-wider">
                      {current.metricLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Closing Quote Mark */}
              <div className="absolute -bottom-8 right-0 pointer-events-none select-none">
                <span className="font-syne text-[120px] md:text-[180px] text-[#ef4444]/15 leading-none rotate-180 inline-block">
                  "
                </span>
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="flex gap-2 mt-16">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentIndex(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-8 bg-[#ef4444]' 
                      : 'w-4 bg-white/10 hover:bg-white/30'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
