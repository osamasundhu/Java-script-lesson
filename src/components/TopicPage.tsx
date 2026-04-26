import React, { useState } from 'react';
import { Topic } from '../types';
import { Playground } from './Playground';
import { AlertCircle, FileCode, CheckCircle, Info, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TopicPageProps {
  topic: Topic;
  onComplete: () => void;
  isCompleted: boolean;
  isDesktopForced?: boolean;
}

export const TopicPage: React.FC<TopicPageProps> = ({ topic, onComplete, isCompleted, isDesktopForced }) => {
  const [showPseudo, setShowPseudo] = useState(false);

  return (
    <div className={`flex-1 flex flex-col bg-zinc-950 ${isDesktopForced ? 'h-screen overflow-hidden' : ''}`}>
      {/* Top Header */}
      <header className="min-h-16 border-b border-zinc-800 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-3 sm:py-0 bg-zinc-950 sticky top-0 sm:relative z-30">
        <div className="flex items-center gap-4 mb-2 sm:mb-0 w-full sm:w-auto">
          <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{topic.category}</span>
          <h2 className="text-white font-medium truncate">{topic.title}</h2>
          {isCompleted && (
            <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <CheckCircle size={12} /> Mastered
            </span>
          )}
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          {topic.pseudoCode && (
            <button 
              onClick={() => setShowPseudo(!showPseudo)}
              className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded border transition-all ${showPseudo ? 'bg-zinc-800 text-white border-zinc-600' : 'text-zinc-400 border-zinc-700 hover:border-zinc-500'}`}
            >
              {showPseudo ? 'Back to Editor' : 'View Pseudo-code'}
            </button>
          )}
          <button 
            onClick={onComplete}
            className={`flex-1 sm:flex-none px-4 py-1.5 text-xs font-bold text-white rounded transition-all ${isCompleted ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-indigo-600 hover:bg-indigo-500'}`}
          >
            {isCompleted ? 'Completed' : 'Mark Done'}
          </button>
        </div>
      </header>

      {/* Content Grid */}
      <div className={`flex-1 grid gap-0 overflow-hidden ${isDesktopForced ? 'grid-cols-12' : 'grid-cols-1 lg:grid-cols-12'}`}>
        {/* Left/Top Area: Editor or Pseudo or Concept */}
        <div className={`${isDesktopForced ? 'col-span-7 border-r' : 'lg:col-span-7 lg:border-r'} border-zinc-800 flex flex-col bg-[#1e1e1e] overflow-hidden min-h-[400px] lg:min-h-0`}>
          <AnimatePresence mode="wait">
            {showPseudo ? (
              <motion.div 
                key="pseudo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 p-6 sm:p-8 bg-zinc-950 overflow-y-auto"
              >
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Paper 2 Pseudo-code</h3>
                    <span className="text-[10px] text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded uppercase tracking-tighter">9618 Format</span>
                  </div>
                  <pre className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 text-sm font-mono text-zinc-300 overflow-x-auto whitespace-pre leading-relaxed shadow-xl">
                    {topic.pseudoCode}
                  </pre>
                  <div className="p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/10 text-[13px] text-zinc-400 leading-normal italic">
                    Note: In AS Level exams, you must translate JS logic into this structured format. Note the use of indentation and capitalized keywords.
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="editor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col overflow-hidden"
              >
                <div className="flex items-center justify-between px-4 h-10 border-b border-zinc-800 bg-zinc-900/80">
                  <span className="text-[11px] font-mono text-zinc-400">playground.js</span>
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 italic">
                    Interactive AS Sandbox
                  </div>
                </div>
                <div className="flex-1 overflow-hidden relative">
                   <Playground initialCode={topic.exampleCode} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right/Bottom Area: Concepts & Pitfalls */}
        <div className={`${isDesktopForced ? 'col-span-5' : 'lg:col-span-5'} flex flex-col p-6 sm:p-8 bg-zinc-950 overflow-y-auto`}>
          <div className="max-w-none space-y-8">
            <div>
              <h4 className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">Concept Review</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {topic.content}
              </p>
            </div>
            
            {/* Exam Pitfall Box */}
            <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={16} className="text-amber-500" />
                <h5 className="text-amber-500 font-bold text-xs uppercase tracking-wider">Exam Pitfall: Grade 11</h5>
              </div>
              <ul className="space-y-3">
                {topic.pitfalls.map((pitfall, i) => (
                  <li key={i} className="text-[13px] text-amber-100/70 leading-normal flex gap-2">
                    <span className="text-amber-500/50 font-bold tracking-tighter shrink-0">{i+1}.</span>
                    {pitfall}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-sm font-bold mb-3">Checklist for Mastery</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-3">
                  <div className={`w-4 h-4 rounded border ${isCompleted ? 'bg-indigo-500 border-indigo-500' : 'border-zinc-700'} flex-shrink-0 mt-0.5 flex items-center justify-center`}>
                    {isCompleted && <CheckCircle size={10} className="text-white" />}
                  </div>
                  <span className={`${isCompleted ? 'text-zinc-200' : 'text-zinc-400'}`}>Review logic and run example</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded border border-zinc-700 flex-shrink-0 mt-0.5"></div>
                  <span className="text-zinc-400">Understand Paper 2 pseudo-code equivalent</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded border border-zinc-700 flex-shrink-0 mt-0.5"></div>
                  <span className="text-zinc-400">Test edge cases in the playground</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
