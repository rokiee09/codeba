import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Web Geliştirme',
      description: 'React, Next.js ve modern framework\'lerle hızlı ve güvenli web siteleri',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
      tech: ['React', 'Next.js', 'Vue.js']
    },
    {
      id: 2,
      title: 'Mobil Uygulama',
      description: 'React Native ve Flutter ile cross-platform mobil uygulamalar',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      tech: ['React Native', 'Flutter', 'Swift']
    },
    {
      id: 3,
      title: 'UI/UX Tasarım',
      description: 'Kullanıcı deneyimi odaklı modern ve şık arayüz tasarımları',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      tech: ['Figma', 'Adobe XD', 'Sketch']
    },
    {
      id: 4,
      title: 'E-Ticaret Çözümleri',
      description: 'Güvenli ve ölçeklenebilir online mağaza platformları',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      tech: ['WooCommerce', 'Shopify', 'Custom']
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 saniyede bir değişir

    return () => clearInterval(interval);
  }, [slides.length]);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20"
    >
      {/* Soft Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-purple-400 opacity-95"></div>
      
      {/* Subtle animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-6 leading-tight"
            >
              Modern Web Tasarım & Mobil Uygulama Geliştirme
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl sm:text-2xl text-white/90 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              CodeBA, işletmeler için güven veren, hızlı ve modern dijital çözümler üretir.
              <br />
              <span className="text-white/80 text-lg">Web siteleri, mobil uygulamalar ve özel yazılım projelerinde yüksek performans ve kullanıcı dostu tasarımlar sunuyorum.</span>
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToServices}
                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium text-base sm:text-lg hover:bg-white/20 transition-all duration-300 min-h-[44px] w-full sm:w-auto"
              >
                Hizmetler
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToContact}
                className="bg-white text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-soft-lg hover:shadow-soft transition-all duration-300 min-h-[44px] w-full sm:w-auto"
              >
                İletişime Geç
              </motion.button>
            </motion.div>
          </div>

          {/* Right Side - Slider Banner */}
          <motion.div
            variants={itemVariants}
            className="relative order-1 lg:order-2"
          >
            <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full">
                    <img
                      src={slides[currentSlide].image}
                      alt={`${slides[currentSlide].title} - ${slides[currentSlide].description}`}
                      className="w-full h-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                      <h3 className="text-3xl font-bold mb-3">{slides[currentSlide].title}</h3>
                      <p className="text-lg mb-4 text-white/90">{slides[currentSlide].description}</p>
                      <div className="flex flex-wrap gap-2">
                        {slides[currentSlide].tech.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10"
                aria-label="Önceki slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10"
                aria-label="Sonraki slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            className="w-6 h-6 text-white/80"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
