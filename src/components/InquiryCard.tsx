import React, { useState, useEffect } from 'react';
import { Mail, User, Calendar, MessageSquare, ClipboardCheck, Printer, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface InquiryCardProps {
  prefilledCategory?: string;
  prefilledMessage?: string;
}

export default function InquiryCard({ prefilledCategory, prefilledMessage }: InquiryCardProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Portraits',
    date: '',
    message: '',
  });

  useEffect(() => {
    if (prefilledCategory) {
      setFormData(prev => ({ ...prev, category: prefilledCategory }));
    }
    if (prefilledMessage) {
      setFormData(prev => ({ ...prev, message: prefilledMessage }));
    }
  }, [prefilledCategory, prefilledMessage]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dateError, setDateError] = useState<string | null>(null);
  const [receiptNumber] = useState(() => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `LEICA-RC-2026-${randomNum}`;
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setFormData(prev => ({ ...prev, date: selectedDate }));
    
    if (selectedDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const chosen = new Date(selectedDate);
      chosen.setHours(0, 0, 0, 0);
      
      if (chosen < today) {
        setDateError('Date cannot be in the past');
      } else {
        setDateError(null);
      }
    } else {
      setDateError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }

    if (formData.date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const chosen = new Date(formData.date);
      chosen.setHours(0, 0, 0, 0);
      
      if (chosen < today) {
        setDateError('Date cannot be in the past');
        return;
      }
    }
    
    if (dateError) {
      return;
    }
    
    // Simulate submission to Leica Labs
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      category: 'Portraits',
      date: '',
      message: '',
    });
    setDateError(null);
    setIsSubmitted(false);
  };

  return (
    <div className="relative max-w-xl mx-auto">
      {/* 1. Hanging Clip Accent */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-neutral-900 border border-neutral-800 rounded-t-md border-b-0 flex items-center justify-center z-10">
        <div className="w-4 h-4 rounded-full bg-[#e30613] border border-neutral-950" />
      </div>

      <div className="pt-3">
        {/* Main Paper-styled Container */}
        <div className="bg-[#0b0b0e] border border-neutral-900 rounded-lg p-6 md:p-8 font-mono text-xs text-neutral-400 relative overflow-hidden shadow-2xl">
          
          {/* Tear Margins (visual zig-zag edge at bottom) */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-neutral-950 to-transparent flex overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={i} 
                className="w-4 h-4 shrink-0 bg-neutral-950 rotate-45 transform translate-y-2 border-t border-l border-neutral-900" 
              />
            ))}
          </div>

          {/* Header Receipt Information */}
          <div className="border-b border-dashed border-neutral-800 pb-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="text-white text-sm font-semibold tracking-wide uppercase">
                Collaboration Inquiry:
              </h3>
            </div>
          </div>

          {!isSubmitted ? (
            /* 2. CONTACT FORM INQUIRY */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-bold text-neutral-300">
                    Client Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-neutral-600" />
                    <input
                      type="text"
                      required
                      placeholder=""
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#050507] border border-neutral-900 rounded px-3 py-2 pl-9 text-white focus:border-leica-red focus:outline-none transition-colors duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-bold text-neutral-300">
                    Contact Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-neutral-600" />
                    <input
                      type="email"
                      required
                      placeholder=""
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#050507] border border-neutral-900 rounded px-3 py-2 pl-9 text-white focus:border-leica-red focus:outline-none transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Category Select and Booking Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-bold text-neutral-300">
                    Shoot Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#050507] border border-neutral-900 rounded px-3 py-2 text-white focus:border-leica-red focus:outline-none transition-colors duration-200"
                  >
                    <option value="Portraits">Portraits</option>
                    <option value="Landscapes">Landscapes</option>
                    <option value="Street">Street</option>
                    <option value="Architecture">Architecture</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-bold text-neutral-300">
                    Target Shoot Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-neutral-600" />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={handleDateChange}
                      className={`w-full bg-[#050507] border rounded px-3 py-2 pl-9 text-white focus:outline-none transition-colors duration-200 ${
                        dateError ? 'border-leica-red focus:border-leica-red' : 'border-neutral-900 focus:border-leica-red'
                      }`}
                    />
                  </div>
                  {dateError && (
                    <span className="text-[10px] text-leica-red font-mono mt-1 block">
                      {dateError}
                    </span>
                  )}
                </div>
              </div>

              {/* Message Details */}
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-bold text-neutral-300">
                  Chemical Booking / Project Details *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-2.5 w-4 h-4 text-neutral-600" />
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your creative project vision or specific print requests..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#050507] border border-neutral-900 rounded px-3 py-2 pl-9 text-white focus:border-leica-red focus:outline-none transition-colors duration-200 resize-none"
                  />
                </div>
              </div>

              {/* Submit Laboratory Order Button */}
              <button
                type="submit"
                className="w-full bg-neutral-900 hover:bg-leica-red text-white hover:text-white border border-neutral-800 hover:border-leica-red rounded py-3 mt-4 flex items-center justify-center gap-2 font-mono uppercase tracking-widest font-semibold transition-all duration-300"
              >
                <ClipboardCheck className="w-4 h-4" />
                Submit
              </button>
            </form>
          ) : (
            /* 3. SUCCESS / STAMPED RECEIPT STATE */
            <div className="space-y-6 py-6 flex flex-col items-center justify-center text-center relative">
              
              {/* Dynamic Red Ink Rubber Stamp Overlay */}
              <motion.div 
                initial={{ scale: 2, rotate: -15, opacity: 0 }}
                animate={{ scale: 1, rotate: -8, opacity: 0.85 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="absolute top-2 right-4 border-4 border-dashed border-leica-red text-leica-red rounded px-5 py-2 uppercase text-[15px] font-extrabold tracking-widest pointer-events-none select-none select-none font-sans flex flex-col items-center leading-none"
              >
                <span>RECEIVED</span>
                <span className="text-[10px] tracking-widest mt-0.5">INQUIRY RECEIVED</span>
                <span className="text-[8px] font-mono font-medium tracking-normal mt-0.5">{receiptNumber}</span>
              </motion.div>

              <div className="w-12 h-12 rounded-full bg-neutral-950 flex items-center justify-center border border-emerald-500/30">
                <CheckCircle className="w-6 h-6 text-emerald-500 animate-pulse" />
              </div>

              <div className="space-y-2 max-w-sm">
                <h4 className="text-white font-bold uppercase tracking-wider text-sm">
                  Inquiry Submitted Successfully
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Your inquiry has been received. We will get back to you via <strong>{formData.email}</strong> shortly.
                </p>
              </div>

              {/* Receipt Summary Grid */}
              <div className="bg-neutral-950 border border-neutral-900 rounded p-4 text-left w-full space-y-2 text-[10px]">
                <div className="flex justify-between">
                  <span className="text-neutral-500">CLIENT ORDER:</span>
                  <span className="text-white font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">CATEGORY:</span>
                  <span className="text-white font-medium">{formData.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">TARGET DATE:</span>
                  <span className="text-white font-medium">{formData.date || 'PENDING CALIBRATION'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">SERIAL BLOCK:</span>
                  <span className="text-neutral-400">{receiptNumber}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 w-full">
                <button
                  onClick={handleReset}
                  className="flex-1 bg-neutral-950 hover:bg-neutral-900 text-neutral-300 border border-neutral-850 rounded py-2 font-mono uppercase tracking-wider text-[10px]"
                >
                  Create New Slip
                </button>
              </div>

            </div>
          )}


        </div>
      </div>
    </div>
  );
}
