import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import BlurText from './BlurText';
import ParticlesBackground from './ParticlesBackground';
import tarunPhoto from '../assets/tarunphoto.jpeg';

const badges = ['React', 'JavaScript', 'Node.js', 'TypeScript', 'Tailwind CSS', 'MongoDB'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [leetcodeSolved, setLeetcodeSolved] = useState(null);
  const [githubCommits, setGithubCommits] = useState(null);
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

  // Fetch LeetCode and GitHub stats
  useEffect(() => {
    fetch('https://leetcode-api-faisalshohag.vercel.app/Tarun_kulakarni/')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.totalSolved === 'number') {
          setLeetcodeSolved(data.totalSolved);
        }
      })
      .catch((err) => console.error('Error fetching LeetCode stats:', err));

    fetch('https://github-contributions-api.jogruber.de/v4/tarunkulkarni4')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.total) {
          const sum = Object.values(data.total).reduce((acc, val) => acc + val, 0);
          setGithubCommits(sum);
        }
      })
      .catch((err) => console.error('Error fetching GitHub stats:', err));
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative pt-24 pb-12 min-h-screen flex items-center justify-center overflow-hidden"
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

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto">
        
        {/* DESKTOP LAYOUT (md and up) */}
        <div className="hidden md:grid grid-cols-12 gap-12 lg:gap-16 items-center min-h-[calc(100vh-160px)]">
          {/* Left Column: Details */}
          <motion.div
            className="col-span-7 flex flex-col items-start text-left"
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
                fontSize: 'clamp(3rem, 5vw, 4.5rem)',
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
                className="font-grotesk font-medium text-xl"
                style={{ color: 'var(--muted)' }}
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
              className="text-balance max-w-xl mb-4 font-semibold text-lg"
              style={{ color: 'var(--text)', lineHeight: 1.5 }}
            >
              {personalInfo.tagline}
            </motion.p>

            {/* Biography */}
            <motion.p
              variants={item}
              className="leading-relaxed mb-6 max-w-xl text-sm"
              style={{ color: 'var(--muted)', lineHeight: 1.6 }}
            >
              {personalInfo.bio}
            </motion.p>

            {/* Badges */}
            <motion.div variants={item} className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <motion.span
                  key={badge}
                  className="px-3 py-1.5 text-xs font-medium rounded-full border cursor-default"
                  style={{
                    color: 'var(--text)',
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--card-bg)',
                  }}
                  whileHover={{ scale: 1.05, borderColor: 'var(--text)' }}
                  transition={{ duration: 0.15 }}
                >
                  {badge}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Photo & CTAs & Stats */}
          <motion.div
            className="col-span-5 flex flex-col items-center justify-center text-center"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Avatar */}
            <motion.div variants={item} className="mb-6">
              <div className="gradient-border w-44 h-44 flex-shrink-0 relative group">
                <img
                  src={tarunPhoto}
                  alt="Tarun Kulkarni"
                  className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="flex items-center justify-center gap-3 w-full max-w-sm mb-6">
              <button
                onClick={() => {
                  const el = document.getElementById('projects');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary shimmer-btn flex-1 justify-center py-3 min-h-[48px] rounded-xl text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                View Projects
              </button>
              <a
                href="https://drive.google.com/drive/folders/11me8gu8WPKsLA54sWyWMm0BTs-1NGlLh?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex-1 justify-center py-3 min-h-[48px] rounded-xl text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                View Resume
              </a>
            </motion.div>

            {/* Zigzag connection to stats */}
            <motion.div 
              variants={item} 
              className="flex items-center justify-center gap-3 mt-6 mb-4 w-full outfit-font"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-h)]">
                Apart from this, solved DSA problems
              </span>
              <svg width="60" height="14" viewBox="0 0 60 14" fill="none" className="opacity-80">
                <path 
                  d="M0 7 L8 2 L16 12 L24 2 L32 12 L40 2 L48 12 L54 7 L60 7" 
                  stroke="var(--accent)" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <polygon points="60,7 54,4 54,10" fill="var(--accent)" />
              </svg>
            </motion.div>

            {/* Stats Badges */}
            <motion.div 
              variants={item} 
              className="flex flex-wrap items-center justify-center gap-2.5 w-full"
            >
              <a 
                href="https://leetcode.com/u/Tarun_kulakarni/"
                target="_blank"
                rel="noopener noreferrer"
                className="left-stats-link leetcode"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.177 9.178a1.374 1.374 0 0 0-.001 1.94l1.376 1.377a1.375 1.375 0 0 0 1.943-.005l7.9-7.9 1.377 1.376-7.854 7.854a1.375 1.375 0 0 0-.001 1.94l1.377 1.376a1.375 1.375 0 0 0 1.94-.002l7.856-7.855 1.378 1.377-7.858 7.853a1.375 1.375 0 0 0-.001 1.94l1.378 1.376a1.375 1.375 0 0 0 1.94-.002l10.53-10.53a1.374 1.374 0 0 0-.962-2.348H13.483z" />
                </svg>
                <span>{leetcodeSolved !== null ? leetcodeSolved : '281'}+ Solved on LeetCode</span>
                <span className="arrow-icon">→</span>
              </a>

              <a 
                href="https://github.com/tarunkulkarni4"
                target="_blank"
                rel="noopener noreferrer"
                className="left-stats-link github"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span>{githubCommits !== null ? githubCommits : '107'}+ Commits on GitHub</span>
                <span className="arrow-icon">→</span>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* MOBILE LAYOUT (less than md) */}
        <div className="block md:hidden pt-8 pb-12">
          <motion.div
            className="flex flex-col items-center text-center"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* 1. Avatar (Top) */}
            <motion.div variants={item} className="mb-6">
              <div className="gradient-border w-36 h-36 flex-shrink-0 relative">
                <img
                  src={tarunPhoto}
                  alt="Tarun Kulkarni"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </motion.div>

            {/* 2. Available Tag */}
            <motion.div variants={item} className="mb-4">
              <span
                className="inline-block px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] rounded-full border"
                style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}
              >
                Available for work
              </span>
            </motion.div>

            {/* 3. Name */}
            <motion.h1
              variants={item}
              className="font-grotesk font-bold leading-[1.2] mb-3 glitch-text"
              style={{
                fontSize: '2.4rem',
                color: 'var(--text)',
                letterSpacing: '-0.03em',
              }}
            >
              {personalInfo.name}
            </motion.h1>

            {/* 4. Rotating Role */}
            <motion.div variants={item} className="mb-4 h-8 overflow-hidden">
              <motion.p
                key={roleIndex}
                className="font-grotesk font-medium text-md"
                style={{ color: 'var(--muted)' }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {personalInfo.roles[roleIndex]}
              </motion.p>
            </motion.div>

            {/* 5. Tagline */}
            <motion.p
              variants={item}
              className="text-balance max-w-md mb-3 font-semibold text-sm px-2"
              style={{ color: 'var(--text)', lineHeight: 1.4 }}
            >
              {personalInfo.tagline}
            </motion.p>

            {/* 6. Bio */}
            <motion.p
              variants={item}
              className="leading-relaxed mb-6 max-w-md text-xs px-2"
              style={{ color: 'var(--muted)', lineHeight: 1.6 }}
            >
              {personalInfo.bio}
            </motion.p>
            
            {/* 7. Badges */}
            <motion.div variants={item} className="flex flex-wrap justify-center gap-1.5 mb-6 px-2">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-1 text-[10px] font-medium rounded-full border"
                  style={{
                    color: 'var(--text)',
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--card-bg)',
                  }}
                >
                  {badge}
                </span>
              ))}
            </motion.div>

            {/* 8. CTA Buttons (Bottom) */}
            <motion.div variants={item} className="flex items-center justify-center gap-3 w-full max-w-xs px-2 mb-6">
              <button
                onClick={() => {
                  const el = document.getElementById('projects');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary shimmer-btn flex-1 justify-center py-2.5 min-h-[44px] rounded-xl text-xs"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                View Projects
              </button>
              <a
                href="https://drive.google.com/drive/folders/11me8gu8WPKsLA54sWyWMm0BTs-1NGlLh?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex-1 justify-center py-2.5 min-h-[44px] rounded-xl text-xs"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                View Resume
              </a>
            </motion.div>

            {/* Zigzag connection to stats (Mobile) */}
            <motion.div 
              variants={item} 
              className="flex items-center gap-2 mb-4 w-full justify-center outfit-font px-2"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-h)]">
                Apart from this, solved DSA problems
              </span>
              <svg width="50" height="10" viewBox="0 0 50 10" fill="none" className="opacity-80">
                <path 
                  d="M0 5 L7 2 L14 8 L21 2 L28 8 L35 2 L42 5 L50 5" 
                  stroke="var(--accent)" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <polygon points="50,5 45,3 45,7" fill="var(--accent)" />
              </svg>
            </motion.div>

            {/* Stats links below (Mobile) */}
            <motion.div variants={item} className="flex flex-wrap justify-center gap-2 mb-8 px-2">
              <a 
                href="https://leetcode.com/u/Tarun_kulakarni/"
                target="_blank"
                rel="noopener noreferrer"
                className="left-stats-link leetcode"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.177 9.178a1.374 1.374 0 0 0-.001 1.94l1.376 1.377a1.375 1.375 0 0 0 1.943-.005l7.9-7.9 1.377 1.376-7.854 7.854a1.375 1.375 0 0 0-.001 1.94l1.377 1.376a1.375 1.375 0 0 0 1.94-.002l7.856-7.855 1.378 1.377-7.858 7.853a1.375 1.375 0 0 0-.001 1.94l1.378 1.376a1.375 1.375 0 0 0 1.94-.002l10.53-10.53a1.374 1.374 0 0 0-.962-2.348H13.483z" />
                </svg>
                <span>{leetcodeSolved !== null ? leetcodeSolved : '281'}+ Solved on LeetCode</span>
                <span className="arrow-icon">→</span>
              </a>

              <a 
                href="https://github.com/tarunkulkarni4"
                target="_blank"
                rel="noopener noreferrer"
                className="left-stats-link github"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span>{githubCommits !== null ? githubCommits : '107'}+ Commits on GitHub</span>
                <span className="arrow-icon">→</span>
              </a>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="hidden md:block mt-8 pb-4"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" className="mx-auto opacity-40">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>


    </section>
  );
}
