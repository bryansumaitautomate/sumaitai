import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FloatingNav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* 4-column grid structure */}
        <div className="grid grid-cols-4 border-b border-white/10">
          {/* Logo */}
          <div className="border-r border-white/10 py-4 md:py-5">
            <a href="#" className="font-syne font-bold text-lg md:text-xl tracking-tight text-white">
              SUMAIT<span className="text-[#EF4444]">.AI</span>
            </a>
          </div>

          {/* Center - Status */}
          <div className="border-r border-white/10 py-4 md:py-5 hidden md:flex items-center justify-center">
            <div className="flex items-center gap-2 text-xs font-mono text-white/40">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EF4444]"></span>
              </span>
              <span>AVAILABLE</span>
            </div>
          </div>

          {/* Empty column for grid consistency */}
          <div className="border-r border-white/10 hidden md:block"></div>

          {/* CTA */}
          <div className="py-4 md:py-5 flex items-center justify-end col-span-3 md:col-span-1">
            <a
              href="#contact"
              className="font-mono text-xs tracking-wider text-white/60 hover:text-[#EF4444] transition-colors duration-300"
            >
              LET'S TALK →
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default FloatingNav;
