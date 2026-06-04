import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { projects } from '../data/portfolioData';
import SplitText from './SplitText';

const tagIcons = {
  "React": "devicon-react-original colored",
  "Next.js": "devicon-nextjs-plain", // Keeping plain so dark-mode auto-inverts correctly
  "Tailwind CSS": "devicon-tailwindcss-original colored",
  "Node.js": "devicon-nodejs-plain colored",
  "Express": "devicon-express-original",
  "MongoDB": "devicon-mongodb-plain colored",
  "Socket.io": "devicon-socketio-original",
  "PostgreSQL": "devicon-postgresql-plain colored",
  "JavaScript": "devicon-javascript-plain colored",
  "HTML": "devicon-html5-plain colored",
  "CSS": "devicon-css3-plain colored",
  "Chrome APIs": "devicon-chrome-plain colored",
  "Prisma": "devicon-prisma-original colored",
};

export default function Projects() {
  const [ref, isVisible] = useScrollAnimation(0.05);
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Web App', 'AI', 'Extensions'];

  const filteredProjects = projects.filter(project => {
    if (filter === 'All') return true;
    if (filter === 'AI') return project.tags.includes('AI');
    if (filter === 'Extensions') return project.tags.includes('Chrome APIs') || project.tags.includes('JavaScript') && project.title.toLowerCase().includes('extension') || project.title.toLowerCase().includes('reloader');
    if (filter === 'Web App') return !project.tags.includes('AI') && !project.title.toLowerCase().includes('extension') && !project.title.toLowerCase().includes('reloader');
    return true;
  });

  return (
    <section id="projects" className="section-container">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isVisible ? 'show' : 'hidden'}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.p
          className="text-sm font-medium uppercase tracking-[0.2em] mb-3"
          style={{ color: 'var(--muted)' }}
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
        >
          My Work
        </motion.p>
        <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
          <SplitText
            text="Featured Projects"
            className="section-title mb-2"
            delay={30}
            tag="h2"
            textAlign="left"
            rootMargin="-50px"
          />
        </motion.div>
        <motion.p
          className="section-subtitle mb-8"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
        >
          A selection of things I've built — real-world, production-grade applications. <span className="block mt-2 text-xs font-semibold" style={{ color: 'var(--accent)' }}>✨ Click any card to explore the full case study (challenges, solutions, and mockup screenshots).</span>
        </motion.p>

        {/* Filter Bar */}
        <motion.div
          className="flex flex-wrap gap-3 mb-12"
          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-6 py-2 rounded-full text-sm font-medium border transition-all duration-300 relative group"
              style={{
                borderColor: filter === cat ? 'var(--text)' : 'var(--border)',
                color: filter === cat ? 'var(--text)' : 'var(--muted)',
                backgroundColor: filter === cat ? 'var(--card-bg)' : 'transparent',
              }}
            >
              <span className="relative z-10">{cat}</span>
              {filter === cat && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-white/5 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid gap-6"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            containerType: 'inline-size',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, index, onClick }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(useSpring(y, { stiffness: 300, damping: 30 }), [0, 1], [4, -4]);
  const rotateY = useTransform(useSpring(x, { stiffness: 300, damping: 30 }), [0, 1], [-4, 4]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      className="group relative"
      style={{ perspective: "1000px" }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: index * 0.08, ease: 'easeOut' },
        },
      }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className="card-base flex flex-col h-full overflow-hidden cursor-pointer"
        style={{
          containerType: 'inline-size',
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      >
        {/* Gradient Top Bar */}
        <div
          className="h-[3px] w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--muted), transparent)',
          }}
        />

        <div className="project-card-inner p-6 flex flex-col flex-1 gap-4">
          {/* Number & Click Indicator */}
          <div className="flex items-center justify-between">
            <span
              className="text-xs font-mono"
              style={{ color: 'var(--muted)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className="text-[10px] font-mono font-bold tracking-wider uppercase opacity-60 group-hover:opacity-100 group-hover:text-[var(--accent)] transition-all duration-300 flex items-center gap-1.5"
              style={{ color: 'var(--muted)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Case Study
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-grotesk font-bold leading-tight"
            style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', color: 'var(--text)' }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            className="flex-1 leading-relaxed text-sm"
            style={{ color: 'var(--muted)', lineHeight: 1.7 }}
          >
            {project.description}
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md font-medium cursor-default transition-colors duration-200"
                style={{
                  color: 'var(--muted)',
                  backgroundColor: 'var(--bg)',
                  border: '1px solid var(--border)',
                }}
                whileHover={{
                  scale: 1.05,
                  color: 'var(--text)',
                  borderColor: 'var(--text)'
                }}
              >
                {tagIcons[tag] && (
                  <i className={`${tagIcons[tag]} text-sm`} />
                )}
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Links */}
          <div
            className="flex items-center gap-3 pt-2 border-t mt-auto"
            style={{ borderColor: 'var(--border)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
              style={{ color: 'var(--muted)' }}
              aria-label={`${project.title} GitHub`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              GitHub
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ml-auto"
                style={{ color: 'var(--text)' }}
                aria-label={`${project.title} Live Demo`}
              >
                Live Demo
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 7h10v10M7 17 17 7" /></svg>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6 lg:p-8">
      {/* Dark overlay backdrop with rich glassmorphism */}
      <motion.div
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal Card Container */}
      <motion.div
        className="relative w-full max-w-5xl card-base overflow-hidden flex flex-col z-[151] max-h-[85vh] md:max-h-[90vh] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border"
        style={{
          borderColor: 'var(--border)',
          backgroundColor: 'var(--bg)',
        }}
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
      >
        {/* Header - Styled like a premium browser window */}
        <div className="flex items-center justify-between p-6 border-b shrink-0 text-left" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
          <div className="flex flex-col gap-1.5 pr-6">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--accent)' }}>CASE STUDY / SPOTLIGHT</span>
            <h2 className="text-2xl md:text-3xl font-bold font-grotesk leading-tight" style={{ color: 'var(--text-h)', margin: 0 }}>
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="group/close p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 border shrink-0 hover:rotate-90"
            style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
            aria-label="Close modal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 md:p-8 flex flex-col gap-8 custom-scrollbar text-left" style={{ backgroundColor: 'var(--bg)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Details & Narrative (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-md font-medium"
                    style={{
                      color: 'var(--text)',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {tagIcons[tag] && (
                      <i className={`${tagIcons[tag]} text-xs`} />
                    )}
                    {tag}
                  </span>
                ))}
              </div>

              {/* Core Description */}
              <div className="flex flex-col gap-2">
                <p className="text-base leading-relaxed" style={{ color: 'var(--text)', opacity: 0.85 }}>
                  {project.description}
                </p>
              </div>

              {/* Existing Problem section */}
              {project.problem && (
                <div
                  className="flex flex-col gap-3 p-5 rounded-2xl border text-left"
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.02)',
                    borderColor: 'rgba(239, 68, 68, 0.15)',
                    boxShadow: 'inset 0 0 12px rgba(239, 68, 68, 0.02)'
                  }}
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 font-mono" style={{ color: '#ef4444' }}>
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500/10">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    </span>
                    The Challenge / Problem
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text)', opacity: 0.9 }}>
                    {project.problem}
                  </p>
                </div>
              )}

              {/* Proposed Solution section */}
              {project.proposed && (
                <div
                  className="flex flex-col gap-3 p-5 rounded-2xl border text-left"
                  style={{
                    backgroundColor: 'rgba(34, 197, 94, 0.02)',
                    borderColor: 'rgba(34, 197, 94, 0.15)',
                    boxShadow: 'inset 0 0 12px rgba(34, 197, 94, 0.02)'
                  }}
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 font-mono" style={{ color: '#22c55e' }}>
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    Proposed Solution
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text)', opacity: 0.9 }}>
                    {project.proposed}
                  </p>
                </div>
              )}
            </div>

            {/* Right Column: Screenshot & Actions (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-0">
              
              {/* Screenshots section */}
              {project.screenshots && project.screenshots.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-[0.1em]" style={{ color: 'var(--muted)' }}>
                    Interface Preview
                  </h4>
                  
                  {/* macOS Browser Mockup */}
                  <div className="flex flex-col rounded-xl overflow-hidden border shadow-lg" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
                    {/* simulated window bar */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b shrink-0" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      </div>
                      <div 
                        className="mx-auto text-[10px] font-mono px-3 py-0.5 rounded truncate max-w-[150px] md:max-w-[200px]"
                        style={{ backgroundColor: 'var(--bg)', color: 'var(--muted)', border: '1px solid var(--border)' }}
                      >
                        {project.live ? project.live.replace('https://', '') : 'localhost:3000'}
                      </div>
                    </div>
                    {/* display slot */}
                    <div className="relative aspect-video overflow-hidden bg-black/5 dark:bg-black/20">
                      <img
                        src={project.screenshots[0]}
                        alt={`${project.title} Interface`}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Action Buttons */}
              <div className="flex flex-col gap-4 p-5 rounded-2xl border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
                <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-left" style={{ color: 'var(--muted)' }}>
                  Project Action
                </h5>
                <div className="flex flex-col gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 border rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                    style={{ color: 'var(--text)', borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                    Explore Repository
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                    >
                      Launch Live App
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 7h10v10M7 17 17 7" /></svg>
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
