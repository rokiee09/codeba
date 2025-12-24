import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 2000); // 2 saniye sonra göster
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-2xl border-t border-gray-200 dark:border-gray-700"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-dark dark:text-light mb-2">
                  🍪 Çerez Politikası
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Bu web sitesi, deneyiminizi iyileştirmek için çerezler kullanmaktadır. 
                  Sitemizi kullanmaya devam ederek çerez kullanımını kabul etmiş olursunuz.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleDecline}
                  className="px-4 py-2.5 sm:py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors min-h-[44px] w-full sm:w-auto"
                >
                  Reddet
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-2.5 sm:py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-light transition-colors text-sm min-h-[44px] w-full sm:w-auto"
                >
                  Kabul Et
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;

