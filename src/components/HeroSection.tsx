import { motion } from 'framer-motion';
import LogoMarquee from './LogoMarquee';
import { useMagnetic } from '@/hooks/useMagnetic';
const HeroSection = () => {
  const { ref: bookCallRef, offset: bookCallOffset } = useMagnetic({ range: 120, maxOffset: 8 });
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  return <>
      <section className="relative min-h-screen bg-[#0a0a0a] overflow-visible">
        {/* Spline 3D Robot - Fixed to viewport, behind all content */}
        <div className="spline-container fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
          <iframe src="https://my.spline.design/nexbotrobotcharacterconcept-kLwr8f6hgKgaa5gmU6oB00Si" frameBorder="0" width="100%" height="100%" id="aura-spline" title="3D Robot" style={{
          pointerEvents: 'none'
        }} />
        </div>

        {/* Background Watermark - Centered, behind grid and Spline */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] pointer-events-none select-none px-8">
          <span className="font-syne font-bold text-[12vw] text-white opacity-[0.04] whitespace-nowrap">
            SUMAIT.AI
          </span>
        </div>

        {/* Bottom gradient for legibility */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent z-[10] pointer-events-none" />

        {/* 4-Column Grid Structure - z-[1], pointer-events-none to allow mouse through to Spline */}
        <div className="absolute inset-0 z-[1] grid grid-cols-4 pointer-events-none">
          {[0, 1, 2, 3].map(col => <div key={col} className={`relative ${col < 3 ? 'border-r border-white/10' : ''}`}>
              {/* Beam Animation on first 3 columns */}
              {col < 3 && <div className="absolute top-0 right-0 w-px h-full overflow-hidden">
                  <motion.div className="w-full h-40 bg-gradient-to-b from-transparent via-[#ef4444] to-transparent" animate={{
              y: ['-100%', '500%']
            }} transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
              delay: col * 1.2
            }} />
                </div>}
            </div>)}
        </div>

        {/* Content - z-50, above Spline for clickable elements */}
        <div className="relative z-50 min-h-screen flex flex-col pointer-events-none">
          {/* Top Bar */}
          <div className="grid grid-cols-4 border-b border-white/10">
            {/* Logo - Top Left */}
            <div className="p-6 border-r border-white/10">
              
            </div>

            {/* Empty center columns */}
            <div className="col-span-2 p-6 border-r border-white/10 hidden md:block"></div>

            {/* CTA - Top Right */}
            <div className="p-6 flex items-center justify-end col-span-3 md:col-span-1">
              
            </div>
          </div>

          {/* Main Content - 4 Column Grid (desktop) / single column (mobile) */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-4">
            {/* Headline cluster - spans columns 1-3 at desktop, full width at mobile */}
            <div className="lg:col-span-3 lg:border-r border-white/10 p-6 lg:p-12 flex flex-col justify-end pb-12 lg:pb-16">
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: 0.2
            }}>
                <p className="font-mono text-[10px] tracking-[0.3em] text-[#ef4444] mb-4">
                  01 /// REVENUE SYSTEMS
                </p>
                <h1 className="font-syne font-bold text-3xl sm:text-4xl lg:text-6xl text-white leading-[1.05] tracking-tight mb-4 max-w-4xl">
                  I build systems that capture leads, book calls, and close deals while you sleep.
                </h1>
                <p className="font-syne text-base lg:text-lg text-white/60 leading-relaxed max-w-2xl">
                  Founder of SUMAIT AI Agents, helping B2B businesses turn calls and chats into booked revenue.
                </p>
              </motion.div>
            </div>

            {/* CTA cluster - column 4 at desktop, full width at mobile */}
            <div className="p-6 lg:p-8 flex flex-col justify-end items-stretch lg:items-end pb-12 lg:pb-16 gap-3">
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: 0.6
            }} className="flex flex-col gap-3 w-full lg:w-auto">
                {/* Primary CTA: BOOK A CALL */}
                <a
                  ref={bookCallRef as React.Ref<HTMLAnchorElement>}
                  style={{ transform: `translate(${bookCallOffset.x}px, ${bookCallOffset.y}px)`, transition: "transform 0.15s ease-out, box-shadow 0.3s ease, border-color 0.3s ease" }}
                  href="https://cal.com/bryan-dave-sumait-nzvzba/automation-intro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 font-mono text-xs tracking-[0.15em] text-white px-8 py-4 rounded-full overflow-hidden transition-all duration-300 pointer-events-auto shadow-[0_0_40px_8px_rgba(239,68,68,0.35)] hover:shadow-[0_0_60px_12px_rgba(239,68,68,0.5)]"
                >
                  <span className="absolute inset-0 rounded-full">
                    <span className="absolute inset-0 rounded-full border border-white/10"></span>
                    <span className="absolute inset-[-2px] rounded-full animate-spin" style={{
                    background: 'conic-gradient(from 0deg, transparent, transparent 270deg, #ef4444 360deg)',
                    animationDuration: '3s'
                  }}></span>
                    <span className="absolute inset-[1px] rounded-full bg-[#0a0a0a]/80 backdrop-blur-md"></span>
                  </span>
                  <span className="relative z-10 flex items-center gap-3">
                    BOOK A CALL
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                      <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </span>
                </a>

                {/* Secondary CTA: VIEW WORK */}
                <a
                  href="#systems"
                  onClick={e => handleSmoothScroll(e, 'systems')}
                  className="group inline-flex items-center justify-center gap-3 font-mono text-xs tracking-[0.15em] text-white/80 hover:text-white px-8 py-4 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 pointer-events-auto"
                >
                  VIEW WORK
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <svg className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Marquee */}
      <LogoMarquee />
    </>;
};
export default HeroSection;