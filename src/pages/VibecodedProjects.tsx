 import ProjectPageLayout from '@/components/ProjectPageLayout';
 import { ExternalLink } from 'lucide-react';
 
 // Import project images
 import saasDashboard from '@/assets/vibecoded/saas-dashboard.png';
 import analyticsPlatform from '@/assets/vibecoded/analytics-platform.png';
 import ecommerceFrontend from '@/assets/vibecoded/ecommerce-frontend.png';
 import clientPortal from '@/assets/vibecoded/client-portal.png';
 import landingPage from '@/assets/vibecoded/landing-page.png';
 import mobileApp from '@/assets/vibecoded/mobile-app.png';
 
 const VibecodedProjects = () => {
   const projects = [
     { title: 'SaaS Dashboard', url: '#', image: saasDashboard },
     { title: 'Analytics Platform', url: '#', image: analyticsPlatform },
     { title: 'E-Commerce Frontend', url: '#', image: ecommerceFrontend },
     { title: 'Client Portal', url: '#', image: clientPortal },
     { title: 'Landing Page Design', url: '#', image: landingPage },
     { title: 'Mobile-First Web App', url: '#', image: mobileApp },
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
             <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] transition-all duration-300 group-hover:border-white/20 group-hover:shadow-[0_0_40px_8px_rgba(239,68,68,0.15)]">
               {/* Image Container */}
               <div className="relative aspect-[16/10] overflow-hidden">
                 <img
                   src={project.image}
                   alt={project.title}
                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                 />
                 {/* Subtle overlay gradient */}
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                 
                 {/* External link icon in corner */}
                 <div className="absolute top-3 right-3 p-2 rounded-lg bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                   <ExternalLink className="w-4 h-4 text-white" />
                 </div>
               </div>
               
               {/* Title */}
               <div className="p-4">
                 <h3 className="font-syne font-bold text-lg text-white flex items-center gap-2">
                   {project.title}
                   <ExternalLink className="w-4 h-4 text-[#ef4444] opacity-70 group-hover:opacity-100 transition-opacity" />
                 </h3>
               </div>
             </div>
           </a>
         ))}
       </div>
     </ProjectPageLayout>
   );
 };
 
 export default VibecodedProjects;