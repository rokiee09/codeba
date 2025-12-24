import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExitIntentPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const seen = localStorage.getItem('exit_intent_popup_seen');
    if (seen) {
      setHasSeenPopup(true);
      return;
    }

    // Detect mouse leaving the viewport
    const handleMouseLeave = (e) => {
      if (!e.toElement && !e.relatedTarget && e.clientY < 10) {
        if (!hasSeenPopup && !showPopup) {
          setShowPopup(true);
        }
      }
    };

    // Detect when user is about to leave (mobile swipe up)
    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      if (touch.clientY < 50) {
        if (!hasSeenPopup && !showPopup) {
          setShowPopup(true);
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('touchstart', handleTouchStart);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, [hasSeenPopup, showPopup]);

  const handleClose = () => {
    setShowPopup(false);
    setHasSeenPopup(true);
    localStorage.setItem('exit_intent_popup_seen', 'true');
  };

  const scrollToContact = () => {
    setShowPopup(false);
    setHasSeenPopup(true);
    localStorage.setItem('exit_intent_popup_seen', 'true');
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-[9998]"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full relative border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 min-w-[40px] min-h-[40px]"
                aria-label="Kapat"
              >
                <svg className="w-5 h-5 text-dark dark:text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Content */}
              <div className="p-8 text-center">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center"
                >
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </motion.div>

                <h3 className="text-2xl font-bold text-dark dark:text-light mb-3">
                  Bekle, Gitme! 🚀
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Özel teklif ve ücretsiz danışmanlık için iletişime geçin.
                  <br />
                  <span className="font-semibold text-primary">İlk 5 müşterimize %20 indirim!</span>
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={scrollToContact}
                    className="flex-1 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-light transition-colors duration-300 shadow-md hover:shadow-lg min-h-[44px]"
                  >
                    Hemen İletişime Geç
                  </button>
                  <button
                    onClick={handleClose}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-dark dark:text-light px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 min-h-[44px]"
                  >
                    Belki Sonra
                  </button>
                </div>

                {/* Special Offer Badge */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    💡 <span className="font-semibold text-primary">Özel Fırsat:</span> Bugün iletişime geçenlere ücretsiz SEO analizi
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;


