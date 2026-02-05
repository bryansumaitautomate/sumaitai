 import ProjectPageLayout from '@/components/ProjectPageLayout';
 import GalleryGrid from '@/components/GalleryGrid';
 
 const AutomationProjects = () => {
   const images = [
     { src: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80', alt: 'Workflow Automation 1', title: 'n8n Lead Pipeline' },
     { src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80', alt: 'Workflow Automation 2', title: 'Make.com Integration' },
     { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', alt: 'Workflow Automation 3', title: 'Zapier Multi-Step Zap' },
     { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', alt: 'Workflow Automation 4', title: 'Data Sync Workflow' },
     { src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80', alt: 'Workflow Automation 5', title: 'CRM Automation' },
     { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80', alt: 'Workflow Automation 6', title: 'Email Sequence Builder' },
   ];
 
   return (
     <ProjectPageLayout
       sectionNumber="04.1 /// AUTOMATION"
       title="Automation Projects"
       description="End-to-end workflow automation systems that eliminate manual tasks and streamline operations. Built with n8n, Make, and Zapier."
     >
       <GalleryGrid images={images} aspectRatio="video" />
     </ProjectPageLayout>
   );
 };
 
 export default AutomationProjects;