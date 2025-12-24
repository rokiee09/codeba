import React from 'react';
import { motion } from 'framer-motion';

const About = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const principles = [
    { icon: '🎨', text: 'Modern ve minimal tasarım anlayışı' },
    { icon: '⚡', text: 'Hızlı ve performanslı çözümler' },
    { icon: '📱', text: 'Mobil ve web uyumlu responsive tasarım' },
    { icon: '🔒', text: 'Güvenli ve sürdürülebilir yazılım mimarisi' },
    { icon: '🤝', text: 'Müşteri odaklı yaklaşım ve destek' },
    { icon: '✨', text: 'Yenilikçi teknolojilerle güncel çözümler' },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-light dark:bg-gray-900 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-light/3 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text with Soft Card */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Biz Kimiz?
              </span>
              <h2 className="text-4xl sm:text-5xl font-semibold text-dark dark:text-light mb-6">
                Dijital Dönüşümünüz İçin<br />
                <span className="text-primary">Yanınızdayız</span>
              </h2>
            </motion.div>
            
            {/* Soft Glassmorphism Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-soft-lg border border-gray-100/50 mb-8"
            >
                  <div className="space-y-5 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                <p className="text-xl font-medium text-dark dark:text-light">
                  İşletmenizin dijital dünyada güçlü bir varlık olması için buradayız.
                </p>
                <p>
                  Modern web tasarım ve yazılım çözümleriyle markanızı öne çıkarıyoruz. Her projede 
                  <strong className="text-dark dark:text-light"> kullanıcı deneyimi</strong>, 
                  <strong className="text-dark dark:text-light"> performans</strong> ve 
                  <strong className="text-dark dark:text-light"> güvenilirlik</strong> odaklı çalışıyoruz.
                </p>
                <p>
                  Kurumsal web sitelerinden e-ticaret platformlarına, mobil uygulamalardan özel yazılım çözümlerine kadar 
                  geniş bir yelpazede hizmet sunuyoruz. Her projede müşteri memnuniyetini ön planda tutarak, 
                  <strong className="text-primary"> uzun vadeli başarı</strong> için çözümler üretiyoruz.
                </p>
              </div>
            </motion.div>

            {/* Principles */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-primary/5 to-primary-light/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-soft border border-primary/10"
            >
              <h3 className="text-xl font-semibold text-dark dark:text-light mb-6">Neden Bizi Seçmelisiniz?</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {principles.map((principle, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start text-gray-700 dark:text-gray-300 hover:text-dark dark:hover:text-light transition-colors group"
                  >
                    <span className="mr-3 text-xl group-hover:scale-110 transition-transform">{principle.icon}</span>
                    <span className="text-sm sm:text-base leading-relaxed">{principle.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-soft-lg">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="CodeBA profesyonel yazılım geliştirme ekibi - Modern dijital çözümler ve web tasarım hizmetleri"
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
            
            {/* Statistics Cards - Hidden on mobile, shown on desktop */}
            <div className="absolute -bottom-6 -right-6 hidden lg:grid grid-cols-2 gap-4 w-80">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-soft-lg border border-gray-100/50 dark:border-gray-700/50 text-center"
              >
                <div className="text-3xl font-semibold text-primary mb-1">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Tamamlanan Proje</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-soft-lg border border-gray-100/50 dark:border-gray-700/50 text-center"
              >
                <div className="text-3xl font-semibold text-primary mb-1">100+</div>
                <div className="text-sm text-gray-600">Mutlu Müşteri</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-soft-lg border border-gray-100/50 dark:border-gray-700/50 text-center"
              >
                <div className="text-3xl font-semibold text-primary mb-1">5+</div>
                <div className="text-sm text-gray-600">Yıllık Deneyim</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-soft-lg border border-gray-100/50 dark:border-gray-700/50 text-center"
              >
                <div className="text-3xl font-semibold text-primary mb-1">24/7</div>
                <div className="text-sm text-gray-600">Destek</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
