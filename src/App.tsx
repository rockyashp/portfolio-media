import { useState } from 'react';
import { PhotoItem } from './types';
import LoopingGallery from './components/LoopingGallery';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import PlainColorGallery from './components/PlainColorGallery';
import Lightbox from './components/Lightbox';
import InquiryCard from './components/InquiryCard';
import FilmGrain from './components/FilmGrain';
import { Camera, Mail, BookOpen, UserCheck, Instagram } from 'lucide-react';
import portraitUrl from './assets/images/yash_portrait_1783008963693.jpg';
import { AnimatePresence } from 'motion/react';

export default function App() {
  // 1. Manage current view ('home' or 'gallery')
  const [viewMode, setViewMode] = useState<'home' | 'gallery'>('home');
  // 2. Manage Lightbox selection
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  return (
    <div className="min-h-screen bg-[#060608] text-neutral-300 relative selection:bg-leica-red selection:text-white pb-24">
      {/* Dynamic Film Grain System */}
      <FilmGrain iso={400} />

      {/* 1. HEADER SECTION (Leica Minimalist Aesthetic) */}
      <header className="border-b border-neutral-900/60 sticky top-0 bg-[#060608]/90 backdrop-blur-md z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Custom Red-Dot "yash" Emblem */}
          <div 
            onClick={() => setViewMode('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-leica-red hover:bg-leica-darkred transition-colors duration-300 flex items-center justify-center shadow-lg relative transform group-hover:scale-102 duration-300">
              <span className="font-display font-black text-white text-[13px] sm:text-[15px] italic tracking-tight uppercase select-none transform -skew-x-6">
                yash
              </span>
            </div>
            
            <div className="leading-none">
              <h1 className="font-display text-xs sm:text-sm font-semibold text-white tracking-widest uppercase group-hover:text-white transition-colors">
                Yash's Portfolio
              </h1>
            </div>
          </div>

          {/* Action Anchors */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/me_n_yashp/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5"
              title="Instagram"
            >
              <Instagram className="w-4 h-4 text-neutral-450 hover:text-white transition-colors duration-200" />
            </a>
            <button 
              onClick={() => setViewMode('gallery')}
              className={`font-mono text-[10px] uppercase tracking-widest transition-colors duration-200 cursor-pointer ${viewMode === 'gallery' ? 'text-leica-red font-bold' : 'text-neutral-400 hover:text-white'}`}
            >
              Gallery
            </button>
            <a 
              href="#contact-form" 
              onClick={() => setViewMode('home')}
              className="bg-[#111115] hover:bg-neutral-900 text-white font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 sm:px-4 sm:py-2 rounded border border-neutral-800 hover:border-neutral-700 transition-all duration-200 flex items-center gap-1.5"
            >
              <Mail className="w-3 h-3 text-leica-red" />
              Inquire
            </a>
          </div>
        </div>
      </header>

      {/* 2. BODY CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 space-y-16">
        
        {viewMode === 'home' ? (
          <>
            {/* Intro bio section with high-contrast portrait of Yash */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center bg-[#070709]/40 border border-neutral-900 rounded-2xl p-6 sm:p-8">
              <div className="md:col-span-7 space-y-5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-leica-red font-bold flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" />
                  Visual Philosophy
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight uppercase">
                  Hello<br />
                  <b>I am Yash.</b>
                </h2>
                <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-light">
                  I am Yash, a fine-art photographer exploring the interplay of severe shadows, brutalist geometries, and spontaneous human interactions. Embracing the constraints of manual rangefinder optics, my work serves as an archival check on urban transience. Explore the interactive visual stream, or enter the full colored photo gallery.
                </p>
                
                {/* Visual Specs / Photographer Profile HUD */}
                
              </div>
              
              <div className="md:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[280px] aspect-[3/4] rounded-xl overflow-hidden border border-neutral-800 bg-[#0c0c0f] shadow-2xl group">
                  <img 
                    src={portraitUrl} 
                    alt="Yash Patil Portrait" 
                    className="w-full h-full object-cover grayscale contrast-115 transition-transform duration-500 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 inset-x-0 text-center font-mono">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider mt-0.5">
                      Yash Patil
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION: PROFESSIONAL PHOTOGRAPHY SKILLS & GEAR */}
            <SkillsSection />

            {/* SECTION 1: THE WORKS LOOPING GALLERY */}
            <section id="selected-works" className="pt-2">
              <div className="space-y-1 mb-6">
                <span className="font-mono text-[10px] text-leica-red font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-leica-red animate-ping" />
                  Continuous Photographic Stream
                </span>
                <h2 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
                  Gallery Preview
                </h2>
              </div>
              <LoopingGallery onViewWorkClick={() => setViewMode('gallery')} />
            </section>

            {/* SECTION: EXPERIENCE & WORK TIMELINE */}
            <ExperienceSection />

            {/* SECTION 3: INQUIRY CARD */}
            <section id="contact-form" className="pt-8 border-t border-neutral-900/60 max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-leica-red font-bold">
                  Bookings & Print Inquiries
                </span>
                <h2 className="font-display text-2xl font-bold tracking-tight text-white uppercase">
                  Inquiry Booking Slip
                </h2>
                <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                  Send a message to inquire about prints, organize photoshoot sessions, or collaborate on architectural/creative projects.
                </p>
              </div>

              <InquiryCard />
            </section>
          </>
        ) : (
          <PlainColorGallery 
            onSelectPhoto={setSelectedPhoto} 
            onBackToHome={() => setViewMode('home')} 
          />
        )}

      </main>

      {/* 3. LIGHTBOX SYSTEM FOR EXIF REVIEW */}
      <AnimatePresence>
        {selectedPhoto && (
          <Lightbox 
            photo={selectedPhoto} 
            onClose={() => setSelectedPhoto(null)}
            onSelectPhoto={setSelectedPhoto}
          />
        )}
      </AnimatePresence>

      {/* 4. FOOTER */}
      <footer className="mt-20 pt-10 border-t border-neutral-900/60 font-mono text-[10px] text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          
          <div className="space-y-1">
            <span className="block text-white font-medium">YASH PHOTOGRAPHY</span>
            <p className="text-[9px] text-neutral-600">
              © 2026 YASH. ALL PHOTOGRAPHS COPYRIGHT INDIVIDUALLY REGISTERED.
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/me_n_yashp/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-neutral-500 hover:text-white transition-colors duration-200"
            >
              <Instagram className="w-3.5 h-3.5 text-neutral-600" />
              <span>INSTAGRAM</span>
            </a>
          </div>



        </div>
      </footer>
    </div>
  );
}
