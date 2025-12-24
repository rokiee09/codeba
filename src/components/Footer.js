import React from 'react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark dark:bg-black text-light dark:text-gray-300 py-12 border-t border-gray-800 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <img 
                src="/logo.png" 
                alt="Web Tasarım Logo" 
                className="h-14 sm:h-16 md:h-20 w-auto max-w-[250px] object-contain mb-4"
                style={{
                  imageRendering: 'crisp-edges',
                  WebkitImageRendering: '-webkit-optimize-contrast',
                  maxHeight: '80px',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain'
                }}
                width="250"
                height="80"
                loading="eager"
              />
            </div>
                <p className="text-gray-400 dark:text-gray-500">
                  Modern web tasarım ve yazılım çözümleri ile dijital dünyada
                  markanızı öne çıkarıyoruz.
                </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Hızlı Linkler</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('services');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                      className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-colors"
                >
                  Hizmetler
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('projects');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                      className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-colors"
                >
                  Projeler
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('about');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                      className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-colors"
                >
                  Hakkımızda
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                      className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-colors"
                >
                  İletişim
                </button>
              </li>
            </ul>
          </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">İletişim</h4>
                <ul className="space-y-2 text-gray-400 dark:text-gray-500 mb-4">
                  <li>burakbote11@gmail.com</li>
                  <li>0544 551 93 09</li>
                  <li>Kuşadası, Aydın</li>
                </ul>
                
                {/* Social Media Links */}
                <div className="mt-4">
                  <h5 className="text-sm font-semibold text-gray-300 dark:text-gray-400 mb-3">Bizi Takip Edin</h5>
                  <div className="flex gap-3">
                    <a
                      href="https://www.linkedin.com/company/codeba"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-gray-800 dark:bg-gray-700 hover:bg-primary rounded-lg text-white transition-colors duration-300"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a
                      href="https://github.com/codeba"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-gray-800 dark:bg-gray-700 hover:bg-primary rounded-lg text-white transition-colors duration-300"
                      aria-label="GitHub"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                      </svg>
                    </a>
                    <a
                      href="https://twitter.com/codeba"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-gray-800 dark:bg-gray-700 hover:bg-primary rounded-lg text-white transition-colors duration-300"
                      aria-label="Twitter"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/codeba"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-gray-800 dark:bg-gray-700 hover:bg-primary rounded-lg text-white transition-colors duration-300"
                      aria-label="Instagram"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-xl font-semibold mb-3">Haber Bülteni</h4>
            <p className="text-gray-400 mb-4 text-sm">
              Yeni projelerimiz ve özel tekliflerden haberdar olmak için e-posta adresinizi girin.
            </p>
            <form 
              action="https://formsubmit.co/burakbote11@gmail.com" 
              method="POST"
              className="flex flex-col sm:flex-row gap-3"
            >
              <input type="hidden" name="_subject" value="Newsletter Aboneliği" />
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="email"
                name="email"
                required
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 bg-gray-800 dark:bg-gray-900 border border-gray-700 dark:border-gray-600 rounded-lg text-white dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[44px] text-base"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-light transition-colors whitespace-nowrap min-h-[44px] text-base"
              >
                Abone Ol
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            © {new Date().getFullYear()} CodeBA. Tüm hakları saklıdır.
          </p>
          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-colors flex items-center space-x-2"
          >
            <span>Yukarı Çık</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

