import { motion } from 'framer-motion';

// Import client logos
import propertybots from '@/assets/logos/propertybots.png';
import drleadflow from '@/assets/logos/drleadflow.png';
import neovate from '@/assets/logos/neovate.png';
import drblade from '@/assets/logos/drblade.png';
import holisticvitalis from '@/assets/logos/holisticvitalis.png';
import evalics from '@/assets/logos/evalics.png';
import madeea from '@/assets/logos/madeea.png';
import whiterabbitdata from '@/assets/logos/whiterabbitdata.png';
import tembusulaw from '@/assets/logos/tembusulaw.png';
import legactleadpros from '@/assets/logos/legactleadpros.png';
import supersizemedia from '@/assets/logos/supersizemedia.png';
import gratefulgestures from '@/assets/logos/gratefulgestures.png';
import evolvesmarter from '@/assets/logos/evolvesmarter.png';
import biznomad from '@/assets/logos/biznomad.png';
import bighammerwines from '@/assets/logos/bighammerwines.png';
import sadmarketing from '@/assets/logos/sadmarketing.png';
import adclients from '@/assets/logos/adclients.png';

const logos = [
  { name: 'PropertyBots.AI', src: propertybots },
  { name: 'Dr. Lead Flow', src: drleadflow },
  { name: 'Neovate', src: neovate },
  { name: 'Dr. Blade', src: drblade },
  { name: 'Holistic Vitalis', src: holisticvitalis },
  { name: 'Evalics', src: evalics },
  { name: 'MADEEA', src: madeea },
  { name: 'White Rabbit Data', src: whiterabbitdata },
  { name: 'Tembusu Law', src: tembusulaw },
  { name: 'Legact Lead Pros', src: legactleadpros },
  { name: 'Supersize Media', src: supersizemedia },
  { name: 'Grateful Gestures', src: gratefulgestures },
  { name: 'Evolve Smarter', src: evolvesmarter },
  { name: 'BizNomad', src: biznomad },
  { name: 'Big Hammer Wines', src: bighammerwines },
  { name: 'SAD Marketing', src: sadmarketing },
  { name: 'AD Clients', src: adclients },
];

const LogoMarquee = () => {
  return (
    <section className="relative bg-[#0a0a0a] border-y border-white/10 overflow-hidden py-6">
      <div className="flex">
        <motion.div
          className="flex gap-16 items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Double the logos for seamless loop */}
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex items-center justify-center px-8 group cursor-default"
            >
              <img 
                src={logo.src} 
                alt={logo.name}
                className="h-12 w-auto max-w-[140px] object-contain opacity-70 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LogoMarquee;
