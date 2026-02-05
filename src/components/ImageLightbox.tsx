 import { useState, useEffect } from 'react';
 import { X, ChevronLeft, ChevronRight } from 'lucide-react';
 import { motion, AnimatePresence } from 'framer-motion';
 
 interface ImageLightboxProps {
   images: { src: string; alt: string }[];
   currentIndex: number;
   isOpen: boolean;
   onClose: () => void;
   onNavigate: (index: number) => void;
 }
 
 const ImageLightbox = ({ images, currentIndex, isOpen, onClose, onNavigate }: ImageLightboxProps) => {
   useEffect(() => {
     const handleKeyDown = (e: KeyboardEvent) => {
       if (!isOpen) return;
       if (e.key === 'Escape') onClose();
       if (e.key === 'ArrowLeft') onNavigate(Math.max(0, currentIndex - 1));
       if (e.key === 'ArrowRight') onNavigate(Math.min(images.length - 1, currentIndex + 1));
     };
     
     window.addEventListener('keydown', handleKeyDown);
     return () => window.removeEventListener('keydown', handleKeyDown);
   }, [isOpen, currentIndex, images.length, onClose, onNavigate]);
 
   if (!isOpen) return null;
 
   return (
     <AnimatePresence>
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center"
         onClick={onClose}
       >
         {/* Close Button */}
         <button
           onClick={onClose}
           className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
         >
           <X className="w-6 h-6 text-white" />
         </button>
 
         {/* Navigation - Previous */}
         {currentIndex > 0 && (
           <button
             onClick={(e) => {
               e.stopPropagation();
               onNavigate(currentIndex - 1);
             }}
             className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
           >
             <ChevronLeft className="w-8 h-8 text-white" />
           </button>
         )}
 
         {/* Navigation - Next */}
         {currentIndex < images.length - 1 && (
           <button
             onClick={(e) => {
               e.stopPropagation();
               onNavigate(currentIndex + 1);
             }}
             className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
           >
             <ChevronRight className="w-8 h-8 text-white" />
           </button>
         )}
 
         {/* Image */}
         <motion.img
           key={currentIndex}
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 0.9 }}
           transition={{ duration: 0.2 }}
           src={images[currentIndex]?.src}
           alt={images[currentIndex]?.alt}
           className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
           onClick={(e) => e.stopPropagation()}
         />
 
         {/* Image Counter */}
         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
           <span className="font-mono text-sm text-white/70">
             {currentIndex + 1} / {images.length}
           </span>
         </div>
       </motion.div>
     </AnimatePresence>
   );
 };
 
 export default ImageLightbox;