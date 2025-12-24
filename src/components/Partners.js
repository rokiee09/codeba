import React from 'react';
import { motion } from 'framer-motion';

const Partners = () => {
  // Logo placeholder'lar - gerçek logoları ekleyebilirsiniz
  const partners = [
    {
      name: 'TechCorp',
      logo: 'https://via.placeholder.com/150x80/4A6CF7/FFFFFF?text=TechCorp',
      website: '#'
    },
    {
      name: 'Digital Solutions',
      logo: 'https://via.placeholder.com/150x80/6C63FF/FFFFFF?text=Digital+Solutions',
      website: '#'
    },
    {
      name: 'Innovate Labs',
      logo: 'https://via.placeholder.com/150x80/4F46E5/FFFFFF?text=Innovate+Labs',
      website: '#'
    },
    {
      name: 'Cloud Systems',
      logo: 'https://via.placeholder.com/150x80/6366F1/FFFFFF?text=Cloud+Systems',
      website: '#'
    },
    {
      name: 'StartupHub',
      logo: 'https://via.placeholder.com/150x80/818CF8/FFFFFF?text=StartupHub',
      website: '#'
    },
    {
      name: 'Future Tech',
      logo: 'https://via.placeholder.com/150x80/A5B4FC/FFFFFF?text=Future+Tech',
      website: '#'
    }
  ];

  return (
    <section id="partners" className="py-16 sm:py-20 lg:py-24 bg-light dark:bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-light/3 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            İş Ortaklarımız
          </span>
          <h2 className="text-4xl sm:text-5xl font-semibold text-dark dark:text-light mb-4">
            Güvenilir İş Ortaklarımız
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Başarılı projelerimizde birlikte çalıştığımız değerli ortaklarımız
          </p>
        </motion.div>

        {/* Logo Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-8 md:gap-12"
              animate={{
                x: [0, -50 * partners.length * 2]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear"
                }
              }}
            >
              {/* İki kez tekrarlayarak sürekli kaydırma efekti */}
              {[...partners, ...partners].map((partner, index) => (
                <motion.div
                  key={`${partner.name}-${index}`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 w-40 md:w-48 h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                >
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-w-full max-h-full object-contain filter brightness-0 dark:brightness-100 dark:invert"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-light dark:from-gray-900 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-light dark:from-gray-900 to-transparent pointer-events-none z-10"></div>
        </div>

        {/* Static Grid (Alternative - for better control) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-12"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 grayscale hover:grayscale-0 opacity-70 hover:opacity-100"
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="max-w-full max-h-16 object-contain filter brightness-0 dark:brightness-100 dark:invert"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;



