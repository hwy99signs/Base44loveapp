import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Globe } from 'lucide-react';
import FeatureTabs from '../components/comingsoon/FeatureTabs';
import LanguageSelector from '../components/comingsoon/LanguageSelector';
import WaitlistForm from '../components/comingsoon/WaitlistForm';
import NewYearBanner from '../components/comingsoon/NewYearBanner';

import { translations } from '../components/translations';

export default function ComingSoon() {
  const [language, setLanguage] = useState('en');
  const t = translations[language];

  return (
    <div className="min-h-screen relative">
      {/* Full Page Background Image with Overlay */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6918bba96eee8823b1f12063/1074583db_-appbackgroundphoto.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="container mx-auto px-6 pt-20 pb-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Logo/Brand */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center mb-8"
              >
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6918bba96eee8823b1f12063/cae65adc8_ONE2ONELOVELOGO.png" 
                  alt="One 2 One Love" 
                  className="h-64 w-auto"
                />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
              >
                {t.hero.title1}
                <span className="block bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  {t.hero.title2}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto drop-shadow-md"
              >
                {t.hero.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="inline-flex items-center gap-2 bg-white/95 text-purple-700 px-6 py-3 rounded-full font-semibold mb-12 shadow-xl"
              >
                <Sparkles className="w-5 h-5" />
                <span>{t.hero.launchingSoon}</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* New Year Banner Section - Moved Up */}
        <div className="relative py-2 px-6 -mt-16">
          <NewYearBanner />
        </div>

        {/* Features Section */}
        <div className="relative py-24 px-6">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                {t.features.heading}
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
                {t.features.subheading}
              </p>
            </motion.div>

            <FeatureTabs features={t.features.items} />
          </div>
        </div>

        {/* Language Section */}
        <div className="relative py-5 px-6">
          <div className="container mx-auto max-w-2xl">
            <LanguageSelector 
              heading={t.languages.heading}
              currentLanguage={language}
              onLanguageChange={setLanguage}
              translations={t.languages}
            />
          </div>
        </div>

        {/* Waitlist Section */}
        <div className="relative py-12 px-6" data-waitlist-section>
          <div className="container mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 border border-purple-200"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {t.waitlist.heading}
                </h2>
                <p className="text-lg text-gray-600">
                  {t.waitlist.subheading}
                </p>
              </div>

              <WaitlistForm translations={t.waitlist} />
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative py-12 px-6 border-t border-white/20 backdrop-blur-sm bg-black/30">
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6918bba96eee8823b1f12063/cae65adc8_ONE2ONELOVELOGO.png" 
                alt="One 2 One Love" 
                className="h-32 w-auto"
              />
            </div>
            <p className="text-white/80">
              {t.footer.tagline}
            </p>
            <div className="flex items-center justify-center gap-3 mt-4 text-sm text-white/70">
              <Globe className="w-4 h-4" />
              <span>{t.footer.availability}</span>
            </div>
            <p className="text-sm text-white/60 mt-4">
              {t.footer.copyright}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}