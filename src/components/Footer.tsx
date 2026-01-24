import { Icon } from '@iconify/react';

const Footer = () => {
  const socialLinks = [
    { name: 'LinkedIn', icon: 'simple-icons:linkedin', href: '#' },
    { name: 'Twitter', icon: 'simple-icons:x', href: '#' },
    { name: 'GitHub', icon: 'simple-icons:github', href: '#' },
  ];

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          {/* Brand */}
          <div className="border-r border-white/10 pr-8">
            <p className="font-syne font-bold text-xl mb-2 text-white">
              SUMAIT<span className="text-[#ef4444]">.AI</span>
            </p>
            <p className="text-sm text-white/30">
              Revenue Systems Builder
            </p>
          </div>

          {/* Quick Links */}
          <div className="border-r border-white/10 px-8">
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#systems" className="text-white/30 hover:text-white transition-colors">
                Systems
              </a>
              <a href="#" className="text-white/30 hover:text-white transition-colors">
                Process
              </a>
              <a href="https://bit.ly/sumaitcal" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-[#ef4444] transition-colors">
                Book a Call
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="pl-8 flex items-center gap-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:border-[#ef4444] hover:text-[#ef4444] transition-all duration-300"
                aria-label={link.name}
              >
                <Icon icon={link.icon} className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-white/30">
            © {new Date().getFullYear()} Bryan Sumait. All rights reserved.
          </p>
          <p className="font-mono text-xs text-white/30">
            Built with precision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
