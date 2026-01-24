import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect } from 'react';

const HeroSection = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for parallax
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(useTransform(mouseX, [0, 1], [-20, 20]), springConfig);
  const y = useSpring(useTransform(mouseY, [0, 1], [-15, 15]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth);
      mouseY.set(clientY / innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Watermark with Parallax - z-0, behind everything */}
      <motion.div 
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none"
        style={{ x, y }}
      >
        <span className="font-syne font-bold text-[15vw] text-white opacity-[0.05] whitespace-nowrap">
          SUMAIT AI
        </span>
      </motion.div>

      {/* 4-Column Grid Structure - z-[1] */}
      <div className="absolute inset-0 z-[1] grid grid-cols-4">
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

      {/* Content - z-10, above grid and watermark */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Bar */}
        <div className="grid grid-cols-4 border-b border-white/10">
          {/* Logo - Top Left */}
          <div className="p-6 border-r border-white/10">
            <a href="#" className="font-syne font-bold text-lg tracking-tight text-white">
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
              className="font-mono text-xs tracking-[0.2em] text-white/60 hover:text-white transition-colors"
            >
              LET'S TALK →
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-4">
          {/* Headline - Bottom Left (spans 2 columns) */}
          <div className="md:col-span-2 md:border-r border-white/10 p-8 md:p-16 flex flex-col justify-end pb-16 md:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="font-mono text-xs tracking-[0.3em] text-[#EF4444] mb-8">
                01 /// REVENUE SYSTEMS
              </p>
              <h1 className="font-syne font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95] tracking-tight">
                I build systems that
                <br />
                <span className="text-[#EF4444]">capture leads</span>, book
                <br />
                calls, and close deals—
                <br />
                <span className="italic font-normal">while you sleep.</span>
              </h1>
            </motion.div>
          </div>

          {/* Empty third column for grid consistency */}
          <div className="hidden md:block md:border-r border-white/10"></div>

          {/* VIEW WORK - Bottom Right (fourth column only) */}
          <div className="p-8 md:p-12 flex flex-col justify-end items-end pb-16 md:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <a
                href="#systems"
                onClick={(e) => handleSmoothScroll(e, 'systems')}
                className="group inline-flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-white border border-white/20 px-6 py-4 hover:border-[#EF4444] hover:text-[#EF4444] transition-all duration-300"
              >
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
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
