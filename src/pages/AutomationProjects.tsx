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
     { src: complexWorkflow, alt: 'Complex Workflow', title: 'AI Agent Pipeline' },
     { src: webhookLlmParser, alt: 'Webhook LLM Parser', title: 'Webhook LLM Parser' },
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