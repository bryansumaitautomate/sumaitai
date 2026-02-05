 import ProjectPageLayout from '@/components/ProjectPageLayout';
 import GalleryGrid from '@/components/GalleryGrid';
 import leadGenSystem3 from '@/assets/automation/lead-gen-system-3.png';
 import deepMultilineIcebreaker from '@/assets/automation/deep-multiline-icebreaker.png';
 import viralContentSystem from '@/assets/automation/viral-content-system.png';
 import facelessVideoGenerator from '@/assets/automation/faceless-video-generator.png';
 import complexWorkflow from '@/assets/automation/complex-workflow.png';
 import webhookLlmParser from '@/assets/automation/webhook-llm-parser.png';
 
 const AutomationProjects = () => {
   const images = [
     { src: leadGenSystem3, alt: 'Lead Gen System 3', title: 'Automated Outreach System' },
     { src: deepMultilineIcebreaker, alt: 'Deep Multiline Icebreaker', title: 'Deep Multiline Icebreaker' },
     { src: viralContentSystem, alt: 'Viral Content System', title: 'Viral Content System' },
     { src: facelessVideoGenerator, alt: 'Faceless Video Generator', title: 'Faceless Video Generator' },
     { src: complexWorkflow, alt: 'Chat Agent Backed System', title: 'Chat Agent Backed System' },
     { src: webhookLlmParser, alt: 'Database Reactivation System', title: 'Database Reactivation System' },
   ];
 
   return (
     <ProjectPageLayout
       sectionNumber="04.1 /// AUTOMATION"
       title="Automation Projects"
       description="End-to-end workflow automation systems that eliminate manual tasks and streamline operations. Built with n8n, Make, and Zapier."
     >
       <GalleryGrid images={images} aspectRatio="video" />
       
       {/* More automations text */}
       <div className="mt-16 text-center">
         <p className="font-mono text-lg md:text-xl text-white/50">
           4,000+ more automations..
         </p>
       </div>
     </ProjectPageLayout>
   );
 };
 
 export default AutomationProjects;