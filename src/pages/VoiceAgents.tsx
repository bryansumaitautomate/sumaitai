 import ProjectPageLayout from '@/components/ProjectPageLayout';
 import GalleryGrid from '@/components/GalleryGrid';
 
 const VoiceAgents = () => {
   const images = [
     { src: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&q=80', alt: 'Voice Agent 1', title: 'Voice Call Flow' },
     { src: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&q=80', alt: 'Voice Agent 2', title: 'Telephony Integration' },
     { src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80', alt: 'Voice Agent 3', title: 'Booking Assistant' },
     { src: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80', alt: 'Voice Agent 4', title: 'Voice Analytics Dashboard' },
     { src: 'https://images.unsplash.com/photo-1573165067541-4cd6d9837902?w=800&q=80', alt: 'Voice Agent 5', title: 'Multi-Accent Support' },
     { src: 'https://images.unsplash.com/photo-1573164574472-797cdf4a583a?w=800&q=80', alt: 'Voice Agent 6', title: 'Real-Time Transcription' },
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