import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Target, Gift } from 'lucide-react';
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
      className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto px-2 sm:px-0"
    >
      <div className="relative bg-[#fefaf6]/95 backdrop-blur-md rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl p-3 sm:p-5 md:p-6 border-2 border-orange-300/60 sm:border-orange-300/50">
        {/* Decorative Sparkles */}
        <div className="absolute top-2 left-2 text-yellow-400 animate-pulse opacity-60">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
        </div>
        <div className="absolute top-2 right-2 text-yellow-400 animate-pulse opacity-60">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
        </div>
        <div className="absolute bottom-2 left-2 text-yellow-400 animate-pulse opacity-60">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
        </div>
        <div className="absolute bottom-2 right-2 text-yellow-400 animate-pulse opacity-60">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
        </div>

        {/* Header - Centered at Top */}
        <div className="text-center mb-2 sm:mb-3 md:mb-4">
          <div className="flex items-center justify-center gap-1 sm:gap-1.5 text-amber-700 mb-0.5 sm:mb-1">
            <Calendar className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
            <span className="text-[10px] sm:text-xs md:text-sm font-medium">2026 SPECIAL</span>
          </div>
          <div className="flex items-center justify-center gap-1 sm:gap-1.5">
            <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-amber-900">
              NEW YEAR RESOLUTIONS 2026
            </h3>
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full flex-shrink-0"></div>
          </div>
        </div>

        {/* Content Container - Icon Left, Content Right */}
        <div className="flex gap-2 sm:gap-3 md:gap-4 items-start sm:items-center">
          {/* Left Side - Large Icon */}
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-red-500 text-white text-[7px] sm:text-[8px] md:text-[9px] px-0.5 sm:px-1 md:px-1.5 py-0.5 rounded-full font-bold whitespace-nowrap z-10">
                NEW!
              </span>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">👫</div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="flex-1 min-w-0">
            {/* Main Title */}
            <h2 className="text-xs sm:text-base md:text-lg lg:text-xl font-bold text-amber-900 mb-1 sm:mb-1.5 md:mb-2 leading-tight break-words">
              Set Your Relationship Goals!
            </h2>

            {/* Description - Hidden on very small screens */}
            <p className="hidden sm:block text-xs md:text-sm lg:text-base text-amber-700 mb-2 sm:mb-3 md:mb-4 leading-relaxed">
              Set meaningful relationship goals, track milestones, get exclusive New Year bonuses!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <Button
                onClick={handleSetGoals}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-2 border-orange-400 px-2.5 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 text-[10px] sm:text-xs md:text-sm font-semibold rounded-lg shadow-md flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 w-full"
              >
                <Target className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                <span className="truncate">Set Your 2026 Goals</span>
              </Button>
              <Button
                onClick={handleGetTips}
                variant="outline"
                className="bg-white text-orange-600 border-2 border-orange-500 hover:bg-orange-50 px-2.5 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 text-[10px] sm:text-xs md:text-sm font-semibold rounded-lg shadow-md flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 w-full"
              >
                <Gift className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                <span className="truncate">Get New Year Tips!</span>
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

