import React from 'react';
import { Topic, UserProgress } from '../types';
import { CheckCircle2, ChevronRight, BookOpen, Layers, Code, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  topics: Topic[];
  activeTopicId: string;
  onTopicSelect: (id: string) => void;
  progress: UserProgress;
  isOpen: boolean;
  onClose: () => void;
  isDesktopForced: boolean;
  viewMode: 'mobile' | 'desktop';
  setViewMode: (mode: 'mobile' | 'desktop') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  topics, 
  activeTopicId, 
  onTopicSelect, 
  progress, 
  isOpen, 
  onClose,
  isDesktopForced,
  viewMode,
  setViewMode
}) => {
  const categories = ['Fundamentals', 'Control Structures', 'Data Structures', 'The DOM'] as const;

  const sidebarContent = (
    <div className={`h-full flex flex-col bg-zinc-900/50 ${isDesktopForced ? '' : ''}`}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-white font-bold text-lg tracking-tight flex items-center gap-2">
            <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
            JS Revision Hub
          </h1>
          {!isDesktopForced && (
            <button onClick={onClose} className="lg:hidden text-zinc-500 hover:text-white">
              <ChevronRight className="rotate-180" />
            </button>
          )}
        </div>
        <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold mt-1">AS Level Computer Science</p>
      </div>

      <div className="hidden lg:flex px-6 mb-4 items-center gap-2">
        <button 
          onClick={() => setViewMode('mobile')}
          className={`flex-1 text-[10px] font-bold uppercase tracking-widest py-1.5 rounded border transition-all ${viewMode === 'mobile' ? 'bg-indigo-600 text-white border-indigo-600' : 'text-zinc-500 border-zinc-800 hover:border-zinc-700'}`}
        >
          Mobile
        </button>
        <button 
          onClick={() => setViewMode('desktop')}
          className={`flex-1 text-[10px] font-bold uppercase tracking-widest py-1.5 rounded border transition-all ${viewMode === 'desktop' ? 'bg-indigo-600 text-white border-indigo-600' : 'text-zinc-500 border-zinc-800 hover:border-zinc-700'}`}
        >
          Desktop
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 space-y-6">
        {categories.map(category => (
          <div key={category}>
            <h3 className="px-2 text-zinc-500 text-[10px] uppercase tracking-widest font-bold mb-2">
              {category}
            </h3>
            <div className="space-y-1">
              {topics.filter(t => t.category === category).map(topic => {
                const isActive = topic.id === activeTopicId;
                const isCompleted = progress.completedTopics.includes(topic.id);

                return (
                  <button
                    key={topic.id}
                    onClick={() => onTopicSelect(topic.id)}
                    className={`w-full flex items-center justify-between px-2 py-1.5 text-sm rounded transition-all group ${
                      isActive 
                        ? 'bg-zinc-800 text-white font-medium ring-1 ring-zinc-700' 
                        : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                    }`}
                  >
                    <span className="truncate">{topic.title}</span>
                    {isCompleted && (
                      <span className="text-emerald-500 text-xs ml-2">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-zinc-800 bg-zinc-900">
        <div className="flex justify-between text-[11px] mb-1.5">
          <span className="text-zinc-500">Overall Progress</span>
          <span className="text-white font-mono">
            {Math.round((progress.completedTopics.length / topics.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
          <motion.div 
            className="bg-indigo-500 h-full"
            initial={{ width: 0 }}
            animate={{ width: `${(progress.completedTopics.length / topics.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex w-64 border-r border-zinc-800 flex-col shrink-0 ${isDesktopForced ? 'h-screen' : ''}`}>
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      {!isDesktopForced && (
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] lg:hidden"
              />
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 bottom-0 w-72 bg-zinc-950 z-[60] lg:hidden border-r border-zinc-800"
              >
                {sidebarContent}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}
    </>
  );
};
