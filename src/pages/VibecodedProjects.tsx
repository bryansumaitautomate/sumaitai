 import ProjectPageLayout from '@/components/ProjectPageLayout';
 import GalleryGrid from '@/components/GalleryGrid';
 
 const VibecodedProjects = () => {
   const images = [
     { src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80', alt: 'Vibecoded 1', title: 'SaaS Dashboard' },
     { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', alt: 'Vibecoded 2', title: 'Analytics Platform' },
     { src: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80', alt: 'Vibecoded 3', title: 'E-Commerce Frontend' },
     { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', alt: 'Vibecoded 4', title: 'Client Portal' },
     { src: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80', alt: 'Vibecoded 5', title: 'Landing Page Design' },
     { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80', alt: 'Vibecoded 6', title: 'Mobile-First Web App' },
   ];
 
   return (
     <ProjectPageLayout
       sectionNumber="04.4 /// VIBECODED"
       title="Vibecoded Projects"
       description="Custom web applications and tools built with modern frameworks and AI-assisted development. From landing pages to full-stack SaaS platforms."
     >
       <GalleryGrid images={images} aspectRatio="wide" />
     </ProjectPageLayout>
   );
 };
 
 export default VibecodedProjects;