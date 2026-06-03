import { useState } from 'react';
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
          A selection of things I've built — real-world, production-grade applications.
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
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProjectCard({ project, index }) {
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
        className="card-base flex flex-col h-full overflow-hidden"
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
          {/* Number */}
          <span
            className="text-xs font-mono"
            style={{ color: 'var(--muted)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

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
          <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
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
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
