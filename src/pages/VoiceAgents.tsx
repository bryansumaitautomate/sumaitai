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
            className="relative rounded-2xl border border-white/10 overflow-hidden"
           style={{
             background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.1) 100%)',
           }}
         >
            <iframe
              src="https://vapi.ai?demo=true&shareKey=718ecb5d-ed8e-4877-aa50-cf4c5fc76c24&assistantId=dd631629-e343-4784-838b-dea366aae2db"
              className="w-full h-[600px] md:h-[700px]"
              allow="microphone"
              title="Interactive Voice Agent Demo"
            />
         </div>
       </div>
     </ProjectPageLayout>
   );
 };
 
 export default VoiceAgents;