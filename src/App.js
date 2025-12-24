import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Projects from './components/Projects';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Partners from './components/Partners';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import CookieConsent from './components/CookieConsent';
import DarkModeToggle from './components/DarkModeToggle';
import WhatsAppWidget from './components/WhatsAppWidget';
import ExitIntentPopup from './components/ExitIntentPopup';

function App() {
  return (
    <div className="App">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Pricing />
        <Projects />
        <About />
        <Testimonials />
        <Partners />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <DarkModeToggle />
      <WhatsAppWidget />
      <ExitIntentPopup />
      <CookieConsent />
    </div>
  );
}

export default App;

