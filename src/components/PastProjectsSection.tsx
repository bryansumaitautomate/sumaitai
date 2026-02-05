 import { Icon } from '@iconify/react';
 import { useScrollReveal } from '@/hooks/useScrollReveal';
 
 interface ProjectCardProps {
   title: string;
   description: string;
   tags: string[];
   imageUrl: string;
 }
 
 const ProjectCard = ({ title, description, tags, imageUrl }: ProjectCardProps) => {
   return (
     <div 
       className="group relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)]"
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
     </div>
   );
 };
 
 const PastProjectsSection = () => {
   const { ref, isVisible } = useScrollReveal(0.1);
 
   const projects = [
     {
       title: 'AI Lead Qualification Bot',
       description: 'Automated lead scoring and qualification system that increased conversion rates by 45%.',
       tags: ['AI', 'Automation', 'Sales'],
       imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
     },
     {
       title: 'Real Estate CRM Pipeline',
       description: 'End-to-end property management and client communication automation.',
       tags: ['CRM', 'Real Estate', 'Workflow'],
       imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
     },
     {
       title: 'E-commerce Order System',
       description: 'Streamlined order processing with automated fulfillment and customer updates.',
       tags: ['E-commerce', 'Integration', 'Ops'],
       imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
     },
     {
       title: 'Legal Document Automation',
       description: 'Contract generation and approval workflows reducing processing time by 70%.',
       tags: ['Legal', 'Documents', 'AI'],
       imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
     },
     {
       title: 'Healthcare Scheduling System',
       description: 'Patient booking and reminder system with smart appointment optimization.',
       tags: ['Healthcare', 'Booking', 'SMS'],
       imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80',
     },
     {
       title: 'Marketing Campaign Engine',
       description: 'Multi-channel campaign automation with performance tracking and optimization.',
       tags: ['Marketing', 'Analytics', 'Email'],
       imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
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
           className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${
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