import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      company: 'TechCorp A.Ş.',
      role: 'CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
      comment: 'CodeBA ile çalışmak harika bir deneyimdi. Web sitemiz profesyonel ve kullanıcı dostu. Projeyi zamanında teslim ettiler ve sürekli iletişim halindeydik.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Ayşe Demir',
      company: 'Dijital Medya',
      role: 'Kurucu',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
      comment: 'Mobil uygulamamızı geliştirmeleri için CodeBA\'yı tercih ettik. Sonuç mükemmel oldu! Kullanıcılarımız uygulamayı çok sevdi. Kesinlikle tavsiye ederim.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Mehmet Kaya',
      company: 'E-Ticaret Plus',
      role: 'İş Geliştirme Müdürü',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
      comment: 'E-ticaret platformumuz için çok profesyonel bir çözüm sundular. Ödeme entegrasyonları ve yönetim paneli tam istediğimiz gibi. Çok memnunuz!',
      rating: 5,
    },
  ];

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
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section id="testimonials" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-dark relative overflow-hidden">
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
            Müşteri Yorumları
          </span>
          <h2 className="text-4xl sm:text-5xl font-semibold text-dark dark:text-light mb-4">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Başarılarımızı müşteri memnuniyeti ile ölçüyoruz
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700 group"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                "{testimonial.comment}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name} - ${testimonial.role} at ${testimonial.company}`}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <div className="font-semibold text-dark dark:text-light">{testimonial.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

