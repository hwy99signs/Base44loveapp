import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Target, Gift, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NewYearBanner() {
  const handleSetGoals = () => {
    // Scroll to waitlist form or trigger action
    const waitlistSection = document.querySelector('[data-waitlist-section]');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleGetTips = () => {
    // Open waitlist form or trigger action
    const waitlistSection = document.querySelector('[data-waitlist-section]');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative mb-4 mx-auto max-w-3xl px-4"
    >
      <div className="relative bg-[#fefaf6]/95 backdrop-blur-md rounded-2xl shadow-xl p-4 md:p-6 border-2 border-yellow-300/50">
        {/* Decorative Sparkles - Smaller */}
        <div className="absolute top-2 left-2 text-yellow-400 animate-pulse opacity-60">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="absolute top-2 right-2 text-yellow-400 animate-pulse opacity-60">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="absolute bottom-2 left-2 text-yellow-400 animate-pulse opacity-60">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="absolute bottom-2 right-2 text-yellow-400 animate-pulse opacity-60">
          <Sparkles className="w-4 h-4" />
        </div>

        {/* Header - Centered at Top */}
        <div className="text-center mb-3">
          <div className="flex items-center justify-center gap-1.5 text-amber-700 mb-1">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-xs md:text-sm font-medium">2026 SPECIAL</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <h3 className="text-base md:text-lg font-bold text-amber-900">
              NEW YEAR RESOLUTIONS 2026
            </h3>
            <div className="w-2 h-2 bg-red-500 rounded flex-shrink-0"></div>
          </div>
        </div>

        {/* Content Container - Icon Left, Content Right */}
        <div className="flex gap-4 items-center">
          {/* Left Side - Large Icon */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold whitespace-nowrap z-10">
                NEW!
              </span>
              <div className="text-3xl md:text-4xl">👫</div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="flex-1 text-center">
            {/* Main Title - Centered */}
            <h2 className="text-xl md:text-2xl font-bold text-amber-900 mb-1.5 text-center">
              Set Your Relationship Goals for the New Year!
            </h2>

            {/* Description - Centered */}
            <p className="text-xs md:text-sm text-amber-700 mb-3 text-center leading-relaxed whitespace-nowrap">
              ✨ Set meaningful relationship goals, track milestones, and get exclusive New Year bonuses! ✨
            </p>

            {/* Action Buttons - Centered */}
            <div className="flex flex-col sm:flex-row gap-2.5 justify-center items-center">
              <Button
                onClick={handleSetGoals}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-2 border-orange-400 px-5 py-2.5 text-sm font-semibold rounded-lg shadow-md flex items-center justify-center gap-2"
              >
                <Target className="w-4 h-4" />
                Set Your 2026 Goals
              </Button>
              <Button
                onClick={handleGetTips}
                variant="outline"
                className="bg-white text-orange-600 border-2 border-orange-500 hover:bg-orange-50 px-5 py-2.5 text-sm font-semibold rounded-lg shadow-md flex items-center justify-center gap-2"
              >
                <Gift className="w-4 h-4" />
                Get New Year Tips!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Sparkles icon component (since it might not be in lucide-react)
function Sparkles({ className }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0L14.09 8.26L22 10L14.09 11.74L12 20L9.91 11.74L2 10L9.91 8.26L12 0ZM6 15L7.27 19.18L11.5 20.45L7.27 21.73L6 26L4.73 21.73L0.5 20.45L4.73 19.18L6 15ZM18 17L18.68 19.59L21.27 20.27L18.68 20.95L18 23.54L17.32 20.95L14.73 20.27L17.32 19.59L18 17Z" />
    </svg>
  );
}

