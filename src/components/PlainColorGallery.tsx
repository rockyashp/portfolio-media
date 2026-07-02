import React, { useState, useRef } from 'react';
import { PhotoItem } from '../types';
import { portfolioPhotos } from '../data';
import { Eye, ArrowLeft, Play, Video as VideoIcon, Image as ImageIcon, Volume2, VolumeX, Maximize } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PlainColorGalleryProps {
  onSelectPhoto: (photo: PhotoItem) => void;
  onBackToHome: () => void;
}

interface VideoItem {
  id: string;
  videoUrl: string;
  coverUrl: string;
}

// Resolve video and thumbnail assets via Vite so URLs work in production builds.
const videoModules = import.meta.globEager('../assets/Videos/*.{mp4,webm}');
const thumbModules = import.meta.globEager('../assets/Videos/thumbnail/*.{png,jpg,jpeg,webp}');

const portfolioVideos: VideoItem[] = [
  {
    id: 'vid-1',
    videoUrl: (videoModules['../assets/Videos/Vid1.mp4'] as any)?.default ?? '/assets/Videos/Vid1.mp4',
    coverUrl: (thumbModules['../assets/Videos/thumbnail/Vid1.png'] as any)?.default ?? '/assets/Videos/thumbnail/Vid1.png',
  },
  {
    id: 'vid-2',
    videoUrl: (videoModules['../assets/Videos/Vid2.mp4'] as any)?.default ?? '/assets/Videos/Vid2.mp4',
    coverUrl: (thumbModules['../assets/Videos/thumbnail/Vid2.png'] as any)?.default ?? '/assets/Videos/thumbnail/Vid2.png',
  },
  {
    id: 'vid-3',
    videoUrl: (videoModules['../assets/Videos/Vid3.mp4'] as any)?.default ?? '/assets/Videos/Vid3.mp4',
    coverUrl: (thumbModules['../assets/Videos/thumbnail/Vid3.png'] as any)?.default ?? '/assets/Videos/thumbnail/Vid3.png',
  },
  {
    id: 'vid-4',
    videoUrl: 'https://drive.google.com/file/d/1FkipFZNhgNZSiGLIeoFWzQyQhYer0W_J/view',
    coverUrl: (thumbModules['../assets/Videos/thumbnail/Vid4.png'] as any)?.default ?? '/assets/Videos/thumbnail/Vid4.png',
  },
];

