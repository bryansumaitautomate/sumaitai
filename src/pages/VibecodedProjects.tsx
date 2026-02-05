 import ProjectPageLayout from '@/components/ProjectPageLayout';
 import { Button } from '@/components/ui/button';
 import { ExternalLink } from 'lucide-react';
 
 const VibecodedProjects = () => {
   const projects = [
     { title: 'SaaS Dashboard', url: '#' },
     { title: 'Analytics Platform', url: '#' },
     { title: 'E-Commerce Frontend', url: '#' },
     { title: 'Client Portal', url: '#' },
     { title: 'Landing Page Design', url: '#' },
     { title: 'Mobile-First Web App', url: '#' },
   ];
 
   return (
     <ProjectPageLayout
       sectionNumber="04.4 /// VIBECODED"
       title="Vibecoded Projects"
       description="Custom web applications and tools built with modern frameworks and AI-assisted development. From landing pages to full-stack SaaS platforms."
     >
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {projects.map((project, index) => (
           <a
             key={index}
             href={project.url}
             target="_blank"
             rel="noopener noreferrer"
             className="group"
           >
             <Button
               className="relative w-full px-6 py-8 text-lg font-syne font-bold text-white bg-[#0a0a0a]/80 border-0 rounded-2xl overflow-hidden hover:shadow-[0_0_40px_8px_rgba(239,68,68,0.35)] transition-all duration-300"
               style={{
                 background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(10, 10, 10, 0.9) 50%)',
               }}
             >
               <span className="relative z-10 flex items-center gap-3">
                 {project.title}
                 <ExternalLink className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
               </span>
               <div
                 className="absolute inset-[-2px] rounded-2xl animate-spin opacity-0 group-hover:opacity-70 transition-opacity"
                 style={{
                   background: 'conic-gradient(from 0deg, transparent, transparent 270deg, #ef4444 360deg)',
                   animationDuration: '4s',
                 }}
               />
               <div className="absolute inset-[2px] rounded-2xl bg-[#0a0a0a]" />
               <span className="absolute inset-0 flex items-center justify-center font-syne font-bold text-white gap-3">
                 {project.title}
                 <ExternalLink className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
               </span>
             </Button>
           </a>
         ))}
       </div>
     </ProjectPageLayout>
   );
 };
 
 export default VibecodedProjects;