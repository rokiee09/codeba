import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 dark:bg-dark/90 backdrop-blur-2xl shadow-soft border-b border-gray-200/30 dark:border-gray-700/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity group p-2 -ml-2 rounded-lg hover:bg-white/10"
            >
              <div className="relative">
                <img 
                  src={`${process.env.PUBLIC_URL}/logo.png`} 
                  alt="Web Tasarım Logo" 
                  className="h-12 sm:h-14 md:h-16 w-auto object-contain relative z-10"
                  style={{
                    imageRendering: 'high-quality',
                    WebkitImageRendering: '-webkit-optimize-contrast',
                    maxHeight: '64px',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain'
                  }}
                  width="200"
                  height="64"
                  loading="eager"
                />
              </div>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection('services')}
                className={`hover:text-primary transition-colors font-medium ${
                  isScrolled ? 'text-dark dark:text-light' : 'text-white'
                }`}
              >
                Hizmetler
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className={`hover:text-primary transition-colors font-medium ${
                  isScrolled ? 'text-dark dark:text-light' : 'text-white'
                }`}
              >
                Projeler
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`hover:text-primary transition-colors font-medium ${
                  isScrolled ? 'text-dark dark:text-light' : 'text-white'
                }`}
              >
                Hakkımızda
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`hover:text-primary transition-colors font-medium ${
                  isScrolled ? 'text-dark dark:text-light' : 'text-white'
                }`}
              >
                İletişim
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`focus:outline-none transition-colors ${
                    isScrolled ? 'text-dark dark:text-light' : 'text-white'
              }`}
              aria-label="Menü"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
            <div className="md:hidden bg-white/95 dark:bg-dark/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <button
              onClick={() => scrollToSection('services')}
                  className="block w-full text-left px-4 py-2 text-dark dark:text-light hover:bg-primary/10 hover:text-primary rounded-xl transition-all duration-300"
            >
              Hizmetler
            </button>
            <button
              onClick={() => scrollToSection('projects')}
                  className="block w-full text-left px-4 py-2 text-dark dark:text-light hover:bg-primary/10 hover:text-primary rounded-xl transition-all duration-300"
            >
              Projeler
            </button>
            <button
              onClick={() => scrollToSection('about')}
                  className="block w-full text-left px-4 py-2 text-dark dark:text-light hover:bg-primary/10 hover:text-primary rounded-xl transition-all duration-300"
            >
              Hakkımızda
            </button>
            <button
              onClick={() => scrollToSection('contact')}
                  className="block w-full text-left px-4 py-2 text-dark dark:text-light hover:bg-primary/10 hover:text-primary rounded-xl transition-all duration-300"
            >
              İletişim
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