function VideoCard({ video }: { video: VideoItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      className="relative aspect-[3/4] rounded-xl bg-neutral-950 border border-neutral-900 shadow-xl cursor-pointer"
    >
      {/* Default Card View (Aspect 3:4) */}
      <div className="absolute inset-0 rounded-xl overflow-hidden flex items-end">
        <img
          src={video.coverUrl}
          alt="Video Cover"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-75 transition-transform duration-500 hover:scale-103"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent" />
        
        {/* Play indicator button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-11 h-11 rounded-full bg-neutral-950/80 border border-neutral-850 flex items-center justify-center backdrop-blur-sm shadow-xl">
            <Play className="w-4 h-4 text-white fill-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* 16:9 Landscape Pop-up Overlay on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.85, x: '-50%', y: '-50%' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onMouseLeave={handleMouseLeave}
            className="absolute top-1/2 left-1/2 w-[160%] sm:w-[180%] md:w-[210%] aspect-[16/9] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.95)] z-50 p-0"
            style={{ pointerEvents: 'auto' }}
          >
            {/* Auto-playing, looping, widescreen video */}
            {video.videoUrl.includes('drive.google.com') ? (
              <iframe
                src={video.videoUrl.replace('/view', '/preview')}
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                ref={videoRef}
                src={video.videoUrl}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />
            )}

            {/* Fullscreen Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (videoRef.current) {
                  if (videoRef.current.requestFullscreen) {
                    videoRef.current.requestFullscreen();
                  } else if ((videoRef.current as any).webkitRequestFullscreen) {
                    (videoRef.current as any).webkitRequestFullscreen();
                  }
                }
              }}
              className="absolute bottom-3.5 right-13 bg-neutral-950/85 hover:bg-white hover:text-black text-white border border-neutral-850 p-2 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 z-50 cursor-pointer"
              title="Fullscreen"
            >
              <Maximize className="w-3.5 h-3.5" />
            </button>

            {/* Audio Toggle Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              className="absolute bottom-3.5 right-3.5 bg-neutral-950/85 hover:bg-white hover:text-black text-white border border-neutral-850 p-2 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 z-50 cursor-pointer"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Dark gradient scrim at the bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/10 to-transparent pointer-events-none" />

            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PlainColorGallery({ onSelectPhoto, onBackToHome }: PlainColorGalleryProps) {
  const [galleryTab, setGalleryTab] = useState<'photos' | 'videos'>('photos');

  return (
    <div className="space-y-8">
      {/* Immersive Archive Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#070709]/80 border border-neutral-900 rounded-xl p-5 backdrop-blur-md">
        <div className="space-y-1">
          <span className="font-mono text-[9px] text-leica-red font-bold uppercase tracking-[0.25em] block">
            // PORTFOLIO STUDY SPREADS
          </span>
          <h3 className="font-display text-2xl font-black text-white uppercase tracking-tight">
            Curated Fine-Art Archive
          </h3>
        </div>

        {/* Tab Toggle & Back Buttons Row */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Photos vs Videos Toggle */}
          <div className="flex bg-neutral-950 p-1 rounded-lg border border-neutral-900 font-mono text-[9px] uppercase tracking-wider font-bold">
            <button
              onClick={() => setGalleryTab('photos')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all duration-200 cursor-pointer ${
                galleryTab === 'photos'
                  ? 'bg-neutral-900 text-white border border-neutral-800'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Photos
            </button>
            <button
              onClick={() => setGalleryTab('videos')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all duration-200 cursor-pointer ${
                galleryTab === 'videos'
                  ? 'bg-neutral-900 text-white border border-neutral-800'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <VideoIcon className="w-3.5 h-3.5" />
              Videos
            </button>
          </div>

          <button
            onClick={onBackToHome}
            className="group inline-flex items-center gap-2 bg-neutral-900 hover:bg-white text-white hover:text-black border border-neutral-850 hover:border-white px-4 py-2 rounded-lg font-mono text-[10px] uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer shrink-0 ml-auto md:ml-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {galleryTab === 'photos' ? (
          /* PHOTOS ARCHIVE GRID */
          <motion.div
            key="photos-grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {portfolioPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
                onClick={() => onSelectPhoto(photo)}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-900 hover:border-neutral-700/80 cursor-zoom-in transition-all duration-300 shadow-xl flex items-end"
              >
                {/* FULL COLOR IMAGE */}
                <img
                  src={photo.imageUrl}
                  alt="Portfolio Piece"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Dark gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Zoom Icon Badge */}
                <div className="absolute top-3.5 right-3.5 bg-neutral-950/90 backdrop-blur-md w-7 h-7 rounded-full border border-neutral-850 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-20 shadow-md">
                  <Eye className="w-3.5 h-3.5 text-white" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* AUTOPLAYING VIDEOS GRID + YOUTUBE FEATURE */
          <motion.div
            key="videos-grid-container"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {portfolioVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>

            {/* YouTube Featured Short Film Call to Action */}
            <div className="bg-[#09090c]/80 border border-neutral-900 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-md max-w-4xl mx-auto">
              <div className="space-y-1.5 text-center md:text-left">
                <span className="font-mono text-[8px] text-leica-red font-bold uppercase tracking-[0.2em] block">
                  // Featured Cinematography Release
                </span>
                <h4 className="font-display text-lg font-bold text-white uppercase tracking-tight">
                  Featured Short Film
                </h4>
                <p className="text-xs text-neutral-400 max-w-xl font-light">
                  Watch the official cinematic short film presentation capturing human transience and structural geometries on YouTube.
                </p>
              </div>

              <a
                href="https://www.youtube.com/watch?si=6YvsLDy4yprkjv30&v=NA-libeGYMo&feature=youtu.be"
                target="_blank"
                rel="noopener noreferrer"
                className="group shrink-0 inline-flex items-center gap-3 bg-[#e30613]/10 hover:bg-[#e30613] text-[#e30613] hover:text-white border border-[#e30613]/25 hover:border-[#e30613] px-6 py-3.5 rounded-lg font-mono text-[10px] uppercase tracking-widest font-bold transition-all duration-300 shadow-lg hover:scale-103"
              >
                Watch on YouTube
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
