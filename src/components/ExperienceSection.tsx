import React from 'react';
import { MapPin, Briefcase, Film, Award } from 'lucide-react';

interface TimelineItem {
  year: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  type: 'agency' | 'campus' | 'ambassador';
}

export default function ExperienceSection() {
  const experiences: TimelineItem[] = [
    {
      year: "2025 — PRESENT",
      role: "Media Agency Professional",
      organization: "Crewfluence",
      location: "Mumbai, India",
      description: "Executing digital media production, brand strategy, and collaborative content creation projects.",
      type: 'agency'
    },
    {
      year: "2024 — PRESENT",
      role: "Dell Student Content Ambassador",
      organization: "Dell Technologies",
      location: "Mumbai, India",
      description: "Representing Dell on campus, driving digital product storytelling, and organizing interactive tech events.",
      type: 'ambassador'
    },
    {
      year: "2024 — PRESENT",
      role: "GDG Media Core",
      organization: "Vidyalankar Institute of Technology",
      location: "Mumbai, India",
      description: "Leading camera coverage, video creation, and visual brand assets for Google Developer Groups (GDG) events.",
      type: 'campus'
    },
    {
      year: "2024 — PRESENT",
      role: "ITSA Media Core",
      organization: "Vidyalankar Institute of Technology",
      location: "Mumbai, India",
      description: "Managing photography, design directions, and digital newsletters for the Information Technology Student Association.",
      type: 'campus'
    },
    {
      year: "2024 — PRESENT",
      role: "VCC Media Core",
      organization: "Vidyalankar Institute of Technology",
      location: "Mumbai, India",
      description: "Directing event coverage, live visual streaming systems, and promotional media teasers for student community initiatives.",
      type: 'campus'
    }
  ];

  return (
    <section id="professional-journey" className="py-8 border-t border-neutral-900/60 scroll-mt-24">
      <div className="space-y-12">
        
        {/* Header Block */}
        <div>
          <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-[0.25em] block mb-1">
            RECORDED TIMELINE & EXPOSURES
          </span>
          <h2 className="font-display text-2xl font-black text-white uppercase tracking-tight">
            Experience & Roles
          </h2>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-neutral-900 ml-3 md:ml-32 space-y-12 pb-4">
          {experiences.map((exp, idx) => {
            // Get icon based on type
            const getIcon = () => {
              switch (exp.type) {
                case 'ambassador':
                  return <Award className="w-4 h-4 text-leica-red" />;
                case 'agency':
                  return <Briefcase className="w-4 h-4 text-emerald-400" />;
                default:
                  return <Film className="w-4 h-4 text-sky-400" />;
              }
            };

            return (
              <div key={idx} className="relative pl-6 md:pl-10 group">
                
                {/* Year tag positioned on the left for desktop, top for mobile */}
                <div className="md:absolute md:right-full md:mr-10 md:top-1 font-mono text-[10px] text-neutral-500 font-bold tracking-widest uppercase mb-2 md:mb-0 select-none">
                  {exp.year}
                </div>

                {/* Timeline node circle with icon */}
                <div className="absolute -left-[17px] top-0.5 md:top-1 w-8 h-8 rounded-full bg-[#0a0a0d] border border-neutral-800 flex items-center justify-center group-hover:border-neutral-500 transition-colors duration-300 shadow-lg z-10">
                  {getIcon()}
                </div>

                {/* Inner Content Card */}
                <div className="bg-[#070709]/40 border border-neutral-900 hover:border-neutral-800/80 rounded-xl p-5 md:p-6 transition-all duration-300 hover:bg-[#09090d]/60 space-y-3 shadow-xl">
                  
                  {/* Card Title & Meta Info */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-white uppercase tracking-wide">
                        {exp.role}
                      </h4>
                      <p className="text-xs text-neutral-400 font-medium mt-0.5">
                        {exp.organization}
                      </p>
                    </div>

                    {/* Location Badge */}
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] text-neutral-500 bg-neutral-950 px-2 py-1 rounded border border-neutral-900 shrink-0 self-start">
                      <MapPin className="w-3 h-3 text-neutral-600" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Body description */}
                  <p className="text-xs md:text-sm text-neutral-400 font-light leading-relaxed">
                    {exp.description}
                  </p>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
