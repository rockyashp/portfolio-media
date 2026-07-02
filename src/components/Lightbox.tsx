import { useEffect } from 'react';
import { PhotoItem } from '../types';
import { portfolioPhotos } from '../data';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface LightboxProps {
  photo: PhotoItem | null;
  onClose: () => void;
  onSelectPhoto: (photo: PhotoItem) => void;
}

export default function Lightbox({ photo, onClose, onSelectPhoto }: LightboxProps) {
  // Lock scroll when lightbox is active
  useEffect(() => {
    if (photo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [photo]);

  const handlePrev = () => {
    if (!photo) return;
    const currentIndex = portfolioPhotos.findIndex(p => p.id === photo.id);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + portfolioPhotos.length) % portfolioPhotos.length;
    onSelectPhoto(portfolioPhotos[prevIndex]);
  };

  const handleNext = () => {
    if (!photo) return;
    const currentIndex = portfolioPhotos.findIndex(p => p.id === photo.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % portfolioPhotos.length;
    onSelectPhoto(portfolioPhotos[nextIndex]);
  };

  // Keyboard navigation listener (Escape to close, Arrows to navigate)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, onClose, onSelectPhoto]);

  if (!photo) return null;

  const hasMetadata = !!(photo.title || photo.description || photo.category);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/98 backdrop-blur-md overflow-y-auto">
      {/* Absolute Close button at top corner */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2 rounded-full bg-neutral-900 border border-neutral-850 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all duration-200 cursor-pointer"
        title="Close"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Previous Button (Left) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-4 sm:left-6 md:left-8 z-50 p-2.5 rounded-full bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-850/60 hover:border-neutral-700 text-neutral-400 hover:text-white transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-sm"
        title="Previous Image"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Next Button (Right) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-4 sm:right-6 md:right-8 z-50 p-2.5 rounded-full bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-850/60 hover:border-neutral-700 text-neutral-400 hover:text-white transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-sm"
        title="Next Image"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Main Content Modal Container */}
      <motion.div 
        key={photo.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className={`w-full bg-[#08080a] border border-neutral-900 rounded-xl overflow-hidden p-4 md:p-8 relative max-w-6xl ${
          hasMetadata ? 'grid grid-cols-1 lg:grid-cols-12 gap-8' : 'flex items-center justify-center'
        }`}
      >
        
        {/* Left: The Photograph Section */}
        <div className={`flex flex-col justify-center bg-neutral-950 rounded-lg overflow-hidden border border-neutral-900/40 relative group w-full ${
          hasMetadata ? 'lg:col-span-7' : ''
        }`}>
          <img 
            src={photo.imageUrl} 
            alt="Viewfinder plate"
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[80vh] object-contain mx-auto"
          />
          
          {/* Subtle Viewfinder Crosshair overlay inside image frame */}
          <div className="absolute inset-4 pointer-events-none border border-white/5 opacity-40">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-white/20 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white/20 rounded-full" />
          </div>
        </div>

        {/* Right: Minimalist Photograph Detail Information */}
        {hasMetadata && (
          <div className="lg:col-span-5 flex flex-col justify-between font-sans text-neutral-400 space-y-6">
            
            <div className="space-y-6">
              {/* Header / Category */}
              <div>
                <span className="font-mono text-[10px] text-leica-red font-bold uppercase tracking-widest block mb-1">
                  // {photo.category} ARCHIVE
                </span>
                <h3 className="font-display text-2xl font-black text-white uppercase tracking-tight">
                  {photo.title}
                </h3>
              </div>

              {/* Elegant Description */}
              <div className="space-y-2 border-t border-neutral-900 pt-4">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">
                  Description / Context
                </span>
                <p className="text-sm text-neutral-300 leading-relaxed font-light">
                  {photo.description}
                </p>
              </div>
            </div>

            {/* Minimal Bottom Info Banner */}
            <div className="flex justify-between items-center bg-neutral-900/20 p-3.5 rounded-lg border border-neutral-900/60 text-[10px] font-mono">
              <span className="text-neutral-500">
                YASH FINE-ART ARCHIVE
              </span>
              <span className="text-leica-red font-bold uppercase tracking-widest">
                PRINTS ON DEMAND
              </span>
            </div>

          </div>
        )}
      </motion.div>
    </div>
  );
}
