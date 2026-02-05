 import ProjectPageLayout from '@/components/ProjectPageLayout';
 import GalleryGrid from '@/components/GalleryGrid';
 
 const ChatAgents = () => {
   const images = [
     { src: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80', alt: 'Chat Agent 1', title: 'Customer Support Bot' },
     { src: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=800&q=80', alt: 'Chat Agent 2', title: 'Lead Qualification Agent' },
     { src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80', alt: 'Chat Agent 3', title: 'NLP Flow Diagram' },
     { src: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80', alt: 'Chat Agent 4', title: 'Multi-Language Bot' },
     { src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80', alt: 'Chat Agent 5', title: 'Chatbot Logic Flow' },
     { src: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&q=80', alt: 'Chat Agent 6', title: 'AI Response System' },
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
     </ProjectPageLayout>
   );
 };
 
 export default ChatAgents;