 import { useState } from 'react';
 import ImageLightbox from './ImageLightbox';
 
 interface GalleryImage {
   src: string;
   alt: string;
   title?: string;
 }
 
 interface GalleryGridProps {
   images: GalleryImage[];
   aspectRatio?: 'video' | 'square' | 'wide';
 }
 
 const GalleryGrid = ({ images, aspectRatio = 'video' }: GalleryGridProps) => {
   const [lightboxOpen, setLightboxOpen] = useState(false);
   const [currentIndex, setCurrentIndex] = useState(0);
 
   const aspectClasses = {
     video: 'aspect-video',
     square: 'aspect-square',
     wide: 'aspect-[16/9]',
   };
 
   const openLightbox = (index: number) => {
     setCurrentIndex(index);
     setLightboxOpen(true);
   };
 
   return (
     <>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {images.map((image, index) => (
           <div
             key={index}
             onClick={() => openLightbox(index)}
             className="group relative rounded-2xl overflow-hidden border border-white/10 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)]"
             style={{
               background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.1) 100%)',
             }}
           >
             <div className={`relative ${aspectClasses[aspectRatio]} overflow-hidden`}>
               <img
                 src={image.src}
                 alt={image.alt}
                 className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
               
               {/* Hover Overlay */}
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                   <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                   </svg>
                 </div>
               </div>
             </div>
 
             {image.title && (
               <div className="p-4">
                 <p className="font-syne font-medium text-white/90 text-sm">{image.title}</p>
               </div>
             )}
 
             {/* Shimmer Border Effect */}
             <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
               <div className="absolute inset-[-1px] rounded-2xl">
                 <div 
                   className="absolute inset-0 rounded-2xl animate-spin"
                   style={{
                     background: 'conic-gradient(from 0deg, transparent, transparent 270deg, #ef4444 360deg)',
                     animationDuration: '8s',
                   }}
                 />
                 <div className="absolute inset-[1px] rounded-2xl bg-[#0a0a0a]" />
               </div>
             </div>
           </div>
         ))}
       </div>
 
       <ImageLightbox
         images={images}
         currentIndex={currentIndex}
         isOpen={lightboxOpen}
         onClose={() => setLightboxOpen(false)}
         onNavigate={setCurrentIndex}
       />
     </>
   );
 };
 
 export default GalleryGrid;