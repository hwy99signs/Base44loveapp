import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const emojis = ['💌', '🤖', '🎯', '📅', '💡', '📸', '❤️', '🌈', '⏰', '🎨', '👥', '🚢', '🌍', '✨', '🛍️'];

export default function FeatureTabs({ features }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col items-center">
      {/* Tabs - Constrained Width */}
      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 justify-center max-w-4xl px-2">
        {features.map((feature, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
              activeTab === index
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <span className="mr-1">{emojis[index]}</span>
            <span className="hidden sm:inline">{feature.title}</span>
            <span className="sm:hidden">{feature.title.length > 15 ? feature.title.substring(0, 15) + '...' : feature.title}</span>
          </button>
        ))}
      </div>

      {/* Content - White Background - Narrower */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-purple-200 w-full max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[140px] sm:min-h-[120px] md:min-h-[100px]"
          >
            <div className="text-center">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{emojis[activeTab]}</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                {features[activeTab].title}
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                {features[activeTab].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}