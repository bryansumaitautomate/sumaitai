import { Icon } from '@iconify/react';

const Footer = () => {
  const socialLinks = [
    { name: 'LinkedIn', icon: 'simple-icons:linkedin', href: '#' },
    { name: 'Twitter', icon: 'simple-icons:x', href: '#' },
    { name: 'GitHub', icon: 'simple-icons:github', href: '#' },
  ];

  return (
    <footer className="bg-background border-t border-white/10">
      <div className="container-grid">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          {/* Brand */}
          <div className="col-divider pr-8">
            <p className="font-syne font-bold text-xl mb-2">
              BRYAN<span className="text-primary">.</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Revenue Systems Builder
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-divider px-8">
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#systems" className="text-muted-foreground hover:text-foreground transition-colors">
                Systems
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Process
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="pl-8 flex items-center gap-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300"
                aria-label={link.name}
              >
                <Icon icon={link.icon} className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Bryan Sumait. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Built with precision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
