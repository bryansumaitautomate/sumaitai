 import { ArrowLeft } from 'lucide-react';
 import { Link } from 'react-router-dom';
 import FloatingNav from './FloatingNav';
 
 interface ProjectPageLayoutProps {
   title: string;
   description: string;
   sectionNumber: string;
   children: React.ReactNode;
 }
 
 const ProjectPageLayout = ({ title, description, sectionNumber, children }: ProjectPageLayoutProps) => {
   return (
     <div className="min-h-screen bg-[#0a0a0a] text-white">
       <FloatingNav />
       
       {/* Hero Header */}
       <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
         <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
           {/* Back Button */}
           <Link 
             to="/" 
             className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group"
           >
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
             <span className="font-mono text-sm">Back to Home</span>
           </Link>
 
           {/* Section Label */}
           <p className="font-mono text-xs tracking-[0.3em] text-[#ef4444] mb-4">
             {sectionNumber}
           </p>
 
           {/* Title */}
           <h1 className="font-syne font-bold text-4xl md:text-6xl text-white mb-6">
             {title}
           </h1>
 
           {/* Description */}
           <p className="text-lg md:text-xl text-white/50 max-w-3xl">
             {description}
           </p>
         </div>
 
         {/* Background Grid */}
         <div className="absolute inset-0 grid grid-cols-4 pointer-events-none">
           <div className="border-r border-white/5"></div>
           <div className="border-r border-white/5"></div>
           <div className="border-r border-white/5"></div>
           <div></div>
         </div>
       </section>
 
       {/* Content */}
       <section className="relative pb-24 md:pb-32">
         <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
           {children}
         </div>
 
         {/* Background Grid */}
         <div className="absolute inset-0 grid grid-cols-4 pointer-events-none">
           <div className="border-r border-white/5"></div>
           <div className="border-r border-white/5"></div>
           <div className="border-r border-white/5"></div>
           <div></div>
         </div>
       </section>
     </div>
   );
 };
 
 export default ProjectPageLayout;