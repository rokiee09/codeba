import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Tümü');

  const projects = [
    {
      title: 'Kurumsal Web Tasarım',
      description: 'Modern arayüz, hızlı yapı ve güçlü SEO altyapısı.',
      detailedDescription: 'Kurumsal kimliğinize uygun, modern ve profesyonel web siteleri tasarlıyoruz. Responsive tasarım ile tüm cihazlarda mükemmel görünüm, hızlı yükleme süreleri ve SEO optimizasyonu ile arama motorlarında üst sıralarda yer alın. Kullanıcı deneyimi odaklı arayüzler ile ziyaretçilerinizi etkileyin.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
      category: 'Web',
      tags: ['React', 'SEO', 'Modern UI'],
      features: [
        'Responsive tasarım (mobil, tablet, desktop)',
        'SEO optimizasyonu ve hızlı yükleme',
        'Modern ve kullanıcı dostu arayüz',
        'Güvenlik ve performans optimizasyonu',
        'İçerik yönetim sistemi entegrasyonu'
      ],
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'SEO Tools']
    },
    {
      title: 'Mobil Uygulama UI',
      description: 'Kullanıcı dostu ekran akışları ve sade tasarım.',
      detailedDescription: 'Android ve iOS platformları için native ve cross-platform mobil uygulamalar geliştiriyoruz. Modern UI/UX prensipleriyle tasarlanmış, performans odaklı ve kullanıcı dostu uygulamalar. App Store ve Google Play Store yayınlama süreçlerinde de destek sağlıyoruz.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      category: 'Mobil',
      tags: ['React Native', 'UI/UX', 'Mobile'],
      features: [
        'Native ve cross-platform geliştirme',
        'Modern UI/UX tasarım prensipleri',
        'Yüksek performans ve optimizasyon',
        'Offline çalışma desteği',
        'App Store ve Play Store yayınlama'
      ],
      technologies: ['React Native', 'Flutter', 'Firebase', 'Redux', 'Native APIs']
    },
    {
      title: 'E-Ticaret Platformu',
      description: 'Güvenli ve ölçeklenebilir online mağaza çözümleri.',
      detailedDescription: 'Modern e-ticaret platformları geliştiriyoruz. Güvenli ödeme entegrasyonları, stok yönetimi, sipariş takibi ve müşteri yönetimi özellikleri ile tam donanımlı online mağazalar. WooCommerce, Shopify veya özel çözümlerle ihtiyacınıza uygun e-ticaret deneyimleri.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      category: 'E-Ticaret',
      tags: ['E-Commerce', 'Payment', 'Shopify'],
      features: [
        'Güvenli ödeme gateway entegrasyonları',
        'Ürün ve stok yönetim sistemi',
        'Sepet ve sipariş takibi',
        'Müşteri yönetim paneli',
        'SEO ve pazarlama araçları'
      ],
      technologies: ['React', 'Node.js', 'Stripe', 'MongoDB', 'Express']
    },
    {
      title: 'Yönetim Paneli',
      description: 'Veri yönetimi, kullanıcı rolleri ve dashboard ekranları.',
      detailedDescription: 'İşletmenizin ihtiyaçlarına özel yönetim panelleri ve admin sistemleri tasarlıyoruz. Güvenli kullanıcı yönetimi, detaylı raporlama, veri görselleştirme ve otomasyon özellikleri ile iş süreçlerinizi kolaylaştırın. Karmaşık verileri anlaşılır dashboard ekranları ile yönetin.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      category: 'Dashboard',
      tags: ['Dashboard', 'Admin Panel', 'Data'],
      features: [
        'Kullanıcı rol ve yetki yönetimi',
        'Detaylı raporlama ve analitik',
        'Veri görselleştirme ve grafikler',
        'Güvenli API entegrasyonları',
        'Otomatik bildirim ve raporlama sistemi'
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Chart.js', 'JWT Auth']
    },
    {
      title: 'UI/UX Tasarım Projesi',
      description: 'Kullanıcı deneyimi odaklı arayüz tasarımları.',
      detailedDescription: 'Modern ve kullanıcı dostu arayüz tasarımları yapıyoruz. Figma ve Adobe XD ile wireframe, prototipleme ve görsel tasarımlar. Kullanıcı araştırması ve testleriyle veriye dayalı tasarım kararları alarak markanızı güçlendiren tasarımlar oluşturuyoruz.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      category: 'Tasarım',
      tags: ['UI/UX', 'Figma', 'Design'],
      features: [
        'Kullanıcı araştırması ve persona oluşturma',
        'Wireframe ve prototipleme',
        'Görsel tasarım ve brand identity',
        'Kullanılabilirlik testleri',
        'Responsive tasarım sistemleri'
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle']
    },
    {
      title: 'Landing Page',
      description: 'Yüksek dönüşüm oranlı landing page tasarımları.',
      detailedDescription: 'Hedef kitlenize etkili şekilde ulaşan, yüksek dönüşüm oranlı landing page\'ler tasarlıyoruz. A/B testleri, conversion optimization ve SEO teknikleri ile pazarlama kampanyalarınızın başarısını artırıyoruz.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      category: 'Web',
      tags: ['Landing Page', 'Marketing', 'Conversion'],
      features: [
        'Yüksek dönüşüm oranı odaklı tasarım',
        'A/B test entegrasyonu',
        'SEO optimizasyonu',
        'Hızlı yükleme süreleri',
        'Responsive ve mobil uyumlu'
      ],
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'Google Analytics', 'A/B Testing']
    },
  ];

  const categories = ['Tümü', ...new Set(projects.map(p => p.category))];
  const filteredProjects = activeFilter === 'Tümü' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

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
    hidden: { opacity: 0, y: 30 },
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
    <section id="projects" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-semibold text-dark mb-4">
            Portföy
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Başarıyla tamamladığımız projelerden örnekler
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProject(project)}
                className="project-card bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-500 group cursor-pointer"
              >
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={`${project.title} projesi - ${project.description}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Dark overlay on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/60 to-transparent"
                ></motion.div>
                
                {/* Text overlay on hover */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="text-center px-6">
                    <h3 className="text-2xl font-semibold text-white mb-2">{project.title}</h3>
                  </div>
                </motion.div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-dark mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium group-hover:bg-gray-200 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-50"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-y-auto"
            >
              <div className="min-h-full flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full relative">
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Project Image */}
                  <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
                    <img
                      src={selectedProject.image}
                      alt={`${selectedProject.title} - ${selectedProject.description}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 md:p-8">
                    <h2 className="text-3xl md:text-4xl font-semibold text-dark mb-4">
                      {selectedProject.title}
                    </h2>
                    
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {selectedProject.detailedDescription}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-dark mb-4">Özellikler</h3>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-dark mb-4">Kullanılan Teknolojiler</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                      {selectedProject.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
