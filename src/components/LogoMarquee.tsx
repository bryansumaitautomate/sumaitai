const logos = ['GHL', 'N8N', 'Claude', 'Lovable', 'Make', 'Antigravity'];

const LogoMarquee = () => {
  return (
    <section className="relative py-12 bg-background border-y border-white/10 overflow-hidden">
      <div className="flex animate-marquee">
        {/* Double the logos for seamless loop */}
        {[...logos, ...logos, ...logos, ...logos].map((name, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-12 flex items-center justify-center"
          >
            <span className="font-mono text-sm tracking-[0.2em] text-white/40 uppercase whitespace-nowrap">
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LogoMarquee;
