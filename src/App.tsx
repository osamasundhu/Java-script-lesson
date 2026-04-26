import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopicPage } from './components/TopicPage';
import { TOPICS } from './constants';
import { UserProgress } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTopicId, setActiveTopicId] = useState(TOPICS[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('as-level-js-progress');
    return saved ? JSON.parse(saved) : { completedTopics: [] };
  });

  useEffect(() => {
    localStorage.setItem('as-level-js-progress', JSON.stringify(progress));
  }, [progress]);

  const activeTopic = TOPICS.find(t => t.id === activeTopicId) || TOPICS[0];

  const handleComplete = () => {
    if (!progress.completedTopics.includes(activeTopicId)) {
      setProgress(prev => ({
        ...prev,
        completedTopics: [...prev.completedTopics, activeTopicId]
      }));
    }
  };

  const isDesktopForced = viewMode === 'desktop';

  return (
    <div className={`bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30 min-h-screen ${isDesktopForced ? 'overflow-x-auto' : ''}`}>
      <div className={`flex min-h-screen ${isDesktopForced ? 'w-[1200px]' : 'flex-col lg:flex-row'}`}>
        
        {/* Mobile Header */}
        {!isDesktopForced && (
          <header className="lg:hidden h-14 border-b border-zinc-800 bg-zinc-950 px-4 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>
              <span className="font-bold text-sm tracking-tight text-white">JS Hub</span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setViewMode('desktop')}
                className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Desktop View
              </button>
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 text-zinc-400 hover:text-white"
              >
                <motion.div whileTap={{ scale: 0.9 }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </motion.div>
              </button>
            </div>
          </header>
        )}

        {/* Sidebar */}
        <Sidebar 
          topics={TOPICS}
          activeTopicId={activeTopicId}
          onTopicSelect={(id) => {
            setActiveTopicId(id);
            setIsSidebarOpen(false);
          }}
          progress={progress}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          isDesktopForced={isDesktopForced}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        
        <main className={`flex-1 relative ${isDesktopForced ? 'h-screen overflow-y-auto' : 'flex flex-col'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTopicId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full flex flex-col"
            >
              <TopicPage 
                topic={activeTopic}
                isCompleted={progress.completedTopics.includes(activeTopicId)}
                onComplete={handleComplete}
                isDesktopForced={isDesktopForced}
              />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
