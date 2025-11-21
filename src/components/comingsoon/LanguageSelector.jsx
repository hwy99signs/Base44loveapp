import React from 'react';
import { motion } from 'framer-motion';

export default function LanguageSelector({ heading, currentLanguage, onLanguageChange, translations }) {
  const languages = [
    { code: 'en', flag: 'https://flagcdn.com/w40/us.png' },
    { code: 'fr', flag: 'https://flagcdn.com/w40/fr.png' },
    { code: 'es', flag: 'https://flagcdn.com/w40/es.png' },
    { code: 'it', flag: 'https://flagcdn.com/w40/it.png' },
    { code: 'de', flag: 'https://flagcdn.com/w40/de.png' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8 border border-purple-200 flex flex-col justify-center min-h-[192px] md:min-h-[176px]"
    >
      <h3 className="text-2xl font-bold text-purple-700 text-center mb-6">
        {heading}
      </h3>
      
      <div className="flex gap-3 justify-center flex-wrap">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onLanguageChange(lang.code)}
            className={`px-6 py-3 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
              currentLanguage === lang.code
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-white text-gray-700 border-2 border-purple-200 hover:border-purple-400'
            }`}
          >
            <img src={lang.flag} alt={translations.languageNames[lang.code]} className="w-5 h-5 object-cover rounded-sm" />
            <span>{translations.languageNames[lang.code]}</span>
          </motion.button>
        ))}
      </div>

      <p className="text-center text-xs text-gray-500 mt-8 font-bold">
        {translations.clickToTry}
      </p>
    </motion.div>
  );
}