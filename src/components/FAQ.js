import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'Web sitesi geliştirme süreci ne kadar sürer?',
      answer: 'Proje kapsamına göre değişmekle birlikte, basit kurumsal web siteleri 2-4 hafta, e-ticaret siteleri 4-8 hafta, özel yazılım projeleri ise 2-6 ay arasında tamamlanmaktadır. Detaylı zaman çizelgesi için ücretsiz danışmanlık alabilirsiniz.',
      category: 'Genel'
    },
    {
      question: 'Mobil uyumlu tasarım dahil mi?',
      answer: 'Evet, tüm web sitelerimiz responsive (mobil uyumlu) olarak tasarlanır. Mobil, tablet ve masaüstü cihazlarda mükemmel görünüm ve kullanıcı deneyimi sağlanır.',
      category: 'Teknik'
    },
    {
      question: 'SEO optimizasyonu yapılıyor mu?',
      answer: 'Evet, tüm projelerimizde temel SEO optimizasyonu dahildir. Meta etiketleri, hızlı yükleme, mobil uyumluluk, yapılandırılmış veri (Schema.org) ve içerik optimizasyonu gibi SEO best practice\'leri uygulanır.',
      category: 'SEO'
    },
    {
      question: 'Proje sonrası destek sağlanıyor mu?',
      answer: 'Evet, proje tesliminden sonra 1 ay ücretsiz teknik destek sağlıyoruz. Ayrıca aylık bakım ve güncelleme paketlerimiz mevcuttur. 7/24 destek için paketlerimizi inceleyebilirsiniz.',
      category: 'Destek'
    },
    {
      question: 'Ödeme planlaması nasıl yapılıyor?',
      answer: 'Genellikle %50 başlangıç ödemesi, %50 teslimat ödemesi şeklinde çalışıyoruz. Büyük projelerde 3-4 taksitli ödeme planı da sunuyoruz. Detaylı ödeme planı için teklif alabilirsiniz.',
      category: 'Ödeme'
    },
    {
      question: 'Hangi teknolojileri kullanıyorsunuz?',
      answer: 'Modern ve güncel teknolojiler kullanıyoruz: React, Next.js, Vue.js (Frontend), Node.js, Python, PHP (Backend), React Native, Flutter (Mobil), MongoDB, PostgreSQL (Veritabanı). Proje ihtiyacına göre en uygun teknoloji stack\'i seçiyoruz.',
      category: 'Teknik'
    },
    {
      question: 'E-ticaret sitesi için ödeme entegrasyonları yapılıyor mu?',
      answer: 'Evet, iPara, PayTR, Stripe, PayPal gibi popüler ödeme gateway\'lerini entegre ediyoruz. Ayrıca banka ödeme entegrasyonları (Garanti, İş Bankası, Ziraat Bankası vb.) da yapılabilir.',
      category: 'E-Ticaret'
    },
    {
      question: 'İçerik yönetim sistemi (CMS) sağlıyor musunuz?',
      answer: 'Evet, tüm web sitelerimizde kullanıcı dostu admin paneli sağlıyoruz. İçerik, görsel, ürün, blog yazıları gibi tüm içerikleri kolayca yönetebilirsiniz. Eğitim ve dokümantasyon da sağlıyoruz.',
      category: 'Genel'
    }
  ];

  const categories = ['Tümü', 'Genel', 'Teknik', 'SEO', 'Destek', 'Ödeme', 'E-Ticaret'];
  const [activeCategory, setActiveCategory] = useState('Tümü');

  const filteredFAQs = activeCategory === 'Tümü'
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            SSS
          </span>
          <h2 className="text-4xl sm:text-5xl font-semibold text-dark dark:text-light mb-4">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Merak ettiğiniz soruların yanıtları burada
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setOpenIndex(0);
              }}
              className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm sm:text-base min-h-[44px] ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset group"
              >
                <span className="font-semibold text-dark dark:text-light text-base sm:text-lg pr-4 group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <motion.svg
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-5 h-5 text-primary flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 pt-0">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Sorunuz mu var? Bizimle iletişime geçin!
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-light transition-colors duration-300 shadow-md hover:shadow-lg min-h-[44px]"
          >
            İletişime Geç
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;



