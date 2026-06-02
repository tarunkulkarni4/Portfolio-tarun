import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GithubWidget() {
  const [latestCommit, setLatestCommit] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchLatestCommit = async () => {
      const CACHE_TTL = 60 * 60 * 1000; // 1 hour
      const CACHE_KEY = 'gh_events';
      try {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data: events, ts } = JSON.parse(cached);
          if (Date.now() - ts < CACHE_TTL) {
            processEvents(events);
            return;
          }
        }
        // Fetch public events for the GitHub user
        const response = await fetch('https://api.github.com/users/tarunkulkarni4/events/public');
        if (!response.ok) return;
        const events = await response.json();
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data: events, ts: Date.now() }));
        processEvents(events);
      } catch (error) {
        console.error("Error fetching GitHub activity:", error);
      }
    };

    const processEvents = (events) => {
      const pushEvent = events?.find(event => event.type === 'PushEvent');
      if (pushEvent?.payload?.commits && pushEvent.payload.commits.length > 0) {
        const commit = pushEvent.payload.commits[0];
        const repoName = pushEvent.repo.name.split('/')[1] || pushEvent.repo.name;
        setLatestCommit({
          message: commit.message,
          repo: repoName,
          url: `https://github.com/${pushEvent.repo.name}`
        });
        setTimeout(() => setIsVisible(true), 2000);
      }
    };

    fetchLatestCommit();
  }, []);

  return (
    <AnimatePresence>
      {isVisible && latestCommit && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-40 hidden md:block" // Hidden on small mobile screens to save space
        >
          <a
            href={latestCommit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-2xl border backdrop-blur-md shadow-xl transition-colors duration-300 group"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </div>
            
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: 'var(--muted)' }}>
                Latest Commit &bull; {latestCommit.repo}
              </span>
              <span className="text-sm font-medium pr-4 line-clamp-1 max-w-[200px]" style={{ color: 'var(--text)' }}>
                {latestCommit.message}
              </span>
            </div>

            {/* Hover arrow indicator */}
            <div className="absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
