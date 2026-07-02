import React from 'react';
import lightroomLogo from '../assets/logo/adobe-lightroom-seeklogo.svg';
import premiereLogo from '../assets/logo/adobe-premiere-seeklogo.svg';
import davinciLogo from '../assets/logo/davinci-resolve-seeklogo.png';

interface SkillItem {
  name: string;
  category: string;
  logoUrl: string;
  borderColor: string;
}

export default function SkillsSection() {
    const photoSkills: SkillItem[] = [
    {
      name: "Adobe Lightroom",
      category: "RAW Development & Precision Color Grading",
        logoUrl: lightroomLogo,
      borderColor: "border-sky-900/30 hover:border-sky-500/50"
    },
    {
      name: "Premiere Pro",
      category: "High-End Video Editing & Storytelling",
        logoUrl: premiereLogo,
      borderColor: "border-purple-900/30 hover:border-purple-500/50"
    },
    {
      name: "DaVinci Resolve",
      category: "Cinematic Color Science & Color Correction",
        logoUrl: davinciLogo,
      borderColor: "border-amber-900/30 hover:border-amber-500/50"
    }
  ];

  return (
    <section id="photo-skills" className="py-8 border-t border-neutral-900/60 scroll-mt-24">
      <div className="space-y-6">
        <div>
          <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-[0.25em] block mb-1">
            CREATIVE TOOLKIT & INFRASTRUCTURE
          </span>
          <h2 className="font-display text-2xl font-black text-white uppercase tracking-tight">
            Skills & Software
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {photoSkills.map((skill, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-xl bg-[#09090c] border border-neutral-900/80 transition-all duration-300 hover:scale-[1.01] hover:bg-[#0c0c11] shadow-lg ${skill.borderColor}`}
            >
              {/* Left Side: Logo Container */}
              <div className="w-16 h-16 rounded-lg flex items-center justify-center shrink-0 bg-neutral-950 p-1 shadow-inner">
                <img 
                  src={skill.logoUrl} 
                  alt={skill.name} 
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Right Side: Skill Info */}
              <div className="space-y-0.5 overflow-hidden">
                <h4 className="text-[13px] font-bold text-white tracking-wide uppercase truncate">
                  {skill.name}
                </h4>
                <p className="text-[10px] text-neutral-400 leading-tight">
                  {skill.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
