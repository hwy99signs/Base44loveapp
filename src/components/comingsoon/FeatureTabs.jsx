import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const emojis = ['💌', '🤖', '🎯', '📅', '💡', '📸', '❤️', '🌈', '⏰', '🎨', '👥', '🚢', '🌍', '✨', '🛍️'];

export default function FeatureTabs({ features }) {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="flex flex-col items-center">
      {/* Tabs - Constrained Width */}
      <div className="flex flex-wrap gap-2 justify-center max-w-4xl px-2">
        {features.map((feature, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-purple-300 hover:shadow-md"
          >
            <span className="mr-1">{emojis[index]}</span>
            <span className="hidden sm:inline">{feature.title}</span>
            <span className="sm:hidden">{feature.title.length > 15 ? feature.title.substring(0, 15) + '...' : feature.title}</span>
          </button>
        ))}
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {activeTab !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTab(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 relative">
                {/* Close Button */}
                <button
                  onClick={() => setActiveTab(null)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                </button>

                {/* Content */}
                <div className="text-center pt-2">
                  <div className="text-5xl sm:text-6xl mb-4">{emojis[activeTab]}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 pr-8">
                    {features[activeTab].title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {features[activeTab].description}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}