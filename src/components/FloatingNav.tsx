import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const FloatingNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Systems', href: '#systems' },
    { label: 'Experience', href: '#experience' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 z-50 p-6"
    >
      {/* Mobile Menu Button - Outside capsule on mobile */}
      <div className="md:hidden flex justify-between items-center max-w-6xl mx-auto">
        <a href="#" className="font-syne font-bold text-lg tracking-tight text-white/90">
          SUMAIT<span className="text-primary">.AI</span>
        </a>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Toggle menu"
        >
          <Icon
            icon={mobileMenuOpen ? 'solar:close-circle-linear' : 'solar:hamburger-menu-linear'}
            className="w-5 h-5"
          />
        </button>
      </div>

      {/* Desktop: Single Unified Capsule */}
      <div className="hidden md:flex justify-center">
        <div
          className="flex items-center gap-2 rounded-full py-2 px-3"
          style={{
            background: `linear-gradient(180deg, rgba(10,10,10,0.55), rgba(10,10,10,0.35)) padding-box, linear-gradient(120deg, rgba(255,255,255,0.35), rgba(255,255,255,0.08)) border-box`,
            border: '1px solid transparent',
            backdropFilter: 'blur(16px) saturate(120%)',
            WebkitBackdropFilter: 'blur(16px) saturate(120%)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        >
          {/* Logo - Left inside capsule */}
          <a href="#" className="font-syne font-bold text-lg tracking-tight text-white/90 pl-4 pr-6">
            SUMAIT<span className="text-primary">.AI</span>
          </a>

          {/* Nav Links - Center */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-sm text-white/60 hover:text-white hover:bg-white/5 px-4 py-2 rounded-full transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button - Right inside capsule */}
          <a
            href="https://cal.com/bryan-dave-sumait-nzvzba/automation-intro"
            target="_blank"
            rel="noopener noreferrer"
            className="relative ml-4 items-center gap-2 font-mono text-xs tracking-[0.15em] text-white px-5 py-2.5 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_30px_6px_rgba(239,68,68,0.3)] hover:shadow-[0_0_50px_10px_rgba(239,68,68,0.45)]"
          >
            {/* Spinning border effect */}
            <span className="absolute inset-0 rounded-full">
              <span className="absolute inset-0 rounded-full border border-white/10"></span>
              <span
                className="absolute inset-[-2px] rounded-full animate-spin"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, transparent 270deg, #ef4444 360deg)',
                  animationDuration: '3s',
                }}
              ></span>
              <span className="absolute inset-[1px] rounded-full bg-[#0a0a0a]/90 backdrop-blur-md"></span>
            </span>
            <span className="relative z-10">LET'S TALK →</span>
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 max-w-6xl mx-auto rounded-2xl p-4"
            style={{
              background: `linear-gradient(180deg, rgba(10,10,10,0.9), rgba(10,10,10,0.85)) padding-box, linear-gradient(120deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05)) border-box`,
              border: '1px solid transparent',
              backdropFilter: 'blur(16px) saturate(120%)',
              WebkitBackdropFilter: 'blur(16px) saturate(120%)',
            }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-sm text-white/60 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://cal.com/bryan-dave-sumait-nzvzba/automation-intro"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 bg-[#ef4444] text-white px-5 py-3 rounded-lg hover:bg-[#ef4444]/90 transition-colors text-sm font-medium text-center"
              >
                LET'S TALK →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default FloatingNav;
