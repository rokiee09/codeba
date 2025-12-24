import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ServiceCardSkeleton } from './LoadingSkeleton';

const ServiceCard = ({ service, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['3deg', '-3deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-3deg', '3deg']);

  const handleMouseMove = (e) => {
    if (!e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-200 dark:border-gray-700 relative overflow-hidden group h-full flex flex-col"
    >
      {/* Soft gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
      
      <div className="relative z-10 flex flex-col flex-grow">
        {/* Icon with animation */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="text-primary mb-4 md:mb-6 inline-block"
        >
          {service.icon}
        </motion.div>
        <h3 className="text-xl md:text-2xl font-semibold text-dark dark:text-light mb-3 md:mb-4 group-hover:text-primary transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base flex-grow">{service.description}</p>
      </div>

      {/* Subtle corner accent */}
      <div className="absolute bottom-0 right-0 w-20 h-1 bg-gradient-to-r from-transparent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </motion.div>
  );
};

const Services = () => {
  const services = [
    {
      title: 'Web Tasarım & Geliştirme',
      description: 'Kurumsal web siteleri, portföy siteleri ve özel web uygulamaları geliştiriyorum. React, Next.js, Vue.js gibi modern teknolojilerle responsive, hızlı ve SEO uyumlu çözümler sunuyorum. Sıfırdan tasarım veya mevcut sitenizin yenilenmesi - her türlü ihtiyacınıza uygun çözümler üretiyorum.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Mobil Uygulama Geliştirme',
      description: 'Android ve iOS için native ve cross-platform mobil uygulamalar geliştiriyorum. React Native, Flutter ve Swift ile performans odaklı, kullanıcı dostu mobil deneyimler yaratıyorum. App Store ve Play Store yayınlama desteği. Push notification, offline çalışma ve harita entegrasyonu gibi gelişmiş özellikler.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'E-Ticaret Çözümleri',
      description: 'Kapsamlı e-ticaret platformları, ödeme gateway entegrasyonları ve stok yönetim sistemleri geliştiriyorum. WooCommerce, Shopify veya özel çözümlerle güvenli, ölçeklenebilir online mağazalar. Ürün yönetimi, sepet sistemi, ödeme entegrasyonları (iPara, PayTR, Stripe) ve sipariş takibi ile tam donanımlı e-ticaret çözümleri.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      title: 'Özel Yazılım & Yönetim Panelleri',
      description: 'İşletmenizin ihtiyaçlarına özel yazılım çözümleri ve yönetim panelleri tasarlıyorum. CRM sistemleri, ERP entegrasyonları, otomasyon yazılımları ve dashboard\'lar. Node.js, Python, PHP ile güçlü API\'ler ve veritabanı sistemleri. Kullanıcı rol yönetimi, raporlama ve veri analizi ile kapsamlı çözümler.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: 'UI/UX Tasarım',
      description: 'Kullanıcı deneyimi odaklı arayüz tasarımları ve kullanılabilirlik analizi yapıyorum. Figma, Adobe XD ile wireframe, prototipleme ve görsel tasarımlar. Kullanıcı araştırması, persona oluşturma ve testleriyle veriye dayalı tasarım. Modern trendlerle markanızı güçlendiren, erişilebilir arayüzler.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
    {
      title: 'SEO & Dijital Pazarlama',
      description: 'Arama motoru optimizasyonu (SEO), içerik pazarlama ve dijital pazarlama stratejileri. Google Analytics, Search Console ile performans takibi. Keyword araştırması, teknik SEO, içerik optimizasyonu ve link building. Sosyal medya yönetimi, Google Ads ve email pazarlama ile marka bilinirliğinizi güçlendiriyorum.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-dark relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-semibold text-center text-dark dark:text-light mb-4">
            Hizmetlerimiz
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-16 max-w-2xl mx-auto">
            Dijital dönüşüm yolculuğunuzda yanınızdayız
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <>
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
            </>
          ) : (
            services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
