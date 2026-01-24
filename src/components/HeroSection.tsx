import { motion } from 'framer-motion';
import LogoMarquee from './LogoMarquee';

const HeroSection = () => {

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <section className="relative min-h-screen bg-black overflow-hidden">
        {/* Spline 3D Robot - Interactive on desktop, disabled on mobile */}
        <div className="spline-container absolute top-0 left-0 w-full h-full z-[5] pointer-events-none md:pointer-events-auto">
          <iframe 
            src="https://my.spline.design/nexbotrobotcharacterconcept-kLwr8f6hgKgaa5gmU6oB00Si" 
            frameBorder="0" 
            width="100%" 
            height="100%" 
            id="aura-spline"
            title="3D Robot"
          />
        </div>

        {/* Background Watermark - z-0, subtle label at bottom */}
        <div className="absolute bottom-8 left-0 right-0 z-0 flex justify-center pointer-events-none select-none">
          <span className="font-syne font-bold text-[5vw] text-white opacity-[0.03] whitespace-nowrap">
            SUMAIT AI
          </span>
        </div>

        {/* Bottom gradient for legibility */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent z-[10] pointer-events-none" />

        {/* 4-Column Grid Structure - z-[1], pointer-events-none to allow mouse through to Spline */}
        <div className="absolute inset-0 z-[1] grid grid-cols-4 pointer-events-none">
          {[0, 1, 2, 3].map((col) => (
            <div
              key={col}
              className={`relative ${col < 3 ? 'border-r border-white/10' : ''}`}
            >
              {/* Beam Animation on first 3 columns */}
              {col < 3 && (
                <div className="absolute top-0 right-0 w-px h-full overflow-hidden">
                  <motion.div
                    className="w-full h-40 bg-gradient-to-b from-transparent via-[#EF4444] to-transparent"
                    animate={{ y: ['-100%', '500%'] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: col * 1.2,
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Content - z-50, above Spline for clickable elements */}
        <div className="relative z-50 min-h-screen flex flex-col pointer-events-none">
          {/* Top Bar */}
          <div className="grid grid-cols-4 border-b border-white/10">
            {/* Logo - Top Left */}
            <div className="p-6 border-r border-white/10">
              <a href="#" className="font-syne font-bold text-lg tracking-tight text-white pointer-events-auto">
                SUMAIT<span className="text-[#EF4444]">.AI</span>
              </a>
            </div>

            {/* Status Badge - Centered */}
            <div className="col-span-2 p-6 border-r border-white/10 hidden md:flex items-center justify-center">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EF4444]"></span>
                </span>
                <span className="font-mono text-xs tracking-wider text-white/40">
                  AVAILABLE FOR PROJECTS
                </span>
              </div>
            </div>

            {/* CTA - Top Right */}
            <div className="p-6 flex items-center justify-end col-span-3 md:col-span-1">
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, 'contact')}
                className="font-mono text-xs tracking-[0.2em] text-white/60 hover:text-white transition-colors pointer-events-auto"
              >
                LET'S TALK →
              </a>
            </div>
          </div>

          {/* Main Content - 4 Column Grid */}
          <div className="flex-1 grid grid-cols-4">
            {/* First Column - Headline anchored to bottom-left */}
            <div className="border-r border-white/10 p-6 flex flex-col justify-end pb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="font-mono text-[10px] tracking-[0.3em] text-white/30 mb-4">
                  01 /// REVENUE SYSTEMS
                </p>
                <p className="font-syne text-base text-white/60 leading-relaxed">
                  I build systems that capture leads, book calls, and close deals—while you sleep.
                </p>
              </motion.div>
            </div>

            {/* Second Column - Empty */}
            <div className="border-r border-white/10"></div>

            {/* Third Column - Empty */}
            <div className="border-r border-white/10"></div>

            {/* Fourth Column - Aura Button anchored to bottom-right */}
            <div className="p-6 flex flex-col justify-end items-end pb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <a
                  href="#systems"
                  onClick={(e) => handleSmoothScroll(e, 'systems')}
                  className="group relative inline-flex items-center gap-3 font-mono text-xs tracking-[0.15em] text-white px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 pointer-events-auto"
                >
                  {/* Spinning border effect */}
                  <span className="absolute inset-0 rounded-full">
                    <span className="absolute inset-0 rounded-full border border-white/20"></span>
                    <span 
                      className="absolute inset-[-2px] rounded-full animate-spin"
                      style={{
                        background: 'conic-gradient(from 0deg, transparent, transparent 270deg, #EF4444 360deg)',
                        animationDuration: '3s',
                      }}
                    ></span>
                    <span className="absolute inset-[1px] rounded-full bg-black"></span>
                  </span>
                  <span className="relative z-10 flex items-center gap-3">
                    VIEW WORK
                    <svg
                      className="w-4 h-4 group-hover:translate-y-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
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
    </>
  );
};

export default HeroSection;
