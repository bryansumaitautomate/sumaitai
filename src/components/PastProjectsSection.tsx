import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import voiceAgentsCard from '@/assets/voice-agents-card.png';
import chatAgentsCard from '@/assets/chat-agents-card.png';
import automationCard from '@/assets/automation-card.png';
import vibecodedCard from '@/assets/vibecoded-card.png';
 
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
       className="group relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.4),0_0_60px_rgba(239,68,68,0.2)] block"
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

         {/* See More Link */}
         <div className="mt-4 pt-4 border-t border-white/10">
           <span className="text-sm text-[#ef4444] font-medium group-hover:underline flex items-center gap-1">
             See more
             <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
             </svg>
           </span>
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
      description: 'End to end workflows for KC Media, Disruptors Media, and Better Body Academy.',
      tags: ['n8n', 'Make', 'Zapier'],
      imageUrl: automationCard,
      href: '/automation-projects',
    },
    {
      title: 'Chat Agents',
      description: 'Conversational AI handling client support across 5+ B2B businesses.',
      tags: ['AI', 'NLP', 'Support'],
      imageUrl: chatAgentsCard,
      href: '/chat-agents',
    },
    {
      title: 'Voice Agents',
      description: 'Live mortgage voice agent for AI Tech Solutions, shipped in 14 days.',
      tags: ['Voice AI', 'VAPI', 'Telephony'],
      imageUrl: voiceAgentsCard,
      href: '/voice-agents',
    },
    {
      title: 'Vibecoded Projects',
      description: 'Custom client portals and dashboards built with React, Next.js, and Supabase.',
      tags: ['React', 'Next.js', 'Supabase'],
      imageUrl: vibecodedCard,
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
             05 /// PORTFOLIO
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