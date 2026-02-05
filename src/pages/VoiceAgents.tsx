 import { useCallback } from 'react';
 import ProjectPageLayout from '@/components/ProjectPageLayout';
 import { Button } from '@/components/ui/button';
 import GalleryGrid from '@/components/GalleryGrid';
 
 // Import voice agent images
 import voiceflowDiagram1 from '@/assets/voice-agents/voiceflow-diagram-1.png';
 import voiceflowDiagram2 from '@/assets/voice-agents/voiceflow-diagram-2.png';
 import retellApiWorkflow from '@/assets/voice-agents/retell-api-workflow.png';
 import inboundOutboundBooking from '@/assets/voice-agents/inbound-outbound-booking.png';
 import ghlIntegrationWorkflow from '@/assets/voice-agents/ghl-integration-workflow.png';
 import callTranscriptAnalysis from '@/assets/voice-agents/call-transcript-analysis.png';
 
 // Extend Window interface for Vapi
 declare global {
   interface Window {
     vapiSDK?: {
       run: (config: { apiKey: string; assistant: string; config?: unknown }) => void;
     };
   }
 }
 
 const VoiceAgents = () => {
   const loadVapiWidget = useCallback(() => {
     // If SDK already loaded, just run it
     if (window.vapiSDK) {
       window.vapiSDK.run({
         apiKey: '718ecb5d-ed8e-4877-aa50-cf4c5fc76c24',
         assistant: 'dd631629-e343-4784-838b-dea366aae2db',
       });
       return;
     }
 
     // Dynamically load the Vapi SDK script
     const script = document.createElement('script');
     script.src = 'https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js';
     script.defer = true;
     script.onload = () => {
       window.vapiSDK?.run({
         apiKey: '718ecb5d-ed8e-4877-aa50-cf4c5fc76c24',
         assistant: 'dd631629-e343-4784-838b-dea366aae2db',
       });
     };
     document.head.appendChild(script);
   }, []);
 
   const images = [
     { src: voiceflowDiagram1, alt: 'Voiceflow Diagram 1', title: 'Comprehensive Voice Flow Design' },
     { src: voiceflowDiagram2, alt: 'Voiceflow Diagram 2', title: 'Advanced Conversation Logic' },
     { src: retellApiWorkflow, alt: 'Retell API Workflow', title: 'Retell API Integration' },
     { src: inboundOutboundBooking, alt: 'Inbound Outbound Booking', title: 'Inbound/Outbound Booking System' },
     { src: ghlIntegrationWorkflow, alt: 'GHL Integration Workflow', title: 'GHL Contact Integration' },
     { src: callTranscriptAnalysis, alt: 'Call Transcript Analysis', title: 'Call Recording & Transcript Analysis' },
   ];
 
   return (
     <ProjectPageLayout
       sectionNumber="04.3 /// VOICE AGENTS"
       title="Voice Agents"
       description="AI-powered voice assistants for phone automation, bookings, and customer interactions. Natural conversations that handle real business calls."
     >
       <GalleryGrid images={images} aspectRatio="video" />
 
       {/* Demo Button */}
       <div className="mt-16 text-center">
         <h3 className="font-syne font-bold text-2xl md:text-3xl text-white mb-4">
           Try Bryan - AI Sales Trainer <span className="text-red-500">[DEMO]</span>
         </h3>
         <p className="text-white/60 max-w-2xl mx-auto mb-4 leading-relaxed">
           Experience a realistic sales role-play with an AI buyer who won't make it easy. Bryan challenges your pitch with tough objections, tests your discovery skills, then scores your performance (1-10) and gives you targeted feedback to improve.
         </p>
         <p className="text-white/40 text-sm mb-8">
           To try the demo – Click the button and click the phone icon and talk.
         </p>
         <button 
           className="inline-block"
           onClick={loadVapiWidget}
         >
           <Button 
             className="relative px-8 py-6 text-lg font-syne font-bold text-white bg-[#0a0a0a]/80 border-0 rounded-full overflow-hidden group hover:shadow-[0_0_40px_8px_rgba(239,68,68,0.35)] transition-shadow duration-300"
             style={{
               background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(10, 10, 10, 0.9) 50%)',
             }}
           >
             <span className="relative z-10">Test Voice Demo</span>
             <div 
               className="absolute inset-[-2px] rounded-full animate-spin opacity-70"
               style={{
                 background: 'conic-gradient(from 0deg, transparent, transparent 270deg, #ef4444 360deg)',
                 animationDuration: '4s',
               }}
             />
             <div className="absolute inset-[2px] rounded-full bg-[#0a0a0a]" />
             <span className="absolute inset-0 flex items-center justify-center font-syne font-bold text-white">
               Test Voice Demo
             </span>
           </Button>
         </button>
       </div>
     </ProjectPageLayout>
   );
 };
 
 export default VoiceAgents;