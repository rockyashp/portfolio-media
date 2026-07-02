import { useRef } from 'react';
import { PhotoItem } from '../types';
import { portfolioPhotos } from '../data';
import { Camera, ArrowDown } from 'lucide-react';

interface LoopingGalleryProps {
  onViewWorkClick: () => void;
}

export default function LoopingGallery({ onViewWorkClick }: LoopingGalleryProps) {
  // Use all portfolio photos for the infinite rolling visual hero stream
  const column1 = portfolioPhotos.filter((_, idx) => idx % 3 === 0);
  const column2 = portfolioPhotos.filter((_, idx) => idx % 3 === 1);
  const column3 = portfolioPhotos.filter((_, idx) => idx % 3 === 2);

  return (
    <div className="space-y-6">
      {/* ========================================== */}
      {/* AMBIENT HERO LOOP WITH VIEW WORK BUTTON    */}
      {/* ========================================== */}
      <div className="relative h-[480px] sm:h-[550px] w-full bg-[#050507] rounded-xl border border-neutral-900 overflow-hidden shadow-2xl flex gap-4 px-4 py-8">
        
        {/* Subtle vignette layer overlays */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#050507] to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050507] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,5,7,0.55)_100%)] z-10 pointer-events-none" />

        {/* Ambient Darkened Scrim Overlay to push the visual loop into the background */}
        <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[1px] z-10 pointer-events-none" />

        {/* ========================================== */}
        {/* CENTERED HOVERING VIEW WORK CALL TO ACTION */}
        {/* ========================================== */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="text-center space-y-4 px-4">
            <span className="font-mono text-[10px] text-leica-red font-bold uppercase tracking-[0.2em] block">
              // ANALOG VISUAL STREAM
            </span>
            
            <button 
              onClick={onViewWorkClick}
              className="group relative inline-flex items-center gap-3 bg-neutral-900/90 hover:bg-white text-white hover:text-black border border-neutral-800 hover:border-white px-8 py-4 rounded-full font-mono text-[11px] uppercase tracking-[0.15em] font-bold shadow-2xl transition-all duration-300 backdrop-blur-md hover:scale-105"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-leica-red group-hover:scale-110 transition-transform" />
              View Work
              <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1" />
            </button>
          </div>
        </div>

        {/* 3 Parallel vertical columns of rolling pictures */}
        {[column1, column2, column3].map((colPhotos, colIdx) => {
          if (colPhotos.length === 0) return null;

          // Duplicate items to ensure a seamless scroll cycle
          const tripledList = [...colPhotos, ...colPhotos, ...colPhotos];
          const isEvenCol = colIdx % 2 === 0;
          const directionClass = isEvenCol ? 'animate-scroll-vertical-ascend' : 'animate-scroll-vertical-descend';
          const scrollDuration = 28 + colIdx * 4; 

          return (
            <div 
              key={colIdx} 
              className="flex-1 h-full overflow-hidden relative rounded-lg border border-neutral-950/40 bg-[#070709]/30"
            >
              <div 
                className={`flex flex-col gap-4 ${directionClass}`}
                style={{
                  animationDuration: `${scrollDuration}s`,
                  animationPlayState: 'running',
                }}
              >
                {tripledList.map((photo, itemIdx) => (
                  <div
                    key={`${photo.id}-stream-${colIdx}-${itemIdx}`}
                    className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-neutral-950 border border-neutral-900/60 pointer-events-none select-none shadow-md"
                  >
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover grayscale contrast-110 opacity-60"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Styled css keyframes for vertical seamless flow loops */}
      <style>{`
        @keyframes scroll-vertical-ascend {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-33.33333%);
          }
        }
        @keyframes scroll-vertical-descend {
          0% {
            transform: translateY(-33.33333%);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-scroll-vertical-ascend {
          animation: scroll-vertical-ascend infinite linear;
        }
        .animate-scroll-vertical-descend {
          animation: scroll-vertical-descend infinite linear;
        }
      `}</style>
    </div>
  );
}
