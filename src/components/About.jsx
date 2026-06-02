import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from '../context/ThemeContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function About() {
  const { isDark } = useTheme();
  const [ref, isVisible] = useScrollAnimation(0.15);
  const [githubData, setGithubData] = useState(null);
  const [repoData, setRepoData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 4;

  useEffect(() => {
    // Fetch user profile
    fetch('https://api.github.com/users/tarunkulkarni4')
      .then((res) => res.json())
      .then((data) => setGithubData(data))
      .catch((err) => console.error(err));

    // Fetch up to 100 repositories, sorted by latest updates
    fetch('https://api.github.com/users/tarunkulkarni4/repos?sort=updated&per_page=100')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setRepoData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section id="about" className="section-container">
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isVisible ? 'show' : 'hidden'}
        className="flex flex-col items-center"
      >
        <motion.p
          variants={fadeUp}
          className="text-sm font-medium uppercase tracking-[0.2em] mb-3 text-center"
          style={{ color: 'var(--muted)' }}
        >
          Open Source
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="section-title text-center mb-10"
          style={{ color: 'var(--text)' }}
        >
          GitHub Contributions & Activity
        </motion.h2>

        <motion.div
          variants={fadeUp}
          className="card-base w-full max-w-4xl p-6 md:p-8 flex flex-col gap-6 overflow-hidden"
        >
          {/* Real GitHub Header */}
          {githubData && (
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
              <img
                src={githubData.avatar_url}
                alt="GitHub Avatar"
                className="w-16 h-16 rounded-full border"
                style={{ borderColor: 'var(--border)' }}
              />
              <div className="flex flex-col items-center sm:items-start flex-1">
                <a
                  href={githubData.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold hover:underline"
                  style={{ color: 'var(--text)' }}
                >
                  {githubData.name || githubData.login}
                </a>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>@{githubData.login}</p>
              </div>

              <div className="flex gap-6 mt-4 sm:mt-0 text-sm">
                <div className="flex flex-col items-center">
                  <span className="font-bold text-lg" style={{ color: 'var(--text)' }}>{githubData.public_repos}</span>
                  <span style={{ color: 'var(--muted)' }}>Repositories</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-bold text-lg" style={{ color: 'var(--text)' }}>{githubData.followers}</span>
                  <span style={{ color: 'var(--muted)' }}>Followers</span>
                </div>
              </div>
            </div>
          )}

          {/* Repositories Pagination Grid */}
          {repoData.length > 0 && (() => {
            const totalPages = Math.ceil(repoData.length / reposPerPage);
            const currentRepos = repoData.slice((currentPage - 1) * reposPerPage, currentPage * reposPerPage);

            return (
              <div className="mb-6 flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentRepos.map(repo => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                      style={{
                        borderColor: 'var(--border)',
                        backgroundColor: 'rgba(255,255,255,0.01)'
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                        <span className="font-semibold text-sm group-hover:underline line-clamp-1" style={{ color: 'var(--text)' }}>
                          {repo.name}
                        </span>
                        <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full border" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
                          {repo.visibility}
                        </span>
                      </div>
                      {repo.description && (
                        <p className="text-xs line-clamp-2 mb-3" style={{ color: 'var(--muted)' }}>
                          {repo.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs mt-auto" style={{ color: 'var(--muted)' }}>
                        {repo.language && (
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.language === 'JavaScript' ? '#f1e05a' : repo.language === 'HTML' ? '#e34c26' : repo.language === 'CSS' ? '#563d7c' : repo.language === 'Python' ? '#3572A5' : 'var(--text)' }} />
                            {repo.language}
                          </div>
                        )}

                        {repo.stargazers_count > 0 && (
                          <div className="flex items-center gap-1">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                            {repo.stargazers_count}
                          </div>
                        )}
                        {repo.forks_count > 0 && (
                          <div className="flex items-center gap-1">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" /><path d="M12 12v3" /></svg>
                            {repo.forks_count}
                          </div>
                        )}
                      </div>
                    </a>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-2 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#6366f1] hover:text-[#6366f1] backdrop-blur-md"
                      style={{ color: 'var(--text)', borderColor: 'var(--border)', backgroundColor: 'var(--card-bg)' }}
                    >
                      ← Previous
                    </button>
                    <span className="text-xs font-semibold tracking-wider" style={{ color: 'var(--muted)' }}>
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#6366f1] hover:text-[#6366f1] backdrop-blur-md"
                      style={{ color: 'var(--text)', borderColor: 'var(--border)', backgroundColor: 'var(--card-bg)' }}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>
            );
          })()}

          {/* GitHub Calendar Grid */}
          <div className="flex justify-center w-full overflow-x-auto no-scrollbar pb-2">
            <GitHubCalendar
              username="tarunkulkarni4"
              colorScheme={isDark ? 'dark' : 'light'}
              blockSize={12}
              blockMargin={5}
              fontSize={12}
              theme={{
                dark: ['#161B22', '#0E4429', '#006D32', '#26A641', '#39D353'],
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
