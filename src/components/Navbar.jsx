import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { navLinks } from '../data/portfolioData';
import DecryptedText from './DecryptedText';

export default function Navbar() {
  const { isDark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 20);

      const sections = navLinks.map((link) => link.href.substring(1));
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section;
            break;
          }
        }
      }
      if (currentScrollY < 100) current = '';
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const logoSize = scrolled ? 'clamp(0.95rem, 3vw, 1.35rem)' : 'clamp(1rem, 3vw, 1.5rem)';
  const buttonSize = scrolled ? 'clamp(28px, 4vw, 34px)' : 'clamp(32px, 5vw, 40px)';
  const navGapClass = scrolled ? 'gap-2 sm:gap-3 md:gap-8' : 'gap-2.5 sm:gap-4 md:gap-8';
  const navHeightClass = scrolled ? 'h-12 sm:h-14 md:h-20' : 'h-14 sm:h-16 md:h-20';

  return (
    <>
      {/* Scroll Progress */}
      <div className="scroll-progress" />

      <nav
        className={`fixed inset-x-4 md:inset-x-0 z-50 transition-all duration-300 rounded-full md:rounded-none border md:border-0 ${
          scrolled
            ? 'top-4 md:top-0 glassmorphism shadow-lg border-[rgba(255,255,255,0.12)] md:border-transparent scale-95 md:scale-100'
            : 'top-0 bg-transparent border-transparent scale-100'
        }`}
        style={{ backdropFilter: scrolled ? 'blur(24px)' : 'none' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between ${navHeightClass}`}>

            {/* Left — Name */}
            <motion.a
              href="#"
              className="font-grotesk font-bold tracking-tight shrink-0 transition-all duration-300"
              style={{
                color: 'var(--text)',
                fontSize: logoSize,
              }}
              whileHover={{ scale: 1.03 }}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              TK<span style={{ color: 'var(--muted)' }}>.</span>
            </motion.a>

            {/* Center — Nav Links (always visible, compressed on mobile) */}
            <div className={`flex items-center ${navGapClass} overflow-x-auto no-scrollbar pt-1.5 pb-1`}>
              {navLinks.map((link) => {
                const sectionId = link.href.substring(1);
                const isActive = activeSection === sectionId;
                
                return (
                  <button
                    key={link.name}
                    onClick={() => scrollTo(link.href)}
                    className="relative font-medium uppercase tracking-wide group whitespace-nowrap transition-colors duration-200"
                    style={{
                      color: isActive ? 'var(--text)' : 'var(--muted)',
                      fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                      padding: '4px 2px',
                    }}
                  >
                    <span className="transition-colors duration-200 group-hover:text-[var(--text)]">
                      <DecryptedText 
                        text={link.name} 
                        speed={40} 
                        maxIterations={10} 
                        animateOn="hover"
                      />
                    </span>
                    <span 
                      className={`absolute -bottom-0.5 left-0 h-[2px] bg-[var(--text)] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} 
                    />
                  </button>
                );
              })}
            </div>

            {/* Right — Theme Toggle */}
            <motion.button
              onClick={toggle}
              className="shrink-0 flex items-center justify-center rounded-full border transition-all duration-200"
              style={{
                borderColor: 'var(--border)',
                color: 'var(--text)',
                width: buttonSize,
                height: buttonSize,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              <motion.div
                key={isDark ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4"/>
                    <path d="M12 2v2"/><path d="M12 20v2"/>
                    <path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/>
                    <path d="M2 12h2"/><path d="M20 12h2"/>
                    <path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                  </svg>
                )}
              </motion.div>
            </motion.button>

          </div>
        </div>
      </nav>
    </>
  );
}
