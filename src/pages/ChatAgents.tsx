 import { useEffect, useCallback } from 'react';
 import ProjectPageLayout from '@/components/ProjectPageLayout';
 import GalleryGrid from '@/components/GalleryGrid';
 import { Button } from '@/components/ui/button';
 
 // Import chat agent images
 import holisticVitalisFlow from '@/assets/chat-agents/holistic-vitalis-flow.png';
 import multiStepWorkflow from '@/assets/chat-agents/multi-step-workflow.png';
 import socialCommentBuilder from '@/assets/chat-agents/social-comment-builder.png';
 import receiveProcessDms from '@/assets/chat-agents/receive-process-dms.png';
 import waitReplyFlow from '@/assets/chat-agents/wait-reply-flow.png';
 import smsAiAutomation from '@/assets/chat-agents/sms-ai-automation.png';
 
 // Extend Window interface for Voiceflow
 declare global {
   interface Window {
     voiceflow?: {
       chat: {
         load: (config: unknown) => void;
         open: () => void;
       };
     };
   }
 }
 
 const ChatAgents = () => {
   const loadVoiceflowWidget = useCallback(() => {
     // If already loaded, just open the chat
     if (window.voiceflow?.chat) {
       window.voiceflow.chat.open();
       return;
     }
 
     // Dynamically load the Voiceflow script
     const script = document.createElement('script');
     script.type = 'text/javascript';
     script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
     script.onload = () => {
       window.voiceflow?.chat.load({
         verify: { projectID: '698425d5d5905339791a422a' },
         url: 'https://general-runtime.voiceflow.com',
         versionID: 'production',
         voice: {
           url: 'https://runtime-api.voiceflow.com'
         }
       });
       // Open the chat after a short delay to ensure it's loaded
       setTimeout(() => {
         window.voiceflow?.chat.open();
       }, 500);
     };
     document.head.appendChild(script);
   }, []);
 
   const images = [
     { src: holisticVitalisFlow, alt: 'Holistic Vitalis Flow', title: 'Holistic Vitalis Customer Support' },
     { src: multiStepWorkflow, alt: 'Multi-Step Workflow', title: 'Multi-Step Conversation Flow' },
     { src: socialCommentBuilder, alt: 'Social Comment Builder', title: 'Social Comment Automation' },
     { src: receiveProcessDms, alt: 'Receive & Process DMs', title: 'DM Processing System' },
     { src: waitReplyFlow, alt: 'Wait & Reply Flow', title: 'Wait & Reply Automation' },
     { src: smsAiAutomation, alt: 'SMS AI Automation', title: 'SMS AI Webpage Automation' },
   ];
 
   return (
     <ProjectPageLayout
       sectionNumber="04.2 /// CHAT AGENTS"
       title="Chat Agents"
       description="Intelligent conversational AI agents that handle customer inquiries and automate support. From simple FAQ bots to complex multi-turn conversation systems."
     >
       {/* Project Description Card */}
       <div 
         className="mb-12 p-8 rounded-2xl border border-white/10"
         style={{
           background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.1) 100%)',
         }}
       >
         <h3 className="font-syne font-bold text-xl text-white mb-4">About These Projects</h3>
         <p className="text-white/60 leading-relaxed">
           These chat agents are built using cutting-edge NLP technology and custom training data. 
           Each solution is tailored to the client's specific use case, whether it's handling customer 
           support tickets, qualifying leads, or providing 24/7 automated assistance. The gallery below 
           showcases both the user-facing interfaces and the underlying logic architectures.
         </p>
       </div>
 
       <GalleryGrid images={images} aspectRatio="video" />
       
       {/* Demo Button */}
       <div className="mt-16 text-center">
         <button 
           className="inline-block"
           onClick={loadVoiceflowWidget}
         >
           <Button 
             className="relative px-8 py-6 text-lg font-syne font-bold text-white bg-[#0a0a0a]/80 border-0 rounded-full overflow-hidden group hover:shadow-[0_0_40px_8px_rgba(239,68,68,0.35)] transition-shadow duration-300"
             style={{
               background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(10, 10, 10, 0.9) 50%)',
             }}
           >
             <span className="relative z-10">Click here to Demo</span>
             <div 
               className="absolute inset-[-2px] rounded-full animate-spin opacity-70"
               style={{
                 background: 'conic-gradient(from 0deg, transparent, transparent 270deg, #ef4444 360deg)',
                 animationDuration: '4s',
               }}
             />
             <div className="absolute inset-[2px] rounded-full bg-[#0a0a0a]" />
             <span className="absolute inset-0 flex items-center justify-center font-syne font-bold text-white">
               Click here to Demo
             </span>
           </Button>
         </button>
       </div>
     </ProjectPageLayout>
   );
 };
 
 export default ChatAgents;