import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import Terminal from './Terminal';
import BlurText from './BlurText';
import ParticlesBackground from './ParticlesBackground';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showTerminal, setShowTerminal] = useState(false);
  const heroRef = useRef(null);

  // Rotating roles — typewriter style
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Spotlight mouse tracking
  useEffect(() => {
    const handleMouse = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative pt-24 pb-4 md:min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dot Grid Background */}
      <div className="absolute inset-0 dot-grid-bg" />
      <ParticlesBackground />

      {/* Spotlight Effect (Desktop) */}
      <div
        className="hidden md:block absolute pointer-events-none"
        style={{
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(136,136,136,0.08) 0%, transparent 70%)',
          transition: 'left 0.1s ease-out, top 0.1s ease-out',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Small Tag */}
        <motion.div variants={item} className="mb-6">
          <span
            className="inline-block px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] rounded-full border"
            style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}
          >
            Available for work
          </span>
        </motion.div>

        {/* Name with Glitch */}
        <motion.h1
          variants={item}
          className="font-grotesk font-bold leading-[1.1] mb-4 glitch-text"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
            color: 'var(--text)',
            letterSpacing: '-0.03em',
          }}
        >
          {personalInfo.name}
        </motion.h1>

        {/* Rotating Role */}
        <motion.div variants={item} className="mb-6 h-10 overflow-hidden">
          <motion.p
            key={roleIndex}
            className="font-grotesk font-medium"
            style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
              color: 'var(--muted)',
            }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {personalInfo.roles[roleIndex]}
          </motion.p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="text-balance max-w-xl mx-auto mb-10"
          style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            color: 'var(--muted)',
            lineHeight: 1.7,
          }}
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              const el = document.getElementById('projects');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary shimmer-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m9 12 2 2 4-4"/></svg>
            View Projects
          </button>
          <a
            href="https://drive.google.com/drive/folders/11me8gu8WPKsLA54sWyWMm0BTs-1NGlLh?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <BlurText text="View Resume" delay={40} direction="top" />
          </a>
          <button
            onClick={() => setShowTerminal(true)}
            className="btn-outline font-mono"
            aria-label="Open Terminal"
          >
            &gt;_
          </button>
        </motion.div>
        {/* Scroll Indicator - Desktop Only */}
        <motion.div
          className="hidden md:block mt-20"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" className="mx-auto opacity-40">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </motion.div>
      </motion.div>

      {/* Terminal Modal */}
      {showTerminal && <Terminal onClose={() => setShowTerminal(false)} />}
    </section>
  );
}
