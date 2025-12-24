import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
    // Clear submit status when user starts typing
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Adınız gereklidir';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-posta gereklidir';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mesaj gereklidir';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mesaj en az 10 karakter olmalıdır';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // FormSubmit will handle the submission
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // If form submission is successful (FormSubmit handles it)
      setSubmitStatus('success');
      setFormData({ name: '', email: '', projectType: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary via-primary-light to-purple-400 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-semibold text-white mb-4">
            Bizimle İletişime Geçin
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Projenizle ilgili bilgi almak veya fiyat teklifi oluşturmak için formu doldurmanız yeterlidir.
            <br />
            <span className="text-white/80">Kısa sürede geri dönüş sağlıyorum.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form - Glassmorphism */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-soft-lg border border-white/20"
          >
            <form
              action="https://formsubmit.co/burakbote11@gmail.com"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="Yeni İletişim Formu Mesajı" />
              
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Adınız
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-5 py-4 bg-white/20 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all duration-300 outline-none text-white placeholder-white/60 ${
                    errors.name ? 'border-red-400 focus:border-red-400' : 'border-white/30 focus:border-white/50'
                  }`}
                  placeholder="Adınız"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-300">{errors.name}</p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-5 py-4 bg-white/20 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all duration-300 outline-none text-white placeholder-white/60 ${
                    errors.email ? 'border-red-400 focus:border-red-400' : 'border-white/30 focus:border-white/50'
                  }`}
                  placeholder="ornek@email.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-300">{errors.email}</p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="projectType" className="block text-white font-medium mb-2">
                  Proje Türü
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-white/50 focus:bg-white/30 focus:border-white/50 transition-all duration-300 outline-none text-white"
                >
                  <option value="" className="text-dark">Proje türü seçin</option>
                  <option value="web-tasarim" className="text-dark">Web Tasarım</option>
                  <option value="mobil-uygulama" className="text-dark">Mobil Uygulama</option>
                  <option value="ozel-yazilim" className="text-dark">Özel Yazılım</option>
                  <option value="yonetim-paneli" className="text-dark">Yönetim Paneli</option>
                  <option value="diger" className="text-dark">Diğer</option>
                </select>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Açıklama
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className={`w-full px-5 py-4 bg-white/20 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all duration-300 outline-none resize-none text-white placeholder-white/60 ${
                    errors.message ? 'border-red-400 focus:border-red-400' : 'border-white/30 focus:border-white/50'
                  }`}
                  placeholder="Projeniz hakkında detaylı bilgi verin..."
                ></textarea>
                {errors.message && (
                  <p className="mt-2 text-sm text-red-300">{errors.message}</p>
                )}
              </motion.div>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/90 backdrop-blur-sm border border-green-400/50 text-white px-5 py-4 rounded-xl"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.</span>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/90 backdrop-blur-sm border border-red-400/50 text-white px-5 py-4 rounded-xl"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>Bir hata oluştu. Lütfen tekrar deneyin.</span>
                  </div>
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className="w-full bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg shadow-soft-lg hover:shadow-soft transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Gönderiliyor...
                    </span>
                  ) : (
                    <>
                      <span className="relative z-10">Mesaj Gönder</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-light/20 via-primary/20 to-primary-light/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col justify-center space-y-8"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 text-white border border-white/20 shadow-soft-lg"
            >
              <h3 className="text-2xl font-semibold mb-8">İletişim Bilgileri</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div className="font-semibold mb-1">E-posta</div>
                    <div className="text-white/80">burakbote11@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <div className="font-semibold mb-1">Telefon</div>
                    <div className="text-white/80">0544 551 93 09</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <div className="font-semibold mb-1">Adres</div>
                    <div className="text-white/80">Kuşadası, Aydın</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Contact;
