import React from 'react';
import { motion } from 'framer-motion';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '5.000',
      period: 'Tek Seferlik',
      description: 'Küçük işletmeler ve kişisel projeler için ideal başlangıç paketi',
      features: [
        '5 Sayfa Web Sitesi',
        'Responsive Tasarım',
        'SEO Temel Optimizasyon',
        '1 Yıl Hosting & Domain',
        'İçerik Yönetim Paneli',
        'Email Desteği',
        '1 Aylık Ücretsiz Destek'
      ],
      popular: false,
      cta: 'Paketi Seç'
    },
    {
      name: 'Professional',
      price: '12.000',
      period: 'Tek Seferlik',
      description: 'Gelişen işletmeler için kapsamlı web çözümü',
      features: [
        '10 Sayfa Web Sitesi',
        'Premium Tasarım',
        'Gelişmiş SEO Optimizasyon',
        '1 Yıl Hosting & Domain',
        'Gelişmiş Yönetim Paneli',
        'Sosyal Medya Entegrasyonu',
        'İletişim Formu',
        'Google Analytics Entegrasyonu',
        '3 Aylık Ücretsiz Destek',
        'Özel Eğitim'
      ],
      popular: true,
      cta: 'En Popüler'
    },
    {
      name: 'Enterprise',
      price: 'Özel Fiyat',
      period: 'Teklif Alın',
      description: 'Büyük ölçekli işletmeler için özel çözümler',
      features: [
        'Sınırsız Sayfa',
        'Özel Tasarım & Geliştirme',
        'Tam SEO Paketi',
        'E-Ticaret Entegrasyonu',
        'Özel Yönetim Paneli',
        'API Entegrasyonları',
        'Çoklu Dil Desteği',
        'Özel Eğitim & Dokümantasyon',
        '6 Aylık Ücretsiz Destek',
        'Öncelikli Destek Hattı',
        'Aylık Bakım Paketi Seçeneği'
      ],
      popular: false,
      cta: 'Teklif Al'
    }
  ];

  return (
    <section id="pricing" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Fiyatlandırma
          </span>
          <h2 className="text-4xl sm:text-5xl font-semibold text-dark dark:text-light mb-4">
            Size Uygun Paketi Seçin
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            İhtiyacınıza göre esnek fiyatlandırma seçenekleri
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 ${
                plan.popular
                  ? 'border-primary scale-105 md:scale-110'
                  : 'border-gray-200 dark:border-gray-700'
              } overflow-hidden`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-xl text-sm font-semibold">
                  En Popüler
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-dark dark:text-light mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-primary">
                      {plan.price.includes('Özel') ? plan.price : `₺${plan.price}`}
                    </span>
                    {!plan.price.includes('Özel') && (
                      <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                        / {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 min-h-[44px] ${
                    plan.popular
                      ? 'bg-primary text-white hover:bg-primary-light shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 dark:bg-gray-700 text-dark dark:text-light hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>

              {/* Gradient overlay for popular plan */}
              {plan.popular && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Özel ihtiyaçlarınız mı var? Bizimle iletişime geçin, size özel teklif hazırlayalım.
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3 bg-primary/10 text-primary rounded-xl font-semibold hover:bg-primary/20 transition-colors duration-300 border border-primary/20 min-h-[44px]"
          >
            Özel Teklif Al
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;



