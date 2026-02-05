 import ProjectPageLayout from '@/components/ProjectPageLayout';
 import GalleryGrid from '@/components/GalleryGrid';
 
 // Import voice agent images
 import voiceflowDiagram1 from '@/assets/voice-agents/voiceflow-diagram-1.png';
 import voiceflowDiagram2 from '@/assets/voice-agents/voiceflow-diagram-2.png';
 import retellApiWorkflow from '@/assets/voice-agents/retell-api-workflow.png';
 import inboundOutboundBooking from '@/assets/voice-agents/inbound-outbound-booking.png';
 import ghlIntegrationWorkflow from '@/assets/voice-agents/ghl-integration-workflow.png';
 import callTranscriptAnalysis from '@/assets/voice-agents/call-transcript-analysis.png';
 
 const VoiceAgents = () => {
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
 
       {/* Interactive Voice Agent Container */}
       <div className="mt-16">
         <h3 className="font-syne font-bold text-2xl text-white mb-6">Interactive Voice Agent</h3>
         <div 
           className="relative rounded-2xl border border-white/10 overflow-hidden min-h-[400px] flex items-center justify-center"
           style={{
             background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.1) 100%)',
           }}
         >
           {/* Placeholder for iframe/widget embed */}
           <div className="text-center p-8">
             <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#ef4444]/20 flex items-center justify-center">
               <svg className="w-10 h-10 text-[#ef4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
               </svg>
             </div>
             <p className="font-mono text-sm text-white/40 mb-2">VOICE AGENT EMBED ZONE</p>
             <p className="text-white/30 text-sm max-w-md mx-auto">
               This container is ready for an interactive voice agent widget or iframe embed.
             </p>
           </div>
 
           {/* Decorative Border */}
           <div className="absolute inset-0 pointer-events-none">
             <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-[#ef4444]/20" />
           </div>
         </div>
       </div>
     </ProjectPageLayout>
   );
 };
 
 export default VoiceAgents;