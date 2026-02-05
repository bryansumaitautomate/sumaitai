 import { Link } from 'react-router-dom';
 import { useScrollReveal } from '@/hooks/useScrollReveal';
 
 interface ProjectCardProps {
   title: string;
   description: string;
   tags: string[];
   imageUrl: string;
   href: string;
 }
 
 const ProjectCard = ({ title, description, tags, imageUrl, href }: ProjectCardProps) => {
   return (
     <Link 
       to={href}
       className="group relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)] block"
       style={{
         background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)',
       }}
     >
       {/* Project Screenshot */}
       <div className="relative aspect-video overflow-hidden">
         <img 
           src={imageUrl} 
           alt={title}
           className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
       </div>
 
       {/* Content */}
       <div className="p-6">
         <h4 className="font-syne font-bold text-xl text-white mb-2 group-hover:text-[#ef4444] transition-colors">
           {title}
         </h4>
         <p className="text-sm text-white/50 mb-4 line-clamp-2">
           {description}
         </p>
 
         {/* Tags */}
         <div className="flex flex-wrap gap-2">
           {tags.map((tag, index) => (
             <span 
               key={index}
               className="px-3 py-1 text-xs font-mono tracking-wider text-white/60 bg-white/5 border border-white/10 rounded-full"
             >
               {tag}
             </span>
           ))}
         </div>
       </div>
 
       {/* Hover Glow Effect */}
       <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
         <div className="absolute inset-[-1px] rounded-2xl">
           <div 
             className="absolute inset-0 rounded-2xl animate-spin"
             style={{
               background: 'conic-gradient(from 0deg, transparent, transparent 270deg, #ef4444 360deg)',
               animationDuration: '8s',
             }}
           />
           <div className="absolute inset-[1px] rounded-2xl bg-[#0a0a0a]" />
         </div>
       </div>
     </Link>
   );
 };
 
 const PastProjectsSection = () => {
   const { ref, isVisible } = useScrollReveal(0.1);
 
   const projects = [
     {
     title: 'Automation Projects',
     description: 'End-to-end workflow automation systems that eliminate manual tasks and streamline operations.',
     tags: ['n8n', 'Make', 'Zapier'],
     imageUrl: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80',
     href: '/automation-projects',
     },
     {
     title: 'Chat Agents',
     description: 'Intelligent conversational AI agents that handle customer inquiries and automate support.',
     tags: ['AI', 'NLP', 'Support'],
     imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80',
     href: '/chat-agents',
     },
     {
     title: 'Voice Agents',
     description: 'AI-powered voice assistants for phone automation, bookings, and customer interactions.',
     tags: ['Voice AI', 'Telephony', 'NLP'],
     imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&q=80',
     href: '/voice-agents',
     },
     {
     title: 'Vibecoded Projects',
     description: 'Custom web applications and tools built with modern frameworks and AI-assisted development.',
     tags: ['React', 'Lovable', 'Full-Stack'],
     imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
     href: '/vibecoded-projects',
     },
   ];
 
   return (
     <section id="projects" className="relative bg-[#0a0a0a] py-24 md:py-32">
       <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
         {/* Section Header */}
         <div 
           ref={ref}
           className={`mb-16 transition-all duration-700 ${
             isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
           }`}
         >
           <p className="font-mono text-xs tracking-[0.3em] text-[#ef4444] mb-4">
             04 /// PORTFOLIO
           </p>
           <h2 className="font-syne font-bold text-4xl md:text-5xl text-white mb-4">
             Past Projects
           </h2>
           <p className="text-lg text-white/50 max-w-2xl">
             A selection of automation systems I've built for clients across various industries.
           </p>
         </div>
 
         {/* Projects Grid */}
         <div 
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto transition-all duration-700 delay-200 ${
             isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
           }`}
         >
           {projects.map((project, index) => (
             <ProjectCard key={index} {...project} />
           ))}
         </div>
       </div>
 
       {/* Background Grid Lines */}
       <div className="absolute inset-0 grid grid-cols-4 pointer-events-none">
         <div className="border-r border-white/5"></div>
         <div className="border-r border-white/5"></div>
         <div className="border-r border-white/5"></div>
         <div></div>
       </div>
     </section>
   );
 };
 
 export default PastProjectsSection;