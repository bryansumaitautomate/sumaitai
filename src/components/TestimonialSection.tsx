import { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: string;
  metricLabel: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Bryan's Revenue Systems transformed our entire sales pipeline. We went from chaos to a predictable, scalable machine that runs itself.",
    author: "Marcus Chen",
    role: "CEO",
    company: "TechFlow Industries",
    metric: "312%",
    metricLabel: "Revenue Growth"
  },
  {
    id: 2,
    quote: "The automation architecture he built saved us 40+ hours per week. Our team now focuses on strategy instead of repetitive tasks.",
    author: "Sarah Mitchell",
    role: "COO",
    company: "Velocity Partners",
    metric: "40hrs",
    metricLabel: "Saved Weekly"
  },
  {
    id: 3,
    quote: "Working with Bryan felt like gaining a technical co-founder. His Revenue Systems approach is methodical, precise, and brutally effective.",
    author: "David Park",
    role: "Founder",
    company: "ScaleUp Ventures",
    metric: "5x",
    metricLabel: "Pipeline Value"
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
    <section className="relative py-24 md:py-32 bg-[#0a0a0a] overflow-hidden">
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
            <span className="font-mono text-xs tracking-[0.3em] text-[#ef4444] mb-4 block">05 /// TESTIMONIALS</span>
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
                  <div>
                    <p className="font-syne font-bold text-white text-lg">
                      {current.author}
                    </p>
                    <p className="font-inter text-white/30 text-sm">
                      {current.role}, {current.company}
                    </p>
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
