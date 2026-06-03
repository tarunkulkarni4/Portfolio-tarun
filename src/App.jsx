import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import GithubWidget from './components/GithubWidget';
import './App.css';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left bg-white/20"
      style={{ scaleX }}
    />
  );
}

function CursorGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX - 150, y: e.clientY - 150 });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      className="cursor-glow hidden md:block"
      style={{ left: pos.x, top: pos.y, transform: 'translate(0, 0)' }}
    />
  );
}

function Footer() {
  return (
    <footer
      className="text-center py-8 border-t"
      style={{ borderColor: 'var(--border)', color: 'var(--muted)', fontSize: '0.8rem' }}
    >
      <p>
        Crafted with <span style={{ color: 'var(--text)' }}>♥</span> by{' '}
        <span className="font-semibold" style={{ color: 'var(--text)' }}>
          Tarun Kulakarni
        </span>{' '}
        — {new Date().getFullYear()}
      </p>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        // More robust scroll calculation that accounts for layout and sticky navbar
        const elementPosition = projectsSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - 60;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 5000); // Scroll after 5 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <ThemeProvider>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <GithubWidget />
    </ThemeProvider>
  );
}
