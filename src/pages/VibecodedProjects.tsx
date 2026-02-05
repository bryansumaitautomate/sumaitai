 import ProjectPageLayout from '@/components/ProjectPageLayout';
 import ImageLightbox from '@/components/ImageLightbox';
 import { useState } from 'react';
 
 // Import project images
 import saasDashboard from '@/assets/vibecoded/saas-dashboard.png';
 import analyticsPlatform from '@/assets/vibecoded/analytics-platform.png';
 import ecommerceFrontend from '@/assets/vibecoded/ecommerce-frontend.png';
 import clientPortal from '@/assets/vibecoded/client-portal.png';
 import landingPage from '@/assets/vibecoded/landing-page.png';
 import mobileApp from '@/assets/vibecoded/mobile-app.png';
 
 const VibecodedProjects = () => {
   const [lightboxOpen, setLightboxOpen] = useState(false);
   const [currentIndex, setCurrentIndex] = useState(0);
 
   const projects = [
     { title: 'SaaS Dashboard', image: saasDashboard },
     { title: 'Analytics Platform', image: analyticsPlatform },
     { title: 'E-Commerce Frontend', image: ecommerceFrontend },
     { title: 'Client Portal', image: clientPortal },
     { title: 'Landing Page Design', image: landingPage },
     { title: 'Mobile-First Web App', image: mobileApp },
   ];
 
   const lightboxImages = projects.map(p => ({ src: p.image, alt: p.title }));
 
   const openLightbox = (index: number) => {
     setCurrentIndex(index);
     setLightboxOpen(true);
   };
 
   return (
     <ProjectPageLayout
       sectionNumber="04.4 /// VIBECODED"
       title="Vibecoded Projects"
       description="Custom web applications and tools built with modern frameworks and AI-assisted development. From landing pages to full-stack SaaS platforms."
     >
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {projects.map((project, index) => (
           <div
             key={index}
             onClick={() => openLightbox(index)}
             className="group cursor-pointer"
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
               </div>
               
               {/* Title */}
               <div className="p-4">
                 <h3 className="font-syne font-bold text-lg text-white">
                   {project.title}
                 </h3>
               </div>
             </div>
           </div>
         ))}
       </div>
 
       {/* Lightbox */}
       <ImageLightbox
         images={lightboxImages}
         currentIndex={currentIndex}
         isOpen={lightboxOpen}
         onClose={() => setLightboxOpen(false)}
         onNavigate={setCurrentIndex}
       />
     </ProjectPageLayout>
   );
 };
 
 export default VibecodedProjects;